import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter([{ path: '/', element: <Root /> }]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
