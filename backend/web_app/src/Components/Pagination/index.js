import React from 'react';
import './style.js';
import {
  PaginationDiV,
  PaginationItem,
  PaginationItemP,
  PaginationItemP2,
} from './style.js';

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <PaginationDiV>
        {pageNumbers.length > 1 &&
          pageNumbers.map(number => {
            return (
              <PaginationItem
                onClick={() => setCurrentPage(number)}
                key={number}
              >
                {/* <PaginationItem key={number}> */}
                {number === currentPage ? (
                  <PaginationItemP>{number}</PaginationItemP>
                ) : (
                  <PaginationItemP2>{number}</PaginationItemP2>
                )}
              </PaginationItem>
            );
          })}
      </PaginationDiV>
    </div>
  );
};

export default Pagination;
