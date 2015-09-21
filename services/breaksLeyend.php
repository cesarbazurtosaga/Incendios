<?php 
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
include_once("conexion.php"); 

global $cx;	

function utf8($a) {
	return htmlentities($a,ENT_QUOTES,'UTF-8');  
}
if ($_GET['tabla'] && $_GET['fecha_min'] && $_GET['fecha_max']){
	
	$fecha_min=$_GET['fecha_min'];
	$fecha_max=$_GET['fecha_max'];
	$tabla = $_GET['tabla'];
	$fuente = $_GET['fuente'];
	$delitos =str_replace(",","+",$_GET['delitos']);
	$agrupacion= $_GET['agrupacion'];
	
	
	$query_sql = "
	SELECT quintile (total) FROM ( 
	select sum(".$delitos.") total  
	from ".$tabla."
	where fecha >'".$fecha_min."' 
	and fecha<'".$fecha_max."'
	and fuente='".$fuente."'
	group by ".$agrupacion."
	) t where total<>0;";
	
	
	//echo $query_sql;
	$query_sql=str_replace("multiselect-all+", "", $query_sql);
	//echo $query_sql;
	
	$resultado = pg_query($cx,$query_sql) or die('No se ejecuto el SQl');
	$total_filas = pg_num_rows($resultado);	
	pg_close($cx);
									//echo "Filas: $total_filas"; //exit;
	$replace = array("{","}",'"');
	while ($fila = pg_fetch_assoc($resultado)) {
		//echo $fila['quintile'];
		$array_quintiles = explode(",",str_replace($replace,"",$fila['quintile']));
		//echo var_dump($array_quintiles);
	}
	$aproximate=strlen((int)($array_quintiles[1]))-2;
	//echo $aproximate;
	
	//echo round(((int)($array_quintiles[1]))/(pow(10, $aproximate)))*(pow(10, $aproximate));
	for ($i=0;$i<count($array_quintiles);$i++){
		//echo $array_quintiles[$i];
		$array_quintiles[$i]=round((($array_quintiles[$i]))/(pow(10, $aproximate)))*(pow(10, $aproximate));
		//echo var_dump($array_quintiles);
	}
	
	$object = new stdClass(); 
	$object = $array_quintiles;
	 
	echo json_encode($object);
}

/*if ($_GET['tabla'] && $_GET['fecha_min'] && $_GET['fecha_max']&& $_GET['fuentes']){
	if($_GET['tabla']=="g_inversion_cubo_mpio"){
		$tabla[0]="g_inversion_cubo_mpio";
		$tabla[1]="g_indica_mpio";
		$tabla[2]="codigo_mun";
	}else{
		$tabla[0]="g_inversion_cubo_prov";
		$tabla[1]="g_indica_prov";
		$tabla[2]="nombre";
	}
	
	$fecha_min=$_GET['fecha_min'];
	$fecha_max=$_GET['fecha_max'];
	$fuentes=explode(",",$_GET['fuentes']);
	$text_fuente="";
	
	for ($i=0;$i<count($fuentes);$i++){
		
		$text_fuente=$text_fuente."'".$fuentes[$i]."',";
		//echo $text_fuente;
	}
	$text_fuente = substr($text_fuente, 0, -1);  
	
	if ($_GET['columnas'] && !$_GET['indicadores']){
		$columns = explode(",", $_GET['columnas']);
		$columns_query = implode("+", $columns);
		$query_sql = str_replace('"',"","SELECT quintile (total) FROM ( SELECT nombre, sum(".$columns_query.") total from planeacion_total.$tabla[0] WHERE fecha between '".$fecha_min."-01-01' and '".$fecha_max."-12-31' and nombre<>'CUNDINAMARCA'  and fte_recurso in (".$text_fuente.")   AND total is not null group by nombre ) t where t.total<>0");
		//echo $query_sql;
	}
	if ($_GET['indicador'] && !$_GET['columnas']){
		$indicator =  $_GET['indicador'];
		if ($indicator=="presupuesto_aprobado"||$indicator=="presupuesto_ejecutado"){
		$query_sql = str_replace('"',"","
		SELECT quintile (total) FROM ( 
		SELECT $tabla[2], sum(".$indicator.")::bigint total from planeacion_total.$tabla[1]
		where vigencia<=".$fecha_max." and vigencia>=".$fecha_min." and ".$indicator."<>0  and nombre<>'CUNDINAMARCA'  
		group by $tabla[2] 
		) t	");
		//echo $query_sql;
		}
		else {
		$query_sql = str_replace('"',"","
		SELECT quintile (total) FROM ( 
		SELECT $tabla[2], avg(".$indicator.")::bigint total from planeacion_total.$tabla[1]
		where vigencia<=".$fecha_max." and vigencia>=".$fecha_min." and ".$indicator."<>0  and nombre<>'CUNDINAMARCA'   
		group by $tabla[2] 
		) t	");
		//echo $query_sql;
		}
	}
 if ($_GET['indicador'] && $_GET['columnas']){
	
	$columns = explode(",", $_GET['columnas']);
	$columns_query = implode("+", $columns);
	$indicator = str_replace('"',"",$_GET['indicador']);
	//echo $indicator;
	if ($indicator=="nbi"){
		$query_sql = str_replace('"',"","
		SELECT quintile (total) FROM (
			SELECT  case when x.poblacion>0	 THEN (t.total/x.poblacion)*(x.nbi/100) ELSE 0	END as total
			FROM ( 	SELECT  $tabla[2], 
			(sum(".$columns_query."))  total 
			from planeacion_total.$tabla[0]  
			WHERE fecha between '".$fecha_min."-01-01' and '".$fecha_max."-12-31' 
			and nombre<>'CUNDINAMARCA'   and fte_recurso in (".$text_fuente.")     
			group by  $tabla[2]
		) t
		left join  (
			select  $tabla[2]
			,avg(poblacion)::bigint poblacion
			,avg(nbi) nbi
			from planeacion_total.$tabla[1]
			where vigencia<=".$fecha_max." and vigencia>=".$fecha_min."
			group by  $tabla[2]
		) x on (x.$tabla[2]=t.$tabla[2])
		) t");
	}
	else if ($indicator=="presupuesto_aprobado" || $indicator=="presupuesto_ejecutado"){
		//$indicator="poblacion/100/nbi";
		$query_sql = str_replace('"',"","
		SELECT quintile (total) FROM (
			SELECT  case when x.".$indicator.">0	 THEN (t.total/x.".$indicator.")*100 ELSE 0	END as total
			FROM ( 	SELECT  $tabla[2], 
			(sum(".$columns_query."))  total 
			from planeacion_total.$tabla[0]  
			WHERE fecha between '".$fecha_min."-01-01' and '".$fecha_max."-12-31' 
			and nombre<>'CUNDINAMARCA'   and fte_recurso in (".$text_fuente.")       
			group by  $tabla[2]
		) t
		left join  (
			select  $tabla[2]
			,sum(".$indicator.")::bigint ".$indicator."
			from planeacion_total.$tabla[1]
			where vigencia<=".$fecha_max." and vigencia>=".$fecha_min."
			group by  $tabla[2]
		) x on (x.$tabla[2]=t.$tabla[2])
		) t");
	}
	else{
		$query_sql = str_replace('"',"","
		SELECT quintile (total) FROM (
			SELECT  case when x.".$indicator.">0	 THEN t.total/x.".$indicator." ELSE 0	END as total
			FROM ( 	SELECT  $tabla[2], 
			(sum(".$columns_query."))  total 
			from planeacion_total.$tabla[0]  
			WHERE fecha >= '".$fecha_min."-01-01' and fecha <='".$fecha_max."-12-31' 
			and nombre<>'CUNDINAMARCA'   and fte_recurso in (".$text_fuente.")       
			group by  $tabla[2]
		) t
		left join  (
			select  $tabla[2]
			,avg(".$indicator.")::bigint ".$indicator."
			from planeacion_total.$tabla[1]
			where vigencia<=".$fecha_max." and vigencia>=".$fecha_min."
			group by  $tabla[2]
		) x on (x.$tabla[2]=t.$tabla[2])
		) t");
	}
	//echo $query_sql;
}

$query_sql=str_replace("multiselect-all+", "", $query_sql);
//echo $query_sql;

$resultado = pg_query($cx,$query_sql) or die('No se ejecuto el SQl');
$total_filas = pg_num_rows($resultado);	
pg_close($cx);
								//echo "Filas: $total_filas"; //exit;
$replace = array("{","}",'"');
while ($fila = pg_fetch_assoc($resultado)) {
	//echo $fila['quintile'];
	$array_quintiles = explode(",",str_replace($replace,"",$fila['quintile']));
	//echo var_dump($array_quintiles);
}
$aproximate=strlen((int)($array_quintiles[1]))-2;
//echo $aproximate;

//echo round(((int)($array_quintiles[1]))/(pow(10, $aproximate)))*(pow(10, $aproximate));
for ($i=0;$i<count($array_quintiles);$i++){
	//echo $array_quintiles[$i];
	$array_quintiles[$i]=round((($array_quintiles[$i]))/(pow(10, $aproximate)))*(pow(10, $aproximate));
	//echo var_dump($array_quintiles);
}

$object = new stdClass(); 
$object = $array_quintiles;
 
echo json_encode($object);
function utf8($a) {
	return htmlentities($a,ENT_QUOTES,'UTF-8');  
}
}	*/ 

?>
