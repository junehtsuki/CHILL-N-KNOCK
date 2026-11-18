/* Runner Flipbook: self-contained. The app's business logic is never accessed. */
(() => {
  'use strict';
  const TOTAL=15;
  const fileFor=(n)=>`runner-pages/page-${String(n).padStart(2,'0')}.webp`;
  const $=id=>document.getElementById(id);
  const book=$('book'),current=$('currentPage'),layer=$('turnLayer'),under=$('underPage'),staticImg=$('staticImage'),frontImg=$('frontImage'),backImg=$('backImage'),flippingHalf=$('flippingHalf');
  const previous=$('prevPage'),next=$('nextPage'),indicator=$('pageIndicator'),paper=$('paperCount'),bar=$('progressBar'),track=$('progressTrack'),jump=$('pageJump');
  const zoom=$('zoomDialog'),zoomImg=$('zoomImg');
  let index=1,busy=false,finishTimer=null,pointerStart=null;
  const preload=new Map();
  function warm(n){
    if(n<1||n>TOTAL||preload.has(n))return;
    const img=new Image(); img.src=fileFor(n);preload.set(n,img);
  }
  function refresh(){
    current.src=fileFor(index);
    current.alt=`คู่มือ Runner หน้า ${index} จาก ${TOTAL}`;
    const text=`${String(index).padStart(2,'0')} / ${TOTAL}`;
    paper.textContent=text;
    indicator.innerHTML=`${String(index).padStart(2,'0')} <span>/ ${TOTAL}</span>`;
    bar.style.width=`${index/TOTAL*100}%`;
    track.setAttribute('aria-valuenow',String(index));
    jump.value=String(index);
    previous.disabled=index===1;
    next.disabled=index===TOTAL;
    warm(index-1);warm(index);warm(index+1);
    if(zoom.open){zoomImg.src=fileFor(index);$('zoomTitle').textContent=`Runner Guide · หน้า ${String(index).padStart(2,'0')}`;}
  }
  function finishFlip(target){
    window.clearTimeout(finishTimer);
    index=target;
    refresh();
    layer.hidden=true;
    layer.className='turn-layer';
    busy=false;
  }
  function go(target,animate=true){
    if(busy)return;
    target=Math.max(1,Math.min(TOTAL,Number(target)||1));
    if(target===index)return;
    if(!animate || Math.abs(target-index)>1 || matchMedia('(prefers-reduced-motion: reduce)').matches){index=target;refresh();return;}
    busy=true;
    under.src=fileFor(target);
    staticImg.src=fileFor(index);
    frontImg.src=fileFor(index);
    backImg.src=fileFor(target);
    const direction=target>index?'to-next':'to-prev';
    layer.hidden=false;
    layer.className=`turn-layer ${direction}`;
    // Force style calculation to make the turn effect reliable on first click.
    void flippingHalf.offsetWidth;
    requestAnimationFrame(()=>layer.classList.add('turning'));
    finishTimer=window.setTimeout(()=>finishFlip(target),860);
  }
  function flipNext(){go(index+1)}
  function flipPrev(){go(index-1)}
  for(let i=1;i<=TOTAL;i++){
    const option=document.createElement('option');
    option.value=String(i);
    option.textContent=i===1?'01 · หน้าปก':`${String(i).padStart(2,'0')} · หน้า ${i}`;
    jump.appendChild(option);
  }
  previous.addEventListener('click',flipPrev);
  next.addEventListener('click',flipNext);
  jump.addEventListener('change',()=>go(Number(jump.value),false));
  book.querySelector('.click-left').addEventListener('click',flipPrev);
  book.querySelector('.click-right').addEventListener('click',flipNext);
  document.addEventListener('keydown',event=>{
    if(zoom.open || ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
    if(event.key==='ArrowRight'){event.preventDefault();flipNext();}
    if(event.key==='ArrowLeft'){event.preventDefault();flipPrev();}
  });
  book.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse')return; // mouse can click book's left/right side instead
    pointerStart={x:event.clientX,y:event.clientY};
  },{passive:true});
  book.addEventListener('pointerup',event=>{
    if(!pointerStart)return;
    const dx=event.clientX-pointerStart.x,dy=event.clientY-pointerStart.y;
    pointerStart=null;
    if(Math.abs(dx)>42 && Math.abs(dx)>Math.abs(dy)*1.4){
      // Ignore the click following a swipe to prevent double-advancing.
      suppressClickUntil=Date.now()+350;
      dx<0?flipNext():flipPrev();
    }
  },{passive:true});
  // Delegated click suppression only when a touch swipe preceded it.
  let suppressClickUntil=0;
  book.addEventListener('click',event=>{
    if(Date.now()<suppressClickUntil){event.stopImmediatePropagation();event.preventDefault();}
  },true);
  $('openZoom').addEventListener('click',()=>{
    zoomImg.src=fileFor(index);
    $('zoomTitle').textContent=`Runner Guide · หน้า ${String(index).padStart(2,'0')}`;
    zoom.classList.remove('large');
    $('toggleZoom').textContent='ขยาย 2×';
    zoom.showModal();
  });
  $('closeZoom').addEventListener('click',()=>zoom.close());
  $('toggleZoom').addEventListener('click',()=>{
    const large=zoom.classList.toggle('large');
    $('toggleZoom').textContent=large?'พอดีหน้าจอ':'ขยาย 2×';
  });
  zoom.addEventListener('click',event=>{if(event.target===zoom)zoom.close();});
  refresh();
})();
