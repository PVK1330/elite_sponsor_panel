import { useState } from 'react'

const CandidateTracking = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      nationality: 'India',
      visaType: 'Skilled Worker',
      jobTitle: 'Senior Software Developer',
      department: 'IT',
      status: 'in-progress',
      applicationDate: '2024-01-10',
      assignedDate: '2024-01-12',
      caseWorker: 'Sarah Johnson',
      nextDeadline: '2024-02-15',
      documents: {
        passport: 'uploaded',
        visa: 'pending',
        contract: 'uploaded',
        cos: 'approved'
      },
      progress: 65,
      priority: 'high',
      email: 'john.doe@example.com',
      phone: '+44 123 456 7890'
    },
    {
      id: 2,
      name: 'Jane Smith',
      nationality: 'USA',
      visaType: 'Global Talent',
      jobTitle: 'Research Scientist',
      department: 'R&D',
      status: 'approved',
      applicationDate: '2024-01-08',
      assignedDate: '2024-01-10',
      caseWorker: 'Mike Wilson',
      nextDeadline: '2024-02-20',
      documents: {
        passport: 'uploaded',
        visa: 'approved',
        contract: 'uploaded',
        cos: 'approved'
      },
      progress: 100,
      priority: 'low',
      email: 'jane.smith@example.com',
      phone: '+44 123 456 7891'
    },
    {
      id: 3,
      name: 'Michael Chen',
      nationality: 'China',
      visaType: 'Tier 2 General',
      jobTitle: 'Data Analyst',
      department: 'Analytics',
      status: 'pending',
      applicationDate: '2024-01-15',
      assignedDate: '2024-01-16',
      caseWorker: 'Emma Davis',
      nextDeadline: '2024-02-25',
      documents: {
        passport: 'uploaded',
        visa: 'pending',
        contract: 'pending',
        cos: 'pending'
      },
      progress: 25,
      priority: 'medium',
      email: 'michael.chen@example.com',
      phone: '+44 123 456 7892'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      nationality: 'Canada',
      visaType: 'Skilled Worker',
      jobTitle: 'Product Manager',
      department: 'Product',
      status: 'in-review',
      applicationDate: '2024-01-12',
      assignedDate: '2024-01-14',
      caseWorker: 'Tom Brown',
      nextDeadline: '2024-02-18',
      documents: {
        passport: 'uploaded',
        visa: 'in-review',
        contract: 'uploaded',
        cos: 'approved'
      },
      progress: 80,
      priority: 'medium',
      email: 'sarah.johnson@example.com',
      phone: '+44 123 456 7893'
    },
    {
      id: 5,
      name: 'David Lee',
      nationality: 'South Korea',
      visaType: 'Global Talent',
      jobTitle: 'AI Engineer',
      department: 'AI Research',
      status: 'in-progress',
      applicationDate: '2024-01-14',
      assignedDate: '2024-01-15',
      caseWorker: 'Lisa Wang',
      nextDeadline: '2024-02-22',
      documents: {
        passport: 'uploaded',
        visa: 'pending',
        contract: 'uploaded',
        cos: 'in-review'
      },
      progress: 55,
      priority: 'high',
      email: 'david.lee@example.com',
      phone: '+44 123 456 7894'
    },
    {
      id: 6,
      name: 'Emma Wilson',
      nationality: 'Australia',
      visaType: 'Skilled Worker',
      jobTitle: 'UX Designer',
      department: 'Design',
      status: 'pending',
      applicationDate: '2024-01-16',
      assignedDate: '2024-01-17',
      caseWorker: 'Sarah Johnson',
      nextDeadline: '2024-02-28',
      documents: {
        passport: 'uploaded',
        visa: 'pending',
        contract: 'pending',
        cos: 'pending'
      },
      progress: 15,
      priority: 'medium',
      email: 'emma.wilson@example.com',
      phone: '+44 123 456 7895'
    }
  ])

  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [visaTypeFilter, setVisaTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Filter candidates
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.caseWorker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter
    const matchesVisaType = visaTypeFilter === 'all' || candidate.visaType === visaTypeFilter
    const matchesPriority = priorityFilter === 'all' || candidate.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesVisaType && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage)
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'in-review': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'bg-green-100 text-green-800'
      case 'approved': return 'bg-emerald-100 text-emerald-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-red to-primary-red-dark rounded-lg flex items-center justify-center shadow-soft">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">Candidate Tracking</h2>
            <p className="text-sm text-neutral-600">Manage and monitor candidate applications</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Candidates</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">{candidates.length}</p>
              </div>
              <div className="w-10 h-10 bg-primary-red rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">In Progress</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">
                  {candidates.filter(c => c.status === 'in-progress').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Approved</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">
                  {candidates.filter(c => c.status === 'approved').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">High Priority</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">
                  {candidates.filter(c => c.priority === 'high').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="approved">Approved</option>
            </select>

            <select
              value={visaTypeFilter}
              onChange={(e) => setVisaTypeFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              <option value="all">All Visa Types</option>
              <option value="Skilled Worker">Skilled Worker</option>
              <option value="Global Talent">Global Talent</option>
              <option value="Tier 2 General">Tier 2 General</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <button className="px-4 py-2 bg-primary-red text-white rounded-lg hover:bg-primary-red-dark transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-primary-red shadow-soft' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-primary-red shadow-soft' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Candidates Display */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800">
            Candidates ({filteredCandidates.length})
          </h3>
        </div>

        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCandidates.map((candidate) => (
                <div key={candidate.id} className="bg-neutral-50 rounded-xl p-6 hover:shadow-medium transition-shadow cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-red to-primary-red-dark rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-800">{candidate.name}</h4>
                        <p className="text-sm text-neutral-600">{candidate.jobTitle}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(candidate.priority)}`}>
                      {candidate.priority.toUpperCase()}
                    </span>
                  </div>

                  {/* Status and Progress */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(candidate.status)}`}>
                        {candidate.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-neutral-600">{candidate.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${getProgressColor(candidate.progress)}`}
                        style={{ width: `${candidate.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Visa Type:</span>
                      <span className="font-medium text-neutral-800">{candidate.visaType}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Case Worker:</span>
                      <span className="font-medium text-neutral-800">{candidate.caseWorker}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Deadline:</span>
                      <span className="font-medium text-neutral-800">{candidate.nextDeadline}</span>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-neutral-700 mb-2">Documents</p>
                    <div className="flex gap-1">
                      {Object.entries(candidate.documents).map(([doc, status]) => (
                        <div
                          key={doc}
                          className={`w-2 h-2 rounded-full ${status === 'uploaded' || status === 'approved' ? 'bg-green-400' : status === 'in-review' ? 'bg-blue-400' : 'bg-yellow-400'}`}
                          title={`${doc.charAt(0).toUpperCase() + doc.slice(1)}: ${status}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="flex-1 px-3 py-2 bg-primary-red text-white text-sm font-medium rounded-lg hover:bg-primary-red-dark transition-colors"
                    >
                      View Details
                    </button>
                    <button className="px-3 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-100 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Visa Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Case Worker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {paginatedCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-red to-primary-red-dark rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-sm">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900">{candidate.name}</div>
                          <div className="text-sm text-neutral-500">{candidate.jobTitle}</div>
                          <div className="text-xs text-neutral-400">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                        {candidate.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <div className="w-16 bg-neutral-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(candidate.progress)}`}
                              style={{ width: `${candidate.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-neutral-600">{candidate.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {candidate.visaType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {candidate.caseWorker}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(candidate.priority)}`}>
                        {candidate.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{candidate.nextDeadline}</div>
                      <div className="text-xs text-neutral-500">
                        {Math.ceil((new Date(candidate.nextDeadline) - new Date()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedCandidate(candidate)}
                          className="text-secondary-blue hover:text-secondary-blue-dark"
                        >
                          View
                        </button>
                        <button className="text-neutral-600 hover:text-neutral-900">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-neutral-200 px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-neutral-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredCandidates.length)}</span> of{' '}
                    <span className="font-medium">{filteredCandidates.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
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
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-red to-primary-red-dark rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">{selectedCandidate.name}</h3>
                    <p className="text-sm text-neutral-600">{selectedCandidate.jobTitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-md font-medium text-neutral-800 mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Name</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Nationality</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.nationality}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Email</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Phone</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.phone}</p>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div>
                <h4 className="text-md font-medium text-neutral-800 mb-3">Application Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Job Title</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.jobTitle}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Department</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Visa Type</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.visaType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCandidate.status)}`}>
                      {selectedCandidate.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Case Worker</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.caseWorker}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Priority</label>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedCandidate.priority)}`}>
                      {selectedCandidate.priority.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Application Date</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.applicationDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Next Deadline</label>
                    <p className="mt-1 text-sm text-neutral-900">{selectedCandidate.nextDeadline}</p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div>
                <h4 className="text-md font-medium text-neutral-800 mb-3">Application Progress</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-700">Overall Progress</span>
                    <span className="text-sm text-neutral-900">{selectedCandidate.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${getProgressColor(selectedCandidate.progress)}`}
                      style={{ width: `${selectedCandidate.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-md font-medium text-neutral-800 mb-3">Document Status</h4>
                <div className="space-y-2">
                  {Object.entries(selectedCandidate.documents).map(([doc, status]) => (
                    <div key={doc} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${status === 'uploaded' || status === 'approved' ? 'bg-green-400' : status === 'in-review' ? 'bg-blue-400' : 'bg-yellow-400'}`} />
                        <span className="text-sm font-medium text-neutral-700 capitalize">{doc}</span>
                      </div>
                      <span className={`text-xs font-medium ${getDocumentStatusColor(status)}`}>
                        {status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CandidateTracking
