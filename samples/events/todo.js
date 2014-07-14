/** @constructor */
var i$VM = function() {
  this.valstack = [];
  this.valstack_top = 0;
  this.valstack_base = 0;

  this.ret = null;

  this.callstack = [];
}

var i$vm;
var i$valstack;
var i$valstack_top;
var i$valstack_base;
var i$ret;
var i$callstack;

/** @constructor */
var i$CON = function(tag,args,app,ev) {
  this.tag = tag;
  this.args = args;
  this.app = app;
  this.ev = ev;
}

var i$SCHED = function(vm) {
  i$vm = vm;
  i$valstack = vm.valstack;
  i$valstack_top = vm.valstack_top;
  i$valstack_base = vm.valstack_base;
  i$ret = vm.ret;
  i$callstack = vm.callstack;
}

var i$SLIDE = function(args) {
  for (var i = 0; i < args; ++i)
    i$valstack[i$valstack_base + i] = i$valstack[i$valstack_top + i];
}

var i$PROJECT = function(val,loc,arity) {
  for (var i = 0; i < arity; ++i)
    i$valstack[i$valstack_base + i + loc] = val.args[i];
}

var i$CALL = function(fun,args) {
  i$callstack.push(args);
  i$callstack.push(fun);
}

var i$ffiWrap = function(fid,oldbase,myoldbase) {
  return function() {
    i$callstack = [];

    var res = fid;

    for(var i = 0; i < arguments.length; ++i) {
      while (res instanceof i$CON) {
        i$valstack_top += 1;
        i$valstack[i$valstack_top] = res;
        i$valstack[i$valstack_top + 1] = arguments[i];
        i$SLIDE(2);
        i$valstack_top = i$valstack_base + 2;
        i$CALL(_idris__123_APPLY0_125_,[oldbase])
        while (i$callstack.length) {
          var func = i$callstack.pop();
          var args = i$callstack.pop();
          func.apply(this,args);
        }
        res = i$ret;
      }
    }

    i$callstack = i$vm.callstack;

    return i$ret;
  }
}

var i$charCode = function(str) {
  if (typeof str == "string")
    return str.charCodeAt(0);
  else
    return str;
}

var i$fromCharCode = function(chr) {
  if (typeof chr == "string")
    return chr;
  else
    return String.fromCharCode(chr);
}
var i$putStr = function(s) {
  console.log(s);
};


var i$systemInfo = function(index) {
  switch(index) {
    case 0:
      return "javascript";
    case 1:
      return navigator.platform;
  }
  return "";
}
var _idris_Prelude_46_Monad_46__62__62__61_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 4] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Prelude_46_Monad_46__62__62__61_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Prelude_46_Monad_46__62__62__61_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Force$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$ret = i$valstack[i$valstack_base + 3];
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46_appendChild = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 5] = i$CON$0;
  i$valstack[i$valstack_base + 6] = new i$CON(3,[i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 4]],null,null);
  i$ret = new i$CON(3,[i$valstack[i$valstack_base + 5],i$valstack[i$valstack_base + 6]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46_Priv_46_appendChild = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base + 2].appendChild(i$valstack[i$valstack_base + 3]);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Control_46_Catchable_46_catch = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Prelude_46_Classes_46_compare = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base + 1];
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46_createElement = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 1] = null;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = new i$CON(65680,[i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65680,null);
  i$valstack[i$valstack_base + 4] = i$CON$65681;
  i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65720,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_dropEnv$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 9] = i$ret;
  i$ret = new i$CON(1,[i$valstack[i$valstack_base + 6],i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 9]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_dropEnv = function(oldbase){
  var myoldbase;
  i$valstack_top += 7;
  switch(i$valstack[i$valstack_base + 4].tag){
    case 2:
      i$valstack[i$valstack_base + 5] = i$valstack[i$valstack_base + 4].args[0];
      i$PROJECT(i$valstack[i$valstack_base + 3],6,3);
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      ;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 9];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 10];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 8];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 5];
      i$SLIDE(5);
      i$valstack_top = i$valstack_base + 5;
      i$CALL(_idris_Effects_46_dropEnv,[oldbase]);
      break;
    case 1:
      i$valstack[i$valstack_base + 5] = i$valstack[i$valstack_base + 4].args[0];
      i$PROJECT(i$valstack[i$valstack_base + 3],6,3);
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      ;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 9];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 10];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 8];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 5];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 5;
      i$CALL(_idris_Effects_46_dropEnv$0,[oldbase,myoldbase]);
      i$CALL(_idris_Effects_46_dropEnv,[myoldbase]);
      break;
    case 0:
      i$ret = i$CON$0;
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
  };
}
var _idris_Effects_46_eff$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 14] = i$ret;
  i$valstack[i$valstack_base + 15] = new i$CON(65658,[i$valstack[i$valstack_base + 7]],_idris__123_APPLY0_125_$65658,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 10];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 11];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 12];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 13];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 14];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 8];
  i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 15];
  i$SLIDE(8);
  i$valstack_top = i$valstack_base + 8;
  i$CALL(_idris_Effects_46_eff,[oldbase]);
}
var _idris_Effects_46_eff$2 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 9] = i$ret;
  i$valstack[i$valstack_base + 10] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 10];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46_eff$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 9] = i$ret;
  i$valstack[i$valstack_base + 10] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 10];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46_eff$2,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46_eff$3 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 15] = i$ret;
  i$valstack[i$valstack_base + 16] = new i$CON(65662,[i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 5]],_idris__123_APPLY0_125_$65662,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 10];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 11];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 12];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 13];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 14];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 15];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 16];
  i$SLIDE(8);
  i$valstack_top = i$valstack_base + 8;
  i$CALL(_idris_Effects_46_eff,[oldbase]);
}
var _idris_Effects_46_eff$4 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 9] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 5];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46_eff = function(oldbase){
  var myoldbase;
  i$valstack_top += 10;
  switch(i$valstack[i$valstack_base + 6].tag){
    case 7:
      i$valstack[i$valstack_base + 8] = i$valstack[i$valstack_base + 6].args[0];
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_base + 14] = null;
      i$valstack[i$valstack_base + 15] = null;
      i$valstack[i$valstack_base + 16] = null;
      i$valstack[i$valstack_base + 17] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 14];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 15];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 16];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 17];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 5];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 5;
      i$CALL(_idris_Effects_46_eff$0,[oldbase,myoldbase]);
      i$CALL(_idris_Effects_46_unlabel,[myoldbase]);
      break;
    case 3:
      i$PROJECT(i$valstack[i$valstack_base + 6],8,2);
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_base + 14] = null;
      i$valstack[i$valstack_base + 15] = null;
      i$valstack[i$valstack_base + 16] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 10];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 12];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 13];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 14];
      i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 15];
      i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 16];
      i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 5];
      i$valstack[i$valstack_top + 8] = i$valstack[i$valstack_base + 8];
      i$valstack[i$valstack_top + 9] = i$valstack[i$valstack_base + 9];
      i$valstack[i$valstack_top + 10] = i$valstack[i$valstack_base + 7];
      i$SLIDE(11);
      i$valstack_top = i$valstack_base + 11;
      i$CALL(_idris_Effects_46_execEff,[oldbase]);
      break;
    case 6:
      i$valstack[i$valstack_base + 8] = i$valstack[i$valstack_base + 6].args[0];
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 9];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 10];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 8];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 4;
      i$CALL(_idris_Effects_46_eff$1,[oldbase,myoldbase]);
      i$CALL(_idris_Control_46_Catchable_46_catch,[myoldbase]);
      break;
    case 2:
      i$PROJECT(i$valstack[i$valstack_base + 6],8,2);
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_base + 14] = null;
      i$valstack[i$valstack_base + 15] = new i$CON(65660,[i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 7]],_idris__123_APPLY0_125_$65660,null);
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 10];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 12];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 13];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 14];
      i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 5];
      i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 8];
      i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 15];
      i$SLIDE(8);
      i$valstack_top = i$valstack_base + 8;
      i$CALL(_idris_Effects_46_eff,[oldbase]);
      break;
    case 4:
      i$PROJECT(i$valstack[i$valstack_base + 6],8,2);
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_base + 14] = null;
      i$valstack[i$valstack_base + 15] = null;
      i$valstack[i$valstack_base + 16] = null;
      i$valstack[i$valstack_base + 17] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 15];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 16];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 17];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 8];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 5;
      i$CALL(_idris_Effects_46_eff$3,[oldbase,myoldbase]);
      i$CALL(_idris_Effects_46_dropEnv,[myoldbase]);
      break;
    case 5:
      i$PROJECT(i$valstack[i$valstack_base + 6],8,3);
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_base + 14] = null;
      i$valstack[i$valstack_base + 15] = null;
      i$valstack[i$valstack_base + 16] = new i$CON(1,[i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 5]],null,null);
      i$valstack[i$valstack_base + 17] = new i$CON(65664,[i$valstack[i$valstack_base + 7]],_idris__123_APPLY0_125_$65664,null);
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 12];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 13];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 14];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 15];
      i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 16];
      i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 10];
      i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 17];
      i$SLIDE(8);
      i$valstack_top = i$valstack_base + 8;
      i$CALL(_idris_Effects_46_eff,[oldbase]);
      break;
    case 0:
      i$valstack[i$valstack_base + 8] = i$valstack[i$valstack_base + 6].args[0];
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 7];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 8];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 2;
      i$CALL(_idris_Effects_46_eff$4,[oldbase,myoldbase]);
      i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
      break;
    case 1:
      i$PROJECT(i$valstack[i$valstack_base + 6],8,2);
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_base + 14] = null;
      i$valstack[i$valstack_base + 15] = new i$CON(65666,[i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8]],_idris__123_APPLY0_125_$65666,null);
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 10];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 12];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 13];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 14];
      i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 5];
      i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 9];
      i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 15];
      i$SLIDE(8);
      i$valstack_top = i$valstack_base + 8;
      i$CALL(_idris_Effects_46_eff,[oldbase]);
      break;
  };
}
var _idris_Elements_46_elemAt = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = new i$CON(65678,[i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65678,null);
  i$valstack[i$valstack_base + 6] = new i$CON(65684,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65684,null);
  i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 4],i$valstack[i$valstack_base + 5],i$valstack[i$valstack_base + 6]],_idris__123_APPLY0_125_$65720,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Event_46_Priv_46_evProp = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base + 4][i$valstack[i$valstack_base + 3]];
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_execEff$2 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 14] = i$ret;
  i$valstack[i$valstack_base + 15] = new i$CON(65668,[i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 13]],_idris__123_APPLY0_125_$65668,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 14];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 15];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46_execEff$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 14] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 14];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 9];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46_execEff$2,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46_execEff$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 14] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 14];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 12];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46_execEff$1,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46_execEff = function(oldbase){
  var myoldbase;
  i$valstack_top += 12;
  switch(i$valstack[i$valstack_base + 8].tag){
    case 0:
      i$PROJECT(i$valstack[i$valstack_base + 7],11,3);
      i$valstack[i$valstack_base + 14] = null;
      i$valstack[i$valstack_base + 15] = null;
      i$valstack[i$valstack_base + 16] = null;
      i$valstack[i$valstack_base + 17] = null;
      i$valstack[i$valstack_base + 18] = null;
      i$valstack[i$valstack_base + 19] = null;
      ;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 14];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 15];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 16];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 17];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 18];
      i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 19];
      i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 11];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 7;
      i$CALL(_idris_Effects_46_execEff$0,[oldbase,myoldbase]);
      i$CALL(_idris_Effects_46_handle,[myoldbase]);
      break;
    case 1:
      i$valstack[i$valstack_base + 11] = i$valstack[i$valstack_base + 8].args[0];
      i$PROJECT(i$valstack[i$valstack_base + 7],12,3);
      i$valstack[i$valstack_base + 15] = null;
      i$valstack[i$valstack_base + 16] = null;
      i$valstack[i$valstack_base + 17] = null;
      i$valstack[i$valstack_base + 18] = null;
      i$valstack[i$valstack_base + 19] = null;
      i$valstack[i$valstack_base + 20] = null;
      i$valstack[i$valstack_base + 21] = null;
      i$valstack[i$valstack_base + 22] = new i$CON(65670,[i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 12],i$valstack[i$valstack_base + 13]],_idris__123_APPLY0_125_$65670,null);
      ;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 15];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 16];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 17];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 18];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 19];
      i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 20];
      i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 21];
      i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 14];
      i$valstack[i$valstack_top + 8] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 9] = i$valstack[i$valstack_base + 9];
      i$valstack[i$valstack_top + 10] = i$valstack[i$valstack_base + 22];
      i$SLIDE(11);
      i$valstack_top = i$valstack_base + 11;
      i$CALL(_idris_Effects_46_execEff,[oldbase]);
      break;
  };
}
var _idris_Main_46_first = function(oldbase){
  var myoldbase;
  i$valstack_top += 5;
  i$valstack[i$valstack_base + 1] = null;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 4] = new i$CON(65723,[i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65723,null);
  i$valstack[i$valstack_base + 5] = 0;
  i$ret = new i$CON(65719,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 4],i$valstack[i$valstack_base + 5]],_idris__123_APPLY0_125_$65719,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Prelude_46_Basics_46_flip$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 6] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Prelude_46_Basics_46_flip = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 5];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Prelude_46_Basics_46_flip$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46_gen$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_base + 2] = new i$CON(4,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3]],null,null);
  i$valstack[i$valstack_base + 3] = i$CON$65695;
  i$ret = new i$CON(2,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46_gen = function(oldbase){
  var myoldbase;
  i$valstack_top += 3;
  i$valstack[i$valstack_base + 2] = i$CON$0;
  i$valstack[i$valstack_base + 2] = new i$CON(2,[i$valstack[i$valstack_base + 2]],null,null);
  i$valstack[i$valstack_base + 2] = new i$CON(1,[i$valstack[i$valstack_base + 2]],null,null);
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = "li";
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Main_46_gen$0,[oldbase,myoldbase]);
  i$CALL(_idris_Elements_46_newElement,[myoldbase]);
}
var _idris_Elements_46_Priv_46_getProperty = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base + 2][i$valstack[i$valstack_base + 1]];
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_handle$2 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 7] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 5];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46_handle$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 7] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46_handle$2,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46_handle$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 7] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46_handle$1,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46_handle = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46_handle$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Prelude_46_Classes_46_intToBool = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  if (i$valstack[i$valstack_base] == 0) {
    i$ret = i$CON$0;
    i$valstack_top = i$valstack_base;
    i$valstack_base = oldbase;
  } else {
    i$ret = i$CON$1;
    i$valstack_top = i$valstack_base;
    i$valstack_base = oldbase;
  };
}
var _idris_io_95_bind$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 7] = i$ret;
  i$valstack[i$valstack_base + 8] = new i$CON(65722,[i$valstack[i$valstack_base + 4],i$valstack[i$valstack_base + 3]],_idris__123_APPLY0_125_$65722,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 8];
  i$SLIDE(4);
  i$valstack_top = i$valstack_base + 4;
  i$CALL(_idris_prim_95_io_95_bind,[oldbase]);
}
var _idris_io_95_bind = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_io_95_bind$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_io_95_return = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base + 1];
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46_length = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base].length;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46_main$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 3] = i$CON$65701;
  i$ret = new i$CON(65720,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3]],_idris__123_APPLY0_125_$65720,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46_main = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base] = null;
  i$valstack[i$valstack_base + 1] = null;
  i$valstack[i$valstack_base + 2] = "ul#todo-list";
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris_Main_46_main$0,[oldbase,myoldbase]);
  i$CALL(_idris_Elements_46_query,[myoldbase]);
}
var _idris_Elements_46_newElement = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 2] = i$CON$0;
  i$valstack[i$valstack_base + 3] = new i$CON(2,[i$valstack[i$valstack_base + 1]],null,null);
  i$ret = new i$CON(3,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46_onEvent = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base + 3].addEventListener(i$valstack[i$valstack_base + 2], i$ffiWrap(i$valstack[i$valstack_base + 4],oldbase,myoldbase));
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46_onMouseEvent$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 6] = i$ret;
  i$valstack[i$valstack_base + 7] = new i$CON(65709,[i$valstack[i$valstack_base + 3]],_idris__123_APPLY0_125_$65709,null);
  i$ret = new i$CON(65679,[i$valstack[i$valstack_base + 4],i$valstack[i$valstack_base + 5],i$valstack[i$valstack_base + 6],i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 7]],_idris__123_APPLY0_125_$65679,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46_onMouseEvent = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris_MouseEvent_46_onMouseEvent$0,[oldbase,myoldbase]);
  i$CALL(_idris_Prelude_46__64_Prelude_46_Show_36_EventType_58__33_show_58_0,[myoldbase]);
}
var _idris_prim_95_io_95_bind = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Prelude_46_Applicative_46_pure = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Elements_46_query = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 1] = null;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = new i$CON(65685,[i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65685,null);
  i$valstack[i$valstack_base + 4] = i$CON$65686;
  i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65720,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_rebuildEnv$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 11] = i$ret;
  i$ret = new i$CON(1,[i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 11]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_rebuildEnv$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 14] = i$ret;
  i$ret = new i$CON(1,[i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 14]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_rebuildEnv = function(oldbase){
  var myoldbase;
  i$valstack_top += 11;
  switch(i$valstack[i$valstack_base + 5].tag){
    case 2:
      i$valstack[i$valstack_base + 7] = i$valstack[i$valstack_base + 5].args[0];
      i$PROJECT(i$valstack[i$valstack_base + 6],8,3);
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_base + 14] = null;
      ;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 12];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 13];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 14];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 4];
      i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 7];
      i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 10];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 7;
      i$CALL(_idris_Effects_46_rebuildEnv$0,[oldbase,myoldbase]);
      i$CALL(_idris_Effects_46_rebuildEnv,[myoldbase]);
      break;
    case 1:
      i$valstack[i$valstack_base + 7] = i$valstack[i$valstack_base + 5].args[0];
      switch(i$valstack[i$valstack_base + 4].tag){
        case 1:
          i$PROJECT(i$valstack[i$valstack_base + 4],8,3);
          i$PROJECT(i$valstack[i$valstack_base + 6],11,3);
          i$valstack[i$valstack_base + 14] = null;
          i$valstack[i$valstack_base + 15] = null;
          i$valstack[i$valstack_base + 16] = null;
          i$valstack[i$valstack_base + 17] = null;
          ;
          i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 14];
          i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 15];
          i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 16];
          i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 17];
          i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 10];
          i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 7];
          i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 13];
          myoldbase = i$valstack_base;
          i$valstack_base = i$valstack_top;
          i$valstack_top += 7;
          i$CALL(_idris_Effects_46_rebuildEnv$1,[oldbase,myoldbase]);
          i$CALL(_idris_Effects_46_rebuildEnv,[myoldbase]);
          break;
        case 0:
          i$ret = i$CON$0;
          i$valstack_top = i$valstack_base;
          i$valstack_base = oldbase;
          break;
      };
      break;
    case 0:
      switch(i$valstack[i$valstack_base + 4].tag){
        case 1:
          i$PROJECT(i$valstack[i$valstack_base + 4],7,3);
          i$ret = new i$CON(1,[i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9]],null,null);
          i$valstack_top = i$valstack_base;
          i$valstack_base = oldbase;
          break;
        case 0:
          i$ret = i$valstack[i$valstack_base + 6];
          i$valstack_top = i$valstack_base;
          i$valstack_base = oldbase;
          break;
      };
      break;
  };
}
var _idris_Effects_46_relabel$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 8] = i$ret;
  i$ret = new i$CON(1,[i$valstack[i$valstack_base + 5],i$valstack[i$valstack_base + 6],i$valstack[i$valstack_base + 8]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_relabel = function(oldbase){
  var myoldbase;
  i$valstack_top += 7;
  switch(i$valstack[i$valstack_base + 4].tag){
    case 1:
      i$PROJECT(i$valstack[i$valstack_base + 4],5,3);
      i$valstack[i$valstack_base + 8] = null;
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 8];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 9];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 10];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 7];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 5;
      i$CALL(_idris_Effects_46_relabel$0,[oldbase,myoldbase]);
      i$CALL(_idris_Effects_46_relabel,[myoldbase]);
      break;
    case 0:
      i$ret = i$CON$0;
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
  };
}
var _idris_Effects_46_runInit = function(oldbase){
  var myoldbase;
  i$valstack_top += 6;
  i$valstack[i$valstack_base + 7] = null;
  i$valstack[i$valstack_base + 8] = null;
  i$valstack[i$valstack_base + 9] = null;
  i$valstack[i$valstack_base + 10] = null;
  i$valstack[i$valstack_base + 11] = null;
  i$valstack[i$valstack_base + 12] = new i$CON(65672,[i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65672,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 8];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 10];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 11];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 12];
  i$SLIDE(8);
  i$valstack_top = i$valstack_base + 8;
  i$CALL(_idris_Effects_46_eff,[oldbase]);
}
var _idris_run_95__95_IO = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_base + 1] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Elements_46_Priv_46_setProperty = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base + 2][i$valstack[i$valstack_base + 1]]=i$valstack[i$valstack_base + 3];
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46_Priv_46_setText = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base + 1].textContent=i$valstack[i$valstack_base + 2];
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Event_46_target = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 3] = i$CON$0;
  i$valstack[i$valstack_base + 4] = i$CON$0;
  i$ret = new i$CON(3,[i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 4]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46_unlabel = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$PROJECT(i$valstack[i$valstack_base + 4],5,3);
  i$valstack[i$valstack_base + 8] = i$CON$0;
  i$ret = new i$CON(1,[i$valstack[i$valstack_base + 5],i$valstack[i$valstack_base + 6],i$valstack[i$valstack_base + 8]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris__123_APPLY0_125_$65649 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65650 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65651 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle2_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65652 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle3_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65653 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle4_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65654 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65655 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65656 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle2_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65657 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Effects_46__123_eff0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65658 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Effects_46__123_eff1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65659 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,3);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 1];
  i$SLIDE(4);
  i$valstack_top = i$valstack_base + 4;
  i$CALL(_idris_Effects_46__123_eff2_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65660 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Effects_46__123_eff3_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65661 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,4);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 1];
  i$SLIDE(5);
  i$valstack_top = i$valstack_base + 5;
  i$CALL(_idris_Effects_46__123_eff4_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65662 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,3);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 1];
  i$SLIDE(4);
  i$valstack_top = i$valstack_base + 4;
  i$CALL(_idris_Effects_46__123_eff5_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65663 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Effects_46__123_eff6_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65664 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Effects_46__123_eff7_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65665 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Effects_46__123_eff8_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65666 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Effects_46__123_eff9_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65667 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,4);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 1];
  i$SLIDE(5);
  i$valstack_top = i$valstack_base + 5;
  i$CALL(_idris_Effects_46__123_execEff0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65668 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,3);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 1];
  i$SLIDE(4);
  i$valstack_top = i$valstack_base + 4;
  i$CALL(_idris_Effects_46__123_execEff1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65669 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,4);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 1];
  i$SLIDE(5);
  i$valstack_top = i$valstack_base + 5;
  i$CALL(_idris_Effects_46__123_execEff2_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65670 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,3);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 1];
  i$SLIDE(4);
  i$valstack_top = i$valstack_base + 4;
  i$CALL(_idris_Effects_46__123_execEff3_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65671 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Effects_46__123_runInit0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65672 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Effects_46__123_runInit1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65673 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,4);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 1];
  i$SLIDE(5);
  i$valstack_top = i$valstack_base + 5;
  i$CALL(_idris_Elements_46_Priv_46_appendChild,[oldbase]);
}
var _idris__123_APPLY0_125_$65674 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,3);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 1];
  i$SLIDE(4);
  i$valstack_top = i$valstack_base + 4;
  i$CALL(_idris_Elements_46_Priv_46_getProperty,[oldbase]);
}
var _idris__123_APPLY0_125_$65675 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,4);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 1];
  i$SLIDE(5);
  i$valstack_top = i$valstack_base + 5;
  i$CALL(_idris_Elements_46_Priv_46_setProperty,[oldbase]);
}
var _idris__123_APPLY0_125_$65676 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,3);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 1];
  i$SLIDE(4);
  i$valstack_top = i$valstack_base + 4;
  i$CALL(_idris_Elements_46_Priv_46_setText,[oldbase]);
}
var _idris__123_APPLY0_125_$65677 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Elements_46_elemAt,[oldbase]);
}
var _idris__123_APPLY0_125_$65678 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Elements_46_length,[oldbase]);
}
var _idris__123_APPLY0_125_$65679 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,5);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 1];
  i$SLIDE(6);
  i$valstack_top = i$valstack_base + 6;
  i$CALL(_idris_Elements_46_onEvent,[oldbase]);
}
var _idris__123_APPLY0_125_$65680 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Elements_46__123_createElement0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65681 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Elements_46__123_createElement1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65682 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Elements_46__123_elemAt0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65683 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Elements_46__123_elemAt1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65684 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Elements_46__123_elemAt2_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65685 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Elements_46__123_query0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65686 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Elements_46__123_query1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65687 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,5);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 1];
  i$SLIDE(6);
  i$valstack_top = i$valstack_base + 6;
  i$CALL(_idris_Event_46_Priv_46_evProp,[oldbase]);
}
var _idris__123_APPLY0_125_$65688 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__64_Prelude_46_Classes_46_Ord_36_Int,[oldbase]);
}
var _idris__123_APPLY0_125_$65689 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65690 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65691 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_main0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65692 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_main1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65693 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Main_46__123_gen0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65694 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Main_46__123_gen1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65695 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Main_46__123_gen2_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65696 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Main_46__123_main0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65697 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Main_46__123_main1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65698 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Main_46__123_main2_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65699 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Main_46__123_main3_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65700 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Main_46__123_main4_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65701 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_Main_46__123_main5_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65702 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65703 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent10_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65704 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent11_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65705 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent12_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65706 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent13_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65707 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent14_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65708 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent15_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65709 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent16_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65710 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent1_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65711 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent2_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65712 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent3_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65713 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent4_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65714 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent5_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65715 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent6_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65716 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent7_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65717 = function(oldbase,myoldbase){
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent8_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65718 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_MouseEvent_46__123_onMouseEvent9_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65719 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,5);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 1];
  i$SLIDE(6);
  i$valstack_top = i$valstack_base + 6;
  i$CALL(_idris_Prelude_46_Basics_46_flip,[oldbase]);
}
var _idris__123_APPLY0_125_$65720 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,4);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 1];
  i$SLIDE(5);
  i$valstack_top = i$valstack_base + 5;
  i$CALL(_idris_io_95_bind,[oldbase]);
}
var _idris__123_APPLY0_125_$65721 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris_io_95_return,[oldbase]);
}
var _idris__123_APPLY0_125_$65722 = function(oldbase,myoldbase){
  i$PROJECT(i$valstack[i$valstack_base],2,2);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 1];
  i$SLIDE(3);
  i$valstack_top = i$valstack_base + 3;
  i$CALL(_idris__123_io_95_bind0_125_,[oldbase]);
}
var _idris__123_APPLY0_125_$65723 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base].args[0];
  i$ret = new i$CON(65677,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65677,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris__123_APPLY0_125_$65724 = function(oldbase,myoldbase){
  i$ret = new i$CON(65688,[i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65688,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris__123_APPLY0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 5;
  if (i$valstack[i$valstack_base] instanceof i$CON && i$valstack[i$valstack_base].app) {
    i$valstack[i$valstack_base].app(oldbase,myoldbase);
  } else {
    i$ret = null;
    i$valstack_top = i$valstack_base;
    i$valstack_base = oldbase;
  };
}
var _idris__123_EVAL0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  if (i$valstack[i$valstack_base] instanceof i$CON && i$valstack[i$valstack_base].ev) {
    i$valstack[i$valstack_base].ev(oldbase,myoldbase);
  } else {
    i$ret = i$valstack[i$valstack_base];
    i$valstack_top = i$valstack_base;
    i$valstack_base = oldbase;
  };
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle0_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 3] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 2] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle0_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle0_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle0_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 13;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_base + 7] = null;
  i$valstack[i$valstack_base + 8] = null;
  i$valstack[i$valstack_base + 9] = null;
  i$valstack[i$valstack_base + 10] = null;
  i$valstack[i$valstack_base + 11] = null;
  i$valstack[i$valstack_base + 12] = null;
  i$valstack[i$valstack_base + 13] = null;
  i$valstack[i$valstack_base + 14] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 8];
  i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 8] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 9] = i$valstack[i$valstack_base + 10];
  i$valstack[i$valstack_top + 10] = i$valstack[i$valstack_base + 11];
  i$valstack[i$valstack_top + 11] = i$valstack[i$valstack_base + 12];
  i$valstack[i$valstack_top + 12] = i$valstack[i$valstack_base + 13];
  i$valstack[i$valstack_top + 13] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_top + 14] = i$valstack[i$valstack_base + 14];
  i$SLIDE(15);
  i$valstack_top = i$valstack_base + 15;
  i$CALL(_idris_Main_46_main_95_case_95_case_95_case,[oldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_main0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 8;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_base + 7] = null;
  i$valstack[i$valstack_base + 8] = null;
  i$valstack[i$valstack_base + 9] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 8];
  i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 8] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_top + 9] = i$valstack[i$valstack_base + 9];
  i$SLIDE(10);
  i$valstack_top = i$valstack_base + 10;
  i$CALL(_idris_Main_46_main_95_case_95_case,[oldbase]);
}
var _idris_Elements_46__123_createElement0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = document.createElement(i$valstack[i$valstack_base]);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_eff0_125_$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 4] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_eff0_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_base + 7] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 5;
  i$CALL(_idris_Effects_46__123_eff0_125_$1,[oldbase,myoldbase]);
  i$CALL(_idris_Effects_46_relabel,[myoldbase]);
}
var _idris_Effects_46__123_eff0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 5;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_eff0_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Elements_46__123_elemAt0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$valstack[i$valstack_base].item(i$valstack[i$valstack_base + 1]);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_execEff0_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 5] = i$ret;
  i$valstack[i$valstack_base + 6] = new i$CON(1,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 4],i$valstack[i$valstack_base + 3]],null,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 6];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_execEff0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_execEff0_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_gen0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_base + 1] = 1;
  i$ret = new i$CON(0,[i$valstack[i$valstack_base + 1]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris__123_io_95_bind0_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 8] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 8];
  i$SLIDE(7);
  i$valstack_top = i$valstack_base + 7;
  i$CALL(_idris_io_95_bind_95_case,[oldbase]);
}
var _idris__123_io_95_bind0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 6;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_base + 7] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris__123_io_95_bind0_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_main0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65720,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_base + 1] = null;
  i$ret = new i$CON(65721,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65721,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46__123_query0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = document.querySelectorAll(i$valstack[i$valstack_base]);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_runInit0_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_runInit0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 3;
  i$CALL(_idris_Effects_46__123_runInit0_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris_Prelude_46_Applicative_46_pure,[myoldbase]);
}
var _idris__123_runMain0_125_$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_base] = i$valstack[i$valstack_top];
  i$valstack_top = i$valstack_base + 1;
  i$CALL(_idris__123_EVAL0_125_,[oldbase]);
}
var _idris__123_runMain0_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris__123_runMain0_125_$1,[oldbase,myoldbase]);
  i$CALL(_idris_run_95__95_IO,[myoldbase]);
}
var _idris__123_runMain0_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$CALL(_idris__123_runMain0_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris_Main_46_main,[myoldbase]);
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle1_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 3] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle1_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_base + 1] = null;
  i$ret = new i$CON(65721,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65721,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_$3 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_base + 4] = new i$CON(65689,[i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65689,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_$2 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 4] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_$3,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 4] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_$2,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 4];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_$1,[oldbase,myoldbase]);
  i$CALL(_idris_Main_46_first,[myoldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 3;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 4;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_case_32_block_32_in_32_main1_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris_Prelude_46_Monad_46__62__62__61_,[myoldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_main1_125_$3 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 3] = new i$CON(65691,[i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65691,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_main1_125_$2 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_main1_125_$3,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_main1_125_$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_main1_125_$2,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_main1_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_main1_125_$1,[oldbase,myoldbase]);
  i$CALL(_idris_Main_46_first,[myoldbase]);
}
var _idris_Main_46__123_case_32_block_32_in_32_main1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 3;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 4;
  i$CALL(_idris_Main_46__123_case_32_block_32_in_32_main1_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris_Prelude_46_Monad_46__62__62__61_,[myoldbase]);
}
var _idris_Elements_46__123_createElement1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_base + 1] = null;
  i$ret = new i$CON(65721,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65721,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_eff1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65657,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65657,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46__123_elemAt1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 1] = null;
  i$valstack[i$valstack_base + 2] = new i$CON(1,[i$valstack[i$valstack_base]],null,null);
  i$ret = new i$CON(65721,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2]],_idris__123_APPLY0_125_$65721,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_execEff1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65667,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2]],_idris__123_APPLY0_125_$65667,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46__123_gen1_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_base + 2] = new i$CON(4,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3]],null,null);
  i$valstack[i$valstack_base + 3] = i$CON$65693;
  i$ret = new i$CON(2,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46__123_gen1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 2] = i$CON$0;
  i$valstack[i$valstack_base + 2] = new i$CON(2,[i$valstack[i$valstack_base + 2]],null,null);
  i$valstack[i$valstack_base + 2] = new i$CON(1,[i$valstack[i$valstack_base + 2]],null,null);
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 5;
  i$CALL(_idris_Main_46__123_gen1_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris_Elements_46_appendChild,[myoldbase]);
}
var _idris_Main_46__123_main1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65696,[i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65696,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65702;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Elements_46__123_query1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_base + 1] = null;
  i$ret = new i$CON(65721,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65721,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_runInit1_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65671,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65671,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle2_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 3] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle2_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle2_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle2_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle2_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_EffEvent_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle2_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46__123_eff2_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 9] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 8];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 2];
  i$SLIDE(8);
  i$valstack_top = i$valstack_base + 8;
  i$CALL(_idris_Effects_46_eff,[oldbase]);
}
var _idris_Effects_46__123_eff2_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 6;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_base + 7] = null;
  i$valstack[i$valstack_base + 8] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_eff2_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Elements_46__123_elemAt2_125_$3 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  switch(i$valstack[i$valstack_base + 3].tag){
    case 0:
      i$valstack[i$valstack_base + 4] = null;
      i$valstack[i$valstack_base + 5] = i$CON$0;
      i$ret = new i$CON(65721,[i$valstack[i$valstack_base + 4],i$valstack[i$valstack_base + 5]],_idris__123_APPLY0_125_$65721,null);
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 1:
      i$valstack[i$valstack_base + 4] = null;
      i$valstack[i$valstack_base + 5] = null;
      i$valstack[i$valstack_base + 6] = new i$CON(65682,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65682,null);
      i$valstack[i$valstack_base + 7] = i$CON$65683;
      i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 4],i$valstack[i$valstack_base + 5],i$valstack[i$valstack_base + 6],i$valstack[i$valstack_base + 7]],_idris__123_APPLY0_125_$65720,null);
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
  };
}
var _idris_Elements_46__123_elemAt2_125_$2 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 5];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 3;
  i$CALL(_idris_Elements_46__123_elemAt2_125_$3,[oldbase,myoldbase]);
  i$CALL(_idris__123_Prelude_46_Classes_46_Int_32_instance_32_of_32_Prelude_46_Classes_46_Ord_44__32_method_32__62_88_125_,[myoldbase]);
}
var _idris_Elements_46__123_elemAt2_125_$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Elements_46__123_elemAt2_125_$2,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Elements_46__123_elemAt2_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Elements_46__123_elemAt2_125_$1,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Elements_46__123_elemAt2_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 5;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = i$CON$65724;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Elements_46__123_elemAt2_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris_Prelude_46_Classes_46_compare,[myoldbase]);
}
var _idris_Effects_46__123_execEff2_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 5] = i$ret;
  i$valstack[i$valstack_base + 6] = new i$CON(1,[i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 4]],null,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 6];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_execEff2_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_execEff2_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_gen2_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 1] = new i$CON(4,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2]],null,null);
  i$valstack[i$valstack_base + 2] = new i$CON(65694,[i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65694,null);
  i$ret = new i$CON(2,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2]],null,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46__123_gen2_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 1] = i$CON$0;
  i$valstack[i$valstack_base + 1] = new i$CON(1,[i$valstack[i$valstack_base + 1]],null,null);
  i$valstack[i$valstack_base + 1] = new i$CON(2,[i$valstack[i$valstack_base + 1]],null,null);
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 3;
  i$CALL(_idris_Main_46__123_gen2_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris_Event_46_target,[myoldbase]);
}
var _idris_Main_46__123_main2_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65697;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent2_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 5;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 1];
  i$SLIDE(7);
  i$valstack_top = i$valstack_base + 7;
  i$CALL(_idris_Effects_46__64_Effects_46_Handler_36_EffDom_58_IO_58__33_handle_58_0,[oldbase]);
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle3_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 3] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle3_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 2] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle3_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46__123_eff3_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65659,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65659,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_execEff3_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65669,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2]],_idris__123_APPLY0_125_$65669,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46__123_main3_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65698;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent3_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65711,[i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65711,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle4_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  i$valstack[i$valstack_base + 3] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle4_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 2] = i$CON$0;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_EffDom_44__32_IO_32_instance_32_of_32_Effects_46_Handler_44__32_method_32_handle4_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Effects_46__123_eff4_125_$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 6] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 6];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_eff4_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 5] = i$ret;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_base + 7] = null;
  i$valstack[i$valstack_base + 8] = null;
  i$valstack[i$valstack_base + 9] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 8];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 3];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 7;
  i$CALL(_idris_Effects_46__123_eff4_125_$1,[oldbase,myoldbase]);
  i$CALL(_idris_Effects_46_rebuildEnv,[myoldbase]);
}
var _idris_Effects_46__123_eff4_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 5;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_eff4_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_main4_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 1] = null;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = i$CON$65699;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 4];
  i$SLIDE(5);
  i$valstack_top = i$valstack_base + 5;
  i$CALL(_idris_Main_46_main_95_case,[oldbase]);
}
var _idris_MouseEvent_46__123_onMouseEvent4_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65712;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_eff5_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65661,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2]],_idris__123_APPLY0_125_$65661,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46__123_main5_125_$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_base + 4] = i$CON$65700;
  i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 2],i$valstack[i$valstack_base + 3],i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65720,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Main_46__123_main5_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Main_46__123_main5_125_$1,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46__123_main5_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 1] = null;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris_Main_46__123_main5_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris_Main_46_first,[myoldbase]);
}
var _idris_MouseEvent_46__123_onMouseEvent5_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65713;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_eff6_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 13;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_base + 7] = null;
  i$valstack[i$valstack_base + 8] = null;
  i$valstack[i$valstack_base + 9] = null;
  i$valstack[i$valstack_base + 10] = null;
  i$valstack[i$valstack_base + 11] = null;
  i$valstack[i$valstack_base + 12] = null;
  i$valstack[i$valstack_base + 13] = null;
  i$valstack[i$valstack_base + 14] = null;
  i$valstack[i$valstack_base + 15] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 8];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 9];
  i$valstack[i$valstack_top + 7] = i$valstack[i$valstack_base + 10];
  i$valstack[i$valstack_top + 8] = i$valstack[i$valstack_base + 11];
  i$valstack[i$valstack_top + 9] = i$valstack[i$valstack_base + 12];
  i$valstack[i$valstack_top + 10] = i$valstack[i$valstack_base + 13];
  i$valstack[i$valstack_top + 11] = i$valstack[i$valstack_base + 14];
  i$valstack[i$valstack_top + 12] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 13] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_top + 14] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 15] = i$valstack[i$valstack_base + 15];
  i$SLIDE(16);
  i$valstack_top = i$valstack_base + 16;
  i$CALL(_idris_Effects_46_eff_95_case,[oldbase]);
}
var _idris_MouseEvent_46__123_onMouseEvent6_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65714;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_eff7_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65663,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65663,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent7_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65715;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_eff8_125_$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 2];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46__123_eff8_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46__123_eff8_125_$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_MouseEvent_46__123_onMouseEvent8_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65716;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__123_eff9_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65665,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65665,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent9_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = null;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base + 2];
  i$SLIDE(7);
  i$valstack_top = i$valstack_base + 7;
  i$CALL(_idris_Effects_46__64_Effects_46_Handler_36_EffEvent_58_IO_58__33_handle_58_0,[oldbase]);
}
var _idris_MouseEvent_46__123_onMouseEvent10_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65718,[i$valstack[i$valstack_base],i$valstack[i$valstack_base + 1]],_idris__123_APPLY0_125_$65718,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent11_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = new i$CON(65703,[i$valstack[i$valstack_base]],_idris__123_APPLY0_125_$65703,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent12_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65704;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent13_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65705;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent14_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65706;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent15_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$ret = i$CON$65707;
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_MouseEvent_46__123_onMouseEvent16_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 9;
  i$valstack[i$valstack_base + 2] = null;
  i$valstack[i$valstack_base + 3] = null;
  i$valstack[i$valstack_base + 4] = null;
  i$valstack[i$valstack_base + 5] = null;
  i$valstack[i$valstack_base + 6] = i$CON$65710;
  i$valstack[i$valstack_base + 7] = i$CON$65717;
  i$valstack[i$valstack_base + 8] = i$CON$0;
  i$valstack[i$valstack_base + 9] = i$CON$65708;
  i$valstack[i$valstack_base + 10] = i$CON$0;
  i$valstack[i$valstack_base + 9] = new i$CON(1,[i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 1],i$valstack[i$valstack_base + 10]],null,null);
  i$valstack[i$valstack_base + 7] = new i$CON(1,[i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9]],null,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 3];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 4];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 5];
  i$valstack[i$valstack_top + 4] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 5] = i$valstack[i$valstack_base + 7];
  i$valstack[i$valstack_top + 6] = i$valstack[i$valstack_base];
  i$SLIDE(7);
  i$valstack_top = i$valstack_base + 7;
  i$CALL(_idris_Effects_46_runInit,[oldbase]);
}
var _idris__123_Prelude_46_Classes_46_Int_32_instance_32_of_32_Prelude_46_Classes_46_Ord_44__32_method_32__62_88_125_ = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  switch(i$valstack[i$valstack_base].tag){
    case 2:
      i$ret = i$CON$1;
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    default:
      i$ret = i$CON$0;
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
  };
}
var _idris_Effects_46__64_Effects_46_Handler_36_EffDom_58_IO_58__33_handle_58_0$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 10] = i$ret;
  i$valstack[i$valstack_base + 11] = new i$CON(65651,[i$valstack[i$valstack_base + 6]],_idris__123_APPLY0_125_$65651,null);
  i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11]],_idris__123_APPLY0_125_$65720,null);
  i$valstack_top = i$valstack_base;
  i$valstack_base = oldbase;
}
var _idris_Effects_46__64_Effects_46_Handler_36_EffDom_58_IO_58__33_handle_58_0 = function(oldbase){
  var myoldbase;
  i$valstack_top += 7;
  switch(i$valstack[i$valstack_base + 5].tag){
    case 3:
      i$PROJECT(i$valstack[i$valstack_base + 5],7,2);
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 11] = new i$CON(65673,[i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 12],i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8]],_idris__123_APPLY0_125_$65673,null);
      i$valstack[i$valstack_base + 12] = new i$CON(65649,[i$valstack[i$valstack_base + 6]],_idris__123_APPLY0_125_$65649,null);
      i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 12]],_idris__123_APPLY0_125_$65720,null);
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 0:
      i$PROJECT(i$valstack[i$valstack_base + 5],7,2);
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 11] = new i$CON(65674,[i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8]],_idris__123_APPLY0_125_$65674,null);
      i$valstack[i$valstack_base + 12] = new i$CON(65650,[i$valstack[i$valstack_base + 6]],_idris__123_APPLY0_125_$65650,null);
      i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 12]],_idris__123_APPLY0_125_$65720,null);
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 2:
      i$valstack[i$valstack_base + 7] = i$valstack[i$valstack_base + 5].args[0];
      i$valstack[i$valstack_base + 8] = null;
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 7];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 1;
      i$CALL(_idris_Effects_46__64_Effects_46_Handler_36_EffDom_58_IO_58__33_handle_58_0$0,[oldbase,myoldbase]);
      i$CALL(_idris_Elements_46_createElement,[myoldbase]);
      break;
    case 1:
      i$PROJECT(i$valstack[i$valstack_base + 5],7,3);
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 12] = new i$CON(65675,[i$valstack[i$valstack_base + 12],i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9]],_idris__123_APPLY0_125_$65675,null);
      i$valstack[i$valstack_base + 13] = new i$CON(65652,[i$valstack[i$valstack_base + 6]],_idris__123_APPLY0_125_$65652,null);
      i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 12],i$valstack[i$valstack_base + 13]],_idris__123_APPLY0_125_$65720,null);
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 4:
      i$PROJECT(i$valstack[i$valstack_base + 5],7,2);
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 11] = new i$CON(65676,[i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8]],_idris__123_APPLY0_125_$65676,null);
      i$valstack[i$valstack_base + 12] = new i$CON(65653,[i$valstack[i$valstack_base + 6]],_idris__123_APPLY0_125_$65653,null);
      i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 12]],_idris__123_APPLY0_125_$65720,null);
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
  };
}
var _idris_Effects_46__64_Effects_46_Handler_36_EffEvent_58_IO_58__33_handle_58_0 = function(oldbase){
  var myoldbase;
  i$valstack_top += 8;
  switch(i$valstack[i$valstack_base + 5].tag){
    case 1:
      i$valstack[i$valstack_base + 7] = i$valstack[i$valstack_base + 5].args[0];
      i$valstack[i$valstack_base + 8] = null;
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 10] = new i$CON(65687,[i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 12],i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65687,null);
      i$valstack[i$valstack_base + 11] = new i$CON(65654,[i$valstack[i$valstack_base + 6],i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65654,null);
      i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11]],_idris__123_APPLY0_125_$65720,null);
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 0:
      i$valstack[i$valstack_base + 7] = null;
      i$valstack[i$valstack_base + 8] = null;
      i$valstack[i$valstack_base + 9] = null;
      i$valstack[i$valstack_base + 10] = null;
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_base + 14] = "target";
      i$valstack[i$valstack_base + 11] = new i$CON(65687,[i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 12],i$valstack[i$valstack_base + 13],i$valstack[i$valstack_base + 14],i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65687,null);
      i$valstack[i$valstack_base + 12] = i$CON$65655;
      i$valstack[i$valstack_base + 9] = new i$CON(65720,[i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 10],i$valstack[i$valstack_base + 11],i$valstack[i$valstack_base + 12]],_idris__123_APPLY0_125_$65720,null);
      i$valstack[i$valstack_base + 10] = new i$CON(65656,[i$valstack[i$valstack_base + 6],i$valstack[i$valstack_base + 4]],_idris__123_APPLY0_125_$65656,null);
      i$ret = new i$CON(65720,[i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 8],i$valstack[i$valstack_base + 9],i$valstack[i$valstack_base + 10]],_idris__123_APPLY0_125_$65720,null);
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
  };
}
var _idris_Prelude_46_Classes_46__64_Prelude_46_Classes_46_Ord_36_Int_58__33_compare_58_0$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 3] = i$ret;
  switch(i$valstack[i$valstack_base + 3].tag){
    case 0:
      i$ret = i$CON$2;
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 1:
      i$ret = i$CON$0;
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
  };
}
var _idris_Prelude_46_Classes_46__64_Prelude_46_Classes_46_Ord_36_Int_58__33_compare_58_0$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 2] = i$ret;
  switch(i$valstack[i$valstack_base + 2].tag){
    case 0:
      i$valstack[i$valstack_base + 3] = i$valstack[i$valstack_base] < i$valstack[i$valstack_base + 1];
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 3];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 1;
      i$CALL(_idris_Prelude_46_Classes_46__64_Prelude_46_Classes_46_Ord_36_Int_58__33_compare_58_0$1,[oldbase,myoldbase]);
      i$CALL(_idris_Prelude_46_Classes_46_intToBool,[myoldbase]);
      break;
    case 1:
      i$ret = i$CON$1;
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
  };
}
var _idris_Prelude_46_Classes_46__64_Prelude_46_Classes_46_Ord_36_Int_58__33_compare_58_0 = function(oldbase){
  var myoldbase;
  i$valstack_top += 2;
  i$valstack[i$valstack_base + 2] = i$valstack[i$valstack_base] == i$valstack[i$valstack_base + 1];
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 2];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris_Prelude_46_Classes_46__64_Prelude_46_Classes_46_Ord_36_Int_58__33_compare_58_0$0,[oldbase,myoldbase]);
  i$CALL(_idris_Prelude_46_Classes_46_intToBool,[myoldbase]);
}
var _idris_Prelude_46__64_Prelude_46_Show_36_EventType_58__33_show_58_0 = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  switch(i$valstack[i$valstack_base].tag){
    case 10:
      i$ret = "abort";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 16:
      i$ret = "blur";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 17:
      i$ret = "change";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 0:
      i$ret = "click";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 1:
      i$ret = "dblclick";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 11:
      i$ret = "error";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 18:
      i$ret = "focus";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 7:
      i$ret = "keydown";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 9:
      i$ret = "keypress";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 8:
      i$ret = "keyup";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 12:
      i$ret = "load";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 2:
      i$ret = "mousedown";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 3:
      i$ret = "mousemove";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 5:
      i$ret = "mouseout";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 4:
      i$ret = "mouseover";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 6:
      i$ret = "mouseup";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 19:
      i$ret = "reset";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 13:
      i$ret = "resize";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 14:
      i$ret = "scroll";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 20:
      i$ret = "select";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 21:
      i$ret = "submit";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
    case 15:
      i$ret = "unload";
      i$valstack_top = i$valstack_base;
      i$valstack_base = oldbase;
      break;
  };
}
var _idris__64_Prelude_46_Classes_46_Ord_36_Int = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 1];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris_Prelude_46_Classes_46__64_Prelude_46_Classes_46_Ord_36_Int_58__33_compare_58_0,[oldbase]);
}
var _idris_Effects_46_eff_95_case$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 19] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 19];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 18];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Effects_46_eff_95_case = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  i$PROJECT(i$valstack[i$valstack_base + 14],16,3);
  ;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 12];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 13];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Effects_46_eff_95_case$0,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_io_95_bind_95_case = function(oldbase){
  var myoldbase;
  i$valstack_top += 1;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 4];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Main_46_main_95_case$2 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 6] = i$ret;
  i$valstack[i$valstack_base + 7] = new i$CON(65692,[i$valstack[i$valstack_base + 2]],_idris__123_APPLY0_125_$65692,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 7];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Main_46_main_95_case$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 7] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 6];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 7];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Main_46_main_95_case$2,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46_main_95_case$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 6] = i$ret;
  i$valstack[i$valstack_base + 7] = "input#new-todo";
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 7];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris_Main_46_main_95_case$1,[oldbase,myoldbase]);
  i$CALL(_idris_Elements_46_query,[myoldbase]);
}
var _idris_Main_46_main_95_case = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  switch(i$valstack[i$valstack_base + 3].tag){
    case 1:
      i$valstack[i$valstack_base + 5] = i$valstack[i$valstack_base + 3].args[0];
      i$valstack[i$valstack_base + 6] = null;
      i$valstack[i$valstack_base + 7] = null;
      i$valstack[i$valstack_base + 8] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 6];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 7];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 8];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 2];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 4;
      i$CALL(_idris_Main_46_main_95_case$0,[oldbase,myoldbase]);
      i$CALL(_idris_Prelude_46_Monad_46__62__62__61_,[myoldbase]);
      break;
    default:
      throw new Error("Error");
  };
}
var _idris_Main_46_main_95_case_95_case$2 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 11] = i$ret;
  i$valstack[i$valstack_base + 12] = new i$CON(65690,[i$valstack[i$valstack_base + 7],i$valstack[i$valstack_base + 10]],_idris__123_APPLY0_125_$65690,null);
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 11];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 12];
  i$SLIDE(2);
  i$valstack_top = i$valstack_base + 2;
  i$CALL(_idris__123_APPLY0_125_,[oldbase]);
}
var _idris_Main_46_main_95_case_95_case$1 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 12] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 11];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 12];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 2;
  i$CALL(_idris_Main_46_main_95_case_95_case$2,[oldbase,myoldbase]);
  i$CALL(_idris__123_APPLY0_125_,[myoldbase]);
}
var _idris_Main_46_main_95_case_95_case$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 11] = i$ret;
  i$valstack[i$valstack_base + 12] = "input#due";
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 12];
  myoldbase = i$valstack_base;
  i$valstack_base = i$valstack_top;
  i$valstack_top += 1;
  i$CALL(_idris_Main_46_main_95_case_95_case$1,[oldbase,myoldbase]);
  i$CALL(_idris_Elements_46_query,[myoldbase]);
}
var _idris_Main_46_main_95_case_95_case = function(oldbase){
  var myoldbase;
  i$valstack_top += 4;
  switch(i$valstack[i$valstack_base + 8].tag){
    case 1:
      i$valstack[i$valstack_base + 10] = i$valstack[i$valstack_base + 8].args[0];
      i$valstack[i$valstack_base + 11] = null;
      i$valstack[i$valstack_base + 12] = null;
      i$valstack[i$valstack_base + 13] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 11];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 12];
      i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 13];
      i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 7];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 4;
      i$CALL(_idris_Main_46_main_95_case_95_case$0,[oldbase,myoldbase]);
      i$CALL(_idris_Prelude_46_Monad_46__62__62__61_,[myoldbase]);
      break;
    default:
      throw new Error("Error");
  };
}
var _idris_Main_46_main_95_case_95_case_95_case$0 = function(oldbase,myoldbase){
  i$valstack[i$valstack_base + 18] = i$ret;
  i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 16];
  i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 17];
  i$valstack[i$valstack_top + 2] = i$valstack[i$valstack_base + 8];
  i$valstack[i$valstack_top + 3] = i$valstack[i$valstack_base + 18];
  i$SLIDE(4);
  i$valstack_top = i$valstack_base + 4;
  i$CALL(_idris_MouseEvent_46_onMouseEvent,[oldbase]);
}
var _idris_Main_46_main_95_case_95_case_95_case = function(oldbase){
  var myoldbase;
  i$valstack_top += 5;
  switch(i$valstack[i$valstack_base + 13].tag){
    case 1:
      i$valstack[i$valstack_base + 15] = i$valstack[i$valstack_base + 13].args[0];
      i$valstack[i$valstack_base + 16] = null;
      i$valstack[i$valstack_base + 17] = i$CON$1;
      i$valstack[i$valstack_base + 18] = null;
      i$valstack[i$valstack_base + 19] = null;
      i$valstack[i$valstack_top] = i$valstack[i$valstack_base + 18];
      i$valstack[i$valstack_top + 1] = i$valstack[i$valstack_base + 19];
      myoldbase = i$valstack_base;
      i$valstack_base = i$valstack_top;
      i$valstack_top += 2;
      i$CALL(_idris_Main_46_main_95_case_95_case_95_case$0,[oldbase,myoldbase]);
      i$CALL(_idris_Main_46_gen,[myoldbase]);
      break;
    default:
      throw new Error("Error");
  };
}
var i$CON$0 = new i$CON(0,[],null,null);
var i$CON$1 = new i$CON(1,[],null,null);
var i$CON$2 = new i$CON(2,[],null,null);
var i$CON$65655 = new i$CON(65655,[],_idris__123_APPLY0_125_$65655,null);
var i$CON$65681 = new i$CON(65681,[],_idris__123_APPLY0_125_$65681,null);
var i$CON$65683 = new i$CON(65683,[],_idris__123_APPLY0_125_$65683,null);
var i$CON$65686 = new i$CON(65686,[],_idris__123_APPLY0_125_$65686,null);
var i$CON$65693 = new i$CON(65693,[],_idris__123_APPLY0_125_$65693,null);
var i$CON$65695 = new i$CON(65695,[],_idris__123_APPLY0_125_$65695,null);
var i$CON$65697 = new i$CON(65697,[],_idris__123_APPLY0_125_$65697,null);
var i$CON$65698 = new i$CON(65698,[],_idris__123_APPLY0_125_$65698,null);
var i$CON$65699 = new i$CON(65699,[],_idris__123_APPLY0_125_$65699,null);
var i$CON$65700 = new i$CON(65700,[],_idris__123_APPLY0_125_$65700,null);
var i$CON$65701 = new i$CON(65701,[],_idris__123_APPLY0_125_$65701,null);
var i$CON$65702 = new i$CON(65702,[],_idris__123_APPLY0_125_$65702,null);
var i$CON$65704 = new i$CON(65704,[],_idris__123_APPLY0_125_$65704,null);
var i$CON$65705 = new i$CON(65705,[],_idris__123_APPLY0_125_$65705,null);
var i$CON$65706 = new i$CON(65706,[],_idris__123_APPLY0_125_$65706,null);
var i$CON$65707 = new i$CON(65707,[],_idris__123_APPLY0_125_$65707,null);
var i$CON$65708 = new i$CON(65708,[],_idris__123_APPLY0_125_$65708,null);
var i$CON$65710 = new i$CON(65710,[],_idris__123_APPLY0_125_$65710,null);
var i$CON$65712 = new i$CON(65712,[],_idris__123_APPLY0_125_$65712,null);
var i$CON$65713 = new i$CON(65713,[],_idris__123_APPLY0_125_$65713,null);
var i$CON$65714 = new i$CON(65714,[],_idris__123_APPLY0_125_$65714,null);
var i$CON$65715 = new i$CON(65715,[],_idris__123_APPLY0_125_$65715,null);
var i$CON$65716 = new i$CON(65716,[],_idris__123_APPLY0_125_$65716,null);
var i$CON$65717 = new i$CON(65717,[],_idris__123_APPLY0_125_$65717,null);
var i$CON$65724 = new i$CON(65724,[],_idris__123_APPLY0_125_$65724,null);
var main = function(){
if (typeof document != "undefined" && (document.readyState == "complete" || document.readyState == "loaded")) {
    var vm = new i$VM();
    i$SCHED(vm);
    _idris__123_runMain0_125_(0);
    while (i$callstack.length) {
      var func = i$callstack.pop();
      var args = i$callstack.pop();
      func.apply(this,args);
    };
  } else if (typeof window != "undefined") {
    window.addEventListener("DOMContentLoaded",function(){
  var vm = new i$VM();
  i$SCHED(vm);
  _idris__123_runMain0_125_(0);
  while (i$callstack.length) {
    var func = i$callstack.pop();
    var args = i$callstack.pop();
    func.apply(this,args);
  };
}
,false);
  } else if (true) {
    var vm = new i$VM();
    i$SCHED(vm);
    _idris__123_runMain0_125_(0);
    while (i$callstack.length) {
      var func = i$callstack.pop();
      var args = i$callstack.pop();
      func.apply(this,args);
    };
  }
}
main()