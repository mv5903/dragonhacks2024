import { NextResponse } from "next/server";
import { generateProblem } from "../../functions/generateProblem";
import User from "../../functions/User";

// retrieve question from database
export async function GET(request) {
  // GET:  http://localhost:3000/api/users?id=someidhere

  const params = new URLSearchParams(request.url.substring(request.url.indexOf('?') + 1))
  const type = params.get('subject');

  const data = await generateProblem(type, "medium");

  // Fix problem and question so that \ are double \\
  data.problem = encodeURIComponent(data.problem);
  data.solution = encodeURIComponent(data.solution);

  return NextResponse.json(data, { status: 200 });
}

// when user answers question to increment count
export async function POST(request) {
    // POST:  http://localhost:3000/api/users?id=someidhere&subject=somesubjecthere
    const body = await request.json();

    const id = body.id
    const subject = body.subject;

    const data = await User.incrementUser(id, subject);

    return NextResponse.json(data, { status: 200 });
}