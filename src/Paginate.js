import React from "react";

const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="">
      <ul className="pagination justify-content-center m-2">
        <li onClick={previousPage} className="page-item">
          <a className="page-link" href="#">
            Prev
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={
              currentPage === number ? "page-itemk active" : "page-item"
            }
          >
            <a className="page-link" href="#">
              {number}
            </a>
          </li>
        ))}
        <li onClick={nextPage} className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
