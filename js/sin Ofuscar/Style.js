var getColor=function(c,d,t,p) {

	//console.log(c + ' ' + d + ' ' + t + ' ' + p + ' ' + padre) //c= Capa d= Valor t=Nombre
if(padre == "" || padre == p ){
	if(c=='Cundinamarca' || c=='Vereda'){	//ESCALA FIJA	//
			return d > 1  ? 'rgba(213,204,175,0.7)' :'rgba(213,204,175,0.7)';
	}else {			
		if(global_valores == undefined) {	//VALIDA SI YA SE REALIZÓ LA PETICIÓN
			
				console.log("Con: "+c);
	
				var ident = $("#layers option:selected").attr('value'); //$('#layers').val();
				var tabla;
				if (c=='Municipio'){
					tabla='g_delito_mpio';
				}else{
					tabla='g_delito_prov';
				}
	
				console.log("TBL: "+tabla);
	
				global_valores=cuantiles(tabla);
							
				console.log("ESCALA NUEVA: "+global_valores);	
				
				//CUANDO CAMBIA LA LEYENDA DEBE PONER EL NUEVO ESTILO
				AutoDisplayLeyend(global_valores);
		}
		return d > global_valores[5]  ? 'rgba(107,6,1,1)' :
	       d > global_valores[4]  ? 'rgba(158,68,16,1)' :
	       d > global_valores[3]  ? 'rgba(214,133,34,1)' :
	       d > global_valores[2]  ? 'rgba(247,186,62,1)' :                   
	       d > global_valores[1]   ? 'rgba(252,221,53,1)' :
	       d > global_valores[0]  ? 'rgba(252,255,128,1)' :
	                   'rgb(255,255,255)';
	}	
}else
{
	return d = 'rgba(255,255,255,0.3)'; 
}			
   
};

var fill = new ol.style.Fill({
   color: 'rgba(255,255,255,0.3)'
 });
 var stroke = new ol.style.Stroke({
   color: '#3399CC',
   width: 1.25
 });
 var styles_none = [
   new ol.style.Style({
     fill: fill,
     stroke: stroke
   })
 ];
 


/************************** CALCULA LOS QUINTILES **************************/
var cuantiles=function(tabla){
	
	//var tabla;
	var url;
	
	//console.log();
	//$("").slider("calculatedValue")
	///console.log("entro");

	var anos=$("#Slider").slider("calculatedValue").split(";");		//console.log('A1: '+anos[0]);	//console.log('A2: '+anos[1]);
	
		url="./services/breaksLeyend.php?tabla="+tabla+"&fecha_min="+
		anos[0].replace(",", "")+"&fecha_max="+anos[1].replace(",", "");
	
		$.ajax({
		  url: url,
		  dataType: 'json',
		  async: false,
		  success: function(json) {
		    global_valores=json;
		    global_valores[0]=1;
		    //global_valores.pop();
		   	console.log("SRV: "+global_valores);
		   	//return global_valores;
		  }
		});
	
	if(global_valores){}
	else{
		global_valores=[1, 200, 240,750, 1360, 10000];
	}
	
	if(tabla=='g_delito_mpio'){
		escalaMun = global_valores; 	//console.log("SET ESCALA MPIO: " +escalaMun);
	}else if(tabla=='g_delito_prov'){
		escalaPro = global_valores;		//console.log("SET ESCALA PROV: " +escalaPro);
	}
	
	
	return 	global_valores;
};