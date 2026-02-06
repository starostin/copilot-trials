import { Pool } from 'pg';
import { dbConfig } from '../dbConfig';
import { Employee } from '../model/Employee';

export class EmployeeRepository {
    private pool = new Pool(dbConfig);

    async createEmployee(employee: Partial<Employee>): Promise<Employee> {
        const { name, email, department, salary } = employee;
        const query = `
            INSERT INTO employee (name, email, department, salary)
            VALUES ($1, $2, $3, $4)
        `;
        const result = await this.pool.query(query, [name, email, department, salary]);
        return result.rows[0];
    }

    async getEmployeeById(employee_id: number): Promise<Employee | undefined> {
        const query = `SELECT * FROM employee WHERE id = $1`;
        const result = await this.pool.query(query, [employee_id]);
        return result.rows[0];
    }

    async getAllEmployees(): Promise<Employee[]> {
        const query = `SELECT * FROM employee`;
        const result = await this.pool.query(query);
        return result.rows;
    }   

    async updateEmployee(employee_id: number, employee: Employee): Promise<void> {
        const { name, email, department, salary } = employee;
        const query = `
            UPDATE employee
            SET name = $1, email = $2, department = $3, salary = $4
            WHERE id = $5
        `;
        await this.pool.query(query, [name, email, department, salary, employee_id]);
    }

    async deleteEmployee(employee_id: number): Promise<void> {
        const query = `DELETE FROM employee WHERE id = $1`;
        await this.pool.query(query, [employee_id]);
    }
}