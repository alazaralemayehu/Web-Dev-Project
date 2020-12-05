const authMiddleware = async ({session, request, response}, next) => {
    const request_pathname = request.url.pathname;
    if (request_pathname === '/' || request_pathname === '/api') {
        await next();
    } else {
        const authenticated = await session.get('authenticated');
        if (authenticated) {
            await next();
        } else {
            response.status = 401;
        }
        // implemente session check up functionality
    }
} 


export { authMiddleware };