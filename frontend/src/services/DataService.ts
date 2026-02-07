import type { Employee } from '../model/Employee'
const baseUrl = 'http://localhost:3001/api/employees';

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await fetch(baseUrl);
    return response.json();
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
    const response = await fetch(`${baseUrl}/${id}`);
    return response.json();
};

export const addEmployee = async (employee: Employee) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });
    return response.json();
};

export const updateEmployee = async (id: number, employee: Employee) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });
    return response.json();
};

export const deleteEmployee = async (id: number) => {
    await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
};  