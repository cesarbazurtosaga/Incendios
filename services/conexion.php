<?php
/***************************************************************/
/*  Fichero: conexion.php                                        */

/***************************************************************/
error_reporting(E_ALL ^ E_NOTICE); //error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

$dbname = "sig_plus";
$host = "172.20.5.200"; 
$port = "5432";
$dbuser = "postgres";
$dbpsw = "p0s76r3s"; //$dbuser = "postgres";
$cx = pg_connect("host=$host port=$port dbname=$dbname user=$dbuser password=$dbpsw");	
  $stat = pg_connection_status($cx);
  if ($stat === PGSQL_CONNECTION_OK) {
   //   echo 'Estado de la conexión ok';
  } else {
     // echo 'No se ha podido conectar';
  }
//echo "CX ok <br>";
//phpinfo();
//RUTA DONDE SE ALMACENAN LOS DOCUMENTOS
?>
