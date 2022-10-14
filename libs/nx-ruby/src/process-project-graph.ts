import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

import {
  ProjectGraph,
  ProjectGraphBuilder,
  ProjectGraphProcessorContext,
} from '@nrwl/devkit';

export function processProjectGraph(
  graph: ProjectGraph,
  context: ProjectGraphProcessorContext
): ProjectGraph {
  const builder = new ProjectGraphBuilder(graph);

  const projectMetadata = Object.keys(context.workspace.projects).reduce(
    (projects, projectName) => {
      projects[projectName] = context.workspace.projects[projectName].root;
      return projects;
    },
    {}
  );

  const { stdout, status } = spawnSync(
    join(__dirname, 'parse_dependencies.rb'),
    [JSON.stringify(projectMetadata)],
    {
      encoding: 'utf8',
    }
  );

  if (status === 0) {
    const result = JSON.parse(stdout);

    Object.keys(result).forEach((project) => {
      result[project].forEach((dep) => {
        const config = context.workspace.projects[project];
        builder.addExplicitDependency(project, `${config.root}/Gemfile`, dep);
      });
    });
  }

  return builder.getUpdatedProjectGraph();
}
