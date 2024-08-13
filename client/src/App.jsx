import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './Pages/Auth/index.jsx';
import { NoteProvider } from "./context/Notes-contexts.jsx";
import './App.css'
import NoteList from "./Pages/Dashboard/NoteList.jsx";
import AddingNote from "./Pages/Dashboard/AddingNote.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import HomePage from "./Pages/Dashboard/Home.jsx";
import CustomNavbar from "./Pages/Dashboard/Navbar.jsx";
import SharedWithMe from "./Pages/Dashboard/SharedWithMe.jsx";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <CustomNavbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <NoteProvider>
                <Routes>
                  <Route path="/add" element={<AddingNote />}/>
                  <Route path="/notes" element={<NoteList />}/>
                  <Route path="/sharedwithme" element={<SharedWithMe />} />
                </Routes>
              </NoteProvider>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;