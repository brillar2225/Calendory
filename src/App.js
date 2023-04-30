import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import Join from './routes/Join';
import Login from './routes/Login';
import Account from './routes/Account';
import Mypage from './routes/Mypage';
import ForgotPassword from './routes/ForgotPassword';
import ChangePassword from './routes/ChangePassword';
import DeleteAccount from './routes/DeleteAccount';
import TodoList from './routes/TodoList';

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
        path: 'join',
        element: <Join />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'reset-password',
        element: <ForgotPassword />,
      },
      {
        path: ':uid',
        element: <Account />,
        children: [
          { index: true, element: <Mypage /> },
          { path: ':uid/password/change', element: <ChangePassword /> },
          { path: ':uid/delete', element: <DeleteAccount /> },
        ],
      },
      {
        path: ':uid/todos',
        element: <TodoList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
