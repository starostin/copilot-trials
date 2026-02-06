export interface Employee {
    name: string;
    age: number;
    salary: number;
}

const employees : Employee[] = [
    {
        name: "Alice Johnson",
        age: 28,
        salary: 70000
    },
    {
        name: "Bob Smith",
        age: 35,
        salary: 85000
    },
    {
        name: "Charlie Brown",
        age: 40,
        salary: 95000
    }
];

/**
 * Finds an employee by their name.
 * @param name - The name of the employee to search for.
 * @returns The employee object if found, otherwise undefined.
 */
function findEmployeeByName(name: string): Employee | undefined {
    return employees.find(employee => employee.name === name);
}


function filterEmployeesBySalary(minSalary: number): Employee[] {
    return employees.filter(employee => employee.salary >= minSalary);
}

function getAverageSalary(): number {
    const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
    return totalSalary / employees.length;
}
export { employees, findEmployeeByName };