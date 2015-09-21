
var view=new ol.View({
	center:[-8230000,535000],zoom:9,extent:[-8392046.4,461652.0,-8103420.1,592665.0],minZoom:8,maxZoom:12
});

var map=new ol.Map({
	controls:ol.control.defaults().extend([new ol.control.ScaleLine({
		units:'metric'
	})])
	,layers:[
		openSeaMapLayer,
		lvGob_Ver,
		lvGob_Mun,
		lvGob_Prov,
		LayerProvLinea,
		LayerMuniLinea,
		limiteDPTO
	]
	,target:'map',view:view
});
map.getView().on('change:resolution',function(){
});
var highlightStyleCache={};
var highlightStyleCache2={};
var overlay=new ol.Overlay({
	element:container
});


document.addEventListener('DOMContentLoaded', function() {
  FastClick.attach(document.body);
});