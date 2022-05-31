import React, {useState} from "react";
import styles from './Paginator.module.css'
import cn from 'classnames';

const Paginator = (props ) => {
    const {totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10} = props;
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
console.log(props)
console.log(pagesCount)
    let pages = [];
    for(let i=1; i<=pagesCount; i++) {
        pages.push(i)
    }
    console.log(pages)
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 &&
                <button onClick={()=>setPortionNumber(portionNumber-1)}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p)=>(
                    <span
                        className={cn(styles.pageNumber, {[styles.selectedPageNumber]: currentPage===p})}
                        key={p}
                        onClick={()=>onPageChanged(p)}
                    >{p}</span>
                ))
            }
            {portionCount > portionNumber &&
                <button onClick={()=>setPortionNumber(portionNumber+1)}>NEXT</button>}
        </div>
    )
}

export default Paginator;