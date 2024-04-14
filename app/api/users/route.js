import { NextResponse } from "next/server";
import User from "../../functions/User";

export async function GET(request) {
  // GET:  http://localhost:3000/api/users?id=someidhere
  // userID: someidhere
  const params = new URLSearchParams(request.url.substring(request.url.indexOf('?') + 1))
  const userID = params.get('id');

  const data = await User.getUser(userID);

  return NextResponse.json(data, { status: 200 });
}