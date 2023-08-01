import Promotions from '../components/Promotions';
import Products from '../components/Products';
import Filters from '../components/Filters';
import useSearch from '../hooks/useSearch';
import { products } from '../data'
import usePagination from '../hooks/usePagination';
import { useEffect, useState} from 'react';
import useFilter from '../hooks/useFilter';
import useSort from '../hooks/useSort';
import { useLocation, useParams } from 'react-router-dom';

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

  const { name } = useParams();

  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);

  const [priceValues, setPriceValues] = useState([
    searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')) : 0,
    searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')) : 1000
  ]);

  const filterFunctions = [
    [(item) => item.price > priceValues[0], 'minPrice', priceValues[0]],
    [(item) => item.price < priceValues[1], 'maxPrice', priceValues[1]],
  ];

  const [, applyMinPriceFilter] = useFilter(products, filterFunctions);
  const [dataAfterMaxPriceFilter, applyMaxPriceFilter] = useFilter(products, filterFunctions);

  const [searchFunction, dataAfterSearch, inputValue ] = useSearch(dataAfterMaxPriceFilter, 'title');
  const [setSortBy, setSortOrder, dataAfterSort, sortBy, sortOrder] = useSort(dataAfterSearch, 'id');
  const [elementsPerPage, setElementsPerPage] = useState(4);
  const [modifiedData, paginationOptions] = usePagination(dataAfterSort, elementsPerPage);
  
  const [activeLayout, setActiveLayout] = useState('grid');

  const searchHandler = (e) => {
    searchFunction(e.target.value);
  };
  
  return (
    <div className='my-12'>
      <Promotions promotions={promotionsList} />
      <h2 className='section-heading'>{name}</h2>
      <Filters
        searchInputValue={inputValue} onSearch={searchHandler}
        elementsPerPage={elementsPerPage} setElementsPerPage={setElementsPerPage}
        sortBy={sortBy} sortOrder={sortOrder} setSortBy={setSortBy} setSortOrder={setSortOrder}
        priceValues={priceValues} setPriceValues={setPriceValues}
        minPriceFilterFunction={applyMinPriceFilter} maxPriceFilterFunction={applyMaxPriceFilter}
      />
      {
        modifiedData.length > 0 ?
          <Products products={modifiedData} paginationOptions={paginationOptions} activeLayout={activeLayout} />
        :
          <p>Found no products</p>
      }
    </div>
  )
}

export default Category