import { useState } from 'react'

const BusinessProfile = () => {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    companyName: 'Elite PIC Ltd',
    tradingName: 'Elite PIC Immigration Services',
    companyRegistrationNumber: '12345678',
    sponsorLicenceNumber: 'SNR1234567',
    licenceRating: 'A',
    industrySector: 'Immigration Services',
    registeredAddress: '123 Business Street, London, UK, SW1A 1AA',
    tradingAddress: '123 Business Street, London, UK, SW1A 1AA',
    authorisingOfficer: {
      name: 'John Smith',
      telephone: '+44 20 1234 5678',
      email: 'john.smith@epic.com'
    },
    keyContact: {
      name: 'Sarah Johnson',
      telephone: '+44 20 1234 5679',
      email: 'sarah.johnson@epic.com'
    }
  })

  const handleChange = (e, section = null) => {
    const { name, value } = e.target
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    setEditMode(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-red to-primary-red-dark rounded-lg flex items-center justify-center shadow-soft">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-800">Business Profile</h2>
              <p className="text-sm text-neutral-600">Manage your company information</p>
            </div>
          </div>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              editMode 
                ? 'bg-success text-white hover:bg-success/90' 
                : 'bg-primary-red text-white hover:bg-primary-red-dark'
            }`}
            onClick={() => editMode ? handleSubmit() : setEditMode(true)}
          >
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-neutral-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Trading Name</label>
                <input
                  type="text"
                  name="tradingName"
                  value={formData.tradingName}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Company Registration Number</label>
                <input
                  type="text"
                  name="companyRegistrationNumber"
                  value={formData.companyRegistrationNumber}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Sponsor Licence Number</label>
                <input
                  type="text"
                  name="sponsorLicenceNumber"
                  value={formData.sponsorLicenceNumber}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Licence Rating</label>
                <select
                  name="licenceRating"
                  value={formData.licenceRating}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Industry Sector</label>
                <input
                  type="text"
                  name="industrySector"
                  value={formData.industrySector}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Address Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Registered Address</label>
                <input
                  type="text"
                  name="registeredAddress"
                  value={formData.registeredAddress}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Trading Address</label>
                <input
                  type="text"
                  name="tradingAddress"
                  value={formData.tradingAddress}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Key Personnel</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-neutral-700 mb-3">Authorising Officer</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.authorisingOfficer.name}
                      onChange={(e) => handleChange(e, 'authorisingOfficer')}
                      disabled={!editMode}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Telephone</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.authorisingOfficer.telephone}
                      onChange={(e) => handleChange(e, 'authorisingOfficer')}
                      disabled={!editMode}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.authorisingOfficer.email}
                      onChange={(e) => handleChange(e, 'authorisingOfficer')}
                      disabled={!editMode}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-neutral-700 mb-3">Key Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.keyContact.name}
                      onChange={(e) => handleChange(e, 'keyContact')}
                      disabled={!editMode}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Telephone</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.keyContact.telephone}
                      onChange={(e) => handleChange(e, 'keyContact')}
                      disabled={!editMode}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.keyContact.email}
                      onChange={(e) => handleChange(e, 'keyContact')}
                      disabled={!editMode}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-blue focus:border-transparent disabled:bg-neutral-100 disabled:text-neutral-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BusinessProfile
