/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useReducer } from 'react';

import { authApi } from '../api/auth';
import { storage } from '../utils/storage';

const initialState = {
  user: storage.getUser(),
  token: storage.getToken(),
  status: 'idle', // idle | loading | success | error
  error: null,
};

const ACTIONS = {
  START: 'START',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  LOGOUT: 'LOGOUT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START:
      return { ...state, status: 'loading', error: null };
    case ACTIONS.SUCCESS:
      return {
        ...state,
        status: 'success',
        user: action.payload.user,
        token: action.payload.token,
      };
    case ACTIONS.ERROR:
      return { ...state, status: 'error', error: action.payload };
    case ACTIONS.LOGOUT:
      return { ...initialState, token: null };
    default:
      return state;
  }
};

export const AuthContext = createContext({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const bootstrap = async () => {
      if (!state.token) return;
      dispatch({ type: ACTIONS.START });
      try {
        const { data } = await authApi.profile();
        dispatch({
          type: ACTIONS.SUCCESS,
          payload: { user: data.user, token: state.token },
        });
      } catch (error) {
        console.warn('Profile fetch failed', error);
        storage.clear();
        dispatch({ type: ACTIONS.LOGOUT });
      }
    };
    bootstrap();
  }, [state.token]);

  const value = useMemo(() => {
    const login = async (credentials) => {
      dispatch({ type: ACTIONS.START });
      try {
        const { data } = await authApi.login(credentials);
        storage.setSession(data.token, data.user);
        dispatch({
          type: ACTIONS.SUCCESS,
          payload: { user: data.user, token: data.token },
        });
      } catch (error) {
        dispatch({
          type: ACTIONS.ERROR,
          payload: error.response?.data?.message ?? 'Login failed',
        });
        throw error;
      }
    };

    const register = async (payload) => {
      dispatch({ type: ACTIONS.START });
      try {
        const { data } = await authApi.register(payload);
        storage.setSession(data.token, data.user);
        dispatch({
          type: ACTIONS.SUCCESS,
          payload: { user: data.user, token: data.token },
        });
      } catch (error) {
        dispatch({
          type: ACTIONS.ERROR,
          payload: error.response?.data?.message ?? 'Registration failed',
        });
        throw error;
      }
    };

    const logout = async () => {
      try {
        await authApi.logout();
      } finally {
        storage.clear();
        dispatch({ type: ACTIONS.LOGOUT });
      }
    };

    const refreshProfile = async () => {
      const { data } = await authApi.profile();
      storage.setUser(data.user);
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: { user: data.user, token: storage.getToken() },
      });
    };

    return {
      ...state,
      login,
      register,
      logout,
      refreshProfile,
    };
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

