var AutoDisplayLeyend=function(c)
	{
	console.log("VAL LEYENDA ACTUAL: "+c);
	if(c!==undefined)
		{
		var leyend=document.getElementById('items');
		var labels=[];
		var val=c;
		labels.push('<b>'+tit_tooltip+'</b>');
		labels.push('<i  style=" background:rgba(153,52,4,1);
		border-color:rgba(44,104,141,1);
		 "></i> '+val[5]+'+');
		labels.push('<i  style=" background:rgba(217,95,14,1);
		border-color:rgba(44,104,141,1);
		 "></i> '+(val[4]+1)+' - '+val[5]);
		labels.push('<i  style=" background:rgba(254,153,41,1);
		border-color:rgba(44,104,141,1);
		 "></i> '+(val[3]+1)+' - '+val[4]);
		labels.push('<i  style=" background:rgba(254,196,79,1);
		border-color:rgba(44,104,141,1);
		 "></i> '+(val[2]+1)+' - '+val[3]);
		labels.push('<i  style=" background:rgba(254,227,145,1);
		border-color:rgba(44,104,141,1);
		 "></i> '+(val[1]+1)+' - '+val[2]);
		labels.push('<i  style=" background:rgba(255,255,212,1);
		border-color:rgba(83,147,92,1);
		 "></i> '+val[0]+' - '+val[1]);
		leyend.style.display='block';
		leyend.innerHTML=labels.join('<br>')
	}
};
