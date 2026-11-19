/* Role-specific help links only. No change to booking/Runner/Venue logic. */
function cnkHelpCenterCards(role){
  const roles={
    user:{name:'User',file:'guest-guide.html'},
    runner:{name:'Runner',file:'runner-guide.html'},
    venue:{name:'Venue Partner',file:'venue-guide.html'}
  };
  const current=roles[role]||roles.user;
  const bookIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6c-2.9-1.9-5.5-2.2-9-1.7v14c3.5-.6 6.1-.2 9 1.7 2.9-1.9 5.5-2.3 9-1.7v-14c-3.5-.5-6.1-.2-9 1.7zM12 6v14"/></svg>';
  const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor" stroke="none"/><path d="m10 8 6 4-6 4z" fill="#fff" stroke="none"/></svg>';
  return `<div class="cnk-help-cards" aria-label="คู่มือและวิดีโอช่วยเหลือ">
    <a class="cnk-help-row" href="docs/${current.file}" target="_blank" rel="noopener noreferrer">
      <span class="cnk-help-icon">${bookIcon}</span>
      <span class="cnk-help-copy"><strong>คู่มือการใช้งาน</strong>
        <span>Interactive Ebook · ${current.name}</span><small>เปิดอ่านและพลิกหน้ากระดาษ</small>
      </span><span class="cnk-help-arrow" aria-hidden="true">›</span>
    </a>
    <a class="cnk-help-row" href="docs/traffic-video.html" target="_blank" rel="noopener noreferrer">
      <span class="cnk-help-icon">${playIcon}</span>
      <span class="cnk-help-copy"><strong>Traffic Simulation</strong>
        <span>Friday Night Rush · 10 คำขอ · 3 บทบาท</span><small>รับชมวิดีโอจำลองสถานการณ์</small>
      </span><span class="cnk-help-arrow" aria-hidden="true">›</span>
    </a>
  </div>`;
}
