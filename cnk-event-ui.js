/* FIX 08 — Event Detail → Ticket Selection → Demo Ticket Confirmation.
   Load AFTER upgrade.js. Works on CHILL_N_KNOCK_ContentFix_v1.1.
   All tickets/QR are clearly non-redeemable browser-local prototypes. */
(() => {
  'use strict';
  const money = n => '฿' + Number(n).toLocaleString('th-TH');
  const thaiDate = iso => new Intl.DateTimeFormat('th-TH', {
    day:'numeric', month:'short', year:'numeric'
  }).format(new Date(iso + 'T12:00:00'));
  const getEvent = () => E(UI.event);
  const cover = ev => `assets/events/${ev.id}.jpg`;
  const image = (ev,cls='') => `<img class="${cls}" src="${cover(ev)}" onerror="this.onerror=null;this.src='assets/club.jpg'" alt="ภาพประกอบอีเวนต์ ${e(ev.name)}">`;
  const info = ev => ({v:V(ev.venue), date:ev.date || dateOffset(ev.offset), end: ev.endTime || '02:00'});  const types = ev => Array.isArray(ev.ticketTiers) && ev.ticketTiers.length ? ev.ticketTiers : [
    {id:'early', name:'Early Bird', price:500, info:['เข้างานได้ 1 คน','จำนวนจำกัด'], recommended:true},
    {id:'regular', name:'Regular', price:700, info:['เข้างานได้ 1 คน','เข้างานได้ตลอดทั้งคืน']},
    {id:'vip', name:'VIP Entry', price:1500, info:['เข้างานได้ 1 คน','ทางเข้า VIP','ใช้โซน VIP Lounge (ตัวอย่าง)']}
  ];
  const chosen = ev => types(ev).find(t=>t.id===UI.cnkTicketType) || types(ev)[0];
  const evHeader = (title,subtitle='') => `<div class="cnk-ev-head"><button class="cnk-ev-back" aria-label="ย้อนกลับ" onclick="App.back()">${ic('back',22)}</button><div><b>${e(title)}</b><small>${e(subtitle)}</small></div></div>`;

  
  eventDetail = function () {
    const ev=getEvent(), {v,date,end}=info(ev);
    return `<div class="screen cnk-ev-screen">
      <div class="cnk-ev-hero">
        ${image(ev,'cnk-ev-hero-photo')}
        <div class="cnk-ev-darken"></div>
        <div class="cnk-ev-toolbar">
          <button aria-label="ย้อนกลับ" onclick="App.back()">${ic('back',22)}</button>
          <div><button aria-label="บันทึกร้าน" onclick="App.toggleFav('${v.id}')">${ic('heart',21)}</button>
          <button aria-label="แชร์อีเวนต์" onclick="App.shareEvent('${ev.id}')">${ic('share',21)}</button></div>
        </div>
        <div class="cnk-ev-hero-txt"><span class="cnk-ev-type">${e(ev.label||'DJ Event')}</span>
          <h1>${e(ev.name)}</h1><p>${ic('pin',15)} ${e(v.name)} · ${e(v.area)} · กรุงเทพฯ</p></div>
      </div>
      <div class="cnk-ev-meta"><span>${ic('calendar',17)} ${e(thaiDate(date))}</span>
        <span>${ic('clock',17)} ${e(ev.timeNote||(end==='Late'?ev.time+' น. เป็นต้นไป':ev.time+'–'+end+' น.'))}</span></div>
      <div class="cnk-ev-panel">
        <h2>เกี่ยวกับอีเวนต์</h2><p>${e(ev.desc)}</p>
        ${ev.ticketInfo?`<p class="cnk-ev-disclosure">${e(ev.ticketInfo)}</p>`:''}
        ${Array.isArray(ev.lineup)&&ev.lineup.length?`
        <h2>${ev.lineup.length===1?'ศิลปินที่แสดง':'ไลน์อัป'}</h2>
        <div class="cnk-ev-lineup"><span class="cnk-ev-artist">${ic('music',27)}</span>
          <div><b>${e(ev.lineup.join(' · '))}</b><small>${e(ev.lineupNote||'โปรดตรวจสอบกับผู้จัดอีกครั้ง')}</small></div>
        </div>`:''}
        <h2>บริการในงาน</h2>
        <div class="cnk-ev-features">
          <div>${ic('music',24)}<span>ดนตรี</span></div>
          <div>${ic('users',24)}<span>บรรยากาศ</span></div>
          <div>${ic('ticket',24)}<span>ข้อมูลบัตร</span></div>
          <div>${ic('pin',24)}<span>สถานที่</span></div>
        </div>
        <div class="cnk-ev-location"><b>สถานที่จัดงาน</b><span>${e(v.name)} · ${e(v.place)}</span><button onclick="App.openMap('${v.id}')">${ic('map',16)} เปิดแผนที่</button></div>
        <p class="cnk-ev-disclosure">ข้อมูลจากโปสเตอร์และแหล่งสาธารณะ · การจองและบัตรใน CHILL N’ KNOCK ยังเป็นต้นแบบ ไม่ใช่การซื้อจริง</p>
      </div>
      <div class="cnk-ev-cta">
        <button class="secondary" ${ev.status==='postponed'?'disabled':''} onclick="App.startBooking('${v.id}')">${ic('calendar',18)} จองโต๊ะ</button>
        ${ev.status==='postponed'
          ?'<button disabled>งานเลื่อนกำหนด</button>'
          :Array.isArray(ev.ticketTiers)&&ev.ticketTiers.length
            ?`<button onclick="App.cnkGoTickets()">${ic('ticket',18)} ดูบัตรทดลอง</button>`
            :'<button disabled>รอข้อมูลบัตร</button>'}
      </div>
    </div>`;
  };


  App.cnkGoTickets = () => {
    UI.cnkTicketType = types(getEvent())[0].id;
    UI.cnkTicketQty = 1;
    App.go('cnk-ticket-select');
  };
  App.cnkSelectTier = id => { UI.cnkTicketType=id;render(true); };
  App.cnkTicketCount = delta => { UI.cnkTicketQty=Math.max(1,Math.min(8,(UI.cnkTicketQty||1)+delta));render(true); };

  function ticketSelect() {
    const ev=getEvent(), {v,date}=info(ev), selected=chosen(ev);
    return `<div class="screen cnk-tk-screen">
      ${evHeader('เลือกประเภทบัตร',`${ev.name} — ${v.name}`)}
      <div class="cnk-tk-wrap">
        <div class="cnk-tk-summary">${image(ev)}<div><b>${e(ev.name)}</b><small>${ic('clock',14)} ${e(thaiDate(date))} · ${e(ev.time)} น.</small><small>${ic('pin',14)} ${e(v.name)} · ${e(v.area)}</small></div></div>
        <h2>ประเภทบัตร</h2>
        <div class="cnk-tk-options">${types(ev).map(t=>`<button class="cnk-tk-option ${t.id===selected.id?'active':''}" onclick="App.cnkSelectTier('${e(t.id)}')"><span class="cnk-tk-radio"></span><span class="cnk-tk-label"><b>${e(t.name)} ${t.recommended?'<em>แนะนำ</em>':''}</b>${t.info.map(s=>`<small>• ${e(s)}</small>`).join('')}</span><strong>${money(t.price)}</strong></button>`).join('')}</div>
        <div class="cnk-tk-quantity"><b>จำนวนบัตร</b><div><button onclick="App.cnkTicketCount(-1)" aria-label="ลดจำนวน">−</button><b>${UI.cnkTicketQty||1}</b><button onclick="App.cnkTicketCount(1)" aria-label="เพิ่มจำนวน">+</button></div></div>
        <div class="cnk-tk-total"><b>ยอดรวม</b><strong>${money(selected.price*(UI.cnkTicketQty||1))}</strong></div>
        <p class="cnk-tk-explain">ราคานี้ใช้จำลองขั้นตอนการจอง ยังไม่มีการชำระเงินจริงหรือออกบัตรเข้าร้าน</p>
      </div>
      <div class="cnk-tk-footer"><button onclick="App.cnkConfirmTicket()">ยืนยันบัตรทดลอง</button></div>
    </div>`;
  }

  App.cnkConfirmTicket = () => {
    if(!DB.account) return App.auth('cnk-ticket-select');
    const ev=getEvent(), tier=chosen(ev), qty=UI.cnkTicketQty||1;
    const t={id:'TKT-DEMO-'+Date.now(),event:ev.id,qty,price:tier.price*qty,
    tierName:tier.name,date:ev.date||dateOffset(ev.offset),time:ev.time,      owner:DB.account.email,prototype:true,cnkTicketV2:true};
    if(!Array.isArray(DB.tickets)) DB.tickets=[];
    DB.tickets.push(t);UI.ticketId=t.id;save();
    App.go('cnk-ticket-success');
  };

  function ticketSuccess() {
    const t=(DB.tickets||[]).find(x=>x.id===UI.ticketId);
    if(!t)return activity();
    const ev=E(t.event),v=V(ev.venue), end=ev.endTime||'02:00';
    return `<div class="screen cnk-ts-screen">
      <div class="cnk-ts-top"><div class="cnk-ts-icon">${ic('ticket',54)}<span>${ic('check',23)}</span></div>
        <h1>ชำระเงินจำลองสำเร็จ !</h1><p>ขอบคุณที่ใช้ CHILL N’ KNOCK</p><span class="cnk-ts-demo">บัตรทดลอง · ไม่สามารถใช้เข้างานจริง</span></div>
      <div class="cnk-ts-ticket"><div class="cnk-ts-banner">${image(ev)}<div><h2>${e(v.name)}</h2><b>${e(ev.name)}</b></div></div>
        <div class="cnk-ts-details"><div class="cnk-ts-facts">
          <p>${ic('calendar',17)} ${e(thaiDate(t.date))}</p>
          <p>${ic('clock',17)} ${e(t.time||ev.time)}–${e(end)} น.</p>
          <p>${ic('pin',17)} ${e(v.name)} · ${e(v.area)}</p>
          <p>${ic('ticket',17)} ${e(t.tierName||'Regular')} × ${t.qty}</p>
          <div class="cnk-ts-sum"><small>ยอดรวมจำลอง</small><strong>${money(t.price)}</strong></div>
        </div><div class="cnk-ts-qrbox"><div id="cnk-demo-qr" data-ticket="${e(t.id)}" aria-label="QR Code สำหรับบัตรทดลอง"></div><small>QR ทดสอบเท่านั้น<br>ใช้เข้างานไม่ได้</small></div></div>
      </div>
      <div class="cnk-ts-notes"><b>${ic('info',18)} หมายเหตุ</b>
        <ul><li>QR Code นี้ไม่ใช่บัตรสำหรับเข้าร้านจริง</li><li>ยังไม่มีการชำระเงินหรือคืนเงิน</li><li>สิทธิ์เข้างานต้องยืนยันจากร้านหรือผู้จัดจริง</li></ul></div>
      <div class="cnk-ts-actions"><button class="secondary" onclick="App.go('activity')">${ic('calendar',18)} ดูรายละเอียดในคืนของฉัน</button><button onclick="App.go('home')">กลับสู่หน้าหลัก</button></div>
    </div>`;
  }

  // Render the QR after each synchronous render. No payment/private data is encoded.
  const oldRender=render;
  render=function(...args){oldRender(...args);const el=document.querySelector('#cnk-demo-qr');if(!el)return;
    if(typeof QRCode!=='function'){el.textContent='QR ไม่พร้อมใช้งาน';return;}
    const t=(DB.tickets||[]).find(x=>x.id===el.dataset.ticket);if(!t)return;
    new QRCode(el,{text:JSON.stringify({type:'CNK-DEMO-NOT-VALID',id:t.id,event:t.event,qty:t.qty}),width:104,height:104,colorDark:'#24121A',colorLight:'#FFFFFF',correctLevel:QRCode.CorrectLevel.M});
  };
  const oldCurrentMain=currentMain;
  currentMain=function(){if(UI.role==='user'&&UI.screen==='cnk-ticket-select')return ticketSelect();
    if(UI.role==='user'&&UI.screen==='cnk-ticket-success')return ticketSuccess();
    return oldCurrentMain();
  };
  const oldOpenTicket=App.openTicket;
  App.openTicket=id=>{const t=(DB.tickets||[]).find(x=>x.id===id);if(!t?.cnkTicketV2)return oldOpenTicket(id);
    UI.ticketId=id;App.go('cnk-ticket-success');};
})();
