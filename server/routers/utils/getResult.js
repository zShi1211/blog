exports.getSendResult = (data) => {
    return {
        code: 0,
        message: "",
        data
    }
}

exports.getErrorResult = (message) => {
    return {
        code: 1,
        message: message,
    }
}