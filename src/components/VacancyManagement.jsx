import { useState } from 'react'
import './VacancyManagement.css'

const VacancyManagement = () => {
  const [vacancies, setVacancies] = useState([
    {
      id: 1,
      title: 'Senior Software Developer',
      department: 'IT',
      location: 'London',
      salary: '£65,000 - £75,000',
      type: 'Full-time',
      status: 'active',
      postedDate: '2024-01-10',
      applicants: 12
    },
    {
      id: 2,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Manchester',
      salary: '£45,000 - £55,000',
      type: 'Full-time',
      status: 'pending',
      postedDate: '2024-01-12',
      applicants: 8
    },
    {
      id: 3,
      title: 'Financial Analyst',
      department: 'Finance',
      location: 'Birmingham',
      salary: '£50,000 - £60,000',
      type: 'Full-time',
      status: 'active',
      postedDate: '2024-01-08',
      applicants: 15
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    type: 'Full-time',
    description: '',
    requirements: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newVacancy = {
      id: vacancies.length + 1,
      title: formData.title,
      department: formData.department,
      location: formData.location,
      salary: `£${formData.salaryMin} - £${formData.salaryMax}`,
      type: formData.type,
      status: 'pending',
      postedDate: new Date().toISOString().split('T')[0],
      applicants: 0
    }
    setVacancies([...vacancies, newVacancy])
    setShowForm(false)
    setFormData({
      title: '',
      department: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      type: 'Full-time',
      description: '',
      requirements: ''
    })
  }

  const updateVacancyStatus = (id, status) => {
    setVacancies(vacancies.map(vacancy => 
      vacancy.id === id ? { ...vacancy, status } : vacancy
    ))
  }

  return (
    <div className="vacancy-management">
      <div className="vacancy-header">
        <h2>Vacancy Management</h2>
        <button className="add-vacancy-btn" onClick={() => setShowForm(true)}>
          + Add New Vacancy
        </button>
      </div>

      <div className="vacancy-stats">
        <div className="stat-card">
          <h3>{vacancies.length}</h3>
          <p>Total Vacancies</p>
        </div>
        <div className="stat-card">
          <h3>{vacancies.filter(v => v.status === 'active').length}</h3>
          <p>Active Vacancies</p>
        </div>
        <div className="stat-card">
          <h3>{vacancies.filter(v => v.status === 'pending').length}</h3>
          <p>Pending Approval</p>
        </div>
        <div className="stat-card">
          <h3>{vacancies.reduce((sum, v) => sum + v.applicants, 0)}</h3>
          <p>Total Applicants</p>
        </div>
      </div>

      <div className="vacancy-list">
        <h3>Current Vacancies</h3>
        <div className="vacancies-grid">
          {vacancies.map(vacancy => (
            <div key={vacancy.id} className="vacancy-card">
              <div className="vacancy-header-info">
                <h4>{vacancy.title}</h4>
                <span className={`status-badge ${vacancy.status}`}>
                  {vacancy.status}
                </span>
              </div>
              
              <div className="vacancy-details">
                <div className="detail-item">
                  <span className="label">Department:</span>
                  <span className="value">{vacancy.department}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Location:</span>
                  <span className="value">{vacancy.location}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Salary:</span>
                  <span className="value">{vacancy.salary}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Type:</span>
                  <span className="value">{vacancy.type}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Posted:</span>
                  <span className="value">{vacancy.postedDate}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Applicants:</span>
                  <span className="value">{vacancy.applicants}</span>
                </div>
              </div>

              <div className="vacancy-actions">
                {vacancy.status === 'pending' && (
                  <>
                    <button 
                      className="btn-approve"
                      onClick={() => updateVacancyStatus(vacancy.id, 'active')}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => updateVacancyStatus(vacancy.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {vacancy.status === 'active' && (
                  <button 
                    className="btn-close"
                    onClick={() => updateVacancyStatus(vacancy.id, 'closed')}
                  >
                    Close Position
                  </button>
                )}
                <button className="btn-edit">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Vacancy</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="vacancy-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Employment Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Min Salary (£) *</label>
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Max Salary (£) *</label>
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Job Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter job description..."
                />
              </div>
              
              <div className="form-group full-width">
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter job requirements..."
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">Submit Vacancy</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VacancyManagement
