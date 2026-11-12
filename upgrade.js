/* CHILL N’ KNOCK — confirmed feedback release.
   This file enhances the initial app without replacing its layout.
   GitHub Pages / localStorage operate as ONE-BROWSER QA ONLY, not a live booking platform.
*/
'use strict';
const QA = new URLSearchParams(location.search).get('qa') === '1';
const RELEASE_KEY='cnk_release_2026_11';
const VENUE_DATA = [
 {id:'onyx',name:'ONYX',area:'RCA',kind:'ไนต์คลับ',genre:'EDM',tags:['EDM','DJ','VIP'],place:'Royal City Avenue (RCA), ห้วยขวาง กรุงเทพฯ',desc:'ไนต์คลับย่าน RCA ที่เน้น EDM และโชว์ DJ พร้อมแสง สี เสียงและโซน VIP หลายประเภท',source:'https://onyxbangkok.club/',image: 'assets/venues/onyx.jpg',color:'#88224a',verified:true},
 {id:'muin',name:'MU:IN',area:'Thonglor',kind:'ไนต์คลับ',genre:'EDM',tags:['EDM','Hip-Hop','House'],place:'Donki Mall Thonglor ชั้น 5 ถนนสุขุมวิท 63',desc:'คลับแนวเกาหลีในย่านทองหล่อที่มีพื้นที่ดนตรีหลายสไตล์ ทั้ง EDM, Hip-Hop และ House/Techno',source:'https://muinbkk.com/',image:photos.club,accent:'#64409b',verified:true},
 {id:'chupa',name:'CHUPA',area:'Thonglor',kind:'ไนต์คลับ',genre:'Hip-Hop',tags:['Hip-Hop','DJ','City view'],place:'T-ONE Building ชั้น 45 ถนนสุขุมวิท 40 กรุงเทพฯ',desc:'ไนต์คลับชั้นสูงในอาคาร T-ONE เด่นเรื่องวิวเมือง แสงสีและการแสดง DJ สาย Hip-Hop',source:'https://www.timeout.com/bangkok/clubs/chupa',image:photos.dancing,accent:'#a22441',verified:true},
 {id:'tic',name:'TIC TAC TOE',area:'Sukhumvit',kind:'ไนต์คลับ / โซเชียลคลับ',genre:'Pop',tags:['Open-format','DJ','Social'],place:'EmSphere ชั้น 5 โซน EM WONDER สุขุมวิท',desc:'สถานที่สังสรรค์ที่เน้นการพบปะผู้คนและบรรยากาศ DJ ในศูนย์การค้า EmSphere',source:'https://emsphere.co.th/directory/',image:photos.crowd,accent:'#923d77',verified:true},
 {id:'repeat',name:'REPEAT ARI',area:'Ari',kind:'คลับดนตรีสด',genre:'Live',tags:['Live','T-Pop','Friends'],place:'ถนนพหลโยธิน ย่านอารีย์ กรุงเทพฯ',desc:'ร้านดนตรีสดบรรยากาศคึกคักในย่านอารีย์ เหมาะกับการนัดเพื่อนไปฟังเพลงไทย',source:'https://eveduler.com/venues',image:photos.stage,accent:'#733b5a',verified:true},
 {id:'tderm',name:'TDERM',area:'Ekkamai',kind:'คลับดนตรีสด / ไนต์คลับ',genre:'Live',tags:['Live','T-Pop','DJ'],place:'455 ซอยสุขุมวิท 63 เอกมัย กรุงเทพฯ',desc:'ผับดนตรีสดและเพลงไทยยอดนิยมในย่านเอกมัย มีช่วงการแสดงสดและ DJ',source:'https://eveduler.com/venues',image:photos.dj,accent:'#ac3248',verified:true},
 {id:'savoy',name:'HOUSE OF SAVOY',area:'Sukhumvit',kind:'ไนต์คลับ',genre:'Hip-Hop',tags:['Hip-Hop','R&B','Luxury'],place:'โรงแรม SILQ ชั้น 2 ซอยสุขุมวิท 24',desc:'ไนต์คลับบรรยากาศหรูบนสุขุมวิท 24 เน้น Hip-Hop, R&B และค่ำคืนธีมต่าง ๆ',source:'https://edm-addicts.com/club/house-of-savoy',image:photos.lounge,accent:'#684233',verified:true},
 {id:'mil',name:'MIL SOCIAL CLUB',area:'Thonglor',kind:'ไนต์คลับ',genre:'Hip-Hop',tags:['Hip-Hop','R&B','DJ'],place:'J Avenue ชั้น 3 ทองหล่อ ซอย 15',desc:'คลับในทองหล่อที่มี DJ สลับกันเล่น Hip-Hop, R&B, Trap และเพลงเต้นรำ',source:'https://www.timeout.com/bangkok/clubs/mil-social-club',image:photos.club,accent:'#923252',verified:true},
 {id:'what',name:"WHAT'S HAPPENED?",area:'Sukhumvit',kind:'ไนต์คลับ',genre:'Pop',tags:['DJ','Party','Design'],place:'EmSphere ชั้น 5 โซน EM WONDER',desc:'ไนต์คลับที่นำเสนอประสบการณ์แสงสีและพื้นที่หลายบรรยากาศภายใน EM WONDER',source:'https://www.timeout.com/bangkok/clubs/whats-happened',image:photos.dancing,accent:'#b5436f',verified:true},
 {id:'upper',name:'UPPER HOUSE',area:'Sukhumvit',kind:'ไนต์คลับ / เลานจ์',genre:'House',tags:['DJ','House','Luxury'],place:'สุขุมวิท 24 กรุงเทพฯ',desc:'สถานบันเทิงในโซนสุขุมวิท 24 บรรยากาศคลับระดับพรีเมียม พร้อม DJ',source:'https://thailandlifetools.com/bangkok/areas/phrom-phong/',image:photos.rooftop,accent:'#79424a',verified:true},
 {id:'ratch',name:'RATCH HOUR',area:'Ratchayothin',kind:'บาร์ดนตรี / คลับ',genre:'Pop',tags:['Thai Pop','Live','Friends'],place:'1440 ถนนพหลโยธิน จันทรเกษม จตุจักร',desc:'ร้านแฮงก์เอาต์โซนรัชโยธิน เน้นเพลงไทยยอดนิยมและบรรยากาศกลุ่มเพื่อน',source:'https://www.thai2night.com/venue/ratch-hour',image:photos.stage,accent:'#a85c42',verified:true},
 {id:'praao',name:'PRAAO',area:'Ratchayothin',kind:'คลับดนตรีสด',genre:'Live',tags:['Live','T-Pop','Indie'],place:'ย่านรัชโยธิน กรุงเทพฯ',desc:'สถานที่ดนตรีสดและสังสรรค์ที่มีอีเวนต์หมุนเวียนในย่านรัชโยธิน',source:'https://eveduler.com/venues',image:photos.dj,accent:'#ae3940',verified:true},
 {id:'rysh',name:'RYSH',area:'Ratchayothin',kind:'คลับ / ร้านดนตรี',genre:'Pop',tags:['T-Pop','Live','Friends'],place:'ติด BTS รัชโยธิน ทางออก 4 ถนนพหลโยธิน',desc:'ร้านดนตรีและสังสรรค์ในโซนรัชโยธิน สามารถติดตามช่องทางจองโต๊ะจากร้านโดยตรง',source:'https://linktr.ee/rysh.ratchayothin',image:photos.crowd,accent:'#573d55',verified:true},
 {id:'thay',name:'THAY',area:'Ekkamai',kind:'ร้านดนตรี / คลับ',genre:'Live',tags:['Live','DJ','Thai Pop'],place:'ย่านเอกมัย กรุงเทพฯ (ควรยืนยันสาขา)',desc:'ร้านดนตรีและปาร์ตี้ที่อยู่ในรายชื่อแหล่งอ้างอิงของโครงการ โปรดตรวจสอบรายละเอียดร้านก่อนเดินทาง',source:'',image:photos.lounge,accent:'#2f665c',verified:false},
 {id:'viral',name:'VIRAL',area:'ไม่ยืนยัน',kind:'อยู่ระหว่างยืนยัน',genre:'Pop',tags:['Party','Live'],place:'ยังไม่ยืนยันตำแหน่งร้านจากโลโก้ที่ให้มา',desc:'รายการจากภาพอ้างอิงของทีม ยังต้องตรวจสอบตัวตนและที่ตั้งร้านให้ตรงกับโลโก้',source:'',image:photos.dancing,accent:'#af5f30',verified:false},
 {id:'truth',name:'TRUTH OR DARE',area:'Langsuan',kind:'คลับ / ค็อกเทล',genre:'House',tags:['DJ','House','Cocktails'],place:'โซนหลังสวน กรุงเทพฯ',desc:'สถานบันเทิงแนวค็อกเทลและดนตรี DJ ในย่านหลังสวน',source:'https://eveduler.com/venues',image:photos.bar,accent:'#492a49',verified:true},
 {id:'guest',name:'GUEST HOUSE',area:'ไม่ยืนยัน',kind:'ร้านดนตรีสด',genre:'Live',tags:['Live','Pop','Friends'],place:'GuestHouse Kaset ย่านเกษตร–เสนานิคม (รอยืนยันว่าเป็นร้านในภาพ)',desc:'พบข้อมูลชื่อ GuestHouse Kaset แต่ยังต้องตรวจสอบว่าเป็นร้านเดียวกับโลโก้ Guest House ในภาพของทีม',source:'https://bangkok-nights.com/venue/guesthouse-kaset',image:photos.crowd,accent:'#946322',verified:false},
 {id:'mirror',name:'MIRROR MUSE',area:'Thonglor',kind:'โซเชียลคลับ',genre:'Hip-Hop',tags:['Hip-Hop','R&B','DJ'],place:'ย่านทองหล่อ กรุงเทพฯ (รอยืนยันพิกัด)',desc:'รายชื่อจากภาพอ้างอิงของทีม เป็นโซเชียลคลับในกลุ่มสถานบันเทิงที่ต้องยืนยันที่อยู่และโปรแกรมเพลงล่าสุด',source:'',image:photos.club,accent:'#6a5268',verified:false}
].map(v=>({...v,rating:null,price:null,queue:true,menu:[]}));
venues.splice(0,venues.length,...VENUE_DATA);
sampleJobs.splice(0,sampleJobs.length); // No fabricated jobs in the default Runner queue.
if(DB.releaseVersion!==20261104){
  const oldAccount=DB.account?.email && !DB.account?.pass ? DB.account : null;
  DB=getBase();DB.releaseVersion=20261104;DB.account=oldAccount;DB.accounts={};DB.sessionEmail=null;DB.lang='th';DB.merchantVenue='onyx';
  save();
}
DB.policies=DB.policies||{};
for(const v of venues){ if(!DB.policies[v.id]) DB.policies[v.id]={direct:true,runner:true,queue:true}; }
if(!venues.some(v=>v.id===DB.merchantVenue))DB.merchantVenue='onyx';
if(!DB.accounts)DB.accounts={};
if(!DB.lang)DB.lang='th';
save();
UI.venue='onyx';UI.service='direct';UI.runnerChoice='none';UI.stepActual=1;

// Maintain readable, Thai-first UI for all legacy screens after rendering.
const translatePairs={
 'Home':'หน้าหลัก','Explore':'ค้นหาร้าน','Events':'อีเวนต์','My nights':'คืนของฉัน','Profile':'โปรไฟล์',
 'TONIGHT’S PICKS':'คืนนี้ห้ามพลาด','THE HOT LIST':'ร้านที่น่าสนใจ','THE NIGHT IS CALLING':'ค่ำคืนนี้รอคุณอยู่',
 'MAKE':'MAKE','IT A':'IT A','NIGHT.':'NIGHT.','EXPLORE TONIGHT':'สำรวจคืนนี้',
 'Explore all':'ค้นหาทั้งหมด','Live Music':'ดนตรีสด','Nightclubs':'ไนต์คลับ','Near me*':'ใกล้ฉัน',
 'YOUR CITY. YOUR NIGHT.':'YOUR CITY. YOUR NIGHT.',
 'ON THE RADAR':'อีเวนต์และกิจกรรม','DON’T MISS OUT':'อย่าพลาด','VIEW ALL':'ดูทั้งหมด','View all':'ดูทั้งหมด',
 'Discover Bangkok after dark. Find your people, your music, your next favorite spot.':'ค้นหาร้านที่ใช่ เพลงที่ชอบ และค่ำคืนในกรุงเทพฯ ที่เป็นแบบคุณ',
 'ONE APP · THREE SIDES':'ครบทั้งลูกค้า Runner และร้าน','THE NIGHT, YOUR WAY':'ค่ำคืนในแบบของคุณ',
 'FIND YOUR SCENE':'ค้นหาร้านที่ตรงใจ','DISCOVER':'DISCOVER','AFTER DARK.':'AFTER DARK.',
 'NEIGHBORHOOD':'ย่าน','MUSIC & MOOD':'แนวเพลงและบรรยากาศ','Map preview':'ดูพื้นที่','List view':'ดูรายชื่อ',
 'DETAILS':'รายละเอียด','View status':'ดูสถานะ','Message':'แชต','Book now':'จองคืนนี้',
 'Overview':'ภาพรวม','Menu':'เมนู','Reviews':'รีวิว','Photos':'รูปภาพ',
 'Demo rating':'ยังไม่มีคะแนน','Sample price from':'สอบถามราคา','Queue-help policy':'การช่วยต่อคิว',
 'Location area':'พื้นที่ตั้งร้าน','Open area map':'เปิดแผนที่','Contact & booking policies':'ข้อมูลติดต่อและการจอง',
 'YOUR NIGHT STARTS HERE':'วางแผนคืนนี้','Book your night':'จองคืนนี้','BOOK YOUR NIGHT':'จองคืนนี้',
 'HOW DO YOU':'คุณต้องการ','WANT TO GO?':'จองแบบไหน?','Request directly':'จองกับร้านโดยตรง',
 'Runner · Advance booking':'ให้ Runner ช่วยจองล่วงหน้า','Runner · Walk-in queue':'ให้ Runner ช่วยต่อคิว Walk-in',
 'CONTINUE':'ดำเนินการต่อ','Which date?':'เลือกวันที่','Preferred arrival time':'เวลาที่ต้องการไป',
 'Your group size':'จำนวนคน','Including you':'รวมคุณแล้ว','Preferred seating':'ประเภทที่นั่ง',
 'Your night, your details':'รายละเอียดการจอง','REVIEW REQUEST':'ตรวจสอบคำขอ',
 'Review & submit':'ตรวจสอบก่อนส่ง','FINAL CHECK':'ตรวจสอบครั้งสุดท้าย',
 'READY FOR':'พร้อมสำหรับ','YOUR NIGHT?':'คืนนี้หรือยัง?','SEND DEMO REQUEST':'ส่งคำขอทดลอง',
 'Edit details':'แก้ไขรายละเอียด','Request submitted':'ส่งคำขอแล้ว','Booking status':'สถานะคำขอ',
 'Finding a runner':'กำลังหา Runner','Awaiting venue review':'รอร้านตรวจสอบ',
 'Runner contacting venue':'Runner กำลังติดต่อร้าน','Runner checking queue':'Runner กำลังตรวจสอบคิว',
 'Waiting for venue verification':'รอร้านยืนยัน','Venue confirmed':'ร้านยืนยันคำขอแล้ว',
 'Queue help verified':'ร้านยืนยันการช่วยต่อคิว','Not approved':'ร้านไม่อนุมัติ',
 'Cancelled':'ยกเลิกแล้ว','ALL YOUR PLANS':'แผนเที่ยวของฉัน','YOUR':'คืน','NIGHTS':'ของฉัน',
 'AVAILABLE TO REVIEW':'งานที่พร้อมให้ตรวจสอบ','NEW OPPORTUNITIES':'งานใหม่',
 'RUNNER WORKSPACE / DEMO':'พื้นที่ทำงาน Runner · โหมดทดสอบ',
 'VENUE PARTNER MODE / DEMO':'พื้นที่ร้านพาร์ตเนอร์ · โหมดทดสอบ',
 'All requests':'คำขอทั้งหมด','Need review':'รอตรวจสอบ','Approved':'อนุมัติแล้ว',
 'VENUE SIMULATION':'ร้านที่จัดการ (QA)','VENUE PARTNER':'ร้านพาร์ตเนอร์',
 'Active jobs':'งานที่กำลังทำ','Open leads':'งานที่รอรับ','Sample rating':'คะแนนตัวอย่าง',
 'Cancel demo':'ยืนยันยกเลิก','Help center':'ศูนย์ช่วยเหลือ',
 'SAVE DEMO REVIEW':'บันทึกรีวิวทดลอง','Search venues':'ค้นหาร้าน',
 'No venues found':'ไม่พบร้าน','Reset filters':'ล้างตัวกรอง'
};
const trText=t=>{ if(DB.lang==='en') return t; const raw=t.trim(); if(!raw)return t; if(translatePairs[raw]!==undefined)return t.replace(raw,translatePairs[raw]); return t;};
function localizePage(){
 const root=document.getElementById('app');if(!root)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const all=[];while(walker.nextNode())all.push(walker.currentNode);
 for(const node of all){if(node.parentElement?.closest('script,style'))continue;node.nodeValue=trText(node.nodeValue);}
 root.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(n=>{const m={'Venues, music, neighborhoods...':'ค้นหาร้าน แนวเพลง หรือย่าน','e.g. We are celebrating a birthday. Please confirm requirements.':'เช่น ต้องการโต๊ะ VIP / มีผู้ร่วมงานเพิ่ม','Write a message...':'พิมพ์ข้อความ','Search venue, event, music...':'ค้นหาร้าน อีเวนต์ แนวเพลง'};if(m[n.placeholder])n.placeholder=m[n.placeholder]});
 if(!QA)root.querySelectorAll('.qa-only').forEach(el=>el.remove());
}
const baseRender=render;
render=function(preserve=false){baseRender(preserve);localizePage();};

// Remove invented ratings, admission prices, availability or venue images claimed as genuine.
venueTile=function(v,i=0){let saved=DB.favs.includes(v.id);return `<div class="venue-tile" role="group"><button class="venue-tile-btn" onclick="App.openVenue('${v.id}')" aria-label="รายละเอียด ${e(v.name)}"><div class="photo image" style="${media(v.image,v.accent)}"><span class="image-tag"></span></div><div class="v-name">${e(v.name)}</div><div class="v-sub">${e(v.area)} · ${e(v.genre)}</div></button><button class="tile-heart ${saved?'is-active':''}" onclick="App.toggleFav('${v.id}')" aria-label="บันทึก ${e(v.name)}">${ic('heart',17)}</button></div>`;};
wideVenue=function(v){return `<div class="venue-wide"><button class="wide-click" onclick="App.openVenue('${v.id}')" aria-label="ดูร้าน ${e(v.name)}"><div class="image" style="${media(v.image,v.accent)}"></div><div class="wide-info"><div class="wide-title">${e(v.name)}</div><div class="wide-sub">${e(v.area)} · ${e(v.kind)}<br>${e(v.genre)}</div><span class="wide-status">${v.verified?'มีแหล่งข้อมูลร้าน':'รอยืนยันข้อมูลร้าน'}</span></div></button><button class="wide-details" onclick="App.openVenue('${v.id}')">รายละเอียด ${ic('chevron',14)}</button></div>`;};
filteredVenues = function () {
  const q = UI.q.trim().toLocaleLowerCase();

  const results = venues.filter(v =>
    (UI.area === 'All' || v.area === UI.area) &&
    (
      UI.genre === 'All' ||
      v.genre === UI.genre ||
      v.tags.includes(UI.genre) ||
      v.kind.includes(UI.genre)
    ) &&
    (
      !q ||
      [
        v.name, v.area, v.kind,
        v.genre, v.place, ...v.tags
      ].join(' ').toLocaleLowerCase().includes(q)
    ) &&
    (
      !UI.filterPrice ||
      (
        typeof v.price === 'number' &&
        v.price <= UI.filterPrice
      )
    )
  );

  if (UI.sort === 'Top rated') {
    results.sort(
      (a,b) => (b.rating ?? -1) - (a.rating ?? -1)
    );
  }

  if (UI.sort === 'Lowest sample price') {
    results.sort(
      (a,b) => (a.price ?? Infinity) - (b.price ?? Infinity)
    );
  }

  return results;
};
discoveryResults=function(){const arr=filteredVenues();return `<div class="search-meta"><span>${arr.length} ร้านในรายการ</span><span</span></div>${arr.length?arr.map(wideVenue).join(''):`<div class="empty"><h3>ไม่พบร้านที่ค้นหา</h3><p>ลองเปลี่ยนย่านหรือแนวเพลง</p><button class="btn smallbtn" onclick="App.resetFilters()">ล้างตัวกรอง</button></div>`}`;};
discover=function(){const areas=['All','RCA','Thonglor','Ekkamai','Sukhumvit','Ari','Ratchayothin','Chatuchak','Langsuan','Sathorn','ไม่ยืนยัน'];const genres=['All','EDM','Hip-Hop','House','Live','Pop'];return `<div class="screen">${brandHeader()}<div class="pad discovery-header"><div class="eyebrow">FIND YOUR SCENE</div><h1>DISCOVER<br><span class="accent">AFTER DARK.</span></h1><div class="searchbar-row"><label class="searchbox">${ic('search')}<input id="discovery-search" placeholder="ค้นหาร้าน แนวเพลง หรือย่าน" value="${e(UI.q)}" oninput="App.setQuery(this.value)" aria-label="ค้นหาร้าน"></label><button class="filter-btn" onclick="App.openModal('filter')" aria-label="ตัวกรอง">${ic('sliders',22)}</button></div><div class="micro" style="margin:23px 0 9px">ย่าน</div><div class="chips">${areas.map(a=>`<button class="chip ${UI.area===a?'active':''}" onclick="App.setArea('${a}')">${a==='All'?'ทั้งหมด':a}</button>`).join('')}</div><div class="micro" style="margin:18px 0 9px">แนวเพลงและบรรยากาศ</div><div class="chips">${genres.map(g=>`<button class="chip ${UI.genre===g?'line-active':''}" onclick="App.setGenre('${g}')">${g==='All'?'ทั้งหมด':g}</button>`).join('')}</div><div id="discovery-results">${discoveryResults()}</div><div class="content-note">ภาพประกอบยังไม่ใช่ภาพร้านจริง และระบบยังไม่ได้เชื่อมโต๊ะว่าง ราคา หรือคิวของร้าน โปรดตรวจสอบกับร้านก่อนเดินทาง</div></div></div>`;};

detailInfo=function(v){
 if(UI.infoTab==='menu')return `<div class="info-copy"><h3>เมนูและแพ็กเกจ</h3><p>ยังไม่ได้รับเมนู ราคาโต๊ะ และแพ็กเกจที่ยืนยันล่าสุดจากร้าน จึงไม่แสดงราคาที่คาดเดา</p><div class="notice-card">เมื่อร้านส่งเมนูหรือทีมได้รับอนุญาตให้ใช้ข้อมูล จะเพิ่มรายการ ราคา เงื่อนไขขั้นต่ำ และภาพเมนูในหน้านี้</div></div>`;
 if(UI.infoTab==='reviews')return `<div class="info-copy"><h3>รีวิวจากผู้ใช้</h3><p>รีวิวใน CHILL N’ KNOCK จะเปิดเมื่อมีการใช้งานที่ตรวจสอบได้จริง</p>${(DB.reviews||[]).filter(r=>r.venue===v.id).map(r=>`<div class="request-card"><b>★ ${r.stars||5}</b><p>${e(r.text||'')}</p><small>รีวิวทดลองจากเบราว์เซอร์นี้</small></div>`).join('')||'<div class="empty">ยังไม่มีรีวิวในแอป</div>'}</div>`;
 if(UI.infoTab==='gallery')return `<div class="info-copy"><h3>รูปบรรยากาศร้าน</h3><div class="gallery-place image" style="${media(v.image,v.accent)}"></div><p class="hint">ภาพบรรยากาศเพื่อจัดวางตัวอย่างเท่านั้น ไม่ใช่ภาพสถานที่จริงของ ${e(v.name)} ทีมสามารถเพิ่มภาพที่ได้รับสิทธิ์ในโฟลเดอร์ assets/venues/</p></div>`;
 return `<div class="info-copy"><h3>เกี่ยวกับร้าน</h3><p>${e(v.desc)}</p><div class="tag-list">${v.tags.map(x=>`<span class="pill outline">${e(x)}</span>`).join('')}</div><div class="line"></div><div class="spread"><div><b>ที่ตั้งร้าน</b><p class="hint">${e(v.place)}</p></div><button class="btn smallbtn ghost" onclick="App.openMap('${v.id}')">${ic('map',16)} เปิดแผนที่</button></div><div class="line"></div><div class="spread"><b>ข้อมูลและการจอง</b><span class="pill tiny gold">${v.verified?'มีแหล่งอ้างอิง':'รอตรวจสอบ'}</span></div><p class="hint">ราคาโต๊ะ รอบเวลา เงื่อนไขการจอง เงินประกัน และการรับโต๊ะโดย Runner ต้องให้ร้านยืนยันก่อน</p>${v.source?`<a class="source-link" href="${e(v.source)}" target="_blank" rel="noopener noreferrer">ตรวจสอบข้อมูลร้านจากแหล่งอ้างอิง ${ic('external',14)}</a>`:''}`;
};
venueDetail=function(){let v=V(UI.venue);return `<div class="screen venue-screen"><div class="detail-cover image" style="${media(v.image,v.accent)}"><div class="detail-top"><button class="circle-btn" onclick="App.back()" aria-label="ย้อนกลับ">${ic('back')}</button><div class="row"><button class="circle-btn" onclick="App.toggleFav('${v.id}')" aria-label="บันทึกร้าน">${ic('heart')}</button><button class="circle-btn" onclick="App.shareVenue('${v.id}')" aria-label="แชร์">${ic('share')}</button></div></div><div class="detail-bottom"><span class="pill rose">${e(v.kind)} · ${e(v.genre)}</span><h1>${e(v.name)}</h1><p>${ic('pin',13)} ${e(v.area)} · กรุงเทพฯ</p><span class="photo-note">ภาพบรรยากาศตัวอย่าง (รอรูปจริงจากร้าน)</span></div></div><div class="pad"><div class="detail-stats"><div class="stat"><b>—</b><span>รีวิวในแอป</span></div><div class="stat"><b>สอบถาม</b><span>ราคาโต๊ะ</span></div><div class="stat"><b>รอยืนยัน</b><span>คิวและสิทธิ์ Runner</span></div></div><div class="info-tabs">${[['about','ภาพรวม'],['menu','เมนู'],['reviews','รีวิว'],['gallery','รูปภาพ']].map(([id,label])=>`<button class="${UI.infoTab===id?'active':''}" onclick="App.setInfoTab('${id}')">${label}</button>`).join('')}</div>${detailInfo(v)}<div class="safety">${ic('info',18)}<span>ยังไม่เชื่อมต่อข้อมูลโต๊ะหรือคิวจริง การส่งคำขอในต้นแบบไม่ใช่การยืนยันโต๊ะจากร้าน</span></div></div><div class="floating-cta venue-sticky"><div><div class="micro">CHILL N’ KNOCK</div><strong style="font-size:11px">เลือกวิธีจอง 4 แบบ</strong></div><button class="btn" onclick="App.startBooking('${v.id}')">จองคืนนี้ ${ic('arrow',16)}</button></div></div>`;};
serviceName=function(s){return({direct:'จองกับร้านโดยตรง',runner_booking:'ให้ Runner ช่วยจองล่วงหน้า',runner_pickup:'จองเอง แล้วให้ Runner รับโต๊ะ',queue:'ให้ Runner ช่วยต่อคิว Walk-in'})[s]||s;};
serviceScreen=function(){const v=V(UI.venue);let opts=[
 {id:'direct',icon:'calendar',name:'จองกับร้านโดยตรง',desc:'ส่งคำขอจองโต๊ะให้ร้านตรวจสอบ',fee:0},
 {id:'runner_pickup',icon:'shield',name:'จองเอง แล้วให้ Runner ไปรับโต๊ะ',desc:'จองกับร้านก่อน แล้วจ้าง Runner ช่วยเช็กอิน/รับโต๊ะเฉพาะร้านที่อนุญาต',fee:300},
 {id:'runner_booking',icon:'users',name:'ให้ Runner ช่วยจองล่วงหน้า',desc:'ให้ Runner ช่วยติดต่อร้านและดำเนินคำขอจอง',fee:300},
 {id:'queue',icon:'clock',name:'ให้ Runner ช่วยต่อคิว Walk-in',desc:'ให้ Runner ไปต่อคิวตามกฎร้าน โดยยังไม่รับประกันโต๊ะหรือสิทธิ์โอนคิว',fee:350}
 ];return `<div class="screen">${title('เลือกวิธีจอง','ขั้นตอนที่ 1 จาก 3')}<div class="stepper"><span class="done"></span><span></span><span></span></div><div class="pad"><div class="eyebrow" style="margin:15px 0 7px">${e(v.name)} · ${e(v.area)}</div><h1 class="s-title" style="font-size:42px;margin:0 0 19px">คุณต้องการ<br>จองแบบไหน?</h1>${opts.map(o=>`<button class="service-option ${UI.service===o.id?'selected':''}" onclick="App.chooseService('${o.id}')"><div class="service-mark">${ic(o.icon,22)}</div><div class="grow"><strong>${e(o.name)}</strong><p>${e(o.desc)}</p><div class="service-fee">ตัวอย่างค่าบริการ: ${baht(o.fee)}</div></div><span class="radio"></span></button>`).join('')}<div class="safety">${ic('shield',18)}<span>บริการรับโต๊ะหรือต่อคิวแทนต้องได้รับอนุญาตจากร้านก่อน ตัวเลขค่าบริการเป็นเพียงตัวอย่าง ไม่มีการเรียกเก็บเงินจริง</span></div><button class="btn full service-next" onclick="App.go('booking-form')">ดำเนินการต่อ ${ic('arrow',17)}</button></div></div>`;};

// Review includes queue estimates (explicitly sample), optional Runner selection, and deposit rules.
const QA_RUNNERS=[{id:'r1',name:'Runner A',rating:'4.9',jobs:128,fee:300},{id:'r2',name:'Runner B',rating:'4.8',jobs:94,fee:350}];
function runnerChoiceUI(){if(UI.service==='direct')return '';return `<div class="form-card section"><div class="spread"><b>เลือกผู้ช่วย Runner</b><span class="pill tiny gold">ตัวอย่าง QA</span></div><p class="hint">คะแนน งานสำเร็จ และป้ายตรวจสอบตัวตนด้านล่างเป็นข้อมูลสมมติ ยังไม่มี Runner ที่ผ่าน KYC จริง</p>${QA_RUNNERS.map(r=>`<button class="runner-pick ${UI.runnerChoice===r.id?'selected':''}" onclick="App.pickRunner('${r.id}')"><span class="runner-avatar">${ic('user',20)}</span><span class="grow"><b>${r.name}</b><small>✓ ตัวอย่างป้ายตรวจสอบตัวตน (QA)</small><small>★ ${r.rating} · ${r.jobs} งานสำเร็จ (จำลอง)</small><small>พร้อมรับงาน (จำลอง)</small></span><span><b>${baht(r.fee)}*</b><span class="radio ${UI.runnerChoice===r.id?'checked':''}"></span></span></button>`).join('')}<button class="runner-pick ${UI.runnerChoice==='none'?'selected':''}" onclick="App.pickRunner('none')"><span class="grow"><b>ให้ระบบจับคู่ Runner ภายหลัง</b><small>ไม่ต้องเลือกผู้รับงานตอนนี้</small></span><span class="radio"></span></button></div>`;}
bookingReview=function(){let v=V(UI.venue),fee=feeFor(UI.service);return `<div class="screen">${title('ตรวจสอบก่อนส่งคำขอ','ขั้นตอนที่ 3 จาก 3')}<div class="stepper"><span class="done"></span><span class="done"></span><span class="done"></span></div><div class="pad"><div class="eyebrow" style="margin-top:15px">FINAL CHECK</div><h1 class="s-title" style="font-size:42px;margin:8px 0 19px">ตรวจสอบ<br><span class="accent">การจอง</span></h1><div class="form-card"><span class="pill rose">${e(serviceName(UI.service))}</span><h2>${e(v.name)}</h2>${[['ย่าน',v.area],['วันที่และเวลา',tinyDate(UI.date)+' · '+UI.time],['จำนวนคน',String(UI.guests)+' คน'],...(UI.service!=='queue'?[['ประเภทที่นั่ง',UI.seat]]:[]),['หมายเหตุ',UI.note||'ไม่มี']].map(([k,val])=>`<div class="spread review-row"><span class="hint">${e(k)}</span><strong>${e(val)}</strong></div>`).join('')}</div>${UI.service==='queue'?`<div class="queue-panel"><div class="spread"><b>สถานะคิวก่อนยืนยัน</b><span class="pill tiny gold">ตัวเลขตัวอย่าง</span></div><div class="queue-grid"><div><span>จำนวนคิวก่อนหน้า</span><b>8 คิว</b></div><div><span>เวลารอโดยประมาณ</span><b>30–45 นาที</b></div></div><p>ข้อมูลนี้เป็นสถานการณ์จำลอง ไม่ใช่คิวปัจจุบันของ ${e(v.name)} ระบบจริงต้องมีการอัปเดตจากร้านหรือ Runner พร้อมเวลาอัปเดตล่าสุด</p></div>`:`<div class="queue-panel"><b>สถานะโต๊ะ/เวลารอ</b><p>ยังไม่เชื่อมต่อจำนวนโต๊ะว่างหรือเวลารอจากร้าน จึงต้องรอการตอบรับก่อนยืนยันสถานะ</p></div>`}${runnerChoiceUI()}<div class="form-card section"><div class="spread"><span class="hint">ค่าบริการ Runner (ตัวอย่าง)</span><b>${baht(fee)}</b></div><details class="deposit-details"><summary>เงินประกัน (Deposit) และเงื่อนไขการคืนเงิน ${ic('chevron',16)}</summary><p>เงินประกันของร้าน **ยังไม่ทราบจำนวนที่ยืนยัน** และไม่รวมอยู่ในค่าบริการตัวอย่าง การเก็บเงินประกันต้องแสดงจำนวน ผู้รับเงิน วันคืนเงิน เงื่อนไขยกเลิก และนโยบายแต่ละร้านก่อนชำระเงินจริง</p><p>ต้นแบบนี้ไม่มีการเรียกเก็บเงินหรือคืนเงินจริง</p></details></div><div class="safety">${ic('shield',18)}<span>คำขอจะถูกบันทึกในเบราว์เซอร์เพื่อทดสอบการเชื่อม User → Runner → Venue เท่านั้น ยังไม่มีการส่งคำขอถึงร้านจริง</span></div><button class="btn full" style="margin:18px 0 10px" onclick="App.submitBooking()">ยืนยันส่งคำขอทดลอง ${ic('arrow',17)}</button><button class="btn ghost full" onclick="App.back()">ย้อนกลับไปแก้ไข</button></div></div>`;};

App.pickRunner = function(id) {
  UI.runnerChoice = id;

  document.querySelectorAll(
    '.cnk-runner-row, .runner-pick'
  ).forEach(btn => {

    const selected =
      btn.getAttribute('onclick') ===
      `App.pickRunner('${id}')`;

    btn.classList.toggle('selected', selected);

    btn.setAttribute(
      'aria-pressed',
      String(selected)
    );

    btn.querySelector('.radio')
      ?.classList.toggle('checked', selected);
  });
};
// Role permissions and QA-only cross-role testing.
const originalSwitchRole=App.switchRole;
App.switchRole=function(role){if(role==='user')return originalSwitchRole('user');const approved=DB.applications?.[role]?.status==='approved';if(QA||approved)return originalSwitchRole(role);toast('ต้องสมัครและผ่านการตรวจสอบก่อนเข้าใช้งานบทบาทนี้');};
App.qaSwitch=function(role){if(!QA)return;App.switchRole(role);};
const oldStartBooking=App.startBooking;
App.startBooking=function(id){UI.runnerChoice='none';oldStartBooking(id);};
const oldSubmitBooking=App.submitBooking;
App.submitBooking=function(){if(!DB.account)return App.auth('booking-review');oldSubmitBooking();const r=requestById(UI.reqId);if(r){r.owner=DB.account.email;r.runnerChoice=UI.runnerChoice;save();}};
const oldReviewBooking=App.reviewBooking;
App.reviewBooking=function(){if(!DB.account){UI.returnTo='booking-review';return App.auth('booking-review')}oldReviewBooking();};
const oldAcceptJob=App.acceptJob;
App.acceptJob=function(id){if(!QA&&UI.role!=='runner')return toast('เฉพาะ Runner ที่มีสิทธิ์เท่านั้น');oldAcceptJob(id);let r=requestById(UI.reqId);if(r&&r.runner) {r.runnerAccount=DB.account?.email||'qa-runner';save();}};
const oldMerchantDecision=App.merchantDecision;
App.merchantDecision=function(id,approve){if(!QA&&UI.role!=='venue')return toast('เฉพาะร้านที่มีสิทธิ์เท่านั้น');oldMerchantDecision(id,approve);};
App.changeVenue=function(id){if(!QA)return toast('ร้านที่จัดการถูกผูกกับบัญชีพาร์ตเนอร์');if(venues.some(v=>v.id===id)){DB.merchantVenue=id;save();render(true)}};
venueSelect=function(){return QA?`<label class="field-label" for="managedVenue">ร้านที่ดูแล (QA)</label><select class="field" id="managedVenue" onchange="App.changeVenue(this.value)">${venues.map(v=>`<option value="${v.id}" ${v.id===DB.merchantVenue?'selected':''}>${e(v.name)}</option>`).join('')}</select><p class="hint">เปลี่ยนร้านได้เฉพาะโหมด QA เพื่อทดสอบการอนุมัติคำขอ</p>`:`<div class="subtle-card"><b>${e(V(DB.merchantVenue).name)}</b><p class="hint">บัญชีร้านพาร์ตเนอร์ · เฉพาะร้านที่ได้รับสิทธิ์</p></div>`;};

// Registration uses hashed local TEST passwords, never claims secure production authentication.
async function hashLocal(value){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return Array.from(new Uint8Array(b)).map(n=>n.toString(16).padStart(2,'0')).join('');}
App.submitAuth=async function(ev){ev.preventDefault();let mail=document.getElementById('auth-email')?.value.trim().toLowerCase(),pw=document.getElementById('auth-pass')?.value||'',signup=UI.authTab==='signup';if(!mail||pw.length<6)return toast('กรุณากรอกอีเมลและรหัสผ่านอย่างน้อย 6 ตัวอักษร');try{let hashed=await hashLocal(pw);let record=DB.accounts[mail];if(signup){if(record)return toast('อีเมลนี้มีบัญชีทดลองแล้ว กรุณาเข้าสู่ระบบ');let name=document.getElementById('auth-name')?.value.trim()||'สมาชิก';record={email:mail,name,hash:hashed,created:Date.now()};DB.accounts[mail]=record;}else if(!record||record.hash!==hashed){return toast('อีเมลหรือรหัสผ่านไม่ถูกต้อง');}DB.sessionEmail=mail;DB.account={email:mail,name:record.name};DB.name=record.name;UI.role='user';save();let dest=UI.returnTo||'home';UI.stack=[];UI.screen=dest==='auth'?'home':dest;render();toast('เข้าสู่ระบบในเบราว์เซอร์นี้แล้ว');}catch(err){console.error(err);toast('เปิดผ่าน HTTPS หรือ Live Server เพื่อใช้งานบัญชีทดลอง');}};

App.authTab = function(x) {
  if (UI.authTab === x) return;

  UI.authTab = x;

  const screen = document.querySelector(
    '#app .auth-screen'
  );

  // หน้าที่ไม่ใช่ Login / Signup ใช้การ Render เดิม
  if (!screen || !['login', 'signup'].includes(x)) {
    render(true);
    return;
  }

  // สร้างเนื้อหาฟอร์มใหม่ใน Element ชั่วคราว
  const draft = document.createElement('div');

  draft.innerHTML = authPage();

  const next = draft.querySelector('.auth-screen');
  const brand = screen.querySelector('.auth-brand');

  if (!next || !brand) {
    render(true);
    return;
  }

  // เก็บปุ่มย้อนกลับและโลโก้เดิมไว้
  const backButton = screen.firstElementChild;

  [...screen.children].forEach(child => {
    if (child !== brand && child !== backButton) {
      child.remove();
    }
  });

  // เปลี่ยนเฉพาะเนื้อหาใต้โลโก้
  [...next.children].forEach(child => {
    if (
      child.matches('.auth-brand') ||
      child.matches('.circle-btn')
    ) return;

    screen.appendChild(child);
  });

  localizePage();
};
function providerIcon(provider){if(provider==='apple')return `<svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c.04 2.58 2.25 3.43 2.27 3.44-.02.06-.35 1.19-1.16 2.35-.7 1-1.43 1.99-2.58 2.01-1.13.02-1.5-.66-2.8-.66-1.3 0-1.72.64-2.79.68-1.12.04-1.97-1.06-2.68-2.06-1.45-2.06-2.56-5.81-1.07-8.35.74-1.26 2.06-2.05 3.49-2.07 1.1-.02 2.13.74 2.81.74.69 0 1.97-.91 3.32-.78.57.02 2.17.23 3.19 1.73-.08.05-1.9 1.11-1.88 3.25zM14.98 6.4a4.51 4.51 0 0 0 1.03-3.35c-.99.04-2.2.66-2.92 1.51-.64.74-1.2 1.94-1.05 3.08 1.11.09 2.25-.57 2.94-1.24z"/></svg>`;if(provider==='google')return `<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.2c0-.7-.06-1.39-.18-2.05H12v3.9h5.25a4.5 4.5 0 0 1-1.96 2.97v2.47h3.18c1.86-1.7 2.88-4.18 2.88-7.29Z"/><path fill="#34A853" d="M12 21.8c2.65 0 4.88-.87 6.5-2.31l-3.18-2.47c-.88.59-2.01.93-3.32.93a5.87 5.87 0 0 1-5.51-4.07H3.22v2.55A9.83 9.83 0 0 0 12 21.8Z"/><path fill="#FBBC05" d="M6.49 13.88a5.97 5.97 0 0 1 0-3.76V7.57H3.22a9.81 9.81 0 0 0 0 8.86l3.27-2.55Z"/><path fill="#EA4335" d="M12 6.05c1.44 0 2.73.5 3.74 1.46l2.81-2.81A9.48 9.48 0 0 0 12 2.2a9.83 9.83 0 0 0-8.78 5.37l3.27 2.55A5.87 5.87 0 0 1 12 6.05Z"/></svg>`;return `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="9" fill="#1877F2"/><path d="M13 20v-7h2.2l.3-2.5H13V9c0-.72.2-1.2 1.3-1.2h1.3V5.6a18 18 0 0 0-1.8-.1C11.8 5.5 11 6.7 11 8.8v1.7H9v2.5h2V20z" fill="white"/></svg>`;}

authPage = function () {
  const signup = UI.authTab === 'signup';
  const forgot = UI.authTab === 'forgot';

  // หน้าลืมรหัสผ่าน
  if (forgot) {
    return `
      <div class="auth-screen">

        <button class="circle-btn" type="button"
          aria-label="ย้อนกลับ"
          onclick="App.authTab('login')">
          ${ic('back')}
        </button>

        <div class="auth-brand">
          <img src="logo.png" alt="โลโก้ CHILL N’ KNOCK">
          <b>CHILL N’<br>KNOCK</b>
        </div>

        <h1>ลืมรหัสผ่าน?</h1>

        <p class="auth-note">
          กรอกอีเมลที่ใช้สมัครบัญชี
          เพื่อขอรีเซ็ตรหัสผ่าน
        </p>

        <form onsubmit="App.requestPasswordReset(event)">

          <label class="field-label" for="reset-email">
            อีเมล *
          </label>

          <input
            id="reset-email"
            class="field"
            type="email"
            autocomplete="email"
            required
            placeholder="example@email.com">

          <button class="btn full" type="submit">
            ดำเนินการต่อ ${ic('arrow', 16)}
          </button>

        </form>

        <p class="auth-reset-note">
          เวอร์ชันทดสอบยังไม่สามารถส่งอีเมล
          รีเซ็ตรหัสผ่านได้จริง
        </p>

        <button class="btn full outline"
          type="button"
          onclick="App.authTab('login')">
          กลับไปเข้าสู่ระบบ
        </button>

      </div>
    `;
  }

  // หน้า Login และ Signup เดิม
  return `
    <div class="auth-screen">

      <button class="circle-btn"
        type="button"
        aria-label="ย้อนกลับ"
        onclick="App.back()">
        ${ic('back')}
      </button>

      <div class="auth-brand">
        <img src="logo.png" alt="โลโก้ CHILL N’ KNOCK">
        <b>CHILL N’<br>KNOCK</b>
      </div>

      <h1>
        ${signup ? 'สมัครสมาชิก' : 'เข้าสู่ระบบเพื่อจอง'}
      </h1>

      <p class="auth-note">
        ${signup
          ? 'สร้างบัญชีเพื่อจัดการค่ำคืนของคุณ'
          : 'จองโต๊ะ ขอความช่วยเหลือจาก Runner และปลดล็อกทุกฟีเจอร์ของ CHILL N’ KNOCK'
        }
      </p>

      <div class="auth-tabs">
        <button type="button"
          class="${!signup ? 'on' : ''}"
          onclick="App.authTab('login')">
          เข้าสู่ระบบ
        </button>

        <button type="button"
          class="${signup ? 'on' : ''}"
          onclick="App.authTab('signup')">
          สมัครสมาชิก
        </button>
      </div>

      <form onsubmit="App.submitAuth(event)">

        ${signup ? `
          <label class="field-label" for="auth-name">
            ชื่อที่แสดง *
          </label>

          <input
            class="field"
            id="auth-name"
            required
            autocomplete="name"
            placeholder="ชื่อของคุณ">
        ` : ''}

        <label class="field-label" for="auth-email">
          อีเมล *
        </label>

        <input
          type="email"
          class="field"
          id="auth-email"
          required
          autocomplete="email"
          placeholder="example@email.com">

        <label class="field-label" for="auth-pass">
          รหัสผ่าน *
        </label>

        <div class="auth-password-wrap">

          <input
            type="password"
            minlength="6"
            class="field"
            id="auth-pass"
            required
            autocomplete="${signup ? 'new-password' : 'current-password'}"
            placeholder="อย่างน้อย 6 ตัวอักษร">

          <button
            type="button"
            class="auth-password-eye"
            aria-label="แสดงรหัสผ่าน"
            aria-pressed="false"
            aria-controls="auth-pass"
            onclick="App.toggleAuthPassword(this)">

            <svg viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true">

              <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/>
              <circle cx="12" cy="12" r="3"/>
              <path class="auth-eye-slash" d="M4 4l16 16"/>
            </svg>

          </button>

        </div>

        ${!signup ? `
          <div class="auth-forgot-row">
            <button type="button"
              onclick="App.authTab('forgot')">
              ลืมรหัสผ่าน?
            </button>
          </div>
        ` : ''}

        <button class="btn full" type="submit">
          ${signup ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
          ${ic('arrow', 16)}
        </button>

      </form>

      <div class="auth-social">

        <p>หรือทดลองเข้าสู่ระบบด้วย</p>

        <div class="row">
          ${['apple', 'google', 'facebook'].map(id => `
            <button
              class="social-btn"
              type="button"
              aria-label="ทดลองเข้าสู่ระบบด้วย ${id}"
              onclick="App.demoSocial('${id}')">
              ${providerIcon(id)}
            </button>
          `).join('')}
        </div>

      </div>

      <button class="btn full outline"
        onclick="App.authTab('${signup ? 'login' : 'signup'}')">
        ${signup
          ? 'มีบัญชีแล้ว? เข้าสู่ระบบ'
          : 'ยังไม่มีบัญชี? สมัครสมาชิก'
        }
      </button>

      <button class="partner-entry"
        onclick="App.go('partner-choice')">
        ${ic('briefcase')}
        สำหรับ Runner / ร้านพาร์ตเนอร์
        ${ic('arrow')}
      </button>

      <p class="footer-small">
        บัญชีและการเข้าสู่ระบบผ่านโซเชียล
        ในเวอร์ชันนี้เป็นการทดลองในเบราว์เซอร์
        ไม่ใช่การยืนยันตัวตนจริง
      </p>

    </div>
  `;
};
// Role-based profile rather than unrestricted switch experience.

profile = function () {
  const role = UI.role || 'user';
  const auth = !!DB.account;

  const name = auth
    ? (DB.name || DB.account?.name || 'สมาชิก')
    : 'ผู้เยี่ยมชม';

  const apps = DB.applications || {};
  const canRunner = QA || apps.runner?.status === 'approved';
  const canVenue = QA || apps.venue?.status === 'approved';

  // เมนูแบบแถวแนวตั้งเหมือน Profile ลูกค้า
  const rows = items => items.map(([icon, label, action]) => `
    <button class="menu-row" onclick="${action}">
      ${ic(icon, 18)}
      <span>${e(label)}</span>
      <span class="right-arrow">${ic('chevron', 16)}</span>
    </button>
  `).join('');

  // ส่วนหัวโปรไฟล์ ใช้ดีไซน์เดิม
  const hero = (eyebrow, heading, subtitle, letter) => `
    <div class="profile-hero">
      <div class="row">
        <div class="avatar">${e(letter)}</div>
        <div>
          <div class="eyebrow">${eyebrow}</div>
          <h2 style="margin:6px 0 3px">${e(heading)}</h2>
          <p class="hint" style="margin:0">${e(subtitle)}</p>
        </div>
      </div>
    </div>
  `;

  const settings = (kind) => rows([
    [
      'user',
      kind === 'venue' ? 'แก้ไขชื่อผู้ดูแลร้าน' : 'แก้ไขชื่อ',
      "App.profileAction('name')"
    ],
    ['bell', 'การแจ้งเตือน', "App.profileAction('notifications')"],
    ['help', 'ศูนย์ช่วยเหลือ', "App.profileAction('help')"],
    ['shield', 'ข้อมูลและความเป็นส่วนตัว', "App.profileAction('about')"]
  ]);

  // สลับบทบาทผ่านเมนูย่อย ไม่โชว์พื้นที่ทำงานบน Profile ลูกค้า
  
  // แยกพื้นที่โปรไฟล์ตามบทบาท
  // ไม่แสดงเมนูสลับไปยังบทบาทอื่น
  const switcher = '';


  const signOut = (auth || role === 'runner') ? `
    <button class="menu-row" onclick="App.signOut()">
      ${ic('arrow',18)}
      <span>ออกจากระบบ</span>
      <span class="right-arrow">${ic('chevron',16)}</span>
    </button>
  ` : '';

  // ===========================
  // PROFILE — TABLE RUNNER
  // ===========================
  if (role === 'runner') {
    return `
      <div class="screen">
        ${brandHeader()}

        ${hero(
          'TABLE RUNNER',
          name,
          canRunner
            ? 'บัญชี Runner · อนุมัติทดลอง'
            : 'บัญชี Runner · รอตรวจสอบ',
          (name || 'R').slice(0,1).toUpperCase()
        )}

        <div class="pad">
          <div class="section">
            <h2 class="body-title">งานของฉัน</h2>

            ${rows([
              ['briefcase', 'งานใหม่ที่เปิดรับ', "App.go('jobs')"],
              ['clock', 'งานที่กำลังดำเนินการ', "App.go('active')"],
              ['wallet', 'ประวัติรายได้', "App.go('wallet')"]
            ])}
          </div>

          <div class="section">
            <h2 class="body-title">การตั้งค่าบัญชี Runner</h2>
            ${settings('runner')}
            ${switcher}
            ${signOut}
          </div>
        </div>
      </div>
    `;
  }

  // ===========================
  // PROFILE — VENUE PARTNER
  // ===========================
  if (role === 'venue') {
    const venue = V(DB.merchantVenue);

    return `
      <div class="screen">
        ${brandHeader()}

        ${hero(
          'VENUE PARTNER',
          venue.name,
          canVenue
            ? 'ร้านพาร์ตเนอร์ · เปิดใช้งานทดลอง'
            : 'ร้านพาร์ตเนอร์ · รอตรวจสอบ',
          (venue.name || 'V').slice(0,1).toUpperCase()
        )}

        <div class="pad">
          <div class="section">
            <h2 class="body-title">จัดการร้าน</h2>

            ${rows([
              ['calendar', 'คำขอจองโต๊ะ',
                "App.go('venue-requests')"],
              ['users', 'การจัดการคิว',
                "App.go('venue-queue')"],
              ['shield', 'นโยบายและบริการของร้าน',
                "App.go('venue-policies')"],
              ['chart', 'ภาพรวมการดำเนินงาน',
                "App.go('venue-insights')"]
            ])}
          </div>

          <div class="section">
            <h2 class="body-title">การตั้งค่าบัญชีร้าน</h2>
            ${settings('venue')}
            ${switcher}
            ${signOut}
          </div>
        </div>
      </div>
    `;
  }

  // ===========================
  // PROFILE — USER
  // ===========================
  return `
    <div class="screen">
      ${brandHeader()}

      ${hero(
        'MY ACCOUNT',
        'สวัสดี, ' + name,
        auth
          ? 'บัญชีสมาชิก'
          : 'เข้าชมร้านได้โดยไม่ต้องสมัครสมาชิก',
        (name || 'G').slice(0,1).toUpperCase()
      )}

      <div class="pad">
        <div class="section">
          ${auth ? `
            <div class="subtle-card">
              <b>${e(DB.account.email)}</b>
              <p class="hint">
                ลงชื่อเข้าใช้ในเบราว์เซอร์นี้แล้ว
              </p>
            </div>
          ` : `
            <button class="btn full" onclick="App.auth('profile')">
              เข้าสู่ระบบ / สมัครสมาชิก
            </button>
          `}
        </div>

        <div class="section">
          <h2 class="body-title">บัญชีและการตั้งค่า</h2>

          ${rows([
            ['heart', 'ร้านที่บันทึก',
              "App.profileAction('saved')"],
            ['bell', 'การแจ้งเตือน',
              "App.profileAction('notifications')"],
            ['user', 'แก้ไขชื่อ',
              "App.profileAction('name')"],
            ['help', 'ศูนย์ช่วยเหลือ',
              "App.profileAction('help')"],
            ['shield', 'ข้อมูลและความเป็นส่วนตัว',
              "App.profileAction('about')"]
          ])}

          ${switcher}
          ${signOut}
        </div>

        ${demoFooter()}
      </div>
    </div>
  `;
};
App.signOut=function(){DB.account=null;DB.sessionEmail=null;DB.name='Guest';UI.role='user';save();UI.screen='profile';render();toast('ออกจากบัญชีทดลองแล้ว');};
App.toggleLang=function(){DB.lang=DB.lang==='th'?'en':'th';save();render(true);toast(DB.lang==='th'?'ภาษาไทยเป็นภาษาเริ่มต้น':'English mode (some research content remains Thai)');};

// Queue estimate and cancel rules are surfaced before a status change, not a fake cash refund.
App.askCancel=function(id){UI.modalReq=id;const r=requestById(id);if(!r)return;UI.modal='cancel';render(true);};
const oldModal=modal;
modal=function(){if(UI.modal!=='cancel')return oldModal();const r=requestById(UI.modalReq);if(!r)return '';return `<div class="overlay" role="dialog" aria-modal="true" onclick="if(event.target===this)App.closeModal()"><div class="sheet"><div class="sheet-heading"><h2>ยกเลิกคำขอ</h2><button class="close" onclick="App.closeModal()">×</button></div><p class="modal-text">คำขอ ${e(r.id)} · ${e(V(r.venue).name)}</p><div class="notice-card"><b>เงินที่ชำระจริง: ฿0</b><p>เวอร์ชันนี้ไม่มีธุรกรรมจริง จึงไม่มีรายการโอนคืนเงินหรือหักเงิน</p></div><details class="deposit-details" open><summary>ตัวอย่างเงื่อนไข Cancel / Refund</summary><p>ควรแจ้งรายละเอียดเงินประกัน ค่าบริการและช่วงเวลาที่อาจมีค่าธรรมเนียม ก่อนผู้ใช้ยืนยันจ่ายจริง การกำหนดอัตราและการคืนเงินต้องได้รับการตกลงจากร้านและสอดคล้องกับกฎหมาย</p></details><div class="row"><button class="btn ghost grow" onclick="App.closeModal()">กลับ</button><button class="btn danger grow" onclick="App.cancelConfirmed()">ยกเลิกคำขอทดลอง</button></div></div></div>`;};

// Add a safe account check for applications, without collecting KYC documents in localStorage.
const oldStartApply=App.startApply;
App.startApply = function(role) {
  if (role !== 'runner' && role !== 'venue') return;
  UI.pendingApply = null;
  oldStartApply(role);
};
const oldNextApply=App.nextApply;
App.nextApply=function(ev){oldNextApply(ev);};
// Social login icons show a clearly disabled integration, never an impression of active OAuth.

/* เปิด–ปิดการมองเห็นรหัสผ่าน */

App.toggleAuthPassword = function(button) {
  const field = document.getElementById('auth-pass');

  if (!field) return;

  const visible = field.type === 'password';

  field.type = visible ? 'text' : 'password';

  button.setAttribute(
    'aria-pressed',
    String(visible)
  );

  button.setAttribute(
    'aria-label',
    visible ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'
  );
};


/* ลืมรหัสผ่าน — แจ้งข้อจำกัดของระบบทดลอง */

App.requestPasswordReset = function(event) {
  event.preventDefault();

  toast(
    'ยังไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้ในเวอร์ชันทดสอบ ต้องเชื่อมระบบยืนยันตัวตนจริงก่อน'
  );
};


/* Social Login — จำลองบัญชีสำหรับทดสอบ Flow */

App.demoSocial = function(provider) {
  const names = {
    apple: 'Apple',
    google: 'Google',
    facebook: 'Facebook'
  };

  if (!Object.hasOwn(names, provider)) return;

  // บัญชีจำลอง ไม่ใช่บัญชีที่ยืนยันโดยผู้ให้บริการ
  const email = `demo-${provider}@cnk.invalid`;

  DB.account = {
    email: email,
    name: 'สมาชิกทดลอง'
  };

  DB.sessionEmail = email;
  DB.name = 'สมาชิกทดลอง';

  UI.role = 'user';
  UI.screen = 'home';
  UI.stack = [];
  UI.returnTo = null;

  save();
  render();

  toast(
    `เข้าสู่ Home ด้วยบัญชีทดลอง ${names[provider]} (ยังไม่เชื่อมบัญชีจริง)`
  );
};

// Extra UI improvements: take users directly to one of the four methods, not an unrelated new flow.
App.openMap=function(id){let v=V(id);window.open('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(v.place.includes('รอยืนยัน')?v.name+' กรุงเทพฯ':v.place),'_blank','noopener');};

// Apply app-core+improvements once initial state is ready.
UI.screen=location.hash.startsWith('#venue-') ? 'venue' : 'welcome';
// Fix an old unclosed visual wrapper: mount persistent chrome at the phone root.
const renderBeforeChrome=render;
render=function(preserve=false){
  renderBeforeChrome(preserve);
  const phone=document.querySelector('#app .phone');
  if(!phone)return;
  for(const selector of ['.floating-cta','.bottom-nav','.overlay']){
    for(const el of [...phone.querySelectorAll(selector)]){
      if(el.parentElement!==phone)phone.appendChild(el);
    }
  }
};

// The original header's switch-role button was for unrestricted demo access.

brandHeader = function () {
  const isUserHome = UI.role === 'user' && UI.screen === 'home';

  const pageTitles = {
    discover: 'ค้นหาร้าน',
    events: 'อีเวนต์',
    activity: 'คืนของฉัน',
    profile: 'โปรไฟล์',
    home: UI.role === 'runner' ? 'งานของ Runner' : 'จัดการร้าน'
  };

  const leftSide = isUserHome
    ? `<div class="brand-row">
         <img src="logo.png" alt="CHILL N’ KNOCK" class="brand-logo" style="width:50px;height:50px;flex:0 0 50px">
         <div>
           <div class="brand-name">CHILL N’<br>KNOCK</div>
           <div class="location-label">
             ${ic('pin',11)} BANGKOK
             <span style="color:#DC7095">●</span>
             ${QA ? 'QA' : 'NIGHTLIFE'}
           </div>
         </div>
       </div>`
    : `<strong class="page-top-title">${e(pageTitles[UI.screen] || 'เมนู')}</strong>`;

  return `<header class="top safe-top">
    ${leftSide}
    <div class="header-actions">
      <button class="circle-btn"
        onclick="App.openModal('notifications')"
        aria-label="การแจ้งเตือน">
        ${ic('bell',18)}
        ${DB.notifications.length ? '<i class="dot"></i>' : ''}
      </button>

      <button class="circle-btn"
        onclick="App.go('profile')"
        aria-label="โปรไฟล์">
        ${ic('user',18)}
      </button>
    </div>
  </header>`;
};
title=function(name,sub=''){return `<header class="back-header"><button class="circle-btn" aria-label="ย้อนกลับ" onclick="App.back()">${ic('back')}</button><div class="grow"><h1>${e(name)}</h1>${sub?`<small>${e(sub)}</small>`:''}</div></header>`;};
demoFooter=function(){return `<p class="footer-small">CHILL N’ KNOCK · UX TEST RELEASE<br>รายละเอียดร้านอ้างอิงข้อมูลสาธารณะ แต่การจอง คิว ราคา ผู้รับงาน และธุรกรรมยังไม่เชื่อมต่อระบบจริง</p>`;};
// Fake sample events have been made explicit and tied to an existing listed venue.
events.splice(0,events.length,
  {
    id:'e4',name:'SEK LOSO LIVE',subtitle:'New Date · 8 NOV',venue:'mil',
    date:'2026-11-08',time:'21:00',endTime:'Late',price:null,status:'rescheduled',
    art:'poster-bg4',label:'Live Concert / Rock',tag:'8 พ.ย. · วันใหม่',
    lineup:['SEK LOSO'],lineupNote:'รายชื่อศิลปินตามโปสเตอร์วันจัดใหม่',
    desc:'SEK LOSO LIVE ที่ MIL SOCIAL CLUB โปสเตอร์ระบุ “POSTPONED” พร้อม “08.11 NEW DATE” หมายถึงประกาศวันแสดงใหม่เป็นวันอาทิตย์ที่ 8 พฤศจิกายน 2026 เวลา 21:00 น. โปรดตรวจสอบอีกครั้งกับร้านก่อนเดินทาง',
    ticketInfo:'โปสเตอร์แจ้งวันใหม่ 8 พ.ย. 2026 แต่ยังไม่มีราคาบัตรที่ยืนยัน จึงไม่เปิดตัวอย่างราคาบัตร'
  },
  {
    id:'e1',name:'INQUISITIVE',subtitle:'ONYX Bangkok Presents',venue:'onyx',
    date:'2026-11-14',time:'22:00',endTime:'04:00',price:600,
    art:'poster-bg1',label:'Hard Dance / EDM',tag:'14 พ.ย.',
    lineup:['INQUISITIVE'],lineupNote:'ศิลปินหลักตามประกาศ ONYX',
    desc:'ONYX BANGKOK PRESENTS: INQUISITIVE ดีเจจากสิงคโปร์ ผู้โดดเด่นด้าน Asian Hard Dance และรีมิกซ์ K-Pop, C-Pop รวมถึงเพลงฮิตระดับโลก พบกันวันเสาร์ที่ 14 พฤศจิกายน 2026 ณ ONYX RCA',
    ticketInfo:'ค่าเข้าหน้างาน 600 บาท รวมเครื่องดื่มมาตรฐาน 1 แก้ว; การจองโต๊ะ VIP ติดต่อร้านหรือช่องทางที่ร้านประกาศ',
    ticketTiers:[{id:'door',name:'บัตรหน้างาน',price:600,info:['รวมเครื่องดื่มมาตรฐาน 1 แก้ว','จำหน่ายหน้างานจริง; บัตรในแอปเป็นตัวอย่างเท่านั้น']}]
  },
  {
    id:'e2',name:'THROWBACK 90s: SEK LOSO',subtitle:'SEK LOSO LIVE',venue:'what',
    date:'2026-11-15',time:'20:00',endTime:'Late',price:750,
    art:'poster-bg2',label:'Live Concert / 90s',tag:'15 พ.ย.',
    lineup:['SEK LOSO'],lineupNote:'ศิลปินหลักตามโปสเตอร์',
    desc:'Throwback 90s กับ SEK LOSO ที่ WHAT’S HAPPENED วันอาทิตย์ที่ 15 พฤศจิกายน 2026 ณ EM WONDER ชั้น 5 EMSPHERE พบบรรยากาศเพลงร็อกไทยยุค 90s',
    ticketInfo:'ราคาตามโปสเตอร์: Early Bird 750 บาท / Pre-Sale 850 บาท / Walk-in 950 บาท; โปรดตรวจสอบสิทธิ์และรอบขายล่าสุดกับร้าน',
    ticketTiers:[
      {id:'early',name:'Early Bird (อ้างอิง)',price:750,info:['ราคาตามโปสเตอร์','จำนวนและสถานะจำหน่ายต้องยืนยันกับร้าน']},
      {id:'presale',name:'Pre-Sale (อ้างอิง)',price:850,info:['ราคาตามโปสเตอร์','โปรดตรวจสอบสถานะจำหน่าย']},
      {id:'walkin',name:'Walk-in (อ้างอิง)',price:950,info:['ราคาหน้างานตามโปสเตอร์','ขึ้นอยู่กับจำนวนบัตรคงเหลือ']}
    ]
  },
  {
    id:'e3',name:'BOWKYLION LIVE',subtitle:'Tic Tac Toe · Special Guest',venue:'tic',
    date:'2026-11-18',time:'19:00',endTime:'Late',timeNote:'เปิดร้าน 19:00 น.',price:null,
    art:'poster-bg3',label:'Live Acoustic / Pop',tag:'18 พ.ย.',
    lineup:['BOWKYLION','DHONNAHS'],lineupNote:'ศิลปินพิเศษ และ Live Acoustic ตามโปสเตอร์; เวลาแสดงต้องยืนยัน',
    desc:'Special Guest BOWKYLION ที่ Tic Tac Toe (EM WONDER ชั้น 5, EMSPHERE) วันพุธที่ 18 พฤศจิกายน 2026 โปสเตอร์ระบุเปิดร้าน 19:00 น. และมี Live Acoustic โดย DHONNAHS; ยังไม่ยืนยันเวลาที่ BOWKYLION ขึ้นแสดง',
    ticketInfo:'ยังไม่มีราคาบัตรและเวลาแสดงศิลปินที่ยืนยันได้ จึงไม่แสดงราคาคาดเดา'
  }
);

// Only show bookings created by the signed-in browser account.
activity=function(){const mine=DB.account?DB.requests.filter(r=>r.owner===DB.account.email):[];return `<div class="screen">${brandHeader()}<div class="pad discovery-header"><div class="eyebrow">MY NIGHTS</div><h1>คืนของ<br><span class="accent">ฉัน</span></h1>${myExtras()}<div class="chips" style="margin:20px 0"><button class="chip ${UI.tab==='requests'?'active':''}" onclick="App.setActivityTab('requests')">การจอง</button><button class="chip ${UI.tab==='tickets'?'active':''}" onclick="App.setActivityTab('tickets')">บัตรอีเวนต์</button><button class="chip ${UI.tab==='saved'?'active':''}" onclick="App.setActivityTab('saved')">ร้านที่บันทึก</button></div>${UI.tab==='requests'?(mine.length?mine.slice().reverse().map(requestCard).join(''):`<div class="empty"><h3>ยังไม่มีการจอง</h3><p>ค้นหาร้านที่ชอบแล้วเริ่มส่งคำขอได้เลย</p><button class="btn smallbtn" onclick="App.go('discover')">ค้นหาร้าน ${ic('arrow',15)}</button></div>`):UI.tab==='tickets'?(DB.tickets.length?DB.tickets.map(t=>`<button class="request-card" style="width:100%;text-align:left" onclick="App.openTicket('${t.id}')"><b>ตั๋วตัวอย่าง ${e(E(t.event).name)}</b><p class="hint">บัตรนี้ใช้เข้าร้านจริงไม่ได้ · ${e(t.id)}</p></button>`).join(''):`<div class="empty">ยังไม่มีบัตรอีเวนต์ตัวอย่าง</div>`):(DB.favs.length?venues.filter(v=>DB.favs.includes(v.id)).map(wideVenue).join(''):'<div class="empty">ยังไม่มีร้านที่บันทึก</div>')}${demoFooter()}</div></div>`;};

// Keep original browsing card geometry. Make estimated queue explicit in booking only.
const originalCurrentMain=currentMain;
// Custom bottom-sheet on registration selects — no browser-native oversized option list.
let selectPicker=null;
function closeSelectPicker(){document.getElementById('cnk-select-sheet')?.remove();selectPicker=null;}
function openSelectPicker(select){
  closeSelectPicker();if(!select)return;
  selectPicker=select;
  const label=select.closest('form')?.querySelector(`label[for="${select.id}"]`)?.textContent||select.previousElementSibling?.textContent||'เลือกข้อมูล';
  const sheet=document.createElement('div');sheet.id='cnk-select-sheet';sheet.className='select-overlay';sheet.innerHTML=`<div class="select-dialog" role="dialog" aria-modal="true" aria-label="${e(label)}"><div class="select-handle"></div><div class="spread"><b>${e(label.trim())}</b><button type="button" class="circle-btn" id="select-close">×</button></div><div class="select-options">${[...select.options].filter(x=>x.value!=='').map(x=>`<button type="button" data-choice="${e(x.value)}" class="${x.value===select.value?'selected':''}">${e(x.textContent)} ${x.value===select.value?'✓':''}</button>`).join('')}</div></div>`;
  const phone=document.querySelector('.phone')||document.body;phone.appendChild(sheet);
  sheet.addEventListener('click',event=>{if(event.target===sheet||event.target.closest('#select-close')){closeSelectPicker();return;}let btn=event.target.closest('[data-choice]');if(btn&&selectPicker){selectPicker.value=btn.dataset.choice;selectPicker.dispatchEvent(new Event('change',{bubbles:true}));closeSelectPicker();}});
}
document.addEventListener('click',event=>{const target=event.target.closest('select.field');if(!target||target.id==='managedVenue'||target.closest('.select-overlay'))return;event.preventDefault();event.stopPropagation();openSelectPicker(target);},true);
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSelectPicker();});
render();

// Remaining workspace wording: Thai first, while keeping short brand slogans.
Object.assign(translatePairs,{
 'Jobs':'งาน','Active':'งานของฉัน','Wallet':'รายได้','Bookings':'คำขอจอง','Queue':'จัดการคิว','Policies':'นโยบายร้าน',
 'PARTY CALENDAR':'ปฏิทินอีเวนต์','WHAT’S':'อีเวนต์','ON TONIGHT?':'คืนนี้มีอะไร?','UPCOMING EVENTS':'อีเวนต์ตัวอย่าง',
 'Curated event concepts, illustrated ticket flow. Dates and prices are demo-only.':'ตัวอย่างหน้ารวมอีเวนต์ ไม่ใช่กำหนดการจริงของร้าน',
 'LIVE-LIKE DEMO TRACKING':'ติดตามคำขอในต้นแบบ','STATUS TIMELINE':'ลำดับสถานะ','Status notes':'หมายเหตุสถานะ',
 'No new updates. Switch roles to test the end-to-end experience.':'ยังไม่มีความคืบหน้าใหม่ ในโหมด QA สามารถสลับบทบาทเพื่อทดสอบ flow ได้',
 'MESSAGES':'แชต','Cancel':'ยกเลิก','LIVE MUSIC':'ดนตรีสด',
 'Available opportunities':'รายการงานที่เปิดรับ','Table Runner · Demo job board':'งาน Runner · สำหรับทดสอบ',
 'NEW REQUESTS':'คำขอใหม่','PICK YOUR':'เลือกงานที่','NEXT MOVE.':'ต้องการรับ',
 'Review all details and venue permission before accepting.':'ตรวจข้อมูลและข้ออนุญาตของร้านก่อนรับงาน',
 'All caught up':'ไม่มีงานรอรับ','Nothing open in this demo. Try submitting a new guest request.':'ยังไม่มีคำขอใหม่ ลองส่งคำขอจากฝั่งลูกค้า',
 'Your active work':'งานที่รับแล้ว','Runner · Job tracking':'ติดตามงาน Runner',
 'MANAGE REQUESTS':'จัดการคำขอ','ON THE':'งานที่','MOVE.':'ดำเนินการ',
 'No active jobs':'ยังไม่มีงานที่รับ','Accept a job from the demo board to start a workflow.':'เลือกงานจากรายการเพื่อเริ่มขั้นตอนการทำงาน',
 'View available jobs':'ดูงานที่รับได้',
 'Example earnings':'สรุปรายได้จำลอง','Runner · No real payouts':'ไม่มีการจ่ายเงินจริง','ILLUSTRATIVE ONLY':'ตัวอย่างข้อมูลเท่านั้น',
 'MOMENTUM.':'ของฉัน','COMPLETED DEMO SERVICE VALUES':'มูลค่างานจำลองที่เสร็จสิ้น','No funds were collected or transferred.':'ไม่มีการรับหรือโอนเงินจริง',
 'Verified jobs':'งานที่ตรวจสอบแล้ว','Accepted jobs':'งานที่รับแล้ว','Real payouts':'จ่ายเงินจริง',
 'STATUS BREAKDOWN':'สรุปสถานะ','COMPLETION HISTORY':'ประวัติงานเสร็จ','Nothing completed yet':'ยังไม่มีงานที่เสร็จ',
 'Booking requests':'คำขอจองโต๊ะ','Queue management':'จัดการคิว','Service policies':'นโยบายการให้บริการ',
 'Venue partner / prototype switches':'การตั้งค่าสำหรับทดลอง','Venue insights':'สรุปข้อมูลร้าน','Illustrative dashboard':'ข้อมูลตัวอย่าง',
 'VENUE DECISIONS · DEMO':'การตัดสินใจของร้าน · QA','BOOKING':'การ','CONTROL.':'จอง','QUEUE':'จัดการ','SET YOUR RULES':'ตั้งค่านโยบายร้าน',
 'YOUR VENUE.':'ร้านของคุณ','YOUR TERMS.':'เงื่อนไขของคุณ','THE NIGHT.':'จัดการ','YOUR CALL.':'ร้านของคุณ',
 'IN YOUR INBOX':'คำขอเข้ามา','ACTION REQUIRED':'สิ่งที่ต้องจัดการ','VIEW SAMPLE INSIGHTS':'ดูข้อมูลสรุป',
 'All clear':'ไม่มีงานค้าง','Incoming booking and queue requests for this sample venue appear here.':'คำขอของร้านจะแสดงในส่วนนี้',
 'The merchant is responsible for approving booking and queue permissions. A toggle in this prototype is not evidence of a real venue agreement.':'ร้านเป็นผู้ตัดสินใจเรื่องจองโต๊ะและคิว การสลับนโยบายใน QA ไม่ใช่หลักฐานอนุญาตจากร้านจริง',
 'Approval is an explicit action. Runner progress alone is insufficient.':'ร้านต้องกดยืนยันเอง ความคืบหน้าจาก Runner ไม่ใช่การอนุมัติของร้าน',
 'awaiting review':'รอตรวจสอบ','total':'ทั้งหมด','No booking requests':'ยังไม่มีคำขอจองโต๊ะ',
 'No queue requests':'ยังไม่มีคำขอคิว','Switch to Guest Mode to create one, then return here.':'สร้างคำขอจากฝั่งลูกค้าใน QA แล้วกลับมาตรวจสอบ',
 'Allow direct table requests':'อนุญาตคำขอจองตรง','Guest can send a request for venue approval.':'ลูกค้าส่งคำขอให้ร้านตรวจสอบได้',
 'Allow advance Runner assistance':'อนุญาตให้ Runner ช่วยจองล่วงหน้า','Runner may help contact the venue about table requests.':'Runner สามารถช่วยติดต่อร้านตามข้อตกลงได้',
 'Allow walk-in queue assistance':'อนุญาตให้ Runner ต่อคิวแทน','Runner may assist in a queue subject to real venue approval.':'ต้องได้รับอนุญาตจากร้านจริงก่อนให้ Runner ต่อคิว',
 'These switches affect only the demo interface. They do not constitute real operating permission from any venue.':'การเปลี่ยนนโยบายนี้มีผลเฉพาะต้นแบบ ไม่ใช่การอนุญาตจากร้านจริง',
 'VIEW INCOMING REQUESTS':'ดูคำขอที่เข้ามา',
 'YOUR NIGHT AT A GLANCE':'ภาพรวมร้าน','THE NIGHT':'ข้อมูล','IN NUMBERS.':'ในตัวเลข',
 'Requests':'คำขอทั้งหมด','Confirmed':'ยืนยันแล้ว','Queue reviewed':'ตรวจสอบคิวแล้ว',
 'Sample weekly activity':'กิจกรรมรายสัปดาห์ตัวอย่าง','Illustration':'ภาพจำลอง',
 'Chart values are illustrative, not analytics generated from real venue activity.':'กราฟเป็นข้อมูลตัวอย่าง ไม่ใช่ยอดจริงของร้าน',
 'OPERATIONAL CONSIDERATIONS':'สิ่งที่ต้องติดตาม','WHAT TO MONITOR':'ตัวชี้วัดที่สำคัญ',
 'Review no-show rates, response time, queue permissions, runner proof quality and cancellations before setting real service fees.':'ควรดูอัตราไม่มาตามนัด ระยะเวลาตอบรับ การอนุญาตต่อคิว หลักฐาน Runner และอัตรายกเลิกก่อนกำหนดค่าบริการจริง',
 'EXAMPLE SERVICE FEES · NOT EARNED':'ค่าตอบแทนตัวอย่าง · ยังไม่ได้รับจริง',
 'Illustrative value for completed demo requests. No actual payouts.':'จำนวนเงินจำลองจากงานที่เสร็จใน QA ไม่มีการจ่ายเงินจริง',
 'No open leads':'ไม่มีงานใหม่',
 'Make a booking request in Guest Mode and return here.':'ส่งคำขอจากฝั่งลูกค้าแล้วกลับมาที่นี่',
 'All jobs and earnings here are simulated. Runners must get venue permission before queue-related actions.':'งานและรายได้เป็นข้อมูลจำลอง บริการคิวต้องได้รับอนุญาตจากร้านก่อน',
 'Introducing Table Runner':'รู้จัก Table Runner',
 'How our two helper services are intended to work':'บริการช่วยจองและช่วยต่อคิว',
 '01 · Advance booking help':'01 · ช่วยจองโต๊ะล่วงหน้า',
 '02 · Walk-in queue help':'02 · ช่วยต่อคิว Walk-in',
 '03 · Clear responsibilities':'03 · แสดงเงื่อนไขให้ชัดเจน',
 'FIND A VENUE':'ค้นหาร้าน'
});
navItems=function(){if(UI.role==='runner') {return [['home','หน้าหลัก','home'],['active','งานของฉัน','clock'],['wallet','รายได้','wallet'],['profile','โปรไฟล์','user']];} if(UI.role==='venue') {return [['home','ภาพรวม','home'],['venue-requests','คำขอจอง','calendar'],['venue-policies','จัดการร้าน','shield'],['profile','โปรไฟล์','user']];} return [['home','หน้าหลัก','home'],['discover','ค้นหาร้าน','compass'],['events','อีเวนต์','ticket'],['activity','คืนของฉัน','calendar'],['profile','โปรไฟล์','user']];};

// Native select menus vary across browsers: replace them with in-app sheets on phones.
document.addEventListener('pointerdown',event=>{let s=event.target.closest('select.field');if(s&&s.id!=='managedVenue'){event.preventDefault();event.stopPropagation();openSelectPicker(s);}},true);

// If the team uploads licensed real photos at assets/venues/<id>.jpg, support those paths directly.
media=function(src,accent='#6C2F48'){
 const safe=typeof src==='string'&&/^assets\/venues\/[a-z0-9_-]+\.(?:jpg|jpeg|png|webp)$/i.test(src)?src:(localCovers[src]||'assets/club.jpg');
 return `background-image:linear-gradient(180deg,${accent}22 0%,#160B1128 38%,#170A17CC 100%),url('${safe}');background-size:cover;background-position:center`;
};
App.resetAll=function(){DB=getBase();DB.releaseVersion=20261104;DB.accounts={};DB.sessionEmail=null;DB.lang='th';DB.merchantVenue='onyx';for(const v of venues)DB.policies[v.id]={direct:true,runner:true,queue:true};UI.role='user';UI.screen='home';UI.stack=[];UI.modal='';UI.tab='requests';UI.venue='onyx';save();render();toast('รีเซ็ตข้อมูลทดลองในเบราว์เซอร์แล้ว');};
/* ============================================================
   CONTENT FIX v1.1 — minimal overrides for the approved baseline
   Detailed shop research is isolated in venue-research.js.
   ============================================================ */
const CNK_RES = window.CNK_RESEARCH || {};
const CNK_NUMBER = (value) => Number.isFinite(value) ? '฿' + value.toLocaleString('th-TH') : 'สอบถามร้าน';
const CNK_SAFE_URL = (value) => /^https:\/\/[a-z0-9.-]+(?:\/|$)/i.test(String(value||'')) ? String(value) : '';
const CNK_AREA_TH = {RCA:'RCA',Thonglor:'ทองหล่อ',Ekkamai:'เอกมัย',Sukhumvit:'สุขุมวิท',Ari:'อารีย์',Ratchayothin:'รัชโยธิน',Chatuchak:'จตุจักร',Langsuan:'หลังสวน',Sathorn:'สาทร'};

// Enrich the 18 pre-approved venue IDs. Do NOT merge VIRAL with Tichuca
// or the unconfirmed GUEST HOUSE logo with Guest House Kaset.
for (const v of venues) {
  const data = CNK_RES[v.id];
  if (!data) continue;
  v.research = data;
  v.image = data.cover;
  if (data.identity_status === 'research_match') {
    if (data.overview) v.desc = data.overview;
    if (data.address) v.place = data.address;
    v.budgetMin = Number.isFinite(data.price_per_person?.min) ? data.price_per_person.min : null;
    v.budgetMax = Number.isFinite(data.price_per_person?.max) ? data.price_per_person.max : null;
  } else {
    v.budgetMin = null;
    v.budgetMax = null;
    v.verified = false;
  }
}

// The first photo is the team-controlled per-venue file. If it has not
// been uploaded yet, the generic baseline mood photo remains visible.
media = function (src, accent='#6C2F48') {
  const isLocal = /^assets\/venues\/[a-z0-9_-]+\.(?:jpg|jpeg|png|webp)$/i.test(String(src||''));
  const cover = isLocal ? src : localCovers[src] || 'assets/club.jpg';
  const fallback = 'assets/club.jpg';
  const clean = c => /^#[a-f0-9]{6}$/i.test(c) ? c : '#6C2F48';
  return `background-image:linear-gradient(180deg,${clean(accent)}12 0%,#160B1120 40%,#170A17A8 100%),url('${cover}'),url('${fallback}');background-size:cover;background-position:center`;
};

// ----- RESEARCH: menu / review notes / gallery / overview -----
detailInfo = function (v) {
  const d = CNK_RES[v.id] || {};
  const uncertain = d.identity_status === 'unconfirmed';
  if (uncertain) {
    return `<div class="info-copy"><h3>ข้อมูลของร้าน</h3><p>${e(d.identity_note || 'ยังยืนยันตัวตนของร้านนี้ไม่ได้')}</p>
      <p class="hint">ยังไม่แสดงเมนู ราคา หรือรีวิวที่อาจเป็นข้อมูลของคนละร้าน</p></div>`;
  }
  if (UI.infoTab === 'menu') {
    const items = d.menu || [];
    const highlights = d.menu_highlights || [];
    return `<div class="info-copy"><h3>เมนูและแพ็กเกจ</h3>
      <p class="cnk-source-note">ข้อมูลจากเอกสารวิจัยของทีม ไม่ใช่เมนูสดจากร้าน · กรุณาตรวจสอบราคาอีกครั้ง</p>
      ${items.length ? items.map(m => `<div class="menu-item">
        <div><strong>${e(m.name)}</strong><small>${m.verified_in_team_file && m.source ? 'ระบุแหล่งในเอกสาร: '+e(m.source) : 'ยังไม่ยืนยันราคาปัจจุบัน'}${m.note ? ' · '+e(m.note) : ''}</small></div>
        <span class="menu-price">${Number.isFinite(m.price) ? CNK_NUMBER(m.price)+(m.verified_in_team_file?'':'*') : 'สอบถามร้าน'}</span>
      </div>`).join('') : '<p>ยังไม่มีรายการเมนูพร้อมราคาจากไฟล์วิจัย</p>'}
      ${highlights.length ? `<h3 class="cnk-subheading">เมนูที่ทีมรวบรวมไว้</h3><div class="tag-list">${highlights.map(x=>`<span class="pill outline">${e(x)}</span>`).join('')}</div>`:''}
      ${Number.isFinite(d.table_minimum) ? `<p class="cnk-source-note">ข้อมูลเงินขั้นต่ำโต๊ะจากเอกสารทีม: ${CNK_NUMBER(d.table_minimum)} (โปรดตรวจสอบเงื่อนไขกับร้าน)</p>`:''}
      ${cnkSourceLinks(d)}
      </div>`;
  }
  if (UI.infoTab === 'reviews') {
    const notes = d.review_notes || [];
    const extra = d.unverified_research_comments || [];
    const local = (DB.reviews || []).filter(r => r.venue === v.id);
    return `<div class="info-copy"><h3>รีวิวและความเห็นที่รวบรวม</h3>
      <p class="cnk-source-note">สรุปความคิดเห็นจากไฟล์วิจัยของทีม ไม่ใช่คะแนนหรือรีวิว Google Maps แบบเรียลไทม์</p>
      ${notes.map(n => `<div class="cnk-research-review"><p>${e(n.summary)}</p><small>ที่มาในเอกสาร: ${e(n.source || 'ไม่ระบุ')}</small></div>`).join('')}
      ${!notes.length && extra.length ? extra.slice(0,3).map(n=>`<div class="cnk-research-review"><p>${e(n)}</p><small>ความคิดเห็นจากไฟล์รวบรวมข้อมูล · ยังไม่ตรวจสอบผู้เขียนและแหล่งต้นทาง</small></div>`).join('') : ''}
      ${local.map(r=>`<div class="cnk-research-review"><p>${e(r.text || '')}</p><small>รีวิวทดสอบที่บันทึกในเบราว์เซอร์นี้</small></div>`).join('')}
      ${!notes.length&&!extra.length&&!local.length?'<div class="empty">ยังไม่มีข้อมูลรีวิวของร้านนี้</div>':''}
      ${cnkSourceLinks(d)}
      </div>`;
  }
  if (UI.infoTab === 'gallery') {
    const fallback = ['assets/club.jpg','assets/stage.jpg','assets/crowd.jpg'];
    return `<div class="info-copy"><h3>รูปภาพบรรยากาศร้าน</h3>
      <div class="cnk-photo-grid">${(d.gallery||[]).slice(0,2).map((src,i)=>`
        <div class="cnk-gallery-item"><img src="${e(src)}" alt="รูปภาพ ${e(v.name)} หมายเลข ${i+1}" loading="lazy"
          onerror="this.onerror=null;this.src='${fallback[i%fallback.length]}';this.parentNode.classList.add('is-placeholder')">
          <span>ภาพประกอบชั่วคราว</span>
        </div>`).join('')}</div></div>`;
  }
  const area = d.address || v.place || v.area;
  const budget = (Number.isFinite(v.budgetMin) && Number.isFinite(v.budgetMax))
      ? `${CNK_NUMBER(v.budgetMin)}–${CNK_NUMBER(v.budgetMax)} / คน` : 'ยังไม่มีข้อมูล';
  return `<div class="info-copy"><h3>เกี่ยวกับร้าน</h3><p>${e(d.overview || v.desc)}</p>
      ${d.atmosphere ? `<h3 class="cnk-subheading">บรรยากาศ</h3><p>${e(d.atmosphere)}</p>` : ''}
      <div class="tag-list">${v.tags.map(t=>`<span class="pill outline">${e(t)}</span>`).join('')}</div>
      <div class="line"></div><div class="spread cnk-venue-line"><div><b>ที่ตั้งร้าน</b><p class="hint">${e(area)}</p></div>
        <button class="btn smallbtn ghost" onclick="App.openMap('${v.id}')">${ic('map',15)} เปิดแผนที่</button></div>
      ${d.hours ? `<div class="cnk-research-meta"><b>เวลาเปิดที่บันทึกไว้</b><p>${e(d.hours)} · โปรดตรวจสอบอีกครั้ง</p></div>` : ''}
      <div class="cnk-research-meta"><b>งบต่อคน (จากรีวิว/ประมาณการ)</b><p>${budget}</p></div>
      <div class="line"></div><b>ข้อมูลและการจอง</b><p>ราคาจองโต๊ะ โต๊ะว่าง คิว และเงื่อนไข Runner ยังต้องให้ร้านยืนยันก่อน ไม่ใช่สถานะสด</p>
      ${cnkSourceLinks(d)}</div>`;
};
function cnkSourceLinks(d) {
  const valid=(d.source_urls||[]).map(CNK_SAFE_URL).filter(Boolean);
  return valid.length ? `<div class="cnk-research-sources"><b>แหล่งอ้างอิงที่ทีมบันทึก</b><div>${valid.map((u,i)=>`<a href="${e(u)}" rel="noopener noreferrer" target="_blank">เปิดแหล่งข้อมูล ${i+1} ${ic('external',12)}</a>`).join('')}</div></div>`:'';
}

// ----- EXPLORE: photo top, information below -----
function cnkExploreCard(v) {
  const hasInfo = CNK_RES[v.id]?.identity_status === 'research_match';
  const budget = Number.isFinite(v.budgetMin) ? `งบประมาณต่อคน ${CNK_NUMBER(v.budgetMin)}+` : 'สอบถามราคากับร้าน';
  const saved = DB.favs.includes(v.id);
  return `<article class="cnk-explore-card">
    <div class="cnk-explore-photo image" style="${media(v.image,v.accent)}">
      <button class="cnk-cover-link" aria-label="รายละเอียด ${e(v.name)}" onclick="App.openVenue('${v.id}')"></button>
      <button class="cnk-explore-heart ${saved?'is-saved':''}" aria-label="บันทึกร้าน ${e(v.name)}" onclick="App.toggleFav('${v.id}')">${ic('heart',21)}</button>
    </div>
    <div class="cnk-explore-info">
      <div class="cnk-explore-title-row"><strong>${e(v.name)}</strong>
        ${hasInfo ? '' : `<span class="cnk-explore-source pending">รอตรวจสอบร้าน</span>`}      </div>
      <div class="cnk-explore-meta">${ic('pin',15)} <span>${e(CNK_AREA_TH[v.area]||v.area)}</span></div>
      <div class="cnk-explore-meta">${ic('music',15)} <span>${e(v.genre)} · ${e(v.kind)}</span></div>
      <div class="cnk-explore-bottom"><span>${budget}<small>ข้อมูลประมาณการ ไม่ใช่ราคาโต๊ะ</small></span>
        <button onclick="App.openVenue('${v.id}')">รายละเอียด ${ic('chevron',14)}</button>
      </div>
    </div>
  </article>`;
}

// Data consistency: never use the estimates per customer as an entrance/
// booking fee. The budget filter is explicitly marked an *estimate*.
filteredVenues = function () {
  const q = UI.q.trim().toLocaleLowerCase();
  let found = venues.filter(v =>
    (UI.area === 'All' || v.area === UI.area) &&
    (UI.genre === 'All' || v.genre === UI.genre || v.tags.includes(UI.genre) || v.kind.includes(UI.genre)) &&
    (!q || [v.name,v.area,v.kind,v.genre,v.place,...v.tags,CNK_RES[v.id]?.overview||''].join(' ').toLocaleLowerCase().includes(q)) &&
    (!UI.filterPrice || (Number.isFinite(v.budgetMin) && v.budgetMin < UI.filterPrice))
  );
  if (UI.sort === 'Name') found.sort((a,b)=>a.name.localeCompare(b.name,'th'));
  if (UI.sort === 'Lowest sample price') found.sort((a,b)=>(a.budgetMin??Infinity)-(b.budgetMin??Infinity));
  // Historical research ratings are intentionally not ranked as Google live ratings.
  return found;
};
discoveryResults = function () {
  const found = filteredVenues();
  return `<div class="search-meta"><span>${found.length} ร้าน</span><span class="cnk-research-note">ข้อมูลจากเอกสารทีม</span></div>
    ${UI.sort==='Top rated'?'<p class="cnk-filter-warning">ยังไม่สามารถจัดเรียงตามคะแนนสดได้ กรุณาเชื่อม Google Places API ก่อน</p>':''}
    ${found.length?found.map(cnkExploreCard).join(''):
      `<div class="empty"><h3>ไม่พบร้านตามตัวกรอง</h3><p>ลองเปลี่ยนงบประมาณ ย่าน หรือแนวเพลง</p><button class="btn smallbtn" onclick="App.resetFilters()">ล้างตัวกรอง</button></div>`}`;
};

// Important: override only once; previously a later FIX 05 modal silently
// re-enabled disabled chips after FIX 06.
const cnkModalBase = modal;
modal = function () {
  if (UI.modal !== 'filter') return cnkModalBase();
  const sorts = [['Recommended','แนะนำ'],['Name','ชื่อร้าน ก–ฮ'],['Lowest sample price','งบประมาณต่ำสุด'],['Top rated','คะแนนสูงสุด (ต้องเชื่อมข้อมูลสด)']];
  const priceOptions = [[0,'ทั้งหมด'],[300,'ต่ำกว่า ฿300'],[500,'ต่ำกว่า ฿500'],[1000,'ต่ำกว่า ฿1,000'],[2000,'ต่ำกว่า ฿2,000']];
  return `<div class="overlay cnk-filter-overlay" role="dialog" aria-modal="true" aria-label="ตัวกรองและการจัดเรียง" onclick="if(event.target===this)App.closeModal()">
    <div class="sheet cnk-filter-sheet"><div class="handle"></div>
      <div class="sheet-heading"><h2>ตัวกรองและการจัดเรียง</h2><button class="close" onclick="App.closeModal()" aria-label="ปิด">${ic('x',18)}</button></div>
      <label class="field-label">จัดเรียงผลลัพธ์</label>
      <div class="cnk-filter-stack">${sorts.map(([id,name])=>`<button type="button" class="cnk-filter-option ${UI.sort===id?'selected':''}" onclick="App.setSort('${id}')" aria-pressed="${UI.sort===id}"><b>${name}</b><span class="cnk-filter-radio"></span></button>`).join('')}</div>
      <label class="field-label">งบต่อคนโดยประมาณ (จากไฟล์วิจัย)</label>
      <div class="cnk-filter-chips">${priceOptions.map(([amount,label])=>`<button type="button" class="chip ${UI.filterPrice===amount?'active':''}" onclick="App.setPrice(${amount})" aria-pressed="${UI.filterPrice===amount}">${label}</button>`).join('')}</div>
      <div class="cnk-filter-actions"><button class="btn ghost" onclick="App.resetFilters()">ล้างค่า</button><button class="btn" onclick="App.closeModal()">แสดงผลลัพธ์</button></div>
      <p class="hint">ตัวกรองงบประมาณใช้ประมาณการค่าใช้จ่ายต่อคน ไม่ใช่ราคาเปิดโต๊ะหรือค่าจองจริง</p>
    </div></div>`;
};

// ----- RUNNER: visible avatar and status; no later automatic matching -----
const CNK_RUNNER_DEMOS = [
  {id:'r1', name:'Runner A',fee:300, ready:true,status:'พร้อมรับงาน'},
  {id:'r2', name:'Runner B',fee:350,ready:true,status:'พร้อมรับงาน'},
  {id:'r3', name:'Runner C',fee:300,ready:false,status:'กำลังรับงานอื่น'}
];
function cnkDemoAvatar(n) {
  const tones=['#DBAC8D','#EAB79F','#CA9375'], shirts=['#873854','#425678','#735B57'],hairs=['#31262A','#503228','#25252B'];
  return `<svg viewBox="0 0 64 64" role="img" aria-label="ภาพการ์ตูนตัวอย่าง Runner"><rect width="64" height="64" fill="#F5E6E9"/><path d="M0 64Q1 43 32 43T64 64" fill="${shirts[n]}"/><ellipse cx="32" cy="28" rx="16" ry="20" fill="${tones[n]}"/><path d="M16 27Q12 7 30 8Q53 5 48 27L46 18Q32 22 20 17Z" fill="${hairs[n]}"/><path d="M25 30h3m9 0h3" stroke="#422E31" stroke-width="2" stroke-linecap="round"/><path d="M28 39q4 3 8 0" fill="none" stroke="#9B5F65" stroke-width="1.8"/></svg>`;
}
runnerChoiceUI = function () {
  if (UI.service==='direct') return '';
  return `<div class="form-card section cnk-runner-section"><h3>เลือกผู้ช่วย Runner</h3><p class="hint">ภาพ ชื่อ ค่าบริการ และสถานะเป็นข้อมูลจำลองเพื่อทดสอบหน้าจอ ยังไม่ใช่ผู้รับงานที่ยืนยันตัวตนจริง</p>
    ${CNK_RUNNER_DEMOS.map((r,i)=>`<button class="cnk-runner-row ${UI.runnerChoice===r.id?'selected':''}" ${r.ready?'':'disabled'} onclick="App.pickRunner('${r.id}')">
      <span class="cnk-runner-avatar">${cnkDemoAvatar(i)}</span><span class="cnk-runner-data"><strong>${e(r.name)}</strong><small>ยังไม่มีคะแนนรีวิวจากผู้ใช้จริง</small><small class="${r.ready?'cnk-status-ready':'cnk-status-busy'}">● ${e(r.status)} (ทดลอง)</small></span>
      <span class="cnk-runner-side"><b>${CNK_NUMBER(r.fee)}*</b><span class="cnk-runner-radio"></span></span>
    </button>`).join('')}
    <p class="hint">* ค่าบริการเป็นตัวอย่าง และต้องได้รับอนุญาตจากร้านก่อนดำเนินงาน ไม่ใช่ราคาเรียกเก็บจริง</p>
  </div>`;
};
feeFor = function (service) {
  if (service==='direct') return 0;
  const r = CNK_RUNNER_DEMOS.find(x=>x.id===UI.runnerChoice);
  return r?.fee ?? (service==='queue'?350:300);
};
const cnkStartBookingBase = App.startBooking;
App.startBooking = function (id) {
  UI.cnkMonth = null;
  cnkStartBookingBase(id);
  UI.runnerChoice='r1';
};

// ----- CALENDAR: one authoritative implementation -----
window.CNK_bookingCalendar = function () {
  const month = UI.cnkMonth || UI.date.slice(0,7);
  const [year,mon]=month.split('-').map(Number);
  const total=new Date(year,mon,0).getDate();
  const offset=new Date(year,mon-1,1).getDay();
  const today=dateOffset(0);
  const monthName=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'][mon-1];
  const eventRows=events.map(ev=>({...ev,iso:dateOffset(ev.offset)})).filter(ev=>ev.iso.startsWith(month));
  const cells=Array.from({length:offset},()=>'<span class="cnk-calendar-empty"></span>');
  for(let i=1;i<=total;i++) {
    const date=`${year}-${String(mon).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
    const hasEvent=eventRows.some(ev=>ev.iso===date);
    cells.push(`<button type="button" class="cnk-calendar-day ${UI.date===date?'selected':''}" ${date<today?'disabled':''} onclick="App.cnkSelectDate('${date}')" aria-label="${i} ${monthName} ${year}${hasEvent?' มีอีเวนต์':''}">${i}${hasEvent?'<span class="cnk-calendar-event-dot">✦</span>':''}</button>`);
  }
  return `<section class="cnk-calendar" aria-label="ปฏิทินเลือกวันที่"><div class="cnk-calendar-head"><strong>${monthName} ${year}</strong>
    <div><button type="button" onclick="App.cnkMoveMonth(-1)" aria-label="เดือนก่อน">‹</button><button type="button" onclick="App.cnkMoveMonth(1)" aria-label="เดือนถัดไป">›</button></div></div>
    <div class="cnk-calendar-grid cnk-calendar-weekdays">${['อา','จ','อ','พ','พฤ','ศ','ส'].map(x=>`<span>${x}</span>`).join('')}</div>
    <div class="cnk-calendar-grid">${cells.join('')}</div><div class="cnk-calendar-key">✦ วันที่มีอีเวนต์ตัวอย่าง</div>
    ${eventRows.length?`<div class="cnk-calendar-events"><strong>อีเวนต์ที่กำลังจะมาถึง</strong>${eventRows.map(ev=>`<button type="button" onclick="App.cnkSelectDate('${ev.iso}')"><span class="cnk-event-date">${Number(ev.iso.slice(-2))}<small>${monthName.slice(0,2)}.</small></span><span><b>${e(ev.name)}</b><small>${e(V(ev.venue).name)} · ${e(ev.time)} · อีเวนต์จำลอง</small></span></button>`).join('')}</div>`:''}
  </section>`;
};
App.cnkSelectDate = function (iso) { if(iso<dateOffset(0))return;UI.date=iso;UI.cnkMonth=iso.slice(0,7);render(true); };
App.cnkMoveMonth = function (n) {
  const [y,m]=(UI.cnkMonth||UI.date.slice(0,7)).split('-').map(Number);
  const d=new Date(y,m-1+n,1);
  const next=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  if(next<dateOffset(0).slice(0,7))return;
  UI.cnkMonth=next;render(true);
};

// Let the newly collected research content win only on the affected pages.
// All other baseline screens / role workspaces stay unchanged.

/* CHILL N' KNOCK — v1.1 SELECTIVE FIXES
   วางท้ายสุดของ upgrade.js */

(() => {
  const money = n => '฿' + Number(n).toLocaleString('th-TH');

  const area = a => ({
    Thonglor:'ทองหล่อ',
    Ekkamai:'เอกมัย',
    Sukhumvit:'สุขุมวิท',
    Ari:'อารีย์',
    Ratchayothin:'รัชโยธิน',
    Kaset:'เกษตร–เสนานิคม',
    Langsuan:'หลังสวน',
    Chatuchak:'จตุจักร',
    Sathorn:'สาทร'
  })[a] || a;

  const rating = v => {
    const n = Number(CNK_RES[v.id]?.research_rating_snapshot);
    return n > 0 && n <= 5 ? n : null;
  };

  // ใช้ชื่อร้านที่ยืนยันร่วมกันแล้ว
  const guest = venues.find(v => v.id === 'guest');
  if (guest) {
    guest.name = 'GUEST HOUSE KASET';
    guest.area = 'Kaset';
  }

  const viral = venues.find(v => v.id === 'viral');
  if (viral) viral.name = 'VIRAL';


  // ==========================================
  // FIX A — คะแนนร้านบนการ์ด Explore
  // ==========================================

  const oldExploreCard = cnkExploreCard;

  cnkExploreCard = function (v) {
    const html = oldExploreCard(v);
    const score = rating(v);

    const ratingsMarkup = `
      <div class="cnk-research-score">
        ${score === null
          ? '<span>ยังไม่มีคะแนนในชุดข้อมูล</span>'
          : `<b>★ ${score.toFixed(1)}/5</b>
             <small>คะแนนที่บันทึกไว้ในเอกสารทีม</small>`
        }
      </div>
    `;

    return html.replace(
      '<div class="cnk-explore-bottom">',
      ratingsMarkup + '<div class="cnk-explore-bottom">'
    );
  };


  // ==========================================
  // FIX B — Filter เหลือ 3 วิธีเรียง
  // ไม่มีการ Render ใหม่ทุกครั้งที่กด
  // ==========================================

  filteredVenues = function () {
    const q = (UI.q || '').trim().toLocaleLowerCase();

    const rows = venues.filter(v =>
      (UI.area === 'All' || v.area === UI.area) &&
      (
        UI.genre === 'All' ||
        v.genre === UI.genre ||
        v.tags.includes(UI.genre) ||
        v.kind.includes(UI.genre)
      ) &&
      (
        !q ||
        [
          v.name, v.area, area(v.area),
          v.kind, v.genre, v.place, ...v.tags
        ].join(' ').toLocaleLowerCase().includes(q)
      ) &&
      (
        !UI.filterPrice ||
        (Number.isFinite(v.budgetMin) &&
         v.budgetMin < UI.filterPrice)
      )
    );

    if (UI.sort === 'Top rated') {
      rows.sort((a, b) =>
        (rating(b) ?? -1) - (rating(a) ?? -1)
      );
    }

    if (UI.sort === 'Lowest sample price') {
      rows.sort((a, b) =>
        (a.budgetMin ?? Infinity) -
        (b.budgetMin ?? Infinity)
      );
    }

    return rows;
  };

  discoveryResults = function () {
    const rows = filteredVenues();

    return `
      <div class="search-meta">
        <span>${rows.length} ร้าน</span>
      </div>

      ${rows.length
        ? rows.map(cnkExploreCard).join('')
        : `<div class="empty">
             <h3>ไม่พบร้าน</h3>
             <button class="btn smallbtn"
               onclick="App.cnkClearFilter()">
               ล้างตัวกรอง
             </button>
           </div>`
      }
    `;
  };

  App.cnkSelectFilter = function (button, type, value) {
    if (type === 'sort') {
      UI.sort = value;
    } else {
      UI.filterPrice = Number(value);
    }

    const parent = button.closest('.cnk-filter-sheet');
    if (!parent) return;

    const selector = type === 'sort'
      ? '[data-cnk-sort]'
      : '[data-cnk-budget]';

    const selectedClass = type === 'sort'
      ? 'selected'
      : 'active';

    parent.querySelectorAll(selector).forEach(el => {
      const selected = el === button;
      el.classList.toggle(selectedClass, selected);
      el.setAttribute('aria-pressed', String(selected));
    });
  };

  App.cnkClearFilter = function () {
    UI.sort = 'Recommended';
    UI.filterPrice = 0;
    UI.area = 'All';
    UI.genre = 'All';
    UI.q = '';

    const parent = document.querySelector('.cnk-filter-sheet');

    if (!parent) return render(true);

    for (const [selector, choice, style] of [
      ['[data-cnk-sort]', 'Recommended', 'selected'],
      ['[data-cnk-budget]', '0', 'active']
    ]) {
      parent.querySelectorAll(selector).forEach(el => {
        const selected =
          (el.dataset.cnkSort || el.dataset.cnkBudget) === choice;

        el.classList.toggle(style, selected);
        el.setAttribute('aria-pressed', String(selected));
      });
    }
  };


  // ==========================================
  // FIX C — Modal Filter และ Font Size
  // ==========================================

  const previousModal = modal;

  modal = function () {
    if (UI.modal === 'filter') {
      const sorts = [
        ['Recommended', 'แนะนำ'],
        ['Top rated', 'คะแนนสูงสุด'],
        ['Lowest sample price', 'ราคาต่ำสุด']
      ];

      const budgets = [
        [0, 'ทั้งหมด'],
        [300, 'ต่ำกว่า ฿300'],
        [500, 'ต่ำกว่า ฿500'],
        [1000, 'ต่ำกว่า ฿1,000'],
        [2000, 'ต่ำกว่า ฿2,000']
      ];

      return `
        <div class="overlay cnk-filter-overlay"
          role="dialog"
          aria-modal="true"
          onclick="if(event.target===this)App.closeModal()">

          <div class="sheet cnk-filter-sheet">
            <div class="handle"></div>

            <div class="sheet-heading">
              <h2>ตัวกรองและการจัดเรียง</h2>
              <button class="close"
                onclick="App.closeModal()"
                aria-label="ปิด">×</button>
            </div>

            <label class="field-label">จัดเรียงผลลัพธ์</label>

            <div class="cnk-filter-stack">
              ${sorts.map(([id, name]) => `
                <button type="button"
                  data-cnk-sort="${id}"
                  class="cnk-filter-option
                    ${UI.sort === id ? 'selected' : ''}"
                  aria-pressed="${UI.sort === id}"
                  onclick="App.cnkSelectFilter(
                    this,'sort','${id}')">

                  <b>${name}</b>
                  <span class="cnk-filter-radio"></span>
                </button>
              `).join('')}
            </div>

            <label class="field-label">
              งบประมาณต่อคนโดยประมาณ
            </label>

            <div class="cnk-filter-chips">
              ${budgets.map(([n, label]) => `
                <button type="button"
                  data-cnk-budget="${n}"
                  class="chip
                    ${UI.filterPrice === n ? 'active' : ''}"
                  aria-pressed="${UI.filterPrice === n}"
                  onclick="App.cnkSelectFilter(
                    this,'price',${n})">
                  ${label}
                </button>
              `).join('')}
            </div>

            <div class="cnk-filter-actions">
              <button class="btn ghost"
                onclick="App.cnkClearFilter()">ล้างค่า</button>
              <button class="btn"
                onclick="App.closeModal()">แสดงผลลัพธ์</button>
            </div>

            
          </div>
        </div>
      `;
    }

    if (UI.modal === 'cnk-font') {
      const opts = [
        ['standard', 'มาตรฐาน'],
        ['large', 'ใหญ่'],
        ['xlarge', 'ใหญ่มาก']
      ];

      return `
        <div class="overlay"
          role="dialog"
          aria-modal="true"
          onclick="if(event.target===this)App.closeModal()">

          <div class="sheet cnk-font-sheet">
            <div class="handle"></div>

            <div class="sheet-heading">
              <h2>ขนาดตัวอักษร</h2>
              <button class="close"
                onclick="App.closeModal()"
                aria-label="ปิด">×</button>
            </div>

            ${opts.map(([id,label]) => `
              <button type="button"
                class="cnk-font-choice
                  ${(DB.cnkFont || 'standard') === id
                    ? 'selected' : ''}"
                onclick="App.cnkFontSize('${id}')">

                <span>${label}</span>
                <span>
                  ${(DB.cnkFont || 'standard') === id
                    ? '●' : '○'}
                </span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    return previousModal();
  };


  // ==========================================
  // FIX D — Venue Detail
  // คะแนน / งบต่อคน แสดงเฉพาะกรอบด้านบน
  // ==========================================

    venueDetail = function () {
    const v = V(UI.venue);
    const d = CNK_RES[v.id] || {};
    const score = rating(v);
    const budget = Number.isFinite(v.budgetMin)
      ? `${money(v.budgetMin)}+`
      : 'สอบถามร้าน';
    const count = Number.isFinite(d.research_rating_count)
      ? `จาก ${Number(d.research_rating_count).toLocaleString('th-TH')} รีวิว (อ้างอิง)`
      : 'คะแนนจากข้อมูลทีม';

    return `
      <div class="screen venue-screen">
        <div class="detail-cover image" style="${media(v.image,v.accent)}">
          <div class="detail-top">
            <button class="circle-btn" onclick="App.back()" aria-label="ย้อนกลับ">${ic('back')}</button>
            <div class="row">
              <button class="circle-btn" onclick="App.toggleFav('${v.id}')" aria-label="บันทึกร้าน">${ic('heart')}</button>
              <button class="circle-btn" onclick="App.shareVenue('${v.id}')" aria-label="แชร์ร้าน">${ic('share')}</button>
            </div>
          </div>
          <div class="detail-bottom">
            <span class="pill rose">${e(v.kind)} · ${e(v.genre)}</span>
            <h1>${e(v.name)}</h1>
            <p>${ic('pin',13)} ${e(area(v.area))} · กรุงเทพฯ</p>
          </div>
        </div>

        <div class="pad">
          <div class="detail-stats">
            <div class="stat">
              <b>${score === null ? '—' : score.toFixed(1) + '/5 ★'}</b>
              <span>${score === null ? 'ยังไม่มีคะแนน' : e(count)}</span>
            </div>
            <div class="stat">
              <b>${budget}</b>
              <span>งบต่อคน (ประมาณ)</span>
            </div>
            <div class="stat">
              <b>รอยืนยัน</b>
              <span>โต๊ะและคิว</span>
            </div>
          </div>

          <div class="info-tabs" role="tablist" aria-label="รายละเอียดร้าน">
            ${[
              ['about','ภาพรวม'], ['menu','เมนู'],
              ['reviews','รีวิว'], ['gallery','รูปภาพ']
            ].map(([id,label]) => `
              <button type="button" role="tab" aria-selected="${UI.infoTab === id}"
                class="${UI.infoTab === id ? 'active' : ''}"
                onclick="App.setInfoTab('${id}')">${label}</button>
            `).join('')}
          </div>

          ${detailInfo(v)}
        </div>

        <div class="floating-cta venue-sticky">
          <div>
            <div class="micro">CHILL N’ KNOCK</div>
            <strong style="font-size:11px">เลือกวิธีจอง 4 แบบ</strong>
          </div>
          <button class="btn" onclick="App.startBooking('${v.id}')">
            จองคืนนี้ ${ic('arrow',16)}
          </button>
        </div>
      </div>
    `;
  };




  // ==========================================
  // FIX E — เมนู / รีวิว / ภาพรวม
// ราคาเพิ่มเติมที่ค้นพบจากรายการเมนูเผยแพร่
const extraMenu = {
  onyx: [
    ['Johnnie Walker Black Label (1 L)',3300],
    ['Johnnie Walker Gold Label',3900],
    ['Monkey Shoulder',5500],
    ['Hennessy VSOP',5500]
  ],
  savoy: [
    ['Johnnie Walker Gold Label',5900],
    ['Monkey Shoulder',5900],
    ['Hennessy VSOP',7000],
    ['Moët & Chandon Brut Impérial',8900]
  ]
};

// ราคาเก่าที่พบสำหรับเมนู TDERM
const tdermPrices = {
  'สปาเก็ตตี้ครีมซอสแหนม':300,
  'สปาเก็ตตี้กุ้งซอสโหระพา':350,
  'A.O.P. เบคอนพริกแห้ง':280
};

const previousDetailInfo = detailInfo;

    // หมวดเมนูใช้เฉพาะหน้า Venue Detail; ไม่เปลี่ยนข้อมูลเมนูต้นฉบับ
  App.cnkVenueMenuCategory = function (category) {
    if (!['drinks','table','bottle'].includes(category)) return;
    UI.cnkVenueMenuCategory = category;
    render(true);
  };

    detailInfo = function (v) {
    const d = CNK_RES[v.id] || {};

    if (UI.infoTab === 'about') {
      const hours = d.hours || 'ยังไม่มีข้อมูลเวลาเปิด–ปิดที่ยืนยันได้';
      return `
        <div class="info-copy cnk-venue-about">
          <h3>เกี่ยวกับร้าน</h3>
          <p>${e(d.overview || v.desc)}</p>
          ${d.atmosphere ? `<p>${e(d.atmosphere)}</p>` : ''}
          <div class="tag-list">
            ${v.tags.map(t => `<span class="pill outline">${e(t)}</span>`).join('')}
          </div>

          <h3>ที่ตั้งร้าน</h3>
          <div class="venue-map-card venue-map-card--flat">
            
            <div class="venue-map-thumb venue-map-thumb--streets" aria-label="แผนที่ของ ${e(v.name)}">
              ${v.verified && d.identity_status !== 'unconfirmed'
                ? `<iframe
                    title="แผนที่ ${e(v.name)}"
                    src="https://maps.google.com/maps?hl=th&amp;q=${encodeURIComponent(`${v.name}, ${d.address || v.place}, Bangkok, Thailand`)}&amp;z=16&amp;output=embed"
                    loading="lazy"
                    tabindex="-1"
                    referrerpolicy="strict-origin-when-cross-origin"
                    style="position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none"
                  ></iframe>`
                : `<div style="height:100%;display:flex;align-items:center;justify-content:center;background:#F4EFEC;color:#755A68;font-size:11px">
                    ยังไม่ยืนยันพิกัดร้าน
                  </div>`}
            </div>

            <div class="venue-map-row">
              <div class="venue-address">${e(d.address || v.place || v.area)}</div>
              <button type="button" class="map-open-btn" onclick="App.openMap('${v.id}')">
                ${ic('map',15)} เปิดแผนที่
              </button>
            </div>
          </div>

          <h3 class="cnk-hours-title">ช่วงเวลาเปิดบริการ</h3>
          <div class="hours-row">
            <span class="hours-icon">${ic('clock',16)}</span>
            <span>${e(hours)}${hours.startsWith('ยังไม่มี') ? '' : ' · โปรดตรวจสอบอีกครั้ง'}</span>
          </div>
        </div>
      `;
    }

    if (UI.infoTab === 'menu') {
      const list = [...(d.menu || [])];
      for (const [name,price] of extraMenu[v.id] || []) {
        if (!list.some(x => x.name === name)) list.push({name,price});
      }
      if (UI.cnkVenueMenuFor !== v.id) {
        UI.cnkVenueMenuFor = v.id;
        UI.cnkVenueMenuCategory = 'drinks';
      }
      const category = UI.cnkVenueMenuCategory || 'drinks';
      const hasBottle = name => /bottle|johnnie|hennessy|monkey shoulder|เหล้า|ขวด|whisk|moët|champagne/i.test(name);
      const hasTable = name => /โต๊ะ|table|package|แพ็กเกจ|minimum|set\b/i.test(name) && !hasBottle(name);
      const visible = category === 'table'
        ? list.filter(m => hasTable(m.name))
        : category === 'bottle'
          ? list.filter(m => hasBottle(m.name))
          : list;

      const imageOf = (name, custom) => {
        if (custom && /^(https?:\/\/|assets\/)/i.test(custom)) return custom;
        if (/beer|เบียร์/i.test(name)) return 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&q=80';
        if (/mojito|cocktail|ค็อกเทล|margarita/i.test(name)) return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&q=80';
        if (/fruit|น้ำผลไม้|pre-mixed|juice/i.test(name)) return 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&q=80';
        if (hasBottle(name)) return 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=300&q=80';
        return 'assets/bar.jpg';
      };

      const priceText = m => {
        const exact = Number.isFinite(m.price) ? m.price : tdermPrices[m.name];
        if (Number.isFinite(exact)) return `${money(exact)}`;
        const range = String(m.note || '').match(/(\d[\d,]*)\s*[-–]\s*(\d[\d,]*)\s*บาท/);
        return range ? `ประมาณ ฿${range[1]}–${range[2]}` : 'สอบถามร้าน';
      };
      return `
        <div class="info-copy cnk-menu-section">
          <h3>เมนูและแพ็กเกจ</h3>
          <div class="cnk-menu-categories" aria-label="หมวดเมนู">
            ${[['drinks','เครื่องดื่ม'],['table','แพ็กเกจโต๊ะ'],['bottle','Bottle Set']]
              .map(([id,label]) => `<button type="button" class="${category === id ? 'active' : ''}"
                aria-pressed="${category === id}"
                onclick="App.cnkVenueMenuCategory('${id}')">${label}</button>`).join('')}
          </div>
          ${visible.length ? `<div class="cnk-menu-list">
            ${visible.map(m => `
              <div class="cnk-menu-card">
                <div class="cnk-menu-thumb">
                  <img src="${e(imageOf(m.name,m.image))}" alt="ภาพประกอบ ${e(m.name)}"
                    loading="lazy" onerror="this.onerror=null;this.src='assets/bar.jpg'">
                </div>
                <div class="cnk-menu-desc">
                  <strong>${e(m.name)}</strong>
                  ${m.note ? `<small>${e(m.note)}</small>` : ''}
                </div>
                <div class="cnk-menu-price">
                  <b>${e(priceText(m))}</b>
                  <small>${m.verified_in_team_file ? 'ตามข้อมูลทีม' : 'ราคาอ้างอิง'}</small>
                </div>
              </div>
            `).join('')}
          </div>` : `<p class="cnk-menu-empty">ยังไม่มีข้อมูลหมวดนี้ของร้าน</p>`}
          <p class="cnk-menu-note">ราคาเป็นข้อมูลอ้างอิงหรือค่าประมาณ อาจเปลี่ยนแปลงได้ · ภาพเมนูเป็นภาพประกอบ</p>
        </div>
      `;
    }

    if (UI.infoTab === 'reviews') {
      const notes = (d.review_notes || []).map(x => ({
        text: x.summary, source: x.source || 'ข้อมูลที่ทีมรวบรวม'
      }));
      const local = (DB.reviews || [])
        .filter(r => r.venue === v.id)
        .map(r => ({text:r.text,source:'รีวิวทดลองจากเบราว์เซอร์นี้'}));
      const entries = [...notes,...local];
      const score = rating(v);
      return `
        <div class="info-copy cnk-reviews-section">
          <h3>รีวิวและความคิดเห็น</h3>
          <div class="cnk-review-summary">
            <strong>${score === null ? '—' : score.toFixed(1) + '/5'} <span>★</span></strong>
            <small>${score === null ? 'ยังไม่มีคะแนนร้าน' : 'คะแนนอ้างอิงจากข้อมูลที่ทีมรวบรวม'}<br>ไม่ใช่รีวิวสดจากแพลตฟอร์ม</small>
          </div>
          <div class="cnk-review-list">
            ${entries.length ? entries.map((item,i) => `
              <div class="cnk-review-card">
                <div class="cnk-review-icon" aria-hidden="true">${ic('user',20)}</div>
                <div class="cnk-review-text">
                  <strong>${local.includes(item) ? 'ผู้ใช้งานทดลอง' : 'ความคิดเห็นจากข้อมูลอ้างอิง'}</strong>
                  <small>${e(item.source)}</small>
                  <p>${e(item.text || '')}</p>
                </div>
              </div>
            `).join('') : '<div class="cnk-review-card">ยังไม่มีรีวิวของร้านนี้</div>'}
          </div>
        </div>
      `;
    }

    if (UI.infoTab === 'gallery') {
      const gallery = (d.gallery && d.gallery.length ? d.gallery : [v.image, 'assets/club.jpg']).slice(0,2);
      return `
        <div class="info-copy cnk-gallery-section">
          <h3>รูปภาพบรรยากาศร้าน</h3>
          <div class="cnk-photo-grid">
            ${gallery.map((src,i) => `
              <div class="cnk-gallery-item">
                <img src="${e(src)}" alt="ภาพบรรยากาศประกอบ ${e(v.name)} ${i+1}"
                  loading="lazy" onerror="this.onerror=null;this.src='assets/club.jpg';this.parentNode.classList.add('is-placeholder')">
                <span>ภาพประกอบชั่วคราว</span>
              </div>
            `).join('')}
          </div>
          <p class="cnk-gallery-note">ภาพประกอบสำหรับต้นแบบ ไม่ใช่ภาพที่ร้านยืนยัน</p>
        </div>
      `;
    }

    return previousDetailInfo(v);
  };


  // ==========================================
  // FIX F — Event Detail + เลือกบัตร
  // ==========================================

  const tiers = [
    {
      id:'early',
      name:'Early Bird',
      price:500,
      detail:'เข้าร่วมงาน 1 คน · จำนวนจำกัด'
    },
    {
      id:'regular',
      name:'Regular',
      price:700,
      detail:'เข้าร่วมงาน 1 คน'
    },
    {
      id:'vip',
      name:'VIP Entry',
      price:1500,
      detail:'เข้าร่วมงาน 1 คน · สิทธิ์ VIP (ตัวอย่าง)'
    }
  ];

  App.cnkEventTab = function (tab) {
    UI.cnkEventTab = tab;
    render(true);
  };

  const eventDate = ev => dateOffset(ev.offset);

  eventDetail = function () {
    const ev = E(UI.event);
    const v = V(ev.venue);
    const tab = UI.cnkEventTab || 'details';

    const content = tab === 'artists'
      ? `
        <div class="cnk-event-panel">
          <h3>ศิลปินและโชว์</h3>
          <p>${e(ev.subtitle || 'โปรแกรมจะประกาศภายหลัง')}</p>
          <p>ยังไม่ได้ยืนยันรายชื่อศิลปินจากร้าน</p>
        </div>
      `
      : tab === 'tickets'
      ? `
        <div class="cnk-event-panel">
          <h3>ประเภทบัตร</h3>

          ${tiers.map(t => `
            <div class="spread cnk-event-tier">
              <b>${e(t.name)}</b>
              <b>${money(t.price)}*</b>
            </div>
          `).join('')}
        </div>
      `
      : `
        <div class="cnk-event-panel">
          <h3>รายละเอียดอีเวนต์</h3>
          <p>${e(ev.desc)}</p>

          <p>${ic('calendar',15)}
            ${e(tinyDate(eventDate(ev)))} · ${e(ev.time)}
          </p>

          <p>${ic('pin',15)}
            ${e(v.name)} · ${e(area(v.area))}
          </p>

          <button class="btn ghost smallbtn"
            onclick="App.openMap('${v.id}')">
            ${ic('map',15)} เปิดแผนที่
          </button>
        </div>
      `;

    return `
      <div class="screen cnk-event-screen">

        <div class="detail-cover image"
          style="${media(v.image,v.accent)}">

          <div class="detail-top">
            <button class="circle-btn"
              onclick="App.back()">${ic('back')}</button>
            <button class="circle-btn"
              onclick="App.shareEvent('${ev.id}')">
              ${ic('share')}
            </button>
          </div>

          <div class="detail-bottom">
            <span class="pill rose">
              อีเวนต์ในร้าน · ตัวอย่าง
            </span>
            <h1>${e(ev.name)}</h1>
            <p>${e(v.name)} · ${e(area(v.area))}</p>
          </div>
        </div>

        <div class="pad">
          <div class="cnk-event-meta">
            ${ic('calendar',17)}
            ${e(tinyDate(eventDate(ev)))}
            ${ic('clock',17)} ${e(ev.time)}
          </div>

          <div class="info-tabs cnk-event-tabs">
            ${[
              ['details','รายละเอียด'],
              ['artists','ศิลปิน'],
              ['tickets','ประเภทบัตร']
            ].map(([id,label]) => `
              <button class="${tab === id ? 'active' : ''}"
                onclick="App.cnkEventTab('${id}')">
                ${label}
              </button>
            `).join('')}
          </div>

          ${content}

          <p class="hint">
            * บัตรและราคาที่แสดงใช้ทดสอบ UI
            ไม่ใช่การขายบัตรจริง
          </p>
        </div>

        <div class="cnk-event-cta">
          <button class="btn ghost"
            onclick="App.startBooking('${v.id}')">
            จองโต๊ะ
          </button>
          <button class="btn"
            onclick="App.cnkOpenTicket('${ev.id}')">
            เลือกบัตร
          </button>
        </div>
      </div>
    `;
  };

  App.cnkOpenTicket = function (id) {
    UI.event = id;
    UI.cnkTicketTier = 'early';
    UI.ticketQty = 1;
    App.go('cnk-ticket-select');
  };

  App.cnkPickTicketTier = function (id) {
    UI.cnkTicketTier = id;
    render(true);
  };

  App.cnkTicketQty = function (n) {
    UI.ticketQty = Math.max(
      1, Math.min(8, UI.ticketQty + n)
    );
    render(true);
  };

  const ticketSelect = () => {
    const ev = E(UI.event);
    const t = tiers.find(x =>
      x.id === UI.cnkTicketTier
    ) || tiers[0];

    return `
      <div class="screen">
        ${title('เลือกประเภทบัตร', ev.name)}

        <div class="pad cnk-ticket-page">
          <h2>เลือกบัตรเข้างาน</h2>

          <div class="cnk-ticket-event">
            <b>${e(ev.name)}</b>
            <p>
              ${e(V(ev.venue).name)} ·
              ${e(tinyDate(eventDate(ev)))} ·
              ${e(ev.time)}
            </p>
          </div>

          ${tiers.map(x => `
            <button class="cnk-ticket-option
              ${x.id === t.id ? 'selected' : ''}"
              onclick="App.cnkPickTicketTier('${x.id}')">

              <span>
                <b>${e(x.name)}</b>
                <small>${e(x.detail)}</small>
              </span>

              <b>${money(x.price)}</b>
            </button>
          `).join('')}

          <div class="spread cnk-ticket-qty">
            <b>จำนวนบัตร</b>

            <div class="num-control">
              <button onclick="App.cnkTicketQty(-1)">−</button>
              <b>${UI.ticketQty}</b>
              <button onclick="App.cnkTicketQty(1)">+</button>
            </div>
          </div>

          <div class="spread cnk-ticket-total">
            <b>ยอดรวม</b>
            <b>${money(t.price * UI.ticketQty)}</b>
          </div>

          <p class="hint">
            ยังไม่เปิดขายจริงและไม่มีการชำระเงิน
          </p>

          <button class="btn full"
            onclick="App.cnkSaveTicket()">
            บันทึกบัตรทดลอง
          </button>
        </div>
      </div>
    `;
  };

  App.cnkSaveTicket = function () {
    if (!DB.account) {
      toast('เข้าสู่ระบบก่อนบันทึกบัตร');
      return App.auth('cnk-ticket-select');
    }

    const t = tiers.find(x =>
      x.id === UI.cnkTicketTier
    ) || tiers[0];

    const ev = E(UI.event);

    const item = {
      id:'TKT-' + Date.now(),
      event:ev.id,
      tierName:t.name,
      qty:UI.ticketQty,
      price:t.price * UI.ticketQty,
      date:eventDate(ev),
      owner:DB.account.email,
      prototype:true
    };

    (DB.tickets ||= []).push(item);
    UI.ticketId = item.id;
    save();
    App.go('cnk-ticket-confirm');
  };

  const ticketConfirm = () => {
    const t = DB.tickets.find(x =>
      x.id === UI.ticketId
    );

    if (!t) return activity();

    const ev = E(t.event);
    const v = V(ev.venue);

    return `
      <div class="screen">
        ${title('บันทึกบัตรสำเร็จ','บัตรทดลอง')}

        <div class="pad cnk-ticket-page">
          <div class="cnk-ticket-success">✓</div>

          <h2>บันทึกบัตรเรียบร้อย!</h2>

          <div class="cnk-ticket-event">
            <h3>${e(ev.name)}</h3>

            <p>
              ${e(v.name)} · ${e(tinyDate(t.date))}
              · ${e(ev.time)}
            </p>

            <p>
              ${e(t.tierName)} · ${t.qty} ใบ ·
              ${money(t.price)}
            </p>

            <b>ไม่ใช่บัตรสำหรับเข้างานจริง</b>
          </div>

          <button class="btn full"
            onclick="App.go('activity')">
            ไปที่คืนของฉัน
          </button>
        </div>
      </div>
    `;
  };

  const previousMain = currentMain;

  currentMain = function () {
    if (UI.role === 'user' &&
        UI.screen === 'cnk-ticket-select') {
      return ticketSelect();
    }

    if (UI.role === 'user' &&
        UI.screen === 'cnk-ticket-confirm') {
      return ticketConfirm();
    }

    return previousMain();
  };


  // ==========================================
  // FIX G — My Nights ตามโครงภาพอ้างอิง
  // ==========================================

  App.cnkNightTab = function (id) {
    UI.cnkNightTab = id;
    render(true);
  };

  activity = function () {
    const tab = UI.cnkNightTab ||
      (UI.tab === 'saved' ? 'saved' : 'bookings');

    const mine = DB.account
      ? DB.requests.filter(r =>
          r.owner === DB.account.email)
      : [];

    const active = mine.filter(r => !isDone(r));
    const history = mine.filter(isDone);

    const rows = tab === 'history' ? history : active;

    const card = r => {
      const v = V(r.venue);

      return `
        <button class="cnk-night-booking"
          onclick="App.openTracking('${r.id}')">

          <div class="cnk-night-thumb image"
            style="${media(v.image,v.accent)}">
          </div>

          <div>
            <span class="cnk-night-badge">
              ${e(statusLabel(r.status))}
            </span>

            <strong>${e(v.name)}</strong>

            <small>
              ${ic('pin',12)} ${e(area(v.area))}
            </small>

            <small>
              ${ic('calendar',12)}
              ${e(tinyDate(r.date))} ·
              ${e(r.time)} · ${r.guests} คน
            </small>

            <span class="cnk-night-link">
              ติดตามสถานะ ${ic('chevron',13)}
            </span>
          </div>
        </button>
      `;
    };

    return `
      <div class="screen">
        <div class="pad cnk-my-night safe-top">

          <div class="spread cnk-night-heading">
            <div>
              <h1>คืนของฉัน</h1>
              <p>จัดการการจอง การนัดเพื่อน และการเดินทาง</p>
            </div>

            <button class="circle-btn"
              onclick="App.openModal('notifications')">
              ${ic('bell',18)}
            </button>
          </div>

          <div class="cnk-night-tabs">
            ${[
              ['bookings','การจองของฉัน'],
              ['history','ประวัติ'],
              ['saved','รายการโปรด']
            ].map(([id,label]) => `
              <button class="${tab === id ? 'active' : ''}"
                onclick="App.cnkNightTab('${id}')">
                ${label}
              </button>
            `).join('')}
          </div>

          ${tab === 'saved'
            ? (
                DB.favs.length
                  ? venues.filter(v =>
                      DB.favs.includes(v.id))
                      .map(cnkExploreCard).join('')
                  : `<div class="cnk-night-empty">
                       ยังไม่มีร้านที่บันทึกไว้
                     </div>`
              )
            : `
              <div class="cnk-night-list">
                ${rows.length
                  ? rows.slice().reverse().map(card).join('')
                  : `<div class="cnk-night-empty">
                       ยังไม่มีรายการจองในหมวดนี้
                     </div>`
                }

                ${tab === 'bookings' && DB.tickets?.length
                  ? `
                    <h3>บัตรอีเวนต์ของฉัน</h3>

                    ${DB.tickets
                      .filter(t =>
                        !DB.account ||
                        t.owner === DB.account.email)
                      .map(t => `
                        <div class="cnk-night-ticket">
                          ${ic('ticket',18)}
                          ${e(E(t.event).name)} ·
                          ${e(t.tierName || 'บัตรทดลอง')}
                        </div>
                      `).join('')}
                  `
                  : ''
                }
              </div>
            `
          }

          <h3>เตรียมพร้อมสำหรับคืนนี้</h3>

          <div class="cnk-night-tools">
            <button onclick="App.go('friends')">
              ${ic('users',24)}
              <b>หาเพื่อนเที่ยว</b>
              <small>ชวนเพื่อนหรือขอเข้ากลุ่ม</small>
              ${ic('arrow',16)}
            </button>

            <button onclick="App.go('ride')">
              ${ic('pin',24)}
              <b>เรียกรถกลับบ้าน</b>
              <small>ไปยังแอปเรียกรถที่รองรับ</small>
              ${ic('arrow',16)}
            </button>
          </div>

          <h3>คืนถัดไปของคุณ</h3>

          <div class="cnk-night-next">
            ${ic('calendar',20)} ยังไม่มีแพลน?
            <button onclick="App.go('discover')">
              ค้นหาร้าน
            </button>
          </div>
        </div>
      </div>
    `;
  };


  // ==========================================
  // FIX H — ขนาดฟอนต์ อยู่ใต้แก้ไขชื่อ
  // ==========================================

  const previousProfile = profile;

  profile = function () {
    const html = previousProfile();

    return html.replace(
      /(<button class="menu-row" onclick="App\.profileAction\('name'\)"[\s\S]*?<\/button>)/,
      `$1<button class="menu-row"
        onclick="App.openModal('cnk-font')">
        ${ic('settings',18)}
        ขนาดตัวอักษร
        <span class="right-arrow">
          ${ic('chevron',16)}
        </span>
      </button>`
    );
  };

  App.cnkFontSize = function (size) {
    if (!['standard','large','xlarge'].includes(size)) {
      return;
    }

    DB.cnkFont = size;
    save();

    document.documentElement.dataset.cnkFont = size;

    UI.modal = '';
    render(true);
  };

  document.documentElement.dataset.cnkFont =
    DB.cnkFont || 'standard';

  render();
})();

/* ==========================================
   FIX 07 — MY NIGHTS / RIDE / EVENTS
   CHILL N' KNOCK v1.1
   ========================================== */

(() => {

  // เพิ่มไอคอนรถในระบบไอคอนเดิม
  icons.car = `
    <path d="M5 17H3V9l2-5h14l2 5v8h-2"/>
    <path d="M5 17h14M4 9h16"/>
    <circle cx="7" cy="17" r="2"/>
    <circle cx="17" cy="17" r="2"/>
  `;

  const dateTh = iso => {
    const d = new Date(String(iso) + 'T12:00:00');
    return Number.isNaN(d.getTime())
      ? String(iso)
      : new Intl.DateTimeFormat('th-TH', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }).format(d);
  };

  const areaTh = a => ({
    Thonglor: 'ทองหล่อ',
    Ekkamai: 'เอกมัย',
    Ari: 'อารีย์',
    Sukhumvit: 'สุขุมวิท',
    Ratchayothin: 'รัชโยธิน',
    Kaset: 'เกษตร–เสนานิคม',
    Langsuan: 'หลังสวน',
    Chatuchak: 'จตุจักร',
    Sathorn: 'สาทร'
  })[a] || a;

  const stateTh = s => ({
    finding_runner: 'กำลังหา Runner',
    pending_venue: 'รอร้านยืนยัน',
    contacting: 'Runner กำลังติดต่อร้าน',
    queuing: 'กำลังดำเนินการ',
    awaiting_venue: 'รอร้านยืนยัน',
    confirmed: 'ร้านยืนยันแล้ว',
    queue_verified: 'ตรวจสอบคิวแล้ว',
    declined: 'ไม่อนุมัติ',
    cancelled: 'ยกเลิกแล้ว'
  })[s] || 'กำลังดำเนินการ';

  const money = n =>
    '฿' + Number(n).toLocaleString('th-TH');


  /* ========================================
     1. MY NIGHTS
     ======================================== */

  App.cnkNightTab = tab => {
    UI.cnkNightTab = tab;
    render(true);
  };

  activity = function () {
    const tab = UI.cnkNightTab || 'bookings';

    const mine = DB.account
      ? DB.requests.filter(
          r => r.owner === DB.account.email
        )
      : [];

    const today = dateOffset(0);

    const archived = r =>
      ['declined', 'cancelled'].includes(r.status) ||
      r.date < today;

    const rows = mine.filter(r =>
      tab === 'history'
        ? archived(r)
        : !archived(r)
    );

    const bookingCard = r => {
      const v = V(r.venue);

      return `
        <button class="mn-booking"
          onclick="App.openTracking('${r.id}')">

          <div class="mn-booking-cover image"
            style="${media(v.image, v.accent)}">

            <span class="mn-badge">
              ● ${e(stateTh(r.status))}
            </span>

            <div class="mn-cover-bottom">
              <strong>${e(v.name)}</strong>

              <span>
                ${ic('pin', 14)}
                ${e(areaTh(v.area))} · กรุงเทพฯ
              </span>

              <span>
                ${ic('calendar', 14)}
                ${e(dateTh(r.date))} · ${e(r.time)}
              </span>

              <i>${ic('chevron', 19)}</i>
            </div>
          </div>

          <div class="mn-booking-foot">
            <span>${ic('ticket', 20)}</span>

            <div>
              <b>
                บริการ: ${e(serviceName(r.service))}
              </b>

              <small>
                สถานะ: ${e(stateTh(r.status))}
              </small>
              <small>
                รหัสคำขอ: ${e(r.id)}
              </small>
            </div>
          </div>
        </button>
      `;
    };

    const favs = venues.filter(v =>
      DB.favs.includes(v.id)
    );

    return `
      <div class="screen mn-page">
        <div class="pad safe-top">

          <div class="mn-header">
            <div>
              <h1>คืนของฉัน</h1>

              <p>
                จัดการการจอง การนัดเพื่อน
                และการเดินทาง
              </p>
            </div>

            <div class="row">
              <button class="circle-btn"
                aria-label="แจ้งเตือน"
                onclick="App.openModal('notifications')">
                ${ic('bell', 20)}
              </button>

              <button class="circle-btn"
                aria-label="ดูอีเวนต์"
                onclick="App.go('events')">
                ${ic('calendar', 20)}
              </button>
            </div>
          </div>

          <div class="mn-tabs">
            ${[
              ['bookings', 'การจองของฉัน'],
              ['history', 'ประวัติ'],
              ['saved', 'รายการโปรด']
            ].map(([id, label]) => `
              <button
                class="${tab === id ? 'active' : ''}"
                onclick="App.cnkNightTab('${id}')">
                ${label}
              </button>
            `).join('')}
          </div>

          <div class="mn-list">
            ${tab === 'saved'
              ? (
                  favs.length
                    ? favs.map(cnkExploreCard).join('')
                    : `<div class="mn-empty">
                         ยังไม่มีร้านที่บันทึกไว้
                       </div>`
                )
              : (
                  rows.length
                    ? rows.slice().reverse()
                        .map(bookingCard).join('')
                    : `<div class="mn-empty">
                         ${tab === 'history'
                           ? 'ยังไม่มีประวัติการจอง'
                           : 'ยังไม่มีการจองในช่วงนี้'}
                       </div>`
                )
            }
          </div>

          ${tab === 'bookings' && DB.tickets?.length
            ? `
              <h2 class="mn-subtitle">
                บัตรอีเวนต์ของฉัน
              </h2>

              ${DB.tickets
                .filter(t =>
                  DB.account &&
                  t.owner === DB.account.email)
                .map(t => {
                  const ev = E(t.event);
                  const v = V(ev.venue);
                  
                return `
                  <button
                    type="button"
                    class="mn-ticket"
                    onclick="App.openTicket('${t.id}')"
                    aria-label="ดูบัตร ${e(ev.name)}">
                    
                    <span
                      class="mn-ticket-image image"
                      style="${media(v.image, v.accent)}">
                    </span>
                    <span class="mn-ticket-info">
                      <b>${e(ev.name)}</b>
                      <small>
                        ${e(t.tierName || 'บัตรทั่วไป')}
                        · ${t.qty} ใบ
                      </small>
                      <small>
                        ${e(dateTh(t.date))} · บัตรทดลอง
                      </small>
                      <small>
                        รหัสบัตร: ${e(t.id)}
                      </small>
                    </span>
                    <span class="mn-ticket-arrow">
                      ${ic('chevron', 18)}
                    </span>
                  </button>
                `;
              }).join('')}
            `
            : ''
          }
        
${tab === 'bookings' ? `
  <h2 class="mn-subtitle">
    เตรียมพร้อมสำหรับคืนนี้
  </h2>

  <div class="mn-tools">

    <button onclick="App.go('friends')">
      ${ic('users', 32)}

      <b>หาเพื่อนเที่ยว</b>
      <small>
        ชวนเพื่อนหรือขอเพื่อนไปเที่ยวด้วยกัน
      </small>

      <span class="mn-tool-arrow">
        ${ic('arrow', 16)}
      </span>
    </button>

    <button onclick="App.go('ride')">
      ${ic('car', 32)}

      <b>เรียกรถกลับบ้าน</b>
      <small>
        เปิด Grab หรือ LINE MAN
        เพื่อเดินทางกลับอย่างปลอดภัย
      </small>

      <span class="mn-tool-arrow">
        ${ic('arrow', 16)}
      </span>
    </button>

  </div>

  <h2 class="mn-subtitle">
    คืนถัดไปของคุณ
  </h2>

  
` : ''}


          <div class="mn-next">
            ${ic('calendar', 22)}

            <span>
              <b>ยังไม่มีการจองถัดไป</b>
              <small>
                มองหาร้านใหม่ ๆ และวางแผนคืนถัดไป
              </small>
            </span>

            <button onclick="App.go('discover')">
              ค้นหาร้าน
            </button>
          </div>

        </div>
      </div>
    `;
  };


  /* ========================================
     2. RIDE HOME
     ======================================== */

  App.cnkRideProvider = provider => {
    const urls = {
      grab: 'https://www.grab.com/th/en/transport/',
      lineman: 'https://lineman.onelink.me/1N3T/2v7aseqy'
    };

    if (urls[provider]) {
      window.open(urls[provider], '_blank', 'noopener');
    }
  };

  ridePage = function () {
    return `
      <div class="screen mn-ride-page">

        ${title(
          'เรียกรถกลับบ้าน',
          'เลือกผู้ให้บริการเดินทาง'
        )}

        <div class="pad">

          <div class="mn-provider">
            <div class="mn-provider-row">

              <div class="mn-grab-logo">
                Grab
              </div>

              <p>
                <b>Grab</b>
                <small>
                  เปิดบริการรถของ Grab และยืนยัน
                  การเดินทางในแอปผู้ให้บริการ
                </small>
              </p>
            </div>

            <button class="btn full"
              onclick="App.cnkRideProvider('grab')">
              ไปที่ Grab ${ic('external', 15)}
            </button>
          </div>

          <div class="mn-provider">
            <div class="mn-provider-row">

              <div class="mn-line-logo">
                <span>LM</span>
                <b>LINE MAN RIDE</b>
              </div>

              <p>
                <b>LINE MAN Ride</b>
                <small>
                  เปิด LINE MAN เพื่อเลือกประเภท
                  และยืนยันการเดินทาง
                </small>
              </p>
            </div>

            <button class="btn full"
              onclick="App.cnkRideProvider('lineman')">
              เปิด LINE MAN ${ic('external', 15)}
            </button>
          </div>

          <div class="mn-ride-note">
            ${ic('info', 20)}

            <span>
              ราคาและสถานะรถจะแสดงในแอปผู้ให้บริการ
              (Grab / LINE MAN) เท่านั้น
            </span>
          </div>

          <div class="mn-ride-note">
            ${ic('shield', 20)}

            <span>
              <b>เดินทางอย่างปลอดภัย</b>
              ตรวจสอบข้อมูลคนขับและทะเบียนรถก่อนขึ้นรถ
              และแชร์การเดินทางกับคนที่ไว้ใจ
            </span>
          </div>

          <p class="hint">
            ปัจจุบันเป็นการลิงก์ออก
            ไม่ส่งจุดรับ–ส่งอัตโนมัติ
            กรุณายืนยันเส้นทางในแอปผู้ให้บริการ
          </p>

        </div>
      </div>
    `;
  };


  /* ========================================
     3. EVENTS + TICKETS
     ======================================== */

  const tiers = [
    {
      id: 'early',
      name: 'Early Bird',
      price: 500,
      desc: 'เข้าร่วมได้ 1 คน · จำนวนจำกัด'
    },
    {
      id: 'regular',
      name: 'Regular',
      price: 700,
      desc: 'เข้าร่วมได้ 1 คน · เข้างานตามเงื่อนไข'
    },
    {
      id: 'vip',
      name: 'VIP Entry',
      price: 1500,
      desc: 'เข้าร่วมได้ 1 คน · สิทธิ์ VIP (ตัวอย่าง)'
    }
  ];

  const eventVenue = () => V(E(UI.event).venue);
  const evDate = () => dateOffset(E(UI.event).offset);

  App.cnkEventDetails = tab => {
    UI.cnkEventTab = tab;
    render(true);
  };

  eventDetail = function () {
    const ev = E(UI.event);
    const v = V(ev.venue);
    const tab = UI.cnkEventTab || 'details';

    let content = '';

    if (tab === 'details') {
      content = `
        <h3>เกี่ยวกับอีเวนต์</h3>
        <p>${e(ev.desc)}</p>

        <h3>ไลน์อัป</h3>
        <div class="ev-lineup">
          ${ic('music', 22)}

          <span>
            <b>
              ${e(ev.subtitle || 'รอประกาศจากร้าน')}
            </b>
            <small>
              รายชื่อศิลปินและเวลาแสดง
              รอการยืนยัน
            </small>
          </span>
        </div>

        <h3>บริการในงาน</h3>

        <div class="ev-perks">
          <span>${ic('music', 21)} ดนตรี</span>
          <span>${ic('users', 21)} โซนผู้ร่วมงาน</span>
          <span>${ic('ticket', 21)} บัตร</span>
          <span>${ic('pin', 21)} สถานที่</span>
        </div>
      `;
    }

    else if (tab === 'location') {
      content = `
        <h3>สถานที่จัดงาน</h3>

        <p>
          <b>${e(v.name)}</b>
          ${e(v.place)}
        </p>

        <button class="btn ghost"
          onclick="App.openMap('${v.id}')">
          ${ic('map', 17)} เปิดแผนที่
        </button>
      `;
    }

    else {
      content = `
        <h3>ประเภทบัตร (ราคาตัวอย่าง)</h3>

        ${tiers.map(t => `
          <div class="ev-price-row">
            <b>${e(t.name)}</b>
            <strong>${money(t.price)}</strong>
          </div>
        `).join('')}

        <p class="hint">
          ยังไม่ได้เชื่อมระบบขายบัตรจริง
        </p>
      `;
    }

    return `
      <div class="screen ev-ref-page">

        <div class="ev-ref-hero image"
          style="${media(v.image, v.accent)}">

          <div class="detail-top">
            <button class="circle-btn"
              aria-label="ย้อนกลับ"
              onclick="App.back()">
              ${ic('back', 21)}
            </button>

            <div class="row">
              <button class="circle-btn"
                aria-label="บันทึกร้าน"
                onclick="App.toggleFav('${v.id}')">
                ${ic('heart', 20)}
              </button>

              <button class="circle-btn"
                aria-label="แชร์อีเวนต์"
                onclick="App.shareEvent('${ev.id}')">
                ${ic('share', 20)}
              </button>
            </div>
          </div>

          <div class="ev-ref-hero-bottom">
            <span class="pill rose">
              อีเวนต์ในร้าน · ตัวอย่าง
            </span>

            <h1>${e(ev.name)}</h1>

            <p>
              ${ic('pin', 15)}
              ${e(v.name)} ·
              ${e(areaTh(v.area))}, กรุงเทพฯ
            </p>
          </div>

        </div>

        <div class="pad ev-ref-body">

          <div class="ev-ref-chips">
            <span>
              ${ic('calendar', 17)}
              ${e(dateTh(evDate()))}
            </span>

            <span>
              ${ic('clock', 17)}
              ${e(ev.time)} น.
            </span>
          </div>

          <div class="ev-ref-tabs">
            ${[
              ['details', 'รายละเอียด'],
              ['location', 'สถานที่'],
              ['tickets', 'ประเภทบัตร']
            ].map(([id, label]) => `
              <button
                class="${tab === id ? 'active' : ''}"
                onclick="App.cnkEventDetails('${id}')">
                ${label}
              </button>
            `).join('')}
          </div>

          <div class="ev-ref-content">
            ${content}
          </div>

          <p class="hint">
            รายการอีเวนต์และราคาบัตรขณะนี้
            เป็นข้อมูลทดสอบ ไม่ใช่ประกาศจากร้าน
          </p>
        </div>

        <div class="ev-ref-cta">
          <button class="btn ghost"
            onclick="App.startBooking('${v.id}')">
            ${ic('calendar', 18)} จองโต๊ะ
          </button>

          <button class="btn"
            onclick="App.cnkRefTicketStart()">
            ${ic('ticket', 18)} เลือกบัตร
          </button>
        </div>

      </div>
    `;
  };


  /* ===== เลือกประเภทบัตร ===== */

  App.cnkRefTicketStart = () => {
    UI.cnkRefTier = 'early';
    UI.cnkRefQty = 1;
    App.go('cnk-ref-ticket');
  };

  App.cnkRefTier = id => {
    UI.cnkRefTier = id;
    render(true);
  };

  App.cnkRefQty = diff => {
    UI.cnkRefQty = Math.max(
      1,
      Math.min(8, (UI.cnkRefQty || 1) + diff)
    );

    render(true);
  };

  const ticketScreen = () => {
    const ev = E(UI.event);
    const v = eventVenue();

    const picked = tiers.find(t =>
      t.id === UI.cnkRefTier
    ) || tiers[0];

    return `
      <div class="screen ev-ticket-page">

        ${title('เลือกประเภทบัตร', ev.name)}

        <div class="pad">

          <div class="ev-ticket-summary">

            <div class="ev-ticket-thumb image"
              style="${media(v.image, v.accent)}">
            </div>

            <div>
              <b>${e(ev.name)}</b>

              <small>
                ${ic('calendar', 12)}
                ${e(dateTh(evDate()))} · ${e(ev.time)}
              </small>

              <small>
                ${ic('pin', 12)}
                ${e(v.name)} · ${e(areaTh(v.area))}
              </small>
            </div>
          </div>

          <h3>ประเภทบัตร</h3>

          ${tiers.map(t => `
            <button class="ev-ticket-option
              ${picked.id === t.id ? 'selected' : ''}"
              onclick="App.cnkRefTier('${t.id}')">

              <span class="ev-ticket-radio"></span>

              <span class="grow">
                <b>${e(t.name)}</b>
                <small>${e(t.desc)}</small>
              </span>

              <strong>${money(t.price)}</strong>
            </button>
          `).join('')}

          <div class="ev-ticket-qty">
            <b>จำนวนบัตร</b>

            <span>
              <button
                aria-label="ลดจำนวนบัตร"
                onclick="App.cnkRefQty(-1)">
                −
              </button>

              <b>${UI.cnkRefQty || 1}</b>

              <button
                aria-label="เพิ่มจำนวนบัตร"
                onclick="App.cnkRefQty(1)">
                +
              </button>
            </span>
          </div>

          <div class="ev-ticket-total">
            <b>ยอดรวม</b>

            <strong>
              ${money(
                picked.price * (UI.cnkRefQty || 1)
              )}
            </strong>
          </div>

          <p class="hint">
            ยังไม่มีการเรียกเก็บเงินจริง
            บัตรนี้ใช้เข้างานจริงไม่ได้
          </p>

          <button class="btn full"
            onclick="App.cnkRefTicketConfirm()">
            ยืนยันบัตรทดลอง
          </button>

        </div>
      </div>
    `;
  };


  /* ===== บันทึกบัตรทดลอง ===== */

  App.cnkRefTicketConfirm = () => {
    if (!DB.account) {
      toast('กรุณาเข้าสู่ระบบก่อน');

      return App.auth('cnk-ref-ticket');
    }

    const ev = E(UI.event);

    const tier = tiers.find(t =>
      t.id === UI.cnkRefTier
    ) || tiers[0];

    const item = {
      id: 'TKT-' + Date.now(),
      event: ev.id,
      tierName: tier.name,
      qty: UI.cnkRefQty || 1,
      price: tier.price * (UI.cnkRefQty || 1),
      date: evDate(),
      owner: DB.account.email,
      prototype: true
    };

    (DB.tickets ||= []).push(item);

    UI.ticketId = item.id;

    save();
    App.go('cnk-ref-confirm');
  };


  /* ===== หน้าสรุปบัตร ===== */

  const confirmScreen = () => {
    const t = (DB.tickets || []).find(x =>
      x.id === UI.ticketId
    );

    if (!t) return activity();

    const ev = E(t.event);
    const v = V(ev.venue);

    return `
      <div class="screen ev-success-page">

        ${title('บัตรอีเวนต์', 'บันทึกข้อมูลเรียบร้อย')}

        <div class="pad">

          <div class="ev-success-check">
            ${ic('check', 41)}
          </div>

          <h1>จองบัตรสำเร็จ!</h1>
          <p>ขอบคุณที่ทดลองใช้ CHILL N’ KNOCK</p>

          <div class="ev-success-ticket">

            <div class="ev-success-banner image"
              style="${media(v.image, v.accent)}">

              <b>${e(v.name)}</b>
              <strong>${e(ev.name)}</strong>
            </div>

            <div class="ev-success-inner">
              <div>
                <span>
                  ${ic('calendar', 16)}
                  ${e(dateTh(t.date))}
                </span>

                <span>
                  ${ic('clock', 16)}
                  ${e(ev.time)}
                </span>

                <span>
                  ${ic('pin', 16)}
                  ${e(v.name)} · ${e(areaTh(v.area))}
                </span>

                <span>
                  ${ic('ticket', 16)}
                  ${e(t.tierName)} × ${t.qty}
                </span>

                <b>
                  ยอดรวมจำลอง ${money(t.price)}
                </b>
              </div>

              <div class="ev-fake-qr">
                QR DEMO
                <small>สแกนไม่ได้</small>
              </div>
            </div>

            <div class="ev-ticket-disclaimer">
              ไม่มีการชำระเงินจริง
              และบัตรนี้ไม่สามารถใช้เข้างานได้
            </div>
          </div>

          <div class="ev-ticket-warning">
            ${ic('info', 20)}

            <span>
              เมื่อเชื่อมระบบจริง ร้านหรือผู้จัดงาน
              ต้องออกบัตรที่ตรวจสอบได้ก่อนใช้งาน
            </span>
          </div>

          <button class="btn ghost full"
            onclick="App.go('activity')">
            ${ic('calendar', 17)}
            ดูรายละเอียดในคืนของฉัน
          </button>

          <button class="btn full"
            onclick="App.go('home')">
            กลับสู่หน้าหลัก
          </button>

        </div>
      </div>
    `;
  };


  /* ===== เชื่อมหน้าบัตรเข้ากับ Navigation ===== */

  const previousMain = currentMain;

  currentMain = function () {
    if (
      UI.role === 'user' &&
      UI.screen === 'cnk-ref-ticket'
    ) {
      return ticketScreen();
    }

    if (
      UI.role === 'user' &&
      UI.screen === 'cnk-ref-confirm'
    ) {
      return confirmScreen();
    }

    return previousMain();
  };

  render();

})();


render();
