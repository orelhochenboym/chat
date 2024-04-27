import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter([{ path: '/', element: <Root /> }]);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
