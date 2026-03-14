import readline from 'readline-sync';
import chalk from 'chalk';
import * as TaskService from './taskService.js';

console.log(chalk.cyan.bold("\n--- TrackIt CLI ---"));
console.log(chalk.gray("Type 'help' for commands or 'exit' to quit.\n"));

async function main() {
    let exit = false;

    while (!exit) {
        const input = readline.question(chalk.whiteBright("> ")).trim();
        const [command, ...args] = input.split(' ');

        try {
            switch (command) {
                case 'help':
                    printHelp();
                    break;

                case 'add':
                    const desc = args.join(' ');
                    if (!desc) return console.log(chalk.red("Error: Description required."));
                    await TaskService.addTask(desc);
                    break;

                case 'update':
                    const [upId, ...upDesc] = args;
                    await TaskService.updateTask(parseInt(upId), upDesc.join(' '));
                    break;

                case 'delete':
                    await TaskService.deleteTask(parseInt(args[0]));
                    break;

                case 'mark-in-progress':
                    await TaskService.updateTask(parseInt(args[0]), null, 'in-progress');
                    break;

                case 'mark-done':
                    await TaskService.updateTask(parseInt(args[0]), null, 'done');
                    break;

                case 'list':
                    const statusFilter = args[0]; // e.g., 'done', 'todo'
                    await TaskService.listTasks(statusFilter);
                    break;

                case 'exit':
                    exit = true;
                    break;

                default:
                    console.log(chalk.red("Unknown command. Type 'help'."));
            }
        } catch (err) {
            console.log(chalk.red(`Error: ${err.message}`));
        }
    }
}

function printHelp() {
    const commands = [
        ['add {desc}', 'Add a new task'],
        ['update {id} {desc}', 'Update task description'],
        ['delete {id}', 'Remove a task'],
        ['mark-in-progress {id}', 'Set status to in-progress'],
        ['mark-done {id}', 'Set status to done'],
        ['list', 'Show all tasks'],
        ['list {status}', 'Filter: todo, in-progress, done'],
        ['exit', 'Close application']
    ];
    console.log(chalk.yellow("\nAvailable Commands:"));
    commands.forEach(([cmd, desc]) => {
        console.log(`  ${chalk.bold(cmd.padEnd(25))} ${chalk.gray(desc)}`);
    });
    console.log();
}

main();