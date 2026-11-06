/* CHILL N’ KNOCK — interactive, front-end-only product prototype.
   No real bookings, verified venue policies, payments, or live user accounts.
   All changes are stored only in this browser (localStorage). */
'use strict';
const KEY='chill_n_knock_confirmed_v1';
const photos={
 club:'https://images.unsplash.com/photo-1571266028243-d220c9b3b157?w=800&q=85',
 bar:'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=85',
 dj:'https://images.unsplash.com/photo-1571266028243-d220c9b3b157?w=800&q=85',
 stage:'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=85',
 rooftop:'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=85',
 dancing:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85',
 lounge:'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=85',
 crowd:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=85'
};
const venues=[
{id:'sugar',name:'SUGAR CLUB',area:'Sukhumvit 11',kind:'Nightclub',genre:'Hip-Hop',rating:4.8,price:350,image:photos.club,accent:'#b8325c',desc:'Heavy bass, guest DJs and a dance floor that keeps moving. A high-energy pick for a big night.',tags:['Hip-Hop','DJ','Late night'],menu:[['House Signature','Cocktail selection','฿280'],['Sharing Set','Sample party package','฿1,250'],['Soft Drinks','Non-alcoholic options','฿120']],queue:true},
{id:'velvet',name:'ONYX',area:'RCA',kind:'Nightclub',genre:'Jazz',rating:4.9,price:250,image:photos.bar,accent:'#824361',desc:'Dim lighting, intimate seating and a soundtrack for slower conversations.',tags:['Cocktails','Jazz','Cozy'],menu:[['Velvet Fizz','Signature mocktail','฿220'],['Bar Bites','Shareable snacks','฿290'],['Seasonal Menu','Ask venue for details','—']],queue:false},
{id:'neon',name:'MU:IN',area:'Thonglor',kind:'Nightclub',genre:'Live',rating:4.7,price:300,image:photos.dancing,accent:'#6843b3',desc:'A playful night spot for live acts, indie sets and sing-along favorites.',tags:['Live Band','Indie','Dance'],menu:[['Signature Soda','Non-alcoholic mix','฿160'],['Small Plates','Shareable food','฿230']],queue:true},
{id:'rue',name:'CHUPA',area:'Thonglor',kind:'Nightclub',genre:'House',rating:4.8,price:450,image:photos.rooftop,accent:'#945a37',desc:'An open-air rooftop mood with city lights, late dinner and curated house music.',tags:['Rooftop','House','City view'],menu:[['Garden Tonic','Signature mocktail','฿240'],['Small Plates','Evening bites','฿350']],queue:false},
{id:'after',name:'UPPER HOUSE',area:'Sukhumvit',kind:'Nightclub',genre:'EDM',rating:4.6,price:350,image:photos.stage,accent:'#7b2656',desc:'Lights, sound and all-night sets with an experimental edge.',tags:['EDM','Party','Late night'],menu:[['Energy Mix','Alcohol-free selection','฿160'],['Snack Basket','For the table','฿280']],queue:true},
{id:'sky',name:'TDERM',area:'Thonglor',kind:'Nightclub',genre:'Pop',rating:4.7,price:400,image:photos.lounge,accent:'#954856',desc:'A laid-back sky-high lounge for sunset-to-midnight plans.',tags:['Rooftop','Pop','Lounge'],menu:[['Twilight Tea','Cold tea selection','฿190'],['Chef Bites','Small plates','฿340']],queue:false}
];
const events=[
{id:'e1',name:'AFTER DARK',subtitle:'FRIDAY SPECIAL',venue:'sugar',offset:1,time:'21:00',price:450,art:'poster-bg1',desc:'A guest DJ experience with big-room beats and a full night of energy.',label:'HIP-HOP / CLUB NIGHT',tag:'Trending'},
{id:'e2',name:'MIDNIGHT RUSH',subtitle:'LIVE SESSION',venue:'neon',offset:2,time:'20:30',price:350,art:'poster-bg3',desc:'Indie live music, crowd favorites and an intimate stage.',label:'INDIE / LIVE',tag:'Live music'},
{id:'e3',name:'ROOFTOP RHYTHM',subtitle:'SUNSET SERIES',venue:'rue',offset:3,time:'19:00',price:590,art:'poster-bg2',desc:'A skyline soundtrack and a curated rooftop night.',label:'HOUSE / ROOFTOP',tag:'Limited'},
{id:'e4',name:'RED FREQUENCY',subtitle:'SATURDAY EDITION',venue:'after',offset:4,time:'22:00',price:550,art:'poster-bg4',desc:'Late night visual sets, dance music and neon atmosphere.',label:'ELECTRONIC / DANCE',tag:'New'}
];
const sampleJobs=[
{id:'sample1',venue:'sugar',service:'queue',guests:4,time:'21:00',fee:350,label:'Walk-in queue help',note:'Confirm venue permission before queuing. This is an illustrative job.'},
{id:'sample2',venue:'velvet',service:'runner_booking',guests:3,time:'20:00',fee:300,label:'Advance booking assistance',note:'Contact venue and request an advance booking. Illustrative job.'}
];
function getBase(){const policies={};for(const v of venues)policies[v.id]={direct:true,runner:true,queue:v.queue};return{version:5,name:'Guest',account:null,applications:{},friends:[],rides:[],favs:[],requests:[],tickets:[],reviews:[],chats:{},policies,notifications:[],prefs:{interests:['Hip-Hop','Live'],noti:true},merchantVenue:'sugar'}}
function initDb(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.version===5&&s.policies&&Array.isArray(s.requests))return s}catch(e){}return getBase()}
let DB=initDb();let UI={role:'user',screen:'welcome',stack:[],venue:'sugar',event:'e1',infoTab:'about',tab:'requests',q:'',area:'All',genre:'All',sort:'Recommended',map:false,modal:'',modalReq:'',toast:'',service:'direct',guests:2,date:dateOffset(1),time:'21:00',seat:'Indoor',note:'',ticketQty:1,rate:5,job:'sample1',proof:'',ticketId:'',reqId:'',messageText:'',filterPrice:0};
const icons={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',ticket:'<path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4V5zM12 5v2m0 3v2m0 3v4"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 4-7 8-7s8 2 8 7"/>',heart:'<path d="M20.8 7.4c0 4.3-8.8 11.6-8.8 11.6S3.2 11.7 3.2 7.4C3.2 3.2 9 2 12 6c3-4 8.8-2.8 8.8 1.4z"/>',pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',back:'<path d="m15 18-6-6 6-6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 10h18c0-2-3-3-3-10M10 21h4"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',sliders:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="currentColor"/><circle cx="16" cy="17" r="2" fill="currentColor"/>',music:'<path d="M9 18V5l12-2v13M9 9l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',spark:'<path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',users:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 14a4 4 0 0 1 5 4v2"/>',star:'<path d="m12 2 3.1 6.4L22 9.3l-5 5 .9 7L12 18l-5.9 3.3.9-7-5-5 6.9-.9z"/>',check:'<path d="m5 12 4 4L19 6"/>',x:'<path d="m5 5 14 14M19 5 5 19"/>',chat:'<path d="M21 11a8 8 0 0 1-8 8H5l-2 3V11a9 9 0 1 1 18 0z"/>',shield:'<path d="m12 2 8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6z"/><path d="m8 12 3 3 5-6"/>',wallet:'<rect x="3" y="6" width="18" height="15" rx="2"/><path d="M5 6V4h13M15 14h6"/>',briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>',chart:'<path d="M4 20V9m6 11V4m6 16v-7m5 7V6"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2m0-14-2 2M7 17l-2 2"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.5 10.5 7-4m-7 7 7 4"/>',edit:'<path d="M4 20h16M6 16l10-10 3 3-10 10-4 1z"/>',help:'<circle cx="12" cy="12" r="10"/><path d="M9 9a3 3 0 0 1 6 1c0 2-3 2-3 4m0 3v1"/>',map:'<path d="m3 5 6-3 6 3 6-3v17l-6 3-6-3-6 3zM9 2v17m6-14v17"/>',external:'<path d="M13 4h7v7M20 4l-9 9M20 14v6H4V4h6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',camera:'<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10v1"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6z"/>',gift:'<rect x="4" y="10" width="16" height="12"/><path d="M2 7h20v4H2zM12 7v15"/><path d="M12 7c-7 0-6-6-2-5 2 1 2 5 2 5zm0 0c7 0 6-6 2-5-2 1-2 5-2 5z"/>',logout:'<path d="M10 5H4v14h6m-1-7h12m-4-4 4 4-4 4"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>'};
function ic(name,size=19){return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.spark}</svg>`}
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const V=(id)=>venues.find(v=>v.id===id)||venues[0],E=(id)=>events.find(v=>v.id===id)||events[0];
function dateOffset(n=0){let d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function niceDate(s){let d=new Date(String(s)+'T12:00:00');return Number.isFinite(d.getTime())?new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short'}).format(d):s}
function tinyDate(s){let d=new Date(String(s)+'T12:00:00');return Number.isFinite(d.getTime())?new Intl.DateTimeFormat('th-TH',{day:'numeric',month:'short'}).format(d):s}
function baht(n){return '฿'+Number(n||0).toLocaleString('en-US')}
const localCovers=Object.fromEntries(Object.entries(photos).map(([name,src])=>[src,'assets/'+name+'.jpg']));
function media(src,accent='#66283c'){const art=localCovers[src]||'assets/club.jpg';return `background-image:linear-gradient(180deg,${accent}19 0%,#17081122 35%,#130c16c8 100%),linear-gradient(135deg,${accent}33,#1e182622),url('${src}'),url('${art}')`}
function save(){try{localStorage.setItem(KEY,JSON.stringify(DB))}catch(err){console.warn('localStorage unavailable',err)}}
function notify(msg){DB.notifications.unshift({id:'n'+Date.now(),text:msg,at:new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})});if(DB.notifications.length>60)DB.notifications.length=60;save()}
function toast(msg){UI.toast=msg;render(true);clearTimeout(toast.timer);toast.timer=setTimeout(()=>{UI.toast='';const t=document.getElementById('toast');if(t)t.remove()},3000)}
function title(name,sub=''){return `<header class="back-header"><button class="circle-btn" aria-label="Back" onclick="App.back()">${ic('back')}</button><div class="grow"><h1>${e(name)}</h1>${sub?`<small>${e(sub)}</small>`:''}</div><button class="circle-btn" onclick="App.openModal('role')" aria-label="Switch role">${ic('menu',18)}</button></header>`}
function brandHeader(){return `<header class="top safe-top"><div class="brand-row"><img src="logo.png" alt="CHILL N KNOCK" class="brand-logo"><div><div class="brand-name">CHILL N’<br>KNOCK</div><div class="location-label">${ic('pin',11)} BANGKOK <span style="color:#e37993">●</span> DEMO</div></div></div><div class="header-actions"><button class="circle-btn" onclick="App.openModal('notifications')" aria-label="Notifications">${ic('bell',17)}${DB.notifications.length?'<i class="dot"></i>':''}</button><button class="circle-btn" onclick="App.go('profile')" aria-label="Account">${ic('user',17)}</button></div></header>`}
function sec(label,sub,action=''){return `<div class="section-bar"><div><div class="eyebrow" style="margin-bottom:7px">${e(sub)}</div><h2>${e(label)}</h2></div>${action?`<button class="inline-link" onclick="${action}">View all ${ic('arrow',14)}</button>`:''}</div>`}
function demoFooter(){return '<p class="footer-small">CHILL N’ KNOCK · Interactive UX Prototype<br>All venues, events, prices and statuses shown are illustrative. Not a live booking service.</p>'}
function venueTile(v,i=0){let saved=DB.favs.includes(v.id);return `<button class="venue-tile" onclick="App.openVenue('${v.id}')" aria-label="View ${e(v.name)}"><div class="image photo" style="${media(v.image,v.accent)}"><div class="large-num">0${i+1}</div><span class="v-rating"><span class="star">★</span>${v.rating}</span><div class="v-photo-tags"><span class="pill tiny rose">${e(v.kind)}</span></div></div><div class="spread"><div class="v-name truncate">${e(v.name)}</div><span style="color:${saved?'#f37c9b':'#ad8b9c'}">${ic('heart',15)}</span></div><div class="v-sub">${ic('pin',12)} ${e(v.area)} · From ${baht(v.price)}*</div></button>`}
function wideVenue(v){const p=DB.policies[v.id]||{};return `<button class="venue-wide" onclick="App.openVenue('${v.id}')"><div class="image" style="${media(v.image,v.accent)}"></div><div class="wide-info"><div class="wide-title">${e(v.name)}</div><div class="wide-sub">${e(v.area)} · ${e(v.kind)}<br>${e(v.genre)} · ★ ${v.rating}</div><div class="wide-footer"><span class="pill tiny ${p.direct?'mint':'outline'}">${p.direct?'● Requests on':'○ Requests off'}</span><span class="accent strong">DETAILS ${ic('chevron',12)}</span></div></div></button>`}
function eventTile(ev){
  const v=V(ev.venue);
  const rescheduled=ev.status==='rescheduled';
  const dateLabel=rescheduled?'8 พ.ย. (วันจัดใหม่)':niceDate(ev.date||dateOffset(ev.offset));
  return `<button class="event-card" onclick="App.openEvent('${ev.id}')">
    <div class="event-poster image" style="padding:0;background:#241421">
      <img src="assets/events/${ev.id}.jpg" alt="โปสเตอร์ ${e(ev.name)}" loading="lazy"
        style="display:block;width:100%;height:100%;object-fit:cover"
        onerror="this.onerror=null;this.src='assets/club.jpg'">
    </div>
    <strong class="truncate">${e(ev.name)}</strong>
    <div class="v-sub">${e(v.name)} · ${e(dateLabel)}</div>
  </button>`;
}
function home(){return `<div class="screen">${brandHeader()}<section class="hero image" style="background-image:linear-gradient(180deg,#7e174522 0%,#160B1120 40%,#170A17A8 100%),url('assets/hero.jpg');background-size:cover;background-position:center"><div class="decor">N</div><div class="hero-stamp">DRINK • DINE • DISCOVER</div><div class="hero-kicker"><span class="tag-dot"></span> THE NIGHT IS CALLING</div><h1>MAKE<br>IT A <em>NIGHT.</em></h1><p>Discover Bangkok after dark. Find your people, your music, your next favorite spot.</p><button class="btn cream hero-cta" onclick="App.go('discover')">EXPLORE TONIGHT ${ic('arrow',17)}</button></section>
<div class="quick"><button class="quick-btn" onclick="App.quick('All')"><span class="qi">${ic('compass',21)}</span>Explore all</button><button class="quick-btn" onclick="App.quick('Live')"><span class="qi">${ic('music',21)}</span>Live Music</button><button class="quick-btn" onclick="App.quick('Hip-Hop')"><span class="qi">${ic('spark',21)}</span>Nightclubs</button><button class="quick-btn" onclick="App.go('events')"><span class="qi">${ic('ticket',21)}</span>Events</button><button class="quick-btn" onclick="App.openModal('map')"><span class="qi">${ic('map',21)}</span>Near me*</button></div>
<div class="section"><div class="pad">${sec('TONIGHT’S PICKS','THE HOT LIST',"App.go('discover')")}</div><div class="scroll-x">${venues.slice().sort((a,b)=>Number(DB.prefs.interests.includes(b.genre))-Number(DB.prefs.interests.includes(a.genre))).slice(0,4).map(venueTile).join('')}</div></div>
<div class="feature-banner"><div><div class="micro" style="color:#ffd8e0">INTRODUCING THE TABLE RUNNER</div><h3>LESS WAIT.<br>MORE NIGHT.</h3><p>Get help requesting a table or joining an eligible walk-in queue.</p></div><button aria-label="Explore Table Runner" onclick="App.go('guide')">${ic('arrow')}</button></div>
<div class="section"><div class="pad">${sec('DON’T MISS OUT','ON THE RADAR',"App.go('events')")}</div><div class="scroll-x">${events.slice(0,3).map(eventTile).join('')}</div></div>
<div class="section pad">${sec('THE NIGHT, YOUR WAY','ONE APP · THREE SIDES')}<div class="subtle-card"><div class="row">${ic('shield',25)}<div><b style="font-size:13px">Transparent booking journeys</b><p class="hint" style="margin:4px 0 0">Requests, runner progress and venue approval are shown separately. No guaranteed table.</p></div></div></div>${demoFooter()}</div></div>`}
function quick(g){UI.genre=g;UI.area='All';UI.q='';UI.map=false;go('discover')}
function filteredVenues(){let q=UI.q.trim().toLowerCase();let a=venues.filter(v=>(UI.area==='All'||v.area===UI.area)&&(UI.genre==='All'||v.genre===UI.genre||v.kind.toLowerCase().includes(UI.genre.toLowerCase())||v.tags.includes(UI.genre))&&(!q||[v.name,v.area,v.kind,v.genre,...v.tags].join(' ').toLowerCase().includes(q))&&(UI.filterPrice===0||v.price<=UI.filterPrice));if(UI.sort==='Top rated')a.sort((a,b)=>b.rating-a.rating);if(UI.sort==='Lowest sample price')a.sort((a,b)=>a.price-b.price);return a}
function discoveryResults(){const v=filteredVenues();return `<div class="search-meta"><span>${v.length} sample venues found</span><button class="inline-link" onclick="App.toggleMap()">${ic(UI.map?'menu':'map',13)} ${UI.map?'List view':'Map preview'}</button></div>${UI.map?`<div class="mini-map"><div class="map-title">Bangkok · Schematic map</div><button class="map-pin" style="top:68px;left:42%" onclick="App.openVenue('sugar')">${ic('pin',13)}</button><button class="map-pin" style="top:112px;left:65%" onclick="App.openVenue('velvet')">${ic('pin',13)}</button><button class="map-pin" style="top:157px;left:22%" onclick="App.openVenue('neon')">${ic('pin',13)}</button><button class="map-pin" style="top:64px;left:77%" onclick="App.openVenue('rue')">${ic('pin',13)}</button><span class="map-disclaimer">Illustration · Not live GPS</span></div>`:''}${v.length?v.map(wideVenue).join(''):`<div class="empty"><div class="emptyicon">${ic('search',25)}</div><h3>No venues found</h3><p>Try another neighborhood, music style or budget.</p><button class="btn soft smallbtn" onclick="App.resetFilters()">Reset filters</button></div>`}`}
function discover(){const areas=['All','RCA','Thonglor','Ekkamai','Sukhumvit','Sathorn','Silom'];const genres=['All','Hip-Hop','Live','Jazz','House','EDM','Pop'];return `<div class="screen">${brandHeader()}<div class="pad discovery-header"><div class="eyebrow">FIND YOUR SCENE</div><h1>DISCOVER<br><span class="accent">AFTER DARK.</span></h1><div class="searchbar-row"><label class="searchbox">${ic('search')}<input id="discovery-search" aria-label="Search venues" placeholder="Venues, music, neighborhoods..." value="${e(UI.q)}" oninput="App.setQuery(this.value)"></label><button class="filter-btn" aria-label="Filters" onclick="App.openModal('filter')">${ic('sliders',22)}</button></div><div class="micro" style="margin:23px 0 9px">NEIGHBORHOOD</div><div class="chips">${areas.map(a=>`<button class="chip ${UI.area===a?'active':''}" onclick="App.setArea('${a}')">${a}</button>`).join('')}</div><div class="micro" style="margin:18px 0 9px">MUSIC & MOOD</div><div class="chips">${genres.map(g=>`<button class="chip ${UI.genre===g?'line-active':''}" onclick="App.setGenre('${g}')">${g}</button>`).join('')}</div><div id="discovery-results">${discoveryResults()}</div><div class="content-note">* Sample starting prices and venue policies are not verified. Confirm with venues before visiting.</div></div></div>`}
function detailInfo(v){
  const venueAddress = {
    velvet: 'RCA Alley, Bang Kapi, Huai Khwang, Bangkok 10310',
    sugar: 'สุขุมวิท 11 เขตวัฒนา กรุงเทพมหานคร 10110',
    neon: 'ทองหล่อ เขตวัฒนา กรุงเทพมหานคร 10110',
    rue: 'เอกมัย เขตวัฒนา กรุงเทพมหานคร 10110'
  };

  const venueHours = {
    velvet: '20:00 – 02:00 น. (ทุกวัน)',
    sugar: '21:00 – 02:00 น. (ทุกวัน)',
    neon: '19:00 – 01:00 น. (พฤ.–อา.)',
    rue: '18:00 – 00:00 น. (ทุกวัน)'
  };

  const menuThumbs = {
    mojito: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&q=80',
    juice: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&q=80',
    whiskey: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=300&q=80',
    beer: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&q=80'
  };

  const menuData = {
    velvet: [
      { name:'Mojito', desc:'ค็อกเทลซิกเนเจอร์รสสดชื่น', price:'฿380 (อ้างอิง)', img:menuThumbs.mojito },
      { name:'เครื่องดื่ม/น้ำผลไม้ pre-mixed', desc:'ดื่มง่าย เหมาะกับการแชร์', price:'฿320 (อ้างอิง)', img:menuThumbs.juice },
      { name:'Bottle Set', desc:'เซ็ตสำหรับกลุ่มเพื่อน', price:'฿2,900 (อ้างอิง)', img:menuThumbs.whiskey },
      { name:'เบียร์ (ขวด)', desc:'ตัวเลือกมาตรฐานสำหรับเริ่มต้น', price:'฿180 (อ้างอิง)', img:menuThumbs.beer }
    ]
  };

  const reviewData = {
    velvet: [
      { icon:'🎵', text:'ดนตรีดี DJ เก่ง พนักงานเป็นมิตร แต่พื้นที่เต้นน้อย' },
      { icon:'🍸', text:'ราคาเครื่องดื่มสูง และร้านแน่นมากช่วงพีค' },
      { icon:'💸', text:'Mojito 380 บาท ก่อนค่าบริการ และโต๊ะมี minimum spend 5,000 บาท' }
    ]
  };

  const photoSet = {
    velvet: [v.image, photos.lounge]
  };

  const address = venueAddress[v.id] || `${e(v.area)}, Bangkok`;
  const openHours = venueHours[v.id] || '20:00 – 02:00 น.';
  const reviews = reviewData[v.id] || [
    { icon:'⭐', text:'บรรยากาศดี เหมาะกับสายปาร์ตี้' },
    { icon:'🎧', text:'แนวเพลงและสไตล์ร้านชัดเจน' }
  ];
  const menu = menuData[v.id] || (v.menu || []).map((m, i) => ({
    name: m[0],
    desc: m[1],
    price: m[2],
    img: [menuThumbs.mojito, menuThumbs.juice, menuThumbs.whiskey, menuThumbs.beer][i % 4]
  }));
  const gallery = photoSet[v.id] || [v.image, photos.crowd];

  if (UI.infoTab === 'about') {
    return `
      <div class="detail-block">
        <h3 class="detail-section-title">เกี่ยวกับร้าน</h3>
        <p class="detail-lead">${e(v.desc)}</p>

        <div class="detail-tags">
          ${v.tags.map(t => `<span class="pill outline">${e(t)}</span>`).join('')}
        </div>
      </div>

      <div class="detail-block">
        <h3 class="detail-section-title">ที่ตั้งร้าน</h3>

        <div class="venue-map-card">
          <div class="venue-map-thumb">
            <div class="venue-map-pin">${ic('pin',14)}</div>
          </div>

          <div class="venue-map-row">
            <div class="venue-address">${address}</div>
            <button class="map-open-btn" onclick="App.openMap('${v.id}')">
              ${ic('map',15)} เปิดแผนที่
            </button>
          </div>
        </div>
      </div>

      <div class="detail-block">
        <h3 class="detail-section-title">ช่วงเวลาเปิดบริการ</h3>
        <div class="hours-row">
          <span class="hours-icon">${ic('clock',15)}</span>
          <span>${openHours}</span>
        </div>
      </div>
    `;
  }

  if (UI.infoTab === 'menu') {
    return `
      <div class="detail-block">
        <h3 class="detail-section-title">เมนูและแพ็กเกจ</h3>
        <p class="detail-lead detail-lead--small">
          ราคาอ้างอิงจากข้อมูลที่รวบรวม อาจเปลี่ยนแปลงและอาจยังไม่รวมค่าบริการหรือภาษี
        </p>

        <div class="menu-card-list">
          ${menu.map(item => `
            <div class="menu-card">
              <div class="menu-thumb" style="background-image:url('${item.img}')"></div>

              <div class="menu-meta">
                <strong>${e(item.name)}</strong>
                <small>${e(item.desc)}</small>
              </div>

              <div class="menu-price">${e(item.price)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (UI.infoTab === 'reviews') {
    return `
      <div class="detail-block">
        <h3 class="detail-section-title">รีวิวและความคิดเห็น <span class="review-score-inline">⭐ ${v.rating}/5</span></h3>
        <p class="detail-lead detail-lead--small">
          ความคิดเห็นจากข้อมูลที่ทีมรวบรวม ไม่ใช่รีวิวสด
        </p>

        <div class="review-card-list">
          ${reviews.map(r => `
            <div class="review-soft-card">
              <div class="review-soft-icon">${r.icon}</div>
              <div class="review-soft-text">${e(r.text)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (UI.infoTab === 'gallery') {
    return `
      <div class="detail-block">
        <h3 class="detail-section-title">รูปภาพบรรยากาศร้าน</h3>

        <div class="gallery-vertical">
          ${gallery.slice(0,2).map((p,i)=>`
            <div class="gallery-photo-card">
              <div class="gallery-photo image" style="${media(p,v.accent)}"></div>
              <div class="gallery-photo-caption">ภาพบรรยากาศร้าน ${i+1}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return '';
}
function venueDetail(){let v=V(UI.venue),p=DB.policies[v.id];return `<div class="screen"> <div class="detail-cover image" style="${media(v.image,v.accent)}"><div class="detail-top"><button class="circle-btn" onclick="App.back()" aria-label="Back">${ic('back')}</button><div class="row"><button class="circle-btn" onclick="App.toggleFav('${v.id}')" aria-label="Save favorite" style="color:${DB.favs.includes(v.id)?'#ff94aa':'#fff'}">${ic('heart')}</button><button class="circle-btn" onclick="App.shareVenue('${v.id}')" aria-label="Share">${ic('share')}</button></div></div><div class="detail-bottom"><span class="pill rose">${e(v.kind)} · ${e(v.genre)}</span><h1>${e(v.name)}</h1><p>${ic('pin',13)} ${e(v.area)} · Bangkok <span style="margin:0 6px">•</span> ★ ${v.rating} sample</p></div></div><div class="pad"><div class="detail-stats"><div class="stat"><b>${v.rating} ★</b><span>Demo rating</span></div><div class="stat"><b>${baht(v.price)}*</b><span>Sample price from</span></div><div class="stat"><b>${p.queue?'Available*':'Not shown'}</b><span>Queue-help policy</span></div></div><div class="info-tabs">${[['about','Overview'],['menu','Menu'],['reviews','Reviews'],['gallery','Photos']].map(([id,label])=>`<button class="${UI.infoTab===id?'active':''}" onclick="App.setInfoTab('${id}')">${label}</button>`).join('')}</div>${detailInfo(v)}<div style="height:8px"></div><div class="safety">${ic('info',18)}<span>All listings and policy switches are for demonstration only. A booking or queue request does not guarantee a table or entry.</span></div></div><div class="floating-cta"><div><div class="micro">YOUR NIGHT STARTS HERE</div><strong style="font-size:11px">3 ways to request</strong></div><button class="btn" onclick="App.startBooking('${v.id}')">BOOK YOUR NIGHT ${ic('arrow',16)}</button></div></div>`}
function eventList(){return `<div class="screen">${brandHeader()}<div class="pad discovery-header"><div class="eyebrow">PARTY CALENDAR</div><h1>WHAT’S<br><span class="accent">ON TONIGHT?</span></h1><p class="hint">Curated event concepts, illustrated ticket flow. Dates and prices are demo-only.</p><div class="section-bar" style="margin-top:25px"><h2>UPCOMING EVENTS</h2><span class="pill rose">${events.length} EVENTS</span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:22px 11px">${events.map(ev=>`<div style="min-width:0">${eventTile(ev)}</div>`).join('')}</div>${demoFooter()}</div></div>`}
function eventDetail(){let ev=E(UI.event),v=V(ev.venue);return `<div class="screen"><div class="detail-cover image ${ev.art}" style="${media(photos.crowd,'#652042')}"><div class="detail-top"><button class="circle-btn" onclick="App.back()">${ic('back')}</button><button class="circle-btn" onclick="App.shareEvent('${ev.id}')">${ic('share')}</button></div><div class="detail-bottom"><span class="pill rose">${e(ev.label)}</span><h1>${e(ev.name)}</h1><p>${e(ev.subtitle)}</p></div></div><div class="pad"><div class="section-bar" style="margin-top:22px"><h2>THE EXPERIENCE</h2></div><p style="color:#d3bfc9;font-size:13px;line-height:1.8">${e(ev.desc)}</p><div class="subtle-card stack"><div class="row">${ic('calendar',20)} <span class="grow">${niceDate(dateOffset(ev.offset))}, ${ev.time}</span></div><div class="row">${ic('pin',20)} <span class="grow">${e(v.name)} · ${e(v.area)}</span><button class="inline-link" onclick="App.openVenue('${v.id}')">Venue ${ic('chevron',12)}</button></div><div class="row">${ic('ticket',20)} <span>Illustrative admission · ${baht(ev.price)} / ticket</span></div></div><div class="section">${sec('CHOOSE TICKETS','SAMPLE ADMISSION')}<div class="spread form-card"><div><strong>General admission</strong><div class="hint">Admission request · Demo only</div></div><div class="num-control"><button onclick="App.qty(-1)">−</button><b>${UI.ticketQty}</b><button onclick="App.qty(1)">+</button></div></div><div class="line"></div><div class="spread"><b>Total (sample)</b><b style="font-size:22px">${baht(ev.price*UI.ticketQty)}</b></div><div class="safety" style="margin-top:14px">${ic('shield',17)} No payment is taken. The issued ticket is a simulated pass, not a valid entry ticket.</div></div></div><div class="floating-cta"><button class="btn full" onclick="App.issueTicket()">GENERATE DEMO TICKET ${ic('arrow',17)}</button></div></div>`}
function serviceScreen(){let v=V(UI.venue),p=DB.policies[v.id];let options=[{id:'direct',icon:'calendar',name:'Request directly',desc:'Send a table request for the venue to review.',available:p.direct,fee:0},{id:'runner_pickup',icon:'shield',name:'จองเอง แล้วให้ Runner ไปรับโต๊ะ',desc:'คุณจองกับร้านเองก่อน แล้วให้ Runner ไปช่วยเช็กอิน/รับโต๊ะตามกฎร้าน',available:p.runner,fee:300},{id:'runner_booking',icon:'users',name:'Runner · Advance booking',desc:'Ask a runner to help contact the venue and request a table.',available:p.runner,fee:300},{id:'queue',icon:'clock',name:'Runner · Walk-in queue',desc:'Ask a runner to wait at the venue, only where allowed.',available:p.queue,fee:350}];return `<div class="screen">${title('Book your night','Step 1 / 3 · Select a service')}<div class="stepper"><span class="done"></span><span></span><span></span></div><div class="pad"><div class="eyebrow" style="margin:15px 0 7px">${e(v.name)} · ${e(v.area)}</div><h1 class="s-title" style="font-size:44px;margin:0 0 19px">HOW DO YOU<br>WANT TO GO?</h1>${options.map(o=>`<button class="service-option ${UI.service===o.id?'selected':''}" ${o.available?'':'disabled'} onclick="App.chooseService('${o.id}')"><div class="service-mark">${ic(o.icon,22)}</div><div class="grow"><strong>${e(o.name)}</strong><p>${e(o.desc)}</p><div style="margin-top:6px;font-size:10px;color:${o.available?'#f6c1ce':'#aaa'}">${o.available?'Example service fee: '+baht(o.fee):'Disabled in demo venue policy'}</div></div><span class="radio"></span></button>`).join('')}<div class="safety">${ic('shield',18)}<span>Venue permission is required. A runner cannot guarantee a table, a queue spot or entry. Demo fees are not charged and do not represent actual prices.</span></div><div style="margin-top:21px"><button class="btn full" onclick="App.go('booking-form')" ${!p[['runner_booking','runner_pickup'].includes(UI.service)?'runner':UI.service]?'disabled':''}>CONTINUE ${ic('arrow',17)}</button></div></div></div>`}
function bookingForm(){let v=V(UI.venue),p=DB.policies[v.id],isq=UI.service==='queue';return `<div class="screen">${title('Your night, your details','Step 2 / 3 · Customize request')}<div class="stepper"><span class="done"></span><span class="done"></span><span></span></div><div class="pad"><div class="eyebrow" style="margin-top:17px">MAKE THE PLAN</div><h1 class="s-title" style="font-size:45px;margin:8px 0 18px">SET THE<br><span class="accent">DETAILS.</span></h1><div class="form-card"><div class="spread"><div><div class="micro">DESTINATION</div><strong style="display:block;margin:6px 0 0">${e(v.name)}</strong><small class="hint">${e(v.area)} · ${e(v.kind)}</small></div><span class="pill tiny rose">${isq?'Walk-in help':UI.service==='direct'?'Direct request':'Booking helper'}</span></div></div>
<label class="field-label">เลือกวันที่</label>
${window.CNK_bookingCalendar()}
<label class="field-label">Preferred arrival time</label><div class="selectrow">${['18:00','18:30','19:00','19:30','20:00','20:30','21:00'].map(t=>`<button class="choice ${UI.time===t?'active':''}" onclick="App.formChange('time','${t}')">${t}</button>`).join('')}</div>
<label class="field-label">Your group size</label><div class="subtle-card spread"><span class="hint">Including you</span><div class="num-control"><button onclick="App.guests(-1)">−</button><b id="cnk-guest-count">${UI.guests}</b>
<button onclick="App.guests(1)">+</button></div></div>
${!isq?`<label class="field-label">Preferred seating <small>(subject to venue)</small></label><div class="selectrow">${['Indoor','Outdoor','VIP','Bar'].map(x=>`<button class="choice ${UI.seat===x?'active':''}" onclick="App.formChange('seat','${x}')">${x}</button>`).join('')}</div>`:''}
<label class="field-label" for="bookingnotes">A message for the ${UI.service==='direct'?'venue':'runner'} <small>(optional)</small></label><textarea class="field fieldarea" maxlength="350" id="bookingnotes" placeholder="e.g. We are celebrating a birthday. Please confirm requirements." oninput="App.formChange('note',this.value,false)">${e(UI.note)}</textarea>
${isq?`<div class="notice-card">A queue helper can only act where the venue explicitly permits it. You may still need to appear in person before admission.</div>`:''}<div style="margin:22px 0"><button class="btn full" onclick="App.reviewBooking()">REVIEW REQUEST ${ic('arrow',16)}</button></div></div></div>`}
function feeFor(s){return s==='queue'?350:['runner_booking','runner_pickup'].includes(s)?300:0}
function serviceName(s){return({direct:'Direct table request',runner_booking:'Runner · Advance booking',runner_pickup:'จองเอง + Runner รับโต๊ะ',queue:'Runner · Walk-in queue'})[s]||s}
function bookingReview(){let v=V(UI.venue);const fees=feeFor(UI.service);return `<div class="screen">${title('Review & submit','Step 3 / 3 · Not a confirmed booking')}<div class="stepper"><span class="done"></span><span class="done"></span><span class="done"></span></div><div class="pad"><div class="eyebrow" style="margin-top:15px">FINAL CHECK</div><h1 class="s-title" style="font-size:44px;margin:8px 0 19px">READY FOR<br><span class="accent">YOUR NIGHT?</span></h1><div class="form-card"><span class="pill rose">${e(serviceName(UI.service))}</span><h2 style="font-size:22px;margin:13px 0 12px">${e(v.name)}</h2>${[['Neighborhood',v.area],['Date & time',niceDate(UI.date)+' · '+UI.time],['Guests',String(UI.guests)],...(UI.service!=='queue'?[['Seating preference',UI.seat]]:[]),['Special request',UI.note||'None']].map(([k,val])=>`<div class="spread" style="padding:9px 0;border-bottom:1px solid var(--line);gap:12px"><span class="hint">${e(k)}</span><strong style="font-size:12px;text-align:right">${e(val)}</strong></div>`).join('')}</div><div class="subtle-card" style="margin-top:13px"><div class="spread"><span class="hint">Illustrative runner service fee</span><strong>${baht(fees)}</strong></div><p class="hint" style="margin:10px 0 0">No charge is collected in this prototype. Actual service price, venue deposit and cancellation terms require agreement.</p></div><div class="safety" style="margin-top:13px">${ic('shield',19)}<span>Submitting sends a demo request only. Venue approval, runner availability, entry eligibility and queue transfer conditions are not guaranteed.</span></div><button class="btn full" style="margin-top:19px" onclick="App.submitBooking()">SEND DEMO REQUEST ${ic('arrow',17)}</button><button class="btn ghost full" style="margin-top:9px" onclick="App.back()">Edit details</button></div></div>`}
const stLabels={finding_runner:'Finding a runner',pending_venue:'Awaiting venue review',contacting:'Runner contacting venue',queuing:'Runner checking queue',awaiting_venue:'Waiting for venue verification',confirmed:'Venue confirmed',queue_verified:'Queue help verified',declined:'Not approved',cancelled:'Cancelled'};
function statusLabel(s){return stLabels[s]||'Request sent'}
function userStatusThai(status) {
  return ({
    finding_runner: 'กำลังหา Runner',
    pending_venue: 'รอร้านตรวจสอบ',
    contacting: 'Runner กำลังติดต่อร้าน',
    queuing: 'Runner กำลังตรวจสอบคิว',
    awaiting_venue: 'รอร้านยืนยัน',
    confirmed: 'ร้านยืนยันแล้ว',
    queue_verified: 'ร้านตรวจสอบคิวแล้ว',
    declined: 'ร้านไม่อนุมัติ',
    cancelled: 'ยกเลิกแล้ว'
  })[status] || 'ส่งคำขอแล้ว';
}
function isDone(r){return ['confirmed','queue_verified','declined','cancelled'].includes(r.status)}
function requestById(id){return DB.requests.find(x=>x.id===id)}
function bookingReceipt() {
  const r = requestById(UI.reqId);
  if (!r) return activity();

  const venue = V(r.venue);

  return `
    <div class="screen">
      ${title(
        'ส่งคำขอแล้ว',
        'ยังไม่ใช่การจองที่ได้รับการยืนยัน'
      )}

      <div class="pad"
        style="text-align:center;padding-top:28px">

        <div style="
          background:#392032;
          border-radius:50%;
          width:96px;
          height:96px;
          display:grid;
          place-items:center;
          color:#f68ca1;
          margin:0 auto 20px;
        ">
          ${ic('check',49)}
        </div>

        <div class="eyebrow">
          ระบบได้รับคำขอแล้ว
        </div>

        <h1 class="display"
          style="
            font-size:38px;
            line-height:1.24;
            margin:12px 0 16px;
          ">
          ส่งคำขอ<br>เรียบร้อยแล้ว
        </h1>

        <p class="hint">
          เราได้รับคำขอสำหรับ
          ${e(venue.name)} แล้ว
          กรุณาติดตามสถานะและรอการตอบรับ
          จากร้านหรือ Runner
        </p>

        <div class="subtle-card"
          style="margin:22px 0;text-align:left">

          <div class="spread">
            <span class="micro">รหัสคำขอ</span>
            <b>${e(r.id)}</b>
          </div>

          <div class="line"></div>

          <div class="spread">
            <span class="hint">สถานะปัจจุบัน</span>
            <span class="pill tiny gold">
              ${e(userStatusThai(r.status))}
            </span>
          </div>

        </div>

        <button class="btn full"
          onclick="App.openTracking('${r.id}')">
          ติดตามสถานะ ${ic('arrow',17)}
        </button>

        <button class="btn full ghost"
          style="margin-top:10px"
          onclick="App.go('activity')">
          ดูรายการในคืนของฉัน
        </button>

        <button class="inline-link"
          style="margin-top:23px"
          onclick="App.go('home')">
          กลับหน้าหลัก
        </button>

      </div>
    </div>
  `;
}
function statusPlan(r){if(r.service==='direct')return[{t:'Request submitted',ok:true,d:'The venue has received a sample request.'},{t:'Venue reviewing',ok:!['pending_venue'].includes(r.status),active:r.status==='pending_venue',d:'The venue needs to confirm availability and terms.'},{t:'Venue confirmation',ok:r.status==='confirmed',active:false,d:'Only the venue can confirm a table.'}];if(['runner_booking','runner_pickup'].includes(r.service))return[{t:'Request submitted',ok:true,d:'Booking help requested.'},{t:'Runner assigned',ok:!['finding_runner'].includes(r.status),active:r.status==='finding_runner',d:'Runner availability is not guaranteed.'},{t:'Venue contacted',ok:['awaiting_venue','confirmed'].includes(r.status),active:r.status==='contacting',d:'Runner contacts the venue and submits details.'},{t:'Venue confirmation',ok:r.status==='confirmed',active:r.status==='awaiting_venue',d:'Only the venue can confirm the request.'}];return[{t:'Request submitted',ok:true,d:'Walk-in queue help requested.'},{t:'Runner assigned',ok:!['finding_runner'].includes(r.status),active:r.status==='finding_runner',d:'Venue policy needs to permit queue help.'},{t:'Queue progress verified by runner',ok:['awaiting_venue','queue_verified'].includes(r.status),active:r.status==='queuing',d:'Progress is reported by the runner, not guaranteed.'},{t:'Venue review',ok:r.status==='queue_verified',active:r.status==='awaiting_venue',d:'Venue decides whether queue assistance is accepted; entry not guaranteed.'}]}
function requestCard(r){const v=V(r.venue);return `<div class="request-card"><div class="request-top"><span class="pill tiny rose">${e(serviceName(r.service))}</span><span class="pill tiny ${r.status==='confirmed'||r.status==='queue_verified'?'mint':r.status==='declined'||r.status==='cancelled'?'outline':'gold'}">${e(statusLabel(r.status))}</span></div><h3>${e(v.name)}</h3><div class="request-meta">${ic('calendar',12)} ${niceDate(r.date)} · ${e(r.time)} &nbsp; ${ic('users',12)} ${r.guests} guests<br>${e(v.area)} · ${e(r.id)}</div><div class="row" style="margin-top:12px"><button class="btn smallbtn grow" onclick="App.openTracking('${r.id}')">View status ${ic('arrow',14)}</button><button class="btn smallbtn ghost" onclick="App.openChat('${r.id}')">${ic('chat',15)} Message</button></div></div>`}
function activity(){return `<div class="screen">${brandHeader()}<div class="pad discovery-header"><div class="eyebrow">ALL YOUR PLANS</div><h1>YOUR<br><span class="accent">NIGHTS.</span></h1>${myExtras()}<div class="chips" style="margin:21px 0 22px"><button class="chip ${UI.tab==='requests'?'active':''}" onclick="App.setActivityTab('requests')">Bookings & queue</button><button class="chip ${UI.tab==='tickets'?'active':''}" onclick="App.setActivityTab('tickets')">Event tickets</button><button class="chip ${UI.tab==='saved'?'active':''}" onclick="App.setActivityTab('saved')">Saved venues</button></div>${UI.tab==='requests'?DB.requests.filter(r=>r.owner==='guest').length?DB.requests.filter(r=>r.owner==='guest').slice().reverse().map(requestCard).join(''):`<div class="empty"><div class="emptyicon">${ic('calendar',27)}</div><h3>No night plans yet</h3><p>Discover a venue and create your first sample request.</p><button class="btn smallbtn" onclick="App.go('discover')">Explore venues ${ic('arrow',15)}</button></div>`:UI.tab==='tickets'?DB.tickets.length?DB.tickets.slice().reverse().map(t=>`<button class="request-card" style="display:block;text-align:left;width:100%;color:inherit" onclick="App.openTicket('${t.id}')"><div class="spread"><span class="pill tiny rose">DEMO TICKET</span><span class="hint">${e(t.id)}</span></div><h3>${e(E(t.event).name)}</h3><p class="hint">${t.qty} ticket(s) · ${niceDate(t.date)}</p><span class="inline-link">View pass ${ic('chevron',14)}</span></button>`).join(''):`<div class="empty"><h3>No tickets yet</h3><p>Choose a demo event and generate a sample ticket.</p><button class="btn smallbtn" onclick="App.go('events')">Explore events</button></div>`:DB.favs.length?venues.filter(v=>DB.favs.includes(v.id)).map(wideVenue).join(''):`<div class="empty"><h3>No saved venues</h3><p>Tap the heart on any venue to save it here.</p><button class="btn smallbtn" onclick="App.go('discover')">Find places</button></div>`}${demoFooter()}</div></div>`}

function tracking() {
  const r = requestById(UI.reqId);
  if (!r) return activity();

  const v = V(r.venue);

  const isClosed =
    r.status === 'cancelled' ||
    r.status === 'declined';

  const service = ({
    direct: 'จองกับร้านโดยตรง',
    runner_booking: 'ให้ Runner ช่วยจองล่วงหน้า',
    runner_pickup: 'จองเอง แล้วให้ Runner รับโต๊ะ',
    queue: 'ให้ Runner ช่วยต่อคิว'
  })[r.service] || serviceName(r.service);

  // แปลข้อความ โดยคงลำดับสถานะและเงื่อนไขเดิม
  const th = {
    'Request submitted': 'ส่งคำขอแล้ว',
    'Venue reviewing': 'ร้านกำลังตรวจสอบ',
    'Venue confirmation': 'รอการยืนยันจากร้าน',
    'Runner assigned': 'มอบหมายงานให้ Runner',
    'Venue contacted': 'ติดต่อร้านแล้ว',
    'Queue progress verified by runner':
      'Runner อัปเดตคิว',
    'Venue review': 'ร้านตรวจสอบคำขอ',

    'The venue has received a sample request.':
      'ร้านได้รับคำขอแล้ว',

    'The venue needs to confirm availability and terms.':
      'รอร้านตรวจสอบโต๊ะและเงื่อนไข',

    'Only the venue can confirm a table.':
      'ร้านเป็นผู้ยืนยันโต๊ะเท่านั้น',

    'Booking help requested.':
      'ส่งคำขอให้ Runner ช่วยจองแล้ว',

    'Runner availability is not guaranteed.':
      'กำลังตรวจสอบ Runner ที่รับงานได้',

    'Runner contacts the venue and submits details.':
      'Runner ติดต่อร้านและส่งรายละเอียดคำขอ',

    'Only the venue can confirm the request.':
      'รอร้านเป็นผู้ยืนยันคำขอ',

    'Walk-in queue help requested.':
      'ส่งคำขอให้ Runner ช่วยต่อคิวแล้ว',

    'Venue policy needs to permit queue help.':
      'ต้องได้รับอนุญาตจากร้านก่อนต่อคิวแทน',

    'Progress is reported by the runner, not guaranteed.':
      'Runner รายงานความคืบหน้าคิว ยังไม่รับประกันสิทธิ์',

    'Venue decides whether queue assistance is accepted; entry not guaranteed.':
      'ร้านเป็นผู้ตัดสินใจรับคำขอ และยังไม่รับประกันการเข้าร้าน'
  };

  const steps = statusPlan(r).map(s => ({
    ...s,
    t: th[s.t] || s.t,
    d: th[s.d] || s.d
  }));

  const rawNote = String(r.progressNote || '');

  const note = rawNote.includes(
    'Demo venue approved request'
  )
    ? 'ร้านได้ยืนยันคำขอแล้ว โปรดตรวจสอบเงื่อนไขกับร้านอีกครั้ง'
    : rawNote.includes('Runner accepted this demo job')
      ? 'Runner รับงานแล้วและกำลังตรวจสอบเงื่อนไขของร้าน'
      : rawNote.includes(
          'Guest cancelled the local demo request'
        )
        ? 'ผู้ใช้ยกเลิกคำขอแล้ว'
        : rawNote || 'ยังไม่มีความคืบหน้าเพิ่มเติม';

  return `
    <div class="screen">

      ${title(
        'สถานะคำขอ',
        'รหัสคำขอ ' + r.id
      )}

      <div class="pad">

        <div class="eyebrow"
          style="margin-top:8px">
          ติดตามคำขอของคุณ
        </div>

        <h1 class="s-title"
          style="
            font-size:38px;
            line-height:1.25;
            margin:8px 0 17px;
          ">
          คำขอของคุณ<br>
          <span class="accent">กำลังดำเนินการ</span>
        </h1>

        <div class="request-card">

          <div class="spread">
            <b style="font-size:19px">
              ${e(v.name)}
            </b>

            <span class="pill tiny
              ${isDone(r) ? 'rose' : 'gold'}">
              ${e(userStatusThai(r.status))}
            </span>
          </div>

          <p class="hint" style="margin-top:9px">
            รหัสคำขอ:
            <strong>${e(r.id)}</strong>
          </p>

          <div class="hint">
            ${e(service)} ·
            ${e(niceDate(r.date))} ·
            ${e(r.time)} ·
            ${r.guests} คน
          </div>

          ${r.runner ? `
            <div class="divider"></div>
            <div class="row">
              ${ic('user',18)}
              <span class="hint">
                Runner รับงานแล้ว
              </span>
            </div>
          ` : ''}

        </div>

        ${isClosed ? `
          <div class="notice-card">
            <strong>
              ${e(userStatusThai(r.status))}
            </strong>

            <p>
              ${e(
                r.decisionNote ||
                'คำขอนี้สิ้นสุดแล้ว ไม่มีการเรียกเก็บเงินในระบบทดลอง'
              )}
            </p>
          </div>
        ` : `
          <div class="section-bar"
            style="margin-top:22px">
            <h2>ลำดับสถานะ</h2>
            <span class="micro">
              ข้อมูลคำขอ
            </span>
          </div>

          <div class="timeline">
            ${steps.map(s => `
              <div class="timeline-step
                ${s.ok ? 'done' : s.active ? 'active' : ''}">

                <h4>${e(s.t)}</h4>
                <p>${e(s.d)}</p>

              </div>
            `).join('')}
          </div>
        `}

        <div class="divider"></div>

        <strong style="font-size:13px">
          หมายเหตุสถานะ
        </strong>

        <p class="hint">${e(note)}</p>

        <div class="row" style="margin-top:18px">

          <button class="btn grow"
            onclick="App.openChat('${r.id}')">
            ${ic('chat',16)} แชต
          </button>

          ${!isDone(r) ? `
            <button class="btn ghost"
              onclick="App.askCancel('${r.id}')">
              ยกเลิก
            </button>
          ` : ''}

        </div>

        ${!isDone(r) ? `
          <div class="notice-card"
            style="margin-top:16px">
            คำขอนี้ยังไม่ได้รับการยืนยันจากร้าน
            สถานะจะเปลี่ยนเมื่อ Runner หรือร้านอัปเดต
          </div>
        ` : ''}

      </div>
    </div>
  `;
}
function chat(){let r=requestById(UI.reqId);if(!r)return activity();let arr=DB.chats[r.id]||[];let my=UI.role;return `<div class="screen">${title('Messages',V(r.venue).name+' · '+r.id)}<div class="pad"><div class="role-note">Prototype chat: messages are stored in this browser only. Role switching simulates two sides of the conversation; nothing is sent externally.</div><div class="message-list" style="margin-top:22px">${arr.length?arr.map(m=>`<div class="bubble ${m.role===my?'mine':''}">${e(m.text)}<small>${e(m.role==='user'?'Guest':m.role==='runner'?'Runner':'Venue')} · ${e(m.at)}</small></div>`).join(''):`<div class="center" style="padding:58px 9px 15px;color:#a795a2">${ic('chat',37)}<p class="hint" style="margin-top:14px">Start a conversation about request details or status.</p></div>`}</div></div><div class="chat-input"><input class="field" id="chat-message" maxlength="500" placeholder="Type a demo message..." onkeydown="if(event.key==='Enter')App.sendMessage()"><button aria-label="Send message" onclick="App.sendMessage()">${ic('arrow')}</button></div></div>`}
function ticketPass(){let t=DB.tickets.find(x=>x.id===UI.ticketId);if(!t)return activity();let ev=E(t.event);return `<div class="screen">${title('My demo ticket','Sample pass only · Not valid for admission')}<div class="pad" style="padding-top:25px"><div class="ticket-paper"><div class="micro" style="color:#8f4865">CHILL N’ KNOCK · EVENT PASS</div><div class="ticket-title" style="margin:13px 0">${e(ev.name)}</div><p>${niceDate(t.date)} · ${ev.time}<br>${e(V(ev.venue).name)}</p><div style="border-top:2px dashed #b9969d;margin:20px 0"></div><div class="ticket-qr" aria-label="Decorative demo code"></div><p class="demo-mark" style="margin-top:18px">NOT SCANNABLE · DEMO ONLY</p><div class="spread" style="margin-top:20px"><span>${t.qty} ticket(s)</span><b>${baht(t.price)}</b></div><div class="micro" style="margin-top:15px;color:#7d5361">${e(t.id)}</div></div><div class="safety" style="margin-top:17px">${ic('info',18)} This is a non-functional representation of a ticket. It is not a venue admission, payment receipt or confirmed booking.</div><button class="btn full ghost" style="margin-top:16px" onclick="App.switchRole('user');App.go('activity')">Back to my nights</button></div></div>`}
function guide(){return `<div class="screen">${title('Introducing Table Runner','How our two helper services are intended to work')}<div class="pad"><div class="eyebrow">CHILL N’ KNOCK EXTRA</div><h1 class="s-title" style="font-size:50px;margin:14px 0">LESS WAIT.<br><span class="accent">MORE NIGHT.</span></h1><div class="feature-banner" style="margin:7px 0 24px;padding:33px 20px;background:linear-gradient(140deg,#7d2542,#250e25)"><div><div class="micro" style="color:#f1bccc">TABLE RUNNER / TWO SERVICES</div><h3 style="font-size:44px">WE HELP.<br>YOU CHILL.</h3><p>A research concept that connects nightlife guests and independent helpers.</p></div></div>${[['calendar','01 · Advance booking help','A runner contacts a venue about a future table request. The venue must approve it.'],['clock','02 · Walk-in queue help','A runner may queue on your behalf only if the venue expressly permits it. Queue transfer and entry cannot be guaranteed.'],['shield','03 · Clear responsibilities','Show the fee proposal, agreed task, rules, status evidence and venue response before calling a request complete.']].map(([i,t,d])=>`<div class="service-option" style="cursor:default"><div class="service-mark">${ic(i,21)}</div><div><strong>${e(t)}</strong><p>${e(d)}</p></div></div>`).join('')}<button class="btn full" onclick="App.go('discover')">FIND A VENUE ${ic('arrow')}</button>${demoFooter()}</div></div>`}
function jobItems(){let sample=sampleJobs.filter(j=>!DB.requests.some(r=>r.sourceJob===j.id)&&DB.policies[j.venue][j.service==='runner_booking'?'runner':'queue']);let real=DB.requests.filter(r=>r.status==='finding_runner');return [...real.map(r=>({id:r.id,venue:r.venue,service:r.service,guests:r.guests,time:r.time,fee:r.fee,note:r.note||'No extra notes',label:serviceName(r.service),real:true})),...sample]}
function jobCard(j){return `<div class="job-card"><div class="spread"><span class="pill tiny ${j.service==='queue'?'rose':'gold'}">${j.service==='queue'?'QUEUE HELPER':'BOOKING HELPER'}</span><span class="job-fee">${baht(j.fee)}</span></div><h3>${e(V(j.venue).name)}</h3><div class="hint">${e(V(j.venue).area)} · ${j.guests} guests · Preferred ${e(j.time)}</div><p>${e(j.note)}</p><button class="btn full smallbtn" onclick="App.openJob('${j.id}')">VIEW JOB DETAILS ${ic('arrow',14)}</button></div>`}
function runnerHome(){let active=DB.requests.filter(r=>r.runner&&['contacting','queuing','awaiting_venue'].includes(r.status));return `<div class="screen">${brandHeader()}<div class="pad top-gap"><div class="eyebrow">RUNNER WORKSPACE / DEMO</div><h1 class="display" style="font-size:56px;margin:10px 0 20px">READY TO<br><span class="accent">MAKE MOVES?</span></h1><div class="wallet"><div class="micro" style="color:#f7d3df">EXAMPLE SERVICE FEES · NOT EARNED</div><b>${baht(DB.requests.filter(r=>r.runner&&['confirmed','queue_verified'].includes(r.status)).reduce((a,b)=>a+b.fee,0))}</b><p>Illustrative value for completed demo requests. No actual payouts.</p></div><div class="metric-grid"><div class="metric"><b>${String(jobItems().length).padStart(2,'0')}</b><span>Open leads</span></div><div class="metric"><b>${String(active.length).padStart(2,'0')}</b><span>Active jobs</span></div><div class="metric"><b>4.9</b><span>Sample rating</span></div></div><div class="section">${sec('NEW OPPORTUNITIES','AVAILABLE TO REVIEW',"App.go('jobs')")}${jobItems().slice(0,2).map(jobCard).join('')||`<div class="empty"><h3>No open leads</h3><p>Make a booking request in Guest Mode and return here.</p></div>`}</div><div class="safety">${ic('shield',18)} All jobs and earnings here are simulated. Runners must get venue permission before queue-related actions.</div>${demoFooter()}</div></div>`}
function runnerJobs(){return `<div class="screen">${title('Available opportunities','Table Runner · Demo job board')}<div class="pad"><div class="eyebrow" style="margin:12px 0 8px">NEW REQUESTS</div><h1 class="s-title" style="font-size:45px">PICK YOUR<br><span class="accent">NEXT MOVE.</span></h1><p class="hint" style="margin:13px 0 22px">Review all details and venue permission before accepting.</p>${jobItems().length?jobItems().map(jobCard).join(''):`<div class="empty"><h3>All caught up</h3><p>Nothing open in this demo. Try submitting a new guest request.</p></div>`}${demoFooter()}</div></div>`}
function jobDetail(){let j=jobItems().find(a=>a.id===UI.job);if(!j)return runnerJobs();const p=DB.policies[j.venue];return `<div class="screen">${title('Job details','Review before you accept')}<div class="pad"><div class="eyebrow" style="margin-top:18px">${e(j.label)}</div><h1 class="s-title" style="font-size:46px;margin:11px 0 7px">${e(V(j.venue).name)}</h1><p class="hint">${e(V(j.venue).area)}, Bangkok</p><div class="wallet" style="margin-top:22px"><div class="micro" style="color:#f9d3de">PROPOSED DEMO SERVICE FEE</div><b>${baht(j.fee)}</b><p>Illustrative only. Does not represent paid or guaranteed compensation.</p></div><div class="form-card"><div class="menu-item"><strong>Service requested</strong><span class="hint">${e(serviceName(j.service))}</span></div><div class="menu-item"><strong>Guests</strong><span class="hint">${j.guests}</span></div><div class="menu-item"><strong>Preferred time</strong><span class="hint">${e(j.time)}</span></div><div class="menu-item"><strong>Venue permission (demo)</strong><span class="pill tiny ${p[j.service==='queue'?'queue':'runner']?'mint':'rose'}">${p[j.service==='queue'?'queue':'runner']?'Enabled in prototype':'Disabled'}</span></div><p class="hint" style="margin:17px 0 0">${e(j.note)}</p></div><div class="safety" style="margin:15px 0">${ic('info',20)} Before accepting in real operation: check venue permission, clear task terms, arrival details, time limits, proof and cancellation policy.</div><button class="btn full" onclick="App.acceptJob('${j.id}')" ${p[j.service==='queue'?'queue':'runner']?'':'disabled'}>ACCEPT DEMO JOB ${ic('arrow',18)}</button></div></div>`}
function activeJob(r){return `<div class="request-card"><div class="spread"><span class="pill rose tiny">${e(serviceName(r.service))}</span><span class="pill gold tiny">${e(statusLabel(r.status))}</span></div><h3>${e(V(r.venue).name)}</h3><div class="request-meta">${niceDate(r.date)} · ${e(r.time)} · ${r.guests} guests<br>Fee example ${baht(r.fee)}</div><div class="row" style="margin-top:12px"><button class="btn smallbtn grow" onclick="App.openActive('${r.id}')">Manage work ${ic('arrow',14)}</button><button class="btn smallbtn ghost" onclick="App.openChat('${r.id}')">${ic('chat',14)}</button></div></div>`}
function runnerActive(){const mine=DB.requests.filter(r=>r.runner&&r.status!=='cancelled');return `<div class="screen">${title('Your active work','Runner · Job tracking')}<div class="pad"><div class="eyebrow" style="margin:16px 0 8px">MANAGE REQUESTS</div><h1 class="s-title" style="font-size:46px;margin-bottom:20px">ON THE<br><span class="accent">MOVE.</span></h1>${mine.length?mine.slice().reverse().map(activeJob).join(''):`<div class="empty"><h3>No active jobs</h3><p>Accept a job from the demo board to start a workflow.</p><button class="btn smallbtn" onclick="App.go('jobs')">View available jobs</button></div>`}${demoFooter()}</div></div>`}
function activeDetail(){const r=requestById(UI.reqId);if(!r)return runnerActive();let awaiting=r.status==='awaiting_venue',complete=isDone(r);return `<div class="screen">${title('Active job',r.id)}<div class="pad"><div class="eyebrow" style="margin:15px 0">RUNNER CONTROL</div><h1 class="s-title" style="font-size:44px;margin:0">${e(V(r.venue).name)}</h1><p class="hint" style="margin-top:11px">${e(serviceName(r.service))} · ${niceDate(r.date)} · ${e(r.time)}</p><div class="request-card" style="margin-top:20px"><div class="spread"><strong>Current status</strong><span class="pill gold tiny">${e(statusLabel(r.status))}</span></div><div class="divider"></div><div class="spread"><span class="hint">Guests</span><strong>${r.guests}</strong></div><div class="spread" style="margin-top:9px"><span class="hint">Fee example</span><strong>${baht(r.fee)}</strong></div><p class="hint" style="margin:13px 0 0">${e(r.note||'No additional customer notes.')}</p></div>${!complete&&!awaiting?`<label class="field-label" for="runner-proof">Progress / handover note <small>(demo evidence)</small></label><textarea class="field fieldarea" id="runner-proof" placeholder="e.g. Spoke to staff at 20:30. Asked venue to verify the booking...">${e(UI.proof)}</textarea><p class="hint">Do not upload personal identity documents or real customer data in this prototype.</p><button class="btn full" style="margin-top:16px" onclick="App.submitProgress('${r.id}')">${r.service==='queue'?'SUBMIT QUEUE UPDATE':'SUBMIT VENUE CONTACT UPDATE'} ${ic('check',17)}</button>`:awaiting?`<div class="notice-card">Runner update has been submitted. The venue must make the next decision. This is not a confirmed table or secured queue position.</div>`:`<div class="notice-card">Job status: ${e(statusLabel(r.status))}. Only verified demo completion is counted in example totals.</div>`}<button class="btn ghost full" style="margin-top:12px" onclick="App.openChat('${r.id}')">${ic('chat',17)} MESSAGE ABOUT JOB</button><div class="safety" style="margin-top:18px">${ic('shield',19)} Venue staff make the final decision. Never claim a queue spot or reservation is confirmed based on runner updates alone.</div></div></div>`}
function wallet(){let done=DB.requests.filter(r=>r.runner&&['confirmed','queue_verified'].includes(r.status));let sum=done.reduce((n,r)=>n+r.fee,0);return `<div class="screen">${title('Example earnings','Runner · No real payouts')}<div class="pad"><div class="eyebrow" style="margin:18px 0 8px">ILLUSTRATIVE ONLY</div><h1 class="s-title" style="font-size:47px">YOUR<br><span class="accent">MOMENTUM.</span></h1><div class="wallet" style="margin-top:22px"><div class="micro" style="color:#f6d9e4">COMPLETED DEMO SERVICE VALUES</div><b>${baht(sum)}</b><p>No funds were collected or transferred.</p></div><div class="metric-grid"><div class="metric"><b>${done.length}</b><span>Verified jobs</span></div><div class="metric"><b>${DB.requests.filter(r=>r.runner).length}</b><span>Accepted jobs</span></div><div class="metric"><b>0</b><span>Real payouts</span></div></div><div class="section">${sec('COMPLETION HISTORY','STATUS BREAKDOWN')}${done.length?done.map(r=>`<div class="menu-item"><div><strong>${e(V(r.venue).name)}</strong><small>${e(statusLabel(r.status))}</small></div><b>${baht(r.fee)}</b></div>`).join(''):`<div class="empty"><h3>Nothing completed yet</h3><p>Accept a sample job, record progress and confirm through Venue Mode.</p></div>`}</div>${demoFooter()}</div></div>`}
function venueSelect(){return `<label class="field-label" for="managedVenue" style="margin-top:0">VENUE SIMULATION</label><select class="field fieldoption" id="managedVenue" onchange="App.changeVenue(this.value)">${venues.map(v=>`<option value="${v.id}" ${DB.merchantVenue===v.id?'selected':''}>${e(v.name)} · ${e(v.area)}</option>`).join('')}</select><div class="content-note" style="margin:11px 0 20px">Switch among fictional demo venues to test merchant approval flows. This control is not a real merchant account.</div>`}
function relevantRequests(){return DB.requests.filter(r=>r.venue===DB.merchantVenue)}
function venueHome(){const a=relevantRequests(),pending=a.filter(r=>['pending_venue','awaiting_venue'].includes(r.status));return `<div class="screen">${brandHeader()}<div class="pad top-gap"><div class="eyebrow">VENUE PARTNER MODE / DEMO</div><h1 class="display" style="font-size:52px;margin:10px 0 24px">THE NIGHT.<br><span class="accent">YOUR CALL.</span></h1>${venueSelect()}<div class="metric-grid"><div class="metric"><b>${a.length}</b><span>All requests</span></div><div class="metric"><b>${pending.length}</b><span>Need review</span></div><div class="metric"><b>${a.filter(r=>r.status==='confirmed'||r.status==='queue_verified').length}</b><span>Approved</span></div></div><div class="section">${sec('ACTION REQUIRED','IN YOUR INBOX',"App.go('venue-requests')")}${pending.length?pending.map(merchantRequest).join(''):`<div class="empty"><h3>All clear</h3><p>Incoming booking and queue requests for this sample venue appear here.</p></div>`}</div><button class="btn ghost full" style="margin:12px 0 15px" onclick="App.go('venue-insights')">${ic('chart',17)} VIEW SAMPLE INSIGHTS</button><div class="role-note">The merchant is responsible for approving booking and queue permissions. A toggle in this prototype is not evidence of a real venue agreement.</div>${demoFooter()}</div></div>`}
function merchantRequest(r){return `<div class="request-card"><div class="spread"><span class="pill tiny rose">${e(serviceName(r.service))}</span><span class="pill tiny ${isDone(r)?'outline':'gold'}">${e(statusLabel(r.status))}</span></div><h3>Request ${e(r.id)}</h3><p class="hint">${niceDate(r.date)} · ${e(r.time)} · ${r.guests} people</p><p class="hint">${e(r.progressNote||r.note||'No additional details.')}</p>${['pending_venue','awaiting_venue'].includes(r.status)?`<div class="row"><button class="btn smallbtn greenbtn grow" onclick="App.merchantDecision('${r.id}',true)">${ic('check',15)} APPROVE DEMO</button><button class="btn danger smallbtn" onclick="App.askDecline('${r.id}')">Decline</button></div>`:`<button class="btn smallbtn ghost" onclick="App.openChat('${r.id}')">${ic('chat',15)} Messages</button>`}</div>`}
function merchantList(isQueue=false){let arr=relevantRequests().filter(r=>isQueue?r.service==='queue':r.service!=='queue');let open=arr.filter(r=>['pending_venue','awaiting_venue'].includes(r.status));return `<div class="screen">${title(isQueue?'Queue management':'Booking requests',V(DB.merchantVenue).name)}<div class="pad"><div class="eyebrow" style="margin:16px 0 9px">VENUE DECISIONS · DEMO</div><h1 class="s-title" style="font-size:46px">${isQueue?'QUEUE':'BOOKING'}<br><span class="accent">CONTROL.</span></h1><p class="hint" style="margin:12px 0 20px">Approval is an explicit action. Runner progress alone is insufficient.</p>${venueSelect()}<div class="spread" style="margin:13px 0 15px"><strong>${open.length} awaiting review</strong><span class="pill tiny rose">${arr.length} total</span></div>${arr.length?arr.slice().reverse().map(merchantRequest).join(''):`<div class="empty"><h3>No ${isQueue?'queue':'booking'} requests</h3><p>Switch to Guest Mode to create one, then return here.</p></div>`}${demoFooter()}</div></div>`}
function venuePolicies(){let p=DB.policies[DB.merchantVenue];return `<div class="screen">${title('Service policies','Venue partner / prototype switches')}<div class="pad"><div class="eyebrow" style="margin-top:16px">SET YOUR RULES</div><h1 class="s-title" style="font-size:45px;margin:10px 0 20px">YOUR VENUE.<br><span class="accent">YOUR TERMS.</span></h1>${venueSelect()}${[['direct','Allow direct table requests','Guest can send a request for venue approval.'],['runner','Allow advance Runner assistance','Runner may help contact the venue about table requests.'],['queue','Allow walk-in queue assistance','Runner may assist in a queue subject to real venue approval.']].map(([id,n,d])=>`<div class="policy-line"><div><strong>${e(n)}</strong><small>${e(d)}</small></div><button class="toggle ${p[id]?'on':''}" aria-label="Toggle ${e(n)}" aria-pressed="${p[id]}" onclick="App.togglePolicy('${id}')"></button></div>`).join('')}<div class="safety" style="margin-top:20px">${ic('info',18)} These switches affect only the demo interface. They do not constitute real operating permission from any venue.</div><button class="btn ghost full" style="margin-top:19px" onclick="App.go('venue-requests')">VIEW INCOMING REQUESTS ${ic('arrow',16)}</button>${demoFooter()}</div></div>`}
function insights(){let rs=relevantRequests();let vals=[2,4,3,6,5,3,7];let max=Math.max(...vals);return `<div class="screen">${title('Venue insights','Illustrative dashboard')}<div class="pad"><div class="eyebrow" style="margin:15px 0 9px">YOUR NIGHT AT A GLANCE</div><h1 class="s-title" style="font-size:47px;margin-bottom:20px">THE NIGHT<br><span class="accent">IN NUMBERS.</span></h1>${venueSelect()}<div class="metric-grid"><div class="metric"><b>${rs.length}</b><span>Requests</span></div><div class="metric"><b>${rs.filter(r=>r.status==='confirmed').length}</b><span>Confirmed</span></div><div class="metric"><b>${rs.filter(r=>r.status==='queue_verified').length}</b><span>Queue reviewed</span></div></div><div class="section"><div class="form-card"><div class="spread"><strong>Sample weekly activity</strong><span class="pill tiny outline">Illustration</span></div><div class="range-list">${vals.map((n,i)=>`<div class="bar-col"><div style="height:${Math.round(100*n/max)}%"></div><span>${['M','T','W','T','F','S','S'][i]}</span></div>`).join('')}</div><p class="hint" style="margin:15px 0 0">Chart values are illustrative, not analytics generated from real venue activity.</p></div></div><div class="section">${sec('WHAT TO MONITOR','OPERATIONAL CONSIDERATIONS')}<div class="subtle-card"><p class="hint" style="margin:0">Review no-show rates, response time, queue permissions, runner proof quality and cancellations before setting real service fees.</p></div></div>${demoFooter()}</div></div>`}
function profile(){let roleMap={user:'Nightlife Guest',runner:'Table Runner',venue:'Venue Partner'};return `<div class="screen">${brandHeader()}<div class="profile-hero"><div class="row"><div class="avatar">${e((DB.name||'G').slice(0,1).toUpperCase())}</div><div><div class="eyebrow">PERSONAL SPACE</div><h2 style="font-size:22px;margin:6px 0 2px">Hey, ${e(DB.name)}.</h2><p class="hint" style="margin:0">${roleMap[UI.role]} · Preview account</p></div></div></div><div class="pad"><div class="section"><button class="partner-entry" onclick="App.go('partner-choice')">สมัครเป็น Runner / ร้านพาร์ตเนอร์ →</button>${DB.account?'<span class="pill rose">เข้าสู่ระบบแล้ว</span>':`<button class="btn full" onclick="App.auth('profile')">เข้าสู่ระบบ / สมัครสมาชิก</button>`}${sec('CHOOSE YOUR VIEW','SWITCH EXPERIENCE')}${[['user','Nightlife Guest','Discover, book and track your nights'],['runner','Table Runner','Accept work and update progress'],['venue','Venue Partner','Manage approvals and service policies']].map(([id,n,d])=>`<button class="role-card" style="color:#fff;text-align:left;width:100%;${UI.role===id?'border-color:#e56b89;background:#4b283a':''}" onclick="App.switchRole('${id}')"><div><b>${e(n)} ${UI.role===id?'✓':''}</b><p>${e(d)}</p></div>${ic('chevron')}</button>`).join('')}</div><div class="section">${sec('ACCOUNT & SUPPORT','YOUR SETTINGS')}${[['user','Edit display name','name'],['music','Music & mood preferences','interests'],['heart','Saved venues','saved'],['bell','Notifications','notifications'],['help','Help center','help'],['shield','About & privacy','about'],['settings','Reset demo data','reset']].map(([ico,label,id])=>`<button class="menu-row" onclick="App.profileAction('${id}')">${ic(ico,19)} ${e(label)} <span class="right-arrow">${ic('chevron',16)}</span></button>`).join('')}</div>${demoFooter()}</div></div>`}
function runnerProfile(){return profile()}
function venueProfile(){return profile()}
function modal(){if(!UI.modal)return '';const head=(h,b)=>`<div class="overlay" role="dialog" aria-modal="true" aria-label="${e(h)}" onclick="if(event.target===this)App.closeModal()"><div class="sheet"><div class="handle"></div><div class="sheet-heading"><h2>${e(h)}</h2><button class="close" onclick="App.closeModal()" aria-label="Close">${ic('x',18)}</button></div>${b}</div></div>`;
if(UI.modal==='filter')return head('Filter & sort',`<label class="field-label">Sort results</label><div class="stack">${['Recommended','Top rated','Lowest sample price'].map(s=>`<button class="service-option ${UI.sort===s?'selected':''}" onclick="App.setSort('${s}')" style="margin:0"><div class="grow"><strong>${e(s)}</strong></div><span class="radio"></span></button>`).join('')}</div><label class="field-label">Sample starting price</label><div class="chips">${[[0,'Any'],[300,'Under ฿300'],[400,'Under ฿400'],[500,'Under ฿500']].map(([p,n])=>`<button class="chip ${UI.filterPrice===p?'active':''}" onclick="App.setPrice(${p})">${n}</button>`).join('')}</div><div class="row" style="margin-top:24px"><button class="btn ghost grow" onclick="App.resetFilters()">Reset</button><button class="btn grow" onclick="App.closeModal()">SHOW RESULTS</button></div><p class="hint" style="margin-top:16px">Filter prices and ratings use unverified sample listings.</p>`);
if(UI.modal==='role')return head('Preview a role',`<p class="modal-text">Choose which side of the experience to test. All roles share one browser's demo data; there is no real sign-in.</p>${[['user','Nightlife Guest','Discover, booking and events'],['runner','Table Runner','Queue and booking-help jobs'],['venue','Venue Partner','Requests, permissions and decisions']].map(([id,n,d])=>`<button class="role-card" style="width:100%;text-align:left;color:#fff" onclick="App.switchRole('${id}')"><div><b>${n}</b><p>${d}</p></div>${ic('arrow',18)}</button>`).join('')}`);
if(UI.modal==='notifications')return head('Notifications',`<div class="spread"><p class="hint">Device-local demo notifications only.</p><button class="inline-link" onclick="App.clearNotifications()">Clear all</button></div>${DB.notifications.length?DB.notifications.slice(0,12).map(n=>`<div class="menu-item"><div><strong>${e(n.text)}</strong><small>${e(n.at)}</small></div><span style="color:#e5a1b0">${ic('bell',17)}</span></div>`).join(''):`<div class="empty"><h3>All caught up</h3><p>Updates from booking, runner and venue demo workflows show up here.</p></div>`}`);
if(UI.modal==='interests')return head('Music & mood',`<p class="modal-text">Choose what you like. Tonight’s Picks on Home will prioritize these example music styles.</p><div class="chips" style="flex-wrap:wrap">${['Hip-Hop','Live','Jazz','House','EDM','Pop'].map(g=>`<button class="chip ${DB.prefs.interests.includes(g)?'active':''}" onclick="App.toggleInterest('${g}')">${g}</button>`).join('')}</div><button class="btn full" style="margin-top:20px" onclick="App.closeModal()">DONE</button>`);
if(UI.modal==='name')return head('Your profile',`<p class="modal-text">Change your local demo display name.</p><label class="field-label" for="display-name">Display name</label><input class="field" id="display-name" maxlength="25" placeholder="Your name" value="${e(DB.name)}"><button class="btn full" style="margin-top:18px" onclick="App.saveName()">SAVE NAME</button>`);

if (UI.modal === 'help') return head('ศูนย์ช่วยเหลือ', `
  <div class="stack">

    <div class="subtle-card">
      <strong>ส่งคำขอแล้วได้โต๊ะทันทีหรือไม่?</strong>
      <p class="hint" style="margin:8px 0 0">
        ยังไม่ได้รับการยืนยัน การจองกับร้านโดยตรงต้องรอร้านอนุมัติ
        ส่วนบริการ Runner ขึ้นอยู่กับผู้รับงานที่พร้อมให้บริการ
        และเงื่อนไขของแต่ละร้าน
      </p>
    </div>

    <div class="subtle-card">
      <strong>ต้องชำระเงินเมื่อไหร่?</strong>
      <p class="hint" style="margin:8px 0 0">
        ระบบปัจจุบันยังไม่มีการเรียกเก็บเงินจริง
        ค่าบริการ เงินประกัน การชำระเงิน
        และการคืนเงินจะต้องมีเงื่อนไขที่ชัดเจน
        ก่อนเปิดให้บริการจริง
      </p>
    </div>

    <div class="subtle-card">
      <strong>Runner สามารถต่อคิวแทนได้หรือไม่?</strong>
      <p class="hint" style="margin:8px 0 0">
        ได้เฉพาะร้านที่อนุญาตให้ต่อคิวแทนเท่านั้น
        และไม่ได้รับประกันว่าจะสามารถรับโต๊ะ
        หรือเข้าร้านได้
      </p>
    </div>

    <div class="subtle-card">
      <strong>ข้อมูลของฉันถูกจัดเก็บที่ไหน?</strong>
      <p class="hint" style="margin:8px 0 0">
        ในเวอร์ชันทดสอบ ข้อมูลจะถูกเก็บไว้
        ภายในเบราว์เซอร์ที่ใช้งาน
        ยังไม่มีระบบบัญชีและฐานข้อมูลกลาง
        ไม่ควรกรอกข้อมูลส่วนบุคคลที่มีความอ่อนไหว
      </p>
    </div>

  </div>

  <button class="btn ghost full"
    style="margin-top:18px"
    onclick="App.openModal('about')">
    เกี่ยวกับ CHILL N’ KNOCK
  </button>
`);

if (UI.modal === 'privacy') return head(
  'ข้อมูลและความเป็นส่วนตัว',
  `
  <div class="stack">
    <div class="subtle-card">
      <strong>ข้อมูลที่จัดเก็บ</strong>
      <p class="hint">
        เวอร์ชันทดสอบนี้จัดเก็บข้อมูลบัญชีทดลอง
        ร้านที่บันทึก คำขอจอง และการตั้งค่าบางส่วน
        ภายในเบราว์เซอร์ที่ใช้งาน
      </p>
    </div>

    <div class="subtle-card">
      <strong>การใช้งานข้อมูล</strong>
      <p class="hint">
        ข้อมูลถูกใช้เพื่อจำลองขั้นตอนการค้นหาร้าน
        การจอง การติดต่อ Runner และการจัดการคำขอ
        ยังไม่มีการเชื่อมต่อฐานข้อมูลกลาง
      </p>
    </div>

    <div class="subtle-card">
      <strong>การควบคุมข้อมูล</strong>
      <p class="hint">
        ผู้ใช้สามารถล้างข้อมูลเว็บไซต์ผ่าน
        การตั้งค่าของเบราว์เซอร์
        ซึ่งอาจทำให้ข้อมูลทดลองที่บันทึกไว้หายไป
      </p>
    </div>

    <div class="subtle-card">
      <strong>ข้อควรระวัง</strong>
      <p class="hint">
        ระบบนี้ยังไม่ใช่บริการที่เปิดใช้งานจริง
        กรุณาอย่าส่งเอกสารยืนยันตัวตน
        ข้อมูลทางการเงิน หรือข้อมูลส่วนบุคคล
        ที่มีความอ่อนไหวผ่านระบบทดลอง
      </p>
    </div>
  </div>
  `
);
if(UI.modal==='about')return head('About the prototype',`<div class="row"><img src="logo.png" style="width:50px;border-radius:12px" alt="Brand"><div><strong>CHILL N’ KNOCK</strong><div class="hint">Interactive UX study · October 2026</div></div></div><p class="modal-text" style="margin-top:17px">A three-sided research prototype inspired by nightlife discovery apps. Supports fictional venue search, event browsing, simulated tickets, direct table requests, booking assistance, walk-in queue assistance, progress, messaging, runner jobs, and venue decisions.</p><div class="safety">${ic('shield',18)} No verified live venue data, reservations, transaction processing, authentication, payment collection, user identity verification, GPS or backend sync.</div><p class="modal-text" style="margin-top:15px">For a real launch, secure venue partnerships, verify lawful queue practices, define service contracts, handle privacy and accessibility, integrate role-based backend access and conduct operational testing.</p>`);
if(UI.modal==='cancel')return head('Cancel sample request?',`<p class="modal-text">You are cancelling ${e(UI.modalReq)}. This changes the browser demo status and does not initiate a real refund.</p><div class="row"><button class="btn ghost grow" onclick="App.closeModal()">Keep request</button><button class="btn danger grow" onclick="App.cancelConfirmed()">Cancel demo</button></div>`);
if(UI.modal==='decline')return head('Decline this request?',`<p class="modal-text">The guest will see a declined status in this browser. Add a brief reason for clarity.</p><textarea class="field fieldarea" maxlength="250" id="decline-reason" placeholder="e.g. We cannot approve this request under current policy."></textarea><div class="row" style="margin-top:15px"><button class="btn ghost grow" onclick="App.closeModal()">Back</button><button class="btn danger grow" onclick="App.declineConfirmed()">Decline request</button></div>`);
if(UI.modal==='review')return head('Write a review',`<p class="modal-text">Share a demo review for ${e(V(UI.venue).name)}. This will be saved only in your browser.</p><div class="review-stars">${[1,2,3,4,5].map(n=>`<button class="${UI.rate>=n?'active':''}" aria-label="${n} stars" onclick="App.rate(${n})">★</button>`).join('')}</div><textarea class="field fieldarea" id="review-text" placeholder="How was your experience? (fictional demo feedback)" maxlength="400" style="margin-top:15px"></textarea><button class="btn full" style="margin-top:16px" onclick="App.addReview()">SAVE DEMO REVIEW</button>`);
if(UI.modal==='reset')return head('Reset demo?',`<p class="modal-text">This clears all local requests, tickets, favorites, messages, reviews and sample policy changes on this browser. This cannot be undone here.</p><div class="row"><button class="btn ghost grow" onclick="App.closeModal()">Keep data</button><button class="btn danger grow" onclick="App.resetAll()">Reset everything</button></div>`);
if(UI.modal==='map')return head('Find your neighborhood',`<p class="modal-text">This prototype does not request or track your GPS location. Select a neighborhood to explore instead.</p>${['All','RCA','Thonglor','Ekkamai','Sukhumvit','Sathorn','Silom'].map(a=>`<button class="menu-row" onclick="App.pickNeighborhood('${a}')">${ic('pin',17)} ${a}<span class="right-arrow">${ic('chevron',13)}</span></button>`).join('')}`);
return head('Information','<p class="modal-text">This section is part of the demo experience.</p>')}
function navItems(){if(UI.role==='runner')return [['home','Home','home'],['jobs','Jobs','briefcase'],['active','Active','clock'],['wallet','Wallet','wallet'],['profile','Profile','user']];if(UI.role==='venue')return [['home','Home','home'],['venue-requests','Bookings','calendar'],['venue-queue','Queue','users'],['venue-policies','Policies','shield'],['profile','Profile','user']];return [['home','Home','home'],['discover','Explore','compass'],['events','Events','ticket'],['activity','My nights','calendar'],['profile','Profile','user']]}

function welcome(){return `<div class="welcome-new"><div class="welcome-photo" style="background-image:linear-gradient(180deg,rgba(250,247,242,0) 0%,rgba(250,247,242,0) 75%, rgba(250,247,242,0.12) 80%,  rgba(250,247,242,0.45) 89%, rgba(250,247,242,0.85) 96%,#faf7f2 100%),url('assets/splash-cover.jpg')"><div class="welcome-brand"><img src="logo.png" alt="logo"><b>CHILL N’<br>KNOCK</b></div></div><div class="welcome-copy"><h1>ONE APP.<br><span>ONE NIGHT OUT.</span></h1><p>ค้นหาร้าน จองโต๊ะ ต่อคิว<br>หาเพื่อนเที่ยว เรียกรถ<br>ครบในแอปเดียว</p><button class="btn full" onclick="App.go('home')">เริ่มสำรวจเลย →</button><button class="btn full pale" onclick="App.auth('home')">เข้าสู่ระบบ / สมัครสมาชิก</button><button class="textbtn" onclick="App.go('home')">→ เลื่อนเพื่อดูเพิ่มเติม —</button></div></div>`}
function authPage(){let signup=UI.authTab==='signup';return `<div class="auth-screen"><button class="circle-btn" onclick="App.back()">${ic('back')}</button><div class="auth-brand"><img src="logo.png"><b>CHILL N’<br>KNOCK</b></div><h1>เข้าสู่ระบบเพื่อจอง</h1><p class="auth-note">จองโต๊ะ ขอความช่วยเหลือจาก Runner<br>และจัดการค่ำคืนของคุณ</p><div class="auth-tabs"><button class="${!signup?'on':''}" onclick="App.authTab('login')">เข้าสู่ระบบ</button><button class="${signup?'on':''}" onclick="App.authTab('signup')">สมัครสมาชิก</button></div><form onsubmit="App.submitAuth(event)">${signup?`<label class="field-label">ชื่อที่แสดง</label><input id="auth-name" class="field" autocomplete="name" required placeholder="ชื่อของคุณ">`:''}<label class="field-label">อีเมล</label><input id="auth-email" class="field" type="email" autocomplete="email" required placeholder="your@email.com"><label class="field-label">รหัสผ่าน</label><input id="auth-pass" class="field" type="password" minlength="6" autocomplete="${signup?'new-password':'current-password'}" required placeholder="อย่างน้อย 6 ตัวอักษร"><button class="btn full" type="submit">${signup?'สมัครสมาชิก':'เข้าสู่ระบบ'} →</button></form><div class="auth-social"><p>หรือดำเนินการต่อด้วย</p><div class="row"><button onclick="App.demoSocial()">Apple</button><button onclick="App.demoSocial()">Google</button><button onclick="App.demoSocial()">LINE</button></div></div><button class="btn full outline" onclick="App.authTab(signup?'login':'signup')">${signup?'มีบัญชีแล้ว? เข้าสู่ระบบ':'ยังไม่มีบัญชี? สมัครสมาชิก'}</button><button class="partner-entry" onclick="App.go('partner-choice')">${ic('briefcase')} สำหรับ Runner / พาร์ตเนอร์ร้านค้า ${ic('arrow')}</button><p class="footer-small">Prototype เท่านั้น · ข้อมูลล็อกอินเก็บเฉพาะในเครื่อง ไม่ใช่ระบบยืนยันตัวตนจริง</p></div>`}
function partnerChoice(){return `<div class="screen">${title('ร่วมงานกับ CHILL N’ KNOCK','Runner / Venue Partner')}<div class="pad"><h1 class="s-title" style="margin:25px 0">YOUR NIGHT.<br><span class="accent">YOUR ROLE.</span></h1><button class="partner-choice" onclick="App.startApply('runner')">${ic('users',30)}<strong>สมัครเป็น Table Runner</strong><small>ช่วยจองโต๊ะ รับโต๊ะ และต่อคิวภายใต้เงื่อนไขร้าน</small>${ic('arrow')}</button><button class="partner-choice" onclick="App.startApply('venue')">${ic('briefcase',30)}<strong>สมัครเป็นร้านพาร์ตเนอร์</strong><small>จัดการคำขอจองโต๊ะ ตารางเวลา และนโยบายบริการ</small>${ic('arrow')}</button><p class="content-note">ผู้สมัครต้องได้รับการตรวจสอบและอนุมัติก่อนใช้งานจริง การอนุมัติในต้นแบบเป็นเพียงสถานะตัวอย่าง</p></div></div>`}
const applyRunner = [{title: 'ข้อมูลส่วนตัว', sub: 'แนะนำตัวและช่องทางที่สามารถติดต่อได้', fields: [['ชื่อ - นามสกุล', 'text'], ['วัน / เดือน / ปีเกิด', 'date'], ['เบอร์โทรศัพท์', 'tel'], ['อีเมล (ไม่บังคับ)', 'email:optional']]}, {title: 'ยืนยันตัวตน', sub: 'ขั้นตอนจำลองการยืนยันตัวตน กรุณาใช้ข้อมูลและเอกสารตัวอย่างเท่านั้น', fields: [['ประเภทเอกสาร', 'select:บัตรประชาชน|หนังสือเดินทาง'], ['เอกสารยืนยันตัวตน', 'file'], ['ภาพใบหน้าสำหรับตรวจสอบ', 'file']]}, {title: 'ที่อยู่และพื้นที่รับงาน', sub: 'ระบุที่อยู่และเลือกพื้นที่ที่สะดวกรับงาน', fields: [['ที่อยู่ปัจจุบัน', 'textarea'], ['พื้นที่ที่สะดวกรับงาน', 'select:ทองหล่อ|เอกมัย|RCA|รัชดา|เกษตร|อารีย์|สุขุมวิท|หลายพื้นที่'], ['ประเภทงานที่สนใจ', 'select:ช่วยจองโต๊ะล่วงหน้า|ช่วยรับโต๊ะ / เช็กอิน|ช่วยต่อคิว Walk-in|ทุกประเภท'], ['ช่วงเวลาที่สะดวก', 'select:18:00–21:00|21:00–00:00|หลังเที่ยงคืน|ยืดหยุ่นได้']]}, {title: 'ตรวจสอบและยืนยัน', sub: 'ตรวจสอบข้อมูลก่อนส่งใบสมัคร และอ่านเงื่อนไขการรับงาน', fields: []}];

const applyVenue = [
  {
    title: 'ข้อมูลร้าน',
    sub: 'เลือกร้านที่มีอยู่ในระบบ หรือพิมพ์ชื่อร้านใหม่',
    fields: [
      ['ชื่อร้าน', 'venue-name'],
      [
        'ประเภทสถานที่',
        'select:ไนต์คลับ|ร้านดนตรีสด|สถานที่จัดอีเวนต์|อื่น ๆ'
      ],
      ['ที่อยู่ร้าน', 'textarea'],
      ['ลิงก์ Google Maps (ถ้ามี)', 'url-optional'],
      ['เบอร์โทรศัพท์ร้าน', 'tel'],
      ['อีเมลสำหรับติดต่อร้าน', 'email']
    ]
  },

  {
    title: 'ผู้ดูแลและยืนยันสิทธิ์',
    sub: 'ใช้ข้อมูลตัวอย่างเท่านั้น ยังไม่มีระบบตรวจสอบสิทธิ์จริง',
    fields: [
      ['ชื่อ–นามสกุลผู้รับผิดชอบ', 'text'],
      [
        'ตำแหน่ง',
        'select:เจ้าของร้าน|ผู้จัดการ|ผู้ได้รับมอบหมาย'
      ],
      ['เบอร์โทรศัพท์ผู้รับผิดชอบ', 'tel'],
      [
        'วิธียืนยันสิทธิ์ดูแลร้าน',
        'select:เอกสารเจ้าของกิจการ|หนังสือมอบอำนาจ|อีเมลธุรกิจที่ตรวจสอบได้'
      ],
      [
        'หลักฐานสิทธิ์ดูแลร้าน (เฉพาะไฟล์สมมติ)',
        'file'
      ]
    ]
  },

  {
    title: 'บริการและเวลาเปิดร้าน',
    sub: 'เลือกบริการได้หลายข้อ เวลาเปิด–ปิดหมายถึงเวลาทำการของร้าน',
    fields: [
      [
        'บริการที่ร้านรองรับ',
        'multi:รับจองโต๊ะโดยตรง|อนุญาต Runner ช่วยจองล่วงหน้า|อนุญาต Runner เช็กอิน/รับโต๊ะ|อนุญาต Runner ต่อคิว Walk-in'
      ],
      [
        'ประเภทโต๊ะ',
        'select:Regular|VIP|Standing|หลายประเภท'
      ],
      ['เวลาเปิดร้าน', 'time'],
      ['เวลาปิดร้าน', 'time']
    ]
  },

  {
    title: 'ตรวจสอบและยืนยัน',
    sub: 'ตรวจทานข้อมูลและยอมรับเงื่อนไขก่อนส่งใบสมัคร',
    fields: []
  }
];

function partnerApply() {
  const kind = UI.applyRole || 'runner';
  const steps = kind === 'runner' ? applyRunner : applyVenue;
  const step = UI.applyStep || 0;
  const obj = steps[step];
  const total = steps.length;

  const fieldsHTML = obj.fields.map(([name, type], i) => {
    const key = `f${step}_${i}`;
    const saved = UI.applyData?.[key];

    const optionalField =
      type === 'file' || type === 'url-optional';

    const label = `
      <label class="field-label">
        ${e(name)}
        ${optionalField ? '' : '<span class="accent">*</span>'}
      </label>
    `;

    // ชื่อร้าน: เลือกจากรายชื่อเดิมหรือพิมพ์ชื่อใหม่
    if (kind === 'venue' && type === 'venue-name') {
      return `${label}
        <input
          name="${key}"
          class="field"
          list="venue-options"
          required
          value="${e(saved || '')}"
          placeholder="เลือกหรือพิมพ์ชื่อร้าน">

        <datalist id="venue-options">
          ${venues.map(v => `
            <option value="${e(v.name)}"></option>
          `).join('')}
        </datalist>

        <p class="hint">
          ร้านที่ยังไม่มีในระบบส่งสมัครได้
          แต่ต้องเพิ่มข้อมูลร้านก่อนจึงจะเปิด Dashboard ได้
        </p>
      `;
    }

    // เลือกบริการได้หลายข้อ เฉพาะร้านพาร์ตเนอร์
    if (kind === 'venue' && type.startsWith('multi:')) {
      const chosen = Array.isArray(saved) ? saved : [];

      return `${label}
        <div class="form-card">
          ${type.slice(6).split('|').map(x => `
            <label class="apply-check"
              style="display:flex;gap:10px;margin:12px 0">

              <input
                type="checkbox"
                name="${key}"
                value="${e(x)}"
                ${chosen.includes(x) ? 'checked' : ''}>

              ${e(x)}
            </label>
          `).join('')}
        </div>
      `;
    }

    // กล่องข้อความ เช่น ที่อยู่ร้าน
    if (type === 'textarea') {
      return `${label}
        <textarea
          name="${key}"
          class="field fieldarea"
          required
          placeholder="${e(name)}"
        >${e(saved || '')}</textarea>
      `;
    }

    // Dropdown
    if (type.startsWith('select:')) {
      return `${label}
        <select name="${key}" class="field" required>
          <option value="">เลือกข้อมูล</option>

          ${type.slice(7).split('|').map(x => `
            <option
              value="${e(x)}"
              ${saved === x ? 'selected' : ''}>
              ${e(x)}
            </option>
          `).join('')}
        </select>
      `;
    }

    // ช่องกรอกข้อมูลปกติ
    const optional =
      type === 'file' || type === 'url-optional';

    const inputType =
      type === 'url-optional' ? 'url' : type;

    return `${label}
      <input
        name="${key}"
        class="field"
        type="${inputType}"
        ${optional ? '' : 'required'}
        ${type === 'file'
          ? 'accept="image/*,.pdf"'
          : `value="${e(saved || '')}"`}
        placeholder="${e(name)}">
    `;
  }).join('');

  return `
    <div class="screen">
      ${title(
        kind === 'runner'
          ? 'สมัครเป็น Table Runner'
          : 'สมัครเป็นร้านพาร์ตเนอร์',
        `ขั้นตอน ${step + 1} จาก ${total}`
      )}

      <div class="progress-steps">
        ${steps.map((_, i) => `
          <i class="${i <= step ? 'filled' : ''}"></i>
        `).join('')}
      </div>

      <div class="pad">
        <p class="eyebrow" style="margin:22px 0 9px">
          STEP ${String(step + 1).padStart(2, '0')} / ${total}
        </p>

        <h1 class="s-title"
          style="font-size:43px;margin:0 0 6px">
          ${e(obj.title)}
        </h1>

        <p class="hint">${e(obj.sub)}</p>

        <form id="apply-form"
          onsubmit="App.nextApply(event)">

          ${fieldsHTML}

          ${step === total - 1 ? `
            <div class="notice-card">
              ${kind === 'runner'
                ? 'รับทราบว่าการต่อคิวและเช็กอินแทนทำได้เฉพาะเมื่อร้านอนุญาต'
                : 'รับทราบว่าการเข้าร่วมเป็นพาร์ตเนอร์ต้องยืนยันสิทธิ์ดูแลร้านจริง'}
              และยอมรับเงื่อนไขความปลอดภัยและการจัดการข้อมูล
            </div>

            <label class="apply-check">
              <input type="checkbox" required>
              อ่านและยอมรับข้อตกลงการสมัครต้นแบบ
            </label>
          ` : ''}

          <div class="row" style="margin:24px 0 80px">

            ${step ? `
              <button
                class="btn pale grow"
                type="button"
                onclick="App.prevApply()">
                ย้อนกลับ
              </button>
            ` : ''}

            <button class="btn grow" type="submit">
              ${step === total - 1
                ? 'ส่งใบสมัคร'
                : 'ถัดไป'} →
            </button>

          </div>
        </form>
      </div>
    </div>
  `;
}
function applied() { let k = UI.applyRole || 'runner'; 
if (k === 'venue') {
  const venueName =
    DB.applications?.venue?.fields?.venueName ||
    'ร้านพาร์ตเนอร์';

  const found = Boolean(
    DB.applications?.venue?.venueId
  );

  const stage = Math.max(
    1,
    Math.min(3, UI.venueApprovalStep || 1)
  );

  const steps = [
    'ส่งใบสมัครแล้ว',
    'ตรวจสอบข้อมูลร้านและผู้ดูแล (จำลอง)',
    'อนุมัติและเปิดใช้งาน Venue Partner (Sandbox)'
  ];

  return `
    <div class="screen">
      ${title(
        'สถานะใบสมัครร้าน',
        'การอนุมัติจำลองสำหรับ Venue Partner'
      )}

      <div class="pad center"
        style="padding-top:54px">

        <div class="app-success">
          ${ic('check', 42)}
        </div>

        <h1>ส่งใบสมัครเรียบร้อยแล้ว</h1>

        <p class="hint">
          ${e(venueName)}
          <br>
          ${found
            ? 'กำลังแสดงขั้นตอนอนุมัติแบบจำลอง'
            : 'ยังไม่มีร้านนี้ในรายการ ต้องเพิ่มร้านก่อนเปิด Dashboard'
          }
          <br>
          ไม่มีการยืนยันตัวตนหรือสิทธิ์ร้านจริง
          ในต้นแบบนี้
        </p>

        <div class="status-list">
          ${steps.map((label, i) => `
            <div style="
              color:${stage > i
                ? '#8f1742'
                : '#8b7580'};
              font-weight:${stage > i
                ? '700'
                : '400'};
            ">
              ${stage > i ? '✓' : '○'}
              ${label}
            </div>
          `).join('')}
        </div>

        ${stage === 3 && found ? `
          <button
            class="btn full"
            onclick="App.switchRole('venue')">

            เข้าสู่พื้นที่ทำงานร้าน
            ${ic('arrow',16)}
          </button>
        ` : ''}

        <button
          class="btn full pale"
          style="margin-top:12px"
          onclick="App.go('profile')">

          กลับไปที่โปรไฟล์
        </button>

      </div>
    </div>
  `;
} if (k === 'runner') { const stage = Math.max(1, Math.min(3, UI.runnerApprovalStep || 1)); const steps = ['ส่งใบสมัครแล้ว', 'ตรวจสอบข้อมูลและตัวตน (จำลอง)', 'อนุมัติและเปิดใช้งาน Runner (Sandbox)']; return `<div class="screen">${title('สถานะใบสมัคร', 'การอนุมัติจำลองสำหรับทดสอบ Runner')}<div class="pad center" style="padding-top:54px"><div class="app-success">${ic('check',42)}</div><h1>ส่งใบสมัครเรียบร้อยแล้ว</h1><p class="hint">${stage === 3 ? 'ผ่านขั้นตอนอนุมัติในโหมดทดสอบแล้ว' : 'ระบบกำลังแสดงขั้นตอนตรวจสอบตัวอย่าง'}<br>ยังไม่มีการตรวจเอกสารหรือยืนยันตัวตนจริง</p><div class="status-list">${steps.map((label, i) => `<div style="color:${stage > i ? '#8f1742' : '#8b7580'}; font-weight:${stage > i ? '700' : '400'};">${stage > i ? '✓' : '○'} ${label}</div>`).join('')}</div>${stage === 3 ? `<button class="btn full" onclick="App.switchRole('runner')">เข้าสู่พื้นที่ทำงาน Runner ${ic('arrow',16)}</button>` : `<p class="hint" style="margin-top:18px">กำลังดำเนินการในโหมดสาธิต...</p>`}<button class="btn full pale" style="margin-top:12px" onclick="App.go('profile')">กลับไปที่โปรไฟล์</button></div></div>`; } }
function myExtras(){return `<div class="extras"><h3>เตรียมค่ำคืนนี้ให้พร้อม</h3><button onclick="App.go('friends')">${ic('users',24)}<span><b>หาเพื่อนเที่ยว</b><small>สร้างกลุ่มและชวนเพื่อนออกไปสนุกด้วยกัน</small></span>${ic('arrow')}</button><button onclick="App.go('ride')">${ic('pin',24)}<span><b>เรียกรถกลับบ้าน</b><small>เลือกจุดรับส่งและดูแอปเดินทางที่รองรับ</small></span>${ic('arrow')}</button></div>`}
function friendPage(){return `<div class="screen">${title('หาเพื่อนเที่ยว','My Nights · กลุ่มเที่ยว (Demo)')}<div class="pad"><h1 class="s-title" style="margin:20px 0">GOOD NIGHTS.<br><span class="accent">BETTER FRIENDS.</span></h1><div class="form-card"><h3>สร้างแพลนเที่ยว</h3><label class="field-label">ชื่อกลุ่ม / แพลน</label><input class="field" id="friend-name" placeholder="คืนนี้ไป ONYX กัน"><label class="field-label">รายละเอียด</label><textarea class="field fieldarea" id="friend-desc" placeholder="สถานที่ เวลา จำนวนเพื่อนที่อยากชวน"></textarea><button class="btn full" onclick="App.addFriend()">สร้างแพลน (Demo)</button></div><div class="section">${(DB.friends||[]).map(x=>`<div class="request-card"><strong>${e(x.name)}</strong><p class="hint">${e(x.desc)}</p><span class="pill rose">กลุ่มทดลอง · ยังไม่เผยแพร่สาธารณะ</span></div>`).join('')||'<div class="empty">ยังไม่มีแพลน เริ่มสร้างกลุ่มของคุณได้เลย</div>'}</div></div></div>`}
function ridePage(){return `<div class="screen">${title('เรียกรถกลับบ้าน','My Nights · Travel safe')}<div class="pad"><h1 class="s-title" style="margin:20px 0">GET HOME<br><span class="accent">SAFE.</span></h1><div class="form-card"><label class="field-label">จุดรับ</label><input id="ride-from" class="field" placeholder="เช่น ONYX, RCA" value="RCA Bangkok"><label class="field-label">ปลายทาง</label><input id="ride-to" class="field" placeholder="กรอกพื้นที่ปลายทาง"><button class="btn full" onclick="App.openDirections()">เปิด Google Maps ${ic('external',15)}</button></div><p class="content-note">ต้นแบบยังไม่เรียกรถหรือส่งข้อมูลให้ Grab/Bolt/Taxi โดยตรง ระบบจริงต้องเชื่อมบริการและยืนยันราคา/คนขับจากผู้ให้บริการ</p></div></div>`}
function auth(page){UI.returnTo=page||UI.screen;UI.authTab='login';go('auth')}
function authTab(tab){UI.authTab=tab;render(true)}
function submitAuth(ev){ev.preventDefault();let mail=document.getElementById('auth-email').value.trim(),pw=document.getElementById('auth-pass').value,signup=UI.authTab==='signup';if(signup){DB.account={email:mail,name:document.getElementById('auth-name').value.trim(),pass:pw};DB.name=DB.account.name}else if(!DB.account||DB.account.email!==mail||DB.account.pass!==pw){toast('ไม่พบบัญชีทดลอง กรุณาเลือกสมัครสมาชิกก่อน');return}save();let dest=UI.returnTo||'home';UI.stack=[];UI.screen=dest==='auth'?'home':dest;render();toast('เข้าสู่ระบบทดลองเรียบร้อย')}
function demoSocial(){toast('การเข้าระบบผ่านผู้ให้บริการภายนอกยังไม่ได้เชื่อมต่อ')}
function startApply(role){UI.applyRole=role;UI.applyStep=0;UI.applyData={};go('apply')}
function nextApply(ev){ev.preventDefault();
const f = new FormData(ev.target);

// เก็บบริการหลายตัวเลือกของ Venue
if (UI.applyRole === 'venue' && UI.applyStep === 2) {
  UI.applyData.f2_0 = f.getAll('f2_0');

  if (!UI.applyData.f2_0.length) {
    return toast(
      'กรุณาเลือกบริการที่ร้านรองรับอย่างน้อย 1 ข้อ'
    );
  }
}

// บันทึกข้อมูลของขั้นตอนปัจจุบัน
for (const [k, v] of f) {
  if (UI.applyRole === 'venue' && k === 'f2_0') {
    continue;
  }

  UI.applyData[k] =
    v instanceof File ? (v.name || '') : v;
} if (UI.applyStep < (UI.applyRole === 'runner' ? applyRunner.length : applyVenue.length) - 1) { UI.applyStep++; render(); return;}
DB.applications = DB.applications || {}; const role = UI.applyRole; 

DB.applications[role] = {
  status: 'pending-demo',

  // เก็บเฉพาะข้อมูลทั่วไปที่จำเป็นต่อ Sandbox
  fields: role === 'venue'
    ? {
        venueName: UI.applyData.f0_0,
        services: UI.applyData.f2_0 || []
      }
    : {}
};

if (role === 'venue') {
  const name = String(
    UI.applyData.f0_0 || ''
  ).trim().toLocaleLowerCase();

  const selectedVenue = venues.find(
    v => v.name.trim().toLocaleLowerCase() === name
  );

  if (selectedVenue) {
    DB.merchantVenue = selectedVenue.id;
    DB.applications.venue.venueId = selectedVenue.id;
  }

  save();

  UI.venueApprovalStep = 1;
  go('applied');

  // ร้านใหม่ต้องเพิ่มข้อมูลเข้าระบบก่อน
  if (!selectedVenue) return;

  // ขั้นตอน 2: กำลังตรวจสอบ (จำลอง)
  setTimeout(() => {
    if (
      UI.screen !== 'applied' ||
      UI.applyRole !== 'venue'
    ) return;

    UI.venueApprovalStep = 2;
    render(true);
  }, 700);

  // ขั้นตอน 3: อนุมัติใน Sandbox
  setTimeout(() => {
    if (
      UI.screen !== 'applied' ||
      UI.applyRole !== 'venue'
    ) return;

    UI.venueApprovalStep = 3;

    DB.applications.venue.status = 'approved';
    save();
    render(true);

    // เปิด Venue Dashboard เดิม
    setTimeout(() => {
      if (
        UI.screen === 'applied' &&
        UI.applyRole === 'venue'
      ) {
        App.switchRole('venue');
      }
    }, 1300);

  }, 1600);

  return;
}

save();
UI.runnerApprovalStep = 1; go('applied'); 
setTimeout(() => { if (UI.screen !== 'applied' || UI.applyRole !== 'runner') return; UI.runnerApprovalStep = 2; render(true); }, 700); setTimeout(() => { if (UI.screen !== 'applied' || UI.applyRole !== 'runner') return; UI.runnerApprovalStep = 3; DB.applications.runner.status = 'approved'; save(); render(true); setTimeout(() => { if (UI.screen === 'applied' && UI.applyRole === 'runner') { App.switchRole('runner'); } }, 1300); }, 1600);}
function addFriend(){let name=document.getElementById('friend-name').value.trim(),desc=document.getElementById('friend-desc').value.trim();if(!name)return toast('กรุณาใส่ชื่อแพลน');DB.friends=DB.friends||[];DB.friends.push({name,desc});save();render()}
function openDirections(){let from=document.getElementById('ride-from').value.trim(),to=document.getElementById('ride-to').value.trim();if(!to)return toast('กรุณาระบุปลายทาง');window.open('https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(from)+'&destination='+encodeURIComponent(to)+'&travelmode=driving','_blank','noopener')}
function prevApply() {
  UI.applyStep = Math.max(
    0,
    (UI.applyStep || 0) - 1
  );
  render();
}
function currentMain(){if(UI.screen==='welcome')return welcome();if(UI.screen==='auth')return authPage();if(UI.screen==='partner-choice')return partnerChoice();if(UI.screen==='apply')return partnerApply();if(UI.screen==='applied')return applied();if(UI.screen==='friends')return friendPage();if(UI.screen==='ride')return ridePage();if(UI.screen==='chat')return chat();if(UI.screen==='profile')return profile();if(UI.role==='user')return ({home,discover,events:eventList,activity,venue:venueDetail,event:eventDetail,service:serviceScreen,'booking-form':bookingForm,'booking-review':bookingReview,receipt:bookingReceipt,track:tracking,'ticket-pass':ticketPass,guide})[UI.screen]?.()||home();if(UI.role==='runner')return ({home:runnerHome,jobs:runnerJobs,'job-detail':jobDetail,active:runnerActive,'active-detail':activeDetail,wallet})[UI.screen]?.()||runnerHome();return ({home:venueHome,'venue-requests':()=>merchantList(false),'venue-queue':()=>merchantList(true),'venue-policies':venuePolicies,'venue-insights':insights})[UI.screen]?.()||venueHome()}
function render(preserve=false){const old=window.scrollY||0;const app=document.getElementById('app');const active=UI.screen;app.innerHTML=`<div class="phone">${currentMain()}${['welcome','auth','partner-choice','apply','applied'].includes(UI.screen)?'':'<nav class="bottom-nav" aria-label="Primary navigation">'}${['welcome','auth','partner-choice','apply','applied'].includes(UI.screen)?'':navItems().map(([id,name,icon])=>`<button class="${active===id?'active':''}" onclick="App.go('${id}')" aria-label="${name}"><span class="nav-icon">${ic(icon,21)}</span><span>${name}</span></button>`).join('')}${['welcome','auth','partner-choice','apply','applied'].includes(UI.screen)?'':'</nav>'}${modal()}</div>${UI.toast?`<div class="toast" id="toast">${e(UI.toast)}</div>`:''}`;if(preserve)window.scrollTo({top:old,behavior:'instant'});else window.scrollTo({top:0,behavior:'instant'})}

function go(page) {
  if (UI.screen !== page) {

    // จำตำแหน่ง Scroll ของหน้าที่กำลังออก
    UI.scrollMemory = UI.scrollMemory || {};

    UI.scrollMemory[UI.screen] = window.scrollY;

    UI.stack.push(UI.screen);
  }

  UI.screen = page;
  UI.modal = '';

  render();
}



function back() {
  const leavingVenue = UI.screen === 'venue';

  UI.modal = '';

  const previous = UI.stack.pop() || 'home';
  UI.screen = previous;

  // กลับจากรายละเอียดร้านไป Explore
  if (
    leavingVenue &&
    previous === 'discover' &&
    UI.exploreCache?.phone
  ) {
    const cache = UI.exploreCache;
    const app = document.getElementById('app');

    if (app) {
      // คืนหน้าเดิม โดยไม่สร้าง HTML และรูปใหม่
      app.replaceChildren(cache.phone);

      // อัปเดตหัวใจในกรณีบันทึกร้านจากหน้ารายละเอียด
      cache.phone
        .querySelectorAll('.cnk-explore-heart')
        .forEach(button => {
          const code = button.getAttribute('onclick') || '';

          const id = code.match(
            /App\.toggleFav\(['"]([^'"]+)['"]\)/
          )?.[1];

          if (id) {
            const saved = DB.favs.includes(id);

            button.classList.toggle('is-saved', saved);
            button.setAttribute('aria-pressed', String(saved));
          }
        });

      cache.phone.scrollTop = cache.phoneY;

      const screen = cache.phone.querySelector('.screen');
      if (screen) screen.scrollTop = cache.screenY;

      window.scrollTo(0, cache.y);

      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = cache.docY;
      }

      UI.exploreCache = null;
      return;
    }
  }

  // หน้าอื่นยังใช้การ Render ตามระบบเดิม
  const savedY = UI.scrollMemory?.[previous];

  render();

  if (typeof savedY === 'number') {
    requestAnimationFrame(() => {
      window.scrollTo(0, savedY);
    });
  }
}

function switchRole(role){if(!['user','runner','venue'].includes(role))return;UI.role=role;UI.screen=role === 'runner' ? 'jobs' : 'home' ;UI.stack=[];UI.modal='';UI.toast='';render()}
function startBooking(venue){UI.venue=venue;UI.service=DB.policies[venue].direct?'direct':DB.policies[venue].runner?'runner_booking':'queue';UI.date=dateOffset(1);UI.time='21:00';UI.guests=2;UI.seat='Indoor';UI.note='';go('service')}
function chooseService(s){UI.service=s;render(true)}

function formChange(field, val, rerender = true) {
  if (!['date', 'time', 'seat', 'note'].includes(field)) return;

  UI[field] = String(val);

  if (!rerender) return;

  // เปลี่ยนเฉพาะปุ่มเวลาและประเภทที่นั่ง
  // ไม่ต้อง Render หน้าทั้งหมด
  if (field === 'time' || field === 'seat') {
    document.querySelectorAll('.selectrow .choice').forEach(btn => {
      const text = btn.textContent.trim();
      const isTime = /^\d{2}:\d{2}$/.test(text);

      if ((field === 'time') === isTime) {
        btn.classList.toggle('active', text === UI[field]);
      }
    });

    return;
  }

  render(true);
}
function reviewBooking(){if(!DB.account){UI.returnTo='booking-form';return auth('booking-form')}if(!UI.date||UI.date<dateOffset(0))return toast('Please choose today or a future date.');if(UI.note.length>350)return toast('Please shorten your note.');go('booking-review')}
function submitBooking(){const key=['runner_booking','runner_pickup'].includes(UI.service)?'runner':UI.service;const policy=DB.policies[UI.venue];if(!policy?.[key])return toast('This demo venue does not currently allow that service.');const now=Date.now();const r={id:'CKN-'+String(now).slice(-7),owner:'guest',venue:UI.venue,service:UI.service,guests:UI.guests,date:UI.date,time:UI.time,seat:UI.seat,note:UI.note,fee:feeFor(UI.service),runner:false,status:UI.service==='direct'?'pending_venue':'finding_runner',progressNote:'',created:now};DB.requests.push(r);UI.reqId=r.id;save();notify(`New ${serviceName(UI.service)} · ${V(r.venue).name}`);UI.stack=[];UI.screen='receipt';render()}
function issueTicket(){let ev=E(UI.event);let t={id:'TKT-'+String(Date.now()).slice(-7),event:ev.id,qty:UI.ticketQty,price:ev.price*UI.ticketQty,date:dateOffset(ev.offset)};DB.tickets.push(t);UI.ticketId=t.id;save();notify('Demo event pass generated for '+ev.name);UI.stack=[];go('ticket-pass')}
function acceptJob(id){let j=jobItems().find(x=>x.id===id);if(!j)return toast('Job is no longer available in this demo.');let p=DB.policies[j.venue];if(!p[j.service==='queue'?'queue':'runner'])return toast('The demo venue policy does not allow this service.');let r;if(j.real){r=requestById(j.id);if(!r||r.status!=='finding_runner')return toast('This request has already been taken.')}else{r={id:'CKN-'+String(Date.now()).slice(-7),owner:'sample',venue:j.venue,service:j.service,guests:j.guests,date:dateOffset(1),time:j.time,seat:'Indoor',note:j.note,fee:j.fee,runner:false,status:'finding_runner',created:Date.now(),sourceJob:j.id,progressNote:''};DB.requests.push(r)}r.runner=true;r.status=r.service==='queue'?'queuing':'contacting';r.progressNote='Runner accepted this demo job and is checking venue rules.';save();notify('Runner accepted '+r.id);UI.reqId=r.id;UI.proof='';go('active-detail')}
function submitProgress(id){let r=requestById(id);if(!r||!r.runner||!['queuing','contacting'].includes(r.status))return toast('Job cannot be updated in this state.');const proof=document.getElementById('runner-proof')?.value.trim()||'';if(proof.length<8)return toast('Add a progress note (at least 8 characters).');r.progressNote=proof;r.status='awaiting_venue';save();notify('Runner progress sent to venue for '+r.id);render();toast('Update submitted. Venue review is required.')}
function merchantDecision(id,approve){let r=requestById(id);if(!r||!['pending_venue','awaiting_venue'].includes(r.status))return toast('Request is not awaiting venue review.');if(r.venue!==DB.merchantVenue)return toast('Switch to the matching demo venue first.');if(approve){r.status=r.service==='queue'?'queue_verified':'confirmed';r.progressNote=(r.progressNote?r.progressNote+' · ':'')+'Demo venue approved request. Confirm real venue terms before relying on this.';save();notify('Venue reviewed '+r.id+': '+statusLabel(r.status));render();toast('Demo request approved by Venue Mode.')}else{r.status='declined';save();notify('Venue declined '+r.id);render()}}
function askDecline(id){UI.modalReq=id;UI.modal='decline';render(true)}
function declineConfirmed(){let r=requestById(UI.modalReq);if(!r)return closeModal();r.decisionNote=(document.getElementById('decline-reason')?.value||'Venue did not approve this sample request.').trim().slice(0,250);UI.modal='';merchantDecision(r.id,false)}
function cancelConfirmed(){let r=requestById(UI.modalReq);if(!r||isDone(r))return closeModal();r.status='cancelled';r.progressNote='Guest cancelled the local demo request.';save();notify('Cancelled sample request '+r.id);UI.modal='';render();toast('Demo request cancelled.')}
function sendMessage(){let el=document.getElementById('chat-message');if(!el||!el.value.trim())return;let text=el.value.trim().slice(0,500);(DB.chats[UI.reqId]??=[]).push({role:UI.role,text,at:new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})});save();notify('New sample message on '+UI.reqId);render(true);window.scrollTo(0,document.body.scrollHeight)}
function profileAction(a){if(a==='saved'){UI.tab='saved';if(UI.role!=='user')switchRole('user');go('activity');return}if(a==='notifications'||a==='name'||a==='help'||a==='privacy'||a==='about'||a==='reset'||a==='interests')return openModal(a)}
function addReview(){const text=document.getElementById('review-text')?.value.trim();if(!text||text.length<5)return toast('Write at least 5 characters for your review.');DB.reviews.push({venue:UI.venue,name:DB.name||'Guest',rating:UI.rate,text:text.slice(0,400)});save();UI.modal='';UI.infoTab='reviews';render(true);toast('Demo review saved to your browser.')}
function openMap(id){const v=V(id);const query=encodeURIComponent(v.area+', Bangkok');window.open('https://www.google.com/maps/search/?api=1&query='+query,'_blank','noopener,noreferrer')}
function copyLink(text){if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(()=>toast('Copied to clipboard.')).catch(()=>toast('Could not copy this link.'))}else{try{window.prompt('Copy this local demo link:',text)}catch(_){toast('Sharing is not supported here.')}}}
function openModal(m){UI.modal=m;render(true)}function closeModal(){UI.modal='';render(true)}
function setQuery(v){UI.q=v;const r=document.getElementById('discovery-results');if(r)r.innerHTML=discoveryResults()}


function openVenue(id) {
  if (UI.screen === 'discover') {
    const phone = document.querySelector('#app > .phone');

    if (phone) {
      UI.exploreCache = {
        phone,
        y: window.scrollY || 0,
        docY: document.scrollingElement?.scrollTop || 0,
        phoneY: phone.scrollTop || 0,
        screenY: phone.querySelector('.screen')?.scrollTop || 0
      };
    }
  }

  UI.venue = id;
  UI.infoTab = 'about';
  go('venue');
}
function openEvent(id){UI.event=id;UI.ticketQty=1;go('event')}
function openTracking(id){UI.reqId=id;go('track')}
function openChat(id){UI.reqId=id;go('chat')}
function openTicket(id){UI.ticketId=id;go('ticket-pass')}
function openJob(id){UI.job=id;go('job-detail')}
function openActive(id){UI.reqId=id;UI.proof='';go('active-detail')}
const App={go,back,auth,authTab,submitAuth,demoSocial,startApply,nextApply,prevApply,addFriend,openDirections,switchRole,openVenue,openEvent,openTracking,openChat,openTicket,openJob,openActive,startBooking,chooseService,formChange,reviewBooking,submitBooking,issueTicket,acceptJob,submitProgress,merchantDecision,askDecline,declineConfirmed,cancelConfirmed,sendMessage,profileAction,addReview,openMap,openModal,closeModal,setQuery,
quick,shareVenue(id){copyLink(location.origin+location.pathname+'#venue-'+id)},shareEvent(id){copyLink(location.origin+location.pathname+'#event-'+id)},
setArea(a){UI.area=a;render(true)},setGenre(g){UI.genre=g;render(true)},toggleMap(){UI.map=!UI.map;render(true)},setSort(x){UI.sort=x;render(true)},setPrice(p){UI.filterPrice=p;render(true)},resetFilters(){UI.area='All';UI.genre='All';UI.q='';UI.filterPrice=0;UI.sort='Recommended';render(true)},pickNeighborhood(a){UI.modal='';UI.area=a;UI.genre='All';UI.q='';go('discover')},
setInfoTab(x){UI.infoTab=x;render(true)},
toggleFav(id) {
  const i = DB.favs.indexOf(id);

  if (i >= 0) {
    DB.favs.splice(i, 1);
  } else {
    DB.favs.push(id);
  }

  save();

  const saved = DB.favs.includes(id);

  // อัปเดตปุ่มหัวใจที่เกี่ยวข้อง
  // โดยไม่ Render หน้าใหม่
  document.querySelectorAll('button[onclick]').forEach(btn => {

    if (
      btn.getAttribute('onclick') !==
      `App.toggleFav('${id}')`
    ) return;

    btn.setAttribute('aria-pressed', String(saved));
    btn.classList.toggle('is-active', saved);

    if (btn.classList.contains('cnk-explore-heart')) {
      btn.style.backgroundColor = saved ? '#9b1748' : '';
      btn.style.color = saved ? '#ffffff' : '';
    }
  });

  // หน้ารายการโปรดต้องอัปเดตรายการเมื่อยกเลิกบันทึก
  if (UI.screen === 'activity' && UI.tab === 'saved') {
    render(true);
  }
},
guests(n) {
  UI.guests = Math.max(
    1,
    Math.min(20, UI.guests + n)
  );

  const count = document.getElementById(
    'cnk-guest-count'
  );

  if (count) {
    count.textContent = UI.guests;
  } else {
    render(true);
  }
},
changeVenue(id){DB.merchantVenue=id;save();render(true)},togglePolicy(id){let p=DB.policies[DB.merchantVenue];p[id]=!p[id];save();notify('Sample venue policy changed: '+id+' / '+V(DB.merchantVenue).name);render(true)},
rate(n){UI.rate=n;render(true)},toggleInterest(g){let a=DB.prefs.interests;let i=a.indexOf(g);i>=0?a.splice(i,1):a.push(g);save();render(true)},saveName(){let name=document.getElementById('display-name')?.value.trim().slice(0,25);if(!name)return toast('Please enter a display name.');DB.name=name;save();UI.modal='';render();toast('Demo name updated.')},
clearNotifications(){DB.notifications=[];save();render(true)},resetAll(){DB=getBase();save();UI.modal='';UI.role='user';UI.stack=[];UI.screen='home';UI.q='';UI.tab='requests';render();toast('Local demo data reset.')},
};
window.App=App;
try{const hash=decodeURIComponent(location.hash.slice(1));if(hash.startsWith('venue-')&&venues.some(v=>v.id===hash.slice(6))){UI.venue=hash.slice(6);UI.screen='venue'}else if(hash.startsWith('event-')&&events.some(v=>v.id===hash.slice(6))){UI.event=hash.slice(6);UI.screen='event'}}catch(_){}
render();
