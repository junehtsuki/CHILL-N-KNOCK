#!/usr/bin/env python3
"""CHILL N' KNOCK – surgical flipbook role-tab installer.

Adds User / Runner / Venue tabs to existing three guides. Never touches
booking/business logic or the Help Center, and never overwrites a changed
existing reader/navigation function.
"""
from pathlib import Path
from datetime import datetime
import shutil
import sys

ROOT = Path(__file__).resolve().parent
DOCS = ROOT / 'docs'
ROLE_FILES = {
    'guest': 'guest-guide.html',
    'runner': 'runner-guide.html',
    'venue': 'venue-guide.html',
}
CSS_PATH = DOCS / 'runner-guide.css'
MARKER = 'cnk-guide-role-tabs'
CSS_MARKER = '/* CHILL N KNOCK: role selector for all 3 existing flipbooks */'

ICONS = {
    'guest': '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg>',
    'runner': '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="16" cy="5" r="2"/><path d="m12 9 3-1 3 3 3 1M13 8l-3 5 4 3-3 5M10 13l-4 3-3 5"/></svg>',
    'venue': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10 5 4h14l2 6v11H3V10Z"/><path d="M3 10c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0"/><path d="M9 21v-7h6v7"/></svg>',
}
LABELS = {'guest': 'User', 'runner': 'Runner', 'venue': 'Venue'}

CSS = r'''
/* CHILL N KNOCK: role selector for all 3 existing flipbooks */
.cnk-guide-role-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  max-width: 1150px;
  margin: 0 auto 18px;
}
.cnk-guide-role-tab {
  min-width: 0;
  min-height: 58px;
  padding: 11px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid #e9c6d2;
  border-radius: 17px;
  color: #961744;
  background: rgba(255, 253, 251, .8);
  text-decoration: none;
  font-size: 17px;
  font-weight: 750;
  transition: background .2s ease, color .2s ease;
}
.cnk-guide-role-tab svg {
  display: block;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.cnk-guide-role-tab:hover:not([aria-current="page"]),
.cnk-guide-role-tab:focus-visible:not([aria-current="page"]) {
  background: #fbe8ee;
}
.cnk-guide-role-tab[aria-current="page"] {
  background: linear-gradient(105deg, #91133d, #b52b5c);
  border-color: #a41d4b;
  color: #fff;
}
.cnk-guide-role-tab:focus-visible {outline: 3px solid #d986a7;outline-offset: 2px}
@media (max-width: 700px) {
  .cnk-guide-role-tabs {gap: 7px; margin: 0 9px 14px}
  .cnk-guide-role-tab {min-height: 44px; padding: 7px 5px; gap: 5px; border-radius: 12px; font-size: 12px}
  .cnk-guide-role-tab svg {width: 17px; height: 17px}
}
@media (max-width: 360px) {
  .cnk-guide-role-tab {font-size: 11px; gap: 4px}
  .cnk-guide-role-tab svg {width: 15px; height: 15px}
}
'''


def tabs(active: str) -> str:
    links = []
    for role, filename in ROLE_FILES.items():
        mark = ' aria-current="page"' if role == active else ''
        links.append(
            '        <a class="cnk-guide-role-tab" href="' + filename + '"' + mark +
            ' onclick="location.replace(this.href);return false;">' +
            ICONS[role] + '<span>' + LABELS[role] + '</span></a>'
        )
    return (
        '      <nav class="cnk-guide-role-tabs" aria-label="เลือกคู่มือบทบาท">\n'
        + '\n'.join(links) + '\n      </nav>\n\n'
    )


def main() -> int:
    to_write = {}
    for role, filename in ROLE_FILES.items():
        p = DOCS / filename
        if not p.is_file():
            print('ไม่พบไฟล์:', p)
            return 1
        src = p.read_text(encoding='utf-8')
        if MARKER in src:
            print('พบแถบเลือกบทบาทอยู่แล้ว:', filename, '(หยุดเพื่อไม่เพิ่มซ้ำ)')
            return 1
        if f'data-guide-role="{role}"' not in src:
            print('บทบาทไฟล์ไม่ตรง:', filename, '(ไม่แก้)')
            return 1
        anchor = '      <section class="reader-area"'
        if src.count(anchor) != 1:
            print('ตำแหน่งแทรกไม่ตรง:', filename, '(ไม่แก้)')
            return 1
        to_write[p] = src.replace(anchor, tabs(role) + anchor, 1)
    if not CSS_PATH.is_file():
        print('ไม่พบไฟล์:', CSS_PATH)
        return 1
    css_src = CSS_PATH.read_text(encoding='utf-8')
    if CSS_MARKER in css_src:
        print('พบ CSS แถบเลือกบทบาทอยู่แล้ว (หยุดเพื่อไม่เพิ่มซ้ำ)')
        return 1
    to_write[CSS_PATH] = css_src.rstrip() + '\n\n' + CSS

    backup = ROOT.parent / (ROOT.name + '_RoleTabs_BACKUP_' + datetime.now().strftime('%Y%m%d_%H%M%S'))
    backup.mkdir(parents=True, exist_ok=False)
    for path in to_write:
        shutil.copy2(path, backup / path.name)
    for path, new_text in to_write.items():
        path.write_text(new_text, encoding='utf-8')
    print('ติดตั้งสำเร็จ · เพิ่มแท็บ User / Runner / Venue')
    print('เปลี่ยนเฉพาะ: ' + ', '.join('docs/' + p.name for p in to_write))
    print('Backup อยู่ที่:', backup)
    print('ไม่แก้ app.js, venue-partner.js, index.html, Help Center และระบบจอง')
    return 0


if __name__ == '__main__':
    sys.exit(main())
