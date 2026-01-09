import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../backend/transactions";
import { Transaction, TransactionType } from "../types";

interface DashboardProps {
  session: Session;
}

const Dashboard: React.FC<DashboardProps> = ({ session }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await getTransactions();
    if (!error && data) {
      setTransactions(data);
    }
    setLoading(false);
  };

  const handleAddTransaction = async (
    title: string,
    amount: number,
    type: TransactionType
  ) => {
    setActionLoading(true);
    const { data, error } = await addTransaction(
      title,
      amount,
      type,
      session.user.id
    );

    if (!error && data) {
      setTransactions([data as unknown as Transaction, ...transactions]);
    } else {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction");
    }
    setActionLoading(false);
  };

  const handleDeleteTransaction = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmDelete) return;

    const { error } = await deleteTransaction(id);
    if (!error) {
      setTransactions(transactions.filter((t) => t.id !== id));
    } else {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Dashboard</h2>

        {/* Stats */}
        <DashboardStats transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <TransactionForm
              onAddTransaction={handleAddTransaction}
              isLoading={actionLoading}
            />
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 -ml-20">
            {loading ? (
              <div className="bg-zinc-800 rounded-xl p-12 flex justify-center border border-zinc-700/50">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-4 w-32 bg-zinc-700 rounded mb-4"></div>
                  <div className="h-4 w-48 bg-zinc-700 rounded"></div>
                </div>
              </div>
            ) : (
              <TransactionList
                transactions={transactions}
                onDelete={handleDeleteTransaction}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
