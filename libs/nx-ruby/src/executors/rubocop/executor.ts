import { spawnSync } from "node:child_process";

import { RubocopExecutorSchema } from "./schema";

export default async function runExecutor({
  lintFilePatterns,
  config,
  autocorrect = false,
  cwd,
  cache = false,
  cacheRoot,
  args = [],
  force = false,
}: RubocopExecutorSchema) {
  const rubocopArgs = [
    autocorrect ? `--autocorrect` : undefined,
    cache ? `--cache=true` : undefined,
    cacheRoot ? `--cache-root=${cacheRoot}` : undefined,
    ...args,
  ].filter(Boolean);

  const rubocop = spawnSync(
    "bundle",
    ["exec", "rubocop", ...lintFilePatterns, ...rubocopArgs],
    {
      stdio: ["ignore", "inherit", "inherit"],
      shell: false,
      cwd,
    }
  );

  return {
    success: force || rubocop.status === 0,
  };
}
