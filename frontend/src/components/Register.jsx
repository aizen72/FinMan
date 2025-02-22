import React from 'react'

const Register = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
          <div className="text-center mt-3">
            <a href="/login" className="text-decoration-none">Already have account then Login</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register