const validate = require('validate.js')

const commentRule = {
    content: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    },
    nickName: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    },
    avatar: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    }
}

exports.commentValidate = (obj) => {
    return validate(obj, commentRule)
}

const childCommentRule = {
    to: {
        type: 'string',
    },
    "from.nickName": {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    },
    "from.avatar": {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    },
    content: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    }
}

exports.childCommentValidate = (obj) => {
    return validate(obj, childCommentRule)
}