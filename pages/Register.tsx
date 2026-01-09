import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../backend/auth';
import { UserPlus, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    
    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      setSuccessMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="max-w-md w-full bg-zinc-800 p-8 rounded-2xl shadow-xl border border-zinc-700/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-teal-600 rounded-xl mb-4">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
          <p className="text-zinc-400 mt-2">Start tracking your expenses today</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 bg-green-900/30 border border-green-800 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            {successMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : (
              <>
                <UserPlus className="h-5 w-5" />
                Sign Up
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-zinc-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;