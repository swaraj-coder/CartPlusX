import React, { createContext } from 'react'

export const authDataContext = createContext()

function AuthContext({ children }) {
  // Switch automatically based on environment
  let serverUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000" // Local backend
      : "https://cartplusx-backend.onrender.com" // Deployed backend

  let value = { serverUrl }

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext
