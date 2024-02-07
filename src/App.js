import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import CartDetails from './pages/CartDetails';
import toast,{Toaster} from 'react-hot-toast';
import ProductView from './pages/ProductView';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/products/:id" element={<ProductView />} />
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
