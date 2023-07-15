import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const usePagination = (data, elementsPerPage, currentPage, maxSiblings, hideArrows, pageChangeFun) => {
  const cp = parseInt(currentPage);
  const ms = maxSiblings ? maxSiblings : data.length;

  const dataLength = data.length;
  const pagesNumber =
    Math.ceil(dataLength / elementsPerPage) === 0
      ? 1
      : Math.ceil(dataLength / elementsPerPage);
  
  const pages = Array.from({length: pagesNumber}, (_, index) => {
    return index + 1
  });

  const modifiedData = data.slice((cp - 1) * elementsPerPage, (cp - 1) * elementsPerPage + elementsPerPage);

  const cpIndex = pages.indexOf(cp);
  const start = cpIndex - ms < 0 ? 0 : cpIndex - ms;
  const end = cpIndex + ms > pages.length ? pages.length : cpIndex + ms;
  const modifiedPages = pages.slice(start, end + 1);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let searchValue = '';

  searchParams.forEach((value, key) => {
    searchValue += `${key}=${value}&`;
  });

  searchValue = searchValue.length !== 0 ? searchValue.slice(0, -1) : '';

  let path = location.pathname.split('/');
  path.pop();
  path = path.join('/') + '/';

  useEffect(() => {
    if (isNaN(currentPage) || !pages.includes(cp)) {
      navigate({
        pathname: path + '1',
        search: searchValue
      });
    }
  })

  const pageChangeFunction = !pageChangeFun ? (page) =>  navigate({pathname: path + page, search: searchValue}) : pageChangeFun;

  const paginationOptions = {
    modifiedPages,
    pagesNumber,
    currentPage: cp,
    hideArrows,
    pageChangeFunction
  };

  return [modifiedData, paginationOptions];
};

export default usePagination;