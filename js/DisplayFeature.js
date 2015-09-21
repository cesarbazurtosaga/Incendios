var informacion=$('#info2');

informacion.tooltip({
		animation:false,trigger:'manual',html:true
});

var remove_features_over=function(feature){
	if (feature !== highlight2) {
	    if (highlight2) {
	      featureOverlay.getSource().clear();
	    }
	    if (feature) {
	      featureOverlay.getSource().addFeature(feature);
	    }
	    highlight2 = feature;
	  }
    
};
var displayFeatureValue=function(pixel)
	{
	informacion.css(
		{
		left:pixel[0]+'px',top:(pixel[1]+30)+'px'
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
		if(layer==lvGob_Mun||layer==lvGob_Prov||layer==lvGob_Ver){
			console.log(feature.get('nombre_mun'));
			var nombre=feature.get('nombre');
			if(feature.get('nombre_mun')!==undefined){
				nombre=feature.get('nombre')+'<br>'+feature.get('nombre_mun');	
			}
			var field_show=nombre+'<br><b>'+
			'Cantidad de Incendios '+feature.get(glo.varMapeo)+'</b>';
			
			
			/*if(numeral(feature.get('bplantado'))!=0){
				field_show=field_show+'<br> <small>Bosque Plantado </small> : '+numeral(feature.get('bplantado')).format('0,0');	
			}
			if(numeral(feature.get('bintervenido'))!=0){
				field_show=field_show+'<br> <small>Bosque Intervenido </small>: '+numeral(feature.get('bintervenido')).format('0,0');	
			}
			if(numeral(feature.get('bnativo'))!=0){
				field_show=field_show+'<br> <small>Bosque Nativo </small>: '+numeral(feature.get('bnativo')).format('0,0');	
			}			
			if(numeral(feature.get('cultivos'))!=0){
				field_show=field_show+'<br> <small>Cultivos</small> : '+numeral(feature.get('cultivos')).format('0,0');	
			}
			if(numeral(feature.get('paramos'))!=0){
				field_show=field_show+'<br> <small>Paramos </small>: '+numeral(feature.get('paramos')).format('0,0');	
			}
			if(numeral(feature.get('pastizales'))!=0){
				field_show=field_show+'<br> <small>Pastizales</small>: '+numeral(feature.get('pastizales')).format('0,0');	
			}
			if(numeral(feature.get('pastos_mejor'))!=0){
				field_show=field_show+'<br> <small>Pastos Mejorados</small>: '+numeral(feature.get('pastos_mejor')).format('0,0');	
			}			
			if(numeral(feature.get('rastrojo'))!=0){
				field_show=field_show+'<br> <small>Sabanas y Pastizales</small>: '+numeral(feature.get('rastrojo')).format('0,0');	
			}			
			if(numeral(feature.get('vegetacion_seca'))!=0){
				field_show=field_show+'<br> <small>Rastrojo</small>: '+numeral(feature.get('vegetacion_seca')).format('0,0');	
			}*/
			if(numeral(feature.get('area_total'))!=0){
				field_show=field_show+'<br> <small>Area Total</small>: '+numeral(feature.get('area_total')).format('0,0')+' ha2';
			}
			informacion.attr('data-original-title',field_show);
		}
		informacion.tooltip('hide').tooltip('fixTitle').tooltip('show');
		remove_features_over(feature);
	}
	else
		{
	    featureOverlay.getSource().clear();
	    highlight2 = '';
		informacion.tooltip('hide');
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
		$("#filtro").html(feature.get(nom_mostrar));
	}
	else
		{
		chart.style.display='none';
		
	    featureOverlay1.getSource().clear();
	    
	}
	if (feature !== highlight) {
	    if (highlight) {
	      featureOverlay1.getSource().clear();
	    }
	    if (feature) {
	      featureOverlay1.getSource().addFeature(feature);
	    }
	    highlight = feature;
	  }
	if(pixel[0]!==undefined)
		{
		lastPixel=pixel
	}
};

$(map.getViewport()).on('mousemove',function(evt){
	var pixel=map.getEventPixel(evt.originalEvent);
	displayFeatureValue(pixel)
});
map.on('singleclick',function(evt){
	var coordinate=evt.coordinate;
	overlay.setPosition(coordinate);
	displayFeatureInfo(evt.pixel)
});
