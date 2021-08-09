'use strict';

import  Pagination  from 'tui-pagination';

const container = document.getElementById('tui-pagination-container');
const options = {

      // Total number of items
      totalItems: 1000,

      // Items per page
      itemsPerPage: 20,

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
      usageStatistics: true
      
}

const myPagination = new Pagination(container, options);


// console.log(myPagination.init.prototype.fire);

export default {}