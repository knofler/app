(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"86e3be8872bced91b892":function(e,t,r){"use strict";r.r(t);var n=r("8af190b70a6bc55c6f1b"),o=r.n(n),c=(r("8a2d1b95e05b6a321e74"),r("d7dd51e1bf6bfc2c9c3d")),a=r("0d7f0986bcd2f33d8a2a"),i=r("ab039aecd4a1d4fedc0e"),s=r("a28fc3c963a1d4d1a2e5"),A=r("ab4cb61bcb2dc161defb"),u=r("b8e308020f3b1fdee1d9"),p=r("adc20f99e57c573c589c"),f=r("d95b0cf107403b178365"),S=r("414fbf221955af586112"),E="app/Search/DEFAULT_ACTION",T="app/Search/SEARCH_CONST_APIDATA",l="app/Search/SEARCH_CONST_SEARCHTERM",_="app/Search/SEARCH_CONST_SEARCHTERM_CHANGE",R="app/Search/SEARCH_CONST_APIDATA_SUCCESS",h="app/Search/SEARCH_CONST_APIDATA_ERROR";var b=r("54f683fcda7806277002"),d=Object(b.fromJS)({SEARCH_STATE_APIDATA:[],SEARCH_STATE_SEARCHTERM:"",SEARCH_STATE_SEARCHTERM_CHANGE:[],SEARCH_STATE_APIDATA_LOADING:!1,SEARCH_STATE_APIDATA_ERROR:!1});var C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(console.log("Global reducer file being called"),t.type){case E:return e;case l:return console.log("in SEARCH_STATE_SEARCHTERM",t.searchTerm),e.set("SEARCH_STATE_SEARCHTERM",t.searchTerm);case _:return console.log("in SEARCH_STATE_SEARCHTERM_CHNAGE",t.event),e.set("SEARCH_STATE_SEARCHTERM_CHANGE",t.event).set("SEARCH_STATE_SEARCHTERM",t.event).set("SEARCH_STATE_APIDATA_LOADING",!1).set("SEARCH_STATE_APIDATA_ERROR",!1);case T:return console.log("in SEARCH_CONST_APIDATA action: ",t),e.set("SEARCH_STATE_APIDATA_LOADING",!0).set("SEARCH_STATE_APIDATA_ERROR",!1);case h:return e.set("SEARCH_STATE_APIDATA_LOADING",!1).set("SEARCH_STATE_APIDATA_ERROR",t.error);case R:return console.log("In SEARCH_CONST_APIDATA_SUCCESS reducer, action",t.apiData),e.set("SEARCH_STATE_APIDATA_LOADING",!0).set("SEARCH_STATE_APIDATA_ERROR",!1).set("SEARCH_STATE_APIDATA",t.apiData);default:return e}},y=function(e){return e.get("search",d)},O=r("6c68d13fe9e3e77d8fc4"),H=regeneratorRuntime.mark(D),g=regeneratorRuntime.mark(P),m=regeneratorRuntime.mark(I),v=(Object({NODE_ENV:"production"}).API_URL||"https://aframework-api.herokuapp.com")+"/api/foods";function D(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.e)(T,P);case 2:case"end":return e.stop()}},H,this)}function P(e){var t,r;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,console.log("SEARCH_CONST_API_DATA constant's action :: ",e),n.next=4,Object(O.b)(fetch,v);case 4:return t=n.sent,n.next=7,t.json();case 7:return r=n.sent,console.log("responseBody of SEARCH_CONST_API_DATA  in saga is",r),n.next=11,Object(O.c)((c=r.data,console.log("payload received from API yeild in searchActionApiData function in action is",c),{type:R,apiData:c}));case 11:n.next=17;break;case 13:return n.prev=13,n.t0=n.catch(0),n.next=17,Object(O.c)((o=n.t0,{type:h,error:o}));case 17:case"end":return n.stop()}var o,c},g,this,[[0,13]])}function I(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(O.a)([D()]);case 2:case"end":return e.stop()}},m,this)}console.log("process.env.API_URL",Object({NODE_ENV:"production"}).API_URL),console.log("herokuAPIURL is","https://aframework-api.herokuapp.com"),console.log("url is ",v);var j,w=Object(i.defineMessages)({header:{id:"".concat("app.containers.Search",".header"),defaultMessage:"This is the Search container!"}});function N(e){return(N="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function M(e,t,r,n){j||(j="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),t&&o)for(var a in o)void 0===t[a]&&(t[a]=o[a]);else t||(t=o||{});if(1===c)t.children=n;else if(c>1){for(var i=new Array(c),s=0;s<c;s++)i[s]=arguments[s+3];t.children=i}return{$$typeof:j,type:e,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}function G(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function x(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function L(e,t){return!t||"object"!==N(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function U(e){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}r.d(t,"Search",function(){return V});var J=M(a.Helmet,{},void 0,M("title",{},void 0,"Search"),M("meta",{name:"description",content:"Description of Search"})),B=M("h1",{},void 0,"Search Landing Page Container"),V=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),L(this,U(t).apply(this,arguments))}var r,n,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(t,o.a.Component),r=t,(n=[{key:"componentDidMount",value:function(){this.props.searchDispatchApiData("111111",88,99)}},{key:"render",value:function(){var e=this,t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){G(e,t,r[t])})}return e}({},this.props.searchPropsApiData);return console.log("apiData:: ",t),M("div",{},void 0,J,o.a.createElement(i.FormattedMessage,w.header),M("div",{className:"searchLanding"},void 0,B,M(S.a,{searchFunc:function(t){return e.props.searchDispatchSearchTermChange(t)},searchTerm:this.props.searchTerm}),M("div",{},void 0,this.props.searchPropsApiData.filter(function(t){return"".concat(t.item," \n                ").concat(t.info," \n                ").concat(t.genre," \n                ").concat(t.suburb,"\n                ").concat(t.recipe," \n                ").concat(t.cost,"\n                ").concat(t.country,"\n                ").concat(t.createdBy).toUpperCase().indexOf(e.props.searchTerm.toUpperCase())>=0}).map(function(e,t){return o.a.createElement(u.a,k({},e,{key:e.id,id:t}))}))))}}])&&x(r.prototype,n),c&&x(r,c),t}(),$=Object(s.b)({searchTerm:Object(s.a)(y,function(e){return console.log("SEARCH_STATE_SEARCHTERM in selector",e.get("SEARCH_STATE_SEARCHTERM")),e.get("SEARCH_STATE_SEARCHTERM")}),searchTermChange:Object(s.a)(y,function(e){return console.log("SEARCH_STATE_SEARCHTERM_CHANGE in selector",e.get("SEARCH_STATE_SEARCHTERM_CHANGE")),e.get("SEARCH_STATE_SEARCHTERM_CHANGE")}),searchPropsApiData:Object(s.a)(y,function(e){return console.log("SEARCH_STATE_APIDATA in selector",e.get("SEARCH_STATE_APIDATA")),e.get("SEARCH_STATE_APIDATA")})});var q=Object(c.connect)($,function(e){return{searchDispatchSearchTerm:function(t){return e(function(e){return{type:l,searchTerm:e}}(t))},searchDispatchSearchTermChange:function(t){return e(function(e){return{type:_,event:e}}(t.target.value))},searchDispatchApiData:function(t,r,n){return e(function(e,t,r){return console.log("in searchActionApiData Action",e),{type:T,tenantId:e,skip:t,take:r}}(t,r,n))}}}),z=Object(f.a)({key:"search",reducer:C}),K=Object(p.a)({key:"search",saga:I});t.default=Object(A.compose)(z,K,q)(V)}}]);