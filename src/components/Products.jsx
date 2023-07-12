import React from 'react'
import SingleProduct from './SingleProduct'

const Products = () => {
  const products = [
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe3-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-m-jeans1-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans2-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag1-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag3-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-hoodie1-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/tshirt2-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-hoodie3-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-m-jeans2-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-hoodie4.jpg-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe2-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory3-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-accessory2-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-w-jeans3-300x300.jpg'
    },
    {
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag4-300x300.jpg'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {
        products.map((product, index) => 
          <SingleProduct key={index} image={product.image} />  
        )
      }
    </div>
  )
}

export default Products