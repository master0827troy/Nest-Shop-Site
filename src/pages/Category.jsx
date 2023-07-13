import React from 'react'

import Promotions from '../components/Promotions';
import Products from '../components/Products';
import Filters from '../components/Filters';

const Category = () => {
  const promotionsList = [
    {
      id: 1,
      title: '20% Off On Tank Tops',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/women-fashion-free-img.jpg',
      imageClasses: '!bg-right-top'
    },
    {
      id: 2,
      title: 'Latest Eyewear For You',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg',
      imageClasses: '!bg-left-top'
    },
    {
      id: 3,
      title: 'Let\'s Lorem Suit Up!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg',
      imageClasses: '!bg-right-top'
    }
  ];

  return (
    <>
      <Promotions promotions={promotionsList} />
      <h2 className='section-heading'>Clothes</h2>
      <Filters />
      <Products />
    </>
  )
}

export default Category