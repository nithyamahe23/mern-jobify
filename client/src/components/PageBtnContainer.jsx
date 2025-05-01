import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';


const PageBtnContainer = () => {
    const {data : {numOfPages, currentPage}} = useAllJobsContext();

    const pages = Array.from({length : numOfPages}, (_ , index) => {
        return index+1;
    });

    const {search, pathname} = useLocation();
    const navigate = useNavigate();
    console.log(search, pathname);
    
    //method to handle page change
    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);   //create a new URL
        searchParams.set('page', pageNumber);   //set the query param page
        navigate(`${pathname}?${searchParams.toString()}`);    //navigate back to same page with page as query param . similar to search
        console.log(pageNumber);
    }

  return (
    <Wrapper>
        <button className='btn prev-btn'
                onClick={() => {
                    let prevPage = currentPage - 1;
                    //if the current page is 1 , there is a possibility for it to be 0
                    if(prevPage < 1){
                        prevPage = numOfPages;  //set prev page to numnOfPages
                    }
                    handlePageChange(prevPage);
                }}  >
            <HiChevronDoubleLeft />
            prev
        </button>
        <div className="btn-container">
            {/* Display the pages buuton */}
            {pages.map((pageNumber) => {
                    return (
                        <button className={`btn page-btn 
                            ${pageNumber === currentPage && 'active'}`} 
                        key={pageNumber} onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                })
            }
        <button className='btn next-btn'
                onClick={() => {
                    let nextPage = currentPage + 1;
                    if(nextPage > numOfPages){
                        nextPage = 1;
                    }
                    handlePageChange(nextPage);
                }}>
            <HiChevronDoubleRight />
            next
        </button>
        </div>
    </Wrapper>
  )
}

export default PageBtnContainer
