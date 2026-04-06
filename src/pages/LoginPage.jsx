import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(email, password)
    
    if (!result.success) {
      setError(result.message)
    }
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">
                <span className="logo-text">EP</span>
              </div>
              <div className="company-name">Elite PIC</div>
            </div>
            <div className="tagline">Case Management CRM</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">Sponsor Portal Login</h2>
          
          {error && (
            <div className="error-message">
              <div className="error-icon">⚠️</div>
              <div className="error-text">{error}</div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>
          
          <button type="submit" className="login-btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              <>
                <span className="btn-icon">🔐</span>
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <div className="demo-section">
            <h3 className="demo-title">Demo Credentials</h3>
            <div className="demo-credentials">
              <div className="credential-item">
                <span className="credential-label">Email:</span>
                <span className="credential-value">sponsor@epic.com</span>
              </div>
              <div className="credential-item">
                <span className="credential-label">Password:</span>
                <span className="credential-value">password</span>
              </div>
            </div>
          </div>
          <div className="help-section">
            <h3 className="help-title">Need Help?</h3>
            <div className="help-links">
              <a href="#" className="help-link">Forgot Password?</a>
              <a href="#" className="help-link">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
