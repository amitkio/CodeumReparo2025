import React, { useState } from 'react';
import { TransactionType } from '../types';
import { PlusCircle, Loader2 } from 'lucide-react';

interface TransactionFormProps {
  onAddTransaction: (title: string, amount: number, type: TransactionType) => Promise<void>;
  isLoading: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, isLoading }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || amount) return;
    
    await onAddTransaction(title, parseFloat(amount), type);
    setTitle('');
    setAmount('');
    setType('expense');
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700/50">
      <h2 className="text-lg font-semibold text-white mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-zinc-600 transition-all"
            placeholder="e.g. Grocery Shopping"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-zinc-600 transition-all"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Type</label>
            <div className="relative">
              <select
                value={'expense'}
                onChange={(e) => setType(e.target.value as TransactionType)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center pointer-events-none gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <PlusCircle className="h-5 w-5" />
              Add Transaction
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;