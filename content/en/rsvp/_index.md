---
title: "RSVP"
---
<form name="rsvp" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="rsvp">
  <p style="display:none"><label>Don’t fill this: <input name="bot-field"></label></p>

  <p><label>Full Name <input type="text" name="name" required></label></p>
  <p><label>Email <input type="email" name="email" required></label></p>
  <p>
    <label>Attending?
      <select name="attending" required>
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </label>
  </p>
  <p><label>Number of Guests <input type="number" name="guests" min="0" step="1"></label></p>
  <p><label>Notes <textarea name="message"></textarea></label></p>
  <p><button type="submit">Send RSVP</button></p>
</form>
