export interface RubocopExecutorSchema {
  lintFilePatterns: string[];
  config: string;
  args?: string[];
  autocorrect?: boolean;
  cache?: boolean;
  cacheRoot?: string;
  cwd?: string;
  force?: boolean;
}
