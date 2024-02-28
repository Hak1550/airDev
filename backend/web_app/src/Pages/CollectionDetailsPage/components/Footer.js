import React from 'react';
import CustomPagination from 'Components/CustomPagination';
import {
  SearchFooterDiv2,
  SearchFooterMain,
} from 'Pages/ArchiveProjectsPage/styles';
import { MainFooter } from '../styles';

const Footer = props => {
  let { itemsCount, itemsPerPage, currentPage, setCurrentPage, changePage } =
    props;

  return (
    <MainFooter>
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
    </MainFooter>
  );
};

export default Footer;
