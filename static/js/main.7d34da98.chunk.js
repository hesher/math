(this.webpackJsonpmath=this.webpackJsonpmath||[]).push([[0],{13:function(e,t,a){e.exports=a(25)},18:function(e,t,a){},19:function(e,t,a){e.exports=a.p+"static/media/logo.25bf045c.svg"},20:function(e,t,a){},25:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(10),s=a.n(o),i=(a(18),a(12)),r=a(3),l=a(11),u=a(1),m=(a(19),a(20),a(5));a(22);m.initializeApp({apiKey:"AIzaSyC8ZXJBanm83WVhdbYnrSR_gV7QDNR7NzY",authDomain:"math-a7cdc.firebaseapp.com",databaseURL:"https://math-a7cdc.firebaseio.com",projectId:"math-a7cdc",storageBucket:"math-a7cdc.appspot.com",messagingSenderId:"438256651307",appId:"1:438256651307:web:2bde54ba227715a1d7ee6e",measurementId:"G-HG898MJZF7"});var b=m.database().ref("/users/jonathan"),d="FAILED",f="SUCCESS",h=[1,3,5,7,11,13,16],p=function(e){var t=e.onFinish,a=e.initialOptions,o=e.nToUse,s=e.gameId,i=Object(n.useState)(),m=Object(u.a)(i,2),b=m[0],p=m[1],v=Object(n.useState)(),S=Object(u.a)(v,2),g=S[0],E=S[1],N=Object(n.useState)({}),w=Object(u.a)(N,2),I=w[0],M=w[1],k=Object(n.useState)(!1),y=Object(u.a)(k,2),C=y[0],z=y[1];return Object(n.useEffect)((function(){var e=j(a,o);p(e),E(e.reduce((function(e,t){return e+t}),0))}),[s,a,o]),c.a.createElement("span",null,"Sum = ",g,c.a.createElement("header",{className:"game-container"},a.map((function(e){return c.a.createElement("button",{className:"num ".concat(I[e]?"disabled":""," ").concat(C&&b.includes(e)?"part-of-solution":""),disabled:I[e],onClick:function(){var a=g-e;M(Object(l.a)({},I,Object(r.a)({},e,!0))),O(h.filter((function(e){return!I[e]})),a)?0===a?t(f):E(a):(console.log("hasSolution([".concat(h,"], ").concat(a,")")),setTimeout((function(){return t(d)}),2e3),z(!0))}},e)}))))},j=function(e,t){return function(e,t){for(var a=Object(i.a)(e),n=a.length-1;n>0;n--){var c=Math.floor(Math.random()*n),o=a[n];a[n]=a[c],a[c]=o}return a.slice(0,t)}(e,t)};var O=function e(t,a){return 0===a||!(a>0&&0===t.length)&&(!(a<0)&&(e(t.slice(1),a-t[0])||e(t.slice(1),a)))},v=function(){return c.a.createElement("div",{className:"game-container",style:{fontSize:36}},"SUCCESS!!! :) :)")},S=function(){return c.a.createElement("div",{className:"game-container",style:{fontSize:36}},"Failed!!! :( :(")},g=function(){var e=Object(n.useState)(),t=Object(u.a)(e,2),a=t[0],o=t[1],s=Object(n.useState)(),i=Object(u.a)(s,2),r=i[0],l=i[1],m=Object(n.useState)(),j=Object(u.a)(m,2),O=j[0],g=j[1],E=Object(n.useState)(),N=Object(u.a)(E,2),w=N[0],I=N[1],M=Object(n.useState)(),k=Object(u.a)(M,2),y=k[0],C=k[1],z=Object(n.useState)(),F=Object(u.a)(z,2),U=F[0],B=F[1],J=Object(n.useState)(!1),T=Object(u.a)(J,2),A=T[0],D=T[1],L=Object(n.useState)(1),R=Object(u.a)(L,2),W=R[0],x=R[1];return Object(n.useEffect)((function(){b.on("value",(function(e){var t=e.val();B(t.name),l(t.score),o(t.level),D(t.simpleMode)}));var e=a+1,t=Math.min(h.length,2*(a+1)),n=A?1:Math.ceil(Math.random()*(t-e))+e,c=Math.ceil(Math.random()*h.length*a);I(n),g(c)}),[U,r,a,A]),U?c.a.createElement("span",{className:"app-container"},c.a.createElement("span",{className:"stats-container"},c.a.createElement("div",{className:"stat"},r),c.a.createElement("div",{className:"stat"},"$",O),c.a.createElement("div",{className:"stat"},U)),y===d?c.a.createElement(S,null):y===f?c.a.createElement(v,null):c.a.createElement(p,{nToUse:w,initialOptions:h,gameId:W,onFinish:function(e){C(e),setTimeout((function(){C(),x(W+1)}),2e3);var t=e===f?r+O:r-O;b.update({score:t})}})):c.a.createElement("span",null,"Loadings...")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[13,1,2]]]);
//# sourceMappingURL=main.7d34da98.chunk.js.map