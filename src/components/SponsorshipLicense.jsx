import { useState } from 'react'
import './SponsorshipLicense.css'

const SponsorshipLicense = () => {
  const [activeTab, setActiveTab] = useState('application')
  const [applicationStatus, setApplicationStatus] = useState('in-progress')
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { name: 'Business Plan.pdf', status: 'approved', uploadDate: '2024-01-10' },
    { name: 'Organisational Chart.pdf', status: 'approved', uploadDate: '2024-01-10' },
    { name: 'HR Policies.pdf', status: 'pending', uploadDate: '2024-01-12' }
  ])

  const applicationChecklist = [
    { id: 1, item: 'Business Registration Documents', completed: true, required: true },
    { id: 2, item: 'Organisational Chart', completed: true, required: true },
    { id: 3, item: 'HR Policies and Procedures', completed: false, required: true },
    { id: 4, item: 'Recruitment Process Documentation', completed: false, required: true },
    { id: 5, item: 'Financial Statements', completed: true, required: true },
    { id: 6, item: 'Proof of Trading Activity', completed: false, required: true },
    { id: 7, item: 'Key Personnel Information', completed: true, required: true },
    { id: 8, item: 'Right to Work Policies', completed: false, required: true }
  ]

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const newDocument = {
        name: file.name,
        status: 'pending',
        uploadDate: new Date().toISOString().split('T')[0]
      }
      setUploadedDocuments([...uploadedDocuments, newDocument])
    }
  }

  const toggleChecklistItem = (id) => {
    // Toggle checklist item completion
  }

  return (
    <div className="sponsorship-license">
      <div className="license-header">
        <h2>Sponsorship License Application</h2>
        <div className="status-badge">
          Status: <span className={`status ${applicationStatus}`}>{applicationStatus.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="license-tabs">
        <button
          className={`tab-btn ${activeTab === 'application' ? 'active' : ''}`}
          onClick={() => setActiveTab('application')}
        >
          Application
        </button>
        <button
          className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
        <button
          className={`tab-btn ${activeTab === 'tracking' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracking')}
        >
          Tracking
        </button>
      </div>

      <div className="license-content">
        {activeTab === 'application' && (
          <div className="application-section">
            <h3>Application Checklist</h3>
            <div className="checklist">
              {applicationChecklist.map(item => (
                <div key={item.id} className="checklist-item">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`item-${item.id}`}
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)}
                    />
                    <label htmlFor={`item-${item.id}`} className="checkbox-label">
                      {item.item}
                      {item.required && <span className="required">*</span>}
                    </label>
                  </div>
                  <div className={`item-status ${item.completed ? 'completed' : 'pending'}`}>
                    {item.completed ? '✓' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>

            <div className="application-actions">
              <button className="btn-primary">Submit Application</button>
              <button className="btn-secondary">Save Draft</button>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="documents-section">
            <h3>Required Documents</h3>
            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" className="upload-btn">
                <span className="upload-icon">📁</span>
                <span>Click to upload documents</span>
                <span className="upload-hint">PDF, DOC, DOCX (Max 10MB)</span>
              </label>
            </div>

            <div className="documents-list">
              <h4>Uploaded Documents</h4>
              {uploadedDocuments.map((doc, index) => (
                <div key={index} className="document-item">
                  <div className="document-info">
                    <span className="document-name">{doc.name}</span>
                    <span className="document-date">Uploaded: {doc.uploadDate}</span>
                  </div>
                  <div className="document-status">
                    <span className={`status-badge ${doc.status}`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="tracking-section">
            <h3>Application Tracking</h3>
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Application Submitted</h4>
                  <p>2024-01-15 - Your application has been submitted to UKVI</p>
                </div>
              </div>
              <div className="timeline-item completed">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Initial Review</h4>
                  <p>2024-01-18 - Application passed initial review</p>
                </div>
              </div>
              <div className="timeline-item current">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Document Verification</h4>
                  <p>2024-01-22 - Currently verifying submitted documents</p>
                </div>
              </div>
              <div className="timeline-item pending">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Site Visit Scheduled</h4>
                  <p>Pending - UKVI site visit to be scheduled</p>
                </div>
              </div>
              <div className="timeline-item pending">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h4>Final Decision</h4>
                  <p>Pending - Awaiting final decision from UKVI</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SponsorshipLicense
