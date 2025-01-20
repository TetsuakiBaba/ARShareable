<?php
// Validate the HTTP referer
$allowedReferer = 'tetsuakibaba.jp'; // Replace with your actual domain
if (!isset($_SERVER['HTTP_REFERER']) || parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) !== $allowedReferer) {
    http_response_code(403); // Forbidden
    echo "Access denied: Invalid referer.";
    exit;
}

$ds = DIRECTORY_SEPARATOR;  //1
 
$storeFolder = 'uploads';   //2
 
if (!empty($_FILES)) {
     
    $tempFile = $_FILES['file']['tmp_name'];          //3             
      
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
     
    $targetFile =  $targetPath. $_FILES['file']['name'];  //5
 
    move_uploaded_file($tempFile,$targetFile); //6
    echo $targetFile;
     
}
?> 

