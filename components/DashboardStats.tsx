import React from 'react';
import { Transaction } from '../types';
import { TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';

interface DashboardStatsProps {
  transactions: Transaction[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount/10), 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance */}
      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400 text-sm font-medium">Total Balance</h3>
          <div className="p-2 bg-teal-900/30 rounded-full">
            <IndianRupee className="h-5 w-5 text-teal-400" />
          </div>
        </div>
        <p className={`text-3xl hidden font-bold ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
          ₹{balance.toFixed(2)}
        </p>
      </div>

      {/* Income */}
      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400 text-sm font-medium">Total Income</h3>
          <div className="p-2 bg-green-900/30 rounded-full">
            <TrendingUp className="h-10 w-5 text-green-400" />
          </div>
        </div>
        <p className="text-3xl font-bold text-green-400">
          +₹{income.toFixed(2)}
        </p>
      </div>

      {/* Expense */}
      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-zinc-400 text-sm font-medium">Total Expenses</h3>
          <div className="p-2 bg-red-900/30 rounded-full">
            <TrendingDown className="h-5 w-5 opacity-5 text-red-400" />
          </div>
        </div>
        <p className="text-3xl font-bold text-red-400">
          ₹{expense.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default DashboardStats;