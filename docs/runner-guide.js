/* CHILL N’ KNOCK guide reader. Independent of app DB and business logic. */
(() => {
  'use strict';
  const ROLE=(document.body.dataset.guideRole||'runner').toLowerCase();
  const CONFIG={
    guest:{name:'User',folder:'guest-pages',pdf:'guest-guide-original.pdf'},
    runner:{name:'Runner',folder:'runner-pages',pdf:'runner-guide-original.pdf'},
    venue:{name:'Venue Partner',folder:'venue-pages',pdf:'venue-guide-original.pdf'}
  };
  const c=CONFIG[ROLE]||CONFIG.runner;
  const $=id=>document.getElementById(id);
  const book=$('book'),current=$('currentPage'),layer=$('turnLayer'),under=$('underPage'),staticImg=$('staticImage'),frontImg=$('frontImage'),backImg=$('backImage'),flippingHalf=$('flippingHalf');
  const previous=$('prevPage'),next=$('nextPage'),indicator=$('pageIndicator'),paper=$('paperCount'),bar=$('progressBar'),track=$('progressTrack'),jump=$('pageJump');
  const zoom=$('zoomDialog'),zoomImg=$('zoomImg'), pdfLink=$('pdfLink');
  const files=new Map();
  const maxPages=80;
  let TOTAL=0,index=1,busy=false,finishTimer=null,pointerStart=null,suppressClickUntil=0;
  function testImage(src){
    return new Promise(resolve=>{
      const img=new Image(); let settled=false;
      const finish=good=>{if(settled)return;settled=true;clearTimeout(timer);img.onload=null;img.onerror=null;resolve(good);};
      const timer=setTimeout(()=>finish(false),7000);
      img.onload=()=>finish(img.naturalWidth>0);
      img.onerror=()=>finish(false);
      img.src=src;
    });
  }
  async function findPage(n){
    const num=String(n).padStart(2,'0');
    for(const ext of ['webp','png','jpg','jpeg']){
      const path=`${c.folder}/page-${num}.${ext}`;
      if(await testImage(path))return path;
    }
    return null;
  }
  async function discover(){
    for(let n=1;n<=maxPages;n++){
      const path=await findPage(n);
      if(!path)break;
      files.set(n,path);
    }
    TOTAL=files.size;
    track.setAttribute('aria-valuemax',String(Math.max(1,TOTAL)));
    for(let i=1;i<=TOTAL;i++){
      const option=document.createElement('option');
      option.value=String(i);
      option.textContent=i===1?'01 · หน้าปก':`${String(i).padStart(2,'0')} · หน้า ${i}`;
      jump.appendChild(option);
    }
    const waiting=$('guideEmpty');
    if(!TOTAL){
      book.classList.add('is-empty');
      current.hidden=true;
      waiting.hidden=false;
      $('emptyTitle').textContent=`คู่มือสำหรับ ${c.name}`;
      $('emptyDescription').textContent='กำลังจัดเตรียมคู่มือฉบับพลิกหน้า เมื่อเพิ่มรูปหน้าคู่มือตามชื่อที่กำหนด ระบบจะแสดงให้โดยอัตโนมัติ';
      jump.innerHTML='<option value="0">ยังไม่มีหน้าคู่มือ</option>';
      jump.disabled=true;
      previous.disabled=true;next.disabled=true;$('openZoom').disabled=true;
      indicator.innerHTML='— <span>/ —</span>';paper.textContent='COMING SOON';bar.style.width='0%';
    } else {
      waiting.hidden=true;
      book.classList.remove('is-empty');
      current.hidden=false;
      $('openZoom').disabled=false;
      refresh();
    }
    // Only show PDF link if a real PDF is available; never link to a missing file.
    try{
      const response=await fetch(c.pdf,{method:'HEAD',cache:'no-store'});
      const type=(response.headers.get('content-type')||'').toLowerCase();
      if(response.ok && !type.includes('text/html')){
        pdfLink.href=c.pdf;pdfLink.hidden=false;
      }
    }catch(_){}
  }
  function fileFor(n){return files.get(n)||'';}
  function warm(n){if(n>=1 && n<=TOTAL){const img=new Image();img.src=fileFor(n);}}
  function refresh(){
    if(!TOTAL)return;
    current.src=fileFor(index);
    current.alt=`คู่มือ ${c.name} หน้า ${index} จาก ${TOTAL}`;
    const text=`${String(index).padStart(2,'0')} / ${TOTAL}`;
    paper.textContent=text;
    indicator.innerHTML=`${String(index).padStart(2,'0')} <span>/ ${TOTAL}</span>`;
    bar.style.width=`${index/TOTAL*100}%`;
    track.setAttribute('aria-valuenow',String(index));
    jump.value=String(index);
    previous.disabled=index===1;
    next.disabled=index===TOTAL;
    warm(index-1);warm(index+1);
    if(zoom.open){zoomImg.src=fileFor(index);$('zoomTitle').textContent=`${c.name} Guide · หน้า ${String(index).padStart(2,'0')}`;}
  }
  function finishFlip(target){
    clearTimeout(finishTimer);index=target;refresh();
    layer.hidden=true;layer.className='turn-layer';busy=false;
  }
  function go(target,animate=true){
    if(!TOTAL||busy)return;
    target=Math.max(1,Math.min(TOTAL,Number(target)||1));
    if(target===index)return;
    if(!animate||Math.abs(target-index)>1||matchMedia('(prefers-reduced-motion: reduce)').matches){index=target;refresh();return;}
    busy=true;
    under.src=fileFor(target);staticImg.src=fileFor(index);
    frontImg.src=fileFor(index);backImg.src=fileFor(target);
    layer.hidden=false;
    layer.className=`turn-layer ${target>index?'to-next':'to-prev'}`;
    void flippingHalf.offsetWidth;
    requestAnimationFrame(()=>layer.classList.add('turning'));
    finishTimer=setTimeout(()=>finishFlip(target),860);
  }
  previous.addEventListener('click',()=>go(index-1));
  next.addEventListener('click',()=>go(index+1));
  jump.addEventListener('change',()=>go(Number(jump.value),false));
  book.querySelector('.click-left').addEventListener('click',()=>go(index-1));
  book.querySelector('.click-right').addEventListener('click',()=>go(index+1));
  document.addEventListener('keydown',event=>{
    if(!TOTAL||zoom.open||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
    if(event.key==='ArrowRight'){event.preventDefault();go(index+1);}
    if(event.key==='ArrowLeft'){event.preventDefault();go(index-1);}
  });
  book.addEventListener('pointerdown',event=>{
    if(event.pointerType!=='mouse')pointerStart={x:event.clientX,y:event.clientY};
  },{passive:true});
  book.addEventListener('pointerup',event=>{
    if(!pointerStart)return;
    const dx=event.clientX-pointerStart.x,dy=event.clientY-pointerStart.y;
    pointerStart=null;
    if(Math.abs(dx)>42 && Math.abs(dx)>Math.abs(dy)*1.4){
      suppressClickUntil=Date.now()+350;
      dx<0?go(index+1):go(index-1);
    }
  },{passive:true});
  book.addEventListener('click',event=>{
    if(Date.now()<suppressClickUntil){event.stopImmediatePropagation();event.preventDefault();}
  },true);
  $('openZoom').addEventListener('click',()=>{
    if(!TOTAL)return;
    zoomImg.src=fileFor(index);
    $('zoomTitle').textContent=`${c.name} Guide · หน้า ${String(index).padStart(2,'0')}`;
    zoom.classList.remove('large');
    $('toggleZoom').textContent='ขยาย 2×';zoom.showModal();
  });
  $('closeZoom').addEventListener('click',()=>zoom.close());
  $('toggleZoom').addEventListener('click',()=>{
    const large=zoom.classList.toggle('large');
    $('toggleZoom').textContent=large?'พอดีหน้าจอ':'ขยาย 2×';
  });
  zoom.addEventListener('click',event=>{if(event.target===zoom)zoom.close();});
  discover();
})();
