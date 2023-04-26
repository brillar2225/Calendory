import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import Join from './routes/Join';
import Login from './routes/Login';
import ForgotPassword from './routes/ForgotPassword';
import Mypage from './routes/Mypage';
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
        element: <Mypage />,
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
