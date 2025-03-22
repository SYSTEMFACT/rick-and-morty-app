import ResidentCard from './ResidentCard';
import Pagination from './Pagination';
import { usePagination } from '../hooks/usePagination';
import './ResidentsList.css';

function ResidentsList({ residents, loading }) {
  const { currentPage, totalPages, currentItems, prevPage, nextPage, goToPage } = usePagination(residents, 8);

  const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

  return (
    <section className="residents-list-container">
      {residents.length === 0 && !loading ? (
        <h2 className="no-residents">No Residents Found</h2>
      ) : (
        <>
          <div className="residents-grid">
            {loading
              ? skeletonItems.map((index) => (
                  <div key={index} className="resident-card-skeleton">
                    <div className="skeleton-image" />
                    <div className="skeleton-text-line" />
                    <div className="skeleton-text-line short" />
                  </div>
                ))
              : currentItems.map((url) => (
                  <ResidentCard key={url} url={url} />
                ))}
          </div>

          {totalPages > 1 && !loading && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              prev={prevPage}
              next={nextPage}
              goToPage={goToPage}
            />
          )}
        </>
      )}
    </section>
  );
}

export default ResidentsList;

