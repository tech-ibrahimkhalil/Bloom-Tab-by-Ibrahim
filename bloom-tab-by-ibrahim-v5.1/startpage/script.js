try{const mf=chrome.runtime.getManifest();document.title=mf.name;const t=document.querySelector(".drawer h2");if(t)t.textContent=mf.name}catch{}
const $=s=>document.querySelector(s);
const fav=d=>`https://www.google.com/s2/favicons?domain=${d}&sz=64`;
const store={get:(k,d)=>{try{return localStorage.getItem(k)??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch{}}};
const jget=async u=>{const r=await fetch(u);if(!r.ok)throw new Error(r.status);return r.json()};
const GMAIL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23EA4335' d='M2 6l10 7 10-7v-1a2 2 0 00-2-2H4a2 2 0 00-2 2z'/%3E%3Cpath fill='%23C5221F' d='M2 6v12a2 2 0 002 2h2V9.5zM22 6v12a2 2 0 01-2 2h-2V9.5z'/%3E%3C/svg%3E";

/* ---- Defaults (edit freely) ---- */
const DEF_DOCK=[["YouTube","https://youtube.com"],["Gmail","https://mail.google.com",GMAIL],["X","https://x.com"],["Google","https://google.com"],["GitHub","https://github.com"],["Bluesky","https://bsky.app"],["LinkedIn","https://linkedin.com"],["Opera","https://opera.com"],["Reddit","https://reddit.com"],["DEV","https://dev.to"]];
const AI=[["ChatGPT","chatgpt.com","https://chatgpt.com"],["Claude","claude.ai","https://claude.ai"],["Gemini","gemini.google.com","https://gemini.google.com"],["Perplexity","perplexity.ai","https://perplexity.ai"],["Copilot","copilot.microsoft.com","https://copilot.microsoft.com"]];
const GS="https://ssl.gstatic.com/docs/";
const APPS=[["Gmail","https://mail.google.com",GMAIL],["Drive","https://drive.google.com"],["Docs","https://docs.google.com/document",GS+"documents/images/kix-favicon7.ico"],["Sheets","https://docs.google.com/spreadsheets",GS+"spreadsheets/favicon3.ico"],["Slides","https://docs.google.com/presentation",GS+"presentations/images/favicon5.ico"],["Forms","https://docs.google.com/forms",GS+"forms/device_home/android_192.png"],["Calendar","https://calendar.google.com"],["Meet","https://meet.google.com"],["Chat","https://chat.google.com"],["Maps","https://maps.google.com"],["Photos","https://photos.google.com"],["YouTube","https://youtube.com"],["Translate","https://translate.google.com"],["News","https://news.google.com"],["Keep","https://keep.google.com"],["Contacts","https://contacts.google.com"],["Gemini","https://gemini.google.com"],["Classroom","https://classroom.google.com"],["Books","https://books.google.com"],["Earth","https://earth.google.com"],["Blogger","https://www.blogger.com"],["Sites","https://sites.google.com"],["Scholar","https://scholar.google.com"],["Trends","https://trends.google.com"],["Voice","https://voice.google.com"],["Ads","https://ads.google.com"],["Analytics","https://analytics.google.com"],["Play","https://play.google.com"],["Passwords","https://passwords.google.com"],["Account","https://myaccount.google.com"],["Web Store","https://chromewebstore.google.com"],["Podcasts","https://podcasts.google.com"]];
const ENGINES=[["Google","google.com","https://www.google.com/search?q="],["Duck","duckduckgo.com","https://duckduckgo.com/?q="],["Bing","bing.com","https://www.bing.com/search?q="],["Brave","search.brave.com","https://search.brave.com/search?q="],["YouTube","youtube.com","https://www.youtube.com/results?search_query="],["GitHub","github.com","https://github.com/search?q="]];
const THEMES=["blue","red","dark","green","purple","amber","teal","pink","sky","indigo","lime","rose","coffee","midnight","forest","amoled"];
const DEF_CFG={shortcuts:true,ai:true,gapps:true,analog:true,fahr:false,nomic:false,anim:true,fc:true,suggest:true,auto:false,hist:true,calc:true,bang:true,aqi:true,wb:0,style:"solid",gl:40,h24:false,grad:false,theme:"blue",custom:"#3b7be8",name:""};

/* ---- Settings ---- */
let cfg={...DEF_CFG,...JSON.parse(store.get("cfg","{}"))};
const save=()=>store.set("cfg",JSON.stringify(cfg));
function hexHsl(x){const n=parseInt(x.slice(1),16),r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let h=0,s=0;
 if(d){s=d/(1-Math.abs(2*l-1));h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=Math.round(h*60);if(h<0)h+=360}
 return[h,Math.round(s*100),Math.round(l*100)]}
function applyCfg(){
 const hr=new Date().getHours(),th=cfg.auto&&(hr>=19||hr<6)?"midnight":cfg.theme;document.body.dataset.theme=th;
 const st=document.body.style;
 if(th==="custom"){const[h,sa,l]=hexHsl(cfg.custom),g=sa<10;
  st.setProperty("--accent",`hsl(${h} ${g?0:Math.max(sa,45)}% ${Math.min(l,52)}%)`);
  st.setProperty("--bg",`hsl(${h} ${g?0:100}% 88%)`);
  st.setProperty("--card",`hsl(${h} ${g?0:100}% 94%)`);
  st.setProperty("--text",`hsl(${h} ${g?0:55}% 26%)`)}
 else["--accent","--bg","--card","--text"].forEach(v=>st.removeProperty(v));
 if($("#customColor"))$("#customColor").value=cfg.custom;
 if($(".cust"))$(".cust").classList.toggle("on",cfg.theme==="custom");
 document.body.classList.toggle("anim-on",cfg.anim);
 document.body.classList.toggle("nomic",cfg.nomic);
 document.body.classList.toggle("grad",cfg.grad);
 document.body.classList.toggle("fc-pin",!!cfg.fc&&innerWidth>=1300);
 document.body.classList.toggle("glass",cfg.style!=="solid");document.body.classList.toggle("glass-dark",cfg.style==="glass-dark");
 document.body.style.setProperty("--gl",(cfg.gl||40)+"%");
 document.querySelectorAll(".sty").forEach(x=>x.classList.toggle("on",x.dataset.s===cfg.style));
 if($("#glStr"))$("#glStr").value=cfg.gl||40;
 $("#dock").classList.toggle("hidden",!cfg.shortcuts);
 $("#aiWrap").classList.toggle("hidden",!cfg.ai);
 $("#grid").classList.toggle("hidden",!cfg.gapps);
 $("#clock").classList.toggle("is-analog",cfg.analog);
 $("#unit").textContent=cfg.fahr?"°F":"°C";
 document.querySelectorAll("[data-k]").forEach(i=>i.checked=!!cfg[i.dataset.k]);
 document.querySelectorAll("#swatches b").forEach(b=>b.classList.toggle("on",b.dataset.t===cfg.theme));
}
document.querySelectorAll("[data-k]").forEach(i=>i.onchange=()=>{cfg[i.dataset.k]=i.checked;save();applyCfg();if(i.dataset.k==="fahr"||i.dataset.k==="aqi")load()});
const SW={blue:"#3b7be8",red:"#ea4545",dark:"#333",green:"#2f9e57",purple:"#7c4ddb",amber:"#f08a1c",teal:"#14a39a",pink:"#e0449a",sky:"#1e9bd8",indigo:"#4f5bd5",lime:"#7fae1b",rose:"#c9645a",coffee:"#8a5a35",midnight:"#232c52",forest:"#1f3a2b",amoled:"#000"};
THEMES.forEach(t=>{const b=document.createElement("b");b.dataset.t=t;b.style.background=SW[t];b.onclick=()=>{cfg.theme=t;save();applyCfg()};$("#swatches").appendChild(b)});
(function(){const l=document.createElement("label");l.className="cust";l.title="Pick any colour";
 l.innerHTML='<input type="color" id="customColor">';$("#swatches").appendChild(l);
 $("#customColor").oninput=e=>{cfg.theme="custom";cfg.custom=e.target.value;save();applyCfg()}})();
$("#reset").onclick=()=>{if(confirm("Reset all settings?")){cfg={...DEF_CFG};save();store.set("dock","");applyCfg();renderDock()}};
const openDrawer=()=>{$("#drawer").classList.add("open");$("#scrim").classList.remove("hidden")};
const showView=id=>["dmain","dedit","dcontact"].forEach(v=>$("#"+v).classList.toggle("hidden",v!==id));
const closeDrawer=()=>{$("#drawer").classList.remove("open");$("#scrim").classList.add("hidden");showView("dmain")};
const CONTACTS=[["YouTube","https://www.youtube.com/@AutomationInsiderX?sub_confirmation=1","youtube.com"],["LinkedIn","https://www.linkedin.com/in/ibrahim-khalil-tech/","linkedin.com"],["GitHub","https://github.com/tech-ibrahimkhalil","github.com"],["Gmail","mailto:tech.ibrahimkhalil@gmail.com",GMAIL],["WhatsApp","https://wa.me/8801741412002","whatsapp.com"],["Telegram","https://t.me/superengineer","telegram.org"],["X","https://x.com/ibrahim_kha_lil","x.com"],["Facebook","https://www.facebook.com/ibrahimkhalil.tech","facebook.com"],["Instagram","https://www.instagram.com/ibrahim_khalil_tech/","instagram.com"],["Blog","https://super-engineers.blogspot.com/","blogger.com"]];
CONTACTS.forEach(([n,u,i])=>{const a=document.createElement("a");a.href=u;if(!u.startsWith("mailto:")){a.target="_blank";a.rel="noopener"}
 const im=new Image();im.alt="";im.src=i.startsWith("data:")?i:fav(i);a.append(im,n);$("#clinks").appendChild(a)});
(function(){const av=$("#avatar"),p=new Image();p.alt="";p.onload=()=>{av.textContent="";av.appendChild(p)};av.textContent="IK";p.src="photo.jpg"})();
$("#openContact").onclick=()=>showView("dcontact");
$("#backContact").onclick=()=>showView("dmain");
$("#credit").onclick=()=>{openDrawer();showView("dcontact")};
$("#setBtn").onclick=openDrawer;$("#scrim").onclick=closeDrawer;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer()});

/* ---- Entrance stagger ---- */
document.querySelectorAll(".pop").forEach((el,i)=>el.style.setProperty("--i",i));

/* ---- Cookie (scalloped) clock shape ---- */
(function(){let d="";const L=12,R=88,A=7;
 for(let i=0;i<=360;i+=2){const t=i*Math.PI/180,r=R+A*Math.cos(L*t),x=r*Math.cos(t),y=r*Math.sin(t);d+=(i?"L":"M")+x.toFixed(1)+","+y.toFixed(1)}
 $("#cookiePath").setAttribute("d",d+"Z")})();
$("#clock").onclick=()=>{cfg.analog=!cfg.analog;save();applyCfg()};

/* ---- Clock tick (smooth hands) ---- */
function tick(){const n=new Date(),h=n.getHours(),m=n.getMinutes(),s=n.getSeconds()+n.getMilliseconds()/1000;
 $("#hh").textContent=String(cfg.h24?h:(h%12||12)).padStart(2,"0");$("#mm").textContent=String(m).padStart(2,"0");
 $("#ampm").textContent=cfg.h24?"":(h<12?"AM":"PM");
 $("#date").textContent=n.getDate()+" "+n.toLocaleDateString("en",{weekday:"short"});
 $("#hHand").setAttribute("transform",`rotate(${(h%12+m/60)*30})`);
 $("#mHand").setAttribute("transform",`rotate(${(m+s/60)*6})`);
 $("#sDot").setAttribute("transform",`rotate(${s*6})`);
 $("#dateLine").textContent=n.toLocaleDateString("en",{weekday:"short",month:"short",day:"numeric"});
 requestAnimationFrame(tick)}
tick();

/* ---- Name (click to edit) ---- */
function renderName(){const p=$("#nameLine"),h=new Date().getHours();
 const g="Good "+(h<12?"Morning":h<17?"Afternoon":h<21?"Evening":"Night");
 p.innerHTML=cfg.name?`${g}, <button id="nameBtn" type="button">${cfg.name.replace(/</g,"&lt;")}</button>`:`<button id="nameBtn" type="button">Click here to edit</button>`;
 $("#nameBtn").onclick=()=>{p.innerHTML=`<input id="nameInput" maxlength="24" placeholder="Your name" value="${(cfg.name||"").replace(/"/g,"")}">`;const i=$("#nameInput");i.focus();
  const done=()=>{cfg.name=i.value.trim();save();renderName()};i.onblur=done;i.onkeydown=e=>{if(e.key==="Enter")done()}}}
renderName();

/* ---- Search + voice ---- */
let eng=+store.get("engine",0);const list=$("#engineList");
ENGINES.forEach((e,i)=>{const b=document.createElement("button");b.type="button";b.className="engine";
 b.innerHTML=`<img src="${fav(e[1])}" alt=""><span>${e[0]}</span><i class="radio"></i>`;
 b.onclick=()=>{eng=i;store.set("engine",i);mark()};list.appendChild(b)});
const mark=o=>[...list.children].forEach((c,i)=>c.classList.toggle("on",i===(o??eng)));mark();
/* engine shortcuts: "yt lofi", "gh react", "g ...", "d ...", "b ...", "br ..." */
const BANG={g:0,d:1,b:2,br:3,yt:4,gh:5};
const parseQ=q=>{const m=cfg.bang&&q.match(/^([a-z]{1,2})\s+(.+)$/i);const k=m&&m[1].toLowerCase();return m&&BANG[k]!==undefined?{i:BANG[k],t:m[2],b:true}:{i:eng,t:q,b:false}};
const getHist=()=>{try{return JSON.parse(store.get("hist","[]"))}catch{return[]}};
const addHist=q=>{if(!cfg.hist)return;store.set("hist",JSON.stringify([q,...getHist().filter(x=>x!==q)].slice(0,8)))};
$("#search").onsubmit=e=>{e.preventDefault();const raw=$("#q").value.trim();if(!raw)return;const p=parseQ(raw);addHist(raw);location.href=ENGINES[p.i][2]+encodeURIComponent(p.t)};
let micR=null;
$("#mic").onclick=async e=>{e.stopPropagation();const mic=$("#mic"),q=$("#q"),ph=q.placeholder;
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 const say=t=>{q.placeholder=t;setTimeout(()=>q.placeholder=ph,3500)};
 if(!SR){say("Voice search isn't supported in this browser");return}
 if(micR){try{micR.stop()}catch{}return}
 /* extension pages need an explicit microphone permission first */
 try{const st=await navigator.mediaDevices.getUserMedia({audio:true});st.getTracks().forEach(t=>t.stop())}
 catch{say("Microphone blocked. Allow it in the address bar / site settings");return}
 const r=new SR();micR=r;r.lang=navigator.language||"en-US";r.interimResults=true;r.maxAlternatives=1;
 mic.classList.add("live");q.placeholder="Listening…";
 r.onresult=ev=>{let t="";for(const x of ev.results)t+=x[0].transcript;q.value=t;
  if(ev.results[ev.results.length-1].isFinal&&t.trim())$("#search").requestSubmit()};
 r.onerror=ev=>{const m={"not-allowed":"Microphone permission denied","service-not-allowed":"Voice service not allowed","no-speech":"I didn't hear anything, try again","network":"Voice search needs an internet connection","audio-capture":"No microphone found"};say(m[ev.error]||"Voice search error: "+ev.error)};
 r.onend=()=>{micR=null;mic.classList.remove("live");if(q.placeholder==="Listening…")q.placeholder=ph};
 try{r.start()}catch{micR=null;mic.classList.remove("live");q.placeholder=ph}};

/* ---- Dock (editable) ---- */
const getDock=()=>{try{const d=JSON.parse(store.get("dock","null"));return d&&d.length?d:DEF_DOCK.map(x=>[...x])}catch{return DEF_DOCK.map(x=>[...x])}};
const putDock=d=>store.set("dock",JSON.stringify(d));
function renderDock(){const d=$("#dock");d.innerHTML="";let k=0;
 getDock().forEach(([n,u,i,hid])=>{if(hid)return;let host="";try{host=new URL(u).hostname}catch{}
  d.insertAdjacentHTML("beforeend",`<a href="${u}" title="${n}" style="animation-delay:${.6+(k++)*.06}s"><img src="${i||fav(host)}" alt=""></a>`)})}
function renderEdit(){const L=$("#scList");L.innerHTML="";
 getDock().forEach(([n,u,i,hid],k)=>{const r=document.createElement("div");r.className="scrow"+(hid?" off":"");
  r.innerHTML=`<div><span class="grip">⠿</span>${n}<small>${u}</small></div><span><button class="eye" title="${hid?"Show":"Hide"}">${hid?"🙈":"👁"}</button> <button class="del" title="Delete">🗑</button></span>`;
  r.draggable=true;r.ondragstart=e=>{e.dataTransfer.setData("text/plain",k);r.classList.add("drag")};r.ondragend=()=>r.classList.remove("drag");r.ondragover=e=>e.preventDefault();
  r.ondrop=e=>{e.preventDefault();const from=+e.dataTransfer.getData("text/plain"),d=getDock(),[it]=d.splice(from,1);d.splice(k,0,it);putDock(d);renderEdit();renderDock()};
  r.querySelector(".eye").onclick=()=>{const d=getDock();d[k]=[n,u,i||"",!hid];putDock(d);renderEdit();renderDock()};
  r.querySelector(".del").onclick=()=>{const d=getDock();d.splice(k,1);putDock(d);renderEdit();renderDock()};L.appendChild(r)})}
$("#editSc").onclick=()=>{$("#dmain").classList.add("hidden");$("#dedit").classList.remove("hidden");renderEdit()};
$("#backEdit").onclick=()=>{$("#dedit").classList.add("hidden");$("#dmain").classList.remove("hidden")};
$("#addSc").onclick=()=>{const n=prompt("Name (e.g. Notion)");if(!n)return;let u=prompt("Website address (e.g. notion.so)");if(!u)return;
 if(!/^https?:\/\//.test(u))u="https://"+u;try{new URL(u)}catch{alert("That address isn't valid.");return}
 const d=getDock();d.push([n,u,"",false]);putDock(d);renderEdit();renderDock()};
renderDock();

/* ---- AI row + apps ---- */
$("#aiRow").innerHTML=AI.map(([n,d,u])=>`<a href="${u}"><img src="${fav(d)}" alt="">${n}</a>`).join("");
APPS.forEach(([n,u,ic],k)=>{const a=document.createElement("a");a.href=u;a.dataset.n=n.toLowerCase();a.style.setProperty("--d",k*18+"ms");
 const box=document.createElement("span");box.className="ic";const im=new Image();im.alt="";
 const fb=()=>{im.onerror=null;im.src=fav(new URL(u).hostname)};im.onerror=fb;im.src=ic||fav(new URL(u).hostname);
 box.append(im);const t=document.createElement("span");t.textContent=n;a.append(box,t);$("#appGrid").appendChild(a)});
$("#apps").onclick=e=>e.stopPropagation();
$("#appQ").oninput=e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll("#appGrid a").forEach(a=>a.classList.toggle("hidden",!!q&&!a.dataset.n.includes(q)))};
$("#aiBtn").onclick=e=>{e.stopPropagation();$("#aiRow").classList.toggle("open")};
$("#grid").onclick=e=>{e.stopPropagation();const p=$("#apps");p.classList.toggle("hidden");if(!p.classList.contains("hidden"))$("#appQ").focus()};
document.addEventListener("click",()=>{$("#apps").classList.add("hidden")});

/* ---- Weather + location ---- */
const WMO={0:["Clear","☀"],1:["Mostly clear","🌤"],2:["Partly cloudy","⛅"],3:["Cloudy","☁"],45:["Mist","🌫"],48:["Mist","🌫"],51:["Drizzle","🌦"],53:["Drizzle","🌦"],55:["Drizzle","🌦"],61:["Rain","🌧"],63:["Rain","🌧"],65:["Heavy rain","🌧"],71:["Snow","🌨"],73:["Snow","🌨"],75:["Heavy snow","❄"],80:["Showers","🌦"],81:["Showers","🌧"],82:["Heavy showers","🌧"],95:["Thunderstorm","⛈"],96:["Thunderstorm","⛈"],99:["Thunderstorm","⛈"]};
const getLoc=()=>{try{return JSON.parse(store.get("loc","null"))}catch{return null}};
const setLoc=l=>store.set("loc",JSON.stringify(l));
function renderFc(d,l){const c=d.current,D=d.daily,lo=Math.min(...D.temperature_2m_min),hi=Math.max(...D.temperature_2m_max),sp=hi-lo||1,tm=x=>(x||"").slice(11,16);
 $("#fc").innerHTML=`<div class="fcity">📍 ${l.city.replace(/</g,"&lt;")}<small>5-day forecast</small></div>
 <div class="fstats"><div><b>${Math.round(c.wind_speed_10m)}</b><small>km/h wind</small></div><div><b>${c.relative_humidity_2m}%</b><small>humidity</small></div><div><b>${Math.round(c.apparent_temperature)}°</b><small>feels like</small></div></div>`
 +D.time.map((t,i)=>{const a=D.temperature_2m_min[i],b=D.temperature_2m_max[i];
  return `<div class="frow2"><span>${i?new Date(t+"T00:00").toLocaleDateString("en",{weekday:"short"}):"Today"}</span><span>${(WMO[D.weather_code[i]]||["","☁"])[1]}</span><span class="lo">${Math.round(a)}°</span><i class="fbar"><em style="left:${(a-lo)/sp*100}%;width:${Math.max(8,(b-a)/sp*100)}%"></em></i><b>${Math.round(b)}°</b></div>`}).join("")
 +`<div class="fsun"><span>🌅 ${tm(D.sunrise[0])}</span><span>🌇 ${tm(D.sunset[0])}</span></div>`}
$(".temp").title="Click for 5-day forecast";
$(".temp").onclick=e=>{e.stopPropagation();$("#fc").classList.toggle("hidden")};
$("#fc").onclick=e=>e.stopPropagation();document.addEventListener("click",()=>$("#fc").classList.add("hidden"));
async function showAqi(l){const el=$("#aqi");if(!cfg.aqi){el.classList.add("hidden");return}
 try{const d=await jget(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${l.lat}&longitude=${l.lon}&current=us_aqi`);
  const v=Math.round(d.current.us_aqi);if(!isFinite(v))throw 0;
  const L=[[50,"Good","#2e9e5b"],[100,"Moderate","#c9a100"],[150,"Unhealthy for sensitive","#e07a1f"],[200,"Unhealthy","#d93f3f"],[300,"Very unhealthy","#8e44ad"],[1e9,"Hazardous","#7b1c2e"]].find(x=>v<=x[0]);
  el.textContent="AQI "+v+" · "+L[1];el.style.background=L[2];el.title="US AQI (air quality)";el.classList.remove("hidden")}catch{el.classList.add("hidden")}}
async function showWeather(l){
 $("#city").textContent="📍 "+l.city;
 try{
  const d=await jget(`https://api.open-meteo.com/v1/forecast?latitude=${l.lat}&longitude=${l.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=5&timezone=auto&temperature_unit=${cfg.fahr?"fahrenheit":"celsius"}`);const c=d.current;renderFc(d,l);
  const w=WMO[c.weather_code]||["Cloudy","☁"],u=cfg.fahr?"°F":"°C";
  $("#cond").textContent=w[0];$("#wicon").textContent=c.is_day===0?({0:"🌙",1:"🌙",2:"☁",3:"☁"}[c.weather_code]||w[1]):w[1];$("#temp").textContent=Math.round(c.temperature_2m);
  showAqi(l);
  $("#hum").textContent="Humidity "+c.relative_humidity_2m+"%";$("#feels").textContent="Feels "+c.apparent_temperature+u;
 }catch{$("#cond").textContent="Weather unavailable – check connection"}}
async function ipLocation(){
 try{const d=await jget("https://ipwho.is/");if(d.success!==false&&d.latitude)return{lat:d.latitude,lon:d.longitude,city:d.city||"Your city"}}catch{}
 try{const d=await jget("https://ipapi.co/json/");if(d.latitude)return{lat:d.latitude,lon:d.longitude,city:d.city||"Your city"}}catch{}
 return null}
async function load(){let l=getLoc();if(!l){l=await ipLocation();if(l){setLoc(l);addLoc(l)}}
 if(l)showWeather(l);else{$("#cond").textContent="Set your location";$("#city").textContent="📍 Add location";openLoc()}}
const panel=$("#locPanel"),results=$("#locResults"),input=$("#locInput");
const getLocs=()=>{try{return JSON.parse(store.get("locs","[]"))}catch{return[]}};
function addLoc(l){const a=getLocs().filter(x=>!(x.city===l.city&&Math.abs(x.lat-l.lat)<.05));a.unshift(l);store.set("locs",JSON.stringify(a.slice(0,6)))}
function renderSaved(){const s=$("#savedLocs");s.innerHTML="";getLocs().forEach((l,i)=>{const c=document.createElement("span");c.className="chip";c.textContent=l.city;
 c.onclick=()=>{setLoc(l);panel.classList.add("hidden");showWeather(l)};
 const x=document.createElement("b");x.textContent="✕";x.title="Remove";x.onclick=e=>{e.stopPropagation();const a=getLocs();a.splice(i,1);store.set("locs",JSON.stringify(a));renderSaved()};c.append(x);s.appendChild(c)})}
function openLoc(){panel.classList.remove("hidden");panel.style.maxHeight=Math.max(220,innerHeight-$(".weather-card").getBoundingClientRect().bottom-20)+"px";renderSaved();input.focus()}
$("#city").onclick=e=>{e.stopPropagation();panel.classList.contains("hidden")?openLoc():panel.classList.add("hidden")};
panel.onclick=e=>e.stopPropagation();
document.addEventListener("click",()=>panel.classList.add("hidden"));
function choose(l){setLoc(l);addLoc(l);panel.classList.add("hidden");input.value="";results.innerHTML="";showWeather(l)}
let t;
input.oninput=()=>{clearTimeout(t);const q=input.value.trim();if(q.length<2){results.innerHTML="";return}
 t=setTimeout(async()=>{try{const d=await jget(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en`);
  results.innerHTML="";if(!d.results){results.innerHTML="<a>No place found. Try another spelling.</a>";return}
  d.results.forEach(r=>{const a=document.createElement("a");a.innerHTML=`${r.name}<small>${[r.admin1,r.country].filter(Boolean).join(", ")}</small>`;
   a.onclick=()=>choose({lat:r.latitude,lon:r.longitude,city:r.name});results.appendChild(a)});
 }catch{results.innerHTML="<a>Search failed. Check your connection.</a>"}},300)};
input.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();const f=results.querySelector("a");if(f)f.click()}};
$("#locGps").onclick=()=>{results.innerHTML="<a>Finding your location…</a>";
 if(!navigator.geolocation){results.innerHTML="<a>Location not supported. Search a city instead.</a>";return}
 navigator.geolocation.getCurrentPosition(async p=>{const lat=p.coords.latitude,lon=p.coords.longitude;let city="Current location";
  try{const d=await jget(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);city=d.city||d.locality||d.principalSubdivision||city}catch{}
  choose({lat,lon,city})},()=>{results.innerHTML="<a>Permission denied. Search a city instead.</a>"},{timeout:10000})};

/* ---- Tasks ---- */
const getT=()=>{try{return JSON.parse(store.get("tasks","[]"))}catch{return[]}};
const putT=a=>{store.set("tasks",JSON.stringify(a));renderTasks()};
function renderTasks(){const L=$("#taskList");L.innerHTML="";const t=getT();
 if(!t.length){L.innerHTML='<p class="empty">No tasks yet. Add one above.</p>';return}
 t.forEach((x,i)=>{const r=document.createElement("label");r.className="task"+(x.d?" done":"");
  const cb=document.createElement("input");cb.type="checkbox";cb.checked=x.d;cb.onchange=()=>{const a=getT();a[i].d=cb.checked;putT(a)};
  const sp=document.createElement("span");sp.textContent=x.t;
  const del=document.createElement("button");del.type="button";del.textContent="✕";del.title="Delete";del.onclick=e=>{e.preventDefault();const a=getT();a.splice(i,1);putT(a)};
  r.append(cb,sp,del);L.appendChild(r)})}
$("#taskIn").onkeydown=e=>{const v=e.target.value.trim();if(e.key==="Enter"&&v){const a=getT();a.unshift({t:v,d:false});e.target.value="";putT(a)}};
renderTasks();
const tp=$("#toolPanel");
function showTool(v){const was=!tp.classList.contains("hidden")&&tp.dataset.v===v;tp.classList.toggle("hidden",was);tp.dataset.v=v;
 $("#tasksV").classList.toggle("hidden",v!=="tasks");$("#focusV").classList.toggle("hidden",v!=="focus");if(!was&&v==="tasks")$("#taskIn").focus()}
$("#tTasks").onclick=e=>{e.stopPropagation();showTool("tasks")};$("#tFocus").onclick=e=>{e.stopPropagation();showTool("focus")};
tp.onclick=e=>e.stopPropagation();document.addEventListener("click",()=>tp.classList.add("hidden"));

/* ---- Focus timer ---- */
let fm=25,left=1500,fEnd=0,fT=null;const TITLE=document.title;
const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
const fShow=()=>$("#ftime").textContent=fmt(left);
function beep(){try{const a=new AudioContext(),o=a.createOscillator();o.connect(a.destination);o.frequency.value=880;o.start();setTimeout(()=>{o.stop();a.close()},700)}catch{}}
function fStop(){clearInterval(fT);fT=null;$("#fStart").textContent="Start";document.title=TITLE}
$("#fStart").onclick=()=>{if(fT){fStop();return}fEnd=Date.now()+left*1000;$("#fStart").textContent="Pause";
 fT=setInterval(()=>{left=Math.max(0,Math.round((fEnd-Date.now())/1000));fShow();document.title=fmt(left)+" · Focus";
  if(!left){fStop();left=fm*60;fShow();beep()}},500)};
$("#fReset").onclick=()=>{fStop();left=fm*60;fShow()};
document.querySelectorAll(".fm").forEach(b=>b.onclick=()=>{fm=+b.dataset.m;fStop();left=fm*60;fShow()});

/* ---- Search suggestions, history, smart answers, keyboard nav ---- */
const sg=$("#sugg"),qi=$("#q");let sT,act=-1;
const nfmt=n=>String(+n.toFixed(6));
const UN={km:["l",1000],m:["l",1],cm:["l",.01],mm:["l",.001],mile:["l",1609.344],miles:["l",1609.344],ft:["l",.3048],inch:["l",.0254],inches:["l",.0254],kg:["w",1],g:["w",.001],lb:["w",.45359237],lbs:["w",.45359237],oz:["w",.028349523]};
function calc(q){
 let m=q.match(/^(-?[\d.]+)\s*([a-z]+)\s+(?:to|in)\s+([a-z]+)$/i);
 if(m){const f=m[2].toLowerCase(),t=m[3].toLowerCase(),v=+m[1];
  if(f==="c"&&t==="f")return nfmt(v*9/5+32)+" °F";
  if(f==="f"&&t==="c")return nfmt((v-32)*5/9)+" °C";
  const a=UN[f],b=UN[t];return a&&b&&a[0]===b[0]?nfmt(v*a[1]/b[1])+" "+t:null}
 if(/^[\d\s.+\-*\/%()^x×÷]+$/.test(q)&&/[+\-*\/%^x×÷]/.test(q.replace(/^\s*-/,""))&&!/^\d{4}-\d{1,2}-\d{1,2}$/.test(q)){
  const e=q.replace(/[x×]/g,"*").replace(/÷/g,"/").replace(/\^/g,"**");
  try{const r=Function('"use strict";return ('+e+')')();if(typeof r==="number"&&isFinite(r))return nfmt(r)}catch{}}
 return null}
function renderSg(rows){
 sg.innerHTML="";act=-1;
 rows.forEach(r=>{const a=document.createElement("a");a.textContent=r.t;a.className=r.k;
  a.onclick=e=>{e.stopPropagation();
   if(r.k==="x"){store.set("hist","[]");sg.classList.add("hidden");return}
   qi.value=r.v??r.t;
   if(r.k==="c"){sg.classList.add("hidden");qi.focus();return}
   $("#search").requestSubmit()};
  sg.appendChild(a)});
 sg.classList.toggle("hidden",!rows.length)}
function showHist(){const h=getHist();
 if(cfg.hist&&h.length&&!qi.value.trim())renderSg([...h.map(t=>({t,k:"h"})),{t:"Clear history",k:"x"}]);
 else if(!qi.value.trim())sg.classList.add("hidden")}
qi.addEventListener("input",()=>{clearTimeout(sT);const q=qi.value.trim();
 const p=parseQ(q);mark(p.b?p.i:undefined);
 if(!q){showHist();return}
 const c=cfg.calc?calc(q):null,rows=c?[{t:"= "+c,v:c,k:"c"}]:[];
 if(c){renderSg(rows);return}
 if(!cfg.suggest||p.t.length<2){sg.classList.add("hidden");return}
 sT=setTimeout(async()=>{try{const d=await jget("https://suggestqueries.google.com/complete/search?client=firefox&q="+encodeURIComponent(p.t));
  const pre=p.b?q.slice(0,q.length-p.t.length):"";
  renderSg((d[1]||[]).slice(0,6).map(x=>({t:pre+x,k:"s"})))}catch{sg.classList.add("hidden")}},200)});
qi.addEventListener("focus",showHist);
qi.addEventListener("click",e=>{e.stopPropagation();showHist()});
qi.addEventListener("keydown",e=>{
 if(e.key==="Tab"&&!e.shiftKey){e.preventDefault();eng=(eng+1)%ENGINES.length;store.set("engine",eng);mark();return}
 const items=[...sg.querySelectorAll("a")];
 if(sg.classList.contains("hidden")||!items.length)return;
 if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();
  act=e.key==="ArrowDown"?(act+1)%items.length:(act<=0?items.length-1:act-1);
  items.forEach((a,i)=>a.classList.toggle("act",i===act));items[act].scrollIntoView({block:"nearest"})}
 else if(e.key==="Enter"&&act>=0){e.preventDefault();items[act].click()}
 else if(e.key==="Escape"){sg.classList.add("hidden")}});
document.addEventListener("click",()=>sg.classList.add("hidden"));

/* ---- Keyboard shortcuts: "/" search, Ctrl+, settings ---- */
document.addEventListener("keydown",e=>{const typing=/INPUT|TEXTAREA/.test(document.activeElement.tagName);
 if(e.key==="/"&&!typing){e.preventDefault();$("#q").focus()}
 if(e.ctrlKey&&e.key===","){e.preventDefault();openDrawer()}});

/* ---- Backup / restore ---- */
const KEYS=["cfg","dock","loc","locs","engine","tasks","wall"];
$("#exp").onclick=()=>{const o={};KEYS.forEach(k=>o[k]=store.get(k,null));
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(o,null,1)],{type:"application/json"}));a.download="bloom-tab-backup.json";a.click();URL.revokeObjectURL(a.href)};
$("#imp").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{try{const o=JSON.parse(r.result);KEYS.forEach(k=>{if(o[k]!=null)store.set(k,o[k])});location.reload()}catch{alert("That file isn't a valid backup.")}};r.readAsText(f)};

/* ---- Design style ---- */
document.querySelectorAll(".sty").forEach(b=>b.onclick=()=>{cfg.style=b.dataset.s;save();applyCfg()});
$("#glStr").oninput=e=>{cfg.gl=+e.target.value;save();applyCfg()};

/* ---- Wallpaper ---- */
function applyWall(){const w=store.get("wall",""),b=document.body;
 if(w){b.style.setProperty("--wall",`url(${w})`);b.classList.add("has-wall")}else{b.style.removeProperty("--wall");b.classList.remove("has-wall")}
 b.style.setProperty("--wb",(cfg.wb||0)+"px");$("#wallBlur").value=cfg.wb||0}
$("#wallIn").onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image(),u=URL.createObjectURL(f);
 im.onload=()=>{const k=Math.min(1,1600/Math.max(im.width,im.height)),cv=document.createElement("canvas");cv.width=im.width*k;cv.height=im.height*k;cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);
  const data=cv.toDataURL("image/jpeg",.8);store.set("wall",data);if(store.get("wall","")!==data)alert("Image is too large to save. Try a smaller one.");
  URL.revokeObjectURL(u);applyWall()};im.src=u};
$("#wallDel").onclick=()=>{store.set("wall","");applyWall()};
$("#wallBlur").oninput=e=>{cfg.wb=+e.target.value;save();applyWall()};
applyCfg();applyWall();setInterval(applyCfg,60000);addEventListener("resize",applyCfg);load();setInterval(load,10*60*1000);
