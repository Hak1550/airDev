import {
  SearchFooterArrow,
  SearchFooterArrow2,
  SearchFooterBtn,
  SearchFooterBtnP,
  SearchFooterBtnP2,
  SearchFooterDiv1,
  SearchFooterDiv3,
} from 'Pages/ArchiveProjectsPage/styles.js';
import React from 'react';
import { useEffect } from 'react';
import { PaginationDiV, PaginationEllipsis, PaginationItemP } from './style.js';
import arrowLeft from '../../Assets/images/arrowLeft.png';
import arrowRight from '../../Assets/images/arrowRight.png';

const CustomPagination = ({
  itemsCount,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  changePage,
}) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const onPageNumberClick = pageNumber => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage => currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage => currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  };

  let isPageNumberOutOfRange;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <PaginationItemP
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </PaginationItemP>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <PaginationEllipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      <SearchFooterDiv1>
        <SearchFooterBtn
          onClick={onPreviousPageClick}
          disabled={isCurrentPageFirst}
        >
          <SearchFooterArrow src={arrowLeft} />
          <SearchFooterBtnP> Previous</SearchFooterBtnP>
        </SearchFooterBtn>
      </SearchFooterDiv1>
      <PaginationDiV>{pageNumbers}</PaginationDiV>
      <SearchFooterDiv3>
        <SearchFooterBtn onClick={onNextPageClick} disabled={isCurrentPageLast}>
          <SearchFooterBtnP2> Next</SearchFooterBtnP2>
          <SearchFooterArrow2 src={arrowRight} />
        </SearchFooterBtn>
      </SearchFooterDiv3>
    </>
  );
};

export default CustomPagination;
