import React from 'react'
import { Layout } from 'antd'
import Menu from '../Menu'
const { Sider, Content } = Layout

export default function index({ comp, loginInfo }) {
  return (
    <Layout style={{
      width: '100vw',
      height: '100vh'
    }}
    >
      <Sider
        breakpoint="md"
      >
        <Menu loginInfo={loginInfo} />
      </Sider>
      <Layout>
        <Content style={{
          padding: 20,
          overflowY: 'auto'
        }}>
          {comp}
        </Content>
      </Layout>
    </Layout>
  )
}
