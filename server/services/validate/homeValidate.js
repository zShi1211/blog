const validate = require('validate.js')

const rule = {
    bgImg: {
        type: 'string',
        presence: {
            allowEmpty: false
        }
    },
    description: {
        type: 'string',
        presence: {
            allowEmpty: false
        }
    },
    icp: {
        type: 'string',
        presence: {
            allowEmpty: false
        }
    },
    bgm: {
        type: 'string',
        presence: {
            allowEmpty: false
        }
    },
}

module.exports = (obj) => {
    return validate(obj, rule)
}