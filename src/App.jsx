
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import MyNavbar from './Components/MyNavbar';
import MusicPlayer from './Components/MusicPlayer';
function App() {
  return (<>
      <BrowserRouter>
  <div className='myContainer'>
    <div className='navContainer'>
    <MyNavbar/>
    </div>
  <div className='mainBody'>
    <div className='contentBody'>
      <Routes>

        <Route path="/" element={<Home />} />
      </Routes>

</div>
</div>
      <div className='musicContainer'>
        <MusicPlayer/>
      </div>
  </div>
  
      </BrowserRouter>
    </>
  );
}

export default App;
