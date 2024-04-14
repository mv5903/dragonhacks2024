  import OpenAI from "openai";    
const apiKey = process.env.OPENAI_API_KEY;
const url = "https://chat.openai.com/g/g-hsnfatwFT-mathgeniuspro";

export async function generateProblem(subject: string, difficulty: string): Promise<any> {
    const openai = new OpenAI();
    
    // get data using prompt
    const data = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `generate 1 ${subject} problem with ${difficulty} difficulty in json with each problem having a solution. Please only give me the equation in the question.` }]
    })
    
    // Parse through the contents and find problems and solution
    const contentsJSON = JSON.parse(data.choices[0].message.content);
    // var Prob = new Problem(contentsJSON.solution, contentsJSON.problem, subject);
    return contentsJSON;
}