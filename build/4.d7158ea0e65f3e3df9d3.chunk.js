(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{3:function(n,e){},bbab4dac822a85b09bee:function(n,e,o){"use strict";o.d(e,"a",function(){return r}),o.d(e,"b",function(){return u});var t=o("4f2b817c1303ec11374d"),c=o.n(t),i=Object({NODE_ENV:"production"}).API_URL||"https://mernaircanteen.herokuapp.com";console.log("getUrl in Socket is :",i);var r=c()(i);function u(n){r.on("timer",function(e){return n(null,e)}),r.emit("subscribeToTimer",1e4)}}}]);