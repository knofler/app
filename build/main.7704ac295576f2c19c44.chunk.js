(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{0:function(e,t){},"0785de3f40b134973d35":function(e,t,n){var r=n("ab039aecd4a1d4fedc0e").addLocaleData,a=n("58d82b287428be065a42"),o=n("529d37966b19afdce782"),i=n("7dd68a64079d1d4cd439"),l=n("2e499298bcfce3b3045c");r(a),r(o);var c=function e(t,n){var r="en"!==t?e("en",i):{};return Object.keys(n).reduce(function(e,a){var o=n[a]||"en"===t?n[a]:r[a];return Object.assign(e,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},a,o))},{})},s={en:c("en",i),de:c("de",l)};t.appLocales=["en","de"],t.formatTranslationMessages=c,t.translationMessages=s,t.DEFAULT_LOCALE="en"},"0cbc23df16a5c6ceec4d":function(e,t,n){e.exports=n.p+".htaccess"},1:function(e,t,n){n("5b15df55c1316f23e9d0"),e.exports=n("8b703812aa8ae3c41814")},"2e499298bcfce3b3045c":function(e){e.exports={"boilerplate.components.Footer.author.message":"Mit Liebe gemacht von {author}.","boilerplate.components.Footer.license.message":"Dieses Projekt wird unter der MIT-Lizenz ver\xf6ffentlicht.","boilerplate.components.Header.features":"","boilerplate.components.Header.home":"","boilerplate.containers.FeaturePage.css.header":"","boilerplate.containers.FeaturePage.css.message":"Die n\xe4chste Generation von CSS","boilerplate.containers.FeaturePage.feedback.header":"Sofortiges Feedback","boilerplate.containers.FeaturePage.feedback.message":"Genie\xdfen Sie die beste Entwicklungserfahrung und programmieren Sie Ihre App so schnell wie noch nie! Ihre \xc4nderungen an dem CSS und JavaScript sind sofort reflektiert, ohne die Seite aktualisieren zu m\xfcssen. So bleibt der Anwendungszustand bestehen, auch wenn Sie etwas in dem darunter liegenden Code aktualisieren!","boilerplate.containers.FeaturePage.header":"","boilerplate.containers.FeaturePage.internationalization.header":"Komplette i18n Standard-Internationalisierung und Pluralisierung","boilerplate.containers.FeaturePage.internationalization.message":"Das Internet ist global. Mehrsprachige- und Pluralisierungsunterst\xfctzung ist entscheidend f\xfcr gro\xdfe Web-Anwendungen.","boilerplate.containers.FeaturePage.javascript.header":"Das Internet ist global. Mehrsprachige- und Pluralisierungsunterst\xfctzung ist entscheidend f\xfcr gro\xdfe Web-Anwendungen.","boilerplate.containers.FeaturePage.javascript.message":"Benutzen Sie ES6 template strings, object destructuring, arrow functions, JSX syntax und mehr, heute.","boilerplate.containers.FeaturePage.network.header":"","boilerplate.containers.FeaturePage.network.message":"The next frontier in performant web apps: availability without a\n      network connection from the instant your users load the app.","boilerplate.containers.FeaturePage.routing.header":"Standard Routing","boilerplate.containers.FeaturePage.routing.message":"Schreiben Sie CSS, das am selben Ort wie ihre Komponenten ist. Deterministisch generierte, einzigartige Klassennamen halten die Spezifit\xe4t niedrig w\xe4hrend styling Konflikte vermieden werden. Senden Sie nur das CSS an ihre Benutzer welches dann wirklich sichtbar ist f\xfcr die schnellste Performance!","boilerplate.containers.FeaturePage.scaffolding.header":"Schnelles Scaffolding","boilerplate.containers.FeaturePage.scaffolding.message":"Automatisieren Sie die Kreation von Komponenten, Containern, Routen, Selektoren und Sagas \u2013 und ihre Tests \u2013 direkt von dem Terminal!","boilerplate.containers.FeaturePage.state_management.header":"Berechenbare Stateverwaltung","boilerplate.containers.FeaturePage.state_management.message":"Unidirectional data flow erlaubt uns alle \xc4nderungen ihrer Applikation zu loggen und time travel debugging einzusetzen.","boilerplate.containers.HomePage.start_project.header":"Beginnen Sie Ihr n\xe4chstes React Projekt in Sekunden","boilerplate.containers.HomePage.start_project.message":"Ein skalierendes, offline-first Fundament mit der besten DX und einem Fokus auf Performance und bew\xe4hrte Methoden","boilerplate.containers.HomePage.tryme.atPrefix":"","boilerplate.containers.HomePage.tryme.header":"Probiere mich!","boilerplate.containers.HomePage.tryme.message":"Zeige die Github Repositories von","boilerplate.containers.LocaleToggle.de":"","boilerplate.containers.LocaleToggle.en":"","boilerplate.containers.NotFoundPage.header":"Seite nicht gefunden."}},"491cc2e27aa2b4221847":function(e,t,n){"use strict";var r=n("4e2e9348dad8fe460c1d"),a=n("accfe20dac886d57b695"),o=n("5e98cee1846dbfd41421"),i=n("54f683fcda7806277002"),l=n("fcb99a06256635f70435"),c=Object(i.fromJS)({loading:!1,error:!1,currentUser:!1,userData:{repositories:!1}});var s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case l.a:return e.set("loading",!0).set("error",!1).setIn(["userData","repositories"],!1);case l.c:return e.setIn(["userData","repositories"],t.repos).set("loading",!1).set("currentUser",t.username);case l.b:return e.set("error",t.error).set("loading",!1);default:return e}},d=n("511b2e46256d95d30278");function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(r.combineReducers)(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){u(e,t,n[t])})}return e}({global:s,language:d.a},e));return Object(a.connectRouter)(o.a)(t)}n.d(t,"a",function(){return f})},"511b2e46256d95d30278":function(e,t,n){"use strict";n.d(t,"b",function(){return i});var r=n("54f683fcda7806277002"),a=n("54d1ddf528754c269c3f"),o=n("0785de3f40b134973d35"),i=Object(r.fromJS)({locale:o.DEFAULT_LOCALE});t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case a.a:return e.set("locale",t.locale);default:return e}}},"54d1ddf528754c269c3f":function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r="app/LanguageToggle/CHANGE_LOCALE"},"5e98cee1846dbfd41421":function(e,t,n){"use strict";var r=n("89fa59dfd48f288c4600"),a=n.n(r)()();t.a=a},"6c074f91ad5b62e00274":function(e,t,n){"use strict";var r=n("0b3cb19af78752326f59").c.a.withConfig({displayName:"A",componentId:"br8h0y-0"})(["color:#41addd;&:hover{color:#6cc0e5;}"]);t.a=r},"7dd68a64079d1d4cd439":function(e){e.exports={"boilerplate.components.Footer.author.message":"React Boiler Plate For Rapid development by {author}.","boilerplate.components.Footer.license.message":"This project is licensed under the MIT license.","boilerplate.components.Header.features":"Features","boilerplate.components.Header.home":"Home","boilerplate.containers.FeaturePage.css.header":"Features","boilerplate.containers.FeaturePage.css.message":"Next generation CSS","boilerplate.containers.FeaturePage.feedback.header":"Instant feedback","boilerplate.containers.FeaturePage.feedback.message":"Enjoy the best DX and code your app at the speed of thought! Your\n    saved changes to the CSS and JS are reflected instantaneously\n    without refreshing the page. Preserve application state even when\n    you update something in the underlying code!","boilerplate.containers.FeaturePage.header":"Features","boilerplate.containers.FeaturePage.internationalization.header":"Complete i18n Standard Internationalization & Pluralization","boilerplate.containers.FeaturePage.internationalization.message":"Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`.","boilerplate.containers.FeaturePage.javascript.header":"Next generation JavaScript","boilerplate.containers.FeaturePage.javascript.message":"Use template strings, object destructuring, arrow functions, JSX\n    syntax and more, today.","boilerplate.containers.FeaturePage.network.header":"Offline-first","boilerplate.containers.FeaturePage.network.message":"The next frontier in performant web apps: availability without a\n      network connection from the instant your users load the app.","boilerplate.containers.FeaturePage.routing.header":"Industry-standard routing","boilerplate.containers.FeaturePage.routing.message":"Write composable CSS that's co-located with your components for\n    complete modularity. Unique generated class names keep the\n    specificity low while eliminating style clashes. Ship only the\n    styles that are on the page for the best performance.","boilerplate.containers.FeaturePage.scaffolding.header":"Quick scaffolding","boilerplate.containers.FeaturePage.scaffolding.message":"Automate the creation of components, containers, routes, selectors\n  and sagas - and their tests - right from the CLI!","boilerplate.containers.FeaturePage.state_management.header":"Predictable state management","boilerplate.containers.FeaturePage.state_management.message":"Unidirectional data flow allows for change logging and time travel\n    debugging.","boilerplate.containers.HomePage.start_project.header":"Start your next react project in seconds","boilerplate.containers.HomePage.start_project.message":"A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices","boilerplate.containers.HomePage.tryme.atPrefix":"@","boilerplate.containers.HomePage.tryme.header":"Try me!","boilerplate.containers.HomePage.tryme.message":"Show Github repositories by","boilerplate.containers.LocaleToggle.de":"de","boilerplate.containers.LocaleToggle.en":"en","boilerplate.containers.NotFoundPage.header":"Page not found."}},"8b703812aa8ae3c41814":function(e,t,n){"use strict";n.r(t);n("8c8e4f08a118a28666b0");var r,a=n("8af190b70a6bc55c6f1b"),o=n.n(a),i=n("63f14ac74ce296f77f4d"),l=n.n(i),c=n("d7dd51e1bf6bfc2c9c3d"),s=n("accfe20dac886d57b695"),d=n("260f3680b921ede7f717"),u=n.n(d),f=n("5e98cee1846dbfd41421"),p=(n("6735bdf1a3a541ab43fd"),n("0d7f0986bcd2f33d8a2a")),b=n("0b3cb19af78752326f59"),g=n("e95a63b25fb92ed15721"),m=n("be49ece3c9ac38c7621f"),h=n("8e4c85c29cdef1bf8a5f"),y=Object(m.a)(function(){return Promise.all([n.e(0),n.e(1),n.e(13)]).then(n.bind(null,"0b8eb3e35929778b339a"))},{LoadingComponent:h.a}),v=Object(m.a)(function(){return Promise.all([n.e(4),n.e(12)]).then(n.bind(null,"c1d9efc1d07c867a8b6b"))},{LoadingComponent:h.a}),w=Object(m.a)(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(7)]).then(n.bind(null,"1cfb065e3f0093031d06"))}),S=Object(m.a)(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(15)]).then(n.bind(null,"86e3be8872bced91b892"))}),P=Object(m.a)(function(){return Promise.all([n.e(0),n.e(1),n.e(11)]).then(n.bind(null,"d2e6de1f52755fe8e974"))}),j=Object(m.a)(function(){return Promise.all([n.e(4),n.e(14)]).then(n.bind(null,"8937ca26cad1b574ef33"))},{LoadingComponent:h.a}),O=n("ab039aecd4a1d4fedc0e"),k=n("6c074f91ad5b62e00274"),F=Object(b.c)(k.a).withConfig({displayName:"A",componentId:"p44m4v-0"})(["padding:2em 0;"]);n("8a2d1b95e05b6a321e74");var _,C=function(e){return function(e,t,n,a){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});if(1===i)t.children=a;else if(i>1){for(var c=new Array(i),s=0;s<i;s++)c[s]=arguments[s+3];t.children=c}return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}("img",{className:e.className,src:e.src,alt:e.alt})},A=Object(b.c)(C).withConfig({displayName:"Img",componentId:"sc-9pa8on-0"})(["width:100%;margin:0 auto;display:block;"]),x=(b.c.div.withConfig({displayName:"NavBar",componentId:"sc-3b48xb-0"})(["text-align:center;"]),Object(b.c)(g.Link).withConfig({displayName:"HeaderLink",componentId:"sc-1mtyaiv-0"})(["display:inline-flex;padding:0.25em 2em;margin:1em;text-decoration:none;border-radius:4px;-webkit-font-smoothing:antialiased;-webkit-touch-callout:none;user-select:none;cursor:pointer;outline:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:bold;font-size:16px;border:2px solid #41addd;color:#41addd;&:active{background:#41addd;color:#fff;}"]),n("ca56252dc30cc6e175db")),L=n.n(x),T="boilerplate.components.Header";Object(O.defineMessages)({home:{id:"".concat(T,".home"),defaultMessage:"Home"},features:{id:"".concat(T,".features"),defaultMessage:"Features"}});function I(e,t,n,r){_||(_="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===o)t.children=r;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}return{$$typeof:_,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}I(A,{src:L.a,alt:"react-boilerplate - Logo"});var R,M=n("a28fc3c963a1d4d1a2e5"),H=b.c.select.withConfig({displayName:"Select",componentId:"sc-1sm01tk-0"})(["line-height:1em;height:20px;"]);var E,z=Object(O.injectIntl)(function(e){var t=e.value,n=e.message,r=e.intl;return function(e,t,n,r){R||(R="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===o)t.children=r;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}return{$$typeof:R,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}("option",{value:t},void 0,n?r.formatMessage(n):t)});function N(e,t,n,r){E||(E="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===o)t.children=r;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}return{$$typeof:E,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var $=N("option",{},void 0,"--");var D=function(e){var t=$;return e.values&&(t=e.values.map(function(t){return N(z,{value:t,message:e.messages[t]},t)})),N(H,{value:e.value,onChange:e.onToggle},void 0,t)},B=b.c.div.withConfig({displayName:"Wrapper",componentId:"xnjoq9-0"})(["padding:2px;"]),J=Object(O.defineMessages)({en:{id:"".concat("boilerplate.containers.LocaleToggle",".en"),defaultMessage:"en"},de:{id:"".concat("boilerplate.containers.LocaleToggle",".de"),defaultMessage:"de"}}),U=n("0785de3f40b134973d35"),W=n("54d1ddf528754c269c3f");var G,K=n("511b2e46256d95d30278"),X=function(e){return e.get("language",K.b)},q=function(){return Object(M.a)(X,function(e){return e.get("locale")})};function Q(e){return(Q="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Y(e,t,n,r){G||(G="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===o)t.children=r;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}return{$$typeof:G,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function Z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function V(e,t){return!t||"object"!==Q(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ee(e){return(ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function te(e,t){return(te=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ne=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),V(this,ee(t).apply(this,arguments))}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&te(e,t)}(t,o.a.PureComponent),n=t,(r=[{key:"render",value:function(){return Y(B,{},void 0,Y(D,{value:this.props.locale,values:U.appLocales,messages:J,onToggle:this.props.onLocaleToggle}))}}])&&Z(n.prototype,r),a&&Z(n,a),t}(),re=Object(M.a)(q(),function(e){return{locale:e}});var ae,oe=Object(c.connect)(re,function(e){return{onLocaleToggle:function(t){return e((n=t.target.value,{type:W.a,locale:n}));var n},dispatch:e}})(ne),ie=b.c.footer.withConfig({displayName:"Wrapper",componentId:"wcfdfo-0"})(["display:flex;justify-content:space-between;padding:3em 0;border-top:1px solid #666;"]),le=Object(O.defineMessages)({licenseMessage:{id:"".concat("boilerplate.components.Footer",".license.message"),defaultMessage:"This project is licensed under the MIT license."},authorMessage:{id:"".concat("boilerplate.components.Footer",".author.message"),defaultMessage:"\n      React Boiler Plate For Rapid development by @author .\n    "}});function ce(){return(ce=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function se(e,t,n,r){ae||(ae="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===o)t.children=r;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}return{$$typeof:ae,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var de=se("section",{},void 0,se(oe,{})),ue=se(k.a,{href:"https://github.com/knofler"},void 0," knofler ");var fe=function(){return se(ie,{},void 0,se("section",{},void 0,o.a.createElement(O.FormattedMessage,le.licenseMessage)),de,se("section",{},void 0,o.a.createElement(O.FormattedMessage,ce({},le.authorMessage,{values:{author:ue}}))))};function pe(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  html,\n  body {\n    height: 100%;\n    width: 100%;\n  }\n\n  body {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  }\n\n  body.fontLoaded {\n    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  }\n\n  #app {\n    background-color: #fafafa;\n    min-height: 100%;\n    min-width: 100%;\n  }\n\n  p,\n  label {\n    font-family: Georgia, Times, 'Times New Roman', serif;\n    line-height: 1.5em;\n  }\n"]);return pe=function(){return e},e}var be,ge=Object(b.a)(pe());function me(e,t,n,r){be||(be="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===o)t.children=r;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}return{$$typeof:be,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var he,ye=b.c.div.withConfig({displayName:"App__AppWrapper",componentId:"sc-13edzow-0"})(["max-width:calc(768px + 16px * 2);margin:0 auto;display:flex;min-height:100%;padding:0 16px;flex-direction:column;"]),ve=me(p.Helmet,{titleTemplate:"%s - React.js Boilerplate",defaultTitle:"React.js Boilerplate"},void 0,me("meta",{name:"description",content:"A React.js Boilerplate application"})),we=me(g.Switch,{},void 0,me(g.Route,{exact:!0,path:"/",component:y})," ",me(g.Route,{path:"/features",component:v})," ",me(g.Route,{path:"/read",component:w})," ",me(g.Route,{path:"/search",component:S})," ",me(g.Route,{path:"/auth",component:P})," ",me(g.Route,{path:"",component:j})," "),Se=me(fe,{}),Pe=me(ge,{});function je(e){return(je="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Oe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ke(e,t){return!t||"object"!==je(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function Fe(e){return(Fe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _e(e,t){return(_e=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Ce=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),ke(this,Fe(t).apply(this,arguments))}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_e(e,t)}(t,o.a.PureComponent),n=t,(r=[{key:"render",value:function(){return function(e,t,n,r){he||(he="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===o)t.children=r;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}return{$$typeof:he,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}(O.IntlProvider,{locale:this.props.locale,messages:this.props.messages[this.props.locale]},this.props.locale,o.a.Children.only(this.props.children))}}])&&Oe(n.prototype,r),a&&Oe(n,a),t}(),Ae=Object(M.a)(q(),function(e){return{locale:e}}),xe=Object(c.connect)(Ae)(Ce),Le=(n("9c6be9f00377ac8be3d8"),n("0cbc23df16a5c6ceec4d"),n("ab4cb61bcb2dc161defb")),Te=n("54f683fcda7806277002"),Ie=n("74431d47afb6248fcb69"),Re=n("491cc2e27aa2b4221847");var Me,He=Object(Ie.a)();function Ee(e,t,n,r){Me||(Me="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(t||0===o||(t={children:void 0}),t&&a)for(var i in a)void 0===t[i]&&(t[i]=a[i]);else t||(t=a||{});if(1===o)t.children=r;else if(o>1){for(var l=new Array(o),c=0;c<o;c++)l[c]=arguments[c+3];t.children=l}return{$$typeof:Me,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}new u.a("Open Sans",{}).load().then(function(){document.body.classList.add("fontLoaded")});var ze=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=[He,Object(s.routerMiddleware)(t)],r=[Le.applyMiddleware.apply(void 0,n)],a=Le.compose,o=Object(Le.createStore)(Object(Re.a)(),Object(Te.fromJS)(e),a.apply(void 0,r));return o.runSaga=He.run,o.injectedReducers={},o.injectedSagas={},o}({},f.a),Ne=document.getElementById("app"),$e=Ee(s.ConnectedRouter,{history:f.a},void 0,Ee(function(){return me(ye,{},void 0,ve," ",we," ",Se,Pe)},{})),De=function(e){l.a.render(Ee(c.Provider,{store:ze},void 0,Ee(xe,{messages:e},void 0,$e)),Ne)};window.Intl?De(U.translationMessages):new Promise(function(e){e(Promise.all([n.e(0),n.e(16)]).then(n.t.bind(null,"97694e21b72f8e9351c4",7)))}).then(function(){return Promise.all([n.e(0).then(n.t.bind(null,"f030ad8f70186ef5cb63",7)),n.e(0).then(n.t.bind(null,"14584c41c196d3540f41",7))])}).then(function(){return De(U.translationMessages)}).catch(function(e){throw e}),n("30d14b3a3295666f3aba").install()},"8e4c85c29cdef1bf8a5f":function(e,t,n){"use strict";n("8af190b70a6bc55c6f1b"),n("8a2d1b95e05b6a321e74");var r,a=n("0b3cb19af78752326f59");var o,i=Object(a.d)(["0%,39%,100%{opacity:0;}40%{opacity:1;}"]),l=Object(a.b)([""," 1.2s infinite ease-in-out both;"],i),c=function(e){return function(e,t,n,a){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});if(1===i)t.children=a;else if(i>1){for(var c=new Array(i),s=0;s<i;s++)c[s]=arguments[s+3];t.children=c}return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}(a.c.div.withConfig({displayName:"Circle__CirclePrimitive",componentId:"ww56dy-0"})(["width:100%;height:100%;position:absolute;left:0;top:0;"," &:before{content:'';display:block;margin:0 auto;width:15%;height:15%;background-color:#999;border-radius:100%;animation:",";",";}"],e.rotate&&"\n      -webkit-transform: rotate(".concat(e.rotate,"deg);\n      -ms-transform: rotate(").concat(e.rotate,"deg);\n      transform: rotate(").concat(e.rotate,"deg);\n    "),l,e.delay&&"\n        -webkit-animation-delay: ".concat(e.delay,"s;\n        animation-delay: ").concat(e.delay,"s;\n      ")),{})};function s(e,t,n,r){o||(o="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&a)for(var l in a)void 0===t[l]&&(t[l]=a[l]);else t||(t=a||{});if(1===i)t.children=r;else if(i>1){for(var c=new Array(i),s=0;s<i;s++)c[s]=arguments[s+3];t.children=c}return{$$typeof:o,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var d=s(a.c.div.withConfig({displayName:"Wrapper",componentId:"sc-12uw37d-0"})(["margin:2em auto;width:40px;height:40px;position:relative;"]),{},void 0,s(c,{}),s(c,{rotate:30,delay:-1.1}),s(c,{rotate:60,delay:-1}),s(c,{rotate:90,delay:-.9}),s(c,{rotate:120,delay:-.8}),s(c,{rotate:150,delay:-.7}),s(c,{rotate:180,delay:-.6}),s(c,{rotate:210,delay:-.5}),s(c,{rotate:240,delay:-.4}),s(c,{rotate:270,delay:-.3}),s(c,{rotate:300,delay:-.2}),s(c,{rotate:330,delay:-.1}));t.a=function(){return d}},"9c6be9f00377ac8be3d8":function(e,t,n){e.exports=n.p+"favicon.ico"},ca56252dc30cc6e175db:function(e,t,n){e.exports=n.p+"2f1a976c9c35ffed9b7e23cf2cbf8f19.jpg"},fcb99a06256635f70435:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"c",function(){return a}),n.d(t,"b",function(){return o});var r="boilerplate/App/LOAD_REPOS",a="boilerplate/App/LOAD_REPOS_SUCCESS",o="boilerplate/App/LOAD_REPOS_ERROR"}},[[1,6,0]]]);