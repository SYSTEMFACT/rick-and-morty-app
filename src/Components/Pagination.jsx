import './Pagination.css';

function Pagination({ page, totalPages, prev, next, goToPage }) {
  const maxPagesToShow = 5;
  const pageNumbers = [];

  let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={prev}
        disabled={page === 1}
      >
        ⬅ Prev
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination__button pagination__number ${page === number ? 'active' : ''}`}
          onClick={() => goToPage(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="pagination__button"
        onClick={next}
        disabled={page === totalPages}
      >
        Next ➡
      </button>
    </div>
  );
}

export default Pagination;