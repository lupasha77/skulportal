// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('http://localhost:5005/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          const data = await response.json();
          console.log('Login response:', data);

          if (!response.ok) {
            throw new Error(data.message || 'Login failed');
          }

          // Store both user data and token
          set({ 
            user: {
              _id: data._id,
              email: data.email,
              role: data.role,
              firstName: data.firstName,
              lastName: data.lastName
            },
            token: data.token,
            loading: false,
            error: null 
          });

          return data;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('auth-storage');
      },

      isAuthenticated: () => {
        const state = get();
        return !!state.token;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;