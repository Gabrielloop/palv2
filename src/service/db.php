<?php

$host="localhost";
$port=3306;
$socket="";
$user="root";
$password="";
$dbname="bakery";

$con = new mysqli($host, $user, $password, $dbname, $port, $socket)
	or die ('Could not connect to the database server' . mysqli_connect_error());

//$con->close();

$query = "SELECT * from bakery.article";

if ($stmt = $con->prepare($query)) {
    $stmt->execute();
    $stmt->bind_result($field1, $field2);
    while ($stmt->fetch()) {
        //printf("%s, %s\n", $field1, $field2);
        //parrsing des résultats en php vers variables js :
        echo "<script> var field1 = $field1; var field2 = $field2; </script>";
    }
    $stmt->close();
}

?>