import { Link } from 'react-router-dom'
import './NavBar.css'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav>
            <div className="welcome">Welcome, {user.name} <br></br></div>
            <Link to="" onClick={handleLogOut} className="logout">Log Out</Link>
        </nav>
    )
}