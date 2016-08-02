/* 环图组件对象 */
var H5ComponentRing=function(name,cfg){
	cfg.type='Pie';
	cfg.data=[cfg.data[0]];
	var w=cfg.width;
	var h=cfg.height;
	var r=w/2;
	component=new H5ComponentPie(name,cfg);
	component.addClass('H5_Component_Ring');
	var cvs=document.createElement('canvas');
	var ctx=cvs.getContext('2d');
	cvs.width=ctx.width=w;
	cvs.height=cvs.height=h;
	component.append(cvs);
	ctx.beginPath();
	ctx.arc(r,r,r*0.8,0,2*Math.PI);
	ctx.fillStyle='#fff';
	ctx.fill();

	var ringtext=$('<div class="ringtext"></div>');
	component.find('.text').css({'top':0,'left':0});
	ringtext.append(component.find('.text'));
	component.append(ringtext);

	return component;
}