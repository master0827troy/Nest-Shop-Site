import { useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Promotions from '../components/Promotions';
import Filters from '../components/Filters';
import Products from '../components/Products/CategoryProducts';
import useFilter from '../hooks/useFilter';
import useSearch from '../hooks/useSearch';
import useSort from '../hooks/useSort';
import usePagination from '../hooks/usePagination';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import Loading from '../ui/Loading';

const Category = () => {
  const promotionsList = [
    {
      id: 1,
      title: '20% Off On Tank Tops',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/women-fashion-free-img.jpg',
      imageClasses: '!bg-right-top',
      path: '/category/BTc1YJEY2Oxhqorp3ivd'
    },
    {
      id: 2,
      title: 'Latest Eyewear For You',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg',
      imageClasses: '!bg-left-top',
      path: '/category/D1iuGHpJSQaKh7o7Lski'
    },
    {
      id: 3,
      title: 'Let\'s Lorem Suit Up!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.',
      image: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg',
      imageClasses: '!bg-right-top',
      path: '/category/jb0ljpG0Ntfo2CpCqQZa'
    }
  ];

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const {
    data: categoryData,
    isLoading: categoryDataLoading,
    error: categoryDataError
  } = useGetFirestoreData('categories', id);

  const {
    data: categoryProducts,
    isLoading: categoryProductsLoading,
    error: categoryProductsError
  } = useGetFirestoreData('products' , null, {lhs: 'categoryId', op: '==', rhs: id});
  
  const defaultPriceValues = [0, 1000]
  const [priceValues, setPriceValues] = useState([
    searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')) : defaultPriceValues[0],
    searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')) : defaultPriceValues[1]
  ]);

  const defaultStockValue = 0;
  const [stockValue, setStockValue] = useState(
    searchParams.get('stock') && searchParams.get('stock') === 'available' ? 1 : defaultStockValue
  );

  const filterFunctions = [
    {
      filterFunction: (item) => item.price >= priceValues[0],
      resetFunction: (item) => item.price >= defaultPriceValues[0],
      urlSearchParam: 'minPrice',
      urlSearchDefaultValue: defaultPriceValues[0],
      urlSearchValue: priceValues[0]
    },
    {
      filterFunction: (item) => item.price <= priceValues[1],
      resetFunction: (item) => item.price <= defaultPriceValues[1],
      urlSearchParam: 'maxPrice',
      urlSearchDefaultValue: defaultPriceValues[1],
      urlSearchValue: priceValues[1]
    },
    {
      filterFunction: (item) => item.stock >= stockValue,
      resetFunction: (item) => item.stock >= defaultStockValue,
      urlSearchParam: 'stock',
      urlSearchDefaultValue: 'all',
      urlSearchValue: stockValue === defaultStockValue ? 'all' : 'available'
    },
  ]
  
  const [products, setProducts] = useState(categoryProducts || [])
  const [dataAfterFilters, applyFilters, resetFilters] = useFilter(products, filterFunctions);
  const [searchFunction, dataAfterSearch, inputValue ] = useSearch(dataAfterFilters, 'title');
  const [setSortBy, setSortOrder, dataAfterSort, sortBy, sortOrder] = useSort(dataAfterSearch, 'id');
  const [elementsPerPage, setElementsPerPage] = useState(4);
  const [modifiedData, paginationOptions] = usePagination(dataAfterSort, elementsPerPage);
  
  const resetFunction = () => {
    setPriceValues(defaultPriceValues);
    setStockValue(defaultStockValue);
    resetFilters();
  };

  const [activeLayout, setActiveLayout] = useState('grid');

  const searchHandler = (e) => {
    searchFunction(e.target.value);
  };

  useEffect(() => {
    setProducts(categoryProducts)
  }, [categoryProducts])  

  useEffect(() => {
    if (categoryDataError || categoryProductsError) {
      navigate('/')
    }
  }, [categoryDataError, categoryProductsError, navigate])

  if (categoryDataLoading) return <Loading />;

  return (
    <div className='my-12'>
      <Promotions promotions={promotionsList} />
      <h2 className='section-heading'>{categoryData?.title}</h2>
      <Filters
        priceValues={priceValues} setPriceValues={setPriceValues} stockValue={stockValue} setStockValue={setStockValue}
        filterFunction={applyFilters} resetFunction={resetFunction}
        searchInputValue={inputValue} onSearch={searchHandler}
        sortBy={sortBy} sortOrder={sortOrder} setSortBy={setSortBy} setSortOrder={setSortOrder}
        elementsPerPage={elementsPerPage} setElementsPerPage={setElementsPerPage}
      />
      {
        categoryProductsLoading ?
          <Loading />
        :
        modifiedData.length > 0 ?
          <Products products={modifiedData} paginationOptions={paginationOptions} activeLayout={activeLayout} />
        :
          <p>Found no products</p>
      }
    </div>
  )
}

export default Category