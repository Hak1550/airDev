import React from 'react';
import { SearchFooterDiv2, SearchFooterMain } from '../styles';
import CustomPagination from 'Components/CustomPagination';

const SearchFooter = props => {
  let { itemsCount, itemsPerPage, currentPage, setCurrentPage, changePage } =
    props;

  return (
    <SearchFooterMain style={{ background: '#FFF' }}>
      <SearchFooterDiv2>
        {itemsCount > 0 ? (
          <CustomPagination
            itemsCount={itemsCount}
            itemsPerPage={itemsPerPage}
            changePage={changePage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </SearchFooterDiv2>
    </SearchFooterMain>
  );
};

export default SearchFooter;
