'use strict'

const Module = (function(){

  function add(){
    console.log('this is add')
  }


  return {
    add : add
  }
})()



setModule([
  {endpoint : 'module/add',
    action : Module.add() }
])
