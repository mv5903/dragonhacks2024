import { NextResponse } from "next/server";
import Problem from "../../functions/problems";
import { generateProblem } from "../../functions/generateProblem"
import User from "../../functions/User";

// retrieve question from database
export async function GET(request) {
  // GET:  http://localhost:3000/api/users?id=someidhere
  
  // MATT DOES THE FETCH REQUEST
  const params = new URLSearchParams(request.url.substring(request.url.indexOf('?') + 1))
  const type = params.get('subject');

  const data = await generateProblem(type, "medium");

  return NextResponse.json(data, { status: 200 });
}

// when user answers question
export async function POST(request) {
    // GET:  http://localhost:3000/api/users?id=someidhere

    const params = new URLSearchParams(request.url.substring(request.url.indexOf('?') + 1))
    const id = params.get('id');
    const subject = params.get('subject');

    const data = await User.incrementUser(id, subject);

    return NextResponse.json(data, { status: 200 });
}