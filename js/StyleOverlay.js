

var featureOverlay = new ol.layer.Vector({
  	source: new ol.source.Vector(),
  	map: map,
	style:function(feature,resolution){
		var text=resolution<5000?feature.get(nom_mostrar):'';
		if(!highlightStyleCache[text])
			{
			highlightStyleCache[text]=[new ol.style.Style(
				{
				stroke:new ol.style.Stroke(
					{
					color:'#00FFFF',width:3
				}
				),fill:new ol.style.Fill(
					{
					color:'rgba(235,0,0,0)'
				}
				)
			}
			)]
		}
		return highlightStyleCache[text]
	}
});


var featureOverlay1 = new ol.layer.Vector({
  	source: new ol.source.Vector(),
  	map: map,
	style:function(feature,resolution){
		var text=resolution<5000?feature.get(nom_mostrar):'';
		if(!highlightStyleCache2[text])
			{
			highlightStyleCache2[text]=[new ol.style.Style(
				{
				stroke:new ol.style.Stroke(
					{
					color:'red',width:3
				}
				),fill:new ol.style.Fill(
					{
					color:'rgba(235,0,0,0)'
				}
				)
			}
			)]
		}
		return highlightStyleCache2[text]
	}
});

