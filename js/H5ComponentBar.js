/* 柱图组件对象 */
var H5ComponentBar=function(name,cfg){
	var component=new H5ComponentBase(name,cfg)
	$.each(cfg.data,function(index,item){
		var line=$('<div class="line"></div>');
		var dataname=$('<div class="dataname"></div>');
		var bar=$('<div class="bar"></div>');
		var barwidth=item[1]*100+'%';
		var rate=$('<div class="rate">'+barwidth+'</div>');
		var bg=$('<div class="bg"></div>');
		bar.append(bg);
		bar.css('width',barwidth);
		dataname.text(item[0]);
		if(item[2]){
		bg.css('backgroundColor',item[2]);
		}
		line.append(dataname).append(bar).append(rate);
		component.append(line);
	});

	return component;
}
