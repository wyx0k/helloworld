/* 内容管理对象 */

var H5=function(){
	this.id=('h5_'+Math.random()).replace('.','_');
	this.ele=$('<div class="h5" id="'+this.id+'">');
	this.pages=[];
	$('body').append(this.ele);
	this.addPage=function(name,text){
		var page=$('<div class="h5_page section">')
		if(name!=undefined){
			page.addClass('h5_page_'+name);
		}
		if(text!=undefined){
			page.text(text);
		}
		$('.h5').append(page);
		this.pages.push(page);
		if(typeof(this.whenAddPage)==='function'){
			this.whenAddPage();
		}
		return this;
	}
	this.addComponent=function(name,cfg){
		var cfg=cfg||{};
		cfg=$.extend({type:'Base'},cfg);
		var component;
		switch(cfg.type){
			case 'Base':
				component=new H5ComponentBase(name,cfg);
				break;
			case 'Polyline':
				component=new H5ComponentPolyline(name,cfg);
				break;
			case 'Ring':
				component=new H5ComponentRing(name,cfg);
				break;
			case 'Bar':
				component=new H5ComponentBar(name,cfg);
				break;
			case 'Bar_v':
				component=new H5ComponentBar_v(name,cfg);
				break;
			case 'Radar':
				component=new H5ComponentRadar(name,cfg);
				break;
			case 'Point':
				component=new H5ComponentPoint(name,cfg);
				break;
			case 'Pie':
				component=new H5ComponentPie(name,cfg);
				break;
			default:
		}
		var page=this.pages.slice(-1)[0];
		page.append(component);

		return this;
	}

	this.loader=function(open){
		this.ele.fullpage({
			afterLoad:function(anchorLink,index){
			$(this).find('.H5_Component').trigger('onLoad');
			},
			onLeave:function(index,nextIndex,dircetion){
			$(this).find('.H5_Component').trigger('onLeave');
			}
			});
		this.pages[0].find('.H5_Component').trigger('onLoad');
		this.ele.show();
		if(open){
			this.ele.fullpage.moveTo(open);
		}
	}
	this.loader=typeof(H5_loading)==='function' ?H5_loading:this.loader;
}

/*初始化*/
