
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Router } from 'react-router-dom';
import Home from './Components/Home';
import MyNavbar from './Components/MyNavbar';
function App() {
  return (<>
    <MyNavbar/>
    <Router>
      <Home />
    </Router>
  </>
  );
}

export default App;
