import { history } from 'umi'
import { useState } from 'react'
import queryString from 'query-string'

// 通过地址栏参数映射页码条件
export default (page = 1, limit = 5) => {
  const { location } = history
  const search = {
    page: +location.query.page || page,
    limit: +location.query.limit || limit,
  }
  const [condition, setCondition] = useState(search)

  function mapUrlQuery(newCondition) {
    setCondition(newCondition);
    const condiStr = queryString.stringify(newCondition)
    history.push(`?${condiStr}`)
  }

  return [condition, mapUrlQuery]
}
