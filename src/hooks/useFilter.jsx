import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const useFilter = (array, filterFunctions) => {
  const [filteredArray, setFilteredArray] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let newFilteredArray = array ? array : [];
    for (const element of filterFunctions) {
      if (searchParams.get(element.urlSearchParam)) {
        newFilteredArray = newFilteredArray.filter(element.filterFunction);
      } else {
        searchParams.set(element.urlSearchParam, element.urlSearchDefaultValue);
        newFilteredArray = newFilteredArray.filter(element.resetFunction);
      }
    }
    setFilteredArray(newFilteredArray || [])
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, [array])
  
  const applyFilter = () => {
    let newFilteredArray = array;
    for (const element of filterFunctions) {
      searchParams.set(element.urlSearchParam, element.urlSearchValue);
      newFilteredArray = newFilteredArray.filter(element.filterFunction);
    }
    setFilteredArray(newFilteredArray);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const resetFilter = () => {
    let newFilteredArray = array;
    for (const element of filterFunctions) {
      searchParams.set(element.urlSearchParam, element.urlSearchDefaultValue);
      newFilteredArray = newFilteredArray.filter(element.resetFunction);
    }
    setFilteredArray(newFilteredArray);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return [filteredArray, applyFilter, resetFilter];
};

export default useFilter;