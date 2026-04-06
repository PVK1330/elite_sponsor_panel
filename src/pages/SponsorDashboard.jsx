import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import BusinessProfile from '../components/BusinessProfile'
import SponsorshipLicense from '../components/SponsorshipLicense'
import VacancyManagement from '../components/VacancyManagement'
import CandidateTracking from '../components/CandidateTracking'
import FeeManagement from '../components/FeeManagement'
import Communication from '../components/Communication'
import CloudStorage from '../components/CloudStorage'

// Breadcrumb Component
const Breadcrumbs = ({ activeTab, menuItems }) => {
  const getCurrentItem = () => {
    return menuItems.find(item => item.id === activeTab) || menuItems[0]
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-6">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="hover:text-neutral-800 cursor-pointer transition-colors">Home</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="text-neutral-900 font-medium">{getCurrentItem().label}</span>
    </nav>
  )
}

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-neutral-200 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span> pages
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-primary-red border-primary-red text-white'
                    : 'bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

const SponsorDashboard = () => {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: 'business', 
      label: 'Business Profile', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      id: 'license', 
      label: 'Sponsorship License', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'vacancies', 
      label: 'Vacancy Management', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'candidates', 
      label: 'Candidate Tracking', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      id: 'fees', 
      label: 'Fee Management', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'communication', 
      label: 'Communication', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      id: 'storage', 
      label: 'Cloud Storage', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'business':
        return <BusinessProfile />
      case 'license':
        return <SponsorshipLicense />
      case 'vacancies':
        return <VacancyManagement />
      case 'candidates':
        return <CandidateTracking />
      case 'fees':
        return <FeeManagement />
      case 'communication':
        return <Communication />
      case 'storage':
        return <CloudStorage />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-neutral-200 shadow-medium transition-all duration-300 ease-in-out relative hidden lg:block`}>
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className={`flex items-center ${sidebarOpen ? 'gap-3' : 'justify-center'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary-red to-primary-red-dark rounded-lg flex items-center justify-center shadow-soft">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-bold text-neutral-800 text-lg">elite pic</span>
                <p className="text-xs text-neutral-600">SPONSOR PORTAL</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center ${sidebarOpen ? 'gap-3' : 'justify-center'} px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-primary-red text-white shadow-soft' 
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className={`${activeTab === item.id ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-700'}`}>
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <span className={`font-medium text-sm ${activeTab === item.id ? 'text-white' : 'text-neutral-700'}`}>
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <div className={`flex items-center ${sidebarOpen ? 'gap-3' : 'justify-center'}`}>
            <div className="w-8 h-8 bg-secondary-blue rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800 truncate">John Doe</p>
                <p className="text-xs text-neutral-600 truncate">Sponsor Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
              <p className="text-sm text-neutral-600">Welcome back, {user?.name}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent text-sm transition-all duration-200 focus:bg-white focus:w-80"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-neutral-100 transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary-red rounded-full animate-pulse"></span>
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-large border border-neutral-200 z-50 animate-slide-down">
                    <div className="p-4 border-b border-neutral-200">
                      <h3 className="font-semibold text-neutral-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 hover:bg-neutral-50 transition-colors cursor-pointer border-b border-neutral-100">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-800">Visa expiring soon</p>
                            <p className="text-xs text-neutral-600">John Smith's visa expires in 12 days</p>
                            <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-neutral-50 transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-800">Compliance check passed</p>
                            <p className="text-xs text-neutral-600">Monthly compliance review completed</p>
                            <p className="text-xs text-neutral-500 mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-neutral-200">
                      <button className="text-sm text-primary-red hover:text-primary-red-dark font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 pl-3 border-l border-neutral-200 hover:bg-neutral-50 rounded-lg px-3 py-2 transition-all duration-200"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-neutral-800">{user?.name}</p>
                    <p className="text-xs text-neutral-600">{user?.email}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary-blue to-secondary-blue-dark rounded-full flex items-center justify-center shadow-medium">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </button>
                
                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-large border border-neutral-200 z-50 animate-slide-down">
                    <div className="p-4 border-b border-neutral-200">
                      <p className="text-sm font-medium text-neutral-800">{user?.name}</p>
                      <p className="text-xs text-neutral-600">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Help & Support
                      </button>
                    </div>
                    <div className="border-t border-neutral-200 py-2">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-neutral-50">
          <div className="p-6">
            {/* Breadcrumbs */}
            <Breadcrumbs activeTab={activeTab} menuItems={menuItems} />
            
            {/* Page Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

const DashboardContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days')
  const [deadlinesPage, setDeadlinesPage] = useState(1)
  const [activitiesPage, setActivitiesPage] = useState(1)
  const itemsPerPage = 3

  const stats = [
    {
      title: 'Total Sponsored Workers',
      value: '24',
      change: '+2',
      changeType: 'increase',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      trend: 'up'
    },
    {
      title: 'Workers with Expiring Visas',
      value: '3',
      change: '-1',
      changeType: 'decrease',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-100',
      trend: 'down'
    },
    {
      title: 'Compliance Score',
      value: '92%',
      change: '+5%',
      changeType: 'increase',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-100',
      trend: 'up'
    },
    {
      title: 'Pending Reporting Actions',
      value: '7',
      change: '+3',
      changeType: 'increase',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      color: 'red',
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50 to-pink-100',
      trend: 'up'
    }
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      type: 'Visa Expiry',
      description: 'John Smith - Skilled Worker Visa',
      date: '2024-02-15',
      priority: 'high',
      daysLeft: 12
    },
    {
      id: 2,
      type: 'Reporting Deadline',
      description: 'Change in Job Role - Sarah Johnson',
      date: '2024-01-25',
      priority: 'medium',
      daysLeft: 5
    },
    {
      id: 3,
      type: 'Document Expiry',
      description: 'Sponsor Licence Document',
      date: '2024-03-01',
      priority: 'medium',
      daysLeft: 28
    },
    {
      id: 4,
      type: 'Visa Expiry',
      description: 'Michael Chen - Tier 2 General',
      date: '2024-02-20',
      priority: 'high',
      daysLeft: 17
    },
    {
      id: 5,
      type: 'Compliance Check',
      description: 'Annual Compliance Review',
      date: '2024-03-15',
      priority: 'low',
      daysLeft: 42
    },
    {
      id: 6,
      type: 'Reporting Deadline',
      description: 'Quarterly Staff Report',
      date: '2024-02-01',
      priority: 'medium',
      daysLeft: 8
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'Document Uploaded',
      description: 'Passport copy for John Smith',
      timestamp: '2 hours ago',
      user: 'Admin'
    },
    {
      id: 2,
      action: 'Worker Added',
      description: 'New sponsored worker: Emma Wilson',
      timestamp: '5 hours ago',
      user: 'HR Manager'
    },
    {
      id: 3,
      action: 'Compliance Check',
      description: 'Right-to-work verification completed',
      timestamp: '1 day ago',
      user: 'System'
    },
    {
      id: 4,
      action: 'Visa Application',
      description: 'Certificate of Sponsorship issued',
      timestamp: '2 days ago',
      user: 'Sponsor Team'
    },
    {
      id: 5,
      action: 'Document Updated',
      description: 'Business address information updated',
      timestamp: '3 days ago',
      user: 'Admin'
    },
    {
      id: 6,
      action: 'Fee Payment',
      description: 'Immigration Health Surcharge paid',
      timestamp: '4 days ago',
      user: 'Finance'
    },
    {
      id: 7,
      action: 'Report Generated',
      description: 'Monthly compliance report created',
      timestamp: '5 days ago',
      user: 'System'
    },
    {
      id: 8,
      action: 'Worker Status Change',
      description: 'Sarah Johnson visa approved',
      timestamp: '1 week ago',
      user: 'Home Office'
    }
  ]

  // Pagination logic
  const totalPagesDeadlines = Math.ceil(upcomingDeadlines.length / itemsPerPage)
  const totalPagesActivities = Math.ceil(recentActivities.length / itemsPerPage)
  
  const paginatedDeadlines = upcomingDeadlines.slice(
    (deadlinesPage - 1) * itemsPerPage,
    deadlinesPage * itemsPerPage
  )
  
  const paginatedActivities = recentActivities.slice(
    (activitiesPage - 1) * itemsPerPage,
    activitiesPage * itemsPerPage
  )

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="dashboard-header-content mb-8">
        <div className="header-info">
          <h1 className="page-title text-2xl font-bold text-neutral-800 mb-2">Dashboard</h1>
          <p className="page-subtitle text-sm text-neutral-600">Overview of your sponsor compliance and worker management</p>
        </div>
        <div className="header-controls">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            {/* Background gradient decoration */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="stat-content relative flex items-center justify-between p-4 sm:p-6">
              <div className="stat-info flex-1">
                <p className="stat-title text-xs sm:text-sm font-medium text-neutral-600 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-neutral-400 to-neutral-600"></span>
                  <span className="hidden sm:inline">{stat.title}</span>
                  <span className="sm:hidden text-xs leading-tight">{stat.title.split(' ')[0]} {stat.title.split(' ')[1] === 'Sponsored' ? '👥' : stat.title.split(' ')[1] === 'with' ? '⚠️' : stat.title.split(' ')[1] === 'Score' ? '📊' : '📋'}</span>
                </p>
                <div className="flex items-baseline gap-2 sm:gap-3 mb-3">
                  <p className={`stat-value text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{stat.value}</p>
                  <div className={`flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-full text-xs font-medium ${
                    stat.changeType === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <svg className={`w-3 h-3 ${stat.trend === 'up' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l10-10m0 0l-4 4m4-4l-4 4" />
                    </svg>
                    <span className="hidden sm:inline">{stat.change}</span>
                  </div>
                </div>
                <div className="stat-change flex items-center gap-2">
                  <span className="change-label text-xs text-neutral-500 hidden sm:inline">vs last period</span>
                </div>
              </div>
              <div className={`stat-icon w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-medium transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {stat.icon.props.children}
                </svg>
              </div>
            </div>
            
            {/* Progress bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-200 to-neutral-300">
              <div className={`h-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000 ease-out`} style={{width: '75%'}}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Upcoming Deadlines */}
        <div className="xl:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-red to-primary-red-dark px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="hidden sm:inline">Upcoming Deadlines</span>
                <span className="sm:hidden">Deadlines</span>
              </h2>
              <button className="text-white/90 hover:text-white hover:bg-white/20 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200">
                View All
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {paginatedDeadlines.map((deadline, index) => (
              <div key={deadline.id} className="group flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-red/30 hover:shadow-soft transition-all duration-300 gap-3 sm:gap-0 relative overflow-hidden">
                {/* Left accent line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  deadline.priority === 'high' 
                    ? 'bg-gradient-to-b from-red-500 to-red-600' 
                    : deadline.priority === 'medium' 
                    ? 'bg-gradient-to-b from-amber-500 to-orange-600' 
                    : 'bg-gradient-to-b from-green-500 to-emerald-600'
                }`}></div>
                
                <div className="flex-1 pl-3">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      deadline.priority === 'high' 
                        ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300' 
                        : deadline.priority === 'medium' 
                        ? 'bg-gradient-to-r from-amber-100 to-orange-200 text-amber-800 border border-amber-300' 
                        : 'bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 border border-green-300'
                    }`}>
                      {deadline.priority.toUpperCase()}
                    </span>
                    <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-md hidden sm:inline">{deadline.type}</span>
                  </div>
                  <p className="text-sm font-semibold text-neutral-800 mb-1 group-hover:text-primary-red transition-colors line-clamp-2">{deadline.description}</p>
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="hidden sm:inline">{deadline.date}</span>
                    <span className="sm:hidden">{deadline.date.split('-')[2]}/{deadline.date.split('-')[1]}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-right">
                    <p className={`text-base sm:text-lg font-bold ${
                      deadline.daysLeft <= 7 
                        ? 'text-red-600' 
                        : deadline.daysLeft <= 14 
                        ? 'text-amber-600' 
                        : 'text-green-600'
                    }`}>
                      {deadline.daysLeft}
                    </p>
                    <p className="text-xs text-neutral-500 hidden sm:inline">days left</p>
                    <p className="text-xs text-neutral-500 sm:hidden">d</p>
                  </div>
                  <button className="p-1.5 sm:p-2 rounded-lg bg-neutral-100 hover:bg-primary-red hover:text-white transition-all duration-200 group-hover:scale-105">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination for Deadlines */}
          {totalPagesDeadlines > 1 && (
            <div className="mt-4">
              <Pagination 
                currentPage={deadlinesPage} 
                totalPages={totalPagesDeadlines} 
                onPageChange={setDeadlinesPage}
              />
            </div>
          )}
        </div>

        {/* Recent Activities */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden">
          <div className="bg-gradient-to-r from-secondary-blue to-secondary-blue-dark px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="hidden sm:inline">Recent Activities</span>
                <span className="sm:hidden">Activity</span>
              </h2>
              <button className="text-white/90 hover:text-white hover:bg-white/20 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200">
                View All
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {paginatedActivities.map((activity, index) => (
              <div key={activity.id} className="group relative pl-4 sm:pl-6 py-2 sm:py-3 hover:bg-gradient-to-r hover:from-secondary-blue/5 hover:to-transparent rounded-lg transition-all duration-300">
                {/* Timeline dot */}
                <div className="absolute left-0 top-4 sm:top-6 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-secondary-blue to-secondary-blue-dark rounded-full ring-2 sm:ring-4 ring-secondary-blue/10 group-hover:ring-secondary-blue/20 transition-all duration-300"></div>
                
                {/* Timeline line */}
                {index < paginatedActivities.length - 1 && (
                  <div className="absolute left-1 sm:left-1.5 top-6 sm:top-9 bottom-0 w-0.5 bg-gradient-to-b from-secondary-blue/20 to-transparent"></div>
                )}
                
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-secondary-blue transition-colors line-clamp-1">{activity.action}</p>
                  <p className="text-xs text-neutral-600 line-clamp-2">{activity.description}</p>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="hidden sm:inline">{activity.timestamp}</span>
                      <span className="sm:hidden">{activity.timestamp.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="hidden sm:inline">{activity.user}</span>
                      <span className="sm:hidden">{activity.user[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination for Activities */}
          {totalPagesActivities > 1 && (
            <div className="mt-4">
              <Pagination 
                currentPage={activitiesPage} 
                totalPages={totalPagesActivities} 
                onPageChange={setActivitiesPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden">
        <div className="bg-gradient-to-r from-success to-emerald-600 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="hidden sm:inline">Compliance Status</span>
              <span className="sm:hidden">Status</span>
            </h2>
            <button className="text-white/90 hover:text-white hover:bg-white/20 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200">
              View Details
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="group text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-success to-emerald-600 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-medium transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-neutral-800 mb-1">Overall Rating</p>
              <p className="text-xs text-neutral-600 hidden sm:inline">Excellent compliance</p>
              <p className="text-xs text-neutral-600 sm:hidden">Excellent</p>
              <div className="mt-2 flex justify-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} className="w-2 h-2 sm:w-3 sm:h-3 text-warning fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="group text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-warning to-orange-500 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-medium transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-neutral-800 mb-1">Action Required</p>
              <p className="text-xs text-neutral-600 hidden sm:inline">3 items need attention</p>
              <p className="text-xs text-neutral-600 sm:hidden">3 items</p>
              <div className="mt-2 px-2 sm:px-3 py-1 bg-warning/20 text-warning-800 text-xs rounded-full font-medium inline-block">
                <span className="hidden sm:inline">Priority: Medium</span>
                <span className="sm:hidden">Medium</span>
              </div>
            </div>
            <div className="group text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-secondary-blue to-secondary-blue-dark rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-medium transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-neutral-800 mb-1">Documents</p>
              <p className="text-xs text-neutral-600 hidden sm:inline">85% complete</p>
              <p className="text-xs text-neutral-600 sm:hidden">85%</p>
              <div className="mt-2 w-full bg-neutral-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-secondary-blue to-secondary-blue-dark rounded-full transition-all duration-1000 ease-out" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden mt-6">
        <div className="bg-gradient-to-r from-primary-red to-primary-red-dark px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="hidden sm:inline">Quick Actions</span>
              <span className="sm:hidden">Actions</span>
            </h2>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <button className="group p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-red/30 hover:shadow-soft transition-all duration-300 text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-700 group-hover:text-primary-red transition-colors">Add Worker</p>
            </button>
            <button className="group p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-red/30 hover:shadow-soft transition-all duration-300 text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-700 group-hover:text-primary-red transition-colors">New Report</p>
            </button>
            <button className="group p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-red/30 hover:shadow-soft transition-all duration-300 text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-700 group-hover:text-primary-red transition-colors">Compliance</p>
            </button>
            <button className="group p-3 sm:p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-red/30 hover:shadow-soft transition-all duration-300 text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-700 group-hover:text-primary-red transition-colors">Settings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponsorDashboard
