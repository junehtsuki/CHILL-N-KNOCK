/* CHILL N' KNOCK — Venue Partner UI, scoped module.
 * Based on CHILL_N_KNOCK_BASELINE_v1.0 4(1).zip.
 * Does not replace Guest or Runner renderers. Shared requests remain in DB.requests.
 * Demo state stays in this browser; no real booking, payout, or live notifications.
 */
(function () {
  'use strict';
  if (window.__cnkVPInstalled) return;
  window.__cnkVPInstalled = true;
  window.__cnkVPVersion = 'v3.1-venue-selector-20261110';

  const $ = (s) => document.querySelector(s);
  const safe = (s) => e(s == null ? '' : String(s));
  const venue = () => V(DB.merchantVenue);
  const rs = () => DB.requests.filter(r => r.venue === DB.merchantVenue); // includes Runner QA jobs awaiting venue review
  const vpDate = (date) => date ? new Date(date + 'T12:00:00').toLocaleDateString('th-TH', { day:'numeric',month:'short',year:'numeric' }) : '—';
  const pending = r => ['pending_venue','awaiting_venue'].includes(r.status);
  const confirmed = r => ['confirmed','queue_verified'].includes(r.status) || (r.service === 'runner_pickup' && !!r.cnkBookingApproved);
  const closed = r => ['declined','cancelled'].includes(r.status);
  const serviceText = s => ({direct:'จองโต๊ะโดยตรง',runner_booking:'Runner ช่วยจองล่วงหน้า',runner_pickup:'Runner รับโต๊ะแทน',queue:'Runner ช่วยต่อคิว'})[s] || s;
  const statusText = r => r.service === 'runner_pickup' && r.cnkBookingApproved ? 'ร้านยืนยันการจองแล้ว' : ({pending_venue:'รอตรวจสอบ',awaiting_venue:'รอตรวจสอบ',confirmed:'ยืนยันแล้ว',queue_verified:'ตรวจสอบคิวแล้ว',finding_runner:'รอ Runner',contacting:'Runner ติดต่อร้าน',queuing:'Runner ต่อคิว',cancelled:'ยกเลิก',declined:'ไม่อนุมัติ'})[r.status] || 'กำลังดำเนินการ';
  const normalizeZone = s => /vip/i.test(s||'') ? 'VIP' : /outdoor/i.test(s||'') ? 'Outdoor' : 'Main';
  const gridFor = zone => zone === 'VIP' ? ['V1','V2','V3','V4'] : zone === 'Outdoor' ? ['O1','O2','O3','O4','O5','O6'] : ['A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','C4'];
  const infoFor = () => {
    DB.cnkVPSettings ||= {};
    DB.cnkVPSettings[DB.merchantVenue] ||= {minimum:'',cancel:'การยกเลิกขึ้นอยู่กับเงื่อนไขของร้าน ต้องแจ้งลูกค้าก่อนยืนยันการจอง',phone:'',pickup:true};
    return DB.cnkVPSettings[DB.merchantVenue];
  };
  const tableMap = () => {
    DB.cnkVPTables ||= {};
    DB.cnkVPTables[DB.merchantVenue] ||= {};
    const m = DB.cnkVPTables[DB.merchantVenue];
    // These are preview-only occupied tables; do not claim real inventory.
    if (!m.__seeded) {
      m.__seeded = true;
      m.A3 = 'booked-example';
      m.C2 = 'booked-example';
    }
    return m;
  };
  const hdr = (txt,action='',back=false) => `<header class="cnk-vp-header">
    ${back ? `<button type="button" class="cnk-vp-icon" onclick="App.vpBack()" aria-label="ย้อนกลับ">${ic('back',18)}</button>` : ''}
    <h1>${safe(txt)}</h1>
    <div class="cnk-vp-header-right">${action || `<button type="button" class="cnk-vp-icon" onclick="App.openModal('notifications')" aria-label="แจ้งเตือน">${ic('bell',18)}</button>`}</div>
  </header>`;
  const footnote = () => `<p class="cnk-vp-notice">ข้อมูลต้นแบบในเบราว์เซอร์ · การจอง การยืนยันโต๊ะ และการชำระเงินยังไม่เกิดขึ้นจริง</p>`;
  const layout = (body) => `<div class="screen cnk-vp ${DB.cnkVPFont==='large'?'cnk-vp-large':''}" data-vp-version="v3.1-onyx-preview"><div class="cnk-vp-content">${body}</div></div>`;
  const vSelect = () => `<button type="button" class="cnk-vp-venue-switch" onclick="App.vpToggleVenuePicker()" aria-expanded="${!!UI.vpVenuePicker}" aria-label="เลือกดูร้านตัวอย่าง">${safe(venue().name)} ${ic('chevron',15)}</button>
    ${UI.vpVenuePicker ? `<div class="cnk-vp-venue-picker"><p class="cnk-vp-switch-help">เลือกร้านเพื่อดูข้อมูลสาธิตในเบราว์เซอร์นี้ · ไม่ใช่บัญชีร้านจริง</p><button type="button" class="cnk-vp-demo-reset" onclick="App.vpRestoreOnyxSamples()">คืนคำขอ ONYX ตัวอย่าง 3 รายการ</button>${[...venues].sort((a,b)=>(a.id==='onyx'?-1:b.id==='onyx'?1:0)).map(v => `<button type="button" onclick="App.vpSelectVenue('${v.id}')" class="${v.id===DB.merchantVenue?'active':''}">${safe(v.name)}${v.id==='onyx'?' · พรีวิว ONYX':''}</button>`).join('')}</div>` : ''}`;
  const stat = (n,txt) => `<div class="cnk-vp-stat"><span>${safe(txt)}</span><b>${n}</b></div>`;
  const menuButton = (label,icon,screen) => `<button type="button" class="cnk-vp-menu-shortcut" onclick="App.vpGo('${screen}')">${ic(icon,22)}<span>${safe(label)}</span></button>`;
  // Reference-preview data for ONYX when no actual ONYX pending customer requests exist.
  // Explicitly flagged as sample and never substitutes for a real customer request.
  function seedOnyxDemo() {
    if (UI.role!=='venue' || DB.merchantVenue!=='onyx') return;
    const demoIds=['CKN-VP004','CKN-VP005','CKN-VP006'];
    // Never put fake requests next to actual pending customers.
    if (DB.requests.some(r=>r.venue==='onyx' && r.owner!=='sample' && pending(r))) return;
    if (DB.cnkVPDemoSeeded && demoIds.some(id=>DB.requests.some(r=>r.id===id))) return;
    const seeds=[
      {id:'CKN-VP004',customerName:'leo',service:'runner_booking',guests:6,time:'20:30',seat:'Main',status:'awaiting_venue',runner:true},
      {id:'CKN-VP005',customerName:'beer',service:'runner_pickup',guests:4,time:'22:00',seat:'Outdoor',status:'pending_venue',runner:false,runnerChoice:'r1'},
      {id:'CKN-VP006',customerName:'tiger',service:'direct',guests:2,time:'19:30',seat:'VIP',status:'pending_venue',runner:false}
    ];
    let added=0;
    for(const item of seeds) {
      if(DB.requests.some(r=>r.id===item.id)) continue;
      DB.requests.push({owner:'sample',venue:'onyx',date:dateOffset(1),created:Date.now(),fee:0,note:'ข้อมูลตัวอย่างสำหรับพรีวิว Venue Partner',vpSample:true,...item});
      added++;
    }
    DB.cnkVPDemoSeeded=true;
    if(added) save();
  }
  // Venue-only navigation: return to the exact previous Venue screen and its scroll position.
  App.vpGo = page => {
    if(UI.role!=='venue') return App.go(page);
    if(UI.screen===page) return;
    UI.vpTrail ||= [];
    UI.vpTrail.push({screen:UI.screen,top:window.scrollY||0,phoneTop:document.querySelector('#app>.phone')?.scrollTop||0});
    UI.screen=page;UI.modal='';render();
  };
  App.vpBack = () => {
    if(UI.role!=='venue')return App.back();
    const prior=(UI.vpTrail||[]).pop();
    if(!prior)return App.back();
    UI.screen=prior.screen;UI.modal='';render();
    if(prior)requestAnimationFrame(()=>{window.scrollTo({top:prior.top,behavior:'instant'});const phone=document.querySelector('#app>.phone');if(phone)phone.scrollTop=prior.phoneTop||0;});
  };
  document.addEventListener('click',ev=>{if(UI.role==='venue' && ev.target.closest('#app>.phone>.bottom-nav button'))UI.vpTrail=[];},true);
  const venueRow=(label,icon,page,meta='') => `<button type="button" class="cnk-vp-profile-row" onclick="App.vpGo('${page}')"><span class="cnk-vp-profile-icon">${ic(icon,17)}</span><span>${safe(label)}</span>${meta?`<small>${safe(meta)}</small>`:''}${ic('chevron',16)}</button>`;
  const details = r => `${safe(vpDate(r.date))} · ${safe(r.time || '—')} · ${Number(r.guests)||0} คน · ${safe(r.seat || 'ไม่ระบุโซน')}`;
  function preferredTable(r) {
    if (r.confirmedTable) return r.confirmedTable;
    const zone = normalizeZone(r.seat);
    const map = tableMap();
    return gridFor(zone).find(id => !map[id]) || '';
  }
  function card(r) {
    const can = pending(r);
    const who = r.customerName || r.ownerName || (r.owner === 'sample' ? 'ลูกค้าทดลอง' : (r.owner && r.owner !== 'guest' ? String(r.owner).split('@')[0] : 'ลูกค้า'));
    const suggestion = can && r.service !== 'queue' ? preferredTable(r) : '';
    return `<div class="cnk-vp-request">
      <div class="cnk-vp-request-top"><div class="cnk-vp-avatar">${ic('user',18)}</div><div class="cnk-vp-request-main"><strong>${safe(who)}</strong><p>${safe(r.id)} · ${safe(serviceText(r.service))}</p><p>โต๊ะ ${Number(r.guests)||0} คน · ${safe(r.time || '—')}</p><p>โซน ${safe(r.seat || 'ตามที่ร้านจัดให้')}</p>${r.runnerChoice && r.runnerChoice !== 'none' ? `<p>Runner ที่เลือก: ${safe(r.runnerChoice)}</p>` : ''}</div><span class="cnk-vp-status ${confirmed(r)?'ok':closed(r)?'off':''}">${safe(statusText(r))}</span></div>
      <div class="cnk-vp-request-foot"><span>ขั้นต่ำร้าน: ${safe(infoFor().minimum || 'รอร้านระบุ')} ${suggestion ? `· แนะนำโต๊ะ ${safe(suggestion)} (ตัวอย่าง)` : ''}</span></div>
      ${r.cnkRunnerCancelPending?`<div class="cnk-vp-tip"><strong>Runner ขอถอนตัวจากงาน</strong><p>คำขอยังไม่ถูกยกเลิก โปรดพิจารณาผลกระทบต่อลูกค้าก่อนอนุมัติ</p><div class="cnk-vp-request-buttons"><button class="cnk-vp-secondary" onclick="App.vpResolveRunnerCancel('${safe(r.id)}',false)">ไม่อนุมัติ</button><button class="cnk-vp-primary" onclick="App.vpResolveRunnerCancel('${safe(r.id)}',true)">อนุมัติยกเลิก</button></div></div>`:''}
      ${can ? `<div class="cnk-vp-request-buttons"><button type="button" class="cnk-vp-primary" onclick="App.vpApprove('${safe(r.id)}')">ยืนยัน</button><button type="button" class="cnk-vp-secondary" onclick="App.vpAskDecline('${safe(r.id)}')">ไม่รับคำขอ</button></div>` : `<button type="button" class="cnk-vp-link" onclick="App.openChat('${safe(r.id)}')">${ic('chat',14)} แชตเกี่ยวกับคำขอ</button>`}
    </div>`;
  }
  function home() {
    seedOnyxDemo();
    const all=rs(), review=all.filter(pending), approved=all.filter(confirmed);
    return layout(`<header class="cnk-vp-header cnk-vp-homehead"><div class="cnk-vp-toprow">${vSelect()}</div><button class="cnk-vp-icon" onclick="App.openModal('notifications')" aria-label="แจ้งเตือน">${ic('bell',19)}</button></header>
      <div class="cnk-vp-kpis">${stat(all.length,'คำขอทั้งหมด')}${stat(review.length,'รอดำเนินการ')}${stat(approved.length,'ยืนยันแล้ว')}</div>
      <section class="cnk-vp-section"><h2>ภาพรวมสัปดาห์นี้</h2><div class="cnk-vp-chart-card"><div><span>คำขอจองทั้งหมด</span><b>${all.length}</b><small>จากรายการในต้นแบบ</small></div><svg viewBox="0 0 165 78" aria-label="กราฟคำขอแบบภาพประกอบ"><path d="M0,55 Q25,12 48,47 T90,34 T125,17 T165,26" fill="none" stroke="#E57599" stroke-width="2.4"/><path d="M0,55 Q25,12 48,47 T90,34 T125,17 T165,26 V78 H0 Z" fill="#FBE1EA" opacity=".85"/></svg></div></section>
      <section class="cnk-vp-section"><h2>เมนูด่วน</h2><div class="cnk-vp-shortcuts">${menuButton('จัดการคำขอ','calendar','venue-requests')}${menuButton('จัดการโต๊ะ','users','venue-tables')}${menuButton('อีเวนต์','ticket','venue-events')}</div></section>
      ${review.length?`<section class="cnk-vp-section"><div class="cnk-vp-spread"><h2>คำขอที่รอดำเนินการ</h2><button type="button" onclick="App.vpGo('venue-requests')">ดูทั้งหมด ${ic('chevron',13)}</button></div>${review.slice().reverse().slice(0,1).map(card).join('')}</section>`:''}
      ${footnote()}`);
  }
  function requests() {
    seedOnyxDemo();
    const items=rs(), tab=UI.vpRequestTab||'pending';
    const groups={pending:items.filter(pending),confirmed:items.filter(confirmed),history:items.filter(r=>closed(r)||(!pending(r)&&!confirmed(r)))};
    const tabs=[['pending','รอดำเนินการ'],['confirmed','ยืนยันแล้ว'],['history','ประวัติ']];
    return layout(`${hdr('จัดการคำขอจองโต๊ะ')}<div class="cnk-vp-tabs">${tabs.map(([id,txt])=>`<button type="button" class="${id===tab?'active':''}" onclick="App.vpSetRequestTab('${id}')">${txt}${id==='pending'&&groups.pending.length?` (${groups.pending.length})`:''}</button>`).join('')}</div>
      <div class="cnk-vp-request-list">${groups[tab].length?groups[tab].slice().reverse().map(card).join(''):`<div class="cnk-vp-empty">ไม่มีคำขอในหมวดนี้<small>คำขอของ ${safe(venue().name)} จะแสดงที่นี่</small></div>`}</div>${footnote()}`);
  }
  function tables() {
    const map=tableMap(),zone=UI.vpTableZone||'Main',tabs=[['Main',12],['VIP',4],['Outdoor',6]];
    return layout(`${hdr('จัดการโต๊ะ',`<button class="cnk-vp-icon" onclick="App.vpToggleTableHelp()" aria-label="คำอธิบายโต๊ะ">${ic('info',18)}</button>`,true)}
      ${UI.vpTableHelp?`<div class="cnk-vp-tip">แตะโต๊ะเพื่อเปลี่ยนสถานะ โต๊ะที่ยืนยันแล้วต้องจัดการผ่านคำขอ</div>`:''}
      <div class="cnk-vp-tabs">${tabs.map(([z,n])=>`<button type="button" class="${z===zone?'active':''}" onclick="App.vpSetTableZone('${z}')">${z} (${n})</button>`).join('')}</div>
      <div class="cnk-vp-table-card"><div class="cnk-vp-table-grid">${gridFor(zone).map(id=>{const state=map[id]||'free';return `<button type="button" class="cnk-vp-table ${state==='free'?'free':state==='booked-example'||state==='booked'?'example':'unavailable'}" onclick="App.vpChangeTable('${id}')"><b>${id}</b>${state==='booked-example'?'<small>(จองแล้ว*)</small>':''}${state==='booked'?'<small>(ยืนยันแล้ว)</small>':''}</button>`}).join('')}</div>
      <button type="button" class="cnk-vp-primary cnk-vp-full cnk-vp-table-save" onclick="App.vpSaveTables()">${ic('check',17)} บันทึกผังโต๊ะ</button>
      <div class="cnk-vp-table-legend"><span><i class="free"></i> ว่าง</span><span><i class="example"></i> จองแล้ว</span><span><i class="unavailable"></i> ปิดให้จอง</span></div>
      <p>* ผังนี้เป็นข้อมูลต้นแบบ ไม่ใช่การยืนยันโต๊ะว่างจริงของร้าน</p></div>${footnote()}`);
  }
  function eventPoster(ev) {
    const source=ev.posterData||ev.imageData||(ev.id==='e1'?'assets/events/e1.jpg':`assets/events/${ev.id}.jpg`);
    return `<img src="${safe(source)}" alt="โปสเตอร์ ${safe(ev.name)}" onerror="this.onerror=null;this.src='assets/events/e1.jpg'">`;
  }
  function eventPage() {
    const list=events.filter(ev=>ev.venue===DB.merchantVenue);
    const today=new Date();today.setHours(0,0,0,0);
    const upcoming=list.filter(ev=>new Date((ev.date||dateOffset(ev.offset||0))+'T12:00:00')>=today);
    const past=list.filter(ev=>!upcoming.includes(ev));
    const tab=UI.vpEventTab||'upcoming',chosen=tab==='upcoming'?upcoming:past;
    return layout(`${hdr('อีเวนต์',`<button type="button" class="cnk-vp-icon cnk-vp-event-plus" onclick="App.vpGo('venue-event-new')" aria-label="สร้างอีเวนต์ใหม่">${ic('plus',22)}</button>`)}
      <div class="cnk-vp-tabs cnk-vp-tabs-wide"><button type="button" class="${tab==='upcoming'?'active':''}" onclick="App.vpEventTab('upcoming')">กำลังจะถึง</button><button type="button" class="${tab==='past'?'active':''}" onclick="App.vpEventTab('past')">ที่ผ่านมา</button></div>
      <div class="cnk-vp-events-list">${chosen.length?chosen.map(ev=>`<article class="cnk-vp-event">${eventPoster(ev)}<div><strong>${safe(ev.name)}</strong><span>${vpDate(ev.date||dateOffset(ev.offset||0))}</span><small>${safe(ev.subtitle||'Live Music')} · ${safe(ev.time||'21:00')}</small></div><span class="cnk-vp-status ok">เผยแพร่</span></article>`).join(''):`<div class="cnk-vp-empty">ยังไม่มีอีเวนต์ในหมวดนี้</div>`}
      <button type="button" class="cnk-vp-event-add-inline" onclick="App.vpGo('venue-event-new')">${ic('plus',17)} สร้างอีเวนต์ใหม่</button></div>${footnote()}`);
  }
  function eventNew() {
    return layout(`${hdr('สร้างอีเวนต์ใหม่','',true)}<div class="cnk-vp-form cnk-vp-event-form">
      <div class="cnk-vp-poster-row"><div class="cnk-vp-poster-preview"><img id="vp-poster-preview" src="${safe(UI.vpPosterData||'assets/events/e1.jpg')}" alt="ตัวอย่างโปสเตอร์อีเวนต์"><button type="button" class="cnk-vp-poster-clear" onclick="App.vpClearPoster()" aria-label="ล้างโปสเตอร์">${ic('x',14)}</button></div>
      <label class="cnk-vp-poster-upload" for="vp-event-poster">${ic('camera',25)}<strong>อัปโหลดโปสเตอร์</strong><small>JPG, PNG<br>ขนาดไม่เกิน 10 MB</small><input id="vp-event-poster" type="file" accept="image/jpeg,image/png" onchange="App.vpPosterSelected(this)" hidden></label></div>
      <label>ชื่ออีเวนต์ <span class="cnk-vp-required">*</span><input id="vp-event-name" maxlength="70" placeholder="เช่น ONYX Throwback 90s" required></label>
      <label>วันที่จัดงาน <span class="cnk-vp-required">*</span><input id="vp-event-date" type="date" min="${dateOffset(0)}" value="${dateOffset(1)}" required></label>
      <label>ประเภท<select id="vp-event-type"><option value="Live Music">Live Music</option><option value="DJ Event">DJ Event</option><option value="Party">Party</option><option value="Other">Other</option></select></label>
      <label>เวลาเริ่มงาน<input id="vp-event-time" type="time" value="21:00"></label>
      <label>รายละเอียด<textarea id="vp-event-desc" maxlength="350" placeholder="รายละเอียดอีเวนต์ / ศิลปิน / เงื่อนไข"></textarea></label>
      <button type="button" class="cnk-vp-primary cnk-vp-full cnk-vp-create-submit" onclick="App.vpCreateEvent()">สร้างอีเวนต์</button>
      <p class="cnk-vp-form-disclaimer">รายการที่สร้างเป็นข้อมูลในเบราว์เซอร์นี้ ยังไม่เปิดขายบัตรจริง</p>
    </div>`);
  }
  function settingsPage() {
    const v=venue(),conf=infoFor(),pend=rs().filter(pending).length;
    return layout(`<header class="cnk-vp-header"><h1>โปรไฟล์ร้านพาร์ตเนอร์</h1><div class="cnk-vp-header-right"><button class="cnk-vp-icon" onclick="App.openModal('notifications')" aria-label="แจ้งเตือน">${ic('bell',18)}</button><button class="cnk-vp-icon" onclick="App.vpGo('venue-personal')" aria-label="ข้อมูลส่วนตัว">${ic('user',18)}</button></div></header>
      <section class="cnk-vp-profile-hero"><img src="${safe(DB.merchantVenue==='onyx'?'assets/venues/onyx.jpg':(v.image||'assets/venues/onyx.jpg'))}" onerror="this.onerror=null;this.src='assets/venues/onyx.jpg'" alt="ภาพ ${safe(v.name)}"><div><small>VENUE PARTNER</small><strong>${safe(v.name)}</strong><span>รหัสร้านในต้นแบบ · VN-014</span></div><span class="cnk-vp-profile-enabled">${ic('check',12)} เปิดใช้งานทดลอง</span></section>
      <div class="cnk-vp-profile-summary"><span>${ic('pin',15)}<b>ที่ตั้งร้าน</b><small>${safe(v.area||'ไม่ระบุ')}</small></span><span>${ic('clock',15)}<b>เวลาเปิด–ปิด</b><small>${safe(conf.hours||'ยังไม่ได้ตั้งค่า')}</small></span><span>${ic('chat',15)}<b>เบอร์ติดต่อ</b><small>${safe(conf.phone||'ยังไม่ได้ตั้งค่า')}</small></span></div>
      <h2 class="cnk-vp-profile-heading">จัดการร้าน</h2><div class="cnk-vp-profile-rows">${venueRow('คำขอจองโต๊ะ','calendar','venue-requests',pend+' รายการ')}${venueRow('การจัดการคิว','users','venue-queue')}${venueRow('นโยบายและบริการของร้าน','sliders','venue-policies')}${venueRow('ภาพรวมการดำเนินงาน','chart','venue-insights')}</div>
      <h2 class="cnk-vp-profile-heading">การตั้งค่าบัญชี</h2><div class="cnk-vp-profile-rows">${venueRow('แก้ไขข้อมูลส่วนตัว','user','venue-personal')}${venueRow('การแจ้งเตือน','bell','venue-notifications')}${venueRow('ขนาดตัวอักษร','info','venue-font')}${venueRow('ศูนย์ช่วยเหลือ','help','venue-help')}${venueRow('ข้อมูลและความเป็นส่วนตัว','shield','venue-privacy')}</div>
      <button type="button" class="cnk-vp-logout" onclick="App.vpLogout()">${ic('logout',17)} ออกจากระบบ</button>${footnote()}`);
  }
  function policyPage() {
    const p=DB.policies[DB.merchantVenue]||{},conf=infoFor();
    const toggle=(label,key)=>`<div class="cnk-vp-settings-row"><strong>${label}</strong><button class="cnk-vp-toggle ${p[key]?'on':''}" aria-pressed="${!!p[key]}" onclick="App.vpTogglePolicy('${key}')"><i></i></button></div>`;
    return layout(`${hdr('นโยบายและบริการของร้าน','',true)}<div class="cnk-vp-settings-list">${toggle('การจองผ่าน Runner','runner')}${toggle('การช่วยเข้าคิว','queue')}${toggle('จองโต๊ะโดยตรง','direct')}
      ${venueRow('ขั้นต่ำการใช้จ่าย','wallet','venue-minimum',conf.minimum||'')}${venueRow('นโยบายการยกเลิก','shield','venue-cancel-policy')}${venueRow('บัญชีรับเงิน (Payout)','wallet','venue-payout')}${venueRow('ข้อมูลร้านและเวลาทำการ','info','venue-info')}</div>${footnote()}`);
  }
  function optionPage(kind) {
    const v=venue(),conf=infoFor();
    const common={
      minimum:['ขั้นต่ำการใช้จ่าย',`<label>ขั้นต่ำโดยประมาณของร้าน<input id="vp-minimum" maxlength="35" placeholder="เช่น ฿5,000 ต่อโต๊ะ" value="${safe(conf.minimum)}"></label><button class="cnk-vp-primary cnk-vp-full" onclick="App.vpSaveMinimum()">บันทึกข้อมูล</button>`],
      cancel:['นโยบายการยกเลิก',`<label>เงื่อนไขการยกเลิก<textarea id="vp-cancel-policy" maxlength="550">${safe(conf.cancel)}</textarea></label><button class="cnk-vp-primary cnk-vp-full" onclick="App.vpSaveCancelPolicy()">บันทึกนโยบาย</button>`],
      info:['ข้อมูลร้าน',`<div class="cnk-vp-info-card"><strong>${safe(v.name)}</strong><p>${safe(v.area)} · ${safe(v.kind)}</p><p>${safe(v.place||'ยังไม่ระบุที่อยู่')}</p></div><label>เวลาทำการ<input id="vp-hours" maxlength="35" placeholder="เช่น 20:00 – 02:00" value="${safe(conf.hours||'')}"></label><label>เบอร์ติดต่อ<input id="vp-phone" inputmode="tel" maxlength="25" placeholder="ใส่เบอร์ติดต่อร้าน" value="${safe(conf.phone||'')}"></label><button class="cnk-vp-primary cnk-vp-full" onclick="App.vpSaveVenueInfo()">บันทึกข้อมูล</button>`],
      payout:['บัญชีรับเงิน (Payout)',`<div class="cnk-vp-info-card"><strong>ยังไม่มีการโอนเงินจริง</strong><p>ยอดค่าบริการจาก Runner และเงินประกันเป็นข้อมูลต้นแบบ ยังไม่เชื่อมบัญชีธนาคารจริง</p></div>`],
      personal:['แก้ไขข้อมูลส่วนตัว',`<label>ชื่อที่แสดง<input id="vp-personal-name" maxlength="50" value="${safe(DB.name||'Venue Partner')}"></label><button class="cnk-vp-primary cnk-vp-full" onclick="App.vpSavePersonal()">บันทึก</button>`],
      notifications:['การแจ้งเตือน',`<div class="cnk-vp-settings-row"><strong>การแจ้งเตือนคำขอใหม่</strong><button class="cnk-vp-toggle ${conf.alerts!==false?'on':''}" onclick="App.vpToggleAlerts()" aria-pressed="${conf.alerts!==false}"><i></i></button></div><p class="cnk-vp-tip">การแจ้งเตือนอยู่ภายในต้นแบบ ยังไม่มี Push Notification ข้ามอุปกรณ์</p>`],
      font:['ขนาดตัวอักษร',`<div class="cnk-vp-font-choices"><button class="${DB.cnkVPFont!=='large'?'active':''}" onclick="App.vpFont('standard')">ปกติ</button><button class="${DB.cnkVPFont==='large'?'active':''}" onclick="App.vpFont('large')">ขนาดใหญ่</button></div>`],
      help:['ศูนย์ช่วยเหลือ',`<div class="cnk-vp-info-card"><strong>ช่วยเหลือการใช้งาน Venue Partner</strong><p>การจัดการคำขอ: ยืนยันหรือไม่รับ พร้อมเหตุผล</p><p>การจัดการโต๊ะ: แตะสถานะแล้วกดบันทึก</p><p>อีเวนต์: เลือกโปสเตอร์ กรอกข้อมูล และสร้างอีเวนต์ในต้นแบบ</p></div>`],
      privacy:['ข้อมูลและความเป็นส่วนตัว',`<div class="cnk-vp-info-card"><strong>ข้อมูลภายในต้นแบบ</strong><p>คำขอ การยืนยัน อีเวนต์ และรูปที่อัปโหลดถูกเก็บในเบราว์เซอร์นี้ ไม่ได้แชร์ข้ามเครื่องหรือส่งข้อมูลไปยังระบบร้านจริง</p><p>ควรปกป้องข้อมูลลูกค้าและกำหนดสิทธิ์ก่อนเปิดบริการจริง</p></div>`],
      insights:['ภาพรวมการดำเนินงาน',`<div class="cnk-vp-info-card"><strong>คำขอทั้งหมด ${rs().length} รายการ</strong><p>รอดำเนินการ ${rs().filter(pending).length} รายการ · ยืนยันแล้ว ${rs().filter(confirmed).length} รายการ</p><p>ข้อมูลนี้เป็นตัวเลขจากเบราว์เซอร์ปัจจุบัน ไม่ใช่ยอดจองจริงจากร้าน</p></div>`]
    };
    const [title,body]=common[kind]||common.info;
    return layout(`${hdr(title,'',true)}<div class="cnk-vp-form cnk-vp-option-form">${body}</div>${footnote()}`);
  }
  function venueScreen() {
    switch(UI.screen) {
      case 'home': return home();
      case 'venue-requests': return requests();
      case 'venue-queue': return layout(`${hdr('การจัดการคิว','',true)}<div class="cnk-vp-request-list">${rs().filter(r=>r.service==='queue').length?rs().filter(r=>r.service==='queue').map(card).join(''):'<div class="cnk-vp-empty">ยังไม่มีคำขอช่วยต่อคิว</div>'}</div>${footnote()}`);
      case 'venue-tables': return tables();
      case 'venue-events': return eventPage();
      case 'venue-event-new': return eventNew();
      case 'venue-settings': case 'profile': return settingsPage();
      case 'venue-policies': return policyPage();
      case 'venue-info': return optionPage('info');
      case 'venue-minimum': return optionPage('minimum');
      case 'venue-cancel-policy': return optionPage('cancel');
      case 'venue-payout': return optionPage('payout');
      case 'venue-personal': return optionPage('personal');
      case 'venue-notifications': return optionPage('notifications');
      case 'venue-font': return optionPage('font');
      case 'venue-help': return optionPage('help');
      case 'venue-privacy': return optionPage('privacy');
      case 'venue-insights': return optionPage('insights');
      default:return null;
    }
  }
  // Hook Venue pages, and show confirmed venue terms in the Guest booking review only.
  // Never rewrite, replace, or restyle any Runner screen.
  const oldMain = currentMain;
  currentMain = function () {
    if (UI.role === 'venue') { const page=venueScreen(); if (page !== null) return page; }
    const html=oldMain();
    if (UI.role==='user' && UI.screen==='booking-review') {
      const conf=DB.cnkVPSettings?.[UI.venue];
      if (conf && (conf.minimum || conf.cancel)) {
        const notice=`<div class="cnk-vp-guest-policy"><b>ข้อมูลเงื่อนไขจากร้าน (ต้นแบบ)</b>${conf.minimum?`<p>ขั้นต่ำการใช้จ่าย: ${safe(conf.minimum)}</p>`:''}${conf.cancel?`<p>การยกเลิก: ${safe(conf.cancel)}</p>`:''}</div>`;
        return html.replace('<div class="pad">','<div class="pad">'+notice);
      }
    }
    return html;
  };
  const oldNav = navItems;
  navItems = function () { return UI.role === 'venue' ? [['home','หน้าหลัก','home'],['venue-requests','คำขอ','calendar'],['venue-tables','โต๊ะ','users'],['venue-events','อีเวนต์','ticket'],['venue-settings','โปรไฟล์','user']] : oldNav(); };

  // Venue-only request decision sheets; Guest and Runner keep their original modal handler.
  const previousModal=modal;
  modal=function () {
    if(UI.role==='venue' && UI.vpDeclineId){
      const r=requestById(UI.vpDeclineId);
      return `<div class="cnk-vp-action-backdrop" role="dialog" aria-modal="true" aria-label="ไม่รับคำขอ">
        <div class="cnk-vp-action-modal"><div class="cnk-vp-action-symbol denied">${ic('x',28)}</div><h2>ไม่รับคำขอ</h2>
        <p>กรุณาเลือกเหตุผล เพื่อแจ้งผลให้ลูกค้าทราบ</p>
        <label>เหตุผลในการไม่รับคำขอ<select id="vp-decline-reason"><option>โต๊ะในโซนที่ต้องการเต็มแล้ว</option><option>ช่วงเวลาที่ขอไม่พร้อมให้บริการ</option><option>ไม่สามารถดำเนินการตามเงื่อนไขการจองได้</option><option>เหตุผลอื่น</option></select></label>
        <div class="cnk-vp-action-actions"><button type="button" class="cnk-vp-secondary" onclick="App.vpCloseDecline()">ย้อนกลับ</button><button type="button" class="cnk-vp-primary" onclick="App.vpConfirmDecline()">ยืนยันไม่รับคำขอ</button></div></div></div>`;
    }
    if(UI.role==='venue' && UI.vpFeedback){
      const yes=UI.vpFeedback.type==='approved';
      return `<div class="cnk-vp-action-backdrop" role="dialog" aria-modal="true" aria-label="ผลการจัดการคำขอ"><div class="cnk-vp-action-modal">
        <div class="cnk-vp-action-symbol ${yes?'approved':'denied'}">${ic(yes?'check':'x',30)}</div>
        <h2>${yes?'ยืนยันคำขอสำเร็จ':'ไม่รับคำขอสำเร็จ'}</h2>
        <p>${yes?'ระบบอัปเดตสถานะในคำขอเดิมแล้ว ลูกค้าและ Runner (หากใช้บริการ) จะเห็นสถานะในต้นแบบ':'ระบบอัปเดตเหตุผลและสถานะให้คำขอของลูกค้าแล้ว'}</p>
        <button type="button" class="cnk-vp-primary cnk-vp-full" onclick="App.vpCloseFeedback()">ตกลง</button></div></div>`;
    }
    return previousModal();
  };
  App.vpAskDecline=id=>{const r=requestById(id);if(!r||r.venue!==DB.merchantVenue||!pending(r))return toast('ไม่พบคำขอรอตรวจสอบ');UI.vpDeclineId=id;render(true);};
  App.vpCloseDecline=()=>{UI.vpDeclineId='';render(true);};
  App.vpConfirmDecline=()=>{const r=requestById(UI.vpDeclineId);if(!r||r.venue!==DB.merchantVenue||!pending(r))return App.vpCloseDecline();
    r.decisionNote=($('#vp-decline-reason')?.value||'ร้านไม่สามารถรับคำขอนี้ได้').trim().slice(0,250);
    r.status='declined';r.progressNote=[r.progressNote,'ร้านไม่รับคำขอ: '+r.decisionNote].filter(Boolean).join(' · ');
    save();notify('ร้านไม่รับคำขอ '+r.id);UI.vpDeclineId='';UI.vpFeedback={type:'declined'};render(true);
  };
  App.vpCloseFeedback=()=>{UI.vpFeedback=null;render(true);};
  // For pickup only, first send the guest's new booking to Venue for approval.
  // Once approved, the same request moves to finding_runner (selected Runner), not a duplicated job.
  const priorGuestSubmit = App.submitBooking;
  App.submitBooking = function (...args) {
    const previousIds=new Set(DB.requests.map(r=>r.id));
    const value=priorGuestSubmit.apply(this,args);
    const r=requestById(UI.reqId);
    if(r && !previousIds.has(r.id) && r.service==='runner_pickup' && r.status==='finding_runner' && !r.cnkBookingApproved) {
      r.status='pending_venue';
      r.progressNote='ส่งคำขอจองให้ร้านตรวจสอบแล้ว · รอร้านยืนยันก่อนมอบหมายงานรับโต๊ะให้ Runner';
      save();
      if(UI.screen==='receipt')render(true);
    }
    return value;
  };

  // Local interactive prototype only: allow explicit demo-venue selection from the Venue screen.
  // This does not change the registered venueId on a partner application or any real account.
  App.vpToggleVenuePicker = () => { if (UI.role !== 'venue') return; UI.vpVenuePicker=!UI.vpVenuePicker;render(true); };
  App.vpSelectVenue = id => {
    if (UI.role !== 'venue') return;
    if (!venues.some(v=>v.id===id)) return;
    DB.merchantVenue=id; // Selected demo view stored locally; no real server-side privileges.
    UI.vpVenuePicker=false;UI.vpRequestTab='pending';UI.vpEventTab='upcoming';UI.vpTrail=[];
    save();render(true);toast('กำลังดูร้าน '+V(id).name+' ในต้นแบบ');
  };
  App.vpRestoreOnyxSamples = () => {
    if (UI.role !== 'venue') return;
    const sampleIds = new Set(['CKN-VP004','CKN-VP005','CKN-VP006']);
    // Reset only these flagged demo entries; NEVER delete a customer-created request.
    DB.requests = DB.requests.filter(r => !(r.vpSample === true && sampleIds.has(r.id)));
    DB.cnkVPDemoSeeded = false;
    DB.merchantVenue = 'onyx';
    UI.vpVenuePicker=false; UI.vpRequestTab='pending'; UI.vpEventTab='upcoming';
    seedOnyxDemo(); save(); render(true);
    toast('คืนคำขอ ONYX ตัวอย่างแล้ว · ไม่ได้ลบคำขอจริง');
  };
  App.vpSetRequestTab = id => {if (!['pending','confirmed','history'].includes(id)) return; UI.vpRequestTab=id;render(true);};
  App.vpSetTableZone = zone => {if (!['Main','VIP','Outdoor'].includes(zone))return;UI.vpTableZone=zone;render(true);};
  App.vpToggleTableHelp = () => {UI.vpTableHelp=!UI.vpTableHelp;render(true);};
  App.vpChangeTable = id => {const zone=UI.vpTableZone||'Main';if(!gridFor(zone).includes(id))return;const m=tableMap();if(m[id]==='booked')return toast('โต๊ะนี้ผูกกับคำขอที่ยืนยันแล้ว กรุณาจัดการผ่านรายการคำขอ');if(m[id]==='blocked'||m[id]==='booked-example')delete m[id];else m[id]='blocked';save();render(true);};
  App.vpSaveTables = () => {save();toast('บันทึกสถานะโต๊ะในต้นแบบแล้ว');};
  App.vpApprove = id => {
    if (UI.role !== 'venue' && !(typeof QA !== 'undefined' && QA)) return toast('เฉพาะร้านพาร์ตเนอร์');
    const r=requestById(id); if (!r || r.venue!==DB.merchantVenue || !pending(r)) return toast('คำขอไม่ได้อยู่ในสถานะรอร้านตรวจสอบ');
    const table = r.service==='queue'?'':preferredTable(r);
    if (r.service!=='queue' && !table) return toast('โต๊ะโซนที่ลูกค้าต้องการเต็ม กรุณาเปลี่ยนสถานะโต๊ะก่อนยืนยัน');
    if (table) {tableMap()[table]='booked';r.confirmedTable=table;}
    r.cnkVenueConfirmedAt=Date.now();
    r.cnkBookingRef ||= 'DEMO-' + String(r.id).replace(/[^A-Za-z0-9]/g,'').slice(-10);
    r.cnkPickupRef ||= r.cnkBookingRef; // existing Runner job detail reads this key
    r.progressNote = [r.progressNote,`ร้านยืนยันคำขอจำลอง · ${table?'โต๊ะ '+table+' · ':''}รหัส ${r.cnkBookingRef}`].filter(Boolean).join(' · ');
    // In pickup, venue confirms the booking BEFORE runner assignment. Runner then sees the job.
    if (r.service==='runner_pickup' && !r.runner) {
      r.cnkBookingApproved=true;
      r.status='finding_runner';
      save();notify('ร้านยืนยันการจองตัวอย่าง '+r.id+' แล้ว · รอ Runner ที่ลูกค้าเลือกไปรับโต๊ะแทน');
      UI.vpRequestTab='confirmed';UI.vpFeedback={type:'approved'};render(true);return;
    }
    r.status = r.service==='queue'?'queue_verified':'confirmed';
    save();notify('ร้านยืนยันคำขอจำลอง '+r.id+' · '+venue().name);UI.vpRequestTab='confirmed';UI.vpFeedback={type:'approved'};render(true);
  };
  App.vpResolveRunnerCancel = (id,approve) => {
    const r=requestById(id);
    if(!r || r.venue!==DB.merchantVenue || !r.cnkRunnerCancelPending || UI.role!=='venue')return;
    r.cnkRunnerCancelPending=false;
    if(approve) {
      r.status='cancelled';r.cnkNeedsGuestReselect=true;r.runner=false;
      r.decisionNote='ร้านอนุมัติคำขอยกเลิกของ Runner ในระบบทดลอง ลูกค้าสามารถเลือก Runner ใหม่';
    }else {r.decisionNote='ร้านไม่อนุมัติคำขอยกเลิกในระบบทดลอง';}
    save();notify('ร้านพิจารณาคำขอยกเลิกของ Runner '+r.id);render(true);
  };
  App.vpTogglePolicy = id => {if (!['runner','queue'].includes(id))return;const p=DB.policies[DB.merchantVenue];p[id]=!p[id];save();notify('ตั้งค่าร้าน (จำลอง): '+id);render(true);};
  App.vpSaveMinimum = () => {infoFor().minimum=($('#vp-minimum')?.value||'').trim().slice(0,35);save();toast('บันทึกขั้นต่ำร้านในระบบทดลองแล้ว');};
  App.vpSaveCancelPolicy = () => {infoFor().cancel=($('#vp-cancel-policy')?.value||'').trim().slice(0,550);save();toast('บันทึกนโยบายต้นแบบแล้ว');};
  App.vpEventTab = tab => {if(!['upcoming','past'].includes(tab))return;UI.vpEventTab=tab;render(true);};
  App.vpPosterSelected = input => {
    const file=input?.files?.[0];if(!file)return;
    if(!['image/jpeg','image/png'].includes(file.type)||file.size>10*1024*1024){input.value='';return toast('ใช้ภาพ JPG หรือ PNG ขนาดไม่เกิน 10 MB');}
    const reader=new FileReader();
    reader.onload=()=>{
      const img=new Image();
      img.onload=()=>{
        const ratio=Math.min(1,800/img.width,1000/img.height),canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.round(img.width*ratio));canvas.height=Math.max(1,Math.round(img.height*ratio));
        const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
        UI.vpPosterData=canvas.toDataURL('image/jpeg',.75);
        const preview=document.getElementById('vp-poster-preview');if(preview)preview.src=UI.vpPosterData;
        // Update the preview without rerendering so typed event details are preserved.
      };
      img.onerror=()=>toast('ไม่สามารถอ่านไฟล์รูปภาพนี้ได้');img.src=reader.result;
    };
    reader.onerror=()=>toast('อ่านรูปไม่สำเร็จ กรุณาเลือกใหม่');reader.readAsDataURL(file);
  };
  App.vpClearPoster = () => {UI.vpPosterData='';const img=$('#vp-poster-preview');if(img)img.src='assets/events/e1.jpg';const file=$('#vp-event-poster');if(file)file.value='';toast('ล้างภาพที่เลือกแล้ว');};
  App.vpCreateEvent = () => {
    const name=($('#vp-event-name')?.value||'').trim(),date=$('#vp-event-date')?.value,time=$('#vp-event-time')?.value||'21:00',desc=($('#vp-event-desc')?.value||'').trim(),kind=$('#vp-event-type')?.value||'Live Music';
    if(!name||!date||!time)return toast('กรุณากรอกชื่อ วัน และเวลา');
    if(date<dateOffset(0))return toast('กรุณาเลือกวันที่วันนี้หรือหลังจากนี้');
    if(!UI.vpPosterData)return toast('กรุณาอัปโหลดโปสเตอร์ก่อนสร้างอีเวนต์');
    DB.cnkVPEvents ||= [];
    const id='vp'+Date.now();
    const ev={id,name,venue:DB.merchantVenue,date,time,subtitle:kind,price:0,art:'poster-bg1',posterData:UI.vpPosterData,label:kind,tag:'New',desc:desc||'รายละเอียดกิจกรรมของร้าน',offset:Math.max(0,Math.round((new Date(date+'T12:00:00')-new Date(dateOffset(0)+'T12:00:00'))/86400000))};
    DB.cnkVPEvents.push(ev);events.push(ev);
    UI.vpPosterData='';UI.vpEventTab='upcoming';
    save();App.vpBack();toast('สร้างอีเวนต์ในระบบทดลองแล้ว');
  };
  App.vpSaveVenueInfo=()=>{const v=infoFor();v.hours=($('#vp-hours')?.value||'').trim().slice(0,35);v.phone=($('#vp-phone')?.value||'').trim().slice(0,25);save();toast('บันทึกข้อมูลร้านแล้ว');};
  App.vpSavePersonal=()=>{const v=($('#vp-personal-name')?.value||'').trim();if(!v)return toast('กรุณาระบุชื่อ');DB.name=v;save();toast('บันทึกชื่อแล้ว');};
  App.vpToggleAlerts=()=>{const v=infoFor();v.alerts=v.alerts===false;save();render(true);};
  App.vpFont=size=>{DB.cnkVPFont=size==='large'?'large':'standard';save();render(true);};
  App.vpLogout=()=>{UI.vpTrail=[];if(typeof App.signOut==='function')App.signOut();else App.switchRole('user');};
  // Restore venue-created events after refresh so User's Events and Venue events use the same source.
  for (const ev of (DB.cnkVPEvents||[])) if (ev && ev.id && !events.some(x=>x.id===ev.id)) events.push(ev);
  render();
})();
