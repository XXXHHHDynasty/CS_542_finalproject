import App from "../App"
import Login from "../pages/Login/Login.jsx"
import Signup from "../pages/Signup/Signup.jsx"
import Home from "../pages/MainPage/Home/Home.jsx"
import UserProfile from "../pages/MainPage/UserProfile/UserProfile.jsx"
import Discussion from "../pages/MainPage/Discussion/Discussion.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom"

const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<App />}>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/discussion" element={<Discussion />}></Route>
                <Route path="/userprofile" element={<UserProfile />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter;