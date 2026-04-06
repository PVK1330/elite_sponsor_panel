import { useState } from 'react'
import './Communication.css'

const Communication = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Johnson',
      senderType: 'caseworker',
      recipient: 'Elite PIC Ltd',
      subject: 'Document Request for John Doe',
      message: 'Please provide the updated passport copy for John Doe\'s application. The current document is expiring soon.',
      timestamp: '2024-01-15 10:30',
      status: 'unread',
      priority: 'high'
    },
    {
      id: 2,
      sender: 'Elite PIC Ltd',
      senderType: 'sponsor',
      recipient: 'Mike Wilson',
      subject: 'Vacancy Approval Request',
      message: 'We have submitted a new vacancy for Senior Software Developer. Please review and approve.',
      timestamp: '2024-01-14 14:15',
      status: 'read',
      priority: 'medium'
    },
    {
      id: 3,
      sender: 'System',
      senderType: 'system',
      recipient: 'Elite PIC Ltd',
      subject: 'Visa Expiry Alert',
      message: 'Jane Smith\'s visa is expiring in 30 days. Please initiate renewal process.',
      timestamp: '2024-01-13 09:00',
      status: 'read',
      priority: 'high'
    }
  ])

  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [composeMessage, setComposeMessage] = useState(false)
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    message: '',
    priority: 'medium'
  })

  const tabOptions = [
    { id: 'inbox', label: 'Inbox', count: messages.filter(m => m.status === 'unread').length },
    { id: 'sent', label: 'Sent', count: 0 },
    { id: 'notifications', label: 'Notifications', count: messages.filter(m => m.senderType === 'system').length }
  ]

  const filteredMessages = messages.filter(message => {
    if (activeTab === 'inbox') return message.recipient === 'Elite PIC Ltd'
    if (activeTab === 'sent') return message.sender === 'Elite PIC Ltd'
    if (activeTab === 'notifications') return message.senderType === 'system'
    return true
  })

  const markAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    ))
  }

  const sendMessage = () => {
    const message = {
      id: messages.length + 1,
      sender: 'Elite PIC Ltd',
      senderType: 'sponsor',
      recipient: newMessage.recipient,
      subject: newMessage.subject,
      message: newMessage.message,
      timestamp: new Date().toLocaleString(),
      status: 'sent',
      priority: newMessage.priority
    }
    setMessages([...messages, message])
    setComposeMessage(false)
    setNewMessage({
      recipient: '',
      subject: '',
      message: '',
      priority: 'medium'
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#c8102e'
      case 'medium': return '#ffc107'
      case 'low': return '#28a745'
      default: return '#6c757d'
    }
  }

  return (
    <div className="communication">
      <div className="communication-header">
        <h2>Communication Center</h2>
        <button className="compose-btn" onClick={() => setComposeMessage(true)}>
          + Compose Message
        </button>
      </div>

      <div className="communication-tabs">
        {tabOptions.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {filteredMessages.map(message => (
            <div 
              key={message.id} 
              className={`message-item ${message.status === 'unread' ? 'unread' : ''}`}
              onClick={() => {
                setSelectedMessage(message)
                markAsRead(message.id)
              }}
            >
              <div className="message-header">
                <div className="message-sender">
                  <span className="sender-name">{message.sender}</span>
                  <span className="sender-type">{message.senderType}</span>
                </div>
                <div className="message-meta">
                  <span 
                    className="priority-indicator"
                    style={{ backgroundColor: getPriorityColor(message.priority) }}
                  >
                    {message.priority}
                  </span>
                  <span className="message-time">{message.timestamp}</span>
                </div>
              </div>
              <div className="message-content">
                <h4 className="message-subject">{message.subject}</h4>
                <p className="message-preview">{message.message.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>

        {selectedMessage && (
          <div className="message-detail">
            <div className="message-detail-header">
              <h3>{selectedMessage.subject}</h3>
              <button className="close-detail" onClick={() => setSelectedMessage(null)}>
                ×
              </button>
            </div>
            
            <div className="message-detail-content">
              <div className="message-info">
                <div className="info-row">
                  <span className="label">From:</span>
                  <span className="value">{selectedMessage.sender}</span>
                </div>
                <div className="info-row">
                  <span className="label">To:</span>
                  <span className="value">{selectedMessage.recipient}</span>
                </div>
                <div className="info-row">
                  <span className="label">Date:</span>
                  <span className="value">{selectedMessage.timestamp}</span>
                </div>
                <div className="info-row">
                  <span className="label">Priority:</span>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(selectedMessage.priority) }}
                  >
                    {selectedMessage.priority}
                  </span>
                </div>
              </div>
              
              <div className="message-body">
                <p>{selectedMessage.message}</p>
              </div>
              
              <div className="message-actions">
                <button className="btn-reply">Reply</button>
                <button className="btn-forward">Forward</button>
                <button className="btn-delete">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {composeMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Compose Message</h3>
              <button className="close-btn" onClick={() => setComposeMessage(false)}>×</button>
            </div>
            
            <div className="compose-form">
              <div className="form-group">
                <label>Recipient</label>
                <select
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                >
                  <option value="">Select recipient...</option>
                  <option value="Sarah Johnson">Sarah Johnson (Caseworker)</option>
                  <option value="Mike Wilson">Mike Wilson (Caseworker)</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  placeholder="Enter subject..."
                />
              </div>
              
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={newMessage.priority}
                  onChange={(e) => setNewMessage({...newMessage, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                  rows="6"
                  placeholder="Type your message here..."
                />
              </div>
              
              <div className="form-actions">
                <button className="btn-send" onClick={sendMessage}>Send Message</button>
                <button className="btn-cancel" onClick={() => setComposeMessage(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Communication
