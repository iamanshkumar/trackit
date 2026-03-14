import fs from 'node:fs/promises';
import path from 'node:path';

const DB_PATH = path.resolve('./tasks.json');

export async function readTasks() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

export async function saveTasks(tasks) {
    await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
}