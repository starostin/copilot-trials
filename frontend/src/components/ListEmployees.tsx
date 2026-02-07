import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getEmployees } from '../services/DataService'
import type { Employee } from '../model/Employee'

const ListEmployees: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await getEmployees()
               setEmployees(data)
            } catch (err) {
                console.log(err);
                
               setError('Failed to load employees.')
            } finally {
               setIsLoading(false)
            }
        }

        loadEmployees()
    }, [])

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Employees
                        </p>
                        <h1 className="text-3xl font-semibold text-slate-900">Team Directory</h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Browse the current employee roster.
                        </p>
                    </div>
                    <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {employees.length} total
                    </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200">
                    {isLoading && (
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                            Loading employees...
                        </div>
                    )}
                    {error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}
                    {!isLoading && !error && employees.length === 0 && (
                        <p className="text-sm text-slate-500">No employees found.</p>
                    )}
                    {!isLoading && !error && employees.length > 0 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {employees.map((employee) => (
                                <Link
                                    key={employee.id}
                                    to={`/details/${employee.id}`}
                                    className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {employee.name}
                                            </p>
                                            <p className="text-xs text-slate-500">{employee.email}</p>
                                        </div>
                                        {employee.department && (
                                            <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                                                {employee.department}
                                            </span>
                                        )}
                                    </div>
                                    {employee.salary !== undefined && (
                                        <p className="mt-3 text-xs text-slate-400">
                                            Salary: ${employee.salary.toLocaleString()}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListEmployees