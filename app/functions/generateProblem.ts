import OpenAI from "openai";    
const apiKey = process.env.OPENAI_API_KEY;
const url = "https://chat.openai.com/g/g-hsnfatwFT-mathgeniuspro";

export async function generateProblem(subject: string, difficulty: string): Promise<any> {

    const openai = new OpenAI();
    
    // get data using prompt
    const data = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: `Generate 1 ${subject} problem with ${difficulty} difficulty in json in this format: {problem: , solution: }. Equation only for question in LaTeX format, where it starts and ends with a $, and any escaped latex operators (such as \\times) should have two backslashes instead of 1. Please don't add any other words besides the equation. Keep the numbers in the question up to 2 digits each. The solution should just be a number, and the correct solution to an equation should always be a whole number with whole number coeffecients.` }]
    })

    
    // Parse through the contents and find problems and solution
    const contentsJSON = JSON.parse(data.choices[0].message.content);
    // var Prob = new Problem(contentsJSON.solution, contentsJSON.problem, subject);
    return contentsJSON;
}