import { FC } from 'react';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { Routes, Route } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';

export const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={ <AuthPage/> } />
      <Route path='/products' element={ <ProductsPage/> } />
    </Routes>
  );
};
