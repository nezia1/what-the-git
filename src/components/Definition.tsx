import { GitDefinition } from '../types'
import './Definition.css'

export default function Definition({ definition }: { definition: GitDefinition }) {
  return (
    <div className='definition'>
      <span className='definition-term'>{definition.name}</span>
      <article className='definition-box'>
        <section>{definition.description}</section>
      </article>
    </div>
  )
}
