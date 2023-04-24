import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

const initialState = {
  user: null,
};

export const AuthContext = createContext();

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: SET_USER, payload: user });
      } else {
        dispatch({ type: REMOVE_USER, payload: null });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return useMemo(() => context, [context]);
};
