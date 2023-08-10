import { PropTypes } from "prop-types";
import './Pagination.css'

const Pagination = ({ modifiedPages, pagesNumber, currentPage, hideArrows, changeFunction, containerClasses, listClasses, pageClasses }) => {
  if (pagesNumber <= 1) return;

  const prev = <li className={pageClasses} onClick={() => changeFunction(currentPage - 1)}>«</li>;
  const next = <li className={pageClasses} onClick={() => changeFunction(currentPage + 1)}>»</li>;

  const prevDisabled = <li className={`${pageClasses} disabled`}>«</li>;
  const nextDisabled = <li className={`${pageClasses} disabled`}>»</li>;

  const prevPage = hideArrows ? ( currentPage !== 1 && prev ) : ( currentPage !== 1 ? prev : prevDisabled );
  const nextPage = hideArrows ? ( currentPage !== pagesNumber && next ) : ( currentPage !== pagesNumber ? next : nextDisabled )
  console.log(modifiedPages)
  return (
    <div className={containerClasses}>
      <ul className={listClasses}>
        { prevPage }

        {
          modifiedPages.map((page) => (
            <li key={page} className={currentPage === page ? pageClasses + ' active' : pageClasses} onClick={() => changeFunction(page)}>{page}</li>
          ))
        }

        { nextPage }
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  modifiedPages: PropTypes.array,
  pagesNumber: PropTypes.number,
  currentPage: PropTypes.number,
  hideArrows: PropTypes.bool,
  changeFunction: PropTypes.func,
  containerClasses: PropTypes.string,
  listClasses: PropTypes.string,
  pageClasses: PropTypes.string,
}

export default Pagination