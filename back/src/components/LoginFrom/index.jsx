import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { history, connect } from 'umi'

function LoginFrom({ loading, fetchLogin, greetingImg, normalImg, blindfold, changePictureSrc }) {
  const onFinish = async values => {
    const { username, password } = values;
    const res = await fetchLogin(username, password)
    if (res) {
      message.success('登录成功')
      history.replace('/')
    } else {
      message.error('登录失败')
    }
  };
  return (
    <Form
      wrapperCol={{ span: 16 }}
      name="basic"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }, {
          min: 3, message: '最小长度大于3!'
        }, {
          max: 16, message: '最大长度小于16!'
        }]}
      >
        <Input placeholder="用户名" onFocus={() => {
          changePictureSrc(greetingImg)
        }} onBlur={() => {
          changePictureSrc(normalImg)
        }} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }, {
          min: 6, message: '最小长度大于6!'
        }, {
          max: 16, message: '最大长度小于16!'
        }]}
      >
        <Input.Password placeholder="密码" onFocus={() => {
          changePictureSrc(blindfold)
        }} onBlur={() => {
          changePictureSrc(normalImg)
        }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading.effects['login/fetchLogin']}>
          登录
      </Button>
      </Form.Item>
    </Form>
  )
}

const mapState2Props = state => {
  return {
    loading: state.loading
  }
}

const mapDispatch2Props = dispatch => {
  return {
    fetchLogin(username, password) {
      return dispatch({
        type: 'login/fetchLogin',
        payload: { username, password }
      })
    }
  }
}

export default connect(mapState2Props, mapDispatch2Props)(LoginFrom)
