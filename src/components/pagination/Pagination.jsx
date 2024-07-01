import React from 'react';
import './pagination.css';

const Pagination = ( { page, setPage, total } ) => {

    const handlePrev = (num) => {
        if (page > num) {
            setPage(page - num);
        } else {
            setPage(total);
        };
    };

    const handleNext = (num) => {
        if (page <= total - num) {
            setPage(page + num);
        } else {
            setPage(1);
        };
    };

    const renderPages = () => {
        const maxPagesToShow = 5;
        let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > total) {
            endPage = total;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        };

        const pages = [];

        for (let i = startPage ; i <= endPage ; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className='pagination__btn'
                    style={{ fontWeight: i === page ? 'bold' : 'normal'}}
                >
                    {i}                    
                </button>
            );
        };
        return pages;
    };

  return (
    <>
        {
            total > 1 && (
                <div className="pagination">
                    <div className='pagination__container'>
                        {
                            total > 5 && 
                                <button onClick={() => {handlePrev(5)}} className='pagination__btn-5'>{'<<'}</button>
                        }
                        <button onClick={() => {handlePrev(1)}} className='pagination__btn'>{'<'}</button>
                        { 
                            renderPages()
                        }
                        <button onClick={() => handleNext(1)} className='pagination__btn'>{'>'}</button>
                        {
                            total > 5 && 
                                <button onClick={() => handleNext(5)} className='pagination__btn-5'>{'>>'}</button>
                        }
                    </div>
                    <div className="pagination__count">
                    <span>{page} / {total}</span>
                    </div>
                </div>
            )
        }
    </>
  )
};

export default Pagination;