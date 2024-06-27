export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"], // we are redirected to the home page if the user is not authenticated (thanks to the middleware)
};
