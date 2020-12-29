const { Admin } = require('../models')
const { registerValidate, logOutValidate, updateInfoValidate, updatePwdValidate, loginValidate } = require('./validate/adminValidate')
const retaionProps = require('./utils/retainPrps')
const md5 = require('md5')

// 添加一个管理员
exports.addAdmin = async (adminObj) => {
    const res = await registerValidate(adminObj);
    if (res) {
        throw res;
    }
    // 管理员密码进行md5加密
    adminObj.loginPwd = md5(adminObj.loginPwd);
    return await Admin.create(adminObj)
}

// 删除一个管理员
exports.removeAdmin = async (_id) => {
    // 预先查看该用户是否存在
    const res = await logOutValidate(_id)
    if (res) {
        throw res
    }
    return await Admin.deleteOne({ _id })
}

// 修改一个管理员
exports.updateAdmin = async (_id, adminObj) => {
    // 只保留这几个属性多的不要
    adminObj = retaionProps(adminObj, 'loginId', 'nickName', 'avatar');
    const res = await updateInfoValidate(_id, adminObj)
    if (res) {
        throw res;
    }
    return await Admin.updateOne({ _id }, { $set: adminObj })
}

// 用户登录
//loginObj:{loginId, loginPwd}
exports.login = async (loginObj) => {
    const res = loginValidate(loginObj)
    if (res) {
        throw res;
    }
    const pwd = md5(loginObj.loginPwd);
    return await Admin.findOne({ loginId: loginObj.loginId, loginPwd: pwd }, "-loginPwd")
}

// 修改管理员密码
// pwdObj:{oldPwd, newPwd}
exports.updatePwd = async (_id, pwdObj) => {
    const res = await updatePwdValidate(pwdObj)
    if (res) {
        throw res;
    }
    const oldPwd = md5(pwdObj.oldPwd)
    const user = await Admin.findById(_id);
    if (user) {
        // 查看输入的密码是否与旧密码匹配
        if (oldPwd !== user.loginPwd) {
            throw "密码错误"
        }
    } else {
        throw "用户不存在"
    }
    const newPwd = md5(pwdObj.newPwd)
    return await Admin.updateOne({ _id, loginPwd: oldPwd }, { $set: { loginPwd: newPwd } })
}

// 我是谁
exports.whoami = async (_id) => {
    return await Admin.findById(_id, "-loginPwd")
}