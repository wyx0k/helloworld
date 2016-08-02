/* 散点图表组件对象 */
var H5ComponentPoint=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);

	var base=cfg.data[0][1]
	$.each(cfg.data,function(index,item){
		var point=$('<div class="point point_'+index+'"></div>');
		var dataname=$('<div class="dataname">'+item[0]+'</div>');
		var rate=$('<div class="rate">'+item[1]*100+'%</div>')
		dataname.append(rate);
		var per=(item[1]/base*100)+'%';
		point.width(per);
		point.height(per);
		point.append(dataname);
		component.append(point);
		if(item[2]){
			point.css({'background-color':item[2]})
		}
		if(item[3]!==undefined&&item[4]!==undefined){
		//	point.css({'left':item[3],'top':item[4]});
		point.data({'left':item[3],'top':item[4]});
		point.css({'left':($(component).width()-point.width())/2,'top':($(component).height()-point.height())/2})
		component.on('onLoad',function(){
			setTimeout(function(){
				point.animate({left:point.data('left'),top:point.data('top')})
			},500)
		});
		component.on('onLeave',function(){
			point.animate({'left':($(component).width()-point.width())/2,'top':($(component).height()-point.height())/2},500)
		});
	}

		point.css('zIndex',point.width());

	})
	return component;
}