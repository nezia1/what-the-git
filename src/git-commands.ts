const gitCommands = {
  commands: [
    {
      name: 'add',
      description: 'Adds %s to the staging area, ready to be committed.',
      flags: [
        {
          name: 'verbose',
          aliases: ['v'],
          description: 'Be verbose (allows the command to say more about what it does).',
          isString: false,
        },
        {
          name: 'dry-run',
          aliases: ['n'],
          description: 'Don’t actually add the file(s), just show if they exist.',
          isString: false,
        },
        {
          name: 'force',
          aliases: ['f'],
          description: 'Allow adding ignored files.',
          isString: false,
        },
        {
          name: 'pathspec-from-file',
          description:
            'Adds the files to the staging area from %s instead of command-line arguments (separated by line breaks). If the value of the flag is -, then standard input is used instead.',
          isString: true,
        },
      ],
    },
    {
      name: 'commit',
      description: 'Saves changes added to the staging area to the local git repository.',
      flags: [
        {
          name: 'all',
          aliases: ['a'],
          description:
            'Automatically adds every file that has been changed or deleted to the commit, but not the files that you just created.',
          isString: false,
        },
        {
          name: 'message',
          aliases: ['m'],
          description: 'Set the commit message to %s',
          isString: true,
        },
      ],
    },
    {
      name: 'push',
      description: 'Updates your remote branch with your local commits.',
      flags: [
        {
          name: 'all',
          description: 'Push all branches.',
          isString: false,
        },
        {
          name: 'prune',
          description:
            'Remove remote branches that don’t have a local counterpart. For example, a branch foo will be removed if a local branch with the same name does not exist anymore.',
          isString: false,
        },
        {
          name: 'dry-run',
          aliases: ['n'],
          description: 'Do everything except send the updates (effectively simulating a push).',
          isString: false,
        },
        {
          name: 'porcelain',
          description:
            'Outputs machine-readable and parsable output (The output status line for each ref will be tab-separated and sent to stdout instead of stderr).',
          isString: false,
        },
      ],
    },
    {
      name: 'rebase',
      description: 'Reapply commits on another branch',
      flags: [
        {
          name: 'verbose',
          aliases: ['v'],
          description: 'Be verbose (allows the command to say more about what it does). Implies --stat.',
          isString: false,
        },
        {
          name: 'quiet',
          aliases: ['q'],
          description: 'Be quiet (Opposite of verbose, silences the command output). Implies --no-stat.',
          isString: false,
        },
        {
          name: 'interactive',
          aliases: ['i'],
          description: 'Make a list of the commits which are about to be rebased. (This list can be edited before continuing to rebase)',
          isString: false,
        },
        {
          name: 'force-rebase',
          aliases: ['f'],
          description: 'Individually replay all rebased commits instead of fast-forwarding over the unchanged ones.',
          isString: false,
        },
        {
          name: 'continue',
          description: 'Restart the rebasing process after having resolved a merge conflict.',
          isString: false,
        },
        {
          name: 'abort',
          description: 'Abort the rebase operation and reset HEAD to the original branch.',
          isString: false,
        },
      ]
    },
    {
      name: 'diff',
      description: 'Show changes between commits, commit and working tree, and more.',
      isString: false,
      flags: [
        {
          name: 'raw',
          description: 'Generates the differance in a raw format.',
          isString: false,
        },
        {
          name: 'summary',
          description: 'Summarize the extended header information output (Such as creations and renames)',
          isString: false,
        },
        {
          name: 'name-only',
          description: 'Only shows the name of changed files.',
          isString: false,
        },
      ]
    },
    {
      name: 'log',
      description: 'Lists commits and its information in reverse chronological order',
      flags: [
        {
          name: 'source',
          description: 'Print out the ref information of each commit (Such as tags/branches).',
          isString: false,
        },
        {
          name: 'log-size',
          description: 'Include the lenght of each commit message in bytes.',
          isString: false,
        },
        {
          name: 'abbrev-commit',
          description: 'Shows a unique object prefix that substitutes the full 40-byte hexadecimal commit object name',
          isString: false,
        },
        {
          name: 'oneline',
          description: 'Displays the information of each commit in only one line and abbreviates the object\'s name (The same way as --abbrev-commit).',
          isString: false,
        },
      ]
    },
    {
      name: 'pull',
      description: 'Merge changes from a remote repository into the current branch',
      flags: [
        {
          name: 'commit',
          description: 'Commits the result of the merge.',
          isString: false,
        },
        {
          name: 'edit',
          aliases: ['e'],
          description: 'Opens an editor to modify the auto-generated merge message before commiting to further explain the merge.',
          isString: false,
        },
      ]
    },
    {
      name: 'status',
      description: 'Displays the paths that have differences between the index file and staged, tracked or untracked files',
      flags: [
        {
          name: 'short',
          aliases: ['s'],
          description: 'Outputs the status in the short format.',
          isString: false,
        },
        {
          name: 'long',
          description: 'Outputs the status in the long format (Default).',
          isString: false,
        },
        {
          name: 'verbose',
          aliases: ['v'],
          description: 'Shows the textual changes that are staged to be commited as well as the name of the files (The same way as git diff --cached).',
          isString: false,
        },
      ]
    },
  ],
}

const specialTokens = {
  '.': 'all files in the current directory',
  '..': 'all files in the previous directory',
}

export { gitCommands, specialTokens }