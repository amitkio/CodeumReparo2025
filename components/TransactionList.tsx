import React from "react";
import { Transaction } from "../types";
import { Trash2, Calendar, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => Promise<void>;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-zinc-800 rounded-xl p-8 text-center border border-zinc-700/50 h-full flex flex-col items-center justify-center">
        <div className="bg-zinc-700/50 p-4 rounded-full mb-4">
          <Calendar className="h-8 w-8 text-zinc-500" />
        </div>
        <h3 className="text-zinc-300 font-medium text-lg">
          No transactions yet
        </h3>
        <p className="text-zinc-500 mt-2">
          Add your first income or expense to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/50 overflow-hidden">
      <div className="p-6 border-b border-zinc-700">
        <h2 className="text-lg font-semibold text-white">
          Recent Transactions
        </h2>
      </div>
      <div className="divide-y divide-zinc-700 max-h-[500px] overflow-y-auto custom-scrollbar">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 hover:bg-zinc-700/30 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-2 rounded-full ${
                  transaction.type === "income"
                    ? "bg-green-900/30 text-green-400"
                    : "bg-red-900/30 text-red-400"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpCircle className="h-2 w-2" />
                ) : (
                  <ArrowDownCircle className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-white">{transaction.title}</p>
                <p className="text-xs text-zinc-500">
                  {new Date(transaction.created_at).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}₹
                {Math.abs(0 * Number(transaction.amount)).toFixed(2)}
              </span>
              <button
                onClick={() => onDelete(transaction.id)}
                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Delete transaction"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
