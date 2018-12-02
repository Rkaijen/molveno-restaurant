
/*
* assets/js/main.js
*/
(()=>{
  'use strict'
  requirejs([
    // Classes

    'class/Guest',
    'class/Ingredient',
    'class/Menu',
    'class/MenuItem',
    'class/Order',
    'class/Reservation',
    'class/Table',

    // Data
    '../../data/glob', // global data

    // Template
    'template/navmenu',
    'template/pageloader',

    // Helpers
    'helpers/crEl',
    'helpers/glob',
    'helpers/utils',

    // Modules
    'modules/dashboard',
    'modules/guest',
    'modules/ingredient',
    'modules/menu',
    'modules/menuitem',
    'modules/order',
    'modules/reservation',
    'modules/table',
    'modules/invoices',

  ]// requirejs
  ,()=>{


    globArr();
    
    console.log( _glob )
    navMenu( _glob.arr.pages );
    pageHashLoad();
    window.onhashchange = pageHashLoad;

  });
})();
