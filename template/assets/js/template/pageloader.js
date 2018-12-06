'use strict'
/*
* assets/js/helpers/pageloader.js
*/
function pageLoader( target ){ // event target element
  loadPage(`${target.getAttribute( 'href' ).slice(1)}.html`, target.id )
}

function loadPage( url, id ){
  loadMain( url, () => {
      getModule( id );
  });
}

function loadMain( url, callback ){
  $( 'main' ).hide().load( `pages/${url}`, () => {
    $( 'main' ).fadeIn();
    callback();
  });
}

function setModule( modules ){
  for( let module of modules ) glob( 'module', module.endpoint, () => module.action() )
}

function getModule( endpoint ){
  try{
    endpoint.indexOf( '/' ) > 0 ? _glob.module[ `${endpoint.split( '/' )[0]}/${endpoint.split( '/' )[1]}` ]() : _glob.module[ endpoint ]()
  }catch( error ) {
    console.warn( `${endpoint} : ${error}` )
  }
}

function pageHashLoad() {
  let hashLocation = location.hash,
  pageId = hashLocation.slice(1),
  pageUrl,
  pagePrev = glob( 'var' , 'currentPageId')

  if( pageId !==  '' ){
    navActiveItm( pageId );
    pageUrl = `${pageId.split('/')[0]}.html`;
    if( glob( 'var' , 'currentPageId') ){
      glob( 'var' , 'currentPageId' , pageId);
      if( pagePrev.split('/')[0] === pageId.split('/')[0] ){
        getModule( pageId );
      } else {
        loadPage( pageUrl, pageId );

      }
    } else {
      loadPage( pageUrl, pageId );
      glob( 'var' , 'currentPageId' , pageId);
    }

  } else {
    location.hash = '#dashboard';
  }
}
