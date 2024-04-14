  import OpenAI from "openai";    
const apiKey = process.env.OPENAI_API_KEY;
const url = "https://chat.openai.com/g/g-hsnfatwFT-mathgeniuspro";

export async function generateProblem(subject: string, difficulty: string): Promise<any> {

    const openai = new OpenAI();
    
    // get data using prompt
    const data = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: `generate 1 ${subject} problem with ${difficulty} difficulty in json in this format: {problem: , solution: }. Equation only for question in LaTeX format. Please don't add any other words besides the equation. The solution should just be a number. THe question should only be 5 tokens worth of complexity.` }]
    })

    
    // Parse through the contents and find problems and solution
    const contentsJSON = JSON.parse(data.choices[0].message.content);
    // var Prob = new Problem(contentsJSON.solution, contentsJSON.problem, subject);
    return contentsJSON;
}