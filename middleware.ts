
// We have a middleware in auth that check the session
// and redirect to /login if not logged in
export { default } from "next-auth/middleware";

export const config = {
    // *: 0 or more params
    // +: 1 or more params
    // ?: 0 or 1 params
    // This will prevent the user trying to access /dashboard without being logged in
    matcher: ['/dashboard/:path*'] // match all routes starting with /dashboard
}
