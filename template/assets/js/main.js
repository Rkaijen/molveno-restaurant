
/*
* assets/js/main.js
*/
(()=>{
  'use strict'
  requirejs([
    'class/Guest',
    'class/Ingredient',
    'class/Menu',
    'class/MenuItem',
    'class/Order',
    'class/Reservation',
    'class/Table',
    '../../data/glob',
    'template/navmenu',
    'template/pageloader',
    'helpers/crEl',
    'helpers/glob',
    'helpers/utils',
    'modules/dashboard',
    'modules/guest',
    'modules/ingredient',
    'modules/menu',
    'modules/menuitem',
    'modules/order',
    'modules/reservation',
    'modules/table',
    'modules/invoices',

  ],()=>{
    setModule([
      {
        label : 'Dashboard',
        primaryNav : true,
        endpoint : 'dashboard',
        action : () => mainDashboard()
      },{
        label : 'Reservations',
        primaryNav : true,
        endpoint : 'reservations',
        action : () => mainReservations()
      },{
        endpoint : 'reservations/overview',
        action : () => overviewReservations()
      },{
        endpoint : 'reservations/add',
        action : () => addReservation()
      },{
        endpoint : 'reservations/view',
        action : () => viewReservation( location.hash.split('/')[2] )
      },{
        endpoint : 'reservations/update',
        action : () => updateReservation( location.hash.split('/')[2] )
      },{
        endpoint : 'reservations/delete',
        action : () => deleteReservation( location.hash.split('/')[2] )
      },{
        label : 'Invoices',
        primaryNav : true,
        endpoint : 'invoices',
        action : () => mainInvoices()
      },{
        label : 'Guests',
        primaryNav : true,
        endpoint : 'guests',
        action : () => mainGuests()
      },{
        endpoint : 'guests/overview',
        action : () => overviewGuests()
      },{
        endpoint : 'guests/add',
        action : () => addGuest()
      },{
        endpoint : 'guests/view',
        action : () => viewGuest( location.hash.split('/')[2] )
      },{
        endpoint : 'guests/update',
        action : () => updateGuest( location.hash.split('/')[2] )
      },{
        endpoint : 'guests/delete',
        action : () => deleteGuest( location.hash.split('/')[2] )
      },{
        label : 'Menu',
        primaryNav : true,
        endpoint : 'menu',
        action : () => mainMenu()
      },{
        label : 'Ingredients',
        primaryNav : true,
        primaryNavParent : 'menu',
        endpoint : 'ingredients',
        action : () => mainIngredients()
      },{
        label : 'Tables',
        primaryNav : true,
        endpoint : 'tables',
        action : () => mainTables()
      },{
        label : 'Invoices',
        primaryNav : true,
        endpoint : 'invoices',
        action : () => mainInvoices()
      }
    ])
  })
})()
