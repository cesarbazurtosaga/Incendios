/**
 * @author user
 */
			
//variables get
		 
 function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

//socket 
var mcmp_socket = io.connect('http://saga.cundinamarca.gov.co:3321/MapComparative');

//variables de comparacion
//console.log("localStorage.id_vista: " + localStorage.id_vista);
if(localStorage.id_vista !== undefined) var mcmp_idvista=localStorage.id_vista.toString();

if (getUrlVars()["this_map"]){ var mcmp_panel=getUrlVars()["this_map"];} else {var mcmp_panel='-1';}
if (getUrlVars()["other_map"]){var mcmp_panel2=getUrlVars()["other_map"];} else {var mcmp_panel2='-2';}


var mcmp_freshCenter=true;
var mcmp_freshZoom=true;

view.on('change:center', function() {
    //onsole.log(view.getCenter());
    var vista={
    	"Center":view.getCenter(),
    	"Zoom":view.getZoom(),
    	"id": mcmp_idvista+mcmp_panel2
    }
    
    if(mcmp_freshCenter==true){
    	mcmp_socket.emit('SetChangueMap',vista);
    }else{
    	mcmp_freshCenter=true;
    }	
});
view.on('change:resolution', function() {
	//console.log(view.getCenter());
    var vista={
    	"Center":view.getCenter(),
    	"Zoom":view.getZoom(),
    	"id": mcmp_idvista+mcmp_panel2
    }
  
    if(mcmp_freshZoom==true){
    	mcmp_socket.emit('SetChangueMap',vista);
    }else{
    	mcmp_freshZoom=true;
    }	
});
mcmp_socket.on('news', function (data) {
	//console.log(data);	
});

mcmp_socket.on('GetChangueMap', function (data) {
//	console.log(data)
	
	if(data.id==mcmp_idvista+mcmp_panel){	
		mcmp_freshCenter=false;
		mcmp_freshZoom=false;
		view.setCenter(data.Center);
	  	view.setZoom(data.Zoom);
	  	
	}
});