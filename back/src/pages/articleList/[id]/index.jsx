import React, { useState, useEffect } from 'react'
import { updateArticle, getOneArticle } from '../../../service/api/article'
import Article from '../../../components/Article'
import { message } from 'antd'

function ArticleDetail({ match, history }) {
  const [articleDetail, setArticleDetail] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await getOneArticle(match.params.id)
      if (res.code === 0) {
        setArticleDetail(res.data)
      }
    })()
  }, [])

  return articleDetail ? <Article isUpdataArticle={true} articleDetail={articleDetail} updataArticleHandle={async articleState => {
    const res = await updateArticle(match.params.id, articleState)
    if (res.code === 0) {
      message.success('修改成功')
      history.push('/articleList')
    } else {
      message.error('修改失败')
    }
  }} /> : null
}
ArticleDetail.title = "文章详情"
export default ArticleDetail
