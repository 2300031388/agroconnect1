import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: 'farmer' | 'buyer';
  location?: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string, role: 'farmer' | 'buyer') => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([
    { id: '1', fullName: 'John Farmer', username: 'farmer', email: 'farmer@demo.com', role: 'farmer', password: 'demo123', location: 'California' },
    { id: '2', fullName: 'Sarah Buyer', username: 'buyer', email: 'buyer@demo.com', role: 'buyer', password: 'demo123', location: 'New York' },
  ]);

  const login = async (usernameOrEmail: string, password: string, role: 'farmer' | 'buyer') => {
    await new Promise(r => setTimeout(r, 300));
    const found = users.find(
      u => (u.email === usernameOrEmail || u.username === usernameOrEmail) && u.password === password && u.role === role
    );
    if (found) {
      const { password, ...userWithoutPass } = found;
      setUser(userWithoutPass);
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }) => {
    await new Promise(r => setTimeout(r, 300));
    if (users.some(u => u.email === userData.email || u.username === userData.username)) return false;
    const newUser: StoredUser = { id: Date.now().toString(), ...userData };
    setUsers(prev => [...prev, newUser]);
    const { password, ...userWithoutPass } = newUser;
    setUser(userWithoutPass); // auto-login
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
