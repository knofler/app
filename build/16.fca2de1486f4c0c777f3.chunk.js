(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"6109360cce17b308793d":function(e,n,t){"use strict";t.r(n);var o=t("8af190b70a6bc55c6f1b"),i=t.n(o),r=(t("8a2d1b95e05b6a321e74"),t("d7dd51e1bf6bfc2c9c3d")),a=t("0d7f0986bcd2f33d8a2a"),s=t("ab039aecd4a1d4fedc0e"),c=t("a28fc3c963a1d4d1a2e5"),d=t("ab4cb61bcb2dc161defb"),A=(t("b8e308020f3b1fdee1d9"),t("139e580cad8435b05518"),t("adc20f99e57c573c589c")),E=t("d95b0cf107403b178365"),l="app/MediaLive/DEFAULT_ACTION",D="app/MediaLive/MEDIALIVE_CONST_ADD",_="app/MediaLive/MEDIALIVE_CONST_ADD_POST",p="app/MediaLive/MEDIALIVE_CONST_ADD_SUCCESS",u="app/MediaLive/MEDIALIVE_CONST_ADD_ERROR",I="app/MediaLive/MEDIALIVE_CONST_ADD_AWS_POST",T="app/MediaLive/MEDIALIVE_CONST_ADD_AWS_SUCCESS",S="app/MediaLive/MEDIALIVE_CONST_ADD_AWS_ERROR",L="app/MediaLive/MEDIALIVE_CONST_ADD_MODEL",m="app/MediaLive/MEDIALIVE_CONST_ADD_FORM_STRUCTURE",M="app/MediaLive/MEDIALIVE_CONST_ADD_FORM_INPUT",O="app/MediaLive/MEDIALIVE_CONST_ADD_FORM_RESET";function f(e){return console.log("in mediaLiveActionAddError in ACTION :: error :::",e),{type:u,error:e}}function v(e){return console.log("in mediaLiveActionAddSuccess in ACTION :: payload :::",e),{type:p,payload:e}}var g=t("54f683fcda7806277002"),b=Object(g.fromJS)({MEDIALIVE_STATE_ADD_PAYLOAD:{},MEDIALIVE_STATE_ADD_SUCCESS:!1,MEDIALIVE_STATE_ADD_ERROR:!1,MEDIALIVE_STATE_ADD_MODEL:"N0_MODEL",MEDIALIVE_STATE_ADD_AWS_PAYLOAD:{},MEDIALIVE_STATE_ADD_AWS_SUCCESS:!1,MEDIALIVE_STATE_ADD_AWS_ERROR:!1,MEDIALIVE_STATE_AWS_MODEL:"N0_MODEL",MEDIALIVE_STATE_ADD_INPUT:{},MEDIALIVE_STATE_ADD_FORM_RESET:!1,MEDIALIVE_STATE_ADD_FORM_STRUCTURE:[],MEDIALIVE_STATE_ADD_LOADING:!1});var R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,n=arguments.length>1?arguments[1]:void 0;switch(console.log("Global reducer file being called"),n.type){case l:return e;case D:console.log("in MEDIALIVE_CONST_ADD in REDUCER :: action::: ",n),console.log("in MEDIALIVE_CONST_ADD in REDUCER :: action.struct ::: ",n.struct),console.log("in MEDIALIVE_CONST_ADD in REDUCER :: action.model ::: ",n.model),console.log("in MEDIALIVE_CONST_ADD in REDUCER :: action.awsModel ::: ",n.awsModel);var t={};return n.struct.map(function(e){return t[e.name]=""}),e.set("MEDIALIVE_STATE_ADD_MODEL",n.model).set("MEDIALIVE_STATE_AWS_MODEL",n.awsModel).set("MEDIALIVE_STATE_ADD_FORM_STRUCTURE",n.struct).set("MEDIALIVE_STATE_ADD_INPUT",t).set("MEDIALIVE_STATE_ADD_ERROR",!1);case _:return console.log("in MEDIALIVE_CONST_ADD_POST in REDUCER :: action::: ",n),console.log("in MEDIALIVE_CONST_ADD in REDUCER :: action.input ::: ",n.input),console.log("in MEDIALIVE_CONST_ADD in REDUCER :: action.model ::: ",n.model),e.set("MEDIALIVE_STATE_ADD_MODEL",n.model).set("MEDIALIVE_STATE_ADD_INPUT",n.input).set("MEDIALIVE_STATE_ADD_LOADING",!0).set("MEDIALIVE_STATE_ADD_ERROR",!1);case u:return console.log("in MEDIALIVE_CONST_ADD_ERROR in REDUCER,:: error ::: ",n.error),e.set("MEDIALIVE_STATE_ADD_LOADING",!1).set("MEDIALIVE_STATE_ADD_ERROR",n.error);case p:return console.log("In MEDIALIVE_CONST_ADD_SUCCESS in REDUCER,:: payload :::",n.payload),e.set("MEDIALIVE_STATE_ADD_LOADING",!1).set("MEDIALIVE_STATE_ADD_ERROR",!1).set("MEDIALIVE_STATE_ADD_SUCCESS",!0).set("MEDIALIVE_STATE_ADD_PAYLOAD",n.payload);case I:return console.log("in MEDIALIVE_CONST_ADD_AWS_POST in REDUCER :: action::: ",n),console.log("in MEDIALIVE_CONST_ADD_AWS_POST in REDUCER :: action.input ::: ",n.input),console.log("in MEDIALIVE_CONST_ADD_AWS_POST in REDUCER :: action.model ::: ",n.model),console.log("in MEDIALIVE_CONST_ADD_AWS_POST in REDUCER :: action.awsModel ::: ",n.awsModel),e.set("MEDIALIVE_STATE_ADD_MODEL",n.model).set("MEDIALIVE_STATE_ADD_AWS_MODEL",n.awsModel).set("MEDIALIVE_STATE_ADD_INPUT",n.input).set("MEDIALIVE_STATE_ADD_LOADING",!0).set("MEDIALIVE_STATE_ADD_ERROR",!1).set("MEDIALIVE_STATE_ADD_AWS_ERROR",!1);case S:return console.log("in MEDIALIVE_CONST_ADD_AWS_ERROR in REDUCER,:: error ::: ",n.error),e.set("MEDIALIVE_STATE_ADD_LOADING",!1).set("MEDIALIVE_STATE_ADD_AWS_ERROR",n.awsError).set("MEDIALIVE_STATE_ADD_ERROR",n.error);case T:return console.log("In MEDIALIVE_CONST_ADD_AWS_SUCCESS in REDUCER,:: payload :::",n.payload),e.set("MEDIALIVE_STATE_ADD_LOADING",!1).set("MEDIALIVE_STATE_ADD_AWS_ERROR",!1).set("MEDIALIVE_STATE_ADD_AWS_SUCCESS",!0).set("MEDIALIVE_STATE_ADD_AWS_PAYLOAD",n.awsPayload);case M:return console.log("in MEDIALIVE_CONST_ADD_FORM_INPUT in REDUCER :: action::: ",n),console.log("in MEDIALIVE_CONST_ADD_FORM_INPUT in REDUCER :: action.input ::: ",n.input),e.set("MEDIALIVE_STATE_ADD_INPUT",n.input).set("MEDIALIVE_STATE_ADD_LOADING",!0).set("MEDIALIVE_STATE_ADD_ERROR",!1).set("MEDIALIVE_STATE_ADD_AWS_ERROR",!1);case O:return console.log("in MEDIALIVE_CONST_ADD_FORM_RESET in REDUCER :: action.event ::: ",n),e.set("MEDIALIVE_STATE_ADD_INPUT",{}).set("MEDIALIVE_STATE_ADD_FORM_RESET",!0);default:return e}},h=function(e){return e.get("MediaLive",b)},C=t("6c68d13fe9e3e77d8fc4"),y=t("bbab4dac822a85b09bee"),V=regeneratorRuntime.mark(F),w=regeneratorRuntime.mark(W),N=regeneratorRuntime.mark(k),P=regeneratorRuntime.mark(J),x=regeneratorRuntime.mark(Y),U=Object({NODE_ENV:"production"}).API_URL||"https://aframework-api.herokuapp.com",j=U+"/api/orders";function F(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.e)(I,k);case 2:case"end":return e.stop()}},V,this)}function W(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.e)(_,J);case 2:case"end":return e.stop()}},w,this)}function k(e){var n,t,o,i,r,a;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(s.prev=0,console.log("MEDIALIVE_CONST_ADD_AWS_POST constant's action in saga is:: ",e),console.log("MEDIALIVE_CONST_ADD_AWS_POST constant's action.data in saga is:: ",e.input),console.log("MEDIALIVE_CONST_ADD_AWS_POST constant's action.model in saga is:: ",e.model),console.log("MEDIALIVE_CONST_ADD_AWS_POST constant's action.awsModel in saga is:: ",e.awsModel),void 0===e.input||void 0===e.model||void 0===e.awsModel){s.next=34;break}return n="".concat(U,"/api/").concat(e.model),t="".concat(U,"/api/").concat(e.awsModel),console.log("mediaLiveUrl:",n),console.log("mediaLiveAWSUrl:",t),s.next=12,Object(C.b)(fetch,n,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e.input)});case 12:return o=s.sent,s.next=15,Object(C.b)(fetch,t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e.input)});case 15:return i=s.sent,s.next=18,o.json();case 18:return r=s.sent,s.next=21,i.json();case 21:if(a=s.sent,console.log("responseBody of MEDIALIVE_CONST_ADD_POST_AWS in saga is",r),console.log("awsResponseBody of MEDIALIVE_CONST_ADD_POST_AWS in saga is",a),r.errors){s.next=29;break}return window.localStorage.setItem("MediaLive-data",JSON.stringify(r)),s.next=28,Object(C.c)(v(r));case 28:y.a.emit("add_data",r);case 29:if(a.errors){s.next=34;break}return window.localStorage.setItem("MediaLive-AWS-data",JSON.stringify(a)),s.next=33,Object(C.c)((d=a,console.log("in mediaLiveActionAddAwsSuccess in ACTION :: awsPayload :::",d),{type:T,awsPayload:d}));case 33:y.a.emit("add_aws_data",a);case 34:s.next=42;break;case 36:return s.prev=36,s.t0=s.catch(0),s.next=40,Object(C.c)(f(s.t0));case 40:return s.next=42,Object(C.c)((c=s.t0,console.log("in mediaLiveActionAddAwsError in ACTION :: awsError :::",c),{type:S,awsError:c}));case 42:case"end":return s.stop()}var c,d},N,this,[[0,36]])}function J(e){var n,t,o;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(i.prev=0,console.log("MEDIALIVE_CONST_ADD_POST constant's action in saga is:: ",e),console.log("MEDIALIVE_CONST_ADD constant's action.data in saga is:: ",e.input),console.log("MEDIALIVE_CONST_ADD_POST constant's action.model in saga is:: ",e.model),void 0===e.input||void 0===e.model){i.next=19;break}return n="".concat(U,"/api/").concat(e.model),console.log("mediaLiveUrl:",n),i.next=9,Object(C.b)(fetch,n,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e.input)});case 9:return t=i.sent,i.next=12,t.json();case 12:if(o=i.sent,console.log("responseBody of mediaLive_CONST_ADD_POST in saga is",o),o.errors){i.next=19;break}return window.localStorage.setItem("MediaLive-data",JSON.stringify(o)),i.next=18,Object(C.c)(v(o));case 18:y.a.emit("add_data",o);case 19:i.next=25;break;case 21:return i.prev=21,i.t0=i.catch(0),i.next=25,Object(C.c)(f(i.t0));case 25:case"end":return i.stop()}},P,this,[[0,21]])}function Y(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(C.a)([W(),F()]);case 2:case"end":return e.stop()}},x,this)}console.log("process.env.API_URL",Object({NODE_ENV:"production"}).API_URL),console.log("herokuAPIURL is","https://aframework-api.herokuapp.com"),console.log("url is ",j);var G,B=Object(s.defineMessages)({header:{id:"".concat("app.containers.MediaLive",".header"),defaultMessage:"This is the MediaLive container!"}});t("98b93ac8cd48bb0023f0");function z(e){return(z="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function H(e,n,t,o){G||(G="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,r=arguments.length-3;if(n||0===r||(n={children:void 0}),n&&i)for(var a in i)void 0===n[a]&&(n[a]=i[a]);else n||(n=i||{});if(1===r)n.children=o;else if(r>1){for(var s=new Array(r),c=0;c<r;c++)s[c]=arguments[c+3];n.children=s}return{$$typeof:G,type:e,key:void 0===t?null:""+t,ref:null,props:n,_owner:null}}function $(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function q(e){return(q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function K(e,n){return(K=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function Q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function X(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}t.d(n,"MediaLive",function(){return ie});var Z=H(a.Helmet,{},void 0,H("title",{},void 0,"MediaLive"),H("meta",{name:"description",content:"Description of MediaLive"})),ee=H("br",{}),ne=H("br",{}),te=H("button",{type:"submit"},void 0,"Submit"),oe=H(a.Helmet,{},void 0,H("title",{},void 0,"MediaLive"),H("meta",{name:"description",content:"Description of MediaLive"})),ie=function(e){function n(e){var t,o,i;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),o=this,i=q(n).call(this,e),t=!i||"object"!==z(i)&&"function"!==typeof i?Q(o):i,X(Q(Q(t)),"handleChange",function(e,n){n.preventDefault(),console.log("e.currentTarget.name:",n.currentTarget.name,"e.currentTarget.value",n.currentTarget.value);var o={};o[n.currentTarget.name]=n.currentTarget.value,setTimeout(function(){t.props.mediaLiveDispatchAddSetFormState(o)},10)}),X(Q(Q(t)),"addFormAPICall",function(e){e.preventDefault(),console.log("Add Form Data Method is invoked"),console.log("this.props.aws",t.props.awsModel);var n={};t.props.formStructure.map(function(t){return n[t.name]="".concat(e.target[t.name].value)}),setTimeout(function(){console.log("userInput in add is :",n),console.log("After input setInput mediaLive_STATE_ADD_INPUT in addFormApi Func is  :",t.props.mediaLivePropsAddInput),void 0==t.props.awsModel?(console.log("this.props.mediaLiveDispactchAddPost will be executed"),t.props.mediaLiveDispatchAddPost({model:t.props.model,input:n})):(console.log("this.props.mediaLiveDispactAddAwsPost will be executed"),t.props.mediaLiveDispatchAddAwsPost({model:t.props.model,awsModel:t.props.awsModel,input:n})),t.refs.form.reset()},200)}),t.state={render:"This is Default Add Form Render Space"},t}var t,o,r;return function(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&K(e,n)}(n,i.a.Component),t=n,(o=[{key:"componentDidMount",value:function(){this.props.mediaLiveDispatchAdd({awsModel:this.props.awsModel,model:this.props.model,struct:this.props.formStructure})}},{key:"render",value:function(){var e=this;return this.props.formStructure&&!0===this.props.deploy?H("div",{},void 0,Z,i.a.createElement(s.FormattedMessage,B.header),H("div",{},void 0,H("div",{},void 0,"Injected DB Model is :::",H("strong",{},void 0," ",this.props.mediaLivePropsAddModel)),H("div",{},void 0,"Injected AWS Action Route is :::",H("strong",{},void 0," ",this.props.mediaLivePropsAwsModel)),H("div",{},void 0,"Form Structure Passed on ::",H("pre",{},void 0,JSON.stringify(this.props.mediaLivePropsAddFormStructure))),H("div",{},void 0,H("p",{},void 0,"Submited Forms JSON Response :: ",ee,H("pre",{className:"jsonResponse"},void 0,JSON.stringify(this.props.mediaLivePropsAddPayload)))),H("div",{},void 0,H("p",{},void 0,"Submited Forms AWS JSON Response :: ",ne,H("pre",{className:"jsonAwsResponse"},void 0,JSON.stringify(this.props.mediaLivePropsAddAwsPayload)))),H("div",{},void 0,"User Input is ::",H("pre",{className:"userInput"},void 0,JSON.stringify(this.props.mediaLivePropsAddInput))),H("div",{},void 0,"Form Reset Status :::",H("strong",{},void 0," ",JSON.stringify(this.props.mediaLivePropsAddFormReset)))),H("div",{},void 0,i.a.createElement("form",{ref:"form",onSubmit:this.addFormAPICall},this.props.formStructure.map(function(n){return H("div",{},void 0,H("label",{},void 0,n.label),H("input",{className:"form-control",id:n.name,type:n.type,name:n.name,onChange:function(t){return e.handleChange(n.name,t)}}))}),te))):H("div",{},void 0,oe,i.a.createElement(s.FormattedMessage,B.header),H("div",{},void 0,H("pre",{})))}}])&&$(t.prototype,o),r&&$(t,r),n}(),re=Object(c.b)({mediaLivePropsAddPayload:Object(c.a)(h,function(e){return console.log("MEDIALIVE_STATE_ADD_PAYLOAD in SELECTOR:: :::",e.get("MEDIALIVE_STATE_ADD_PAYLOAD")),e.get("MEDIALIVE_STATE_ADD_PAYLOAD")}),mediaLivePropsAddAwsPayload:Object(c.a)(h,function(e){return console.log("MEDIALIVE_STATE_ADD_AWS_PAYLOAD in SELECTOR:: :::",e.get("MEDIALIVE_STATE_ADD_AWS_PAYLOAD")),e.get("MEDIALIVE_STATE_ADD_AWS_PAYLOAD")}),mediaLivePropsAddModel:Object(c.a)(h,function(e){return console.log("MEDIALIVE_STATE_ADD_MODEL in SELECTOR:: :::",e.get("MEDIALIVE_STATE_ADD_MODEL")),e.get("MEDIALIVE_STATE_ADD_MODEL")}),mediaLivePropsAwsModel:Object(c.a)(h,function(e){return console.log("MEDIALIVE_STATE_AWS_MODEL in SELECTOR:: :::",e.get("MEDIALIVE_STATE_AWS_MODEL")),e.get("MEDIALIVE_STATE_AWS_MODEL")}),mediaLivePropsAddFormStructure:Object(c.a)(h,function(e){return console.log("MEDIALIVE_STATE_ADD_FORM_STRUCTURE in SELECTOR:: :::",e.get("MEDIALIVE_STATE_ADD_FORM_STRUCTURE")),e.get("MEDIALIVE_STATE_ADD_FORM_STRUCTURE")}),mediaLivePropsAddInput:Object(c.a)(h,function(e){return console.log("MEDIALIVE_STATE_ADD_INPUT in SELECTOR:: :::",e.get("MEDIALIVE_STATE_ADD_INPUT")),e.get("MEDIALIVE_STATE_ADD_INPUT")}),mediaLivePropsAddFormReset:Object(c.a)(h,function(e){return console.log("MEDIALIVE_STATE_ADD_FORM_ITEM_RESET in SELECTOR:: :::",e.get("MEDIALIVE_STATE_ADD_FORM_RESET"),"MEDIALIVE_STATE_ADD_INPUT after reset in SELECTOR:: :::",e.get("MEDIALIVE_STATE_ADD_INPUT")),e.get("MEDIALIVE_STATE_ADD_FORM_RESET")})});var ae=Object(r.connect)(re,function(e){return{mediaLiveDispatchAdd:function(n){var t=n.struct,o=n.model,i=n.awsModel;return e(function(e){var n=e.struct,t=e.model,o=e.awsModel;return console.log("in mediaLiveActionAdd in ACTION :: struct :::",n),console.log("in mediaLiveActionAdd in ACTION :: model :::",t),console.log("in mediaLiveActionAdd in ACTION :: awsModel :::",o),{type:D,struct:n,model:t,awsModel:o}}({struct:t,model:o,awsModel:i}))},mediaLiveDispatchAddPost:function(n){var t=n.input,o=n.model;return e(function(e){var n=e.input,t=e.model;return console.log("in mediaLiveActionAddPost in ACTION :: input :::",n),console.log("in mediaLiveActionAddPost in ACTION :: model :::",t),{type:_,input:n,model:t}}({input:t,model:o}))},mediaLiveDispatchAddAwsPost:function(n){var t=n.input,o=n.model,i=n.awsModel;return e(function(e){var n=e.input,t=e.model,o=e.awsModel;return console.log("in mediaLiveActionAddAwsPost in ACTION :: input :::",n),console.log("in mediaLiveActionAddAwsPost in ACTION :: model :::",t),console.log("in mediaLiveActionAddAwsPost in ACTION :: awsModel :::",o),{type:I,input:n,model:t,awsModel:o}}({input:t,model:o,awsModel:i}))},mediaLiveDispatchAddSetFormState:function(n){return e(function(e){return console.log("in mediaLiveActionAddSetFormState in ACTION :: input :::",e),{type:M,input:e}}(n))},mediaLiveDispatchAddFormInputReset:function(){return e((console.log("in mediaLiveActionAddFormInputReset in ACTION is called without any parameter"),{type:O}))},mediaLiveDispatchAddFormStructure:function(n){var t=n.data;return e(function(e){return console.log("in mediaLiveActionAddFormStructure in ACTION :: data :::",e),{type:m,data:e}}({data:t}))},mediaLiveDispatchAddChangeModel:function(n){var t=n.model;return e(function(e){var n=e.model;return console.log("in mediaLiveActionAddChangeModel in ACTION :: model :::",n),{type:L,model:n}}({model:t}))}}}),se=Object(E.a)({key:"MediaLive",reducer:R}),ce=Object(A.a)({key:"MediaLive",saga:Y});n.default=Object(d.compose)(se,ce,ae)(ie)},"98b93ac8cd48bb0023f0":function(e,n,t){var o=t("9afbbe78332262b6136b");"string"===typeof o&&(o=[[e.i,o,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};t("1e4534d1d62a11482e97")(o,i);o.locals&&(e.exports=o.locals)},"9afbbe78332262b6136b":function(e,n,t){(e.exports=t("c138e55a31f3f8960e99")(!1)).push([e.i,' /* Style inputs, select elements and textareas */\n input[type=text],\n select,\n textarea {\n   width: 100%;\n   padding: 12px;\n   border: 1px solid #ccc;\n   border-radius: 4px;\n   box-sizing: border-box;\n   resize: vertical;\n }\n\n /* Style the input type number */\n input[type=number]::-webkit-inner-spin-button {\n   opacity: 1;\n   border: 1px solid #444;\n }\n\n /* Style the label to display next to the inputs */\n label {\n   padding: 12px 12px 12px 0;\n   display: inline-block;\n }\n\n /* Style the submit button */\n input[type=submit] {\n   background-color: #4CAF50;\n   color: white;\n   padding: 12px 20px;\n   border: none;\n   border-radius: 4px;\n   cursor: pointer;\n   float: right;\n }\n\n button[type=submit] {\n   background-color: #4CAF50;\n   color: white;\n   padding: 12px 20px;\n   border: none;\n   border-radius: 4px;\n   cursor: pointer;\n   float: right;\n }\n\n /* Style the container */\n .container {\n   border-radius: 5px;\n   background-color: #f2f2f2;\n   padding: 20px;\n }\n\n /* Floating column for labels: 25% width */\n .col-25 {\n   float: left;\n   width: 25%;\n   margin-top: 6px;\n }\n\n /* Floating column for inputs: 75% width */\n .col-75 {\n   float: left;\n   width: 75%;\n   margin-top: 6px;\n }\n\n /* Clear floats after the columns */\n .row:after {\n   content: "";\n   display: table;\n   clear: both;\n }\n\n /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */\n @media screen and (max-width: 600px) {\n\n   .col-25,\n   .col-75,\n   input[type=submit] {\n     width: 100%;\n     margin-top: 0;\n   }\n }\n\n /* Custom Css for MediaLive containers */\n\n pre {\n   background: #ebebeb;\n   border: 1px solid aaa;\n   font-family: "Monaco";\n   font-size: 12px;\n   color: rgb(81, 98, 81);\n   padding: 20px;\n   line-height: 28px;\n   white-space: pre-wrap;\n   margin: 1em 0;\n   display: block;\n   word-wrap: break-word;\n }\n\n\n .jsonAwsResponse {\n   color: rgb(68, 126, 235);\n }\n\n .jsonResponse {\n   color: rgb(190, 142, 31);\n }\n\n .userInput {\n   color: rgb(219, 81, 39);\n }\n',""])}}]);