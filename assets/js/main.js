
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
    'modules/order',
    'modules/reservation',
    'modules/table',
    'modules/invoices',

  ],()=>{
    let modules = [
      {
        label : 'Dashboard',
        primaryNav : true,
        endpoint : 'dashboard',
        action : () => mainDashboard()
      },{
        label : 'Reservations',
        primaryNav : true,
        endpoint : 'reservations',
        action : () => reservation.main()
      },{
        endpoint : 'reservations/overview',
        action : () => reservation.overview()
      },{
        endpoint : 'reservations/add',
        action : () => reservation.add()
      },{
        endpoint : 'reservations/view',
        action : () => reservation.view( location.hash.split('/')[2] )
      },{
        endpoint : 'reservations/update',
        action : () => reservation.update( location.hash.split('/')[2] )
      },{
        endpoint : 'reservations/delete',
        action : () => reservation.delete( location.hash.split('/')[2] )
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
        action : () => menu.main()
      },{
        endpoint : 'menu/add',
        action : () => menu.add()
      },{
        endpoint : 'menu/overview',
        action : () => menu.overview()
      },{
        endpoint : 'menu/view',
        action : () => menu.view()
      },{
        endpoint : 'menu/delete',
        action : () => menu.delete( location.hash.split('/')[2] )
      },{
        label : 'Ingredients',
        primaryNav : true,
        primaryNavParent : 'menu',
        endpoint : 'ingredients',
        action : () => ingredient.main()
      },{
        endpoint : 'ingredients/overview',
        action : () => ingredient.overview()
      },{
        endpoint : 'ingredients/delete',
        action : () => ingredient.delete( location.hash.split('/')[2] )
      },{
        endpoint : 'ingredients/edit',
        action : () => ingredient.edit( location.hash.split('/')[2] )
      },{
        endpoint : 'ingredients/add',
        action : () => ingredient.add()
      },{
        label : 'Tables',
        primaryNav : true,
        endpoint : 'tables',
        action : () => table.main()
      },{
        endpoint : 'tables/add',
        action : () => table.add()
      },{
        endpoint : 'tables/overview',
        action : () => table.overview()
      },{
        endpoint : 'tables/update',
        action : () => table.update( location.hash.split('/')[2] )
      },{
        endpoint : 'tables/delete',
        action : () => table.delete( location.hash.split('/')[2] )
      },{
        label : 'Invoices',
        primaryNav : true,
        endpoint : 'invoices',
        action : () => mainInvoices()
      }
    ]
    setModule( modules)

  })
})()
