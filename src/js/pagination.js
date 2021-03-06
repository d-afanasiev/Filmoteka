import Pagination from 'tui-pagination';

export const container = document.getElementById('tui-pagination-container');
export const itemsPerPage = 20;
export const setContainerHidden = arg => {
  container.hidden = arg;
};

const optionsForPagination = {
  // Total number of items
  totalItems: 0,

  // Items per page
  itemsPerPage: itemsPerPage,

  // Visible pages
  visiblePages: 5,

  // Current page
  page: 1,

  // center aligned
  centerAlign: false,

  // default classes
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',

  // enable usage statistics
  usageStatistics: false,
};
export const opt = optionsForPagination;

export let myPagination;

export function pagination() {
  myPagination = new Pagination(container, opt);
  return myPagination;
}

