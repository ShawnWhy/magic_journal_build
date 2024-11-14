import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import Homepage from './pages/homepage/homepage';
import SpreadReadPage from './pages/spreadReadPage';
import { MyContext } from './contexts/myContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import Menu from './components/Menu/Menu';
import DaysJournal from './pages/daysJournal/daysJournal';
import SymbolsJournal from './pages/symbolsJournal/symbolsJournal';
import DaysDreams from './pages/daysDreams/daysDreams';
function App() {

  const [userProfile, setUserProfile] = useState(
    {
      
    id: "1111",
    email: "something@something.com",
   name:"guest user"  
    }
  )
  return (
    //react navigation
    <MyContext.Provider value={{ userProfile, setUserProfile }}>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          {/* spread page with inline parameters */}
          <Route
            path="/symbolsJournal/:symbol/:mode"
            element={<SymbolsJournal />}
          ></Route>
          <Route path="/spreadPage/:id" element={<SpreadReadPage />}></Route>
          <Route path="/daysJournal/:date" element={<DaysJournal />}></Route>
          <Route path="/daysDreams/:date" element={<DaysDreams />}></Route>

          <Route path="/Calendar" element={<Calendar />}></Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
