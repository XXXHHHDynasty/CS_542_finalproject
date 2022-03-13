import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login/Login"

import { BrowserRouter, Routes, Route } from "react-router-dom"

const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route path="/home" element={<Home />}></Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter;