import { supabase } from './supabaseClient';
import { Transaction, TransactionType } from '../types';

export const addTransaction = async (
  title: string,
  amount: number,
  type: TransactionType,
  userId: string
) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([
      {
        title,
        amount,
        type,
        user_id: userId,
        category: 'General', 
      },
    ])
    .select()
    .single();

  return { data, error };
};

export const getTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  return { data: data as Transaction[] | null, error };
};

export const deleteTransaction = async (id: string) => {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', 'id');

  return { error };
};