import React, { useEffect } from "react";
import s from "./Paginator.module.css";


type Props = {
  totalCount:number,
  pageSize:number,
  buttonsCount:number,
  currentPage:number,
  onPageChanged:(page:number)=>void,
}
const Paginator: React.FC<Props> = (props) => {
  let {
    totalCount,
    pageSize,
    buttonsCount,
    currentPage,
    onPageChanged,
  } = props;

  let pageCount = Math.ceil(totalCount / pageSize);
  let pageNumbes:Array<number> = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbes.push(i);
  }
  let begin = 0;
  if (currentPage - Math.floor(buttonsCount / 2) >= pageNumbes[0]) {
    begin = currentPage - Math.floor(buttonsCount / 2) - 1;
  }
  let end = begin + buttonsCount;
  if (end > pageNumbes.length) {
    end = pageNumbes.length;
  }
  let paginatorButtons = pageNumbes.slice(begin, end);
  return (
    <div className={s.wrapper}>
      {currentPage > 1 ? (
        <span
          className={s.pageBarButton}
          onClick={() => {
            onPageChanged(currentPage - 1);
          }}
        >
          &laquo;
        </span>
      ) : null}
      {paginatorButtons.map((el) => (
        <span
          className={
            el === currentPage
              ? `${s.pageBarButton} ${s.selected}`
              : s.pageBarButton
          }
          onClick={() => {
            if (el !== currentPage) {
              onPageChanged(el);
            }
          }}
        >
          {el}
        </span>
      ))}
      {currentPage < pageNumbes.length ? (
        <span
          className={s.pageBarButton}
          onClick={() => {
            onPageChanged(currentPage + 1);
          }}
        >
          &raquo;
        </span>
      ) : null}
    </div>
  );
};
export default Paginator;
