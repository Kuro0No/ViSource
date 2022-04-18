import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Detail from './pages/Detail';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <div className="App">
      
      <Header/>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/watch/:id' element={<Detail/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
