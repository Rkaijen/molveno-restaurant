
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
        id : 'invoices',
        label : 'Invoices'
      }
    ])
    glob( 'obj', 'endpoint', {
      page : location.hash.slice(1).split('/')[0],
      action : location.hash.slice(1).split('/')[1],
      id : location.hash.slice(1).split('/')[2]
    })
    // replacement for current glob() module registration in module scripts
    // (which can cause ReferenceError, see https://github.com/Spectrum-McRaj/Restaurant-Hans/issues/14)

    /*setModule([ // TODO ccolombijn :

    // glob module is registered, but returns 'is not a module'
      {
        endpoint : 'reservations',
        label : 'Reservations',
        primaryNav : true,
        action : () => overviewReservations()
      },{
        endpoint : 'reservations/add',
        action : () => addReservation()
      },{
        endpoint : 'reservations/update',
        action : () => updateReservation( _glob.obj.endpoint.id )
      }
    ])*/
    console.log( _glob )
    navMenu( _glob.arr.pages )
    pageHashLoad()
    window.onhashchange = pageHashLoad
  });
})();
