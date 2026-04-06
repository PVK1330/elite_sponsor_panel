import { useState } from 'react'

const CloudStorage = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Sponsor Licence Approval Letter.pdf',
      type: 'document',
      category: 'compliance',
      size: '2.4 MB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Admin',
      status: 'approved',
      thumbnail: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Organisational Chart.pdf',
      type: 'document',
      category: 'compliance',
      size: '1.2 MB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Admin',
      status: 'approved',
      thumbnail: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'HR Policies.pdf',
      type: 'document',
      category: 'compliance',
      size: '3.1 MB',
      uploadDate: '2024-01-12',
      uploadedBy: 'HR Manager',
      status: 'approved',
      thumbnail: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'Company Logo.png',
      type: 'image',
      category: 'branding',
      size: '856 KB',
      uploadDate: '2024-01-15',
      uploadedBy: 'Marketing',
      status: 'approved',
      thumbnail: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 5,
      name: 'Employment Contract Template.docx',
      type: 'template',
      category: 'templates',
      size: '124 KB',
      uploadDate: '2024-01-18',
      uploadedBy: 'Legal',
      status: 'pending',
      thumbnail: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11 5m0 0v4m0-4h4" />
        </svg>
      )
    },
    {
      id: 6,
      name: 'Financial Statements Q4 2023.pdf',
      type: 'document',
      category: 'compliance',
      size: '4.8 MB',
      uploadDate: '2024-01-20',
      uploadedBy: 'Finance',
      status: 'pending',
      thumbnail: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ])

  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const totalStorage = 1000 // MB
  const usedStorage = 1354.9 // MB
  const storagePercentage = (usedStorage / totalStorage) * 100

  const categories = [
    { id: 'all', name: 'All Files', count: files.length },
    { id: 'compliance', name: 'Compliance Documents', count: files.filter(f => f.category === 'compliance').length },
    { id: 'branding', name: 'Branding', count: files.filter(f => f.category === 'branding').length },
    { id: 'templates', name: 'Templates', count: files.filter(f => f.category === 'templates').length }
  ]

  const filteredFiles = files.filter(file => {
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getFileIcon = (type) => {
    switch (type) {
      case 'document': return '📄'
      case 'image': return '🖼️'
      case 'template': return '📝'
      case 'video': return '🎥'
      case 'audio': return '🎵'
      default: return '📎'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'compliance': return 'bg-blue-100 text-blue-800'
      case 'branding': return 'bg-purple-100 text-purple-800'
      case 'templates': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Storage Overview */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-red to-primary-red-dark rounded-lg flex items-center justify-center shadow-soft">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">Business Cloud Storage</h2>
            <p className="text-sm text-neutral-600">Manage and organize your business documents</p>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Files</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">{files.length}</p>
              </div>
              <div className="w-10 h-10 bg-primary-red rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Storage Used</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">{usedStorage.toFixed(1)} MB</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Approved Files</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">
                  {files.filter(f => f.status === 'approved').length}
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
                <p className="text-sm font-medium text-neutral-600">Pending Review</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">
                  {files.filter(f => f.status === 'pending').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Usage Bar */}
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Storage Usage</span>
            <span className="text-sm text-neutral-600">{usedStorage.toFixed(1)} MB / {totalStorage} MB</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full transition-all ${storagePercentage > 100 ? 'bg-red-500' : storagePercentage > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(storagePercentage, 100)}%` }}
            />
          </div>
          <div className="text-right">
            <span className={`text-sm font-medium ${storagePercentage > 100 ? 'text-red-600' : storagePercentage > 80 ? 'text-yellow-600' : 'text-green-600'}`}>
              {storagePercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Controls and Filters */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-red text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.name}
                <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* View Toggle and Upload */}
          <div className="flex items-center gap-3">
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

            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-primary-red text-white rounded-lg hover:bg-primary-red-dark transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Files
            </button>
          </div>
        </div>
      </div>

      {/* Files Display */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800">
            Files ({filteredFiles.length})
          </h3>
        </div>

        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div key={file.id} className="bg-neutral-50 rounded-xl p-4 hover:shadow-medium transition-shadow cursor-pointer">
                  {/* File Icon/Thumbnail */}
                  <div className="flex items-center justify-center w-full h-24 bg-white rounded-lg mb-3 text-4xl">
                    {file.thumbnail}
                  </div>

                  {/* File Name */}
                  <h4 className="font-medium text-neutral-800 text-sm mb-1 truncate" title={file.name}>
                    {file.name}
                  </h4>

                  {/* File Info */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span>{file.size}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(file.category)}`}>
                        {file.category}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {file.uploadDate} • {file.uploadedBy}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(file.status)}`}>
                      {file.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedFile(file)}
                      className="flex-1 px-2 py-1.5 bg-primary-red text-white text-xs font-medium rounded-lg hover:bg-primary-red-dark transition-colors"
                    >
                      View
                    </button>
                    <button className="px-2 py-1.5 border border-neutral-300 text-neutral-700 text-xs font-medium rounded-lg hover:bg-neutral-100 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{file.thumbnail}</div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900 truncate max-w-xs">
                            {file.name}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {file.uploadedBy}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(file.category)}`}>
                        {file.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {file.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {file.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(file.status)}`}>
                        {file.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedFile(file)}
                          className="text-secondary-blue hover:text-secondary-blue-dark"
                        >
                          View
                        </button>
                        <button className="text-neutral-600 hover:text-neutral-900">
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* File Detail Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selectedFile.thumbnail}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">{selectedFile.name}</h3>
                    <p className="text-sm text-neutral-600">{selectedFile.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Category</label>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(selectedFile.category)}`}>
                    {selectedFile.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Status</label>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedFile.status)}`}>
                    {selectedFile.status.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">File Size</label>
                  <p className="mt-1 text-sm text-neutral-900">{selectedFile.size}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Upload Date</label>
                  <p className="mt-1 text-sm text-neutral-900">{selectedFile.uploadDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Uploaded By</label>
                  <p className="mt-1 text-sm text-neutral-900">{selectedFile.uploadedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">File Type</label>
                  <p className="mt-1 text-sm text-neutral-900">{selectedFile.type}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-200">
                <button className="flex-1 px-4 py-2 bg-primary-red text-white font-medium rounded-lg hover:bg-primary-red-dark transition-colors">
                  Download
                </button>
                <button className="px-4 py-2 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-100 transition-colors">
                  Share
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-800">Upload Files</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
                <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-neutral-600 mb-2">Drag and drop files here</p>
                <p className="text-sm text-neutral-500 mb-4">or</p>
                <button className="px-4 py-2 bg-primary-red text-white font-medium rounded-lg hover:bg-primary-red-dark transition-colors">
                  Browse Files
                </button>
              </div>
              
              <div className="mt-4 text-sm text-neutral-500">
                <p>Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CloudStorage
