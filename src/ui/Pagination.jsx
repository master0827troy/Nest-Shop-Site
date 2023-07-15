import './Pagination.css'

const Pagination = ({ modifiedPages, pagesNumber, currentPage, hideArrows, pageChangeFunction }) => {
  if (pagesNumber === 1) return;

  return (
    <div className='pagination'>
      <ul className='pagination-list'>
        {
          !hideArrows ?
            (
              currentPage !== 1 &&
              <li className='pagination-link' onClick={() => pageChangeFunction(currentPage - 1)}>«</li>
            )
          :
            (
              currentPage !== 1 ?
                <li className='pagination-link' onClick={() => pageChangeFunction(currentPage - 1)}>«</li>
              :
                <li className='pagination-link disabled'>«</li>
            )
        }

        {
          modifiedPages.map((page) => (
            <li key={page} className={currentPage === page ? 'pagination-link active' : 'pagination-link'} onClick={() => pageChangeFunction(page)}>{page}</li>
          ))
        }

        {
          !hideArrows ?
            (
              currentPage !== pagesNumber &&
              <li className='pagination-link' onClick={() => pageChangeFunction(currentPage + 1)}>»</li>
            )
          :
            (
              currentPage !== pagesNumber ?
                <li className='pagination-link' onClick={() => pageChangeFunction(currentPage + 1)}>»</li>
              :
                <li className='pagination-link disabled'>»</li>
            )
        }
      </ul>
    </div>
  )
}

export default Pagination