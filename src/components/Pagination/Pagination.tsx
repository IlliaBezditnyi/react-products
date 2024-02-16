import { FC } from 'react';
import './Pagination.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import classNames from 'classnames';
import { setPage } from '../../store/slices/productSlice';

export const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  // getting data from redux store
  let {current_page, total, per_page} = useAppSelector(state => state.products);
  
  const pageNumbers = [];

  // calculating how much pages needed for pagination
  for (let i = 1; i <= Math.ceil(total / per_page); i++) {
    pageNumbers.push(i);
  }

  // moving to the exact page of pagination
  const changePage = (number: number) => {
    dispatch(setPage(number));
  };

  // moving to previos page of pagination
  const onPrevClick = () => {
    if (current_page !== 1) {
      dispatch(setPage(current_page - 1));
    }
  }

  // moving to next page of pagination
  const onNextClick = () => {
    if (current_page !== pageNumbers.length) {
      dispatch(setPage(current_page + 1));
    }
  }

  return (
    <div>
      <ul className='list'>
        <li
          className={classNames(
            'list__button',
            { 'list__button--disabled': current_page <= 1 }
          )}
          onClick={() => onPrevClick()}
        >
          {'<'} Prev
        </li>

        {
          pageNumbers
          .slice(current_page === 1 ? current_page -1 : current_page - 2 ,current_page+1)
          .map((number, index) => (
            <li key={index.toString()} className='list__item'>
              <div className={classNames(
                  'list__item--link',
                  { 'list__item--active': current_page === number }
                )}
                onClick={() => changePage(number)}
              >
                {number}
              </div>
            </li>
          ))
        }

        <li
          className={classNames(
            'list__button',
            { 'list__button--disabled': current_page >= pageNumbers.length }
          )}
          onClick={() => onNextClick()}
        >
          Next {'>'}
        </li>
      </ul>
    </div>
  )
}
