<?php
declare(strict_types=1);

ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload) {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    header('Allow: OPTIONS, POST');
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    header('Allow: OPTIONS, POST');
    respond(405, ['error' => 'Method not allowed.']);
}

function text_field(string $name, int $maxLength): string {
    $value = trim((string)($_POST[$name] ?? ''));
    if (strlen($value) > $maxLength) {
        respond(422, ['error' => 'One or more fields are too long.']);
    }
    return $value;
}

$website = text_field('website', 200);
if ($website !== '') {
    $fakeId = 'BB-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(4)));
    respond(201, ['enquiryId' => $fakeId]);
}

$customerName = text_field('customerName', 120);
$email = text_field('email', 254);
$petName = text_field('petName', 120);
$genreStyle = text_field('genreStyle', 160);
$garment = text_field('garment', 80);
$size = text_field('size', 80);
$colour = text_field('colour', 80);
$notes = text_field('notes', 3000);

if ($customerName === '' || $email === '' || $petName === '') {
    respond(422, ['error' => 'Please complete your name, email and pet name.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['error' => 'Please enter a valid email address.']);
}

if (!isset($_FILES['petPhoto']) || !is_array($_FILES['petPhoto'])) {
    respond(422, ['error' => 'Please attach a pet photo.']);
}

$photo = $_FILES['petPhoto'];
$error = (int)($photo['error'] ?? UPLOAD_ERR_NO_FILE);

if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
    respond(413, ['error' => 'The pet photo is too large for this server.']);
}
if ($error !== UPLOAD_ERR_OK) {
    respond(422, ['error' => 'The pet photo could not be uploaded.']);
}

$tmp = (string)($photo['tmp_name'] ?? '');
if ($tmp === '' || !is_uploaded_file($tmp)) {
    respond(422, ['error' => 'The pet photo upload was not valid.']);
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = (string)$finfo->file($tmp);
$allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];

if (!isset($allowed[$mime]) || @getimagesize($tmp) === false) {
    respond(415, ['error' => 'Pet photo must be a PNG, JPEG or WebP image.']);
}

$dataRoot = getenv('BESTIEBOYS_DATA_DIR');
if (!$dataRoot) {
    $docRoot = rtrim((string)($_SERVER['DOCUMENT_ROOT'] ?? ''), '/');
    $dataRoot = dirname(dirname($docRoot)) . '/bestieboys-private';
}

$year = gmdate('Y');
$month = gmdate('m');
$uploadDir = $dataRoot . '/uploads/' . $year . '/' . $month;
$enquiryDir = $dataRoot . '/enquiries/' . $year . '/' . $month;

foreach ([$uploadDir, $enquiryDir] as $dir) {
    if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
        respond(500, ['error' => 'The enquiry could not be stored.']);
    }
}

$enquiryId = 'BB-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(4)));
$extension = $allowed[$mime];
$photoFilename = $enquiryId . '.' . $extension;
$photoPath = $uploadDir . '/' . $photoFilename;

if (!move_uploaded_file($tmp, $photoPath)) {
    respond(500, ['error' => 'The pet photo could not be stored.']);
}
@chmod($photoPath, 0600);

$originalName = basename((string)($photo['name'] ?? 'pet-photo'));
if (strlen($originalName) > 255) {
    $originalName = substr($originalName, 0, 255);
}

$record = [
    'enquiryId' => $enquiryId,
    'createdAt' => gmdate('c'),
    'customerName' => $customerName,
    'email' => $email,
    'petName' => $petName,
    'genreStyle' => $genreStyle,
    'garment' => $garment,
    'size' => $size,
    'colour' => $colour,
    'notes' => $notes,
    'photo' => [
        'storedName' => $photoFilename,
        'originalName' => $originalName,
        'mime' => $mime,
        'bytes' => (int)($photo['size'] ?? 0),
    ],
];

$json = json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
$recordPath = $enquiryDir . '/' . $enquiryId . '.json';

if ($json === false || file_put_contents($recordPath, $json . PHP_EOL, LOCK_EX) === false) {
    @unlink($photoPath);
    respond(500, ['error' => 'The enquiry could not be stored.']);
}

@chmod($recordPath, 0600);
respond(201, ['enquiryId' => $enquiryId]);
