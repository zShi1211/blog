const xss = require('xss')
const options = {
    onTag: (tag, html, options) => {
        return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}
const xssFromat = (obj, ...args) => {
    if (typeof obj === 'string') {
        return xss(obj, options)
    } else if (Array.isArray(obj)) {
        const arr = [];
        obj.forEach(item => {
            // 如果属性还是一个数组或对象就递归调用
            if (Array.isArray(item) || (obj !== null && typeof item === 'object')) {
                arr.push(xssFromat(item, ...args));
                return;
            }
            arr.push(xss(item, options))
        })
        return arr
    } else if (obj !== null && typeof obj === 'object') {
        const o = {};
        for (const prop in obj) {
            if (args.includes(prop)) {
                o[prop] = xss(obj[prop], options)
                // 如果属性还是一个数组或对象就递归调用
            } else if (Array.isArray(obj[prop]) || (obj !== null && typeof obj[prop] === 'object')) {
                o[prop] = xssFromat(obj[prop], ...args)
            } else {
                o[prop] = obj[prop]
            }
        }
        return o
    }
    return obj
}

module.exports = xssFromat