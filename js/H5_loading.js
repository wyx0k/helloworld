globe={};
var H5_loading=function(imgs,open){
	var id=this.id;
	if(this._imgs==undefined){
		this._imgs=(imgs||[]).length;
		this.loaded=0;
		globe[id]=this;
	
		for(s in imgs){
			var item=imgs[s];
			var img=new Image;
			img.onload=function(){
				globe[id].loader();
			}
			img.src=item;
		}
		$('#rate').text('0%');
		return this;
		}else{
			this.loaded++
			$('#rate').text(((this.loaded/this._imgs*100)>>0)+'%');
			if(this.loaded==this._imgs){
				globe[id]=null;
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
			return this;
		}
}