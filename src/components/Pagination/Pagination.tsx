import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import './Pagination.scss';
import classNames from 'classnames';
import { setPage } from '../../store/slices/productSlice';

export const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  let {current_page, total, per_page} = useAppSelector(state => state.products);
  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / per_page); i++) {
    pageNumbers.push(i);
  }

  const changePage = (number: number) => {
    dispatch(setPage(number));
  };

  const onPrevClick = () => {
    if (current_page !== 1) {
      dispatch(setPage(current_page - 1));
    }
  }

  const onNextClick = () => {
    if (current_page !== pageNumbers.length) {
      dispatch(setPage(current_page + 1));
    }
  }

  return (
    <div>
      {pageNumbers.length > 1 &&
        <ul className='list'>
          <li className={classNames(
              'list__button',
              { 'list__button--disabled': current_page <= 1 }
            )}
            onClick={() => onPrevClick()}
          >
            {'<'} Prev
          </li>
          {
            pageNumbers.slice(current_page === 1 ? current_page -1 : current_page - 2 ,current_page+1).map((number, index) => (
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
          <li className={classNames(
              'list__button',
              { 'list__button--disabled': current_page >= 20 }
            )}
            onClick={() => onNextClick()}
          >
            Next {'>'}
          </li>
        </ul>
      }
    </div>
  )
}
