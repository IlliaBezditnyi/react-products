import { FC, useEffect, useState } from 'react';
import './ProductsPage.scss';
import { Card } from '../../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getProducts } from '../../store/slices/productSlice';
import { Pagination } from '../../components/Pagination/Pagination';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input/Input';
import useFormPersist from 'react-hook-form-persist';
import { getUser } from '../../hooks/getUserHook';

interface FilterData {
  name: string;
  price_from: string;
  price_to: string;
  date_from: string;
  date_to: string;
}

export const ProductsPage: FC = () => {
  const { control, watch, register, setValue, reset } = useForm<FilterData>({
    defaultValues: {
      name: "",
      price_from: "",
      price_to: "",
      date_from: "",
      date_to: ""
    },
    mode: 'onChange',
  });
  
  // setting filters to session storage
  useFormPersist("filter", { watch, setValue });

  const dispatch = useAppDispatch();
  // getting data from redux store
  const products = useAppSelector(state => state.products.data);
  const page = useAppSelector(state => state.products.current_page);
  
  // getting user auth token from locale storage
  const [user, setUser] = useState<any>(getUser());
  const {access_token} = user;

  // variables which triggering re-render, when typing in filter input
  const name = watch("name");
  const price_from = watch("price_from");
  const price_to = watch("price_to");
  const date_from = watch("date_from");
  const date_to = watch("date_to");

  // getting products based on given query params
  useEffect(() => {
    dispatch(getProducts(
      {
        access_token,
        page,
        name,
        price_from,
        price_to,
        date_from,
        date_to
      }
    ));
  }, [dispatch, access_token, page, name, price_from, price_to, date_from, date_to]);

  // function reseting all filters, when user clicks the button
  const resetFilters = () => {
    reset();
  }

  return (
    <div className='products'>
      <h1 className='products__title'>See our products:</h1>
      <div className='products__filters'>
        <h2 className='products__filters--title'>Filter works by:</h2>
        <div className='products__filters--container'>
          <Input
            {...register("name")}
            label="Name"
            name="name"
            placeholder="Serch by name"
            control={control}
          />

          <div className='products__filters--inputs'>
            <Input
              {...register("price_from")}
              label="Price (from - to)"
              name="price_from"
              placeholder="0"
              control={control}
            />
            <Input
              {...register("price_to")}
              name="price_to"
              placeholder="20000"
              control={control}
            />
          </div>

          <div className='products__filters--inputs'>
            <Input
              {...register("date_from")}
              label="Date (from - to)"
              name="date_from"
              placeholder="2020-12-01"
              control={control}
            />

            <Input
              {...register("date_to")}
              name="date_to"
              placeholder="2020-12-29"
              control={control}
            />
          </div>

          <button
            className='products__filters--button'
            onClick={() => resetFilters()}
          >
            Clear all filters
          </button>
        </div>
      </div>

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
        <span>{products?.length === 0 && 'Not one of the products does not match your filters!'}</span>
      </div>

      <div className='products__pagination'>
        <Pagination />
      </div>
    </div>
  )
};
