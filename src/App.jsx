import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import FriendsPage from "./pages/Friends";
import LoginPage from "./pages/Login";
import PostsPage from "./pages/Posts";
import RegisterPage from "./pages/Register";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/home" element={<PostsPage />} />
                    <Route exact path="/friends" element={<FriendsPage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/register" element={<RegisterPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
