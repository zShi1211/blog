import axios from '../request'
import defaultAvatar from '../../assets/img/defaultAvatar.png'
// 登录
export const loginReq = async (loginId, loginPwd) => {
  return axios.post('/admin/login', {
    loginId,
    loginPwd
  })
}

// 注册
export const registerReq = async (loginId, loginPwd, cipher) => {
  return axios.post('/admin', {
    loginId,
    loginPwd,
    cipher,
    avatar: defaultAvatar
  })
}

// 删除自己
export const removeSelfReq = async (loginId, loginPwd, cipher) => {
  return axios.delete('/admin', {
    loginId,
    loginPwd,
    cipher
  })
}

// 修改信息
export const updataInfoReq = async (info) => {
  return axios.put('/admin', info)
}

// 修改密码
export const updatePwdReq = async (oldPwd, newPwd) => {
  return axios.put('/admin/pwd', {
    oldPwd,
    newPwd
  })
}

// 我是谁
export const whoamiReq = async () => {
  return axios.get('/admin')
}
