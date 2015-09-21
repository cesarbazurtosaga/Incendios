var getColor=function(d) {
	/*return  d >= global_valores[3]  ? 'rgb(255,255,255)' :  
			d >= global_valores[2]  ? 'rgba(254,250,100,0.9)' :     
		      'rgb(255,255,255)';*/
		      
  return d >= global_valores[6]  ? 'rgba(107,6,1,1)' :
       d >= global_valores[5]  ? 'rgba(158,68,16,1)' :
       d >= global_valores[4]  ? 'rgba(214,133,34,1)' :
       d >= global_valores[3]  ? 'rgba(247,176,62,1)' :                   
       d >= global_valores[2]   ? 'rgba(252,221,53,0.9)' :
       d >= global_valores[1]   ? 'rgba(254,250,100,0.7)' :
                   'rgb(255,255,255)';

   
  /*
  return  d >= global_valores[5]  ? 'rgba(158,68,16,1)' :
		  d >= global_valores[3]  ? 'rgba(247,176,62,1)' :                   
		  d >= global_valores[2]   ? 'rgba(254,250,100,0.9)' : 
		                   'rgb(255,255,255)';*/
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
 
