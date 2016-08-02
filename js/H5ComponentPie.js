/* 饼图组件对象 */
var H5ComponentPie=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);
	var w=cfg.width;
	var h=cfg.height;
	//background
	var r=w/2;
	var cvs=document.createElement('canvas');
	var ctx=cvs.getContext('2d');
	cvs.width=ctx.width=w;
	cvs.height=cvs.height=h;
	component.append(cvs);
	ctx.beginPath();
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fillStyle='#c9c9c9';
	ctx.fill();
	//data
	var cvs=document.createElement('canvas');
	var ctx=cvs.getContext('2d');
	cvs.width=ctx.width=w;
	cvs.height=cvs.height=h;
	component.append(cvs);
	var sparecolor=['#a14523','#45a123','#66ccff','#a91256','#a289b2','#8952a1'];
	var deg=1.5*Math.PI;

	for(i=0;i<cfg.data.length;i++){
	var perdeg=(cfg.data[i][1]*360)*Math.PI/180;
	ctx.beginPath();
	ctx.moveTo(r,r);
	ctx.arc(r,r,r,deg,deg+perdeg);
	ctx.closePath();
	var textcolor=cfg.data[i][2]?cfg.data[i][2]:sparecolor.pop();
	var text=$('<div class="text">'+cfg.data[i][0]+'</div>');
	var textrate=$('<div class="textrate">'+cfg.data[i][1]*100+'%'+'</div>');
	text.append(textrate);

	var textx=r+Math.cos(deg+perdeg/2)*r;
	var texty=r+Math.sin(deg+perdeg/2)*r;

	text.css('color',textcolor);

	if(textx>w/2-1){
	text.css('left',textx/2);
	}else{
	text.css('right',(w-textx)/2+5);
	}
	if(texty<h/2){
	text.css('bottom',(h-texty)/2);
	}else{
	text.css('top',texty/2)
	}
	text.css('opacity',0);
	component.append(text);
	ctx.fillStyle=textcolor;
	ctx.fill();
	deg=deg+perdeg;
	}
	//animate
	var cvs=document.createElement('canvas');
	var ctx=cvs.getContext('2d');
	cvs.width=ctx.width=w;
	cvs.height=cvs.height=h;
	component.append(cvs);
	function line(per){
	ctx.clearRect(0,0,w,h);
	ctx.beginPath();
	ctx.moveTo(r,r);
	if(per<=0){
	ctx.arc(r,r,r,0,2*Math.PI);
	component.find('.text').css('opacity',0);
	}else{
	ctx.arc(r,r,r,0+1.5*Math.PI,1.5*Math.PI+2*Math.PI*per,true);
	}
	ctx.fillStyle='#eee';
	ctx.fill();

	if(per>=1){
		component.find('.text').css('transition','all 0s');
		H5ComponentPie.reSort(component.find('.text'),w,h);
		component.find('.text').css('transition','all 1s');
		component.find('.text').css('opacity',1);
	    ctx.clearRect(0,0,w,h);
	}
	
	}
    line(0);
	component.on('onLoad',function(){
		var s=0;
		for(i=1;i<=100;i++){
			setTimeout(function(){
			s+=0.01;
			line(s);
			},i*10+500)
		}
	})
	component.on('onLeave',function(){
		var s=0;
		line(s);

	})
	return component;
}
H5ComponentPie.reSort=function(list,w,h){
	var compare=function(doma,domb){
		var shadowa_x=[doma.offsetLeft,doma.offsetWidth+doma.offsetLeft]
		var shadowa_y=[doma.offsetTop,doma.offsetHeight+doma.offsetTop]
		var shadowb_x=[domb.offsetLeft,domb.offsetWidth+domb.offsetLeft]
		var shadowb_y=[domb.offsetTop,domb.offsetHeight+domb.offsetTop]
		var intersect_x=(shadowa_x[0]>=shadowb_x[0]&&shadowa_x[0]<=shadowb_x[1])||(shadowa_x[1]>=shadowb_x[0]&&shadowa_x[1]<=shadowb_x[1])
		var intersect_y=(shadowa_y[0]>=shadowb_y[0]&&shadowa_y[0]<=shadowb_y[1])||(shadowa_y[1]>=shadowb_y[0]&&shadowa_y[1]<=shadowb_y[1])
		return intersect_x&&intersect_y
	}
	var reset=function(doma,domb){

		if($(domb).css('top')=='auto'){
			$(domb).css('bottom',parseInt($(domb).css('bottom'))+doma.offsetHeight)
			console.log('1');
		}

		/*if($(domb).css('right')&&$(domb).css('top')&&($(domb).css('left')=='auto')){
			$(domb).css('top',doma.offsetTop-domb.offsetHeight)

		}*/
		if($(domb).css('bottom')=='auto'){
			$(domb).css('top',parseInt($(domb).css('top'))+domb.offsetHeight)
		}
			}
			for(j=0;j<list.length;j++){
				for(i=0;i<j;i++){
				if(list[i]){
					if(compare(list[i],list[j])){
						reset(list[i],list[j])
						console.log(list[i],list[j])
					}
				}
		}
		}

		
	}


