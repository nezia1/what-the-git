const gitCommands = {
  commands: [
    {
      name: "add",
      description: "Adds %s to the staging area, ready to be committed.",
    },
  ],
  flags: [
    {
      name: "verbose",
      aliases: ["v"],
      description:
        "Be verbose (allows the command to say more about what it does)",
      commands: ["add"],
    },
  ],
};

export default gitCommands;
