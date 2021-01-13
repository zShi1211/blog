import React, { useEffect, useState } from 'react'
import { addChildLeavaWord, addLeavaWord, getLeavaWord, removeChildLeavaWord, removeLeavaWord } from '../../service/api/leaveWord'
import useCondition from '@/hooks/useConditionHook'
import CommentList from '@/components/CommentList'

/*
由于该页面与文章评论结构一致
只需要给数据以及处理函数
*/
export default function LeavaWordList({ }) {
  const [commentRes, setCommentRes] = useState(null)
  const [forceRefresh, setForceRefresh] = useState({})
  const [condition, setCondition] = useCondition(1, 5)
  useEffect(() => {
    (async () => {
      const res = await getLeavaWord(condition.page, condition.limit)
      console.log(res);
      if (res.code === 0) {
        setCommentRes(res.data)
      }
    })()
  }, [forceRefresh, condition])

  return <CommentList
    /* 数据 */
    condition={condition}
    setCondition={setCondition}
    commentRes={commentRes}
    /* 处理函数 */
    addComment={async (body) => {
      const res = await addLeavaWord(body)
      // 添加成功后重新渲染组件
      if (res.code === 0) {
        setForceRefresh({})
      }
      return res
    }}
    addChildComment={async (id, body) => {
      const res = await addChildLeavaWord(id, body)
      if (res.code === 0) {
        setForceRefresh({})
      }
      return res
    }}
    removeComment={async (id) => {
      const res = await removeLeavaWord(id)
      if (res.code === 0) {
        setForceRefresh({})
      }
      return res
    }}
    removeChildComment={async (id) => {
      const res = await removeChildLeavaWord(id)
      if (res.code === 0) {
        setForceRefresh({})
      }
      return res
    }}
  />
}
