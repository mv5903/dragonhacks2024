// import {
//     Problem, 
//     Addition, 
//     AdditionEasy, 
//     AdditionHard, 
//     Multiplication, 
//     MultiplicationEasy,
//     MultiplicationHard,
//     WordProblem} from './problems' 

    
// import OpenAI from "openai";    
// require('dotenv').config();
// const apiKey = process.env.OPENAI_API_KEY;
// const url = "https://chat.openai.com/g/g-hsnfatwFT-mathgeniuspro";

// function generateProblem(mathTopic: string, difficulty: string, gradeLevel: number): Problem {
//     const openAi = new OpenAI();
    
//     const data = {
//         model: "MathGeniusPro",
        // prompt: `generate 10 ${difficulty} ${mathTopic} ${gradeLevel} grade problems in json with each problem having a token and solution. The tokens should follow this function of 10 characters generateRandomKey(length: number): string {
        //     let result = '';
        //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        //     for (let i = 0; i < length; i++) {
        //         result += characters.charAt(Math.floor(Math.random() * characters.length));
        //     }
        //     return result;
        // }, and make sure they follow the object notation of this abstract class 
        // abstract class Problem {
        //     solution: number;
        //     ID: string;
        //     type: string
        //     isSolved: boolean;
        //     problemText: string;
        //     Problem (solution: number, problemText: string) {
        //     }`,
//         max_tokens: 10
//     }

//     function pushProblem(): void { 
//         ;

//     }

//     const params = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${apiKey}`
//         },
//         body: JSON.stringify(data)
//     };

//     fetch(url, params)
//         .then(response => response.json())
//         .then(data => console.log(data.choices[0].text.trim()))
//         .catch(error => console.error('Error:', error));
// }