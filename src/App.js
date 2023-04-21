import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import NotFound from './routes/NotFound';
import Welcome from './routes/Welcome';
import Join from './routes/Join';
import Login from './routes/Login';
import Home from './routes/Home';
import TodoList from './routes/TodoList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Welcome />,
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
        path: ':uid',
        element: <Home />,
        children: [
          {
            path: '/:uid/todos',
            element: <TodoList />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
