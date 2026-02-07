
import express from 'express'
import { EmployeeRoutes } from './routes/EmployeeRoutes'

export class Server {
    private app = express();
    private port = process.env.PORT || 3001;
    private routes = new EmployeeRoutes(this.app);

    public startServer(): void {
        this.routes.initializeRoutes();
        const server = this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
        server.on('error', (err) => {
            console.error('Server error:', err);
        });
    }
}