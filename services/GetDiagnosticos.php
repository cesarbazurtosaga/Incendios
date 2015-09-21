<?php
require_once('./conexion.php');

$clave=$_GET["clave"];

$query_sql = "
select array_to_json(array_agg(row(row.*))) AS diagnosticos 
from (
SELECT *
FROM (	select gecodigo,genombre
	from salud.gediagno_grupo g
	where EXISTS(SELECT 1  from salud.gesius 
	WHERE grupo_codigo_cie10 = g.gecodigo)
)t where upper(genombre) like '%$clave%'  
) row;
";
//equipo_pruebas  'N'
 //echo "$query_sql<br>";

$resultado = pg_query($cx, $query_sql) or die(pg_last_error());
$total_filas = pg_num_rows($resultado);

while ($fila_vertical = pg_fetch_assoc($resultado)) {
	$row_to_json = $fila_vertical['diagnosticos'];							
	echo "getDiagnostico(".$row_to_json.")";
}	
// Liberando el conjunto de resultados
pg_free_result($resultado);

// Cerrando la conexión
pg_close($cx);
?>
