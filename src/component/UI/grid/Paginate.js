import React, { useState, useEffect } from 'react';
import { PAGE_SIZE_ARRAY } from '../../../core/constants'

const Paginate = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
  totalRecords
}) => {
  const [currentPage, setCurrentPage] = useState(pageIndex + 1);
  const empty = () => { };

  useEffect(() => {
    if (currentPage) {
      setCurrentPage(pageIndex + 1);
    }
  }, [pageIndex, pageSize]
  );

  function isPageNumberInvalid (enteredPageNumber) {
    return enteredPageNumber > pageCount ||
      (enteredPageNumber !== '' &&
        enteredPageNumber.match('^[1-9]$') === null);
  }

  const currentPageChangeHandler = e => {
    const enteredPageNumber = e.target.value;
    if (isPageNumberInvalid(enteredPageNumber)) {
      return;
    }
    props.setCurrentPage(enteredPageNumber);
  };

  const currentPageBlurHandler = () => {
    if (!currentPage) {
      props.setCurrentPage(pageIndex + 1);
    }
  };

  const setPageSubmitHandler = (e) => {
    e.preventDefault();
    if (!currentPage) {
      return;
    }
    const page = Number(currentPage) - 1;
    props.gotoPage(page);
  };
  const changePageSize = (size) =>{
    setPageSize(size)
  }
  return (
    <div className='paginate clearfix'>
      <div className='total-results'>
        <b id='total-count'>{totalRecords}</b>
        {/* <span>{` ${global.t('sensorlink_dashboards.study_list_paginate_totalResults')}`}</span> */}
      </div>
      {totalRecords > 5 &&
        <div className='per-page'>
          <span>per page</span>
          <select
            className='form-control'
            value={pageSize}
            onChange={e => {
              changePageSize(Number(e.target.value));
            }}
          >
            {PAGE_SIZE_ARRAY.map(pageSize => (
              <option key={pageSize} value={pageSize}>{pageSize}</option>
            ))}
          </select>
        </div>}
      {pageCount > 1 &&
        <ul className='controls'>
          <li className='validation_error' />
          <li>
            <a className={`first ${!canPreviousPage && 'disabled'}`} onClick={canPreviousPage ? () => gotoPage(0) : empty}>
              <i className='fa fa-angle-double-left' />
            </a>
          </li>
          <li>
            <a className={`previous ${!canPreviousPage ? 'disabled' : ''}`} onClick={canPreviousPage ? previousPage : empty}>
              <i className='fa fa-angle-left' />
            </a>
          </li>
          <li className='counter'>
            <form id='page-form' onSubmit={setPageSubmitHandler}>
              <input
                id='current-page'
                name='current-page'
                value={currentPage}
                onChange={currentPageChangeHandler}
                onBlur={currentPageBlurHandler}
              />
              <span className='total-pages'>
                {` ${pageOptions.length}`}
              </span>
            </form>
          </li>
          <li>
            <a onClick={canNextPage ? nextPage : empty} className={`next ${!canNextPage ? 'disabled' : ''}`}>
              <i className='fa fa-angle-right' />
            </a>
          </li>
          <li>
            <a onClick={canNextPage ? () => gotoPage(pageCount - 1) : empty} className={`last ${!canNextPage ? 'disabled' : ''}`}>
              <i className='fa fa-angle-double-right' />
            </a>
          </li>
        </ul>}
    </div>
  );
};

export default Paginate;
