export type Employee = {
    id: number;
    name: string;
    email: string;
    department?: string;
    salary?: number;
    created_at: Date;
};