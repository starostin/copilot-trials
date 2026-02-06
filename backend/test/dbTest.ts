import { EmployeeRepository } from "../src/repository/EmployeeRepository.js";

async function testEmployeeRepository() {
    const repo = new EmployeeRepository();

    const employees = await repo.getAllEmployees();
    console.log("Retrieved Employees:", employees);

    const newEmployee = {
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
        salary: 75000   
    };

    const createdEmployee = await repo.createEmployee(newEmployee);
    console.log("Created Employee:", createdEmployee);
}

testEmployeeRepository().catch(error => {
    console.error("Error testing EmployeeRepository:", error);
});