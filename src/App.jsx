import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import PeoplePage from "./pages/People";
import LoginPage from "./pages/Login";
import FeedPage from "./pages/Feed";
import PostsPage from "./pages/Posts";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<PostsPage />} />
                    <Route exact path="/home" element={<PostsPage />} />
                    <Route exact path="/feed" element={<FeedPage />} />
                    <Route exact path="/people" element={<PeoplePage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/register" element={<RegisterPage />} />
                    <Route
                        exact
                        path="/user/:userId"
                        element={<ProfilePage />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
