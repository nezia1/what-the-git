import { useParams } from 'react-router-dom'

export default function Article() {
  const { article } = useParams<{ article: string }>()
  return <div>{article}</div>
}
