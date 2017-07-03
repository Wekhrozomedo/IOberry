@//note.js

(function(){
this.a;

'use strict';
var fileType = function(f){
	var length = f.length; // 8
	var indexN = f.indexOf('.js'); //jquery.js ==> 6
	if(length===(indexN+3) && indexN!=-1){
		return "javascript";
	}else{
		return false;
	}
};

//a=new fileType(this.f);

})();
//a('s.js');