
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

    // Template
    'template/navmenu',
    'template/pageloader',

    // Helpers
    'helpers/crEl',
    'helpers/glob',
    'helpers/glob_arr', // temporary arrays with dummy data for test/demo purposes
    'helpers/utils',

    // Modules
    'modules/guest',
    'modules/ingredient',
    'modules/menu',
    'modules/menuitem',
    'modules/order',
    'modules/reservation',
    'modules/table',
    'modules/invoice_generator',

  ]// requirejs
  ,()=>{

    glob( 'arr', 'pages', [
      //Load these pages
      {
        id : 'dashboard',
        label : 'Dashboard'
      },{
        id : 'reservations',
        label : 'Manage Reservations'
      },{
        id : 'guests',
        label : 'Manage Guests'
      },{
        id : 'menu',
        label : 'Manage Menu Items',
        items : [
          {
            id : 'ingredients',
            label : 'Manage Ingredients'
          }
        ]
      },{
        id : 'tables',
        label : 'Manage Tables'
      },{
        id : 'invoice_generator',
        label : 'Invoices [TEMP]'
      }
    ]); // pages
    globArr();
    navMenu( _glob.arr.pages );
    pageHashLoad();
    window.onhashchange = pageHashLoad;

  });
})();
