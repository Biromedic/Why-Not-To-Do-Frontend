import './App.css';
import Navbar from './Components/NavbarFolder/Navbar'
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './Components/Auth/LoginPage';
import RegisterPage from './Components/Auth/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <main className='homepage'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
} 

export default App;

