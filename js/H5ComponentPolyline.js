/* 柱图组件对象 */
var H5ComponentPolyline=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);
	var w=cfg.width;
	var h=cfg.height;
	//var cvs=$('<canvas></canvas>')
	var cvs=document.createElement('canvas');
	var ctx=cvs.getContext('2d');
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	component.append(cvs);
	var step=10;
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeStyle='#aaa';
	
	for(i=0;i<step+1;i++){
		var y=cvs.height/step*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	for(i=0;i<=cfg.data.length+1;i++){
		var x=cvs.width/(cfg.data.length+1)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if(cfg.data[i]){
		var text=$('<div class="text"></div>');
		text.width(cvs.width/(cfg.data.length+1)/2);
		text.css('left',x/2+cvs.width/(cfg.data.length+1)/4)
		text.text(cfg.data[i][0]);
		component.append(text);
	}
	}
	ctx.stroke();
	//加入画布
	var cvs=document.createElement('canvas');
	var ctx=cvs.getContext('2d');
	cvs.width=ctx.width=w;
	cvs.height=ctx.height=h;
	var step=10;

	component.append(cvs);
	//for (i in cfg.data){}
	//---------------------------------------------------point
	var line=function(per){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.lineWidth=3;
		ctx.strokeStyle='#ff8878';
		var X=0;
		var Y=0;
		var basex=w/(cfg.data.length+1)
		$.each(cfg.data,function(index,item){
			X=basex+index*basex;
			Y=h-(item[1])*h*per;
			ctx.moveTo(X,Y);
			ctx.arc(X,Y,5,0,2*Math.PI,false);
		})
	//------------------------------------------------------line&shadow
		ctx.moveTo(basex,h-(cfg.data[0][1])*h*per)
		$.each(cfg.data,function(index,item){
			X=basex+index*basex;
			Y=h*(1-item[1]*per);
			ctx.lineTo(X,Y);
			
		})
		ctx.stroke();
		ctx.lineWidth=0.5;
		ctx.lineTo(X,h);
		ctx.lineTo(basex,h);
		ctx.lineTo(basex,h-(cfg.data[0][1])*h*per)
		ctx.fillStyle='rgba(255,130,120,0.2)';
		ctx.fill();
		//------------------------------------------------------text
		$.each(cfg.data,function(index,item){
			X=basex+index*basex;
			Y=h-(item[1])*h*per;
			if(item[2]){
				ctx.fillStyle=item[2];
			}else{
				ctx.fillStyle='#595959';
			}
			ctx.fillText((item[1]*100)+'%',X,Y-10);
		})
		ctx.stroke();
}
	component.on('onLoad',function(){
		var s=0;
		for(i=0;i<100;i++){
			setTimeout(function(){
			line(s);
			s+=0.01;
			},i*10)
		}

	})
	component.on('onLeave',function(){
		var s=0;

			line(s);

	})
		return component;
}
