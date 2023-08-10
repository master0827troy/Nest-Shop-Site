import { useState, useEffect } from "react";

const useSort = (initialArray, attribute, sortType = 'asc') => {
  const [sortBy, setSortBy] = useState(attribute);
  const [sortOrder, setSortOrder] = useState(sortType);
  const [sortedArray, setSortedArray] = useState([]);

  useEffect(() => {
    const newSortedArray = [...initialArray || []].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedArray(newSortedArray);
  }, [sortBy, sortOrder, initialArray]);

  return [setSortBy, setSortOrder, sortedArray, sortBy, sortOrder];
};

export default useSort;