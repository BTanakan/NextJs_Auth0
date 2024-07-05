import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession } from "@auth0/nextjs-auth0/edge";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  permissions?: string[];
  [key: string]: any;
}

export default withMiddlewareAuthRequired(async (req) => {
  const res = NextResponse.next();

  const user = await getSession(req, res);

  if (!user) {
    return NextResponse.redirect("/api/auth/login");
  }

  if (!user.accessToken) return res;

  const userPermissions = jwtDecode<MyJwtPayload>(user.accessToken);
  console.log("🚀 ~ withMiddlewareAuthRequired ~ userPermissions:", userPermissions);

  return res;
});

// ใช้กับ path ไหนบ้าง
export const config = {
  matcher: "/profile",
};
