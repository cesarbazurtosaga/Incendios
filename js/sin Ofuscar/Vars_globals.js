var validaSel = 0;
var capa = 'LayerProv';
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
    val_mostrar = "total",
    tit_tooltip = "Núm Casos",
    nom_padre = "padre",
    titulo_map = "HISTORIAS CLINICAS",
    tematica = "Salud";
var excepciones = ["total", "poblacion", "area", "nbi", "presupuesto_aprobado", "presupuesto_ejecutado", "codigo_mun", "codigo_mun", "cod_mun", "cod_dane"];
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var resolutions_zoom = [305, 152, 76, 38];
$(document).on({
    ajaxStart: function() {
        $("body").addClass("loading")
    },
    ajaxStop: function() {
        $("body").removeClass("loading")
    }
});
$("#Slider").slider({
    from: 2011,
    to: 2014,
    step: 1,
    scale: [2011, '|', 2012, '|', 2013, '|', 2014],
    limits: true,
    skin: "plastic",
    callback: function(value) {
        var dates = $("#Slider").slider("calculatedValue").split(";");
        console.log("Fechas: " + dates[0].replace(",", "") + ' ' + +dates[1].replace(",", ""));
        var ident = $('#layers').val();
        console.log("Combo Slider: " + ident);
        global_parametros = 'fecha_final:' + dates[1].replace(",", "") + ';fecha_inicial:' + dates[0].replace(",", "");
        global_valores = undefined;
        if (ident == "Provincia") {
            peticionjsonp('delitos', 'g_delito_prov', 'callback:loadFeatures', '&viewparams=' + global_parametros + ";")
        } else if (ident == "Municipio") {
            peticionjsonp('delitos', 'g_delito_mpio', 'callback:loadFeatures', '&viewparams=' + global_parametros + ";")
        }
        console.log("Padre: " + padre);
        $('#chartContainer').hide()
    }
});