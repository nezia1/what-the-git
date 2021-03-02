import { usePopperTooltip } from 'react-popper-tooltip'
import { Link } from 'react-router-dom'
import { GitDefinition } from '../types'
import { toSnakeCase } from '../utils'
import './Definition.css'

export default function Definition({ definition }: { definition: GitDefinition }) {
  const { setTooltipRef, setTriggerRef, getTooltipProps, visible } = usePopperTooltip({
    interactive: true,
  })
  return (
    <div className='definition'>
      <span ref={setTriggerRef} className='definition-term'>
        {definition.name}
      </span>
      {visible && (
        <article ref={setTooltipRef} {...getTooltipProps({ className: 'definition-box' })}>
          <section>{definition.description}</section>
          <footer>
            <Link to={`/articles/${toSnakeCase(definition.name)}`}>Read article</Link>
          </footer>
        </article>
      )}
    </div>
  )
}
