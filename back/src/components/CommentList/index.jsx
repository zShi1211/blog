import React, { useState } from 'react'
import Comment from './Comment'
import { Spin, Pagination, Button, Modal, Input, message } from 'antd'
import { connect } from 'umi'

const { TextArea } = Input

function comment({ loginInfo, commentRes, addComment, addChildComment, removeComment, removeChildComment, condition, setCondition }) {


  const [commentSlefContent, setCommentSlefContent] = useState('')
  const { info: userInfo } = loginInfo

  const [showModal, setShowModal] = useState(false)


  return commentRes ? <div>
    <Button
      onClick={async () => {
        setShowModal(true)
      }}
    >自说</Button>
    {/* 评论自己模态框 */}
    <Modal
      title="自说"
      visible={showModal}
      onOk={async () => {
        const res = await addComment({
          avatar: userInfo.avatar,
          isAdmin: true,
          content: commentSlefContent,
          nickName: userInfo.nickName
        })
        if (res.code === 0) {
          setShowModal(false)
          message.success('自说成功')
          setCommentSlefContent('')
        } else {
          message.success('自说失败')
        }
      }}
      onCancel={() => {
        setShowModal(false)
      }}
    >
      <TextArea
        value={commentSlefContent}
        onChange={e => setCommentSlefContent(e.target.value)} />
    </Modal>
    {/*  评论列表 */}
    <Comment
      comment={commentRes.datas}
      addChildComment={async (id, comment) => {
        const res = await addChildComment(id, comment)
        // 返回结果告诉组件关闭模态框
        return res;
      }}
      removeComment={async id => {
        const res = await removeComment(id)
        return res;
      }}
      removeChildComment={async id => {
        const res = await removeChildComment(id)
        return res;
      }}
    />

    <Pagination
      current={condition.page}
      total={commentRes.count}
      onChange={newPage => {
        setCondition({
          ...condition,
          page: newPage
        })
      }}
      pageSize={condition.limit}
    />
  </div > : <Spin size="large" />
}

const mapState2Props = state => {
  return {
    loginInfo: state.login
  }
}

export default connect(mapState2Props)(comment)
