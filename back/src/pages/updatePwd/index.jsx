import React, { } from 'react'
import { connect, history } from 'umi'
import { Form, Input, Button, message } from 'antd';

function index({ updatePwd }) {
  const onFinish = async values => {
    const { oldPwd, newPwd } = values
    const res = await updatePwd(oldPwd, newPwd)
    if (res) {
      message.success('修改成功')
      history.replace('/login')
    } else {
      message.error('修改失败')
    }
  }
  return (
    <div>
      <Form
        wrapperCol={{ span: 16 }}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          name="oldPwd"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input.Password placeholder="旧密码" />
        </Form.Item>


        <Form.Item
          name="newPwd"
          rules={[{ required: true, message: '请输入密码!' }, {
            min: 6, message: '最小长度大于6!'
          }, {
            max: 16, message: '最大长度小于16!'
          }]}
        >
          <Input.Password placeholder="新密码" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['newPwd']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确定密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                console.log(value)
                if (!value || getFieldValue('newPwd') === value) {
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
          <Input.Password placeholder="确定新密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit"  >
            登录
      </Button>
        </Form.Item>
      </Form>
    </div >
  )
}

const mapDispatch2Props = dispatch => {
  return {
    updatePwd(oldPwd, newPwd) {
      return dispatch({
        type: 'login/updatePwd', payload: {
          oldPwd,
          newPwd
        }
      })
    }
  }
}


const update = connect(undefined, mapDispatch2Props)(index)
update.title = "修改密码"
export default update
