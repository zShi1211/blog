import React from 'react'
import Layout from '@/components/Layout'
import '@/assets/css/common.css'
import Loading from '@/components/Loading'
import { connect, history } from 'umi'
import Menu from '../components/Menu'

function index({ loginInfo, loading, children, location }) {
  // 进入登录页就返回登录页
  if (location.pathname === '/login') {
    return children
  }
  // 当前未登录且正在自动登录中就返回加载中，因为在模型中订阅whoami，初始化仓库是早于组件渲染的
  if (loading.effects['login/whoami'] && !loginInfo.isLogined) {
    return <Loading />
  }
  // 自动登录登陆失败就跳转到登录页
  if (!loginInfo.isLogined) {
    history.push('/login')
  }
  return (
    <Layout loginInfo={loginInfo} comp={children} />
  )
}

const mapState2Props = state => {
  return {
    loginInfo: state.login,
    loading: state.loading
  }
}

export default connect(mapState2Props)(index)
