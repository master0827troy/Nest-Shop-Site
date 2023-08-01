import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const useFilter = (array, filterFunctions) => {
  const [filteredArray, setFilteredArray] = useState(array);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let newFilteredArray = array;
    for (const element of filterFunctions) {
      const [filterFunction, urlSearchParam] = element;
      if (searchParams.get(urlSearchParam)) {
        newFilteredArray = newFilteredArray.filter(filterFunction);
      }
    }
    setFilteredArray(newFilteredArray)
  }, []);

  const applyFilter = () => {
    let newFilteredArray = array;
    for (const element of filterFunctions) {
      const [filterFunction, urlSearchParam, urlSearchValue] = element;
      searchParams.set(urlSearchParam, urlSearchValue);
      newFilteredArray = newFilteredArray.filter(filterFunction);
    }
    setFilteredArray(newFilteredArray);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return [filteredArray, applyFilter];
};

export default useFilter;