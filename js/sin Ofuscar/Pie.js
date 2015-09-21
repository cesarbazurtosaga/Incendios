function isFloat(myNum)
	{
	var myMod=myNum%1;
	if(myMod==0)
		{
		return false
	}
	else
		{
		return true
	}
}
function valida_numero(cant)
	{
	var es_numero=false;
	var cant_es_flotante=isFloat(cant);
	if(isNaN(cant)==false&&cant>0&&cant_es_flotante==false)
		{
		es_numero=true
	}
	return es_numero
}
var creardatasource=function(feature)
	{
	var dataSource2=[];
	var data_sector;
	var objeto=feature.getProperties(),propiedad;
	for(propiedad in objeto)
		{
		var es_excepcion=false;
		excepciones.forEach(function(entry)
			{
			if(entry==propiedad)
				{
				es_excepcion=true
			}
		}
		);
		if(valida_numero(objeto[propiedad])==true&&es_excepcion==false)
			{
			data_sector=[propiedad,parseFloat(objeto[propiedad])];
			dataSource2.push(data_sector)
		}
	}
	return dataSource2
};
var PieChart=function(feature)
	{
	var dataSource=creardatasource(feature);
	var texto=tematica+" - "+feature.get(nom_mostrar);
	var subtexto=tit_tooltip+": "+feature.get(val_mostrar);
	$(function()
		{
		$('#chartContainer').highcharts(
			{
			chart:
				{
				plotBackgroundColor:null,plotBorderWidth:null,plotShadow:false,backgroundColor:'rgba(255, 255, 255, 0.7)'
			}
			,title:
				{
				text:texto
			}
			,subtitle:
				{
				text:subtexto
			}
			,credits:
				{
				text:'Sistema de Análisis Geográfico de Cundinamarca <br> Secretaría TIC',href:'#'
			}
			,legend:
				{
				layout:'vertical',maxHeight:170
			}
			,tooltip:
				{
				pointFormat:'
					{
					series.name
				}
				:
					{
					point.y
				}
				<br>Porcentaje:<b>
					{
					point.percentage:.1f
				}
				%</b>'
			}
			,plotOptions:
				{
				pie:
					{
					allowPointSelect:true,cursor:'pointer',dataLabels:
						{
						enabled:false
					}
					,showInLegend:true
				}
			}
			,series:[
				{
				type:'pie',name:tit_tooltip,data:dataSource
			}
			]
		}
		)
	}
	)
};
