<?php
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
  exit;
}

$NOTIFY_EMAIL = "info@insonetgh.com";
$FROM_EMAIL = "noreply@insonetgh.com";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(["error" => "Invalid request body"]);
  exit;
}

$firstName = trim($data["firstName"] ?? "");
$lastName = trim($data["lastName"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$message = trim($data["message"] ?? "");

if ($firstName === "" || $lastName === "" || $email === "" || $message === "") {
  http_response_code(400);
  echo json_encode(["error" => "Please fill in all required fields."]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["error" => "Please enter a valid email address."]);
  exit;
}

$subject = "New contact form message from {$firstName} {$lastName}";
$body = "Name: {$firstName} {$lastName}\n";
$body .= "Email: {$email}\n";
$body .= "Phone: " . ($phone !== "" ? $phone : "Not provided") . "\n\n";
$body .= "Message:\n{$message}\n";

$headers = [
  "From: INSONET Website <{$FROM_EMAIL}>",
  "Reply-To: {$email}",
  "Content-Type: text/plain; charset=UTF-8",
];

$sent = mail($NOTIFY_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
  http_response_code(502);
  echo json_encode(["error" => "Could not send your message. Please email us directly."]);
  exit;
}

http_response_code(201);
echo json_encode(["success" => true]);
