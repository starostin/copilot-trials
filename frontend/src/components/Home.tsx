import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(254,243,199,0.7),_rgba(255,255,255,0))]" />
                <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />

                <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 lg:flex-row lg:items-center">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                            <span className="h-2 w-2 rounded-full bg-amber-500 motion-safe:animate-pulse" />
                            Live Directory
                        </div>
                        <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                            Manage your team with a
                            <span className="block text-emerald-700">calm, focused workspace.</span>
                        </h1>
                        <p className="mt-4 text-base text-slate-600 sm:text-lg">
                            Track departments, salaries, and contact details in one place.
                            Keep HR updates sharp, fast, and beautifully organized.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/list"
                                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                View Employees
                            </Link>
                            <Link
                                to="/add"
                                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100"
                            >
                                Add New Employee
                            </Link>
                        </div>
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {[
                                { label: 'Active Teams', value: '12' },
                                { label: 'Open Roles', value: '8' },
                                { label: 'Locations', value: '3' }
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-slate-100 bg-white/70 p-4 backdrop-blur"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        {stat.label}
                                    </p>
                                    <p className="mt-3 text-2xl font-semibold text-slate-900">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                {
                                    title: 'People-first profiles',
                                    copy: 'Highlight contact details, roles, and department focus.'
                                },
                                {
                                    title: 'Lightning fast edits',
                                    copy: 'Add or update employee records with no friction.'
                                },
                                {
                                    title: 'Smart organization',
                                    copy: 'Filter and scan teams as your org grows.'
                                },
                                {
                                    title: 'Always in sync',
                                    copy: 'Fresh data from your backend, surfaced cleanly.'
                                }
                            ].map((card) => (
                                <div
                                    key={card.title}
                                    className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:-translate-y-1"
                                >
                                    <p className="text-lg font-semibold text-slate-900">
                                        {card.title}
                                    </p>
                                    <p
                                        className="mt-3 text-sm text-slate-500"
                                        style={{ fontFamily: '"Source Serif 4", serif' }}
                                    >
                                        {card.copy}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home