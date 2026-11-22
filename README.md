# Rafid & Afsana — Cultural Nikkah Invitation

A fully static, responsive Nikkah wedding invitation using an olive-gold and deep-crimson palette. Everything runs in the browser, with no build step or paid services.

## Publish to Netlify (free)
1. Extract the ZIP archive.
2. Visit https://app.netlify.com/drop and log in.
3. Drag the **rafid-afsana-cultural-nikkah** folder (the one containing `index.html`) onto Netlify Drop.
4. Your website goes live on a `*.netlify.app` URL. You can rename the site in Netlify's domain settings.

## Files
- `index.html`: wedding content, accessible layout, metadata
- `style.css`: responsive design, floral theme and animations
- `script.js`: live countdown, share and calendar actions, scroll reveals
- `assets/*.svg`: original lightweight vector decorations and favicon

## Customize
- Edit `index.html` to change the invitation text, names, location or schedule.
- Edit the `:root` variables in `style.css` to update the color scheme.
- If date/time changes, also update the UTC timestamp in `script.js` and the calendar DTSTART/DTEND values.

### Important notes
- The calendar download assumes a **3-hour event** for convenience. An ending time wasn't provided; change `DTEND` if needed.
- The share feature works best on a published HTTPS website. When opened locally, use the browser URL instead.
- Google Fonts needs internet; fallback fonts render if blocked.
- No RSVP backend or collection of guest information has been configured.
- If you change the final Netlify domain, update or remove the `og:image` URL in `index.html` (it is currently a placeholder domain). The site still works without it.
