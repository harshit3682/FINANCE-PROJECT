## Finance Dashboard

A clean, modern, and responsive Finance Dashboard built with React (Vite), Zustand, Tailwind CSS, and Recharts. Track income and expenses, visualize trends, and gain useful insights with a simple, role-based UI.

### Features
- **Dashboard overview** with dynamic totals (Balance, Income, Expenses)
- **Charts**:
  - Line chart: balance over time
  - Pie chart: expense breakdown by category
- **Transactions**:
  - Table with search (category/date), filter (income/expense), sort (amount/date)
  - Empty state handling
- **Role-based UI**:
  - Viewer: view-only
  - Admin: add, edit, delete transactions
- **Insights**: highest spending category, monthly expense comparison, top 3 categories
- **Dark mode** toggle with persistence
- **Data persistence** via Zustand localStorage

### Tech Stack
- React 18 + Vite
- Zustand (with `persist` middleware)
- Tailwind CSS
- Recharts
- date-fns

### Project Structure
```
src/
  components/
    Navbar.jsx
    RoleSwitcher.jsx
    SummaryCard.jsx
    Insights.jsx
  charts/
    BalanceChart.jsx
    CategoryPieChart.jsx
  transactions/
    TransactionTable.jsx
    TransactionRow.jsx
    TransactionForm.jsx
    TransactionFilters.jsx
  store/
    useStore.js
  utils/
    calculations.js
  data/
    mockData.js
  App.jsx
  main.jsx
```

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```

### Design Decisions
- **State management**: Zustand for a minimal, scalable store with `persist` to localStorage for transactions, role, filters, and dark mode.
- **UI/UX**: Tailwind for utility-first styling, consistent card components, responsive grids, subtle transitions, and dark mode.
- **Charts**: Recharts chosen for ease-of-use and responsive containers.
- **Separation of concerns**: Utilities for calculations and insights, lean components, reusable summary cards.
- **Edge cases**: Handled no data, only income/only expense, and empty search results with clear states.

### Notes
- Mock data seeds realistic income and expenses for 3 months.
- Role switcher defaults to Viewer; switch to Admin to add/edit/delete.
- Search accepts category names or `YYYY-MM`-style strings to match dates.

