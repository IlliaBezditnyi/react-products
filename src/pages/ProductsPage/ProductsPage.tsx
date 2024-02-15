import { FC, useEffect, useState } from 'react';
import './ProductsPage.scss';
import { Card } from '../../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getProducts } from '../../store/slices/productSlice';
import { Pagination } from '../../components/Pagination/Pagination';
import { Filter } from '../../components/Filters/Filter';

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
  const products = useAppSelector(state => state.products.data);
  const page = useAppSelector(state => state.products.current_page);
  // const access_token = useAppSelector(state => state.user.access_token);
  // const [page, setPage] = useState<number>(2);
  const [user, setUser] = useState<any>(getUser());

  let {access_token} = user;
  let title = ''

  useEffect(() => {
    dispatch(getProducts({access_token, page, title}));
  }, [access_token, dispatch, page]);

  return (
    <div className='products'>
      <h1 className='products__title'>See our products:</h1>
      <div className='products__filters'>
        <h2 className='products__filters--title'>Filter works by:</h2>
        <Filter />
      </div>
      {/* <div className='products'> */}
        <div className='products__list'>
          {products?.map((item, index) => {
            return (
              <Card
                key={index.toString()}
                image={item.thumbnail}
                title={item.title}
                price={item.price}
              />
            )
          })}
        </div>
        <div className='products__pagination'>
          <Pagination />
        </div>
      {/* </div> */}
    </div>
  )
};
