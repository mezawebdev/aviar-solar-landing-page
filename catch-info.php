<?php

if ($_POST) {
	$name = $_POST["name"];
	$phone = $_POST["phone"];
	$email = $_POST["email"];
	$address = $_POST["address"];
	$electricity_bill = $_POST["electricityBill"];
	$property_type = $_POST["propertyType"];
	$roof_type = $_POST["roofType"];
}

$inbox = "mezawebdev@gmail.com";
$header = "Quote inquiry (solarexperts.com)";
$message = "Customer Info: \n Name: ".$name."\n Phone: ".$phone."\n Email: ".$email."\n Address: ".$address."\n Average Electricity Bill: $".$electricity_bill."\n Property type: ".$property_type."\n Roof Type: ".$roof_type;

mail($inbox, $header, $message);

?>




