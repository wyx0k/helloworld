/* 雷达图组件对象 */
var H5ComponentRadar=function(name,cfg){
var component=new H5ComponentBase(name,cfg);
	var w=cfg.width;
	var h=cfg.height;
	//background	
	var cvs=document.createElement('canvas');
	var ctx=cvs.getContext('2d');
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	component.append(cvs);
	var perdeg=(360/cfg.data.length)*Math.PI/180;
	var isblue=true;
	for(j=10;j>0;j--){
	var r=(200/10)*j;
	var deg=0.5*Math.PI;
	ctx.beginPath();
	ctx.moveTo(Math.cos(deg)*r+200,Math.sin(deg)*r+200);
	for(i=0;i<cfg.data.length;i++){
	x=Math.cos(deg)*r+200;
	y=Math.sin(deg)*r+200;
	ctx.lineTo(x,y);
	deg=deg+perdeg;
	}
	ctx.closePath();
	ctx.fillStyle=isblue?'#66ccff':'#eee';
	ctx.fill();
	isblue=!isblue;
	}
	ctx.beginPath();
	var deg=0.5*Math.PI;
	for(i=0;i<cfg.data.length;i++){
	ctx.moveTo(200,200);
	x=Math.cos(deg)*200+200;
	y=Math.sin(deg)*200+200;
	ctx.lineTo(x,y);
	deg=deg+perdeg;
	var text=$('<div class="text">'+cfg.data[i][0]+'</div>');
	if(y<h/2){
	text.css('bottom',(h-y)/2+5);
	}else{
	text.css('top',y/2+5);
	}
	if(x<w/2){
	text.css('right',(w-x)/2+5-20);
	}else{
	text.css('left',x/2+5-20);
	}
	if(cfg.data[i][2]){
	text.css('color',cfg.data[i][2]);
	}else{
	text.css('color','#666');
	}
	component.append(text);
	}
	ctx.strokeStyle='#ddd';
	ctx.stroke();
	//data
	var cvs=document.createElement('canvas');
	var ctx=cvs.getContext('2d');
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	component.append(cvs);

	function line(per){
	ctx.clearRect(0,0,w,h);
	ctx.beginPath();
	var deg=0.5*Math.PI;
	var rate=cfg.data[0][1]*per;
	ctx.moveTo(Math.cos(deg)*200*rate+200,Math.sin(deg)*200*rate+200);
	for(i=0;i<cfg.data.length;i++){
	var rate=cfg.data[i][1]*per;
	x=Math.cos(deg)*200*rate+200;
	y=Math.sin(deg)*200*rate+200;
	ctx.lineTo(x,y);
	deg=deg+perdeg;
	}
	ctx.closePath();
	ctx.lineWidth=3;
	ctx.strokeStyle='#f1010';
	ctx.stroke();
	ctx.fillStyle='rgba(255,130,120,0.5)';
	ctx.fill()
	var deg=0.5*Math.PI;
	var rate=cfg.data[0][1]*per;
	ctx.moveTo(Math.cos(deg)*200*rate+200,Math.sin(deg)*200*rate+200);
	for(i=0;i<cfg.data.length;i++){
	var rate=cfg.data[i][1]*per;
	x=Math.cos(deg)*200*rate+200;
	y=Math.sin(deg)*200*rate+200;
	ctx.beginPath();
	ctx.arc(x,y,5,0,2*Math.PI);
	ctx.fillStyle='#000';
	ctx.font = "20px Calibri"
	ctx.fillText(cfg.data[i][1]*100+"%",x-10,y-10);
	ctx.closePath();
	if(cfg.data[i][2]){
	ctx.strokeStyle=cfg.data[i][2];
	}else{
	ctx.strokeStyle='#f00';
	}
	ctx.stroke();
	deg=deg+perdeg;
	}
	
}
component.on('onLoad',function(){
	var s=0;
	for(i=0;i<100;i++){
		setTimeout(function(){
			line(s);
			s+=0.01
		},i*10)
	}
})
component.on('onLeave',function(){
	var s=0;
	line(s);

})

return component;
}