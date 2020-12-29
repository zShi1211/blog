import axios from '../request'
import { admin } from '../url'
import defaultAvatar from '../../assets/img/defaultAvatar.png'
const { login, register, removeSelf, updataInfo, updatePwd, whoami } = admin;
// 登录
export const loginReq = async (loginId, loginPwd) => {
  return axios.post(login, {
    loginId,
    loginPwd
  })
}

// 注册
export const registerReq = async (loginId, loginPwd, cipher) => {
  return axios.post(register, {
    loginId,
    loginPwd,
    cipher,
    avatar: defaultAvatar
  })
}

// 删除自己
export const removeSelfReq = async (loginId, loginPwd, cipher) => {
  return axios.delete(removeSelf, {
    loginId,
    loginPwd,
    cipher
  })
}

// 修改信息
export const updataInfoReq = async (info) => {
  return axios.put(updataInfo, info)
}

// 修改密码
export const updatePwdReq = async (oldPwd, newPwd) => {
  return axios.put(updatePwd, {
    oldPwd,
    newPwd
  })
}

// 我是谁
export const whoamiReq = async () => {
  return axios.get(whoami)
}
