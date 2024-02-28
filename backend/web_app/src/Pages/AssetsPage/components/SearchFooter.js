import React, { useState, useEffect } from 'react';
import {
  SearchFooterArrow,
  SearchFooterArrow2,
  SearchFooterBtn,
  SearchFooterBtn2,
  SearchFooterBtnP,
  SearchFooterBtnP2,
  SearchFooterDiv1,
  SearchFooterDiv2,
  SearchFooterDiv3,
  SearchFooterMain,
} from '../styles';
import arrowLeft from '../../../Assets/images/arrowLeft.png';
import arrowRight from '../../../Assets/images/arrowRight.png';
import Pagination from 'Components/Pagination';
import { useDispatch, useSelector } from 'react-redux';

const SearchFooter = ({
  postsPerPage,
  setCurrentPage,
  currentPage,
  prePage,
  nextPg,
  count,
}) => {
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };
  return (
    <SearchFooterMain>
      <SearchFooterDiv1>
        <SearchFooterBtn onClick={prePage}>
          <SearchFooterArrow src={arrowLeft} />
          <SearchFooterBtnP> Previous</SearchFooterBtnP>
        </SearchFooterBtn>
      </SearchFooterDiv1>
      <SearchFooterDiv2>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={count}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </SearchFooterDiv2>
      <SearchFooterDiv3>
        <SearchFooterBtn2 onClick={() => nextPg()}>
          <SearchFooterBtnP2> Next</SearchFooterBtnP2>
          <SearchFooterArrow2 src={arrowRight} />
        </SearchFooterBtn2>
      </SearchFooterDiv3>
    </SearchFooterMain>
  );
};

export default SearchFooter;
