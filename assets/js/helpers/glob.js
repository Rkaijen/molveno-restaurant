'use strict';
/*
* assets/js/helpers/glob.js
*/
(() => {
  try{
    global['_glob'] = {};
  }catch( error ){
    window['_glob'] = {}
  }
})();

class Glob {
  constructor() {
    this.var = {};
    this.arr = {};
    this.func = {};
    this.obj = {};
    this.module = {};
    this.pages = {};
    return this
  }
}

function glob( element, key, val ){
  let glob =  _glob[ element ] ? _glob[ element ] : new Glob()[ element ]
  if( key) {
    if( val) {
      glob[ key ] = val;
      if( isArray( glob ) ) glob = new Set( glob )
      _glob[ element ] = glob;
    } else{
      try{
        return _glob[ element ][ key ];
      }catch( error ){
        //console.warn( error )
      }
    }
  }
  return _glob[ element ]
}
