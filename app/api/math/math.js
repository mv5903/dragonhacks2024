function getMathSolution(){
    let expression;

    let url = `http://api.mathjs.org/v4/?expr=${expression}`;

    fetch(url)
        .then(response => {
            if(response.ok){
                return response.text();
            }
            throw new Error('Failed API Call');
        })
        .then(result => {
            console.log(`The result of this expression is ${result}`);
        })
        .catch(error =>
            console.log('Error:', error)
        )
}