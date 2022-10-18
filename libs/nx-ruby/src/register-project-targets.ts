import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

import { TargetConfiguration } from '@nrwl/devkit';

export const projectFilePatterns = ['Gemfile'];

const portMap = {
  'rails-app-a': 3000,
  'rails-app-b': 3001
}

export function registerProjectTargets(
  projectFilePath: string
): Record<string, TargetConfiguration> {
  const projectRoot = projectFilePath.replace('/Gemfile', '');
  const projectConfig = JSON.parse(
    readFileSync(`${projectRoot}/project.json`, { encoding: 'utf8' })
  );
  const projectName = basename(projectRoot);

  const targets = {
    install: {
      executor: 'nx:run-commands',
      inputs: ["rubyDependencies"],
      outputs: [],
      options: {
        command: `bundle`,
        cwd: projectRoot,
      },
    },
    lint: {
      executor: 'nx:run-commands',
      options: {
        command: `bundle exec rubocop`,
        cwd: projectRoot,
      },
      dependsOn: ["install"]
    },
  };

  if (projectConfig.projectType === 'application') {
    return {
      ...targets,
      serve: {
        executor: 'nx:run-commands',
        options: {
          command: `bundle exec rails s -p ${portMap[projectName]}`,
          cwd: projectRoot,
        },
        dependsOn: ["install"]
      },
      'docker-build': {
        executor: 'nx:run-commands',
        options: {
          command: `echo 'docker build for ${projectRoot}'`,
        },
        dependsOn: ["install"]
      },
    };
  }

  return targets;
}
