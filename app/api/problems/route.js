import { NextResponse } from "next/server";
import Problem from "../../functions/problems";
import User from "../../functions/User";

// retrieve question from database
export async function GET(request) {
  // GET:  http://localhost:3000/api/users?id=someidhere
  
  // MATT DOES THE FETCH REQUEST
  
  const data = await Problem.getProblem(request);

  return NextResponse.json(data, { status: 200 });
}

// when user answers question
export async function POST(request) {
    // GET:  http://localhost:3000/api/users?id=someidhere

    return NextResponse.json(data, { status: 200 });
  }