import { FC } from 'react';
import './Filter.scss';

export const Filter: FC = () => {
  return (
    <div className='filter'>
      <div className='filter__search'>
        <label className='filter__label' htmlFor="">Name</label>
        <input
          className='filter__input'
          type="text"
          placeholder='Search by name'
          onChange={() => {}}
        />
      </div>

      <div className="filter__date">
        <label className='filter__label' htmlFor="">Date</label>
        <div className='filter__date--container'>
          <input
            className='filter__input'
            type="text"
            placeholder='Date from'
            onChange={() => {}}
          />

          <input
            className='filter__input'
            type="text"
            placeholder='Date to'
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="filter__date">
        <label className='filter__label' htmlFor="">Price</label>
        <div className='filter__date--container'>
          <input
            className='filter__input'
            type="text"
            placeholder='Price from'
            onChange={() => {}}
          />

          <input
            className='filter__input'
            type="text"
            placeholder='Price to'
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
