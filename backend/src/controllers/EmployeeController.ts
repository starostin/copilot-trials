import { Employee } from "../model/Employee";   
import { EmployeeRepository } from "../repository/EmployeeRepository";
import { Request, Response } from "express";

export class EmployeeController {
    private repository = new EmployeeRepository();
    
    public async createEmployee(req: Request, res: Response): Promise<void> {
        try {
            const employeeData: Partial<Employee> = req.body;
            const newEmployee = await this.repository.createEmployee(employeeData);
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).json({ error: "Failed to create employee" });
        }
    }

    public async getAllEmployees(req: Request, res: Response): Promise<void> {
        try {
            const employees = await this.repository.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve employees" });
        }
    }

    public async getEmployeeById(req: Request, res: Response): Promise<void> {
        try {
            const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const employeeId = parseInt(idParam, 10);
            const employee = await this.repository.getEmployeeById(employeeId);
            if (employee) {
                res.status(200).json(employee);
            } else {
                res.status(404).json({ error: "Employee not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve employee" });
        }
    }

    public async updateEmployee(req: Request, res: Response): Promise<void> {
        try {
            const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const employeeId = parseInt(idParam, 10);
            const employeeData: Employee = req.body;
            await this.repository.updateEmployee(employeeId, employeeData);
            res.status(200).json({ message: "Employee updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to update employee" });
        }
    }

    public async deleteEmployee(req: Request, res: Response): Promise<void> {
        try {
            const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const employeeId = parseInt(idParam, 10);
            await this.repository.deleteEmployee(employeeId);
            res.status(200).json({ message: "Employee deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete employee" });
        }
    }
}   