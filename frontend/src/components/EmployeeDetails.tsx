import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Employee } from '../model/Employee'
import { getEmployeeById } from '../services/DataService'

const EmployeeDetails: React.FC = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadEmployee = async () => {
            if (!id) {
                setError('Employee id is missing.')
                setIsLoading(false)
                return
            }

            const parsedId = Number(id)
            if (Number.isNaN(parsedId)) {
                setError('Employee id is invalid.')
                setIsLoading(false)
                return
            }

            try {
                const data = await getEmployeeById(parsedId)
               setEmployee(data)
            } catch (err) {
                 console.error(err)
                setError('Failed to load employee details.')
            } finally {
                setIsLoading(false)
            }
        }

        loadEmployee()
    }, [id])

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg shadow-slate-200">
                <div className="mb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Employees
                    </p>
                    <h1 className="text-3xl font-semibold text-slate-900">Employee Details</h1>
                </div>

                {isLoading && (
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                        Loading details...
                    </div>
                )}

                {error && (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </p>
                )}

                {!isLoading && !error && employee && (
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                {employee.name}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">{employee.email}</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Department
                                </p>
                                <p className="mt-2 text-sm text-slate-800">
                                    {employee.department || 'Not set'}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Salary
                                </p>
                                <p className="mt-2 text-sm text-slate-800">
                                    {employee.salary !== undefined
                                        ? `$${employee.salary.toLocaleString()}`
                                        : 'Not set'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmployeeDetails