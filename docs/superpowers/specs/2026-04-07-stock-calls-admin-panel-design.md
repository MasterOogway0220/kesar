# Stock Calls Admin Panel — Design Spec
**Date:** 2026-04-07  
**Project:** Kesar Securities Website  
**Hosting:** Hostinger (PHP + static HTML)

---

## Goal

Allow the Kesar Securities team to add weekly stock call YouTube videos through a password-protected admin panel, without touching code files or the hosting dashboard. New entries appear first on the public Stock Talk page.

---

## Architecture

All files live in the same Hostinger website folder. No external database or services needed.

```
kesarsecurities.in/
├── stock_calls.json       ← data store (array of video objects, newest first)
├── stock-api.php          ← PHP API: list / add / delete (session-auth required for write)
├── admin.html             ← Admin panel UI (login + manage stock calls)
└── stock_talk.html        ← Modified: fetches from stock-api.php instead of hardcoded array
```

---

## Data Format (`stock_calls.json`)

```json
[
  {
    "id": "1712345678",
    "embedUrl": "https://www.youtube.com/embed/XXXXXXXXXXX",
    "title": "Stock call title",
    "description": "Short description of the call.",
    "watchUrl": "https://youtu.be/XXXXXXXXXXX",
    "youtubeTitle": "Full YouTube video title",
    "addedAt": "2026-04-07T10:00:00+05:30"
  }
]
```

- Array is stored newest-first (new entries are prepended)
- `id` is a Unix timestamp string (used for delete operations)
- Existing hardcoded videos from `stock_talk.html` are migrated into this file on first setup

---

## PHP API (`stock-api.php`)

### Endpoints

| Method | Action param | Auth required | Description |
|--------|-------------|---------------|-------------|
| GET    | `?action=list` | No | Returns full JSON array of stock calls |
| POST   | `action=login` | No | Starts a PHP session on valid credentials |
| POST   | `action=add` | Yes (session) | Prepends a new stock call to the JSON file |
| POST   | `action=delete` | Yes (session) | Removes a stock call by `id` |
| POST   | `action=logout` | Yes (session) | Destroys the session |

### Auth
- Username: `kesar`, Password: `kesar`
- PHP session (`$_SESSION['admin']`) is set on successful login
- All write endpoints return `401 Unauthorized` if session is not set

### File locking
- PHP `flock()` used when writing to `stock_calls.json` to prevent race conditions

---

## Admin Panel (`admin.html`)

Single HTML page, no framework dependencies.

### Login screen
- Username + password fields
- Submits `POST` to `stock-api.php?action=login` via `fetch()`
- On success: hides login form, shows management UI

### Management UI (shown after login)
- **Add Stock Call form** with fields:
  - YouTube Embed URL (e.g. `https://www.youtube.com/embed/XXXXX`)
  - Title
  - Description
  - Watch URL (e.g. `https://youtu.be/XXXXX`)
  - YouTube Title (used for iframe `title` attribute)
- Submit button → POST to `stock-api.php?action=add`
- On success: refreshes the list

- **Existing Stock Calls list** — shows all current entries with:
  - Video title
  - Thumbnail preview (from YouTube embed URL)
  - Delete button → POST to `stock-api.php?action=delete` with `id`

- **Logout button** → POST to `stock-api.php?action=logout`, returns to login screen

### Styling
- Matches Kesar Securities brand colors (blue `#2660B5`, white background)
- Clean, minimal table/card layout — no external CSS frameworks needed (or Bootstrap CDN)

---

## Stock Talk Page (`stock_talk.html`)

- Remove the hardcoded `videos` array and `renderVideos()` function
- On `DOMContentLoaded`, call `fetch('stock-api.php?action=list')`
- Render cards from the returned JSON array (same card HTML as current)
- Show a loading state while fetching
- Show a friendly error message if fetch fails

---

## Migration

The 10 existing hardcoded video entries in `stock_talk.html` are written into `stock_calls.json` as the initial dataset, preserving the existing display order (they will appear after any new additions, which is correct since new = first).

---

## Security Considerations

- PHP session is HTTP-only; no credentials stored client-side
- Write endpoints validate all required fields server-side before writing
- JSON file is written atomically (write to temp, rename) to avoid corrupt reads
- `stock_calls.json` does not contain sensitive data — public read is intentional
