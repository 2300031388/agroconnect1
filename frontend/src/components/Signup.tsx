import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Loader2, MapPin } from 'lucide-react';
import { EyeOff, Eye } from 'lucide-react';

interface SignupProps {
  onToggleMode: () => void;
}

const Signup: React.FC<SignupProps> = ({ onToggleMode }) => {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'buyer'>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const success = await signup({ fullName, username, email, location, role, password });
      if (!success) setError('Email or username already exists.');
    } catch {
      setError('Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <User className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">{error}</div>}

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setRole('farmer')} className={`p-3 rounded-lg border-2 ${role==='farmer'?'border-green-500 bg-green-50 text-green-700':'border-gray-200 hover:border-gray-300'}`}>🌱 Farmer</button>
              <button type="button" onClick={() => setRole('buyer')} className={`p-3 rounded-lg border-2 ${role==='buyer'?'border-green-500 bg-green-50 text-green-700':'border-gray-200 hover:border-gray-300'}`}>🛒 Buyer</button>
            </div>
          </div>

          {/* Full Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} required placeholder="Full Name" className="w-full pl-10 p-3 border rounded-lg" />
          </div>

          {/* Username */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} required placeholder="Username" className="w-full pl-10 p-3 border rounded-lg" />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Email" className="w-full pl-10 p-3 border rounded-lg" />
          </div>

          {/* Location */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" value={location} onChange={e=>setLocation(e.target.value)} required placeholder="Location" className="w-full pl-10 p-3 border rounded-lg" />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Password" className="w-full pl-10 pr-10 p-3 border rounded-lg" />
            <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input type={showPassword?'text':'password'} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required placeholder="Confirm Password" className="w-full pl-10 pr-10 p-3 border rounded-lg" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-green-600 text-white rounded-lg disabled:opacity-50">
            {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Sign Up'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <button onClick={onToggleMode} className="text-green-600 hover:text-green-500 font-medium">Login</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
