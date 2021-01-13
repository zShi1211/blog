module.exports = (context, ret) => {
 
    const { request } = context

    if (request.method === 'GET' && request.headers.accept.includes('text/html') && !context.parsedUrl.pathname.includes('.')) {
        return ret
    }
    return context.parsedUrl.pathname

}