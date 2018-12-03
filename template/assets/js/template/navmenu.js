'use strict'
/*
* assets/js/helpers/navmenu.js
*/

function navMenu ( items ){
  let navMenu = document.querySelector( 'nav#primary' ),
  navMenu_ul = document.createElement( 'ul' )

  for( let item of items ){
    let navMenu_li = navItm( item )

    if( item.items ){ // subitems
      let navMenu_ul_sub = document.createElement( 'ul' )
      for( let subitem of item.items ) navMenu_ul_sub.appendChild( navItm( subitem ) )
      navMenu_li.appendChild( navMenu_ul_sub )
    }
    navMenu_ul.appendChild( navMenu_li )
  }
  navMenu.appendChild( navMenu_ul )
}

function navItm( item ){
  let navItm_li = document.createElement( 'li' ),
  navItm_a = document.createElement( 'a' )
  navItm_a.innerHTML = item.label;
  navItm_a.setAttribute( 'id', item.id )
  navItm_a.setAttribute( 'href', `#${item.id}` )
  navItm_li.appendChild( navItm_a )
  return navItm_li
}

function navTab( item ){
  $( 'a.nav-link' ).removeClass('active')
  navTabRemove( item.id )
  $(`nav#primary a[href="${item.href.split('/')[0]}"]`).addClass('active')
  //if( $( `#nav_tab_${item.id} a[href="item.href"]` ).length > 0 ){
  //  navActiveItm( item.hashlocation.slice(1) )
  //}else{

    let nav_tab = document.createElement( 'li' )
    nav_tab.setAttribute( 'class', 'nav-item' )
    nav_tab.setAttribute( 'id', `nav_tab_${item.id}` )
    nav_tab.innerHTML =  `<a href="${item.href}" class="nav-link active"><i class="${item.icon}"></i> ${item.label}</a> `
    let nav_tabs = document.querySelector( 'ul.nav-tabs')
    nav_tabs.appendChild( nav_tab )
  //}
}

function navTabRemove( id ) {
  $( `#nav_tab_${id}` ).remove()
}

function navActiveItm( target ){
  $( 'nav a' ).removeClass( 'active' )
  $( `nav a[href="#${target}"]` ).addClass( 'active' )
}
