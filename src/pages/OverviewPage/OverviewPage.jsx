import './OverviewPage.css'
import TransactionForm from '../../components/TransactionForm/TransactionForm'

export default function OverviewPage({ user }) {
    return (
        <div className="main-body">
            <div className="chart-area">Chart Area</div>
            <div className="bottom-half">
                <div className="left-area">
                <TransactionForm user={user}/>
                </div>
                <div className="right-area">Right Area</div>
            </div>
        </div>
    )
}