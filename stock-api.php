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
