const gitCommands = {
  commands: [
    {
      name: "add",
      description: "Adds %s to the staging area, ready to be committed.",
      flags: [
        {
          name: "verbose",
          aliases: ["v"],
          description:
            "Be verbose (allows the command to say more about what it does).",
          isString: false,
        },
        {
          name: "dry-run",
          aliases: ["n"],
          description:
            "Don’t actually add the file(s), just show if they exist.",
          isString: false,
        },
        {
          name: "force",
          aliases: ["f"],
          description: "Allow adding ignored files.",
          isString: false,
        },
        {
          name: "pathspec-from-file",
          description:
            "Adds the files to the staging area from a file instead of command-line arguments (separated by line breaks). If the value of the flag is -, then standard input is used instead.",
          isString: true,
        },
      ],
    },
    {
      name: "commit",
      description:
        "Saves changes added to the staging area to the local git repository.",
      flags: [
        {
          name: "all",
          aliases: ["a"],
          description:
            "Automatically adds every file that has been changed or deleted to the commit, but not the files that you just created.",
        },
      ],
    },
  ],
};

export default gitCommands;
