export interface GitCommand {
  name: string
  description: string
  flagsDescriptions: Flag[]
  flags: Flag[]
}
export interface Flag {
  name: string
  aliases?: string[]
  description: string
  isString: boolean
}

export interface AvailableFlagsArray {
  booleanFlagsArray: string[]
  stringFlagsArray: string[]
}

export interface ParsedArguments {
  _: string[]
  flags: InputFlag[]
}

export interface InputFlag {
  name: string
  value: boolean | string | string[]
}

export interface SpecialTokens {
  [key: string]: string
}

export interface GitDefinition {
  name: string
  description: string
}
