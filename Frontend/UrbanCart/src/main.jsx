import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';

import { Toaster } from "sonner";
import './index.css'
import App from './App.jsx'

import { Provider } from "react-redux";

import { store } from "./redux/store.js"

createRoot(document.getElementById('root')).render(



  <Provider store={store}>
    <App />
  
    <Toaster
      richColors
      position="top-right"
    />
  </Provider>


)
