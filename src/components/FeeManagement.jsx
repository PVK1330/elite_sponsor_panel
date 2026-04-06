import { useState } from 'react'
import './FeeManagement.css'

const FeeManagement = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      candidateName: 'John Doe',
      visaType: 'Skilled Worker',
      description: 'Initial Application Fee',
      amount: 1500,
      dueDate: '2024-01-20',
      status: 'paid',
      paymentDate: '2024-01-18',
      method: 'Bank Transfer',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      visaType: 'Global Talent',
      description: 'Application Processing Fee',
      amount: 2000,
      dueDate: '2024-02-15',
      status: 'pending',
      paymentDate: null,
      method: null,
      invoiceNumber: 'INV-2024-002'
    },
    {
      id: 3,
      candidateName: 'Ahmed Hassan',
      visaType: 'Health & Care Worker',
      description: 'Document Verification',
      amount: 800,
      dueDate: '2024-01-25',
      status: 'overdue',
      paymentDate: null,
      method: null,
      invoiceNumber: 'INV-2024-003'
    },
    {
      id: 4,
      candidateName: 'John Doe',
      visaType: 'Skilled Worker',
      description: 'Biometric Fee',
      amount: 19.25,
      dueDate: '2024-02-01',
      status: 'pending',
      paymentDate: null,
      method: null,
      invoiceNumber: 'INV-2024-004'
    }
  ])

  const [activeFilter, setActiveFilter] = useState('all')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)

  const filterOptions = [
    { id: 'all', label: 'All Payments', count: payments.length },
    { id: 'paid', label: 'Paid', count: payments.filter(p => p.status === 'paid').length },
    { id: 'pending', label: 'Pending', count: payments.filter(p => p.status === 'pending').length },
    { id: 'overdue', label: 'Overdue', count: payments.filter(p => p.status === 'overdue').length }
  ]

  const filteredPayments = activeFilter === 'all' 
    ? payments 
    : payments.filter(p => p.status === activeFilter)

  const totalRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const outstandingAmount = payments
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#28a745'
      case 'pending': return '#ffc107'
      case 'overdue': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const handlePayment = (payment) => {
    setSelectedPayment(payment)
    setShowPaymentModal(true)
  }

  const recordPayment = (method) => {
    setPayments(payments.map(p => 
      p.id === selectedPayment.id 
        ? { 
            ...p, 
            status: 'paid', 
            paymentDate: new Date().toISOString().split('T')[0],
            method: method 
          }
        : p
    ))
    setShowPaymentModal(false)
    setSelectedPayment(null)
  }

  const downloadInvoice = (invoiceNumber) => {
    // Simulate invoice download
    alert(`Downloading invoice ${invoiceNumber}`)
  }

  return (
    <div className="fee-management">
      <div className="fee-header">
        <h2>Fee Management</h2>
        <div className="revenue-summary">
          <div className="revenue-card">
            <span className="revenue-label">Total Revenue</span>
            <span className="revenue-amount">£{totalRevenue.toLocaleString()}</span>
          </div>
          <div className="revenue-card outstanding">
            <span className="revenue-label">Outstanding</span>
            <span className="revenue-amount">£{outstandingAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="filter-tabs">
        {filterOptions.map(filter => (
          <button
            key={filter.id}
            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
            <span className="filter-count">{filter.count}</span>
          </button>
        ))}
      </div>

      <div className="payments-table">
        <div className="table-header">
          <h3>Payment Records</h3>
          <button className="export-btn">Export to Excel</button>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Candidate</th>
                <th>Visa Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td className="invoice-number">{payment.invoiceNumber}</td>
                  <td className="candidate-name">{payment.candidateName}</td>
                  <td className="visa-type">{payment.visaType}</td>
                  <td className="description">{payment.description}</td>
                  <td className="amount">£{payment.amount.toLocaleString()}</td>
                  <td className="due-date">{payment.dueDate}</td>
                  <td className="status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(payment.status) }}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="payment-date">
                    {payment.paymentDate || '-'}
                  </td>
                  <td className="method">
                    {payment.method || '-'}
                  </td>
                  <td className="actions">
                    {payment.status !== 'paid' && (
                      <button 
                        className="btn-pay"
                        onClick={() => handlePayment(payment)}
                      >
                        Record Payment
                      </button>
                    )}
                    <button 
                      className="btn-download"
                      onClick={() => downloadInvoice(payment.invoiceNumber)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPaymentModal && selectedPayment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Record Payment</h3>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            
            <div className="payment-details">
              <div className="payment-summary">
                <h4>Payment Information</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="label">Invoice:</span>
                    <span className="value">{selectedPayment.invoiceNumber}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Candidate:</span>
                    <span className="value">{selectedPayment.candidateName}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Amount:</span>
                    <span className="value">£{selectedPayment.amount.toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Due Date:</span>
                    <span className="value">{selectedPayment.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="payment-methods">
                <h4>Select Payment Method</h4>
                <div className="method-grid">
                  <button 
                    className="method-btn"
                    onClick={() => recordPayment('Bank Transfer')}
                  >
                    <span className="method-icon">🏦</span>
                    <span className="method-label">Bank Transfer</span>
                  </button>
                  <button 
                    className="method-btn"
                    onClick={() => recordPayment('Credit Card')}
                  >
                    <span className="method-icon">💳</span>
                    <span className="method-label">Credit Card</span>
                  </button>
                  <button 
                    className="method-btn"
                    onClick={() => recordPayment('Debit Card')}
                  >
                    <span className="method-icon">💳</span>
                    <span className="method-label">Debit Card</span>
                  </button>
                  <button 
                    className="method-btn"
                    onClick={() => recordPayment('Cash')}
                  >
                    <span className="method-icon">💵</span>
                    <span className="method-label">Cash</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeeManagement
