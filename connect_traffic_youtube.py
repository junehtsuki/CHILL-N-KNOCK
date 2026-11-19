#!/usr/bin/env python3
"""Only wire the supplied YouTube ID into the EXISTING traffic-video.html.
No app.js / venue-partner.js / index.html / guide CSS / navigation edits.
"""
from pathlib import Path
import re
import sys
p=Path(__file__).resolve().parent/'docs'/'traffic-video.html'
if not p.exists():
    print('ยังไม่พบ docs/traffic-video.html — ตรวจว่าเปิดโฟลเดอร์แอป Final ถูกที่')
    sys.exit(1)
s=p.read_text(encoding='utf-8')
pattern=r"(const\s+TRAFFIC_YOUTUBE_ID\s*=\s*['\"])([^'\"]*)(['\"]\s*;)"
found=list(re.finditer(pattern,s))
if len(found)!=1:
    print('หยุด: ไม่พบตัวแปร TRAFFIC_YOUTUBE_ID เพียงหนึ่งจุด จะไม่แก้ไฟล์')
    sys.exit(1)
current=found[0].group(2)
new_id='COUVPOH-_Os'
if current==new_id:
    print('ลิงก์ YouTube ถูกเชื่อมแล้ว ไม่ต้องแก้ซ้ำ')
    sys.exit(0)
if current not in ('PUT_VIDEO_ID_HERE',''):
    print('หยุด: พบ Video ID เดิมที่ไม่ใช่ placeholder:', current)
    print('ตรวจเองก่อนแก้ เพื่อไม่เขียนทับลิงก์ที่ตั้งใจตั้งไว้')
    sys.exit(1)
new=s[:found[0].start(2)]+new_id+s[found[0].end(2):]
p.write_text(new,encoding='utf-8')
print('สำเร็จ: เชื่อม Traffic Simulation → https://youtu.be/COUVPOH-_Os')
print('แก้เฉพาะ docs/traffic-video.html: TRAFFIC_YOUTUBE_ID')
print('ไม่แก้โค้ดแอป UI, ปุ่มย้อนกลับ, หรือไฟล์คู่มือเดิม')
