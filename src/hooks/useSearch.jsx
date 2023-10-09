import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearch = (originalArray, searchAttr) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredArray, setFilteredArray] = useState(
    !searchParams.get("search")
      ? originalArray
      : originalArray.filter((element) =>
          element[searchAttr]
            .toLowerCase()
            .includes(searchParams.get("search").toLowerCase())
        )
  );

  const deleteSearchParam = useCallback(() => {
    searchParams.delete("search");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const setSearchParam = useCallback(
    (searchValue) => {
      if (searchValue === "") {
        deleteSearchParam();
        setFilteredArray(originalArray);
        return;
      }

      setSearchParams((prevParams) => {
        return new URLSearchParams({
          ...Object.fromEntries(prevParams.entries()),
          search: searchValue,
        });
      });
    },
    [deleteSearchParam, setFilteredArray, originalArray, setSearchParams]
  );

  const filterArray = useCallback(
    (searchValue) => {
      if (searchValue !== null) {
        setSearchParam(searchValue);
        setFilteredArray(
          originalArray.filter((element) =>
            element[searchAttr]
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredArray(originalArray);
      }
    },
    [originalArray, setSearchParam, searchAttr]
  );

  useEffect(() => {
    filterArray(searchParams.get("search"));
  }, [searchParams, filterArray]);

  const inputValue = searchParams.get("search")
    ? searchParams.get("search")
    : "";

  return [filterArray, filteredArray, inputValue];
};

export default useSearch;
