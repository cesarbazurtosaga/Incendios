var featureOverlay=new ol.FeatureOverlay(
	{
	map:map,style:function(feature,resolution)
		{
		var text=resolution<5000?feature.get(nom_mostrar):'';
		if(!highlightStyleCache[text])
			{
			highlightStyleCache[text]=[new ol.style.Style(
				{
				stroke:new ol.style.Stroke(
					{
					color:'red',width:2
				}
				),fill:new ol.style.Fill(
					{
					color:'rgba(235,0,0,0)'
				}
				),text:new ol.style.Text(
					{
					font:'16px Arial,sans-serif',text:text,fill:new ol.style.Fill(
						{
						color:'#000'
					}
					),stroke:new ol.style.Stroke(
						{
						color:'white',width:6
					}
					)
				}
				)
			}
			)]
		}
		return highlightStyleCache[text]
	}
}
);
var featureOverlay1=new ol.FeatureOverlay(
	{
	map:map,style:function(feature,resolution)
		{
		var text=resolution<5000?feature.get(nom_mostrar):'';
		if(!highlightStyleCache[text])
			{
			highlightStyleCache[text]=[new ol.style.Style(
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
		return highlightStyleCache[text]
	}
}
);
