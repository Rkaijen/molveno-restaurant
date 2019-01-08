'use strict'
/*
* assets/js/helpers/pageloader.js
*/

function loadPage( page, endpoint ){
  loadMain( page, () => getModule( endpoint ) )
}

function loadMain( page, callback ){
  $( 'main' ).hide().load( page, () => {
    $( 'main' ).fadeIn()
    callback()
  })
}

function setModule( modules ){
  globArr()
  for( let module of modules ) glob( 'module', module.endpoint, () => module.action() )
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
  navMenu( _glob.arr.pages )
  console.log( _glob )
  pageModule()
}

function getModule( endpoint ){
  //try{
    endpoint.indexOf( '/' ) > 0 ? _glob.module[ `${endpoint.split( '/' )[0]}/${endpoint.split( '/' )[1]}` ]() : _glob.module[ endpoint ]()
  /*}catch( error ) {
    console.warn( `${endpoint} : ${error}` )
  }*/
}

function pageModule() {
  let endpoint = location.hash.slice(1),
  page, prev = glob( 'var' , 'current' )

  if( endpoint !==  '' ){
    navActiveItm( endpoint )
    page = `pages/${endpoint.split('/')[0]}.html`;
    if( prev ){
      glob( 'var' , 'current' , endpoint )
      if( prev.split('/')[0] === endpoint.split('/')[0] ){
        getModule( endpoint )
      } else {
        loadPage( page, endpoint )
      }
    } else {
      loadPage( page, endpoint )
      glob( 'var' , 'current' , endpoint )
    }

  } else {
    location.hash = '#dashboard';
  }
  window.onhashchange = pageModule
}
