import { authMiddleware } from "@clerk/nextjs";
 

export default authMiddleware({
    publicRoutes:['/',"/api/webhook/clerk","/thread/:id","/profile/:id","/search","/communities"],
    ignoredRoutes:['/api/webhook/clerk']
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};