
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AppRouter from './AppRouter'

function App() {


  return (
    <div >
 <BrowserRouter>
      <AppRouter /> 
    </BrowserRouter>
    </div>
  )
}

export default App
