(this.webpackJsonpmath=this.webpackJsonpmath||[]).push([[0],{13:function(e,t,a){e.exports=a(24)},18:function(e,t,a){},19:function(e,t,a){},24:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(10),s=a.n(r),o=(a(18),a(1)),i=a(12),l=a(3),u=a(11),m="FAILED",b="SUCCESS";function d(e){var t=e.onFinish,a=e.initialOptions,r=e.nToUse,s=e.gameId,i=Object(n.useState)(),d=Object(o.a)(i,2),p=d[0],O=d[1],j=Object(n.useState)(),v=Object(o.a)(j,2),S=v[0],E=v[1],g=Object(n.useState)({}),N=Object(o.a)(g,2),w=N[0],I=N[1],M=Object(n.useState)(!1),k=Object(o.a)(M,2),y=k[0],z=k[1];return Object(n.useEffect)((function(){var e=f(a,r);O(e),E(e.reduce((function(e,t){return e+t}),0))}),[s,a,r]),c.a.createElement("span",{className:"big-game-container"},c.a.createElement("span",{className:"game-sum"},S),c.a.createElement("header",{className:"game-container"},a.map((function(e){return c.a.createElement("button",{className:"num ".concat(w[e]?"disabled":""," ").concat(y&&p.includes(e)?"part-of-solution":""),disabled:w[e],onClick:function(){var n=S-e;I(Object(u.a)({},w,Object(l.a)({},e,!0))),h(a.filter((function(t){return!w[t]&&t!==e})),n)?0===n?t(b):E(n):(setTimeout((function(){return t(m)}),2e3),z(!0))}},e)}))))}var f=function(e,t){return function(e,t){for(var a=Object(i.a)(e),n=a.length-1;n>0;n--){var c=Math.floor(Math.random()*n),r=a[n];a[n]=a[c],a[c]=r}return a.slice(0,t)}(e,t)};var h=function e(t,a){return 0===a||!(a>0&&0===t.length)&&(!(a<0)&&(e(t.slice(1),a-t[0])||e(t.slice(1),a)))},p=(a(19),a(5));a(21);p.initializeApp({apiKey:"AIzaSyC8ZXJBanm83WVhdbYnrSR_gV7QDNR7NzY",authDomain:"math-a7cdc.firebaseapp.com",databaseURL:"https://math-a7cdc.firebaseio.com",projectId:"math-a7cdc",storageBucket:"math-a7cdc.appspot.com",messagingSenderId:"438256651307",appId:"1:438256651307:web:2bde54ba227715a1d7ee6e",measurementId:"G-HG898MJZF7"});var O=p.database().ref("/users/zohar"),j=[1,3,5,7,11,13,16,19,23],v=function(){return c.a.createElement("div",{className:"game-container",style:{fontSize:36}},"SUCCESS!!! :) :)")},S=function(){return c.a.createElement("div",{className:"game-container",style:{fontSize:36}},"Failed!!! :( :(")},E=function(){var e=Object(n.useState)(),t=Object(o.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(),i=Object(o.a)(s,2),l=i[0],u=i[1],f=Object(n.useState)(),h=Object(o.a)(f,2),p=h[0],E=h[1],g=Object(n.useState)(),N=Object(o.a)(g,2),w=N[0],I=N[1],M=Object(n.useState)(),k=Object(o.a)(M,2),y=k[0],z=k[1],C=Object(n.useState)(),F=Object(o.a)(C,2),U=F[0],B=F[1],J=Object(n.useState)(!1),T=Object(o.a)(J,2),A=T[0],D=T[1],L=Object(n.useState)(1),R=Object(o.a)(L,2),W=R[0],$=R[1];return Object(n.useEffect)((function(){O.on("value",(function(e){var t=e.val();B(t.name),u(t.score),r(t.level),D(t.simpleMode)}));var e=a+1,t=Math.min(j.length,2*(a+1)),n=A?1:Math.ceil(Math.random()*(t-e))+e,c=Math.ceil(Math.random()*j.length*a);I(n),E(c)}),[U,l,a,A]),U?c.a.createElement("span",{className:"app-container"},c.a.createElement("span",{className:"stats-container"},c.a.createElement("div",{className:"stat"},"$",l),c.a.createElement("div",{className:"stat"},"$",p),c.a.createElement("div",{className:"stat"},U)),y===m?c.a.createElement(S,null):y===b?c.a.createElement(v,null):c.a.createElement(d,{nToUse:w,initialOptions:j,gameId:W,onFinish:function(e){z(e),setTimeout((function(){z(),$(W+1)}),2e3);var t=e===b?l+p:l-p;O.update({score:t})}})):c.a.createElement("span",null,"Loadings...")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[13,1,2]]]);
//# sourceMappingURL=main.0001c42b.chunk.js.map