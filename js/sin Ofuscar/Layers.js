var geoserver="http://saga.cundinamarca.gov.co:8080/geoserver/";

/**
 *Funciones de carga de layers  
*/
var peticionjsonp=function(esquema,layer,funcioncarga,viewparams){
    var url = geoserver+esquema+'/ows?service=WFS&' +
    'version=1.0.0&request=GetFeature&typeName='+esquema+':'+layer+
    '&outputFormat=text/javascript&format_options=' +funcioncarga+
    '&srsname=EPSG:900913';
    
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

var loadFeatures = function(response) {
	  //var capa = $('#layers').val();		console.log("LoadFeatures: " + capa);
	  var capa =  $("#layers option:selected").attr('value');	//console.log("LoadFeatures: " + capa);
	  
	  if (capa=='Departamento'){
	    removerfeatures(vectorSource);
	    vectorSource.addFeatures(vectorSource.readFeatures(response));
	  }else if(capa=='Provincia'){
	    removerfeatures(vsGob_Prov);
	    vsGob_Prov.addFeatures(vsGob_Prov.readFeatures(response));
	  }else if(capa=='Municipio'){
	    removerfeatures(vsGob_Mun);
	    vsGob_Mun.addFeatures(vsGob_Mun.readFeatures(response));
	    //console.log("Padre: " + padre );
	  }
  
}; 

//LIMITE PROVINCIA WMS
var LayerProvLinea =  new ol.layer.Tile({
        source: new ol.source.TileWMS( /** @type {olx.source.TileWMSOptions} */ ({
          url: geoserver+'/wms',
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
          url: geoserver+'/wms',
          params: {'LAYERS': 'administrativa:g_municipio_simp', 'TILED': true, 'STYLES':'Sym_Municipio_limite','SRS':'EPSG%3A900913'},
          serverType: 'geoserver'
        }))
        ,minResolution: 0
    	,maxResolution: 999
      });
LayerMuniLinea.setVisible(true);

/*********************************************************************************
 *-------------------------------CUNDINAMARCA------------------------------------*
 *********************************************************************************/
var vectorSource = new ol.source.ServerVector({
  format: new ol.format.GeoJSON(),
  loader: function(extent, resolution, projection) {
      peticionjsonp('delitos','g_delito_cund','callback:loadFeatures');
  },
  strategy: function() {
                return [ [-8772091.3, 261157.7, -7723375.2, 799885.8]];
  },
  projection: 'EPSG:3857'
});

var lvGob_Dep = new ol.layer.Vector({
  source: vectorSource,
   style: function(feature, resolution) {
  	
	var texto = feature.get(nom_mostrar);
	var fuente = "";

	if(resolution <= 160) {
		fuente = '11px Calibri,sans-serif';
	}else{
		fuente = '9px Calibri,sans-serif';
	}

      var styleC = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: getColor('Cundinamarca',parseFloat(feature.get(val_mostrar)),feature.get(nom_mostrar))
          //color:'#FBFB55' 
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
            width: 3
          })
        })
    })];
    return styleC;
  }
});
lvGob_Dep.setVisible(false);

/***************************************************************************************************
 *--------------------------------------------PROVINCIA--------------------------------------------
 ***************************************************************************************************/
var vsGob_Prov = new ol.source.ServerVector({
	format: new ol.format.GeoJSON(),
   	loader: function(extent, resolution, projection) {
		peticionjsonp('delitos','g_delito_prov','callback:loadFeatures');
	},
   strategy: function() {
                return [ [-8772091.3, 261157.7, -7723375.2, 799885.8]];
  	},
  	projection: 'EPSG:3857',
  	minResolution: 100
	,maxResolution: 999999999
});

var lvGob_Prov = new ol.layer.Vector({
  source: vsGob_Prov,
  style: function(feature, resolution) {
	var texto = feature.get(nom_mostrar);
	//if(resolution > 100) texto = feature.get(nom_mostrar);
			
      var styleC = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: getColor('Provincia',parseFloat(feature.get(val_mostrar)),feature.get(nom_mostrar))
          //color:'#FBFB55' 
        }),
        stroke: new ol.style.Stroke({
          color: '#727220',
          width: 1
        })
        ,text: new ol.style.Text({
          font: '11px Calibri,sans-serif',
          text: texto,
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })
    })];
    return styleC;
  }
});
lvGob_Prov.setVisible(true);
/***************************************************************************************************/

/***************************************************************************************************
 *--------------------------------------------MUNICIPIO--------------------------------------------
 ***************************************************************************************************/
var lfGob_EmerMun = function(response) {
    vsGob_Mun.addFeatures(vsGob_Mun.readFeatures(response));
}; 
var vsGob_Mun = new ol.source.ServerVector({
  format: new ol.format.GeoJSON(),
   loader: function(extent, resolution, projection) {
		//peticionjsonp('delitos','g_delito_mpio','callback:loadFeatures');
    var url = geoserver + 'delitos/ows?service=WFS&' +
        'version=1.0.0&request=GetFeature&typeName=delitos:g_delito_mpio&' +
        'outputFormat=text/javascript&format_options=callback:lfGob_EmerMun' +
        '&srsname=EPSG:3857';
    $.ajax({
      url: url,
      dataType: 'jsonp'
    });	
  },
   strategy: function() {
                return [ [-8772091.3, 261157.7, -7723375.2, 799885.8]];
  	},
  projection: 'EPSG:3857'
});
var lvGob_Mun = new ol.layer.Vector({
  source: vsGob_Mun,
  style: function(feature, resolution) {
  	
	var texto = feature.get(nom_mostrar);
	var fuente = "";

	if(resolution <= 160) {
		fuente = '11px Calibri,sans-serif';
	}else if(resolution > 160 && resolution <= 300){
		fuente = '9px Calibri,sans-serif';
	}else{
		fuente = '7px Calibri,sans-serif';
	}

	var styleC = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: getColor('Municipio',parseFloat(feature.get(val_mostrar)),feature.get(nom_mostrar),feature.get('padre'))
          //color:'#FBFB55' 
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
            width: 3
          })
        })
    })];
    return styleC;
	
    
  }
});
lvGob_Mun.setVisible(true);
/***************************************************************************************************/

/***************************************************************************************************
 *--------------------------------------------VEREDA--------------------------------------------
 ***************************************************************************************************/
var lfGob_Ver = function(response) {
    vsGob_Ver.addFeatures(vsGob_Ver.readFeatures(response));
}; 
var vsGob_Ver = new ol.source.ServerVector({
  format: new ol.format.GeoJSON(),
   loader: function(extent, resolution, projection) {
    var url = geoserver + 'administrativa/ows?service=WFS&' +
        'version=1.0.0&request=GetFeature&typeName=administrativa:g_vereda_simp&' +
        'outputFormat=text/javascript&format_options=callback:lfGob_Ver' +
        '&srsname=EPSG:3857';
    $.ajax({
      url: url,
      dataType: 'jsonp'
    });
  },
   strategy: function() {
                return [ [-8772091.3, 261157.7, -7723375.2, 799885.8]];
  	},
  projection: 'EPSG:3857'
});
var lvGob_Ver = new ol.layer.Vector({
  source: vsGob_Ver,
  style: function(feature, resolution) {
  	
	var texto = feature.get(nom_mostrar);
	var fuente = "";

	if(resolution <= 50) {
		fuente = '9px Calibri,sans-serif';
	}else {
		fuente = '0px Calibri,sans-serif';
	}

	var styleC = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: getColor('Vereda',parseFloat(feature.get(val_mostrar)),feature.get(nom_mostrar))
          //color:'#FBFB55' 
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
            width: 3
          })
        })
    })];
    return styleC;

  }
});
lvGob_Ver.setVisible(false);
/*******************************************************************************************************/

/**
Base Layer
*/

/*var openSeaMapLayer =  new ol.layer.Tile({
            source: new ol.source.XYZ({
                attributions: [
                        new ol.Attribution({
                            html: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                        }),
                        ol.source.OSM.DATA_ATTRIBUTION
                    ],
                url: 'https://{a-b}.tiles.mapbox.com/v3/examples.a3cad6da/{z}/{x}/{y}.png',
                tilePixelRatio: 1
            })
        }); 
        
var openSeaMapLayer = new ol.layer.Tile({
   source: new ol.source.OSM({
       attributions: [
           new ol.Attribution({
               html: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
           }),
           ol.source.OSM.DATA_ATTRIBUTION
       ],
       crossOrigin: null,
       url: 'http://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
   })
});*/

var openSeaMapLayer = new ol.layer.Tile({
    source: new ol.source.OSM({
        attributions: [
            new ol.Attribution({
                html: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            }),
            ol.source.OSM.DATA_ATTRIBUTION
        ],
        crossOrigin: null,
        url: 'http://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
        
    })
});
