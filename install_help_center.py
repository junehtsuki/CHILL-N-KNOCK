#!/usr/bin/env python3
"""Targeted Help Center installer for CHILL N’ KNOCK.
Run from the app root after merging the supplied docs folder.
Preserves all existing application logic; edits only the two help sections
and links to isolated help assets. Backs up three original files outside the app.
"""
from pathlib import Path
import shutil
import sys
from datetime import datetime

root=Path(__file__).resolve().parent
required=['index.html','app.js','venue-partner.js']
missing=[name for name in required if not (root/name).is_file()]
if missing:
    sys.exit('หยุดติดตั้ง: ไม่พบไฟล์ '+', '.join(missing)+' ในโฟลเดอร์เดียวกับ install_help_center.py')
for name in ['docs/cnk-help-center.js','docs/cnk-help-center.css','docs/runner-guide.html','docs/guest-guide.html','docs/venue-guide.html','docs/traffic-video.html']:
    if not (root/name).is_file():sys.exit('หยุดติดตั้ง: ไม่พบ '+name+' (กรุณาคัดลอกโฟลเดอร์ docs จาก ZIP ก่อน)')

content={n:(root/n).read_text(encoding='utf-8') for n in required}
original=content.copy()

def exactly_once(src,old,description):
    n=src.count(old)
    if n!=1:raise ValueError(f'{description}: คาดว่าจะพบ 1 จุด แต่พบ {n} จุด จึงไม่แก้ไฟล์เพื่อความปลอดภัย')

def patch_index(s):
    css='<link rel="stylesheet" href="docs/cnk-help-center.css?v=1">'
    js='<script src="docs/cnk-help-center.js?v=1"></script>'
    if css not in s:
        anchor='<link rel="stylesheet" href="cnk-guest-features.css?v=1">'
        exactly_once(s,anchor,'index.html CSS anchor')
        s=s.replace(anchor,anchor+'\n  '+css,1)
    if js not in s:
        anchor='<script src="app.js"></script>'
        exactly_once(s,anchor,'index.html JS anchor')
        s=s.replace(anchor,anchor+'\n  '+js,1)
    return s

def patch_app(s):
    begin="if (UI.modal === 'help') return head('ศูนย์ช่วยเหลือ', `"
    exactly_once(s,begin,'app.js Help Center')
    start=s.index(begin)
    end=s.find("if (UI.modal === 'privacy')",start)
    if end<0:raise ValueError('app.js: ไม่พบจุดสิ้นสุด Help Center')
    a=s[start:end]
    if '${cnkHelpCenterCards(UI.role)}' in a:return s
    token='''    <div class="subtle-card">'''
    first=a.find(token)
    second=a.find(token,first+len(token))
    if first<0 or second<0:raise ValueError('app.js: รูปแบบ Help Center ไม่ตรงกับเวอร์ชันที่ตรวจ')
    middle=a[first:second]
    if 'docs/CHILL_N_KNOCK_User_Guide.pdf' not in middle:
        raise ValueError('app.js: การ์ด PDF เดิมไม่ตรง กรุณาตรวจด้วยตนเอง')
    a=a[:first]+'    ${cnkHelpCenterCards(UI.role)}\n\n'+a[second:]
    return s[:start]+a+s[end:]

def patch_venue(s):
    begin="help:['ศูนย์ช่วยเหลือ',`"
    exactly_once(s,begin,'venue-partner.js Help Center')
    start=s.index(begin)
    end=s.find('privacy:[',start)
    if end<0:raise ValueError('venue-partner.js: ไม่พบส่วนถัดจาก Help Center')
    a=s[start:end]
    if "${cnkHelpCenterCards('venue')}" in a:return s
    pdf_start=a.find('    <a\n      class="cnk-vp-primary cnk-vp-full"')
    pdf_end=a.find('    </a>',pdf_start)
    if pdf_start<0 or pdf_end<0 or 'docs/CHILL_N_KNOCK_User_Guide.pdf' not in a[pdf_start:pdf_end]:
        raise ValueError('venue-partner.js: ไม่พบการ์ด PDF เดิมตามที่ตรวจ')
    a=a[:pdf_start]+a[pdf_end+len('    </a>'):]
    intro='  <div class="cnk-vp-info-card">'
    exactly_once(a,intro,'venue-partner.js Help content')
    a=a.replace(intro,"  ${cnkHelpCenterCards('venue')}\n"+intro,1)
    return s[:start]+a+s[end:]

try:
    updates={
        'index.html':patch_index(content['index.html']),
        'app.js':patch_app(content['app.js']),
        'venue-partner.js':patch_venue(content['venue-partner.js']),
    }
except ValueError as exc:
    sys.exit('ติดตั้งไม่สำเร็จ (ยังไม่ได้แก้ไฟล์ใด): '+str(exc))

changed=[name for name,after in updates.items() if after!=original[name]]
if not changed:
    print('ติดตั้งไว้แล้ว: ไม่ต้องแก้โค้ดซ้ำ')
    sys.exit(0)
backup=root.parent/(root.name+'_HelpCenter_BACKUP_'+datetime.now().strftime('%Y%m%d_%H%M%S'))
backup.mkdir(parents=True,exist_ok=False)
for name in changed:
    shutil.copy2(root/name,backup/name)
for name in changed:
    (root/name).write_text(updates[name],encoding='utf-8')
print('ติดตั้งสำเร็จ · เปลี่ยนเฉพาะ: '+', '.join(changed))
print('สำรองไฟล์ต้นฉบับไว้นอกโปรเจกต์ที่: '+str(backup))
print('ยังไม่แก้ระบบจอง Runner/Guest/Venue และยังไม่ลบ PDF เดิม')
print('เปิด Go Live แล้วตรวจ Help Center ทั้งสามบทบาท')
