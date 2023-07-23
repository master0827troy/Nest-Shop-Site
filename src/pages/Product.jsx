import { useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import SingleProduct from '../components/SingleProduct';
import Slider from 'react-slick';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import CustomerReviews from '../components/CustomerReviews';
import Rating from '../components/Rating';
import { customerReviews } from '../data';
import { products } from '../data'
import Price from '../components/Price';

const Product = () => {
  const images = [
    'https://f.nooncdn.com/p/v1686663857/N41247610A_1.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829013/N41247610A_2.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_3.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_4.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_5.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_7.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_8.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_9.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_10.jpg?format=avif&width=240'
  ];

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const firstSliderSettings = {
    infinite: true,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    asNavFor: nav2
  };

  const secondSliderSettings = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: nav1
  };

  console.log(products)
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-14">
        <div className='grow'>
          <div className="mb-12 flex flex-col md:flex-row gap-8">
            <div className='md:w-80 h-full space-y-4'>
              <Slider {...firstSliderSettings} ref={(slider1) => setNav1(slider1)}>
                {
                  images.map((image, index) => 
                    <img key={index} src={image} alt='' className='w-full h-full object-cover border rounded-lg cursor-pointer' />
                  )
                }
              </Slider>
              <Slider {...secondSliderSettings} ref={(slider2) => setNav2(slider2)} >
                {
                  images.map((image, index) =>
                    <div key={index}>
                        <img src={image} alt='' className='w-16 h-16 object-cover border border-slate-200 rounded-lg cursor-pointer transition duration-500 hover:border-slate-400' />
                    </div>
                  )
                }
              </Slider>
            </div>
            <div>
              <Badge type='best' />
              <p className='max-w-2xl mb-4 text-xl font-semibold tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing</p>
              <Rating max={5} rating={1.1}>
                <span className='text-sm'>(645)</span>
              </Rating>
              <Price className='my-5' newPrice={399} oldPrice={599} fontSizes={['text-2xl', 'text-lg']} />
              <div className="group mb-4 flex flex-row items-center">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-0.5 mr-2 group-hover:animate-ping"></span>
                <span>5 units left in stock</span>
              </div>
              <p className='max-w-lg mb-6 text-md tracking-wide leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptatem non rerum beatae ab? Voluptatibus expedita harum voluptates earum nesciunt aliquid accusantium et accusamus laborum.</p>
              <Button text='Add to cart' className='text-lg' noBg>
                <IoCartOutline className='text-2xl' />
              </Button>
            </div>
          </div>
          <CustomerReviews customerReviews={customerReviews} />
        </div>
        <div>
          <p className='text-2xl mb-8'>You may also like</p>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-8">
          <SingleProduct product={products[0]} />
          <SingleProduct product={products[0]} />
          <SingleProduct product={products[0]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Product