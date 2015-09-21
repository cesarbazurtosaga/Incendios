var view=new ol.View(
	{
	center:[-8230000,541212],zoom:9,extent:[-8392046.4,461652.0,-8103420.1,592665.0],minZoom:8,maxZoom:14
}
);
var map=new ol.Map(
	{
	controls:ol.control.defaults().extend([new ol.control.ScaleLine(
		{
		units:'metric'
	}
	)]),layers:[openSeaMapLayer,lvGob_Ver,lvGob_Mun,lvGob_Prov,lvGob_Dep,LayerProvLinea,LayerMuniLinea],target:'map',view:view
}
);
map.getView().on('change:resolution',function()
	{
}
);
var highlightStyleCache=
	{
};
var overlay=new ol.Overlay(
	{
	element:container
}
);
