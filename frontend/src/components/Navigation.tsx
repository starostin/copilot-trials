import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation: React.FC = () => {
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full px-4 py-2 text-sm font-semibold transition',
      isActive
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
        : 'text-slate-600 hover:bg-slate-100'
    ].join(' ')

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Employee Hub
          </p>
          <p className="text-lg font-semibold text-slate-900">Dashboard</p>
        </div>
        <nav className="flex flex-wrap items-center gap-2 rounded-full bg-slate-50 p-1">
          <NavLink to="/" className={linkClassName} end>
            Home
          </NavLink>
          <NavLink to="/list" className={linkClassName}>
            Employees
          </NavLink>
          <NavLink to="/add" className={linkClassName}>
            Add Employee
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navigation
