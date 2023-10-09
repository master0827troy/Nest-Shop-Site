import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*
 * data [Array][Required] => The original data array that the pagination will manipulate
 * elementsPerPage [Number][Required] => Come on man don't be stupid I have faith in you
 * changeURL [Bool] => Whether the pagination should manipulate the URL or not
 * maxSiblings [Number] => The max number of pages that will be visible on both sides of the active current page
 * hideArrows [Bool] => Whether to hide the prev and next buttons if the current page is the first page or the last page respectively
 * containerClass [String] => Classes to be added to the pagination div container
 * listClass [String] => Classes to be added to the pagination ul
 * pageClass [String] => Classes to be added to the pagination li
 */

const usePagination = (
  data,
  elementsPerPage,
  changeURL,
  maxSiblings,
  hideArrows,
  containerClass,
  listClass,
  pageClass
) => {
  // Adding the classes if they were provided
  const containerClasses = containerClass
    ? "pagination " + containerClass
    : "pagination";
  const listClasses = listClass
    ? "pagination-list " + listClass
    : "pagination-list";
  const pageClasses = pageClass
    ? "pagination-link " + pageClass
    : "pagination-link";

  // Using both useLocation and useNavigate hooks from react router
  const location = useLocation();
  const navigate = useNavigate();

  /*
   * Getting the URL search parameters from the useLocation hook
   * I'm also getting the path here after deleting the URL params (That one that we can get by calling useParams hook)
   * In order to use it later in navigating
   */
  const searchValue = location.search.substring(1);
  let path = location.pathname.split("/");
  path.pop();
  path = path.join("/") + "/";

  const pagesNumber = Math.ceil(data.length / elementsPerPage); // Number of the pages needed in the pagination

  /*
  * If the 'changeURL' parameter was true then 'currentPage' will be set to parameter at the end of the URL
  ! Don't worry about the URL search parameters because 'location.pathname' doesn't even return them anyway
  * And if the 'changeURL' parameter was false then 'currentPage' will be set to 1
  */
  const [currentPage, setCurrentPage] = useState(
    changeURL ? parseInt(location.pathname.split("/").pop()) : 1
  );
  const [pages, setPages] = useState(
    Array.from({ length: pagesNumber }, (_, index) => index + 1)
  ); // The pages state array

  /*
   * If the 'maxSiblings' parameter was provided then 'modifiedPages' will be based on it
   * Otherwise, the 'modifiedPages' will be the same as 'pages'
   */
  const ms = maxSiblings ? maxSiblings : data.length;
  const cpIndex = pages.indexOf(currentPage);
  const start = cpIndex - ms < 0 ? 0 : cpIndex - ms;
  const end = cpIndex + ms > pages.length ? pages.length : cpIndex + ms;
  const modifiedPages = pages.slice(start, end + 1);

  // The new data array that will be returned and should be used in displaying the data instead of the original 'data' variable
  const modifiedData = data.slice(
    (currentPage - 1) * elementsPerPage,
    (currentPage - 1) * elementsPerPage + elementsPerPage
  );

  /*
  * Basically it just changes the currentPage state to the given page parameter
  * if the 'changeURL' parameter was true then it will also redirect the user to the desired page as well
  * While of course keeping the URL search parameters with the same values
  ! Using useCallback here to avoid the infinite loop that could happen if I didn't
  */
  const pageChangeFunction = useCallback(
    (page) => {
      setCurrentPage(page);
      changeURL && navigate({ pathname: path + page, search: searchValue });
    },
    [changeURL, navigate, path, searchValue]
  );

  // This variable should be passed to the Pagination component
  const paginationOptions = {
    modifiedPages,
    pagesNumber,
    currentPage: currentPage,
    hideArrows,
    changeFunction: pageChangeFunction,
    containerClasses,
    listClasses,
    pageClasses,
  };

  /*
  * Makes sure the 'currentPage' is within [0, pagesNumber]
  * If not, then it will redirect the user to page one of the pagination
  ? Uhhh this actually causes a weird animation? (idk how to describe it)
  ? but it can happen if the user was on page 4 and he started searching (The 'data.length' was modified) and the new pagesNumber is less than 4
  ? let me know if you can fix this for me UwU
  */
  useEffect(() => {
    if (
      changeURL &&
      (isNaN(location.pathname.split("/").pop()) ||
        currentPage > pagesNumber ||
        currentPage <= 0)
    ) {
      pageChangeFunction(1);
    }
  }, [
    changeURL,
    currentPage,
    location.pathname,
    pageChangeFunction,
    pagesNumber,
  ]);

  /*
  ! This useEffect will not run during the first render
  * If the 'pagesNumber' changed which means either data.length or elementsPerPage changed (Because of a search or filter)
  * The pages array will be initialized again based on the new value of 'pagesNumber'
  * And it will redirect the user to page one of the pagination
  */
  const firstRender = useRef(false);
  useEffect(() => {
    if (firstRender.current) {
      setPages(Array.from({ length: pagesNumber }, (_, index) => index + 1));
      pageChangeFunction(1);
    } else {
      firstRender.current = true;
    }
  }, [pageChangeFunction, pagesNumber]);

  /*
   * modifiedData => Render this instead of the original data variable
   * paginationOptions => Pass it to the Pagination component In the 'paginationOptions' props
   */
  return [modifiedData, paginationOptions];
};

export default usePagination;
