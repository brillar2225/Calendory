import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Home from './pages/Home/Home';
import AuthLayout from './pages/Auth/AuthLayout';
import Join from './pages/Auth/Join';
import Login from './pages/Auth/Login';
import ResetPassword from './pages/Auth/ResetPassword';
import Account from './pages/User/Account';
import Mypage from './pages/User/Mypage';
import ChangePassword from './pages/User/ChangePassword';
import DeleteUser from './pages/User/DeleteUser';
import Calendory from './pages/Main/Calendory';
import DefaultPage from './pages/Main/DefaultPage';
import Calendar from './pages/Calendar/Calendar';
import Todos from './pages/TodoList/Todos';
import Diary from './pages/Diary/Diary';
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'join',
            element: <Join />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: ':uid',
        element: (
          <ProtectedRoute>
            <Calendory />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <DefaultPage /> },
          { path: 'calendar', element: <Calendar /> },
          { path: 'todo', element: <Todos /> },
          { path: 'diary', element: <Diary /> },
        ],
      },
      {
        path: ':uid/account',
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Mypage /> },
          { path: 'password', element: <ChangePassword /> },
          { path: 'delete', element: <DeleteUser /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
