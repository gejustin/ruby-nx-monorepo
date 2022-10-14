import * as cp from "node:child_process";

import { RubocopExecutorSchema } from "./schema";
import executor from "./executor";

jest.mock("node:child_process", () => {
  return {
    spawnSync: jest.fn().mockReturnValue({ status: 0 }),
  };
});

describe("Rubocop Executor", () => {
  const options: RubocopExecutorSchema = {
    lintFilePatterns: ["path/to/files", "path/to/more/files"],
    autocorrect: true,
    cache: true,
    cacheRoot: "path/to/cache",
    cwd: "/path/to/cwd",
    args: ["--debug"],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should execute with all supported options", async () => {
    const output = await executor(options);

    expect(cp.spawnSync).toBeCalledWith(
      "bundle",
      [
        "exec",
        "rubocop",
        ...options.lintFilePatterns,
        "--autocorrect",
        "--cache=true",
        "--cache-root=path/to/cache",
        "--debug",
      ],
      expect.objectContaining({
        cwd: options.cwd,
      })
    );
    expect(output.success).toBe(true);
  });

  it("should not add false booleans as arguments", async () => {
    const output = await executor({
      ...options,
      autocorrect: false,
      cache: false,
    });

    expect(cp.spawnSync).toBeCalledWith(
      "bundle",
      [
        "exec",
        "rubocop",
        ...options.lintFilePatterns,
        "--cache-root=path/to/cache",
        "--debug",
      ],
      expect.objectContaining({
        cwd: options.cwd,
      })
    );
    expect(output.success).toBe(true);
  });
});
