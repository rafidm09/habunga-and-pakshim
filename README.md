# Rafid & Afsana — Cultural Nikkah Invitation

A fully static, responsive Nikkah wedding invitation using an olive-gold and deep-crimson palette. Everything runs in the browser, with no build step or paid services.

## Publish to Netlify (free)
1. Extract the ZIP archive.
2. Visit https://app.netlify.com/drop and log in.
3. Drag the **rafid-afsana-cultural-nikkah** folder (the one containing `index.html`) onto Netlify Drop.
4. Your website goes live on a `*.netlify.app` URL. You can rename the site in Netlify's domain settings.

### RSVP emails
The RSVP form is configured for Netlify Forms. After publishing, open **Forms** in the Netlify dashboard, select the `rsvp` form, then add an email notification for `rafidmohtasim2140@gmail.com`. Each submission will include the guest's name, phone number, and attendance response.

## Files
- `index.html`: wedding content, accessible layout, metadata
- `style.css`: responsive design, floral theme and animations
- `script.js`: live countdown, RSVP confirmation, calendar actions, scroll reveals
- `assets/*.svg`: original lightweight vector decorations and favicon

## Customize
- Edit `index.html` to change the invitation text, names, location or schedule.
- Edit the `:root` variables in `style.css` to update the color scheme.
- If date/time changes, also update the UTC timestamp in `script.js` and the calendar DTSTART/DTEND values.

### Important notes
- The calendar download assumes a **3-hour event** for convenience. An ending time wasn't provided; change `DTEND` if needed.
- The share feature works best on a published HTTPS website. When opened locally, use the browser URL instead.
- Google Fonts needs internet; fallback fonts render if blocked.
- RSVP submissions require publication on Netlify and the email notification setup above; they do not send from `localhost`.
- If you change the final Netlify domain, update or remove the `og:image` URL in `index.html` (it is currently a placeholder domain). The site still works without it.
