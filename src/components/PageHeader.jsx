import React from 'react'

const PageHeader = ({ 
  title, 
  subtitle, 
  icon, 
  children,
  breadcrumbs = true,
  actions = null 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-red to-primary-red-dark rounded-lg flex items-center justify-center shadow-soft">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">{title}</h1>
            {subtitle && (
              <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

const Breadcrumbs = ({ currentPage, items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-6">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="hover:text-neutral-800 cursor-pointer transition-colors">Home</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="text-neutral-900 font-medium">{currentPage}</span>
    </nav>
  )
}

export { PageHeader, Breadcrumbs }
export default PageHeader
