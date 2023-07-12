import React, { useState } from 'react'

import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa6'

import ReactSlider from 'react-slider'

import SearchBar from '../ui/SearchBar';
import SelectBox from '../ui/SelectBox'
import CheckBox from '../ui/CheckBox'
import Button from '../ui/Button'

const Filters = () => {
  const inputNumberClasses = 'w-24 border border-gray-300 rounded-sm text-slate-900 text-center font-semibold tracking-wider transition duration-700 focus:outline-none focus:border-gray-500';

  const orderList = [
    { id: 1, text: 'Popular' },
    { id: 2, text: 'Price' },
    { id: 3, text: 'Rating' }
  ];

  const elementsPerPageList = [
    {id: 1, text: '20'},
    {id: 2, text: '30'},
    {id: 3, text: '40'},
    {id: 4, text: '50'},
    {id: 5, text: '60'}
  ];

  const [activeLayout, setActiveLayout] = useState('grid');
  const [activeOrderBy, setActiveOrderBy] = useState('des');
  const [inStock, setInStock] = useState(false);
  const [orderBy, setOrderBy] = useState(orderList[0]);
  const [elementsPerPage, setElementsPerPage] = useState(elementsPerPageList[0]);

  const minPrice = 0;
  const maxPrice = 1000;
  const [values, setValues] = useState([minPrice, maxPrice]);


  const orderByChangeHandler = (item) => {
    setOrderBy(item);
  };

  const elementsPerPageChangeHandler = (item) => {
    setElementsPerPage(item);
  };

  const priceChangeHandler = (newValues) => {
    setValues(newValues);
  };

  const checkboxToggleHandler = () => {
    setInStock(prevState => !prevState);
  };

  const applyHandler = () => {
    console.log(activeOrderBy, activeLayout, inStock, values)
  };

  const resetHandler = () => {
    setActiveOrderBy('des');
    setActiveLayout('grid');
    setInStock(false);
    setOrderBy(orderList[0]);
    setElementsPerPage(elementsPerPageList[0]);
    setValues([minPrice, maxPrice]);
  };

  return (
    <div className='mb-14'>
      <div className='flex flex-col xl:flex-row md:items-center lg:items-start xl:items-end gap-12 mb-10'>
        <div className="flex flex-col md:flex-row items-center lg:items-end gap-12">
          <SearchBar className='!border-b !border-solid border-black rounded-none' placeholder='Search' />
          <div className="flex flex-row items-end gap-12">
            <div className='flex flex-row gap-5 order-2 lg:order-1'>
              <div className='w-36'>
                <SelectBox list={orderList} selected={orderBy} onSelect={orderByChangeHandler} />
              </div>
              <div className='flex flex-row items-center gap-2 text-xl'>
                {
                  activeOrderBy === 'des' ?
                    <FaArrowAltCircleUp className={'filter-icon' + ' active'} />
                  :
                    <FaArrowAltCircleUp className={'filter-icon'} onClick={() => setActiveOrderBy('des')} />
                }

                {
                  activeOrderBy === 'asc' ?
                    <FaArrowAltCircleDown className={'filter-icon' + ' active'} />
                  :
                    <FaArrowAltCircleDown className={'filter-icon'} onClick={() => setActiveOrderBy('asc')} />
                }
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <CheckBox text='In Stock' isChecked={inStock} onToggle={checkboxToggleHandler} />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center md:justify-start gap-12">
          <div className="flex gap-2 text-xl">
            Show 
            <div className='w-auto'>
              <SelectBox list={elementsPerPageList} selected={elementsPerPage} onSelect={elementsPerPageChangeHandler} />
            </div>
            per page
          </div>

          <div className='flex flex-row gap-2 text-xl'>
            {
              activeLayout === 'grid' ?
                <BsGrid3X3GapFill className={'filter-icon' + ' active'} />
              :
                <BsGrid3X3GapFill className={'filter-icon'} onClick={() => setActiveLayout('grid')} />
            }

            {
              activeLayout === 'list' ?
                <FaListUl className={'text-xl filter-icon' + ' active'} />
              :
                <FaListUl className={'text-xl filter-icon'} onClick={() => setActiveLayout('list')} />
            }
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row items-center gap-12'>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-80">
              <ReactSlider
                className="slider"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                defaultValue={[minPrice, maxPrice]}
                pearling
                min={0}
                max={1000}
                step={1}
                minDistance={100}
                value={values}
                onChange={priceChangeHandler}
              />
            </div>
            <div className="flex flex-row justify-center gap-4">
              <input type="number" min={minPrice} className={inputNumberClasses} value={values[0]} onChange={(e) => changeHandler([+e.target.value, values[1]])} />
              <span className='text-lg select-none'>-</span>
              <input type="number" max={maxPrice} className={inputNumberClasses} value={values[1]} onChange={(e) => changeHandler([values[0], +e.target.value])} />
            </div>
          </div>
          <div className='flex flex-row gap-8'>
            <Button text='Apply' onClick={applyHandler} className='text-white rounded-sm' />
            <Button text='Reset' onClick={resetHandler} className='text-white rounded-sm' />
          </div>
      </div>
    </div>
  )
}

export default Filters