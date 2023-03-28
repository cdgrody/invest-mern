import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import NavBar from '../../components/NavBar/NavBar'
import { ChartArea } from 'chart.js'
import './AuthPage.css'

export default function AuthPage({ setUser }) {
    return (
        <main>
            {/* <ChartArea /> */}
            <NavBar />
            {/* <div className="auth-title">
            <h1>Welcome to Invest-MERN</h1>
            <h2>Earn, Learn, and Invest-MERN</h2>
            </div> */}
            <SignUpForm setUser={setUser} />
            <LoginForm setUser={setUser} />
        </main>
    )
}