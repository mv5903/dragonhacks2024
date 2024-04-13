
export abstract class Problem {
    solution: number;
    ID: string;
    isSolved: boolean;
    problemText: string;
    Problem (solution: number, problemText: string) {
    }

    // abstract getSolution for various types of math problems
    getSolution(): number {
        return this.solution;
    };

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
 }

 // Addition problems that include entering values
 export abstract class Addition extends Problem {

    Addition (solution: number, problemText: string) {

        }

 }

 export class AdditionEasy extends Addition {
    a: number;
    b: number;

    AdditionEasy (solution: number, problemText: string) {
        this.solution = solution;
        this.ID = this.generateRandomKey(10);
        this.isSolved = false;
        this.problemText = problemText;
    }

 }

 export class AdditionHard extends Addition {

    values: number[];

    AdditionHard (solution: number, problemText: string, values: number[]) {
        this.solution = solution;
        this.ID = this.generateRandomKey(10);
        this.isSolved = false;
        this.problemText = problemText;
        this.values = values;
    }
 }

 export abstract class Multiplication extends Problem {

    Multiplication (solution: number) {
    }

 }

 export class MultiplicationEasy extends Multiplication {
    

    MultiplicationEasy (solution: number, problemText: string) {
        this.solution = solution;
        this.ID = this.generateRandomKey(10);
        this.isSolved = false;
        this.problemText = problemText;

    }
 }

 export class MultiplicationHard extends Multiplication {

    values: number[]

    MultiplicationHard (solution: number, problemText: string, values: number[]) {
        this.solution = solution;
        this.ID = this.generateRandomKey(10);
        this.isSolved = false;
        this.problemText = problemText;
        this.values = values;

    }

 }

 export class WordProblem extends Problem {
    operation: string;
    x: number;
    y: number;
 }