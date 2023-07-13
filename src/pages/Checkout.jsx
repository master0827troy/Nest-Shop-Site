import React from 'react'

import { FiTrash2 } from 'react-icons/fi'
import { BsStarFill } from 'react-icons/bs';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import Button from '../ui/Button';

const Checkout = () => {
  return (
    <div>
      <div className='flex flex-row justify-between gap-20'>
        <div className='grow'>
          <h2 className='section-heading'>Shopping Cart</h2>
          <div className="flex flex-row gap-5 justify-between mb-10">
            <div className="flex flex-row gap-5 justify-between">
              <img src="https://ethanselzer.github.io/react-image-magnify/static/media/front-1426.f3b00b8c.jpg" alt="" className='w-44 h-44 object-cover border rounded-lg' />
              <div>
                <div className='flex flex-row w-36 items-center gap-2 mb-4 px-2 py-1 rounded-md text-sm font-semibold uppercase tracking-wider bg-yellow-400'>
                  <BsStarFill className='text-xs' />
                  <span>best seller</span>
                </div>
                <p className='mb-3 text-xl tracking-wide text-md'>Lorem ipsum dolor sit amet consectetur</p>
                <div className='flex flex-row gap-1 mb-3 text-md text-yellow-500'>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <div className="group flex flex-row items-center">
                  <span className="inline-block w-2 h-2 bg-slate-900 rounded-full mr-2 group-hover:animate-ping"></span>
                  <span>5 units left in stock</span>
                </div>
              </div>
            </div>
              <div className='text-center'>
                <div className='mb-3 space-y-1'>
                  <p className="text-2xl font-bold">$599</p>
                  <p className='text-lg line-through'>$799</p>
                </div>
                <div className='flex flex-row items-center justify-center gap-2 mb-3'>
                  <button>
                    <GoChevronLeft className='text-lg' />
                  </button>
                  <p className='text-xl font-semibold'>1</p>
                  <button>
                    <GoChevronRight className='text-lg' />
                  </button>
                </div>
                <button className='flex flex-row items-center gap-2 text-slate-900'>
                  <FiTrash2 className='text-lg' />
                  <span className='text-lg font-semibold'>Remove</span>
                </button>
              </div>
          </div>
          <div className="flex flex-row gap-5 justify-between mb-10">
            <div className="flex flex-row gap-5 justify-between">
              <img src="https://ethanselzer.github.io/react-image-magnify/static/media/front-1426.f3b00b8c.jpg" alt="" className='w-44 h-44 object-cover border rounded-lg' />
              <div>
                <div className='flex flex-row w-36 items-center gap-2 mb-4 px-2 py-1 rounded-md text-sm font-semibold uppercase tracking-wider bg-yellow-400'>
                  <BsStarFill className='text-xs' />
                  <span>best seller</span>
                </div>
                <p className='mb-3 text-xl tracking-wide text-md'>Lorem ipsum dolor sit amet consectetur</p>
                <div className='flex flex-row gap-1 mb-3 text-md text-yellow-500'>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <div className="group flex flex-row items-center">
                  <span className="inline-block w-2 h-2 bg-slate-900 rounded-full mr-2 group-hover:animate-ping"></span>
                  <span>5 units left in stock</span>
                </div>
              </div>
            </div>
              <div className='text-center'>
                <div className='mb-3 space-y-1'>
                  <p className="text-2xl font-bold">$599</p>
                  <p className='text-lg line-through'>$799</p>
                </div>
                <div className='flex flex-row items-center justify-center gap-2 mb-3'>
                  <button>
                    <GoChevronLeft className='text-lg' />
                  </button>
                  <p className='text-xl font-semibold'>1</p>
                  <button>
                    <GoChevronRight className='text-lg' />
                  </button>
                </div>
                <button className='flex flex-row items-center gap-2 text-slate-900'>
                  <FiTrash2 className='text-lg' />
                  <span className='text-lg font-semibold'>Remove</span>
                </button>
              </div>
          </div>
          <div className="flex flex-row gap-5 justify-between mb-10">
            <div className="flex flex-row gap-5 justify-between">
              <img src="https://ethanselzer.github.io/react-image-magnify/static/media/front-1426.f3b00b8c.jpg" alt="" className='w-44 h-44 object-cover border rounded-lg' />
              <div>
                <div className='flex flex-row w-36 items-center gap-2 mb-4 px-2 py-1 rounded-md text-sm font-semibold uppercase tracking-wider bg-yellow-400'>
                  <BsStarFill className='text-xs' />
                  <span>best seller</span>
                </div>
                <p className='mb-3 text-xl tracking-wide text-md'>Lorem ipsum dolor sit amet consectetur</p>
                <div className='flex flex-row gap-1 mb-3 text-md text-yellow-500'>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
                <div className="group flex flex-row items-center">
                  <span className="inline-block w-2 h-2 bg-slate-900 rounded-full mr-2 group-hover:animate-ping"></span>
                  <span>5 units left in stock</span>
                </div>
              </div>
            </div>
              <div className='text-center'>
                <div className='mb-3 space-y-1'>
                  <p className="text-2xl font-bold">$599</p>
                  <p className='text-lg line-through'>$799</p>
                </div>
                <div className='flex flex-row items-center justify-center gap-2 mb-3'>
                  <button>
                    <GoChevronLeft className='text-lg' />
                  </button>
                  <p className='text-xl font-semibold'>1</p>
                  <button>
                    <GoChevronRight className='text-lg' />
                  </button>
                </div>
                <button className='flex flex-row items-center gap-2 text-slate-900'>
                  <FiTrash2 className='text-lg' />
                  <span className='text-lg font-semibold'>Remove</span>
                </button>
              </div>
          </div>
        </div>
        <div>
          <div>
            <h2 className='section-heading !mb-3'>Order Details</h2>
            <div className='mb-4 space-y-2 text-xl'>
              <p>Items: 10</p>
              <p>Total: $500</p>
            </div>
            <Button text='Confirm' className='text-lg !w-full' noBg />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout