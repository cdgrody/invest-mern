import { Link } from 'react-router-dom'
import './PortfolioNav.css'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {


    return (
        <nav>
            <div className="welcome">Welcome, {user.name} <br></br></div>
            <Link to="/api/transactions" onClick={handleLogOut} className="logout">Transactions</Link>
            <Link to="" onClick={handleLogOut} className="logout">Holdings</Link>
            <Link to="" onClick={handleLogOut} className="logout">Profile</Link>
        </nav>
    )
}