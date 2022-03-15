import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Home() {
    let location = useLocation()

    return (
        <div>
            <h2>Home</h2>
            <h3>Welcome {location.state ? location.state.username : ""}</h3>
        </div>
    )
}
