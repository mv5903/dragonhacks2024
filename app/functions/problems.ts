abstract class Problem {
    values: number[];
    solution: number;
    ID: string;
    isSolved: boolean;
    Problem (solution: number, values: number[]) {
    }

    // abstract getSolution for various types of math problems
    abstract getSolution(): number;

    // gets problem ID
    getProblemID (): string {
        return this.ID;
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
 }

 // Addition problems that include entering values
 class Addition extends Problem {

    Addition (solution: number, values: number[]) {
        this.solution = solution;
        this.values = values;
        this.ID = this.generateRandomKey(10);
        this.isSolved = false;
        }

    getSolution(): number {
        var sum = 0;
        for (let i = 0; i < this.values.length; i++) {
            sum += this.values[i];
        }
        return sum;
    }
 }

 class Multiplication extends Problem {

    Multiplication (solution: number, values: number[]) {
    }


    getSolution(): number {
        var product = 1;

        for (let i = 0; i < this.values.length; i++) {
            product *= this.values[i];
        }
        return product;
    }
 }

 class MultiplicationEasy extends Multiplication {

    problemText: string;

    MultiplicationEasy (solution: number, values: number[]) {
        this.solution = solution;
        this.values = values;
        this.ID = this.generateRandomKey(10);
        this.isSolved = false;

    }

    getSolution(): number {
        var product = 1;

        for (let i = 0; i < this.values.length; i++) {
            product *= this.values[i];
        }
        return product;
    }
 }

 class MultiplicationHard extends Multiplication {}