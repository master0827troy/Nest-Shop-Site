import Promotions from '../components/Promotions';
import Products from '../components/Products';
import Filters from '../components/Filters';
import useSearch from '../hooks/useSearch';
import { products } from '../data'
import usePagination from '../hooks/usePagination';
import { useState} from 'react';
import useFilter from '../hooks/useFilter';
import useSort from '../hooks/useSort';
import { useParams } from 'react-router-dom';

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
  
  const [priceValues, setPriceValues] = useState([0, 1000]);
  const {filteredArray: dataAfterPriceFilter, applyFilter: applyPriceFilter} = useFilter(
    products, (array) => array.filter(item => (item['price'] > priceValues[0] && item['price'] < priceValues[1])),
    'price',
    `${priceValues[0]}-${priceValues[1]}`
  );

  const {filteredArray: dataAfterStockFilter, toggleFilter: stockFilterFunction, filterIsActive: stockFilterIsActive}= useFilter(
    dataAfterPriceFilter, (array) => array.filter(item => item['stock'] > 0),
    'stock',
    'true'
    );

  const [searchFunction, dataAfterSearch, inputValue ] = useSearch(dataAfterStockFilter, 'title');
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
        onFilter={stockFilterFunction} filterIsActive={stockFilterIsActive}
        sortBy={sortBy} sortOrder={sortOrder} setSortBy={setSortBy} setSortOrder={setSortOrder}
        priceValues={priceValues} setPriceValues={setPriceValues} priceFilterFunction={applyPriceFilter}
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