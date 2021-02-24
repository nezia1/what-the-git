import { GitDefinition } from '../types'

export default function Definition(definition: GitDefinition) {
  return <span>{definition.name}</span>
}
