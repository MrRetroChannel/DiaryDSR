import React from 'react'
import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import '../styles/Navbar.css'

const EndPoints = ["/calendar", "/settings", "/activity"];

const NavText = ["Календарь", "Настройки задач", "Активность"];

var components: React.ReactElement[] = [];

for (var i = 0; i < NavText.length; i++)
    components.push(
        <LinkTrace key = {i} to = {EndPoints[i]} text = {NavText[i]} />
    )

export default function Navbar() {
    return (
        <nav>
            <div id = "navbar">
                <ul>
                    { components }
                </ul>
            </div>
        </nav>
    )
}

function LinkTrace({to, text, ...other}: {to: string, text: string}) {
    const path = useResolvedPath(to);
    const isCurrent = useMatch({ path: path.pathname, end: true });

    return (
        <li className = {isCurrent ? "currentPath" : ""}>
            <Link to = {to} {...other}>
                {text}
            </Link>
        </li>
    )
}