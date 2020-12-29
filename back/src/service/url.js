import { addBasePath } from './util'

// basePath:/admin
export const admin = addBasePath({
  login: '/login',
  register: '/',
  removeSelf: '',
  updataInfo: '',
  updatePwd: '/pwd',
  whoami: ''
}, '/admin')


