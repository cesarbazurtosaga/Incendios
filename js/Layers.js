

/**
 *Funciones de carga de layers  
*/
var peticionjsonp=function(esquema,layer,funcioncarga,viewparams){
    var url = glo.geoserver+esquema+'/ows?service=WFS&' +
    'version=1.0.0&request=GetFeature&typeName='+esquema+':'+layer+
    '&outputFormat=text/javascript&format_options=' +funcioncarga+
    '&srsname=EPSG:900913';
    waitingDialog.show();
    featureOverlay.getSource().clear();    
    featureOverlay1.getSource().clear();
    
    if(viewparams){url+=viewparams;} 
    $.ajax({
      url: url,
      dataType: 'jsonp'
    });    
};

var removerfeatures=function(_vectorsource){
    var nombre,i;
    var features=_vectorsource.getFeatures();
    if(features.length>0){
        for(i=0;i<features.length;i++){
            _vectorsource.removeFeature(features[i]);
        }
    }
    
};

var RecorrerGeoJson=function(response){
	var NewGeoJson=$.extend( {}, response);
	//console.log(NewGeoJson);
	var NewGeoJsonRemove=turf.remove(NewGeoJson,glo.varMapeo,0);
	var lgGJson=NewGeoJsonRemove.features.length;
	//console.log(NewGeoJsonRemove);
	var TotalCasos=0,totalarea=0;
	if(lgGJson==0){
		global_valores=[1,2,3,4,5,6,7];	
	}else{
		var array=[];
		$.each(NewGeoJsonRemove.features.reverse(), function (index, value) {
			array.push(value.properties[glo.varMapeo]);
			TotalCasos=TotalCasos+value.properties[glo.varMapeo];
	  		totalarea=totalarea+value.properties['area_total'];
	    });
	    array=array.unique();
	    var breaks; 
		if(array.length>5){
			breaks = turf.jenks(NewGeoJsonRemove,glo.varMapeo, 6);
		}else{
			breaks = turf.jenks(NewGeoJsonRemove,glo.varMapeo, array.length);
		}
		breaks=breaks.unique();
		breaks.unshift(0);
		breaks[1]=1;
		
	  	global_valores=breaks;
	  	
	}
	AutoDisplayLeyend(global_valores);
	waitingDialog.hide();
	$("#TextTotalArea").empty().append(numeral(totalarea).format('0,0'));
	$("#TextCuentaCasos").empty().append(numeral(TotalCasos).format('0,0'));
};
var loadFeatures = function(response) {
	  
	  RecorrerGeoJson(response);
	  var format = new ol.format.GeoJSON();
	  var features = format.readFeatures(response);
	  $( "#layers option:selected" ).each(function() {
	   	  var str = $( this ).text();
	      if(str=="Provincia"){
	      	lvGob_Ver.setVisible(false);
			lvGob_Mun.setVisible(false);
			lvGob_Prov.setVisible(true);
			removerfeatures(vsGob_Prov);			
		  	vsGob_Prov.addFeatures(features);
	      }else if(str=="Municipio"){
	      	lvGob_Ver.setVisible(false);
			lvGob_Mun.setVisible(true);
			lvGob_Prov.setVisible(false);
			removerfeatures(vsGob_Mun);
		  	vsGob_Mun.addFeatures(features);
		  }else if(str=="Vereda"){
	      	lvGob_Ver.setVisible(true);
			lvGob_Mun.setVisible(false);
			lvGob_Prov.setVisible(false);
			removerfeatures(vsGob_Ver);
			
		  	vsGob_Ver.addFeatures(features);
		  	
	      }
	  });
}; 
var refreshfeatures=function(cobertura){
	
    var parametros=getparametros();
	var params="&viewparams=fechaini:"+parametros.fechaini+";fechafin:"+parametros.fechafin;//+";"+parametros.textpeticion;
	
	/*if(parametros.msGrupo!='0'&&parametros.msGrupo!=''){
		params=params+";nomgru:id_grupo;valgru:"+parametros.msGrupo;
	}
	
	if(parametros.msSubGrupo!=''&&parametros.msSubGrupo.substring(1, 2)!='0'){
		var subgrupo=parametros.msSubGrupo.split("-")
		params=params+";nomgru2:id_subgrupo;valgru2:"+subgrupo[0];
	}
	if(parametros.msSubGrupo2!=''&&parametros.msSubGrupo2!='000'){
		var subgrupo2=parametros.msSubGrupo2.split("-");
		params=params+";nomgru3:id_subgrupo2;valgru3:"+subgrupo2[0];		
	}*/
	
	if(cobertura!=""){
		peticionjsonp(glo.esquema,cobertura,'callback:loadFeatures',params);	
	}else{
		peticionjsonp(glo.esquema,parametros.escala,'callback:loadFeatures',params);
	}
	
};

var getFuente=function(resolution){
	console.log(resolution);
	 if(resolution <= 160) {
		fuente = '14px Calibri,sans-serif';
	}else if(resolution > 160 && resolution <= 300){
		fuente = '11px Calibri,sans-serif';
	}else if(resolution > 300 && resolution <= 320){
		fuente = '9px Calibri,sans-serif';
	}else {
		fuente = '0px Calibri,sans-serif';
	}
	return fuente;

};

/***************************************************
 * * Limites wms desde glo.geoserver 
 ***************************************************/
//LIMITE PROVINCIA WMS+
var limiteDPTO=new ol.layer.Tile({
        source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
          url: glo.geoserver+'/gwc/service/wms',
          params: {'LAYERS': 'administrativa:g_colombia_dpto', 'TILED': true,'STYLES':'g_colombia_dpto_border','SRS':'EPSG%3A900913'},
          serverType: 'geoserver'
        }))
      });

//LIMITE PROVINCIA WMS
var LayerProvLinea =  new ol.layer.Tile({
        source: new ol.source.TileWMS( /** @type {olx.source.TileWMSOptions} */ ({
          url: glo.geoserver+'/wms',
          params: {'LAYERS': 'administrativa:g_provincia_simp', 'TILED': true, 'STYLES':'Sym_Provincia_96a4ca5d','SRS':'EPSG%3A900913'},
          serverType: 'geoserver'
        }))
        ,minResolution: 100
    	,maxResolution: 999
      });
LayerProvLinea.setVisible(true);
//LIMITE MUNICIPIO WMS
var LayerMuniLinea =  new ol.layer.Tile({
        source: new ol.source.TileWMS( /** @type {olx.source.TileWMSOptions} */ ({
          url: glo.geoserver+'/wms',
          params: {'LAYERS': 'administrativa:g_municipio_simp', 'TILED': true, 'STYLES':'Sym_Municipio_limite','SRS':'EPSG%3A900913'},
          serverType: 'geoserver'
        }))
        ,minResolution: 0
    	,maxResolution: 99
      });
LayerMuniLinea.setVisible(true);

/***************************************************************************************************
 *--------------------------------------------PROVINCIA--------------------------------------------
 ***************************************************************************************************/
var vsGob_Prov = new ol.source.Vector({
   loader: function(extent, resolution, projection) {
   	 refreshfeatures("g_incendios_provincia");
    },
   strategy: function() {
	return [ [-8772091.3, 261157.7, -7723375.2, 799885.8]];
   }
});


var lvGob_Prov = new ol.layer.Vector({
  source: vsGob_Prov,
  style: function(feature, resolution) {
	var texto = feature.get(nom_mostrar).trunc(12);
	var fuente = getFuente(resolution);
	var styleC = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: getColor(parseFloat(feature.get(glo.varMapeo)))
        }),
        stroke: new ol.style.Stroke({
          color: '#727220',
          width: 1
        }),
        text: new ol.style.Text({
          font: fuente,
          text: texto,
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2.5
          })
        })
    })];
    return styleC;
 }
});
lvGob_Prov.setVisible(false);

/***************************************************************************************************
 *--------------------------------------------MUNICIPIO--------------------------------------------
 ***************************************************************************************************/

var vsGob_Mun = new ol.source.Vector({
   loader: function(extent, resolution, projection) {
   	 refreshfeatures("g_incendios_municipio");
    },
   strategy: function() {
	return [ [-8772091.3, 261157.7, -7723375.2, 799885.8]];
   }
});


var lvGob_Mun = new ol.layer.Vector({
  source: vsGob_Mun,
  style: function(feature, resolution) {
	var texto = feature.get(nom_mostrar).trunc(12);
	var fuente = getFuente(resolution);
	//console.log(feature);
	var styleC = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: getColor(parseFloat(feature.get(glo.varMapeo)))
        }),
        stroke: new ol.style.Stroke({
          color: '#727220',
          width: 1
        }),
        text: new ol.style.Text({
          font: fuente,
          text: texto,
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2.5
          })
        })
    })];
    return styleC;
 }
});
lvGob_Mun.setVisible(true);
/***************************************************************************************************
 *--------------------------------------------VEREDA--------------------------------------------
 ***************************************************************************************************/

var vsGob_Ver = new ol.source.Vector({
   loader: function(extent, resolution, projection) {
   	 refreshfeatures("g_incendios_vereda");
   },
   strategy: function() {
	return [ [-8772091.3, 261157.7, -7723375.2, 799885.8]];
   }
});


var lvGob_Ver = new ol.layer.Vector({
  source: vsGob_Ver,
  style: function(feature, resolution) {
  	
	var texto = feature.get(nom_mostrar).trunc(12);
	var fuente = getFuente(resolution);
	var styleC = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: getColor(parseFloat(feature.get(glo.varMapeo)))
        }),
        stroke: new ol.style.Stroke({
          color: '#727220',
          width: 0.3
        }),
        text: new ol.style.Text({
         /* font: fuente,
          text: texto,*/
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2.5
          })
        })
    })];
    return styleC;
 }
});
lvGob_Ver.setVisible(false);

/***************************************************************************************************
 *--------------------------------------------CAPA BASE--------------------------------------------
 ***************************************************************************************************/

var openSeaMapLayer =    new ol.layer.Tile({
      source: new ol.source.OSM({
        attributions: [
          new ol.Attribution({
            html: 'Tiles &copy; <a href="http://www.opencyclemap.org/">' +
                'OpenCycleMap</a>'
          }),
          ol.source.OSM.ATTRIBUTION
        ],
        url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
 })
  });
