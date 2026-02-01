<?php
header('Content-Type: application/json');

$gallery_dir = 'images/gallery/';
$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$images = [];

if (is_dir($gallery_dir)) {
    $files = scandir($gallery_dir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, $allowed_extensions)) {
            $images[] = $gallery_dir . $file;
        }
    }
}

// Sort images alphabetically
sort($images);

echo json_encode($images);
?>
