(function(){"use strict";var t={4580:function(t,e,r){var a=r(144),s=r(629),o=r(4702),n=r(1955);a.Z.use(s.ZP);var i=new s.ZP.Store({state:{dark:null},mutations:{mutationDark(t,e){t.dark=e}},actions:{},modules:{},plugins:[(0,o.Z)({storage:{getItem:t=>n.Z.get(t),setItem:(t,e)=>n.Z.set(t,e,{expires:3,secure:!0}),removeItem:t=>n.Z.remove(t)}})]}),l=r(8864),c=r(2638);a.Z.use(l.Z);var d=new l.Z({theme:{dark:!1,themes:{light:{base:c.Z.purple.base,primary:c.Z.purple,secondary:c.Z.grey.darken1,accent:c.Z.shades.black,error:c.Z.red.accent3},dark:{base:c.Z.purple.base,primary:c.Z.purple}}}}),u=r(5205);(0,u.z)("static/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}});var p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-app",[t.error?r("div",{staticClass:"text-center pt-4"},[r("h1",[t._v("服务器不在线")])]):r("server-info",{attrs:{query_data:t.data,loading:t.loading,join_open:t.join_open}}),t.demo?r("v-fade-transition",[r("v-overlay",{attrs:{absolute:"",color:"grey darken-1",opacity:"0.4"}},[r("span",{staticClass:"title"},[t._v("预览图")])])],1):t._e()],1)],1)},v=[],f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"server-info"}},[a("v-card",{attrs:{disabled:t.loading,loading:t.loading,elevation:"0"}},[a("v-card-text",[a("div",{staticClass:"d-flex"},[a("v-card",{attrs:{elevation:"0",height:"80"}},[null==this.query_data||!0!==this.query_data.status?a("v-img",{attrs:{"aspect-ratio":1,"lazy-src":r(7071),src:r(7071),width:"80"}}):a("v-img",{attrs:{"aspect-ratio":1,"lazy-src":r(6134),src:r(6134),width:"80"}})],1),!0!==this.loading&&null!==this.query_data&&!0===this.query_data.status?a("div",{staticClass:"ml-4"},[a("h2",{staticClass:"title",domProps:{innerHTML:t._s(t.text_format(this.query_data.motd))}}),a("div",{staticClass:"text-subtitle-1"},[a("v-icon",{attrs:{size:"16"}},[t._v("mdi-server")]),t._v(" "+t._s(this.query_data.host)+" ")],1),a("div",{staticClass:"text-subtitle-2"},[a("v-icon",{attrs:{size:"16"}},[t._v("mdi-gamepad")]),t._v(" MCBE: "+t._s(this.query_data.version)+" | "),t.join_open&&this.$vuetify.breakpoint.smAndDown?[a("v-btn",{staticClass:"pb-1",attrs:{color:"primary",small:"",text:"",elevation:"0"},on:{click:function(e){t.dialog=!0}}},[t._v(" 加入服务器 ")])]:[t._v(" Protocol: "+t._s(this.query_data.agreement)+" ")]],2)]):!0===t.loading?a("div",{staticClass:"ml-4"},[a("h2",{staticClass:"title"},[t._v("正在加载")]),a("div",{staticClass:"text-subtitle-1"},[t._v(" 如果迟迟不响应，请刷新页面重试，也许是api炸了呢 ")])]):a("div",{staticClass:"ml-4"},[a("h2",{staticClass:"title"},[t._v("当前服务器离线")]),a("div",{staticClass:"text-subtitle-2"},[t._v(" 所谓的携手共进不就是这样吗？如果平坦的道理上只有一个人的宽度，那么我会很开心地走上长满荆棘的道路。 --- 樱小路露娜 ")])]),t.join_open&&this.$vuetify.breakpoint.mdAndUp?a("div",{staticClass:"ml-auto"},[a("v-btn",{attrs:{color:"primary",small:"",elevation:"0"},on:{click:function(e){t.dialog=!0}}},[t._v(" 加入服务器 ")])],1):t._e()],1),a("div",{staticClass:"mb-3"},[null!==this.query_data&&!0===this.query_data.status?a("v-row",{staticClass:"pt-4"},[a("v-btn",{staticClass:"mt-1",staticStyle:{"margin-left":"10px"},attrs:{color:"Survival"===this.query_data.gamemode?"deep-orange":"red",dark:"",depressed:"",small:"",tile:""}},[t._v(" 游戏模式: "+t._s(this.query_data.gamemode)+" ")]),a("v-btn",{staticClass:"mt-1",staticStyle:{"margin-left":"10px"},attrs:{color:"cyan",dark:"",depressed:"",small:"",tile:""}},[t._v(" 在线人数: "+t._s(this.query_data.online)+" / "+t._s(this.query_data.max)+" ")]),a("v-btn",{staticClass:"mt-1",staticStyle:{"margin-left":"10px"},attrs:{color:"indigo",dark:"",depressed:"",small:"",tile:""}},[t._v(" 地图名: "+t._s(this.query_data.level_name)+" ")]),a("v-btn",{staticClass:"mt-1",staticStyle:{"margin-left":"10px"},attrs:{color:this.query_data.delay>50?"warning":"success",dark:"",depressed:"",small:"",tile:""}},[t._v(" 延迟: "+t._s(this.query_data.delay)+" ms ")])],1):a("v-row",{staticClass:"pt-4"},[a("v-btn",{staticClass:"mt-1",staticStyle:{"margin-left":"10px"},attrs:{color:"primary",depressed:"",disabled:"",small:"",text:"",tile:""}},[t._v(" 加载中 ")])],1)],1)])],1),t.join_open?a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5"},[t._v(" 提示 ")]),a("v-card-text",[t._v(" 我们将唤起本地的 MinecraftBE 客户端并自动添加服务器信息，若无法唤起请检查浏览器权限或更换浏览器。 ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" 取消 ")]),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:t.joinServer}},[t._v(" 确认 ")])],1)],1)],1):t._e()],1)},m=[],y={name:"ServerInfo",data:()=>({dialog:!1}),props:{query_data:{type:Object|Boolean,default(){return null}},join_open:{type:Boolean,default(){return!1}},loading:{type:Boolean,default(){return!0}}},methods:{text_format(t){const e="§",r={k:"<span style=text-decoration:line-through>",l:"<span style=font-weight:bold>",m:"<span style=text-decoration:line-through>",n:"<span style=text-decoration:underline>",o:"<span style=font-style:italic>"},a={r:"</span>"},s={0:"<span style=color:#000>",1:"<span style=color:#00A>",2:"<span style=color:#0A0>",3:"<span style=color:#0AA>",4:"<span style=color:#A00>",5:"<span style=color:#A0A>",6:"<span style=color:#FA0>",7:"<span style=color:#AAA>",8:"<span style=color:#555>",9:"<span style=color:#55F>",a:"<span style=color:#5F5>",b:"<span style=color:#5FF>",c:"<span style=color:#F55>",d:"<span style=color:#F5F>",e:"<span style=color:#FF5>",f:"<span style=color:#FFF>"};let o=t.split(e),n=!1,i="",l=!1,c=!1;return o.length>1?o.forEach(((t,e)=>{void 0!==s[t.substr(0,1)]?(n?c?c=!1:o[e]="</span>"+s[t.substr(0,1)]+t.substr(1):o[e]=s[t.substr(0,1)]+t.substr(1),i+=o[e]):void 0!==r[t.substr(0,1)]?(l?c?c=!1:o[e]="</span>"+r[t.substr(0,1)]+t.substr(1):o[e]=r[t.substr(0,1)]+t.substr(1),i+=o[e]):void 0!==a[t.substr(0,1)]?(o[e]="</span>"+t.substr(1),c=!0,i+=o[e]):i+=t.substr(1)})):i=t,i},joinServer(){this.dialog=!1,window.open("minecraft:?addExternalServer="+this.query_data.motd+"|"+this.query_data.host,"_blank")}}},h=y,g=r(1001),_=r(3453),b=r.n(_),x=r(6190),Z=r(9582),k=r(4886),C=r(3049),w=r(4324),q=r(5495),j=r(1713),A=r(3687),S=(0,g.Z)(h,f,m,!1,null,"862ac188",null),F=S.exports;b()(S,{VBtn:x.Z,VCard:Z.Z,VCardActions:k.h7,VCardText:k.ZB,VCardTitle:k.EB,VDialog:C.Z,VIcon:w.Z,VImg:q.Z,VRow:j.Z,VSpacer:A.Z});var O=r(8345);a.Z.use(O.Z);const V=[],B=new O.Z({mode:"history",routes:V});var E=B,T=r(9669),P=r.n(T),I={name:"Iframe",components:{"server-info":F},data:()=>({error:!1,data:null,input:{ip:null,port:null},loading:!0,demo:!1,join_open:!1}),created(){let t=E.currentRoute.query.ip,e=E.currentRoute.query.port,r=E.currentRoute.query.dark,a=E.currentRoute.query.demo,s=E.currentRoute.query.join_open;void 0===t||void 0===e||null===t||null===e?this.error=!0:(this.input.ip=t,this.input.port=e),void 0!==a&&null!==a&&(this.demo=!0),void 0!==s&&null!==s&&(this.join_open=!0),void 0===r||null===r?(console.log(r),this.$vuetify.theme.dark=!1):this.$vuetify.theme.dark="true"===r},mounted(){this.error||this.update(this.input.ip,this.input.port)},methods:{async query(t,e){return await P().get("/api?host="+t+":"+e)},update(t,e){this.query(t,e).then((t=>{this.data=t.data,this.loading=!1,this.data.status="offline"!==t.data.status})).catch((t=>{this.loading=!1,console.log(t)}))}}},$=I,M=r(998),R=r(7394),z=r(2933),D=(0,g.Z)($,p,v,!1,null,null,null),N=D.exports;b()(D,{VApp:M.Z,VFadeTransition:R.Z5,VOverlay:z.Z});var H=r(534);a.Z.config.productionTip=!1,a.Z.use(H.Z,{useCache:!0});new a.Z({router:E,store:i,vuetify:d,render:t=>t(N)}).$mount("#iframe")},6134:function(t,e,r){t.exports=r.p+"img/img_4.b66ae86c.png"},7071:function(t,e,r){t.exports=r.p+"img/img_5.a3e3ed30.png"}},e={};function r(a){var s=e[a];if(void 0!==s)return s.exports;var o=e[a]={exports:{}};return t[a].call(o.exports,o,o.exports,r),o.exports}r.m=t,function(){var t=[];r.O=function(e,a,s,o){if(!a){var n=1/0;for(d=0;d<t.length;d++){a=t[d][0],s=t[d][1],o=t[d][2];for(var i=!0,l=0;l<a.length;l++)(!1&o||n>=o)&&Object.keys(r.O).every((function(t){return r.O[t](a[l])}))?a.splice(l--,1):(i=!1,o<n&&(n=o));if(i){t.splice(d--,1);var c=s();void 0!==c&&(e=c)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[a,s,o]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){r.j=975}(),function(){r.p="static/"}(),function(){var t={975:0};r.O.j=function(e){return 0===t[e]};var e=function(e,a){var s,o,n=a[0],i=a[1],l=a[2],c=0;if(n.some((function(e){return 0!==t[e]}))){for(s in i)r.o(i,s)&&(r.m[s]=i[s]);if(l)var d=l(r)}for(e&&e(a);c<n.length;c++)o=n[c],r.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return r.O(d)},a=self["webpackChunkmcbe_motd"]=self["webpackChunkmcbe_motd"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=r.O(void 0,[998],(function(){return r(4580)}));a=r.O(a)})();
//# sourceMappingURL=iframe.7491c608.js.map