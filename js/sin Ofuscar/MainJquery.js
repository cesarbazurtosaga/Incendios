$(document).ready(function() {
  
	//TITULO DE MAPA
	$("#title").text(titulo_map);
	
  
    //CAMBIA EL COMBO DEPARTAMENTO PROVINCIA, MUNICIPIO VEREDA
    $( "#layers" ).change(function () {
    var str = "";
    padre = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text(); console.log(str);
      var view = map.getView();
      global_valores = undefined;		//console.log("val globales: "+global_valores);
      //ESTABLECE EL ZOOM A FULL EXTEND
      view.setZoom(9);
      		console.log("ESCALA MPIO: " +escalaMun);
			console.log("ESCALA PROV: " +escalaPro);
      if(str=="Departamento"){
			$("#div_filtro").hide();
      }else if(str=="Provincia"){
			//$("#div_filtro").show();
			//view.setZoom(9);
			AutoDisplayLeyend(escalaPro);	
      }else if(str=="Municipio"){
			//view.setZoom(11);
			//$("#div_filtro").show();
			AutoDisplayLeyend(escalaMun);		
      }else if(str=="Vereda"){
      		$("#div_filtro").hide();	
      	//view.setZoom(13);	
      }
      
      //Centro del mapa
      //map.getView().setCenter(-8230000, 541212);

	//OCULTA DIV DE GRAFICA
	$("#chartContainer").hide();
      
	//REMUEVE EL OVERLAY
	featureOverlay1.removeFeature(highlight2);
      
	displayLayer(null,str);

    });
    //alert( str );
  }).change();
  
  //EVENTO CLICK EN EL BOTÓN FILTRAR
  $( "#btn_filtrar" ).click(function () {
  		//OBTIENE EL NOMBRE DEL FEATURE SELECCIONADO
		var feature_seleccionado = $("#filtro").text();
		padre = $("#filtro").text();
		var i;
		var features = null;	//features de la SELECCION
		var features_filtro = null;	//features del FILTRO
		var combo_filtro = null; //valor que debe tomar el combo al filtrar
		var nom_escala = null;
		global_valores = undefined;			//console.log("val globales: "+global_valores);

		var ident =  $("#layers option:selected").attr('value'); 	console.log("Combo btn_filtrar: " + ident);
		//console.log("Combo: "+ident);// get the features from the select interaction		//console.log("Provincia :" + lvGob_Prov.getSource().getFeatures().length);
/*		console.log("ESCALA MPIO: " +escalaMun);
		console.log("ESCALA PROV: " +escalaPro);	*/
				
		//PONE VISIBLE LA CAPA DE MUNICIPIOS
		if(ident == "Departamento"){
			lvGob_Dep.setVisible(false);
			lvGob_Prov.setVisible(true);
			lvGob_Mun.setVisible(false);
			lvGob_Ver.setVisible(false);
			//EN EL COMBO SELECCIONA PROVINCIA
			//$('#layers option[value="Provincia"]').attr("selected", "selected");
			$("#layers > [value='Provincia']").attr("selected", "true");	
			//REMUEVE EL OVERLAY
			featureOverlay1.removeFeature(highlight2);
			//Desaparece Gráfica
			$('#chartContainer').hide();
			//Oculta el DIV Filtro
			$("#div_filtro").hide();
			//Activa leyenda
			$('#items').show();
		}else if(ident == "Provincia"){	//true	false
			
			displayLayer(null,'Municipio');
			
			lvGob_Dep.setVisible(false);
			lvGob_Prov.setVisible(false);
			lvGob_Mun.setVisible(true);
			lvGob_Ver.setVisible(false);
			features=lvGob_Prov.getSource().getFeatures();	//Obtiene Layer para hacer el extend
			AutoDisplayLeyend(escalaPro);
		}else if(ident == "Municipio"){
			lvGob_Dep.setVisible(false);
			lvGob_Prov.setVisible(false);
			lvGob_Mun.setVisible(false);
			lvGob_Ver.setVisible(true);
			LayerMuniLinea.setVisible(true);
			features=lvGob_Mun.getSource().getFeatures();	//Obtiene Layer para hacer el extend
			AutoDisplayLeyend(escalaMun);
		}
		
		//OCULTA DIV DE GRAFICA
		$("#chartContainer").hide();
		//ACTIVA EL BOTÓN SUBIR
		$("#div_filtro").show();
		$("#filtro").text('');
		$("#btn_subir").show();
		$("#btn_filtrar").hide();
		

		
		//SET INTERVAL PARA DETERMINAR EL MOMENTO DE LA CARGA DEL LAYER
		if(ident != "Departamento") var intervaLay = setInterval(CargadoLay, 100);
		
		
	  function CargadoLay() {
	  	
	  	
	  		//Obtiene Layer para hacer el filtro
	  		if(ident == "Provincia"){
	  			features_filtro=lvGob_Mun.getSource().getFeatures();
	  			combo_filtro = "Municipio";							//Valor para actualizar en el combo
	  			nom_escala = 'Municipio';						//Nombre de la escala de colores
/*	*/ 		}else if(ident == "Municipio"){							//HABILITAR SI HAY INFORMACIÓN A NIVEL DE VEREDA
				features_filtro=lvGob_Ver.getSource().getFeatures();
				combo_filtro = "Vereda";								//Valor para actualizar en el combo
				nom_escala = 'Vereda';									//Nombre de la escala de colores		
	  		}else{
	  			combo_filtro = "Provincia";
	  			clearInterval(intervaLay);
	  		}
	  		
			var encontrados = features_filtro.length;
			console.log('Cargando Layer.....Espere! --- ' + nom_escala);
			console.log("Feat. Encontrados :" + encontrados);
//			lyr_cargado = false;
			
			if (encontrados > 0){
				
				//REALIZA EL ZOON EXTEND DEL FEATURE SELECCIONADO
				if(features.length>0){
					for(i=0;i<features.length;i++){
						if (feature_seleccionado == features[i].get(nom_mostrar)){
							map.getView().fitExtent(features[i].getGeometry().getExtent(), map.getSize());	//lvGob_Prov.setVisible(false);
							//REINICIA EL FILTRO
							//$("#div_filtro").hide();
							$("#filtro").text('');
							break;
						}
					}
				} 
				
				
//				lyr_cargado = true;
				
		  		//DESPLIEGA LA LEYENDA ADECUADA
		  		//displayLeyendLay(nom_escala);
		  		
				//CAMBIA EL COMBO A LA SELCCION DE MUNICIPIO
				//$('#layers option[value="' + combo_filtro + '"]').attr("selected", "selected");
				console.log("Combo Click Filtrar NUEVO: "+combo_filtro);
				$("#layers > [value='"+combo_filtro+"']").attr("selected", "true");
				
				//LIMPIA EL INTERVALO
				clearInterval(intervaLay);			console.log('Layer CARGADOS!');
				
				//REMUEVE EL OVERLAY
				featureOverlay1.removeFeature(highlight2);
				
				//padre = $("#filtro").text();
			}
		}
  });
  
	$( "#btn_subir" ).click(function () {
		var ident = $("#layers option:selected").attr('value'); //$('#layers').val();
		var combo_filtro = "";
		padre = "";
		$('#filtro').text('');
		//ESTABLECE EL ZOOM A FULL EXTEND
      	view.setZoom(9);
		global_valores = undefined;
		console.log("Combo Click Subir: "+ident);
		if(ident == "Provincia"){
			combo_filtro = "Departamento";
			$("#btn_subir").hide();
			lvGob_Dep.setVisible(true);
			lvGob_Prov.setVisible(false);
			lvGob_Mun.setVisible(false);
			lvGob_Ver.setVisible(false);
		}else if(ident == "Municipio"){
			AutoDisplayLeyend(escalaPro);
			combo_filtro = "Provincia";
			$("#btn_subir").show();
			lvGob_Prov.setVisible(true);
			LayerMuniLinea.setVisible(false);
			lvGob_Dep.setVisible(false);
			lvGob_Mun.setVisible(false);
			lvGob_Ver.setVisible(false);
			
			features_filtro=lvGob_Prov.getSource().getFeatures();
			nom_escala = 'Provincia'
		}else if(ident == "Vereda"){
			combo_filtro = "Municipio";
			$("#btn_subir").show();
			lvGob_Dep.setVisible(false);
			lvGob_Prov.setVisible(false);
			lvGob_Mun.setVisible(true);
			lvGob_Ver.setVisible(false);
			//AutoDisplayLeyend(escalaMun);
		}
		//CAMBIA EL COMBO A LA SELCCION DE MUNICIPIO
		//$('#layers option[value="' + combo_filtro + '"]').attr("selected", "selected");
		//$('#layers option[value="' + combo_filtro + '"]').attr("selected", "selected");
	
		//$( "#layers" ).selectmenu( "refresh" );
		
		//OCULTA DIV DE GRAFICA
		$("#chartContainer").hide();
	      
		//REMUEVE EL OVERLAY
		featureOverlay1.removeFeature(highlight2);
	      
		//REMUEVE FILTRO
		$("#btn_filtrar").hide();

		console.log("Combo Click Subir NUEVO: "+combo_filtro);
		$("#layers > [value='"+combo_filtro+"']").attr("selected", "true");
		
	});  
});