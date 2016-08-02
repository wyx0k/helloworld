/* 基本图文组件对象 */
var H5ComponentBase=function(name,cfg){
	var cfg=cfg||{};
	var id=('H5_C_'+Math.random()).replace('.','_');
	var cls='H5_Component_name_'+name+' H5_Component_'+cfg.type
	var component=$('<div class="H5_Component '+cls+'" id="'+id+'"></div>');
	cfg.text&&component.text(cfg.text);
	cfg.width&&component.width(cfg.width/2);
	cfg.height&&component.css('height',cfg.height/2);
	cfg.css&&component.css(cfg.css);
	cfg.bg&&component.css('backgroundImage','url('+cfg.bg+')');
	if(cfg.relativeTo){
		var relativeTo=$('body').find('.H5_Component_name_'+cfg.relativeTo)[0];
		var rey=parseInt(relativeTo.offsetTop);
		var reh=parseInt(relativeTo.offsetHeight);
		var rel=relativeTo.offsetLeft;
		var ok=rey+reh;
		if(cfg.center&&cfg.center===true){
			rel=0;
		}
		component.css({transform:'translate('+rel+'px,'+ok+'px)'})
	}
	if(cfg.center&&cfg.center===true){
		component.css({left:'50%',marginLeft:(cfg.width/4*-1),});
	}
	if(typeof(cfg.onclick)==='function'){
			component.on('click',cfg.onclick)
	}
	component.on('onLoad',function(){
		setTimeout(function(){
		cfg.animateIn&&component.animate(cfg.animateIn)
   	   	component.addClass(cls+'_Load').removeClass('H5_Component_'+cfg.type+'_Leave');
   	   	},cfg.Indelay||0)
		  
  		  return false;
});
	component.on('onLeave',function(){
		setTimeout(function(){
			component.addClass(cls+'_Leave').removeClass('H5_Component_'+cfg.type+'_Load');
    		cfg.animateIn&&component.animate(cfg.animateOut)
    	},cfg.Outdelay||cfg.Indelay||0)
    		return false;
});
//---------------{反复触发----------------------
/*var load=false;
$('body').on('click',function(){
 load=!load;
	component.trigger(load?'onLoad':'onLeave')
})*/
//---------------反复触发}----------------------
return component
}
