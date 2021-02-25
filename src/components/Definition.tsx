import { GitDefinition } from '../types'
import './Definition.css'

export default function Definition({ definition }: { definition: GitDefinition }) {
  return (
    <div className='definition'>
      <span className='definition-term'>{definition.name}</span>
      <div className='definition-box'>{definition.description}</div>
    </div>
  )
}
