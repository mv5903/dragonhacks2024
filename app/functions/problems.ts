abstract class Problem {
    values: number[];
    solution: number;
    ID: string;
    isSolved: boolean;
    Problem (solution: number) {
        this.solution = solution;
    }

    // abstract getSolution for various types of math problems
    abstract getSolution(): number;

    // gets problem ID
    
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

    generateRandomKey(): string {
        let result = '';
        const characters = ""
    }
 }

 class Addition extends Problem {

 Addition (solution: number, values: number[], ID: string) {
           this.solution = solution;
        this
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

    getSolution(): number {
        var product = 1;

        for (let i = 0; i < this.values.length; i++) {
            product *= this.values[i];
        }
        return product;
    }
 }