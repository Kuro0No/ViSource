import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Detail from './pages/Detail';
import HomePage from './pages/Homepage';


function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/watch/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
