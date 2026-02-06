import { Client } from 'pg';
import { dbConfig } from '../src/dbConfig';

async function createEmployeeTable() {
    const client = new Client(dbConfig);

    try {
        await client.connect();

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS employee (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                department VARCHAR(50),
                salary DECIMAL(10, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await client.query(createTableQuery);
        console.log('Employee table created successfully');
    } catch (error) {
        console.error('Error creating employee table:', error);
    } finally {
        await client.end();
    }
}

createEmployeeTable();