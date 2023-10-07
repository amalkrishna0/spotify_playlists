import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Body from './components/Body'
import Body2 from './components/Body2';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path='/spotify-playlist'
            element={
              <div>
                <Navbar /><Body />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            path='/your-top-tracks'
            element={
              <div>
                <Navbar/><Body2/>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
