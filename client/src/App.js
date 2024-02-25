import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import AddPassenger from './pages/AddPassenger';
import AddTrain from './pages/AddTrain';
import Razor from './pages/Razor';
import AddTicket from './pages/AddTicket';
import Analytics from './pages/Analytics';
import Train from './pages/train';
import Startpage from './pages/startpage';
import About from './pages/About';
import  History from './pages/History';
import AdminLogin from './pages/adminlogin';
import UserLogin from './pages/userlogin';
import PnrForm from './pages/Pnr';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path ='/' element = {<Startpage/>}/>
      <Route path="/history" element={<History />} />
      <Route path="/pay" element={<Razor />} />
      <Route path="/about" element={<About />} />
      <Route path="/train-ctrl" element={<Train />} />
      <Route path="/add-passenger" element={<AddPassenger />} />
      <Route path="/add-train" element={<AddTrain />} />
      <Route path="/add-ticket" element={<AddTicket />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/start-page" element={<HomePage />} />
      <Route path="/pnr-status" element={<PnrForm />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;