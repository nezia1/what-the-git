export interface Flag {
    name: string,
    aliases?: string[],
    description: string,
    isString: boolean
}

export interface AvailableFlagsArray {
    booleanFlagsArray: string[],
    stringFlagsArray: string[]
}
