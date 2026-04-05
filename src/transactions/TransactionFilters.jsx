import { useStore } from '../store/useStore'

export default function TransactionFilters() {
  const filters = useStore(s => s.filters)
  const setFilters = useStore(s => s.setFilters)

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Search by category or date (YYYY-MM)"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="flex-1 px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
      />
      <select
        value={filters.type}
        onChange={(e) => setFilters({ type: e.target.value })}
        className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        value={filters.sortBy}
        onChange={(e) => setFilters({ sortBy: e.target.value })}
        className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>
      <select
        value={filters.sortDir}
        onChange={(e) => setFilters({ sortDir: e.target.value })}
        className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  )
}

