const authMiddleware = async ({session, request, response}, next) => {
    const request_pathname = request.url.pathname;
    if (request_pathname === '/' || request_pathname.startsWith('/api') || request_pathname.startsWith('/auth')) {
        await next();
    } else {
        const authenticated = await session.get('authenticated');
        if (authenticated) {
            response.status = 200;
            await next();
        } else {
            response.status = 401;
            response.redirect('/auth/login');
        }
        // implemente session check up functionality
    }
} 


export { authMiddleware };