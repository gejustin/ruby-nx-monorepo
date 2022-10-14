# nx-ruby

## Overview

An [nx-plugin](https://nx.dev/plugin-features/create-your-own-plugin) for working with Ruby projects in Nx.

## rubocop executor

An nx [executor](https://nx.dev/plugin-features/use-task-executors#use-task-executors) that runs the rubocop command on your project using the supplied configuration.

See [the schema](./src/executors/rubocop/schema.json) for the full list of options.

```JSON
{
  "targets": {
    "lint": {
      "executor": "@joinhandshake/nx-ruby:rubocop",
      "inputs": ["rubocop"],
      "outputs": ["{options.cacheRoot}"],
      "options": {
        "lintFilePatterns": ["services/handshake_office"],
        "config": "services/handshake_office/.rubocop.yml",
        "cache": true,
        "cacheRoot": "tmp/rubocop/handshake_office",
      }
    }
  }
}
```
