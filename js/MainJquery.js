$(document).ready(function() {
  
	//TITULO DE MAPA
	$("#title").text(glo.titulo_map);
	
	if(window.location.href.search("this_map")>1){
		$("#Comparativos").hide();	
	}
	
	$("#Comparativos").click(function() {
		window.open('http://saga.cundinamarca.gov.co/apps/comparativeSalud/','_blank');
	});
  	
  	$("#InpClave").autocomplete({
	    source: function (request, response) {
	    	$.ajax({
          		  url: "./services/GetDiagnosticos.php",
          		  data:{
          		  	clave:request.term.toUpperCase()
          		  },
		          dataType: "jsonp",
		          jsonpCallback:'getDiagnostico',
		          success: function(data) {
		          	console.log("data");
		          	console.log(data);
		          	if(data){
		          		response($.map(data, function (el) {
		                return {
		                    label: el.f2,
		                    value: el.f2,
		                    codigo:el.f1,
		                    nombre:el.f2		                };
		            	}));
		          	}
		          }
	        });
	    },
	    minLength: 3,
	    select: function (event, ui) {
	    	$("#CodDiagnostico").empty().append(ui.item.codigo);
	        seleccion_diagnostico=ui.item.nombre;
	    },
	    open: function () {
	        $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
	        $(this).addClass("list-group");
	    },
	    close: function () {
	        $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
	    }
	}).autocomplete("instance")._renderItem = function (ul, item) {
	    ul.addClass("list-group");
	    ul.addClass("Ancho");
	    
	    return $( '<li class="list-group-item" style="max-width:200px;">' )
	        .append('<h6>' + item.label + '</h6>' +
	                '</li>').appendTo(ul);     
	};
	
	function filtrar(){
		refreshfeatures();
	}
	$("#MostrarBusquedas").hide(100);
  	$("#OcultarBusqueda").click(function(){
		$("#panelBusquedas").hide( 300, function() {
				$("#MostrarBusquedas").show(300);
		});
	});
	
	$("#MostrarBusquedas").click(function(){
		$("#panelBusquedas").show( 300, function() {
				$("#MostrarBusquedas").hide(300);
		});
	});
    
});

function getMultiSelect(id){
	var brands = $('#'+id+' option:selected');
    var selection = [];
    $(brands).each(function(index, brand){
    	selection.push((brand.value));
        selection.push((brand.label));
    });
    return selection;
}

function getparametros(){
	var escala="";
	$( "#layers option:selected" ).each(function() {
   	  var str = $( this ).text();
      if(str=="Vereda"){
		escala='g_incendios_vereda';
		
      }else if(str=="Provincia"){
		escala=	'g_incendios_provincia';
		
      }else if(str=="Municipio"){
		escala='g_incendios_municipio';
			
      }
      $("#TextEscalaMun").empty().append(str);
    });
    
  
    var fechaini=$('#datetimepicker_ini').data("DateTimePicker").getDate().format('YYYY-MM-DD');
  	var fechafin=$('#datetimepicker_fin').data("DateTimePicker").getDate().format('YYYY-MM-DD');
  	$("#TextFechaini").empty().append(fechaini);
  	$("#TextFechafin").empty().append(fechafin);
  	var parametros = {
	    fechaini:fechaini,
	    fechafin:fechafin,
	    escala:escala/*,
	    msGrupo:msGrupo,
	    msSubGrupo:msSubGrupo,
	    msSubGrupo2:msSubGrupo2,
	    
	    fuente:fuente*/	
	};
	$('#chartContainer').hide();
	return parametros; 
}

function filtrar(){
	refreshfeatures("");
}
/*
$('#msGrupo,#msSubGrupo,#msSubGrupo2').multiselect({
    	includeSelectAllOption: true,
    	enableFiltering: true,
    	enableCaseInsensitiveFiltering: true,
    	buttonWidth: '150px',
        dropRight: true,
        maxHeight: 250,
        filterPlaceholder:'Buscar...',
        buttonText: function(options, select) {
        		
                var labels = [];
                options.each(function() {
                     if ($(this).attr('label') !== undefined) {
                         labels.push($(this).attr('label'));
                     }
                     else {
                         labels.push($(this).html());
                     }
                 });
                 return labels.join(', ') + '';
        },
        onChange: function(element, checked) {
         	var arrayvalues=element.attr('value').split("-");
	        if(arrayvalues.length==1){
	        	if(arrayvalues[0]=='0'){
	        		$('#msSubGrupo').multiselect('dataprovider', []);
	        		$("#msSubGrupo").multiselect('disable'); 
	        		$('#msSubGrupo2').multiselect('dataprovider', []);
	        		$("#msSubGrupo2").multiselect('disable'); 
				}else{
					$("#msSubGrupo").multiselect('enable');
					$('#msSubGrupo').multiselect('dataprovider', []);
					loadSubGrupos(element.attr('value'));
					$('#msSubGrupo2').multiselect('dataprovider', []);
	        		$("#msSubGrupo2").multiselect('disable'); 
				}
	        }else if(arrayvalues.length==2){
	        	if(arrayvalues[0]=='30'){
	        		$('#msSubGrupo2').multiselect('dataprovider', []);
	        		$("#msSubGrupo2").multiselect('disable'); 
				}else{
					$("#msSubGrupo2").multiselect('disable'); 
					$('#msSubGrupo2').multiselect('dataprovider', []); 
					loadSubGrupo2(arrayvalues[0]);
				}
	        } 	
	    }
    });
    
	$.getJSON( "./services/GetGrupos.php", function( options ) {
		options=options.reverse();
		$('#msGrupo').multiselect('dataprovider', options);
		$("#msSubGrupo").multiselect('disable');
		$("#msSubGrupo2").multiselect('disable'); 
 	});	
 	function loadSubGrupos(clave){
 		$.getJSON( "./services/GetSubGrupos.php?clave="+clave, function( options ) {
			options=options.reverse();
			$('#msSubGrupo').multiselect('dataprovider', options); 
 		});		
 	}
 	function loadSubGrupo2(clave){
	 	$.getJSON( "./services/GetSubGrupos2.php?clave="+clave, function( options ) {
	 		options.push({"value":"000","label":"TODAS"});
			options=options.reverse();
			console.log(options);
			$('#msSubGrupo2').multiselect('dataprovider', options); 
			$("#msSubGrupo").multiselect('enable');
		});	
 	}*/
 	

