import { GitDefinition } from './types'

const definitions: GitDefinition[] = [
  {
    name: 'staging area',
    description:
      'The area of Git where your files end up after adding them using git add. The staging area can be used to craft commits, stash files etc.',
    regex: /(staging area)/,
  },
]

export { definitions }
