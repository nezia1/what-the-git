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
  flags: string[]
}

export interface SpecialTokens {
  [key: string]: string
}
