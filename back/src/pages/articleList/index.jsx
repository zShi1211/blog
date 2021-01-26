import React, { useState, useEffect } from 'react'
import { Table, Button, Image, Popconfirm, message } from 'antd';
import { getManyArticle, removeArticle } from '../../service/api/article';
import { Link } from 'umi'
import DateFormat from '@/components/DateFormat'
import useCondition from '../../hooks/useConditionHook'

function index() {

  const [articles, setArticles] = useState({ count: 0, datas: [] })
  const [loading, setLoading] = useState(false)

  // 自定义hooks 将条件映射到地址栏
  const [condition, setCondition] = useCondition(1, 5)


  useEffect(() => {
    (async () => {
      setLoading(true)
      const res = await getManyArticle(condition.page, condition.limit)
      setLoading(false)
      if (res.code === 0) {
        setArticles(res.data)
      }
    })()
  }, [condition])

  const columns = [
    {
      title: '封面',
      dataIndex: 'picture',
      align: 'center',
      render: url => <Image src={url} width={300} />,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '喜欢',
      dataIndex: 'like',
    },
    {
      title: '文字',
      dataIndex: 'words',
    },
    {
      title: '阅读',
      dataIndex: 'read',
    },
    {
      title: '发布时间',
      dataIndex: 'time',
      render: date => {
        return <DateFormat date={date} format={"YYYY-MM-DD"} />
      }
    },
    {
      title: "操作",
      dataIndex: 'operation',
      render: id => (
        <div>
          <Button type="primary">
            <Link to={`/articleList/${id}`}>详情</Link>
          </Button>
          <Button type="ghost">
            <Link to={`/articleList/${id}/comment`}>评论</Link>
          </Button>
          <Popconfirm title="确定要删除吗？" okText="Yes" cancelText="No" onConfirm={async () => {
            const res = await removeArticle(id)
            if (res.code === 0) {
              message.success("删除成功");
              // 为了删除后重新获取数据
              setCondition({
                ...condition
              })
            } else {
              message.error('删除失败')
            }
          }}>
            <Button danger>删除</Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  const data = articles.datas.map((item, index) => ({
    key: index,
    picture: item.picture,
    title: item.title,
    like: item.like,
    words: item.words,
    read: item.read,
    time: item.time,
    operation: item._id
  }))


  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: condition.page,
          total: articles.count,
          pageSize: condition.limit,
          onChange: newPage => {
            setCondition({
              ...condition,
              page: newPage
            })
          }
        }} />
    </div>
  )
}
index.title = "文章列表"
export default index;
