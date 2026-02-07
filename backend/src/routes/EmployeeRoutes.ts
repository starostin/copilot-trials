import express, { Application, Router } from "express";
import cors from 'cors'
import { EmployeeController } from "../controllers/EmployeeController";


export class EmployeeRoutes {
    public router: Router = Router();
    private app: Application;
    private employeeController = new EmployeeController();

    constructor(app: Application) {
        this.app = app;
        this.router.use(express.json());
         this.router.use(
            cors({
                origin: '*'
            })
        )
        this.app.use("/api", this.router);
    }

    public initializeRoutes() {
        this.router.get("/employees", async (req, res) => {
            await this.employeeController.getAllEmployees(req, res);
        });
        this.router.get("/employees/:id", async (req, res) => {
            await this.employeeController.getEmployeeById(req, res);
        });
        this.router.post("/employees", async (req, res) => {
            await this.employeeController.createEmployee(req, res);
        });
        this.router.put("/employees/:id", async (req, res) => {
            await this.employeeController.updateEmployee(req, res);
        });
        this.router.delete("/employees/:id", async (req, res) => {
            await this.employeeController.deleteEmployee(req, res);
        });
    }
}