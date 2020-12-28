module.exports = (obj, ...args) => {
    const restProps = {}
    args.forEach(item => {
        restProps[item] = obj[item]
    })
    return restProps
}