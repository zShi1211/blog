import React, { useEffect, useState } from 'react'
import { Input, Button, message, Table, Modal, Popconfirm } from 'antd'
import { addDebrisWord, getManyDebrisWord, updateDebrisWord, getOneDebrisWord, removeDebrisWord } from '../../service/api/debrisWord'
import DateFormat from '../../components/DateFormat'
import useCondition from '../../hooks/useConditionHook'

const { TextArea } = Input

export default function index() {
  const [addDebrisWordContent, setAddDebrisWordContent] = useState('')
  const [upDateDebrisWordFetchRes, setUpDateDebrisWordFetchRes] = useState({ id: '', content: '' })
  const [debrisWrodFetchRes, setDebrisWrodFetchRes] = useState({ count: 0, datas: [] })
  const [forceRefresh, setForceRefresh] = useState({})
  const [showModal, setShowModal] = useState(false)

  const [condition, setCondition] = useCondition(1, 5)

  useEffect(() => {
    (async () => {
      const res = await getManyDebrisWord(condition.page, condition.limit)
      if (res.code === 0) {
        setDebrisWrodFetchRes(res.data)
      }
    })()
  }, [forceRefresh, condition])

  const columns = [
    {
      title: '内容',
      dataIndex: 'content',
      width: "70%"
    },
    {
      title: '时间',
      dataIndex: 'date',
      render: date => (<DateFormat date={date} format="YYYY-MM-DD" />)
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: id => (<div>
        <Button
          type="primary"
          onClick={async () => {
            const res = await getOneDebrisWord(id)
            if (res.code === 0) {
              setUpDateDebrisWordFetchRes(res.data)
              setShowModal(true)
            }
          }}
        >修改</Button>
        <Popconfirm
          title="确定要删除吗？"
          okText="是的"
          cancelText="不了"
          onConfirm={async () => {
            console.log(0)
            const res = await removeDebrisWord(id)
            if (res.code === 0) {
              message.success('删除成功')
              setForceRefresh({})
            } else {
              message.error("删除失败")
            }
          }}>
          <Button>删除</Button>
        </Popconfirm>

      </div>)
    }
  ]
  const data = debrisWrodFetchRes.datas.map((item) => ({
    key: item._id,
    content: item.content,
    date: item.time,
    operation: item._id
  }))


  return (
    <div>
      <div style={{ padding: "20px 0" }}>
        <TextArea
          rows={5}
          value={addDebrisWordContent}
          onChange={e => setAddDebrisWordContent(e.target.value)}
          placeholder="说点什么吧..."
        />
        <Button
          style={{ marginTop: 10 }}
          type="primary"
          onClick={async () => {
            const res = await addDebrisWord({ content: addDebrisWordContent })
            if (res.code === 0) {
              setForceRefresh({})
              setAddDebrisWordContent('')
              message.success('添加成功')
            } else {
              message.erroe('添加失败')
            }
          }}
        >
          添加
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: condition.page,
          pageSize: condition.limit,
          total: debrisWrodFetchRes.count,
          onChange: newPage => {
            setCondition(newPage);
          }
        }}
      />
      <Modal
        title="修改碎语"
        visible={showModal}
        onOk={async () => {
          console.log(upDateDebrisWordFetchRes)
          const res = await updateDebrisWord(upDateDebrisWordFetchRes._id, {
            content: upDateDebrisWordFetchRes.content
          })
          if (res.code === 0) {
            message.success('修改成功')
            setForceRefresh({})
            setShowModal(false)
          } else {
            message.error('修改失败')
          }
        }}
        onCancel={() => {
          setShowModal(false)
        }}
      >
        <TextArea
          rows={4}
          value={upDateDebrisWordFetchRes.content}
          onChange={e => {
            setUpDateDebrisWordFetchRes({
              ...upDateDebrisWordFetchRes,
              content: e.target.value
            })
          }}
          placeholder="说点什么吧..."
        />
      </Modal>
    </div>
  )
}
