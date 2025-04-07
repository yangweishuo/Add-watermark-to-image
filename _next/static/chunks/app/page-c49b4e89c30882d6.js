(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7574:function(e,t,a){Promise.resolve().then(a.bind(a,1692))},1692:function(e,t,a){"use strict";a.d(t,{WatermarkTool:function(){return h}});var s=a(7437),l=a(2265),r=a(5725);let i=e=>{let{onUpload:t}=e,[a,i]=(0,l.useState)(!1),n=(0,l.useCallback)(e=>{let a=e.filter(e=>{let t=["image/jpeg","image/png","image/webp","image/gif"].includes(e.type),a=e.size<=20971520;return t&&a});a.length>0&&t(a)},[t]),{getRootProps:c,getInputProps:d}=(0,r.uI)({onDrop:n,accept:{"image/jpeg":[".jpg",".jpeg"],"image/png":[".png"],"image/webp":[".webp"],"image/gif":[".gif"]},onDragEnter:()=>i(!0),onDragLeave:()=>i(!1)});return(0,s.jsxs)("div",{...c(),className:"\n        p-8 border-2 border-dashed rounded-lg text-center cursor-pointer\n        transition-colors duration-200\n        ".concat(a?"border-blue-500 bg-blue-50":"border-gray-300 hover:border-gray-400","\n      "),children:[(0,s.jsx)("input",{...d()}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)("p",{className:"text-lg",children:"拖拽图片到此处，或点击上传"}),(0,s.jsxs)("p",{className:"text-sm text-gray-500",children:["支持 JPG、PNG、WebP、GIF 格式",(0,s.jsx)("br",{}),"单个文件大小不超过 20MB"]})]})]})},n=e=>{let{config:t,onChange:a}=e,l=e=>{a({...t,text:e})},r=e=>{a({...t,fontSize:e})},i=e=>{a({...t,opacity:e})},n=e=>{a({...t,angle:e})},c=e=>{a({...t,tiled:e})},d=e=>{a({...t,securityCode:e})};return(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"水印类型"}),(0,s.jsxs)("select",{value:t.type,onChange:e=>a({...t,type:e.target.value}),className:"w-full rounded-md border border-gray-300 px-3 py-2",children:[(0,s.jsx)("option",{value:"text",children:"文字水印"}),(0,s.jsx)("option",{value:"security",children:"防伪水印"})]})]}),"text"===t.type&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"水印文字"}),(0,s.jsx)("input",{type:"text",value:t.text,onChange:e=>l(e.target.value),className:"w-full rounded-md border border-gray-300 px-3 py-2",placeholder:"请输入水印文字"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"字体大小"}),(0,s.jsx)("input",{type:"range",min:"12",max:"72",value:t.fontSize,onChange:e=>r(Number(e.target.value)),className:"w-full"}),(0,s.jsxs)("div",{className:"text-sm text-gray-500 mt-1",children:[t.fontSize,"px"]})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"透明度"}),(0,s.jsx)("input",{type:"range",min:"0",max:"100",value:100*t.opacity,onChange:e=>i(Number(e.target.value)/100),className:"w-full"}),(0,s.jsxs)("div",{className:"text-sm text-gray-500 mt-1",children:[Math.round(100*t.opacity),"%"]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"旋转角度"}),(0,s.jsx)("input",{type:"range",min:"-180",max:"180",value:t.angle,onChange:e=>n(Number(e.target.value)),className:"w-full"}),(0,s.jsxs)("div",{className:"text-sm text-gray-500 mt-1",children:[t.angle,"\xb0"]})]}),(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("input",{type:"checkbox",checked:t.tiled,onChange:e=>c(e.target.checked),className:"rounded border-gray-300 text-blue-600 mr-2"}),(0,s.jsx)("label",{className:"text-sm font-medium text-gray-700",children:"平铺水印"})]}),"security"===t.type&&(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"防伪码"}),(0,s.jsx)("input",{type:"text",value:t.securityCode,onChange:e=>d(e.target.value),className:"w-full rounded-md border border-gray-300 px-3 py-2",placeholder:"请输入防伪码"})]})]})},c=(e,t)=>{switch(e){case"small":return .75*t;case"large":return 1.5*t;default:return t}},d=e=>{let{images:t,watermarkConfig:a,onDownloadComplete:r,isPreview:i=!1}=e,[n,d]=(0,l.useState)([]),[o,m]=(0,l.useState)([]),h=(0,l.useRef)(null);(0,l.useEffect)(()=>{let e=t.map(e=>URL.createObjectURL(e));return d(e),()=>{e.forEach(URL.revokeObjectURL)}},[t]),(0,l.useEffect)(()=>{(async()=>{0!==t.length&&m((await Promise.all(n.map(e=>u(e)))).filter(e=>void 0!==e))})()},[n,a]);let x=(e,t)=>{let{securityCode:s="",securityFont:l="Arial",color:r="#000000",fontSize:i=24,opacity:n=.5,securityCodePosition:d="corners",securityCodeSize:o="medium",angle:m=0}=a;if(!s)return;let h=c(o,i);if(e.font="".concat(h,"px ").concat(l,", monospace"),e.fillStyle=r,e.globalAlpha=n,"corners"===d)[{x:h,y:h+h},{x:t.width-h,y:h+h},{x:h,y:t.height-h},{x:t.width-h,y:t.height-h}].forEach(t=>{let{x:a,y:l}=t;e.save(),e.translate(a,l),e.rotate(m*Math.PI/180),e.fillText(s,0,0),e.restore()});else if("center"===d){e.save(),e.translate(t.width/2,t.height/2),e.rotate(m*Math.PI/180);let a=e.measureText(s);e.fillText(s,-a.width/2,0),e.restore()}else if("tiled"===d){let a=e.measureText(s).width,l=2*Math.max(a,h);for(let r=0;r<t.height;r+=l)for(let i=0;i<t.width;i+=l)e.save(),e.translate(i+a/2,r+h/2),e.rotate(m*Math.PI/180),e.fillText(s,-a/2,0),e.restore()}if(a.enableHiddenCode){e.save(),e.globalAlpha=a.hiddenCodeOpacity||.1,e.font="".concat(2*h,"px ").concat(l,", monospace");let r=3*h;for(let a=-t.width;a<2*t.width;a+=r)for(let l=-t.height;l<2*t.height;l+=r)e.save(),e.translate(a,l),e.rotate(45*Math.PI/180),e.fillText(s,0,0),e.restore();e.restore()}},g=(e,t)=>{let{tileGap:s=100,tileScale:l=1,fontSize:r=24,text:i="",color:n="#000000",angle:c=0}=a,d=r*l;e.font="".concat(d,"px Arial"),e.fillStyle=n;let o=e.measureText(i).width,m=Math.ceil(t.width/(o+s))+1,h=Math.ceil(t.height/(d+s))+1,x=-s/2,g=-s/2;for(let t=0;t<h;t++)for(let a=0;a<m;a++){let l=x+a*(o+s),r=g+t*(d+s)+d;e.save(),e.translate(l,r),e.rotate(c*Math.PI/180),e.fillText(i,0,0),e.restore()}},u=async e=>{if(!h.current)return;let t=h.current,s=t.getContext("2d");if(!s)return;let l=new Image;if(l.src=e,await new Promise(e=>{l.onload=e}),t.width=l.width,t.height=l.height,s.drawImage(l,0,0),s.save(),s.globalAlpha=a.opacity,"text"===a.type){if(a.tiled)g(s,t);else{let{text:e,fontSize:l,color:r,position:i,angle:n}=a,c=0,d=0;switch(i){case"topLeft":c=l,d=l;break;case"topCenter":c=t.width/2,d=l;break;case"topRight":c=t.width-l,d=l;break;case"centerLeft":c=l,d=t.height/2;break;case"center":c=t.width/2,d=t.height/2;break;case"centerRight":c=t.width-l,d=t.height/2;break;case"bottomLeft":c=l,d=t.height-l;break;case"bottomCenter":c=t.width/2,d=t.height-l;break;case"bottomRight":c=t.width-l,d=t.height-l}s.translate(c,d),s.rotate(n*Math.PI/180),s.font="".concat(l,"px Arial"),s.fillStyle=r;let o=s.measureText(e);s.fillText(e,-o.width/2,0)}}else"security"===a.type&&x(s,t);return s.restore(),t.toDataURL("image/png")},p=async(e,t)=>{let a=await u(e);if(!a)return;let s=document.createElement("a");s.href=a,s.download="watermarked_".concat(t+1,".png"),document.body.appendChild(s),s.click(),document.body.removeChild(s),null==r||r([a])};return(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)("canvas",{ref:h,style:{display:"none"}}),(0,s.jsx)("div",{className:"grid grid-cols-1 gap-6",children:n.map((e,t)=>(0,s.jsx)("div",{className:"space-y-4",children:i?(0,s.jsxs)("div",{className:"relative rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100",children:[(0,s.jsx)("img",{src:o[t]||e,alt:"Preview ".concat(t+1),className:"w-full"}),(0,s.jsx)("div",{className:"absolute top-4 right-4",children:(0,s.jsxs)("button",{className:"px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white/100 transition-all text-sm font-medium text-gray-700 flex items-center gap-2",onClick:()=>p(e,t),children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),"下载"]})})]}):(0,s.jsxs)("div",{className:"relative group rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100",children:[(0,s.jsx)("img",{src:e,alt:"Preview ".concat(t+1),className:"w-full"}),(0,s.jsx)("div",{className:"absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/50",children:(0,s.jsxs)("button",{className:"px-6 py-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium flex items-center gap-2",onClick:()=>p(e,t),children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})}),"下载水印图片"]})})]})},e))}),0===n.length&&(0,s.jsxs)("div",{className:"p-12 text-center text-gray-500 border-2 border-dashed rounded-xl bg-gray-50/50",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-12 w-12 mx-auto mb-4 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})}),(0,s.jsx)("p",{className:"text-lg font-medium",children:"请上传图片以预览水印效果"}),(0,s.jsx)("p",{className:"mt-2 text-sm text-gray-400",children:"支持 JPG、PNG 格式图片"})]})]})},o=e=>{let{isOpen:t,onClose:a}=e;return t?(0,s.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:(0,s.jsxs)("div",{className:"bg-white rounded-xl p-6 max-w-md w-full mx-4 relative",children:[(0,s.jsx)("button",{onClick:a,className:"absolute top-4 right-4 text-gray-500 hover:text-gray-700",children:(0,s.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"联系作者"}),(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"bg-gray-50 rounded-lg p-4",children:[(0,s.jsx)("p",{className:"text-gray-600 mb-2",children:"扫描下方二维码添加作者微信"}),(0,s.jsx)("div",{className:"flex justify-center",children:(0,s.jsx)("img",{src:"/qrcode.jpg",alt:"作者微信二维码",className:"w-48 h-48 object-cover border-4 border-white shadow-lg rounded-lg"})})]}),(0,s.jsxs)("div",{className:"text-left space-y-2 bg-blue-50 rounded-lg p-4",children:[(0,s.jsx)("h4",{className:"font-medium text-blue-800",children:"其他联系方式："}),(0,s.jsxs)("p",{className:"text-blue-600",children:[(0,s.jsx)("span",{className:"font-medium",children:"邮箱："}),(0,s.jsx)("a",{href:"mailto:your@email.com",className:"hover:underline",children:"yangweishuo297@gmail.com"})]}),(0,s.jsxs)("p",{className:"text-blue-600",children:[(0,s.jsx)("span",{className:"font-medium",children:"微信号："}),(0,s.jsx)("span",{className:"select-all",children:"muyiredbook"})]})]}),(0,s.jsx)("div",{className:"bg-yellow-50 rounded-lg p-4 text-left",children:(0,s.jsxs)("p",{className:"text-yellow-800 text-sm",children:[(0,s.jsx)("span",{className:"font-medium",children:"提示："}),'添加微信时请注明"水印工具"，方便及时通过。']})})]})]})]})}):null},m="watermark_usage_count",h=()=>{let[e,t]=(0,l.useState)([]),[a,r]=(0,l.useState)(0),[c,h]=(0,l.useState)(!1),[x,g]=(0,l.useState)({text:"水印文字",fontSize:24,color:"#000000",opacity:.5,position:"center",angle:0,tiled:!1,tileGap:100,tileScale:1,type:"text",securityCode:"",securityCodeSize:"medium",securityFont:"Arial",securityCodePosition:"corners",enableHiddenCode:!1,hiddenCodeOpacity:.1});(0,l.useEffect)(()=>{let e=localStorage.getItem(m);r(e?parseInt(e):0)},[]);let u=()=>{let e=a+1;r(e),localStorage.setItem(m,e.toString())},p=async e=>{if(a>=5){h(!0);return}(!(await Promise.all(e.map(f))).some(e=>e)||window.confirm("检测到部分图片可能已经包含水印，是否继续添加？"))&&t(e)},b=e=>{t(t=>t.filter((t,a)=>a!==e))},f=async e=>new Promise(t=>{let a=new Image,s=new FileReader;s.onload=e=>{var s;a.src=null===(s=e.target)||void 0===s?void 0:s.result,a.onload=()=>{let e=document.createElement("canvas"),s=e.getContext("2d");if(!s){t(!1);return}e.width=a.width,e.height=a.height,s.drawImage(a,0,0);let l=s.getImageData(0,0,e.width,e.height).data,r=!1,i=!1,n=0,c={};for(let t=0;t<l.length;t+=4)if(l[t+3]<255&&l[t+3]>0&&(r=!0),t%(80*e.width)==0){let e="".concat(l[t],",").concat(l[t+1],",").concat(l[t+2]);c[e]=(c[e]||0)+1,c[e]>10&&(i=!0),n++}t(r||i&&n>100)}},s.readAsDataURL(e)});return(0,s.jsxs)("div",{className:"space-y-8",children:[(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,s.jsxs)("div",{className:"space-y-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6",children:[(0,s.jsxs)("div",{className:"flex flex-col space-y-2",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold text-gray-800",children:"上传图片"}),(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsx)("div",{className:"px-3 py-1 bg-blue-50 rounded-full",children:(0,s.jsxs)("span",{className:"text-sm text-blue-600 font-medium",children:["剩余次数：",(0,s.jsx)("span",{className:"text-blue-700",children:Math.max(0,5-a)}),"/",5]})}),e.length>0&&(0,s.jsx)("button",{onClick:()=>{e.length>0&&window.confirm("确定要清空所有已上传的图片吗？")&&t([])},className:"text-sm text-red-600 hover:text-red-700 transition-colors",children:"清空图片"})]})]}),a>=5&&(0,s.jsxs)("div",{className:"text-sm text-red-600 bg-red-50 rounded-lg p-3 flex justify-between items-center",children:[(0,s.jsx)("span",{children:"您的免费使用次数已用完！"}),(0,s.jsx)("button",{onClick:()=>h(!0),className:"px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm",children:"联系作者"})]})]}),(0,s.jsx)(i,{onUpload:p}),e.length>0&&(0,s.jsxs)("div",{className:"border-t border-gray-100 pt-4",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-2",children:[(0,s.jsx)("h3",{className:"text-sm font-medium text-gray-700",children:"已上传图片"}),(0,s.jsxs)("span",{className:"text-sm text-gray-500",children:[e.length," 张图片"]})]}),(0,s.jsx)("div",{className:"grid grid-cols-2 gap-2",children:e.map((e,t)=>(0,s.jsxs)("div",{className:"relative group",children:[(0,s.jsx)("div",{className:"aspect-video rounded-lg border border-gray-200 overflow-hidden",children:(0,s.jsx)("img",{src:URL.createObjectURL(e),alt:e.name,className:"w-full h-full object-cover"})}),(0,s.jsx)("button",{onClick:()=>b(t),className:"absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity",children:(0,s.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),(0,s.jsx)("div",{className:"mt-1 text-xs text-gray-500 truncate",children:e.name})]},t))})]}),(0,s.jsxs)("div",{className:"border-t border-gray-100 pt-6",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold text-gray-800 mb-4",children:"水印设置"}),(0,s.jsx)(n,{config:x,onChange:e=>{g(t=>({...t,...e}))}})]})]}),(0,s.jsxs)("div",{className:"bg-white rounded-xl shadow-sm border border-gray-100 p-6",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold text-gray-800 mb-4",children:"实时预览"}),(0,s.jsx)("div",{className:"relative",children:(0,s.jsx)(d,{images:e,watermarkConfig:x,onDownloadComplete:()=>{u(),a>=4&&h(!0)},isPreview:!0})})]})]}),(0,s.jsx)(o,{isOpen:c,onClose:()=>h(!1)})]})}}},function(e){e.O(0,[725,971,117,744],function(){return e(e.s=7574)}),_N_E=e.O()}]);