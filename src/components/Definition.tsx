import { GitDefinition } from '../types'

export default function Definition({ definition }: { definition: GitDefinition }) {
  return <span>{definition.name}</span>
}
