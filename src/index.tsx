import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './fonts/fonts.scss';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { LazyAbout } from './pages/about/About.lazy';
import { LazyShop } from './pages/shop/LazyShop';
import { Suspense } from 'react';

const rootElement = document.getElementById('root') as Element;

if (!rootElement) {
  throw new Error('root not found');
}

const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Link to="/">404, go home</Link>,
    children: [
      { path: '/', element: <div>Home</div> },
      {
        path: '/about',
        element: (
          <Suspense fallback="loading">
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback="loading">
            <LazyShop />
          </Suspense>
        ),
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
