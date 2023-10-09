
import { useContext, useEffect } from 'react'
import { Routes , Route, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/auth-context'
import Login from './routes/Login'
import FormulaOne from './routes/FormulaOne'

function App() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  // NOTE: console log for testing purposes
  console.log('User:', !!currentUser);

  // Check if the current user exists on the initial render.
  useEffect(() => {
    if (currentUser) {
      navigate('/formulaOne')
    }
  }, [currentUser, navigate])
  
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="formulaOne" element={currentUser ? <FormulaOne />: <Login />} />
    </Routes>
  )
}

export default App
