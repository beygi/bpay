import {Pagination} from "antd";
import * as React from "react";

const getPageNumber = (link): number => {
    const num = link.split("?")[1].split("&").filter((p) => p.indexOf("page[number]=") === 0)[0].split("=")[1];
    return parseInt(num, 10);
};

const getPageSize = (link): number => {
    const num = link.split("?")[1].split("&").filter((p) => p.indexOf("page[size]=") === 0)[0].split("=")[1];
    return parseInt(num, 10);
};

const paginationElement = (link) => {
    const firstPage = getPageNumber(link.first);
    const lastPage = getPageNumber(link.last);
    const currentPage = getPageNumber(link.self);
    const pageSize = getPageSize(link.self);
    const paginationObj = {
        pageSize,
        current: currentPage,
        total: pageSize * lastPage,
    };
    console.log(paginationObj);
    return paginationObj;
};

export default paginationElement;
