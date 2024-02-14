import { FC } from 'react';
import './Card.scss';

interface CardProps {
  image?: string;
  title: string;
  price: string;
}

export const Card: FC<CardProps> = ({ image, title, price }) => {
  return (
    <div className='card'>
      <img className='card__image' src={image} alt="Product" />
      <h1 className='card__title'>{title}</h1>
      <h2 className='card__price'>{price}</h2>
    </div>
  )
}
