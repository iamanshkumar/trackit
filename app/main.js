import readline from 'readline-sync';
import fs, { read } from "node:fs";
import {readdir} from "node:fs/promises";
import {format} from "date-fns"

let exit = false;

console.log("Hi welcome to TrackIt. A CLI application that tracks your task.");
console.log("Enter help to know all commands.")

const tasks = './tasks';

function createTask(currTask , id){
    let date = Date.now()
    const formattedDate = format(date , 'dd/MM/yyyy')
    let task = {
        "id" : id,
        "description" : currTask,
        "status" : "todo",
        "createdAt" : formattedDate,
        "updatedAt" : formattedDate
    }

    let filePath = tasks+`/task${id}.json`

    try{
        fs.writeFileSync(filePath , JSON.stringify(task,null,2));
        console.log("Task added successfully");
    }catch(err){
        console.log("Error while creating task : ",err);
    }
}

while(!exit){
    let choice = String(readline.question());
    if(choice=="help"){
        console.log("You can use the following commands to track your task");
        console.log("1. add : You can add a task");
        console.log("2. update {task-id} : You can update the description of your task");
        console.log("3. delete {task-id} : You can delete a task");
        console.log("4. mark-in-progress {task-id} : You can change the status of the task to in progress");
        console.log("5. mark-done {task-id} : You can change the status of the task to done");
        console.log("6. list : You can get the list of all the tasks");
        console.log("7. list todo : You can get list of all the tasks whose status is todo");
        console.log("8. list done : You can get list of all the tasks whose status is done");
        console.log("9. list in-progress : You can get list of all the tasks whose status is in-progress");
        console.log("10. exit : end the cli application");
    }
    if(choice==="exit"){
        exit = true;
    }
    
    else{
        if(choice.startsWith("add")){
            try{
                if(!fs.existsSync(tasks)){
                    fs.mkdirSync(tasks);
                }

                let currTask = choice.slice(4,choice.length);
                if(currTask.length<2){
                    console.log("You must enter a description");
                }else{
                    const totalTasks = await readdir(tasks);
                    let id = totalTasks.length+1;
                    createTask(currTask , id);
                }   
            }catch(err){
                console.log("Error in creating folder" , err);
            }
        }
        
        if(choice.startsWith("update")){
            try{
                let newDesc = choice.slice(7,choice.length);
                if(newDesc.length<2){
                    console.log("You must enter a description");
                }else{
                    console.log(newDesc);
                }
            }catch(err){
                console.log("Error in updating task" , err);
            }
        }
        else{
            console.log("Other options choosed");
        }
    }
}