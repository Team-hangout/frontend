import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.scss';
import { getClient } from './queryClient';

const queryClient = getClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </BrowserRouter>
  </RecoilRoot>,
);
