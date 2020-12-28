const validate = require('validate.js')
const { Admin } = require('../../models')

validate.validators.loginId = async value => {
    const res = await Admin.findOne({ loginId: value });
    if (res) {
        throw `${value}用户已存在`
    }
}

validate.validators.existId = async id => {
    try {
        const res = await Admin.findById(id);
        if (!res) {
            throw `${id}用户不存在`
        }
    } catch {
        throw `${id}用户不存在`
    }
}

// 这是一个公共的规则
const rule = {
    loginId: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
        length: {
            minimum: 3,
            maximum: 15
        }
    },
    nickName: {
        type: 'string',
        length: {
            minimum: 2,
            maximum: 10
        }
    },
    avatar: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    }
}

// 注册是的规则
const registerRule = {
    ...rule,
    loginPwd: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
        length: {
            minimum: 6,
            maximum: 16
        }
    },
}

exports.registerValidate = async (obj) => {
    // 同步验证与异步验证不能放一起
    const res = validate(obj, registerRule)
    if (res) {
        return res
    }
    await validate.async({ loginId: obj.loginId }, {
        loginId: {
            loginId: true
        }
    })
}

// 注销
exports.logOutValidate = async (id) => {
    await validate.async({ id }, {
        id: {
            existId: true,
            presence: {
                allowEmpty: false
            },
        }
    })
}

// 更新用户信息规则
const updateRule = {
    ...rule
}

exports.updateInfoValidate = async (id, obj) => {
    // 如果用户不存在就不用修改信息了
    await validate.async({ id }, {
        id: {
            existId: true,
            presence: {
                allowEmpty: false
            },
        }
    })
    return validate(obj, updateRule)
}

// 修改密码是的验证
const updatePwdRule = {
    oldPwd: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
        length: {
            minimum: 6,
            maximum: 16
        }
    },
    newPwd: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
        length: {
            minimum: 6,
            maximum: 16
        }
    }
}
exports.updatePwdValidate = async (pwdObj) => {
    return validate(pwdObj, updatePwdRule)
}

// 登录时验证
const loginRule = {
    loginId: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
        length: {
            minimum: 3,
            maximum: 15
        }
    },
    loginPwd: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
        length: {
            minimum: 6,
            maximum: 16
        }
    }
}
exports.loginValidate = (loginObj) => {
    return validate(loginObj, loginRule)
}