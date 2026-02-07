import React, { useState } from 'react'
import type { Employee } from '../model/Employee'
import { addEmployee } from '../services/DataService'

const AddEmployee: React.FC = () => {
    const [form, setForm] = useState<Omit<Employee, 'id'>>({
        name: '',
        email: '',
        department: '',
        salary: undefined
    })
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const updateField = (field: keyof Omit<Employee, 'id'>, value: string) => {
        setForm((prev) => {
            if (field === 'salary') {
                const nextSalary = value === '' ? undefined : Number(value)
                return { ...prev, salary: Number.isNaN(nextSalary) ? undefined : nextSalary }
            }

            return { ...prev, [field]: value }
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSaving(true)
        setError(null)
        setSuccess(null)

        try {
            await addEmployee(form as Employee)
            setSuccess('Employee created.')
            setForm({
                name: '',
                email: '',
                department: '',
                salary: undefined
            })
        } catch (err) {
            console.error(err)
            setError('Failed to create employee.')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg shadow-slate-200">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Employees
                    </p>
                    <h1 className="text-3xl font-semibold text-slate-900">Add Employee</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Capture employee details and save them to the directory.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Name
                            <input
                                type="text"
                                value={form.name}
                                onChange={(event) => updateField('name', event.target.value)}
                                required
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                                placeholder="Jane Doe"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Email
                            <input
                                type="email"
                                value={form.email}
                                onChange={(event) => updateField('email', event.target.value)}
                                required
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                                placeholder="jane@company.com"
                            />
                        </label>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700">
                            Department
                            <input
                                type="text"
                                value={form.department ?? ''}
                                onChange={(event) => updateField('department', event.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                                placeholder="Engineering"
                            />
                        </label>
                        <label className="text-sm font-medium text-slate-700">
                            Salary
                            <input
                                type="number"
                                value={form.salary ?? ''}
                                onChange={(event) => updateField('salary', event.target.value)}
                                min="0"
                                step="0.01"
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                                placeholder="85000"
                            />
                        </label>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">
                            Fields marked with an asterisk are required.
                        </p>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSaving ? 'Saving...' : 'Add Employee'}
                        </button>
                    </div>
                </form>
                {error && (
                    <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {success}
                    </p>
                )}
            </div>
        </div>
    )
}

export default AddEmployee