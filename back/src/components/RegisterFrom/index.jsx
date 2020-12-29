import React,{useState} from 'react'
import { Form, Input, Button, message } from 'antd';
import { registerReq } from '@/service/api/admin'

export default function RegisterFrom({ changIsLogin, normalImg, greetingImg, blindfold, changePictureSrc }) {
  const [loading, setLoading] = useState(false)
  const onFinish = async values => {
    setLoading(true)
    const { username, password, secret } = values;
    const res = await registerReq(username, password, secret)
    if (res.code === 0) {
      message.success('注册成功')
      changIsLogin(true)
    } else {
      message.error('注册失败')
    }
    setLoading(false)
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

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请确定密码!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('密码不符合!');
            },
          }), {
            min: 6, message: '最小长度大于6!'
          }, {
            max: 16, message: '最大长度小于16!'
          }
        ]}
      >
        <Input.Password placeholder="确定密码" onFocus={() => {
          changePictureSrc(blindfold)
        }} onBlur={() => {
          changePictureSrc(normalImg)
        }} />
      </Form.Item>

      <Form.Item
        name="secret"
        rules={[{ required: true, message: '请输入暗号!' }]}
      >
        <Input.Password placeholder="你不知道的暗号" onFocus={() => {
          changePictureSrc(blindfold)
        }} onBlur={() => {
          changePictureSrc(normalImg)
        }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          注册
      </Button>
      </Form.Item>
    </Form>
  )
}



