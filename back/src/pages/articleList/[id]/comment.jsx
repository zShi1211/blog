import React, { useEffect, useState } from 'react'
import { getComment } from '@/service/api/article'
import { addChildComment, removeComment, removeChildComment, addComment } from '@/service/api/article'
import useCondition from '@/hooks/useConditionHook'
import CommentList from '@/components/CommentList'


export default function comment({ match }) {
  const [commentRes, setCommentRes] = useState(null)
  const [forceRefresh, setForceRefresh] = useState({})
  const [condition, setCondition] = useCondition(1, 3)
  const { params } = match;
  useEffect(() => {
    (async () => {
      const res = await getComment(params.id, condition)
      if (res.code === 0) {
        setCommentRes(res.data)
      }
    })()
  }, [forceRefresh, condition])

  return <CommentList
    condition={condition}
    setCondition={setCondition}
    commentRes={commentRes}
    addComment={async (body) => {
      const res = await addComment(params.id, body)
      // 添加成功后重新渲染组件
      if (res.code === 0) {
        setForceRefresh({})
      }
      return res
    }}
    addChildComment={async (id, body) => {
      const res = await addChildComment(id, body)
      if (res.code === 0) {
        setForceRefresh({})
      }
      return res
    }}
    removeComment={async (id) => {
      const res = await removeComment(id)
      if (res.code === 0) {
        setForceRefresh({})
      }
      return res
    }}
    removeChildComment={async (id) => {
      const res = await removeChildComment(id)
      if (res.code === 0) {
        setForceRefresh({})
      }
      return res
    }}
  />
}
