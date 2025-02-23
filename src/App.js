import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home';
import Editor from './pages/Editor';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/editor/:room_hash*" element={<Editor />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
