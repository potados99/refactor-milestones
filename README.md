# refactored

```
┌─────────┬────────────────────────────┬──────────┬──────────────────────────┐
│ (index) │            name            │ progress │        visualized        │
├─────────┼────────────────────────────┼──────────┼──────────────────────────┤
│    0    │    'Introduce Shebang'     │  '2/10'  │ '[||||                ]' │
│    1    │ 'Remove import statements' │  '9/10'  │ '[||||||||||||||||||  ]' │
└─────────┴────────────────────────────┴──────────┴──────────────────────────┘
```

refactored is a utility that shows how many tasks are done while you are on a huge refactoring.

## Install

```shell
$ npm install -g refactored
```

## Usage

Move into your working directory and run:

```shell
$ refactored
```

or specify the project directory:

```shell
$ refactored --prefix ./my-project
```

You can obtain a whole file path list of those refactored, and those not:

```shell
$ refactored --verbose
```

## Usage without installation

You can run it using `npx` command without installation.

```shell
$ npx refactored
```

## Configurations

refactored requires a configuration file named `.refactoredrc` placed in the working directory.

Here's a full example of `.refactoredrc`:

```json
{
  "tasks": [
    {
      "name": "Remove import statements",
      "filePatterns": [
        "**/*"
      ],
      "ignorePatterns": [
        "node_modules",
        ".git",
        ".idea",
        "package-lock.json"
      ],
      "test": {
        "file-not-includes": "import"
      }
    }
  ]
}
```

For more info, I've brought you a [JSON schema](./refactoredrc.schema.json) for the `.refactoredrc`.


## Test expressions

refactored currently supports two operators(rules):

- `file-includes`: file should contain given string.
- `file-not-includes`: file should not contain given string.
