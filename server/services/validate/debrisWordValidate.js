const validate = require('validate.js')

const rule = {
    content: {
        type: 'string',
        presence: {
            allowEmpty: false
        }
    }
}

module.exports = (obj) => {
    return validate(obj, rule)
}