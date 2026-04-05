import Navbar from './components/Navbar'
import SummaryCard from './components/SummaryCard'
import Insights from './components/Insights'
import BalanceChart from './charts/BalanceChart'
import CategoryPieChart from './charts/CategoryPieChart'
import TransactionTable from './transactions/TransactionTable'
import { useStore } from './store/useStore'
import { calculateTotalIncome, calculateTotalExpense, calculateBalance } from './utils/calculations'

export default function App() {
  const transactions = useStore(s => s.transactions)

  const totalIncome = calculateTotalIncome(transactions)
  const totalExpense = calculateTotalExpense(transactions)
  const balance = calculateBalance(transactions)

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Summary cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SummaryCard title="Total Balance" value={`$${balance.toLocaleString()}`} accent={balance >= 0 ? 'green' : 'red'} />
          <SummaryCard title="Total Income" value={`$${totalIncome.toLocaleString()}`} accent="green" />
          <SummaryCard title="Total Expenses" value={`$${totalExpense.toLocaleString()}`} accent="red" />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <BalanceChart transactions={transactions} />
          </div>
          <div>
            <CategoryPieChart transactions={transactions} />
          </div>
        </section>

        {/* Transactions + Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TransactionTable />
          </div>
          <div>
            <Insights transactions={transactions} />
          </div>
        </section>
      </main>
    </div>
  )
}

