import React from 'react';

import { IoCartOutline } from 'react-icons/io5';
import { BsStarFill } from 'react-icons/bs';
import SingleProduct from '../components/SingleProduct';
import Slider from 'react-slick';
import Button from '../ui/Button';

const Product = () => {
  const images = [
    'https://f.nooncdn.com/p/v1686663857/N41247610A_1.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829013/N41247610A_2.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_3.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_4.jpg?format=avif&width=240',
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    customPaging: function(i) {
      return (
        <a>
          <img src={images[i]} alt="" className='w-16 h-16 object-cover border border-slate-200 rounded-lg cursor-pointer transition duration-500 hover:border-slate-400' />
        </a>
      );
    },
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-14">
        <div className='grow'>
          <div className="mb-12 flex flex-col md:flex-row gap-8">
            <div className='md:w-80 h-full'>
              <Slider {...settings}>
                {
                  images.map((image, index) => 
                      <img key={index} src={image} alt="" className='w-full h-full object-cover border rounded-lg cursor-pointer' />
                  )
                }
              </Slider>
            </div>
            <div>
              <div className='flex flex-row w-36 items-center gap-2 mb-4 px-2 py-1 rounded-md text-sm font-semibold uppercase tracking-wider bg-orange-400'>
                <BsStarFill className='text-xs' />
                <span>best seller</span>
              </div>
              <p className='max-w-2xl text-xl font-semibold tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing</p>
              <div className='mt-4 flex flex-row items-center gap-2'>
                <div className='flex flex-row gap-1 text-xl text-orange-500'>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <span className='text-lg'>645 ratings</span>
              </div>
              <div className='my-5 space-y-1'>
                <p className='text-md line-through'>$799</p>
                <p className="text-2xl font-bold">$599</p>
              </div>
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
          <div>
            <p className='text-2xl mb-8'>Customer reviews</p>
            <div className='mb-6'>
              <div className='flex flex-row items-center gap-2 mb-2'>
                <img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" alt="" className='w-6' />
                <p>Amazon Customer</p>
              </div>
              <div className='mb-3 flex flex-row items-center gap-2'>
                <div className='flex flex-row gap-1 text-orange-500'>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <p>June 22, 2023</p>
              </div>
              <p className='max-w-2xl tracking-wider leading-7'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, fuga quos! Consequuntur blanditiis ea dicta sequi? Qui nemo voluptates ipsum pariatur similique corrupti soluta numquam!</p>
            </div>
            <div>
              <div className='flex flex-row items-center gap-2 mb-2'>
                <img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" alt="" className='w-6' />
                <p>Amazon Customer</p>
              </div>
              <div className='mb-3 flex flex-row items-center gap-2'>
                <div className='flex flex-row gap-1 text-orange-500'>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <p>June 22, 2023</p>
              </div>
              <p className='max-w-2xl tracking-wider leading-7'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, fuga quos! Consequuntur blanditiis ea dicta sequi? Qui nemo voluptates ipsum pariatur similique corrupti soluta numquam!</p>
            </div>
          </div>
        </div>
        <div>
          <p className='text-2xl mb-8'>You may also like</p>
          <div className="flex flex-row lg:flex-col">
          <SingleProduct image='https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg' />
          <SingleProduct image='https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg' />
          <SingleProduct image='https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Product