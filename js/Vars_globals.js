var validaSel = 0;
var capa = 'LayerMun';
var tipo_ley = 1;
var global_sectores, global_indicador, global_valores, global_parametros, padre;
var host = "http://saga.cundinamarca.gov.co";
var date_values;
var styleCache = {};
var feature_select;
var ingreso_app = 0;

var valida_feature, feature_sel;
var highlight, highlight2;
var lastPixel = [];
var escalaVer, escalaMun, escalaPro, escalaDep;
var nom_mostrar = "nombre",
    val_mostrar = "cont",
    
    nom_padre = "padre",
    
    tematica = "delitos",
    seleccion_diagnostico=$("#Diagnostico").text();
    

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var resolutions_zoom = [305, 152, 76, 38];
var glo = {
	geoserver:"http://saga.cundinamarca.gov.co:8080/geoserver/",
	esquema:'emergencias',
	titulo_map : "Mapa de Incendios",
	varMapeo: "cont",
	excepciones: [
		"cod_ver",
		"nombre",
		"nombre_mun",
		"cont",
		"area_total",
		"codigo_mun",
		"codigo_pro"
	],
	tit_tooltip : "Núm Incendios",
	alias:[]
};
glo.alias['bnativo']='Bosque Nativo';
glo.alias['bintervenido']='Bosque Intervenido';
glo.alias['bplantado']='Bosque Plantado';
glo.alias['cultivos']='Cultivos';
glo.alias['paramos']='Paramos';
glo.alias['pastizales']='Pastizales';
glo.alias['pastos_mejor']='Pastos Mejorados';
glo.alias['rastrojo']='Rastrojos';
glo.alias['vegetacion_seca']='Vegetacion Seca';
glo.alias['area_total']='Area Total';
Array.prototype.unique = function (a) {
    return function () { return this.filter(a) }
}(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0
});



String.prototype.trunc = String.prototype.trunc ||
    function(n) {
      return this.length > n ? this.substr(0, n - 1) + '...' : this.substr(0);
    };

$('#datetimepicker_ini').datetimepicker({
    language: 'es',
    defaultDate: moment("01/01/2015").format("DD/MM/YYYY"),
    pickTime: false
});
$('#datetimepicker_fin').datetimepicker({
    language: 'es',
    defaultDate: moment().format("DD/MM/YYYY"),
    pickTime: false
});
$('#datetimepicker_fin').data("DateTimePicker").setMinDate($('#datetimepicker_ini').data("DateTimePicker").getDate());
$('#datetimepicker_ini').data("DateTimePicker").setMaxDate($('#datetimepicker_fin').data("DateTimePicker").getDate());
$("#datetimepicker_ini").on("dp.change",function (e) {
   $('#datetimepicker_fin').data("DateTimePicker").setMinDate(e.date);                     
});
$("#datetimepicker_fin").on("dp.change",function (e) {
   $('#datetimepicker_ini').data("DateTimePicker").setMaxDate(e.date);
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	    var idnewtab = ($(e.target).attr('href'));
	    $(idnewtab + "Color").addClass("text-primary");
	    
	    var idoldtab = ($(e.relatedTarget).attr('href'));
	    $(idoldtab + "Color").removeClass("text-primary");
	    
	});
});