import './OverviewPage.css'
import TransactionForm from '../../components/TransactionForm/TransactionForm'

export default function OverviewPage() {
    return (
        <div className="main-body">
            <div className="chart-area">Chart Area</div>
            <div className="bottom-half">
                <div className="left-area">
                <TransactionForm />
                </div>
                <div className="right-area">Right Area</div>
            </div>
        </div>
    )
}