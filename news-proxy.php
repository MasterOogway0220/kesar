<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

$query = isset($_GET['q']) ? $_GET['q'] : 'sensex';
$apiKey = 'ed701802c067451e3bb73463bbcdc6db';

$searchQuery = $query . ' india stock market';
$url = "https://gnews.io/api/v4/search?q=" . urlencode($searchQuery) . "&lang=en&country=in&max=20&apikey=" . $apiKey;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch news: ' . curl_error($ch)]);
} else if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo $response;
} else {
    echo $response;
}

curl_close($ch);
?>