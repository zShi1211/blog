import React from 'react'
import Article from '@/components/Article'
import { addArtcile } from '@/service/api/article'
import { message } from 'antd'


 function index({ history }) {
  return <Article addArticleHandle={async (articleState) => {
    const res = await addArtcile(articleState)
    if (res.code === 0) {
      message.success('添加成功')
      history.push('/articleList')
    } else {
      message.error('添加失败')
    }
  }} />
}
index.title ="添加文章"
export default index
