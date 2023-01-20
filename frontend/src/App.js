import './css/App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import Users from './pages/Users';
import Logout from './pages/Logout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Routes>
        <Route path="/" element={ <Index /> } />
        <Route path="/sign-in" element={ <SignIn /> } />
        <Route path="/profil" element={ <Users /> } />
        <Route path="/logout" element={ <Logout /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
