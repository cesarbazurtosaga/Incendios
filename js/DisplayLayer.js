var displayLayer = function(resolution, vista) {
    console.log("displayLayer resolution: " + resolution);
    console.log("displayLayer vista: " + vista);
    if (resolution == null) {
        if (vista == "Departamento") {
        	refreshfeatures("diag_dpto");
            lvGob_Prov.setVisible(false);
            lvGob_Mun.setVisible(false);	
            lvGob_Dep.setVisible(true);
            lvGob_Ver.setVisible(false);
            LayerMuniLinea.setVisible(false);
            LayerProvLinea.setVisible(true);
            view.setZoom(9);
        }
        if (vista == "Provincia") {
        	refreshfeatures("diag_prov");
            lvGob_Prov.setVisible(true);
            lvGob_Mun.setVisible(false);
            lvGob_Dep.setVisible(false);
            lvGob_Ver.setVisible(false);
            LayerMuniLinea.setVisible(false);
            LayerProvLinea.setVisible(true)
        }
        if (vista == "Municipio") {
        	refreshfeatures("diag_mun");
            lvGob_Prov.setVisible(false);
            lvGob_Mun.setVisible(true);
            lvGob_Dep.setVisible(false);
            lvGob_Ver.setVisible(false);
            LayerMuniLinea.setVisible(true);
            LayerProvLinea.setVisible(true);
            
        }
        if (vista == "Vereda") {
            lvGob_Prov.setVisible(false);
            lvGob_Mun.setVisible(false);
            lvGob_Dep.setVisible(false);
            lvGob_Ver.setVisible(true);
            LayerProvLinea.setVisible(true);
            LayerMuniLinea.setVisible(true);
            
        }
    }
};