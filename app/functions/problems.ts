import { getDB } from '../database/Database';

export default class Problem {
    solution: number;
    ID: string;
    type: string;
    isSolved: boolean;
    problemText: string;

    constructor(solution: number, problemText: string, type: string) {}

    // abstract getSolution for various types of math problems
    getSolution(): number {
        return this.solution;
    };

    getType(): string {
        return this.type;
    }

    // gets problem ID
    getProblemID (): string {
        return this.ID;
    }

    // get if the problem is solved 
    getIfSolved (): boolean {
        return this.isSolved;
    }
    
    // Checks to see whether user's answer is correct
    isCorrect(userSolution: number): boolean {
        if (this.getSolution() == userSolution) {
            this.isSolved = true;
        }
        else {
            console.log("This answer is incorrect, try again!")
            return false;
        }
    }

    // creates a random key to use as the problem  ID

    generateRandomKey(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    getProblemText(): String {
        return this.problemText;
    }

    static async getProblem(type: string): Promise<any> {
        const db = await getDB();
        const problems = db.collection('Problems');

        // Convert the findOne with callback to a promise using await
        const result = await problems.find( { type } ).toArray();
        if (result.length == 0) {
            throw new Error('No problems of this type exist');
        }
        else if (result.length == 1) {
            return { text: result[0].problemText, solution: result[0].solution};  // Return the result directly
        }
        else {
            const randomIndex = Math.floor(Math.random() * result.length);
            const randQuestion = result[randomIndex];
            return { text: randQuestion.problemText, solution: randQuestion.solution};

        }
     }
 }


