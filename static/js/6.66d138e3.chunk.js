(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{452:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(108),c=t(3),s=t(275),u=t(450),m=t(448),o=t(204),i=t(432),d=new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"),E=function(){return r.a.createElement("div",null,r.a.createElement(p,null),r.a.createElement(h,null))},p=function(){var e=Object(n.useState)([]),a=Object(c.a)(e,2),t=a[0],s=a[1];return Object(n.useEffect)(function(){d.addEventListener("message",function(e){var a=JSON.parse(e.data);s(function(e){return[].concat(Object(l.a)(e),Object(l.a)(a))})})},[]),r.a.createElement("div",{style:{height:"600px",overflowY:"auto"}},t.map(function(e,a){return r.a.createElement(f,{message:e,key:"".concat(a,"_").concat(e.userId,"_").concat(e.message)})}))},f=function(e){var a=e.message;return r.a.createElement("div",null,a.photo?r.a.createElement("img",{src:a.photo,alt:"User avatar",style:{width:"32px",borderRadius:"6px"}}):r.a.createElement(s.a,{size:32,shape:"square",icon:r.a.createElement(i.a,null)}),r.a.createElement("b",null,a.userName),r.a.createElement("p",null,a.message),r.a.createElement("hr",null))},h=function(){var e=u.a.TextArea;return r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(m.a,{name:"addMessageForm",onFinish:function(e){d.send(e.message)},onFinishFailed:function(e){console.log("Failed:",e)},autoComplete:"off"},r.a.createElement(m.a.Item,{name:"message",rules:[{required:!0,message:"Please input your message!"}]},r.a.createElement(e,{rows:4})),r.a.createElement(m.a.Item,null,r.a.createElement(o.a,{type:"primary",htmlType:"submit"},"Send"))))};a.default=function(){return r.a.createElement("div",null,r.a.createElement(E,null))}}}]);
//# sourceMappingURL=6.66d138e3.chunk.js.map