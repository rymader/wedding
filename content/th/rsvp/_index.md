---
title: "ตอบรับคำเชิญ"
---
<form name="rsvp-th" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="rsvp-th">
  <p style="display:none"><label>ห้ามกรอก: <input name="bot-field"></label></p>

  <p><label>ชื่อ-นามสกุล <input type="text" name="name" required></label></p>
  <p><label>อีเมล <input type="email" name="email" required></label></p>
  <p>
    <label>จะมาร่วมงานไหม?
      <select name="attending" required>
        <option value="">เลือก</option>
        <option>มาร่วม</option>
        <option>ไม่สะดวก</option>
      </select>
    </label>
  </p>
  <p><label>จำนวนผู้ติดตาม <input type="number" name="guests" min="0" step="1"></label></p>
  <p><label>ข้อความ <textarea name="message"></textarea></label></p>
  <p><button type="submit">ส่ง</button></p>
</form>
