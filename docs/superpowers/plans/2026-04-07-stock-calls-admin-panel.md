# Stock Calls Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a password-protected admin panel that lets the Kesar Securities team add/delete weekly stock call YouTube videos, stored in a JSON file, with the public Stock Talk page fetching live from that file.

**Architecture:** A `stock_calls.json` file on Hostinger acts as the data store. `stock-api.php` handles all reads and writes (with PHP session auth for writes). `admin.html` is the admin UI. `stock_talk.html` is updated to fetch from the PHP API instead of its hardcoded array.

**Tech Stack:** PHP (sessions, file I/O), HTML/CSS/JS (vanilla), Bootstrap 5 (CDN), JSON file storage.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `stock_calls.json` | Create | All stock call data, newest first |
| `stock-api.php` | Create | PHP API: list, login, logout, check, add, delete |
| `admin.html` | Create | Admin UI: login screen + management UI |
| `stock_talk.html` | Modify | Remove hardcoded array, fetch from stock-api.php |

---

### Task 1: Create `stock_calls.json` with migrated data

**Files:**
- Create: `stock_calls.json`

- [ ] **Step 1: Create the JSON file with all 10 existing videos**

Create `stock_calls.json` in the project root with this exact content (videos listed newest-first, matching the current order in `stock_talk.html`):

```json
[
  {
    "id": "1",
    "embedUrl": "https://www.youtube.com/embed/Z0RlitKCrWU",
    "title": "Momentum is building in this shipping stock.",
    "description": "After a clean breakout and higher-bottom formation, this stock could be preparing for its next major voyage upward.",
    "watchUrl": "https://youtu.be/Z0RlitKCrWU",
    "youtubeTitle": "#StockTalkWithVentura | Momentum is building in this shipping stock.",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "2",
    "embedUrl": "https://www.youtube.com/embed/NwT_V28DFd8?si=hFkHFAUdmII9bklg",
    "title": "Auto Components Stock In The Fast Lane | Trending Stock | Ventura",
    "description": "An auto components stock has just delivered an upside breakout after consolidation...",
    "watchUrl": "https://youtu.be/NwT_V28DFd8?si=2LjMzxJNbDuM-xiF",
    "youtubeTitle": "Auto Components Stock In The Fast Lane | Trending Stock | Ventura",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "3",
    "embedUrl": "https://www.youtube.com/embed/IwOA9EgxdRU?si=H_rQlPDUBiaJNZQj",
    "title": "Is This Electrical Infrastructure Stock Powering Up for a Move Toward ₹9,000?",
    "description": "A leading electrical infrastructure stock has just delivered a triangle pattern...",
    "watchUrl": "https://youtu.be/IwOA9EgxdRU?si=H_rQlPDUBiaJNZQj",
    "youtubeTitle": "Is This Electrical Infrastructure Stock Powering Up for a Move Toward ₹9,000? | Trending Stock",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "4",
    "embedUrl": "https://www.youtube.com/embed/UN-lgpF518U?si=zHoxR3-rz5pngx5i",
    "title": "Can This AMC Stock Go From ₹918 to ₹1,500?",
    "description": "An asset management company stock has just confirmed an ascending triangle breakout after forming strong higher bottoms...",
    "watchUrl": "https://youtu.be/UN-lgpF518U?si=zHoxR3-rz5pngx5i",
    "youtubeTitle": "Can This AMC Stock Go From ₹918 to ₹1,500?",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "5",
    "embedUrl": "https://www.youtube.com/embed/skitbjGzqUo",
    "title": "Is it Powering Up After a Year of Consolidation?",
    "description": "A power sector stock has just confirmed a symmetrical triangle breakout after nearly a year of consolidation.",
    "watchUrl": "https://youtu.be/skitbjGzqUo?si=fgiSl64Zpg6dDG9N",
    "youtubeTitle": "Watch this Stock: Is it Powering Up After a Year of Consolidation?",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "6",
    "embedUrl": "https://www.youtube.com/embed/2XQPJURnUzM",
    "title": "Is This Industrial Stock Ready for a Long-Term Rally?",
    "description": "An industrial and capital goods stock has just delivered an upside breakout from a triangle pattern after months of consolidation.",
    "watchUrl": "https://youtu.be/2XQPJURnUzM?si=gRL_EkIDuz9SbZwy",
    "youtubeTitle": "Is This Industrial Stock Ready for a Long-Term Rally? | Trending Stock | Ventura",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "7",
    "embedUrl": "https://www.youtube.com/embed/_V7Pq4jQfTA?si=tkEK987ExGG_gvIq",
    "title": "Is This Small Finance Bank Stock Reversing After a 1-Year Consolidation?",
    "description": "A small finance bank stock has just delivered...",
    "watchUrl": "https://youtu.be/_V7Pq4jQfTA?si=tkEK987ExGG_gvIq",
    "youtubeTitle": "Is This Small Finance Bank Stock Reversing After a 1-Year Consolidation?",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "8",
    "embedUrl": "https://www.youtube.com/embed/JMf2Tt9J_FA?si=_hLeyLA9vzGVzaNb&start=10",
    "title": "What comes after this Banking Stock Breaking Out",
    "description": "A banking stock has just delivered a triangle pattern breakout after nearly two years of consolidation...",
    "watchUrl": "https://youtu.be/JMf2Tt9J_FA?si=eLsCy8Rh9Qd4eYzY",
    "youtubeTitle": "What comes after this Banking Stock Breaking Out post a 2-Year Consolidation? | Ventura",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "9",
    "embedUrl": "https://www.youtube-nocookie.com/embed/K628LEvaRXE?si=Gn9_mKEPAy2fBpZI",
    "title": "Is This Pharma Stock Setting Up for a Rally Toward ₹2,500?",
    "description": "A pharma stock has just confirmed a symmetrical triangle breakout after months of consolidation...",
    "watchUrl": "https://youtu.be/K628LEvaRXE?si=Gn9_mKEPAy2fBpZI",
    "youtubeTitle": "Is This Pharma Stock Setting Up for a Rally Toward ₹2500? | Trending Stock | Ventura",
    "addedAt": "2025-01-01T00:00:00+05:30"
  },
  {
    "id": "10",
    "embedUrl": "https://www.youtube.com/embed/mIdHUrRmUNo",
    "title": "Momentum is building in this auto components stock",
    "description": "Could ₹10,300 be next? Watch this video to know more.",
    "watchUrl": "https://youtu.be/mIdHUrRmUNo",
    "youtubeTitle": "Stock Talk with BKG",
    "addedAt": "2025-01-01T00:00:00+05:30"
  }
]
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('stock_calls.json','utf8')); console.log('Valid JSON')"`
Expected output: `Valid JSON`

- [ ] **Step 3: Commit**

```bash
git add stock_calls.json
git commit -m "feat: add stock_calls.json data store with migrated video data"
```

---

### Task 2: Create `stock-api.php`

**Files:**
- Create: `stock-api.php`

- [ ] **Step 1: Create the PHP API file**

Create `stock-api.php` in the project root with this exact content:

```php
<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$DATA_FILE  = __DIR__ . '/stock_calls.json';
$ADMIN_USER = 'kesar';
$ADMIN_PASS = 'kesar';

// Determine action — from query string or POST body
$action = isset($_GET['action']) ? $_GET['action'] : '';
$body   = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw  = file_get_contents('php://input');
    $body = json_decode($raw, true) ?: [];
    if (empty($action) && isset($body['action'])) {
        $action = $body['action'];
    }
}

function readData($file) {
    if (!file_exists($file)) return [];
    $content = file_get_contents($file);
    return json_decode($content, true) ?: [];
}

function writeData($file, $data) {
    $tmp = $file . '.tmp';
    file_put_contents($tmp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    rename($tmp, $file);
}

function requireAuth() {
    if (empty($_SESSION['admin'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }
}

switch ($action) {

    case 'list':
        echo json_encode(readData($DATA_FILE));
        break;

    case 'check':
        echo json_encode(['loggedIn' => !empty($_SESSION['admin'])]);
        break;

    case 'login':
        $user = isset($body['username']) ? trim($body['username']) : '';
        $pass = isset($body['password']) ? trim($body['password']) : '';
        if ($user === $ADMIN_USER && $pass === $ADMIN_PASS) {
            $_SESSION['admin'] = true;
            echo json_encode(['success' => true]);
        } else {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        }
        break;

    case 'logout':
        session_destroy();
        echo json_encode(['success' => true]);
        break;

    case 'add':
        requireAuth();
        $required = ['embedUrl', 'title', 'description', 'watchUrl', 'youtubeTitle'];
        foreach ($required as $field) {
            if (empty($body[$field])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
                exit;
            }
        }
        $entry = [
            'id'           => (string) time(),
            'embedUrl'     => $body['embedUrl'],
            'title'        => $body['title'],
            'description'  => $body['description'],
            'watchUrl'     => $body['watchUrl'],
            'youtubeTitle' => $body['youtubeTitle'],
            'addedAt'      => date('c'),
        ];
        $data = readData($DATA_FILE);
        array_unshift($data, $entry);   // newest first
        writeData($DATA_FILE, $data);
        echo json_encode(['success' => true, 'entry' => $entry]);
        break;

    case 'delete':
        requireAuth();
        $id = isset($body['id']) ? trim($body['id']) : '';
        if ($id === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'id is required']);
            exit;
        }
        $data     = readData($DATA_FILE);
        $filtered = array_values(array_filter($data, fn($item) => $item['id'] !== $id));
        writeData($DATA_FILE, $filtered);
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Unknown action']);
}
```

- [ ] **Step 2: Verify the list endpoint returns all 10 videos**

After uploading to Hostinger (or testing locally with PHP CLI), open:
`https://kesarsecurities.in/stock-api.php?action=list`

Expected: a JSON array of 10 objects, the first having `"title": "Momentum is building in this shipping stock."`

- [ ] **Step 3: Commit**

```bash
git add stock-api.php
git commit -m "feat: add stock-api.php with list/login/logout/add/delete endpoints"
```

---

### Task 3: Update `stock_talk.html` to fetch from the API

**Files:**
- Modify: `stock_talk.html` (the `<script>` block at the bottom, lines 344–455)

- [ ] **Step 1: Replace the hardcoded script block**

In `stock_talk.html`, find and remove the entire `<script>` block that starts with:
```js
// Video data array
const videos = [
```
and ends just before:
```html
<!-- jquery -->
```

Replace it with this script block:

```html
<script>
    function createVideoCard(video) {
        return `
        <div class="col-md-4 col-lg-4">
            <div class="card weekly-review-item wow fadeInUp" data-wow-duration="0.8s">
                <div class="card--secondary__content px-xxl-4 px-sm-3 px-2 pb-lg-4 pb-3">
                    <div class="ratio ratio-16x9 mt-4 mb-4">
                        <iframe
                            width="560"
                            height="315"
                            src="${video.embedUrl}"
                            title="${video.youtubeTitle}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <h4 class="mb-3">${video.title}</h4>
                    <p class="mb-4">${video.description}</p>
                    <a class="btn btn-primary w-100" href="${video.watchUrl}" target="_blank">Watch Now</a>
                </div>
            </div>
        </div>`;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const container = document.getElementById('video-container');

        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-3 text-muted">Loading stock calls...</p>
            </div>`;

        fetch('stock-api.php?action=list')
            .then(function (res) {
                if (!res.ok) throw new Error('Network error');
                return res.json();
            })
            .then(function (videos) {
                if (!videos.length) {
                    container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No stock calls yet.</p></div>';
                    return;
                }
                container.innerHTML = videos.map(createVideoCard).join('');
            })
            .catch(function () {
                container.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <p class="text-danger">Unable to load stock calls. Please try again later.</p>
                    </div>`;
            });
    });
</script>
```

- [ ] **Step 2: Verify the page still shows all 10 videos**

Open `stock_talk.html` in a browser (served via a local PHP server or on Hostinger).
Expected: all 10 video cards render correctly, same as before.

- [ ] **Step 3: Commit**

```bash
git add stock_talk.html
git commit -m "feat: update stock_talk.html to fetch videos from stock-api.php"
```

---

### Task 4: Create `admin.html`

**Files:**
- Create: `admin.html`

- [ ] **Step 1: Create the admin panel page**

Create `admin.html` in the project root with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin — Kesar Securities Stock Talk</title>
    <link rel="shortcut icon" href="assets/kesarnew.png" type="image/x-icon">
    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/bootstrap-icons.css">
    <style>
        body { background: #f4f6fb; }
        .admin-wrapper { max-width: 960px; margin: 0 auto; padding: 30px 15px; }
        .brand-bar {
            background: #2660B5;
            color: #fff;
            padding: 14px 24px;
            border-radius: 10px 10px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .brand-bar h1 { font-size: 1.2rem; margin: 0; font-weight: 600; }
        .panel-card { background: #fff; border-radius: 0 0 10px 10px; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
        .panel-body { padding: 30px; }
        .entry-row {
            border: 1px solid #e3e8f0;
            border-radius: 8px;
            padding: 14px 16px;
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
            gap: 14px;
            background: #fafbfd;
        }
        .entry-thumb { width: 120px; flex-shrink: 0; border-radius: 6px; overflow: hidden; }
        .entry-thumb img { width: 100%; display: block; }
        .entry-meta { flex: 1; min-width: 0; }
        .entry-meta strong { display: block; margin-bottom: 4px; font-size: .95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .entry-meta small { color: #888; font-size: .8rem; }
        .btn-del { flex-shrink: 0; }
        #login-section { max-width: 400px; margin: 80px auto; }
        .form-label { font-weight: 500; }
        .alert { display: none; }
    </style>
</head>
<body>

<!-- ===== LOGIN SECTION ===== -->
<div id="login-section">
    <div class="text-center mb-4">
        <img src="assets/kesar.png" alt="Kesar Securities" style="height:50px">
        <h5 class="mt-3 fw-600">Stock Talk Admin</h5>
    </div>
    <div class="card shadow-sm">
        <div class="card-body p-4">
            <h6 class="mb-3 fw-bold">Sign In</h6>
            <div id="login-error" class="alert alert-danger" role="alert"></div>
            <div class="mb-3">
                <label class="form-label" for="login-user">Username</label>
                <input type="text" id="login-user" class="form-control" placeholder="kesar" autocomplete="username">
            </div>
            <div class="mb-4">
                <label class="form-label" for="login-pass">Password</label>
                <input type="password" id="login-pass" class="form-control" placeholder="••••••" autocomplete="current-password">
            </div>
            <button class="btn btn-primary w-100" id="login-btn">
                <span id="login-spinner" class="spinner-border spinner-border-sm me-2 d-none"></span>
                Sign In
            </button>
        </div>
    </div>
</div>

<!-- ===== ADMIN SECTION (hidden until logged in) ===== -->
<div id="admin-section" class="admin-wrapper" style="display:none">
    <div class="brand-bar">
        <h1><i class="bi bi-bar-chart-line-fill me-2"></i>Stock Talk Admin</h1>
        <button class="btn btn-sm btn-outline-light" id="logout-btn">
            <i class="bi bi-box-arrow-right me-1"></i>Logout
        </button>
    </div>
    <div class="panel-card">
        <div class="panel-body">

            <!-- ADD FORM -->
            <h5 class="mb-3 fw-bold">Add New Stock Call</h5>
            <div id="add-error" class="alert alert-danger" role="alert"></div>
            <div id="add-success" class="alert alert-success" role="alert"></div>
            <div class="row g-3 mb-4">
                <div class="col-md-6">
                    <label class="form-label" for="f-embedUrl">YouTube Embed URL <span class="text-danger">*</span></label>
                    <input type="url" id="f-embedUrl" class="form-control" placeholder="https://www.youtube.com/embed/XXXXXXXXXXX">
                    <div class="form-text">Example: https://www.youtube.com/embed/ABC123xyz</div>
                </div>
                <div class="col-md-6">
                    <label class="form-label" for="f-watchUrl">Watch URL <span class="text-danger">*</span></label>
                    <input type="url" id="f-watchUrl" class="form-control" placeholder="https://youtu.be/XXXXXXXXXXX">
                    <div class="form-text">The short link shown on the Watch Now button</div>
                </div>
                <div class="col-12">
                    <label class="form-label" for="f-title">Card Title <span class="text-danger">*</span></label>
                    <input type="text" id="f-title" class="form-control" placeholder="e.g. Momentum is building in this shipping stock.">
                </div>
                <div class="col-12">
                    <label class="form-label" for="f-youtubeTitle">YouTube Video Title <span class="text-danger">*</span></label>
                    <input type="text" id="f-youtubeTitle" class="form-control" placeholder="Full title of the YouTube video (used for accessibility)">
                </div>
                <div class="col-12">
                    <label class="form-label" for="f-description">Description <span class="text-danger">*</span></label>
                    <textarea id="f-description" class="form-control" rows="2" placeholder="Short summary of the stock call..."></textarea>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" id="add-btn">
                        <span id="add-spinner" class="spinner-border spinner-border-sm me-2 d-none"></span>
                        <i class="bi bi-plus-circle me-1"></i>Add Stock Call
                    </button>
                </div>
            </div>

            <hr>

            <!-- EXISTING STOCK CALLS -->
            <h5 class="mt-4 mb-3 fw-bold">Existing Stock Calls <span id="entry-count" class="badge bg-secondary ms-1">0</span></h5>
            <div id="entries-list">
                <div class="text-center py-4 text-muted">
                    <div class="spinner-border spinner-border-sm me-2"></div> Loading...
                </div>
            </div>

        </div>
    </div>
</div>

<script>
const API = 'stock-api.php';

// ── helpers ──────────────────────────────────────────────────────────────────
function showAlert(el, msg) {
    el.style.display = 'block';
    el.textContent   = msg;
}
function hideAlert(el) { el.style.display = 'none'; }

function thumbUrl(embedUrl) {
    // Extract YouTube video ID from embed URL
    const m = embedUrl.match(/\/embed\/([^?&]+)/);
    return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : '';
}

function post(action, data) {
    return fetch(API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(Object.assign({ action }, data))
    }).then(r => r.json());
}

// ── check session on load ────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function () {
    fetch(API + '?action=check')
        .then(r => r.json())
        .then(function (data) {
            if (data.loggedIn) {
                showAdmin();
            }
        });
});

// ── login ────────────────────────────────────────────────────────────────────
document.getElementById('login-btn').addEventListener('click', function () {
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    const errEl = document.getElementById('login-error');
    const spin  = document.getElementById('login-spinner');

    if (!user || !pass) { showAlert(errEl, 'Please enter username and password.'); return; }
    hideAlert(errEl);
    spin.classList.remove('d-none');

    post('login', { username: user, password: pass })
        .then(function (data) {
            spin.classList.add('d-none');
            if (data.success) {
                showAdmin();
            } else {
                showAlert(errEl, data.message || 'Login failed.');
            }
        })
        .catch(function () {
            spin.classList.add('d-none');
            showAlert(errEl, 'Connection error. Please try again.');
        });
});

// allow Enter key on password field
document.getElementById('login-pass').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') document.getElementById('login-btn').click();
});

// ── logout ───────────────────────────────────────────────────────────────────
document.getElementById('logout-btn').addEventListener('click', function () {
    post('logout', {}).then(function () {
        document.getElementById('admin-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('login-user').value = '';
        document.getElementById('login-pass').value = '';
    });
});

// ── show admin panel ─────────────────────────────────────────────────────────
function showAdmin() {
    document.getElementById('login-section').style.display  = 'none';
    document.getElementById('admin-section').style.display  = 'block';
    loadEntries();
}

// ── load entries ─────────────────────────────────────────────────────────────
function loadEntries() {
    const list = document.getElementById('entries-list');
    list.innerHTML = '<div class="text-center py-4 text-muted"><div class="spinner-border spinner-border-sm me-2"></div> Loading...</div>';

    fetch(API + '?action=list')
        .then(r => r.json())
        .then(function (videos) {
            document.getElementById('entry-count').textContent = videos.length;
            if (!videos.length) {
                list.innerHTML = '<p class="text-muted">No stock calls yet. Add one above.</p>';
                return;
            }
            list.innerHTML = videos.map(function (v) {
                const thumb = thumbUrl(v.embedUrl);
                return `
                <div class="entry-row" id="entry-${v.id}">
                    ${thumb ? `<div class="entry-thumb"><img src="${thumb}" alt="thumbnail" loading="lazy"></div>` : ''}
                    <div class="entry-meta">
                        <strong title="${v.title}">${v.title}</strong>
                        <small>${v.description}</small><br>
                        <small class="text-primary">${v.embedUrl}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger btn-del" onclick="deleteEntry('${v.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>`;
            }).join('');
        })
        .catch(function () {
            list.innerHTML = '<p class="text-danger">Failed to load entries.</p>';
        });
}

// ── add entry ────────────────────────────────────────────────────────────────
document.getElementById('add-btn').addEventListener('click', function () {
    const errEl  = document.getElementById('add-error');
    const succEl = document.getElementById('add-success');
    const spin   = document.getElementById('add-spinner');
    hideAlert(errEl);
    hideAlert(succEl);

    const data = {
        embedUrl:     document.getElementById('f-embedUrl').value.trim(),
        watchUrl:     document.getElementById('f-watchUrl').value.trim(),
        title:        document.getElementById('f-title').value.trim(),
        youtubeTitle: document.getElementById('f-youtubeTitle').value.trim(),
        description:  document.getElementById('f-description').value.trim(),
    };

    const missing = Object.keys(data).find(k => !data[k]);
    if (missing) { showAlert(errEl, 'All fields are required.'); return; }

    spin.classList.remove('d-none');
    document.getElementById('add-btn').disabled = true;

    post('add', data)
        .then(function (res) {
            spin.classList.add('d-none');
            document.getElementById('add-btn').disabled = false;
            if (res.success) {
                showAlert(succEl, 'Stock call added successfully! It now appears first on the public page.');
                // clear form
                ['f-embedUrl','f-watchUrl','f-title','f-youtubeTitle','f-description']
                    .forEach(id => document.getElementById(id).value = '');
                loadEntries();
            } else {
                showAlert(errEl, res.message || 'Failed to add entry.');
            }
        })
        .catch(function () {
            spin.classList.add('d-none');
            document.getElementById('add-btn').disabled = false;
            showAlert(errEl, 'Connection error. Please try again.');
        });
});

// ── delete entry ─────────────────────────────────────────────────────────────
function deleteEntry(id) {
    if (!confirm('Delete this stock call? This cannot be undone.')) return;

    post('delete', { id: id })
        .then(function (res) {
            if (res.success) {
                loadEntries();
            } else {
                alert('Failed to delete: ' + (res.message || 'Unknown error'));
            }
        })
        .catch(function () {
            alert('Connection error. Please try again.');
        });
}
</script>

<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify login works**

Open `https://kesarsecurities.in/admin.html`.
1. Enter `kesar` / `kesar` → click Sign In → admin panel should appear
2. Enter wrong credentials → error message "Invalid username or password" should appear

- [ ] **Step 3: Verify add flow**

While logged in, fill in the Add form with test data:
- Embed URL: `https://www.youtube.com/embed/dQw4w9WgXcQ`
- Watch URL: `https://youtu.be/dQw4w9WgXcQ`
- Title: `Test Stock Call`
- YouTube Title: `Test Video`
- Description: `This is a test.`

Click "Add Stock Call". Expected: success message appears, the new entry appears at the top of the list with count 11.

Open `https://kesarsecurities.in/stock_talk.html` → the test video card should appear first.

- [ ] **Step 4: Verify delete flow**

In the admin panel, click the trash icon on the test entry added in Step 3.
Confirm the dialog → entry disappears, count returns to 10.
Open `stock_talk.html` → test card no longer appears.

- [ ] **Step 5: Commit**

```bash
git add admin.html
git commit -m "feat: add admin.html with login, add, and delete stock call functionality"
```

---

### Task 5: Final verification and cleanup commit

- [ ] **Step 1: Confirm all 4 files are in the repo**

```bash
git status
ls stock_calls.json stock-api.php admin.html
```
Expected: all files present, working tree clean.

- [ ] **Step 2: Open stock_talk.html and confirm it shows videos**

Open `https://kesarsecurities.in/stock_talk.html`.
Expected: all 10 video cards render, newest (id=1 — shipping stock) appears first.

- [ ] **Step 3: Final commit if any remaining changes**

```bash
git add -A
git status
# only commit if there are uncommitted changes
git commit -m "chore: finalize stock calls admin panel implementation"
```
