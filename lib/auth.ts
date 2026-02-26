// Simple auth utility for the PHX CRM Portal
// Uses localStorage to persist the logged-in representative

const AUTH_KEY = 'phx_crm_user';
const TEST_PASSWORD = 'admin123';

export interface AuthUser {
  name: string;
  loginTime: string;
}

export function login(name: string, password: string): boolean {
  if (password !== TEST_PASSWORD) {
    return false;
  }
  const user: AuthUser = {
    name,
    loginTime: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }
  return true;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}
