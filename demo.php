<?php

$MySQL_Date = '2021-07-01 01:00:00';
$ISO8601_Date = preg_replace('/\s+/', 'T', $MySQL_Date) . '.000Z';
$timeZone = 'America/Phoenix';

echo <<<EOT
MySQL date: $MySQL_Date
ISO8601: $ISO8601_Date
timezone: $timeZone

EOT;

// Old style strtotime and date

$strtotimeMySQL = strtotime($MySQL_Date);
$strtotimeISO   = strtotime($ISO8601_Date);
$dateMySql      = date('Y-m-d H:i:s', $strtotimeMySQL); // not localized
$dateISO        = date('Y-m-d H:i:s', $strtotimeISO);

echo <<<EOT

==> strtotime() and date()

MySQL: $strtotimeMySQL => $dateMySql
ISO:   $strtotimeISO => $dateISO

EOT;

// DateTime and DateTimeZone

// init timzeone
$objUTC      = new DateTimeZone('UTC');
$objTimeZone = new DateTimeZone($timeZone);

// init date in UTC
$objMySQLUTC = DateTime::createFromFormat('Y-m-d H:i:s', $MySQL_Date, $objUTC);
$objISOUTC   = new DateTime($ISO8601_Date); // Already in UTC (Z)

// init in UTC and convert to local timezone for display
$objMySQLLocal = new DateTime($MySQL_Date, $objUTC);
$objMySQLLocal->setTimezone($objTimeZone); // Convert to local timezone

$objISOLocal = new DateTime($ISO8601_Date);
$objISOLocal->setTimezone($objTimeZone); // Convert to local timezone

echo <<<EOT

==> DateTime and DateTimeZone

MySQL UTC: {$objMySQLUTC->getTimestamp()} => {$objMySQLUTC->format('Y-m-d H:i:s')}
ISO UTC:   {$objISOUTC->getTimestamp()} => {$objISOUTC->format('Y-m-d H:i:s')}

MySQL local: {$objMySQLLocal->getTimestamp()} => {$objMySQLLocal->format('Y-m-d H:i:s')}
ISO local:   {$objISOLocal->getTimestamp()} => {$objISOLocal->format('Y-m-d H:i:s')}

EOT;

// modification
$objMySQLLocal->add(new DateInterval('P30D'));
$objISOLocal->modify('+30 days');
$isAfterNow = $objMySQLLocal->getTimestamp() > time() ? 'yes' : 'no';

echo <<<EOT

==> DateTime and DateTimeZone Relative

add(): {$objMySQLUTC->format('Y-m-d H:i:s')}
modify(): {$objISOUTC->format('Y-m-d H:i:s')}
after now: $isAfterNow

EOT;

// Example reading user input and storing as UTC
// $objTimeZone = new DateTimeZone($_POST['meeting_timezone']);
// $objDate = new DateTime($_POST['meeting_time'], $objTimeZone);
// $objDate->setTimezone(new DateTimeZone('UTC'));
// $objRecord->meeting_time = $objDate->format('Y-m-d H:i:s');

// Example reading from the database and showing a localized string
// $objDate = new DateTime($objRecord->meeting_time, new DateTimeZone('UTC'));
// $objDate->setTimezone(new DateTimeZone('America/Phoenix'));
// $this->view->strMeetingTime = $objDate->format('Y-m-d H:i:s');
