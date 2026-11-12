/* CHILL N' KNOCK — Guest-only additions based on BASELINE v1.0 7.
   Does not mutate Runner/Venue UI, or replace their screens.
   Demo payment is local only: no credentials, real QR for money, or transactions. */
(() => {
  'use strict';
  const fmt = amount => '฿\u00a0' + Number(amount || 0).toLocaleString('en-US');
  const esc = x => e(String(x ?? ''));
  const onyx = () => venues.find(v => v.id === 'onyx') || venues[0];
  const dateTH = iso => iso ? new Intl.DateTimeFormat('th-TH',{day:'numeric',month:'short',year:'numeric'}).format(new Date(iso + 'T12:00:00')) : '—';
function cnkGuestPaymentMethodIcon(type){
  if(type === 'card'){
    return `
      <span class="cnk-payment-method-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.6" stroke="currentColor" stroke-width="1.8"/>
          <path d="M3.8 9.2H20.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M7.2 14.4H10.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M7.2 16.8H12.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </span>
    `;
  }

  if(type === 'qr'){
    return `
      <span class="cnk-payment-method-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3.5" y="3.5" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.8"/>
          <rect x="15" y="3.5" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.8"/>
          <rect x="3.5" y="15" width="5.5" height="5.5" stroke="currentColor" stroke-width="1.8"/>
          <path d="M12.2 4.8V7.3M12.2 9.6V12.1M14.8 12.1H17.1M18.6 10V12.1M12.2 14.7V17.2M14.8 14.7V17.2M17.4 14.7V20.5M20.1 15.9V18.4M14.8 20.5H17.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </span>
    `;
  }

  if(type === 'mobile'){
    return `
      <span class="cnk-payment-method-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="6.6" y="2.8" width="10.8" height="18.4" rx="2.2" stroke="currentColor" stroke-width="1.8"/>
          <path d="M10 5.6H14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="12" cy="17.8" r="1" fill="currentColor"/>
        </svg>
      </span>
    `;
  }

  return `<span class="cnk-payment-method-icon"></span>`;
}
  /* A. RIDE HOME: replace only this guest screen; keep original links and provider handler. */
  ridePage = function () {
    return `<div class="screen cnk-g-ride">
      ${title('เรียกรถกลับบ้าน','เลือกแอปสำหรับดูราคาและยืนยันการเดินทาง')}
      <div class="cnk-g-ride-body">
        <div class="cnk-g-ride-card">
          <div class="cnk-g-ride-row"><div class="cnk-g-grab">Grab</div><div><b>Grab</b><p>เปิดแอปเพื่อดูราคา<br>และยืนยันการเดินทาง</p></div></div>
          <button type="button" class="cnk-g-ride-cta" onclick="App.cnkRideProvider('grab')">เปิด Grab ${ic('external',15)}</button>
        </div>
        <div class="cnk-g-ride-card">
          <div class="cnk-g-ride-row"><div class="cnk-g-lineman"><span>M</span><b>LINE MAN<br>RIDE</b></div><div><b>LINE MAN Ride</b><p>เปิดแอปเพื่อดูราคา<br>และยืนยันการเดินทาง</p></div></div>
          <button type="button" class="cnk-g-ride-cta" onclick="App.cnkRideProvider('lineman')">เปิด LINE MAN ${ic('external',15)}</button>
        </div>
        <div class="cnk-g-ride-tip">${ic('info',18)}<span>ราคาค่าโดยสารและสถานะรถจะแสดงในแอปผู้ให้บริการ (Grab / LINE MAN)</span></div>
        <div class="cnk-g-ride-tip">${ic('shield',18)}<span><strong>เดินทางอย่างปลอดภัย</strong><br>ตรวจสอบข้อมูลคนขับและทะเบียนรถก่อนขึ้นรถ และเลือกจุดรับรถที่เหมาะสม</span></div>
        <p class="cnk-g-ride-disclaimer">ระบบเปิดแอปภายนอก ไม่ได้ส่งจุดรับ–ส่งให้ผู้ให้บริการโดยอัตโนมัติ</p>
      </div>
    </div>`;
  };

  /* B. FIND FRIENDS: no banner, and only browser-local simulated join/owner/chat. */
  const friendState = () => UI.cnkGuestFriends ||= {
    view:'feed', venue:'onyx', date:'all', genre:'ทั้งหมด',
    postDate:dateOffset(1), postTime:'22:00', need:2, genres:['EDM'],note:'',active:null, chatAs:'member'
  };
  const saturday = () => dateOffset((6-new Date().getDay()+7)%7);
  const friendGenres = ['EDM','Hip-Hop','R&B','House','T-Pop','อื่น ๆ'];
  const friendDemo = () => [
    {id:'CNK-FRIEND-DEMO-1',venue:'onyx',date:saturday(),time:'22:00',need:2,genres:['EDM','Hip-Hop'],desc:'ไปปาร์ตี้ด้วยกันที่ ONYX',author:'โพสต์ตัวอย่าง',current:3},
    {id:'CNK-FRIEND-DEMO-2',venue:'onyx',date:saturday(),time:'22:30',need:2,genres:['EDM'],desc:'ชวนเพื่อนฟัง EDM ด้วยกัน',author:'โพสต์ตัวอย่าง',current:2}
  ];
  const friendPosts = () => [...(DB.cnkGuestFriendPosts || []),...friendDemo()];
  const friendRequest = id => (DB.cnkGuestFriendRequests || {})[id];
  const friendPost = id => friendPosts().find(p=>p.id===id);
  const friendView = (view,id) => {const s=friendState();s.view=view;if(view==='create'&&s.venue==='all')s.venue=onyx().id;if(id)s.active=id;render();};
  App.cnkGuestFriendView = friendView;
  App.cnkGuestFriendSet = (key,value) => {friendState()[key]=value;render(true);};
  App.cnkGuestFriendGenres = genre => {const s=friendState();s.genres=s.genres.includes(genre)?s.genres.filter(g=>g!==genre):[...s.genres,genre];render(true);};
  App.cnkGuestFriendNote = value => {friendState().note=value.slice(0,200);const x=document.getElementById('cnk-g-fcounter');if(x)x.textContent=friendState().note.length+'/200';};
  App.cnkGuestFriendTime = value => {friendState().postTime=value;};
  App.cnkGuestFriendPublish = () => {
    const s=friendState();
    if(!s.venue||!s.postDate||!s.postTime||s.need<1)return toast('กรุณากรอกข้อมูลที่จำเป็น');
    DB.cnkGuestFriendPosts ||= [];
    DB.cnkGuestFriendPosts.unshift({id:'CNK-FRIEND-LOCAL-'+Date.now(),venue:s.venue,date:s.postDate,time:s.postTime,need:s.need,genres:[...s.genres],desc:s.note||'ชวนเพื่อนเที่ยวด้วยกัน',author:DB.account?.name||'คุณ',current:1,own:true});
    save();s.view='feed';s.date='all';s.genre='ทั้งหมด';render();toast('สร้างโพสต์ตัวอย่างในเบราว์เซอร์แล้ว');
  };
  App.cnkGuestFriendJoin = id => {
    const p=friendPost(id);if(!p)return toast('ไม่พบโพสต์');
    DB.cnkGuestFriendRequests ||= {};
    const existing=friendRequest(id);
    if(existing?.status==='approved')return friendView('chat',id);
    if(existing?.status==='pending')return toast('ส่งคำขอเข้าร่วมแล้ว · รอเจ้าของโพสต์อนุมัติ');
    DB.cnkGuestFriendRequests[id]={status:'pending',requester:DB.account?.name||'สมาชิกทดลอง',messages:[],sentAt:Date.now()};
    save();render(true);toast('ส่งคำขอเข้าร่วมแล้ว · รออนุมัติ');
  };
  App.cnkGuestFriendDecision = (id,approve) => {
    const req=friendRequest(id);if(!req||req.status!=='pending')return toast('ไม่มีคำขอรอดำเนินการ');
    req.status=approve?'approved':'rejected';req.decidedAt=Date.now();
    if(approve)req.messages.push({from:'owner',text:'อนุมัติแล้ว ยินดีต้อนรับเข้ากลุ่ม 🎉',at:Date.now()});
    save();render(true);toast(approve?'อนุมัติแล้ว สมาชิกเข้ากลุ่มแชทได้':'ไม่อนุมัติคำขอ');
  };
  App.cnkGuestFriendAs = who => {friendState().chatAs=who;render(true);};
  App.cnkGuestFriendSend = id => {
    const req=friendRequest(id);if(req?.status!=='approved')return toast('ต้องได้รับอนุมัติก่อน');
    const input=document.getElementById('cnk-g-chat-input'),value=(input?.value||'').trim().slice(0,300);
    if(!value)return;
    req.messages.push({from:friendState().chatAs==='owner'?'owner':'member',text:value,at:Date.now()});save();render(true);
  };
  App.cnkGuestFriendDemoRequest = id => {App.cnkGuestFriendJoin(id);};

  friendPage = function () {
    const s=friendState(),post=friendPost(s.active),req=friendRequest(s.active);
    const header = `<header class="cnk-g-fhead">
      <button type="button" aria-label="ย้อนกลับ" onclick="${s.view==='feed'?'App.back()':"App.cnkGuestFriendView('feed')"}">${ic('back',20)}</button>
      <div><h1>${s.view==='create'?'สร้างโพสต์นัดเที่ยว':s.view==='owner'?'คำขอเข้าร่วม':s.view==='chat'?'แชทกลุ่ม':'หาเพื่อนเที่ยว'}</h1>
      <p>${s.view==='feed'?'หาเพื่อนร่วมทริป ไปสนุกด้วยกันคืนนี้':s.view==='create'?'ชวนเพื่อนไปในคืนเดียวกัน':'โหมดทดลองภายในเบราว์เซอร์นี้'}</p></div></header>`;
    const venueOpts = venues.map(v=>`<option value="${esc(v.id)}" ${s.venue===v.id?'selected':''}>${esc(v.name)}</option>`).join('');
    const dates=[['all','ทุกวัน'],[dateOffset(0),'วันนี้'],[dateOffset(1),'พรุ่งนี้'],[saturday(),dateTH(saturday()).replace(/ \d{4}$/, '')]];
    const uniqueDates=dates.filter((d,i)=>dates.findIndex(x=>x[0]===d[0])===i);
    const cards=friendPosts().filter(p=>(s.venue==='all'||p.venue===s.venue)&&(s.date==='all'||p.date===s.date)&&(s.genre==='ทั้งหมด'||p.genres.includes(s.genre))).map(p=>{
      const r=friendRequest(p.id),v=venues.find(x=>x.id===p.venue)||onyx();
      const status=r?.status||'none';
      return `<article class="cnk-g-fpost"><div class="cnk-g-fposthead"><span class="cnk-g-favatar">${ic('user',18)}</span><div><strong>${esc(p.own?p.author:'ไป '+v.name+' คืนนี้')}</strong><small>${esc(p.author)} · ${dateTH(p.date)} · ${esc(p.time)} · ${p.own?'โพสต์ในเครื่อง':'ตัวอย่าง'}</small></div><span>${ic('heart',17)}</span></div>
        <p>${esc(p.desc)}</p><div class="cnk-g-fpostmeta">${ic('users',15)} ${p.need} คนที่อยากชวน <span>${p.current||1} / ${(p.current||1)+p.need} คน</span></div>
        <div class="cnk-g-fpostbottom"><div>${p.genres.map(g=>`<span>${esc(g)}</span>`).join('')}</div>
        <button type="button" ${status==='pending'?'disabled':''} onclick="${status==='approved'?`App.cnkGuestFriendView('chat','${p.id}')`:`App.cnkGuestFriendJoin('${p.id}')`}">${status==='approved'?'เข้ากลุ่มแชท':status==='pending'?'รออนุมัติ':status==='rejected'?'ขอเข้าร่วมอีกครั้ง':'ขอเข้าร่วม'}</button></div>
        ${status==='pending'?'<p class="cnk-g-fnotice">✓ ส่งคำขอเข้าร่วมแล้ว · รอเจ้าของโพสต์อนุมัติ</p>':status==='approved'?'<p class="cnk-g-fnotice success">✓ เจ้าของโพสต์อนุมัติแล้ว · เข้าแชทได้</p>':status==='rejected'?'<p class="cnk-g-fnotice">ยังไม่ได้รับอนุมัติ สามารถส่งคำขอใหม่ได้</p>':''}
        ${status!=='none'||p.own?`<button type="button" class="cnk-g-flink" onclick="App.cnkGuestFriendView('owner','${p.id}')">ทดลองมุมมองเจ้าของโพสต์ →</button>`:''}</article>`;
    }).join('');
    const feed=`<section class="cnk-g-fbody"><label class="cnk-g-fvenue">${ic('pin',17)} <strong>เลือกร้าน</strong><select aria-label="เลือกร้าน" onchange="App.cnkGuestFriendSet('venue',this.value)"><option value="all" ${s.venue==='all'?'selected':''}>ทุกร้าน</option>${venueOpts}</select></label>
      <div class="cnk-g-fdates"><b>${ic('calendar',16)} วันที่</b>${uniqueDates.map(([id,t])=>`<button class="${s.date===id?'active':''}" onclick="App.cnkGuestFriendSet('date','${id}')">${esc(t)}</button>`).join('')}</div>
      <div class="cnk-g-fgenres">${['ทั้งหมด',...friendGenres].map(g=>`<button class="${s.genre===g?'active':''}" onclick="App.cnkGuestFriendSet('genre','${g}')">${esc(g)}</button>`).join('')}</div>
      <div class="cnk-g-fcards">${cards||'<div class="cnk-g-fempty">ยังไม่มีโพสต์ที่ตรงกับตัวกรอง</div>'}</div>
      <button class="cnk-g-fprimary" onclick="App.cnkGuestFriendView('create')">${ic('plus',17)} สร้างโพสต์</button><p class="cnk-g-fdisclaimer">ข้อมูลตัวอย่างและโพสต์ที่สร้างอยู่ในเบราว์เซอร์นี้เท่านั้น</p></section>`;
    const create=`<section class="cnk-g-fbody cnk-g-fcreate"><label>เลือกร้าน *</label><select onchange="App.cnkGuestFriendSet('venue',this.value)">${venueOpts}</select>
      <div class="cnk-g-fgrid"><div><label>วันที่ไป *</label><input type="date" min="${dateOffset(0)}" value="${esc(s.postDate)}" onchange="App.cnkGuestFriendSet('postDate',this.value)"></div><div><label>เวลา *</label><input type="time" value="${esc(s.postTime)}" onchange="App.cnkGuestFriendTime(this.value)"></div></div>
      <label>จำนวนเพื่อนที่หา *</label><select onchange="App.cnkGuestFriendSet('need',Number(this.value))">${[1,2,3,4,5,6,7,8].map(n=>`<option ${s.need===n?'selected':''} value="${n}">${n} คน</option>`).join('')}</select>
      <label>สไตล์เพลงที่ชอบ <small>(เลือกได้หลายแบบ)</small></label><div class="cnk-g-fcreategenres">${friendGenres.map(g=>`<button type="button" class="${s.genres.includes(g)?'active':''}" onclick="App.cnkGuestFriendGenres('${g}')">${s.genres.includes(g)?'✓ ':''}${esc(g)}</button>`).join('')}</div>
      <label>รายละเอียดเพิ่มเติม <small>(ไม่บังคับ)</small></label><textarea maxlength="200" placeholder="เช่น อยากเจอกันกี่โมง หรืออยากฟังเพลงแนวไหน" oninput="App.cnkGuestFriendNote(this.value)">${esc(s.note)}</textarea><div class="cnk-g-fcounter" id="cnk-g-fcounter">${s.note.length}/200</div>
      <div class="cnk-g-fsafety">${ic('info',16)} เพื่อความปลอดภัย ไม่ควรโพสต์เบอร์โทรหรือที่อยู่ส่วนตัว</div><button class="cnk-g-fprimary" onclick="App.cnkGuestFriendPublish()">โพสต์ชวนเพื่อน (ทดลอง)</button></section>`;
    const owner=`<section class="cnk-g-fbody"><div class="cnk-g-fpanel"><h2>คำขอเข้าร่วมโพสต์</h2><p>มุมมองเจ้าของโพสต์ · โหมดทดลอง</p><strong>${esc(post?.desc||'โพสต์นัดเที่ยว')}</strong>
      ${req?`<div class="cnk-g-fmember">${ic('user',20)} <div><b>${esc(req.requester)}</b><small>${req.status==='pending'?'รอพิจารณา':req.status==='approved'?'อนุมัติแล้ว':'ไม่อนุมัติ'}</small></div></div>
        ${req.status==='pending'?`<div class="cnk-g-fdecision"><button onclick="App.cnkGuestFriendDecision('${s.active}',true)">อนุมัติ</button><button class="outline" onclick="App.cnkGuestFriendDecision('${s.active}',false)">ไม่อนุมัติ</button></div>`:req.status==='approved'?'<p class="cnk-g-fnotice success">✓ สมาชิกสามารถเข้ากลุ่มแชทได้แล้ว</p>':'<p class="cnk-g-fnotice">ไม่อนุมัติคำขอแล้ว</p>'}`:
        `<p class="cnk-g-fnotice">ยังไม่มีคำขอ กดด้านล่างเพื่อจำลองผู้สนใจในโพสต์</p><button class="cnk-g-fprimary" onclick="App.cnkGuestFriendDemoRequest('${s.active}')">จำลองผู้ใช้ขอเข้าร่วม</button>`}
      <button class="cnk-g-fback" onclick="App.cnkGuestFriendView('feed')">กลับไปหน้ารายการโพสต์</button></div></section>`;
    const chat=`<section class="cnk-g-fbody"><div class="cnk-g-fpanel"><h2>แชทกลุ่ม · ${esc(post?.desc||'นัดเที่ยว')}</h2><p>ทดลองพิมพ์ได้ทั้งฝั่งสมาชิกและเจ้าของโพสต์</p>
      <div class="cnk-g-fswitch"><button class="${s.chatAs!=='owner'?'active':''}" onclick="App.cnkGuestFriendAs('member')">สมาชิก</button><button class="${s.chatAs==='owner'?'active':''}" onclick="App.cnkGuestFriendAs('owner')">เจ้าของโพสต์</button></div>
      <div class="cnk-g-fmessages">${(req?.messages||[]).map(m=>`<div class="${m.from==='member'?'mine':''}"><small>${m.from==='owner'?'เจ้าของโพสต์':'สมาชิก'}</small><p>${esc(m.text)}</p></div>`).join('')}</div><div class="cnk-g-fcompose"><input id="cnk-g-chat-input" maxlength="300" placeholder="พิมพ์ข้อความ..." onkeydown="if(event.key==='Enter')App.cnkGuestFriendSend('${s.active}')"><button onclick="App.cnkGuestFriendSend('${s.active}')">ส่ง</button></div></div></section>`;
    return `<div class="screen cnk-g-fscreen">${header}${s.view==='create'?create:s.view==='owner'?owner:s.view==='chat'&&req?.status==='approved'?chat:feed}</div>`;
  };

  /* C. PAYMENT for existing Guest booking and Event ticket paths. */
  const bankList = [
    {id:'kbank',name:'ธนาคารกสิกรไทย',app:'K PLUS',src:'assets/payments/kbank.png'},
    {id:'krungthai',name:'ธนาคารกรุงไทย',app:'Krungthai NEXT',src:'assets/payments/krungthai.png'},
    {id:'scb',name:'ธนาคารไทยพาณิชย์',app:'SCB EASY',src:'assets/payments/scb.png'}
  ];
  const runnerLabel = id => ({r1:'Runner A',r2:'Runner B',r3:'Runner C'})[id] || 'รอจับคู่';
  const previousPickRunner = App.pickRunner;
  App.pickRunner = function (id) {previousPickRunner(id);render(true);};

  const previousSubmitBooking = App.submitBooking;
  App.submitBooking = function () {
    if(!DB.account)return previousSubmitBooking();
    const before=DB.requests.length;
    previousSubmitBooking();
    if(DB.requests.length!==before+1)return;
    const r=requestById(UI.reqId);if(!r)return;
    r.runnerChoice=r.service==='direct'?'none':UI.runnerChoice;
    r.fee=r.service==='direct'?0:feeFor(r.service);
    const deposit=r.service==='queue'?0:500; // DEMO only: not a venue's actual rate.
    r.cnkPayment={status:'pending_demo',runnerFee:r.fee,deposit,total:r.fee+deposit,method:null};
    save();App.cnkGuestPayOpen({kind:'booking',id:r.id});
  };
  const previousTicketConfirm = App.cnkConfirmTicket;
  App.cnkConfirmTicket = function () {
    if(!DB.account)return App.auth('cnk-ticket-select');
    const ev=E(UI.event);if(!ev)return toast('ไม่พบอีเวนต์');
    const fallback=[{id:'early',name:'Early Bird',price:500},{id:'regular',name:'Regular',price:700},{id:'vip',name:'VIP Entry',price:1500}];
    const ts=Array.isArray(ev.ticketTiers)&&ev.ticketTiers.length?ev.ticketTiers:fallback;
    const t=ts.find(x=>x.id===UI.cnkTicketType)||ts[0],qty=UI.cnkTicketQty||1;
    App.cnkGuestPayOpen({kind:'ticket',event:ev.id,tierId:t.id,tierName:t.name,qty,total:Number(t.price)*qty,date:ev.date||dateOffset(ev.offset),time:ev.time});
  };
  App.cnkGuestPayOpen = draft => {UI.cnkGuestPayment={draft,step:'methods',method:'card',bank:'kbank'};App.go('cnk-guest-payment');};
  App.cnkGuestPayChoose = method => {const p=UI.cnkGuestPayment;if(!p)return;p.method=method;render(true);};
  App.cnkGuestPayNext = () => {const p=UI.cnkGuestPayment;if(!p)return;p.step=p.method;render(true);};
  App.cnkGuestPayBank = bank => {const p=UI.cnkGuestPayment;if(p&&bankList.some(b=>b.id===bank)){p.bank=bank;render(true);}};
  App.cnkGuestPayBack = () => {
    const p=UI.cnkGuestPayment;if(!p)return App.go('activity');
    if(p.step!=='methods'){p.step='methods';return render(true);}
    if(p.draft.kind==='booking')return App.openTracking(p.draft.id);
    return App.go('cnk-ticket-select');
  };
  App.cnkGuestPayResume = id => {
    const r=requestById(id);
    if(!r||r.owner!==DB.account?.email||r.cnkPayment?.status!=='pending_demo'||['declined','cancelled'].includes(r.status))return toast('คำขอนี้ไม่พร้อมชำระเงิน');
    App.cnkGuestPayOpen({kind:'booking',id});
  };
  App.cnkGuestPayFinish = () => {
    const p=UI.cnkGuestPayment;if(!p||p.step==='methods')return toast('เลือกวิธีชำระเงินก่อน');
    if(p.method==='card'){
      const test=(document.getElementById('cnk-g-test-card')?.value||'').replace(/\s/g,'');
      if(test!=='4242424242424242')return toast('ใช้เลขบัตรทดลอง 4242 4242 4242 4242 เท่านั้น');
    }
    if(p.draft.kind==='booking'){
      const r=requestById(p.draft.id);
      if(!r||r.owner!==DB.account?.email||r.cnkPayment?.status!=='pending_demo'||['declined','cancelled'].includes(r.status))return toast('สถานะไม่พร้อมชำระเงิน');
      r.cnkPayment.status='paid_demo';r.cnkPayment.method=p.method;r.cnkPayment.bank=p.method==='mobile'?p.bank:null;r.cnkPayment.paidAt=Date.now();
      save();UI.cnkGuestReceiptId=r.id;App.go('cnk-guest-payment-success');return;
    }
    if(p.draft.kind==='ticket'){
      const d=p.draft,ev=E(d.event);if(!ev||!DB.account)return toast('ไม่พบรายการบัตร');
      DB.tickets ||= [];
      const t={id:'TKT-DEMO-'+Date.now(),event:d.event,qty:d.qty,price:d.total,tierName:d.tierName,date:d.date,time:d.time,owner:DB.account.email,prototype:true,cnkTicketV2:true,cnkPayStatus:'paid_demo',cnkPayMethod:p.method,cnkPayBank:p.method==='mobile'?p.bank:null,cnkPaidAt:Date.now()};
      DB.tickets.push(t);UI.ticketId=t.id;save();App.go('cnk-ticket-success');
    }
  };
  const paymentDetails = () => {
    const draft=UI.cnkGuestPayment?.draft;if(!draft)return null;
    if(draft.kind==='booking'){
      const r=requestById(draft.id);if(!r?.cnkPayment)return null;
      const v=V(r.venue);return {name:v.name,area:v.area,image:v.image,date:r.date,time:r.time,qty:r.guests,seat:r.seat||'ไม่ระบุ',runner:r.runnerChoice,rows:[...(r.service==='direct'?[]:[['ค่าบริการ Runner ('+runnerLabel(r.runnerChoice)+')',r.cnkPayment.runnerFee]]),['เงินมัดจำ (Deposit · จำลอง)',r.cnkPayment.deposit]],total:r.cnkPayment.total};
    }
    const ev=E(draft.event);if(!ev)return null;const v=V(ev.venue);
    return {name:ev.name,area:v.name,image:'assets/events/'+ev.id+'.jpg',date:draft.date,time:draft.time,qty:draft.qty,seat:draft.tierName+' × '+draft.qty+' ใบ',runner:null,rows:[[draft.tierName+' × '+draft.qty+' ใบ',draft.total]],total:draft.total};
  };
  const paymentSummary = d => `<div class="cnk-g-pay-venue"><img src="${esc(d.image||'logo.png')}" onerror="this.onerror=null;this.src='logo.png'" alt="${esc(d.name)}"><div><strong>${esc(d.name)}</strong><span>${esc(d.area)}</span><small>${ic('calendar',14)} ${dateTH(d.date)} · ${esc(d.time)}</small><small>${ic('users',14)} ${d.qty} ${d.runner?'คน':'ใบ'} · ${esc(d.seat)}</small></div></div>
    <h2>สรุปยอดชำระ</h2><div class="cnk-g-pay-card">${d.rows.map(([label,amount])=>`<div class="cnk-g-pay-line"><span>${esc(label)}</span><strong>${fmt(amount)}</strong></div>`).join('')}<div class="cnk-g-pay-total"><b>ยอดชำระทั้งหมด</b><strong>${fmt(d.total)}</strong></div></div>`;
  const methodIcons = {
    card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    promptpay:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM15 14v3m3-3v3m3-3v7m-6 0h3"/>',
    mobile:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M9 5h6M11 19h2"/>'
  };
  const payIcon = name => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${methodIcons[name]||''}</svg>`;
  const methods=[['card','บัตรเครดิต/เดบิต','Visa, Mastercard, JCB'],['promptpay','PromptPay QR','สแกน QR เพื่อชำระเงิน (จำลอง)'],['mobile','Mobile Banking','ชำระผ่านแอปธนาคาร']];
  const radioCard = (id,label,desc,icon,selected,onClick,img='') => `<button type="button" class="cnk-g-pay-option ${selected?'active':''}" onclick="${onClick}">
    <span class="cnk-g-pay-optionicon">${img?`<img src="${img}" alt="${esc(label)}">`:payIcon(icon)}</span><span class="cnk-g-pay-optioncopy"><strong>${esc(label)}</strong><small>${esc(desc)}</small></span><span class="cnk-g-pay-radio"></span></button>`;
  function payPage() {
    const p=UI.cnkGuestPayment,d=paymentDetails();if(!p||!d)return activity();
    const h={methods:'ชำระเงิน',card:'ชำระด้วยบัตร',promptpay:'PromptPay QR',mobile:'Mobile Banking'}[p.step];
    if(p.step==='promptpay')requestAnimationFrame(()=>{const el=document.getElementById('cnk-g-pay-qr');if(!el||el.childElementCount)return;if(typeof QRCode==='function')new QRCode(el,{text:'CNK-DEMO-NOT-PAYABLE-'+(p.draft.id||p.draft.event),width:158,height:158,colorDark:'#3D2231',colorLight:'#FFFFFF',correctLevel:QRCode.CorrectLevel.M});else el.textContent='QR DEMO';});
    return `<div class="screen cnk-g-pay-screen"><header class="cnk-g-pay-head"><button onclick="App.cnkGuestPayBack()" aria-label="ย้อนกลับ">${ic('back',20)}</button><div><h1>${h}</h1><small>${p.draft.kind==='booking'?'จองโต๊ะ':'ซื้อบัตรอีเวนต์'} · การชำระเงินจำลอง</small></div></header>
      <section class="cnk-g-pay-content">${paymentSummary(d)}
      ${p.step==='methods'?`<h2>เลือกวิธีการชำระเงิน</h2><div class="cnk-g-pay-options">${methods.map(([id,t,sub])=>radioCard(id,t,sub,id,p.method===id,`App.cnkGuestPayChoose('${id}')`)).join('')}</div><button class="cnk-g-pay-primary" onclick="App.cnkGuestPayNext()">ยืนยันการชำระเงิน ${ic('arrow',17)}</button>`:''}
      ${p.step==='card'?`<h2>รายละเอียดบัตรทดสอบ</h2><div class="cnk-g-pay-card cnk-g-pay-form"><label>หมายเลขบัตรทดสอบ<input id="cnk-g-test-card" value="4242 4242 4242 4242" inputmode="numeric" autocomplete="off" maxlength="19"></label><div class="cnk-g-pay-formgrid"><label>วันหมดอายุ<input readonly value="12/30"></label><label>CVV (จำลอง)<input readonly value="123"></label></div><label>ชื่อบนบัตร<input readonly value="DEMO USER"></label></div><p class="cnk-g-pay-warning">โหมดทดลองเท่านั้น ใช้หมายเลขทดสอบที่แสดง ห้ามกรอกข้อมูลบัตรจริง</p><button class="cnk-g-pay-primary" onclick="App.cnkGuestPayFinish()">ชำระเงินจำลอง ${fmt(d.total)}</button>`:''}
      ${p.step==='promptpay'?`<h2>QR สำหรับทดสอบ</h2><div class="cnk-g-pay-card cnk-g-pay-qr"><b>QR DEMO · ชำระเงินจริงไม่ได้</b><div id="cnk-g-pay-qr" aria-label="QR ทดสอบ"></div><strong>${fmt(d.total)}</strong><small>QR ไม่มีบัญชีรับเงินจริง</small></div><button class="cnk-g-pay-primary" onclick="App.cnkGuestPayFinish()">จำลองการสแกนและชำระเงิน</button>`:''}
      ${p.step==='mobile'?`<h2>เลือกธนาคาร</h2><div class="cnk-g-pay-options">${bankList.map(b=>radioCard(b.id,b.name,b.app,'',p.bank===b.id,`App.cnkGuestPayBank('${b.id}')`,b.src)).join('')}</div><p class="cnk-g-pay-warning">เลือกธนาคารเพื่อทดลองเท่านั้น ยังไม่เปิดแอปธนาคารและไม่ตัดเงินจริง</p><button class="cnk-g-pay-primary" onclick="App.cnkGuestPayFinish()">ดำเนินการชำระเงิน (จำลอง)</button>`:''}
      </section></div>`;
  }
  function paySuccessPage() {
    const r=requestById(UI.cnkGuestReceiptId);if(!r||r.cnkPayment?.status!=='paid_demo')return activity();
    const v=V(r.venue);
    const fields=[['ย่าน',v.area],['วันที่และเวลา',dateTH(r.date)+' · '+r.time],['จำนวนคน',r.guests+' คน'],['ประเภทที่นั่ง',r.seat||'ไม่ระบุ'],['ผู้ช่วย Runner',r.service==='direct'?'ไม่มี':runnerLabel(r.runnerChoice)]];
    return `<div class="screen cnk-g-pay-screen"><header class="cnk-g-pay-head"><button onclick="App.go('activity')" aria-label="กลับ">${ic('back',20)}</button><div><h1>ใบเสร็จจำลอง</h1><small>ไม่มีการตัดเงินจริง · ยังรอร้านยืนยัน</small></div></header><section class="cnk-g-pay-content cnk-g-pay-receipt"><div class="cnk-g-pay-check">${ic('check',34)}</div><h2>ชำระเงินจำลองสำเร็จ</h2><p>ส่งคำขอไปยังร้านแล้ว · รอร้านยืนยันโต๊ะ</p><div class="cnk-g-pay-code"><small>รหัสคำขอ (ไม่ใช่รหัสยืนยันโต๊ะ)</small><strong>${esc(r.id)}</strong></div>
      <div class="cnk-g-pay-card"><h2>รายละเอียดการจอง</h2><h3>${esc(v.name)}</h3>${fields.map(([k,val])=>`<div class="cnk-g-pay-line"><span>${esc(k)}</span><strong>${esc(val)}</strong></div>`).join('')}<div class="cnk-g-pay-total"><b>ยอดชำระทั้งหมด (จำลอง)</b><strong>${fmt(r.cnkPayment.total)}</strong></div></div>
      <p class="cnk-g-pay-ok">${ic('check',17)} ชำระเงินจำลองแล้ว · รอร้านยืนยันการจอง</p><button class="cnk-g-pay-primary" onclick="App.openTracking('${esc(r.id)}')">ติดตามสถานะคำขอ</button><button class="cnk-g-pay-outline" onclick="App.go('activity')">ดูรายละเอียดในคืนของฉัน</button></section></div>`;
  }
  // Only touch the EXISTING tracking HTML when the current request has a guest payment.
  const originalTracking=tracking;
  tracking=function(){let html=originalTracking(),r=requestById(UI.reqId);if(!r?.cnkPayment)return html;
    const p=r.cnkPayment,open=p.status==='pending_demo'&&!['declined','cancelled'].includes(r.status);
    const extra=`<div class="cnk-g-pay-tracking"><strong>สถานะการชำระเงิน (จำลอง)</strong><p>${p.status==='paid_demo'?'ชำระเงินจำลองแล้ว':'รอชำระเงินจำลอง'} · ${fmt(p.total)}</p>${open?`<button onclick="App.cnkGuestPayResume('${esc(r.id)}')">ไปหน้าชำระเงิน</button>`:''}<small>ไม่มีการตัดเงินจริง · ยังไม่ใช่หลักฐานยืนยันโต๊ะ</small></div>`;
    return html.replace('<strong style="font-size:13px">',extra+'<strong style="font-size:13px">');
  };
  // Preserve the original event ticket selection layout and change its button label only.
  const oldMain=currentMain;
  currentMain=function(){
    if(UI.role==='user'&&UI.screen==='cnk-guest-payment')return payPage();
    if(UI.role==='user'&&UI.screen==='cnk-guest-payment-success')return paySuccessPage();
    const html=oldMain();
    if(UI.role==='user'&&UI.screen==='cnk-ticket-select')return html.replace('ยืนยันบัตรทดลอง</button>','ไปหน้าชำระเงิน</button>');
    return html;
  };
})();
