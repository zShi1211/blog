import React from 'react'
import { Avatar, Button, Menu } from 'antd'
import { connect, history, NavLink } from 'umi'
import styles from './index.less'
import {
  UserOutlined,
  MailOutlined,
  UploadOutlined,
  FormOutlined,
  DatabaseOutlined,
  AlertOutlined,
  SmileOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

export default function index({ loginInfo }) {
  const { info } = loginInfo;
  const { location } = history
  return (
    <div className={styles.wrapper}>
      <div className={styles.userInfo}>
        <Avatar size={64} icon={<img src={info.avatar} />} className={styles.avatar} onClick={() => {
          history.push('/userInfo')
        }} />
        <div className={styles.infoRight}>
          <p className={styles.nickName} onClick={() => {
            history.push('/userInfo')
          }} >{info.nickName}</p>
          <Button size='small' danger onClick={() => {
            history.push('/login');
            localStorage.removeItem('Authorization')
          }}>退出</Button>
        </div>
      </div>
      <Menu theme="dark" mode="vertical" selectedKeys={[location.pathname]} >
        <Menu.Item key="/" icon={<SmileOutlined />} >
          <NavLink to="/">首页</NavLink>
        </Menu.Item>
        <Menu.Item key="/leaveWord" icon={<MailOutlined />} >
          <NavLink to="/leaveWord">留言</NavLink>
        </Menu.Item>
        <Menu.Item key="/debrisWord" icon={<AlertOutlined />} >
          <NavLink to="/debrisWord">碎语</NavLink>
        </Menu.Item>
        <Menu.Item key="/articleList" icon={<UnorderedListOutlined />} >
          <NavLink to="/articleList">文章列表</NavLink>
        </Menu.Item>
        <Menu.Item key="/addArticle" icon={<FormOutlined />} >
          <NavLink to="/addArticle">添加文章</NavLink>
        </Menu.Item>
        <Menu.Item key="/userInfo" icon={<UserOutlined />}>
          <NavLink to="/userInfo">用户信息</NavLink>
        </Menu.Item>
        <Menu.Item key='/updatePwd' icon={<DatabaseOutlined />} >
          <NavLink to="/updatePwd">修改密码</NavLink>
        </Menu.Item>
        <Menu.Item key="/fileUpload" icon={<UploadOutlined />}>
          <NavLink to="/fileUpload">文件上传</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  )
}
