const validate = require('validate.js')

const rule = {
    title: {
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
    },
    read: {
        type: 'number',
        numericality: {
            onlyInteger: true
        }
    },
    like: {
        type: 'number',
        numericality: {
            onlyInteger: true
        }
    },
    picture: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    },
    words: {
        type: 'number',
        numericality: {
            onlyInteger: true
        }
    },
    time: {
        type: 'date',
    },
    contentHtml: {
        type: 'string',
        presence: {
            allowEmpty: false
        },
    }
}

module.exports = (obj) => {
    return validate(obj, rule)
}