import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Article() {
  const { article } = useParams<{ article: string }>()
  const [articleText, setArticleText] = useState('')

  useEffect(() => {
    async function getArticle() {
      const response = await fetch(`${process.env.PUBLIC_URL}/markdown/${article}.md`)
      const text = await response.text()
      setArticleText(text)
    }
    getArticle()
  }, [article])
  return <div>{articleText}</div>
}
