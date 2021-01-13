import React, { useState } from 'react'
import { Comment, Avatar, Button, Modal, message, Input, Empty, Badge, Popconfirm } from 'antd'
import { connect } from 'umi'
import DateFormat from '../DateFormat'

const { TextArea } = Input;

function index({ comment, loginInfo, addChildComment, removeComment, removeChildComment }) {
  const { info: userInfo } = loginInfo;
  const [reply, setReply] = useState({
    id: '',
    name: '',
  })
  const [commentContent, setCommentContent] = useState("")
  const [showModal, setShowModal] = useState(false);
  const list = comment.map(item => (<Comment
    key={item._id}
    actions={[<Button
      type="primary"
      onClick={() => {
        setReply({
          name: '',
          id: item._id,
        })
        setShowModal(true)
      }} >回复</Button>,
    <Popconfirm
      title="确定要删除吗？"
      okText="是的"
      cancelText="不了"
      onConfirm={async () => {
        const res = await removeComment(item._id)
        if (res.code === 0) {
          message.success('删除成功')
        } else {
          message.error('删除失败')
        }
      }}
    >
      <Button>删除</Button>
    </Popconfirm>
    ]}
    author={<span>{item.nickName}{item.isAdmin ? <Badge style={{ backgroundColor: '#52c41a' }} count="博主" /> : null}</span>}
    avatar={
      <Avatar
        src={item.avatar}
      />}
    content={
      <p>
        {item.content}
      </p>
    }
    datetime={
      <DateFormat
        date={item.time}
        format="YYYY-MM-DD HH:mm:ss" />
    }
  >

    {/* 子评论 */}
    {item.childComment.map(i => (<Comment
      key={i._id}
      actions={[<Button
        type="primary"
        onClick={() => {
          setReply({
            name: i.from.nickName,
            id: item._id,
          })
          setShowModal(true)
        }} >回复</Button>,
      <Popconfirm
        title="确定要删除吗？"
        okText="是的"
        cancelText="不了"
        onConfirm={async () => {
          const res = await removeChildComment(i._id)
          if (res.code === 0) {
            message.success('删除成功')
          } else {
            message.error('删除失败')
          }
        }}
      >
        <Button>删除</Button>
      </Popconfirm>
      ]}
      author={<span>
        <span>
          {i.from.nickName}
          {i.from.isAdmin ? <Badge count="博主" style={{ backgroundColor: '#52c41a' }} /> : null}
        </span>
        {
          i.to ? (<span><span style={{ padding: '0 5px' }}>回复</span>
            <span>{i.to}</span></span>) : null
        }

      </span>}
      avatar={
        <Avatar
          src={i.from.avatar}
        />}
      content={
        <p>
          {i.content}
        </p>
      }
      datetime={
        <DateFormat date={item.time} format="YYYY-MM-DD HH:mm:ss" />
      }
    >
    </Comment>))}

  </Comment>))

  return (
    <div>
      {
        comment.length === 0 ?
          <Empty description="暂时没有数据" />
          : <div>
            {list}
            <Modal
              title={`回复：${reply.name}`}
              visible={showModal}
              onOk={async () => {
                const res = await addChildComment(reply.id, {
                  from: {
                    nickName: userInfo.nickName,
                    avatar: userInfo.avatar,
                    isAdmin: true
                  },
                  to: reply.name === '' ? null : reply.name,
                  content: commentContent
                })
                if (res.code === 0) {
                  message.success('评论成功')
                  setCommentContent('')
                  setShowModal(false)
                } else {
                  message.error('评论失败')
                }
              }} onCancel={() => {
                setShowModal(false)
              }}>
              <TextArea
                rows={4}
                placeholder="说你想说的..."
                value={commentContent}
                onChange={e => {
                  setCommentContent(e.target.value)
                }} />
            </Modal>
          </div >
      }
    </div>

  )
}

const mapState2Props = state => {
  return {
    loginInfo: state.login
  }
}

export default connect(mapState2Props)(index)
