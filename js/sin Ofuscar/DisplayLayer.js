var displayLayer = function(resolution, vista) {
    console.log("displayLayer resolution: " + resolution);
    console.log("displayLayer vista: " + vista);
    if (resolution == null) {
        if (vista == "Departamento") {
            lvGob_Prov.setVisible(false);
            lvGob_Mun.setVisible(false);
            lvGob_Dep.setVisible(true);
            lvGob_Ver.setVisible(false);
            LayerMuniLinea.setVisible(false);
            LayerProvLinea.setVisible(true);
            $('#items').hide();
            $("#div_filtro").hide();
            $("#btn_subir").hide();
            $("#filtro").hide();
            $("#btn_filtrar").hide();
            view.setZoom(9)
        }
        if (vista == "Provincia") {
            lvGob_Prov.setVisible(true);
            lvGob_Mun.setVisible(false);
            lvGob_Dep.setVisible(false);
            lvGob_Ver.setVisible(false);
            $('#items').show();
            $("#div_filtro").show();
            $("#btn_subir").show();
            $("#filtro").show();
            $("#btn_filtrar").hide();
            LayerMuniLinea.setVisible(false);
            LayerProvLinea.setVisible(true)
        }
        if (vista == "Municipio") {
            lvGob_Prov.setVisible(false);
            lvGob_Mun.setVisible(true);
            lvGob_Dep.setVisible(false);
            lvGob_Ver.setVisible(false);
            LayerMuniLinea.setVisible(true);
            LayerProvLinea.setVisible(true);
            $('#items').show();
            $("#filtro").hide();
            $("#btn_filtrar").hide()
        }
        if (vista == "Vereda") {
            lvGob_Prov.setVisible(false);
            lvGob_Mun.setVisible(false);
            lvGob_Dep.setVisible(false);
            lvGob_Ver.setVisible(true);
            LayerProvLinea.setVisible(true);
            LayerMuniLinea.setVisible(true);
            $('#items').show();
            $("#div_filtro").show();
            $("#filtro").hide();
            $("#btn_filtrar").hide();
            $("#btn_subir").show()
        }
    } else {
        if (resolution > 100) {
            lvGob_Prov.setVisible(true);
            lvGob_Mun.setVisible(false)
        } else if (resolution <= 100 && resolution > 30) {
            lvGob_Prov.setVisible(false);
            lvGob_Mun.setVisible(true)
        } else {
            lvGob_Prov.setVisible(false);
            lvGob_Mun.setVisible(false)
        }
    }
};