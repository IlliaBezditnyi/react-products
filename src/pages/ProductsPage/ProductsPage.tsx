import { FC, useEffect, useState } from 'react';
import './ProductsPage.scss';
import { Card } from '../../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getProducts } from '../../store/slices/productSlice';

function getUser() {
  let user = localStorage.getItem('user');

  if (user) {
    user = JSON.parse(user)
  } else {
    user = null;
  }

  return user;
}

export const ProductsPage: FC = () => {

  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  // const {access_token} = useAppSelector(state => state.user.user);
  const [user, setUser] = useState<any>(getUser());


  useEffect(() => {
    console.log('Hello');
    dispatch(getProducts(user.access_token));
  }, [dispatch, user.access_token]);

  return (
    <div className='container'>
      <h1 className='title'>See our products:</h1>
      <div className='products'>
        {products.map((item, index) => {
          return (
            <Card key={index.toString()} image={item.thumbnail} title={item.title} price={item.price} />
          )
        })}
      </div>
    </div>
  )
};
