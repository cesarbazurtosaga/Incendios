var informacion=$('#info2');
informacion.tooltip(
	{
	animation:false,trigger:'manual',html:true
}
);
var displayFeatureValue=function(pixel)
	{
	informacion.css(
		{
		left:pixel[0]+'px',top:(pixel[1]-10)+'px'
	}
	);
	var feature=map.forEachFeatureAtPixel(pixel,function(feature,layer)
		{
		if(LayerProvLinea!=layer)
			{
			return feature
		}
	}
	);
	var layer=map.forEachFeatureAtPixel(pixel,function(feature,layer)
		{
		return layer
	}
	);
	if(feature)
		{
		if(layer==lvGob_Prov||layer==lvGob_Mun||layer==lvGob_Dep||layer==lvGob_Ver)
			{
			var field_show=tit_tooltip+' '+feature.get(nom_mostrar)+' <br> Total : '+feature.get(val_mostrar);
			informacion.attr('data-original-title',field_show)
		}
		informacion.tooltip('hide').tooltip('fixTitle').tooltip('show')
	}
	else
		{
		informacion.tooltip('hide')
	}
	if(pixel[0]!==undefined&&pixel[0]!=lastPixel[0])
		{
		lastPixel=pixel
	}
};
var displayFeatureInfo=function(pixel)
	{
	var chart=document.getElementById('chartContainer');
	var feature=map.forEachFeatureAtPixel(pixel,function(feature,layer)
		{
		if(LayerProvLinea!=layer)
			{
			return feature
		}
	}
	);
	validaSel=1;
	if(feature)
		{
		chart.style.display='block';
		PieChart(feature);
		var ident=$('#layers').val();
		if(ident!="Vereda")$("#btn_filtrar").show();
		$("#div_filtro").show();
		$("#filtro").show();
		$("#filtro").html(feature.get(nom_mostrar))
	}
	else
		{
		chart.style.display='none'
	}
	if(feature!=highlight2)
		{
		if(highlight2)
			{
			featureOverlay1.removeFeature(highlight2)
		}
		if(feature)
			{
			featureOverlay1.addFeature(feature)
		}
		highlight2=feature
	}
	if(pixel[0]!==undefined)
		{
		lastPixel=pixel
	}
};
$(map.getViewport()).on('mousemove',function(evt)
	{
	var pixel=map.getEventPixel(evt.originalEvent);
	displayFeatureValue(pixel)
}
);
map.on('singleclick',function(evt)
	{
	var coordinate=evt.coordinate;
	overlay.setPosition(coordinate);
	displayFeatureInfo(evt.pixel)
}
);
