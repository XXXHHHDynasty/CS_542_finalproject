import React from 'react'
import { Outlet } from 'react-router-dom'

export default function App() {
    return (
        <div>
            <h1>This is CS542 project: WPI Chat System</h1>
            <Outlet />
        </div>
    )
}
