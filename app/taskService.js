import { readTasks, saveTasks } from './storage.js';
import { format } from 'date-fns';
import chalk from 'chalk';
import Table from 'cli-table3';

const getTimestamp = () => format(new Date(), 'dd/MM/yyyy HH:mm');

export async function addTask(description) {
    const tasks = await readTasks();
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    
    const newTask = {
        id: newId,
        description,
        status: 'todo',
        createdAt: getTimestamp(),
        updatedAt: getTimestamp()
    };

    tasks.push(newTask);
    await saveTasks(tasks);
    console.log(chalk.green(`✔ Task added successfully (ID: ${newId})`));
}

export async function updateTask(id, newDescription, newStatus = null) {
    const tasks = await readTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) throw new Error(`Task ${id} not found`);

    if (newDescription) tasks[index].description = newDescription;
    if (newStatus) tasks[index].status = newStatus;
    
    tasks[index].updatedAt = getTimestamp();

    await saveTasks(tasks);
    console.log(chalk.green(`✔ Task ${id} updated successfully`));
}

export async function deleteTask(id) {
    let tasks = await readTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length === initialLength) throw new Error(`Task ${id} not found`);

    await saveTasks(tasks);
    console.log(chalk.green(`✔ Task ${id} deleted`));
}

export async function listTasks(filterStatus = null) {
    const tasks = await readTasks();
    const filtered = filterStatus ? tasks.filter(t => t.status === filterStatus) : tasks;

    if (filtered.length === 0) {
        console.log(chalk.yellow("No tasks found."));
        return;
    }

    const table = new Table({
        head: ['ID', 'Description', 'Status', 'Created', 'Updated'].map(h => chalk.cyan(h))
    });

    filtered.forEach(t => {
        const statusColor = t.status === 'done' ? chalk.green : (t.status === 'in-progress' ? chalk.yellow : chalk.red);
        table.push([t.id, t.description, statusColor(t.status), t.createdAt, t.updatedAt]);
    });

    console.log(table.toString());
}