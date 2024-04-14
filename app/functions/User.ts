import { SubjectTree } from "../shared/SubjectTree";

export default class User {
    subjects = Object.keys(SubjectTree);

    id: string;
    completedProbs: Map<string, number>;

    constructor(id: string) {
        this.id = id;
        this.completedProbs = this.generateEmptyMap();
    }
    
    static async getUser(id: string): Promise<any> {
        const { MongoClient } = require('mongodb');
        
        const client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        try {
            await client.connect();
            const db = client.db('Mathathon');
            const users = db.collection('Users');
    
            // Convert the findOne with callback to a promise using await
            const result = await users.findOne({ id });
            if (result === null) {
                // If the user does not exist, create a new user
                let newUser = new User(id);
                await users.insertOne({ id, completedProbs: JSON.stringify(newUser.getCompletedProbs()) });
                return { id, completedProbs: newUser.getCompletedProbs() };
            }
            return { id: result.id, completedProbs: JSON.parse(result.completedProbs) };  // Return the result directly
        } catch (err) {
            console.error('An error occurred:', err);
            throw err;  // Re-throw the error to handle it in the calling function
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }

    getID(): string {
        return this.id;
    }

    getCompletedProbs(): Map<string, number> {
        return this.completedProbs;
    }

    setCompletedProbs(completedProbs: Map<string, number>) {
        this.completedProbs = completedProbs;
    }
    
    // returns map but every index is the completed percentage of the subject insteaad of the total problem amount
    getCompletedPercentages(): Map<string, number> {
        var completed = new Map<string, number>();
        this.subjects.forEach(function(value) {
            completed[value] = completed[value]/10
        })
        return completed;
    }

    // calculate how many of the 140 proficiency problems, 10 for all 14 topics, have been completed by user
    getTotalProgress(): number {
        var total = 0;
        this.subjects.forEach(function(subj) {
            total += this.subjects[subj];
        })
        return total/140;
    }

    //initializes the problems map for the user
    generateEmptyMap(): Map<string, number> {
        var completed = new Map<string, number>();
        this.subjects.forEach(function(value) {
            completed[value] = 0;
        })
        return completed;

    }

    // increases the amount of problems completed under a subject by 1 when a problem is done
    static async incrementUser(id: string, subject:string): Promise <any> {
        const { MongoClient } = require('mongodb');
        const client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        try {
            await client.connect();
            const db = client.db('Mathathon');
            const users = db.collection('Users');
    
            // Convert the findOne with callback to a promise using await
            const result = await users.findOne({ id });
            var newUser = new User(id);
            newUser.setCompletedProbs(JSON.parse(result.completedProbs))
            newUser.completedProbs[subject] += 1;
            users.updateMany({id: id}, {$set: {completedProbs: JSON.stringify(newUser.completedProbs)}})
            return {success: "Succesfully incremented"}
            
        } catch (err) {
            console.error('An error occurred:', err);
            throw err;  // Re-throw the error to handle it in the calling function
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
        
    }

} 