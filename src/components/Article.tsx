import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { articlesList } from '../articles-list'
import './Article.css'

export default function Article() {
  const { article } = useParams<{ article: string }>()
  const [articleText, setArticleText] = useState('')
  const [articleExists, setArticleExists] = useState<boolean>()
  useEffect(() => {
    async function getArticle() {
      if (articlesList.includes(article)) {
        setArticleExists(true)
        const response = await fetch(`${process.env.PUBLIC_URL}/markdown/${article}.md`)
        const text = await response.text()
        setArticleText(text)
      }
    }
    getArticle()
  }, [article])
  return (
    <div className='container'>
      {articleExists ? <Markdown>{articleText}</Markdown> : <p>This article doesn't exist</p>}
    </div>
  )
}
