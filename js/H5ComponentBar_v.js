/* 垂直柱图组件对象 */
var H5ComponentBar_v=function(name,cfg){
	var component=new H5ComponentBar(name,cfg);
		var linewidth=(100/cfg.data.length)+'%';
		component.find('.line').css({'width':linewidth,'height':'100%'});
		
		$.each(component.find('.bar'),function(index,item){
			var WtoH=$(this).css('width');
			$(this).height(WtoH).width('15px');
		})
		$.each(component.find('.line'),function(index,item){
			//var tempdataname=$(this).find('.dataname');
			$(this).find('.bar').prepend($(this).find('.rate'));
			//$(this).append(tempdataname);
		})

	return component;
}
