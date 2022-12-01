//import fs library
const fs = require('fs');
const process = require('process');
const { exec } = require('child_process');

//write out data
function done(output) {
    console.log('Dir: ',process.cwd())
    process.stdout.write('prompt > ');
}

// where we will store our commands
function evaluateCmd(userInput){
    // parses the user input to understand which command was typed
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0]; 
    switch (command) {
        case "cd":
            commandLibrary.cd(userInputArray.slice(1));
            break;
        case "exit":
            console.log('Good Bye!!');
            process.exit(0)
        default:
            const child = exec(userInput);
            child.stdout.on('data', (data) => {
            console.log(`${data}`);
            
            });
            child.stderr.on("data", data => {
                console.log(`stderr: ${data}`);
            });
            child.on('error', (error) => {
                console.log(`error: ${error.message}`);
            });
            
            child.on("close", code => {
                done('Done');
            });
    
}
}
const commandLibrary = { 
    "cd": function (fullPath){
        const filepath = fullPath[0];
        try {
 
            // Change the directory
            process.chdir(filepath);
          } catch (err) {
            // Printing error if occurs
            console.error("error while changing directory");
          }
          done('Done');
    }
};
//prompt the user for input
process.chdir(process.env.HOME)
console.log('Dir: ',process.cwd())
process.stdout.write('prompt > ');
process.on('SIGINT', () => {
    console.log('Pressed Control C');
    done('Done')
  });

// the stdin 'data' event triggers after a user types in a line
process.stdin.on('data', (userInput) => {
    
    userInput = userInput.toString().trim();
    evaluateCmd(userInput);
}); 
