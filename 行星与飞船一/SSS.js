//spsid=space ship id
var xingxing={};
var log=document.getElementsByClassName('ctrinfo')[0];
var btn=document.getElementsByTagName('button')[0];
var conctr=document.getElementById('conctr');
var divui=document.getElementById('ui');
var pref=document.getElementById('pref');
var bh=0;
var spses=0;
var conspsarr=[null,null,null,null];
var ox=250;
var oy=250;
var needspsid;

(function(xx){//行星控制台部分，包括飞船的注册，飞船的销毁，启动，停止。还包括广播介质
	var xxsps={};
	var lostsps=[];
	var time={};
	var fueltime={};
	function countsps(){
		countspses=divui.childNodes.length;
		return countspses;
	}
	function ships(){

	}
	xx.newsps=function(spsid,spr){
	conspses=countsps();
		if(conspses>=4){
	return conspses;
	}
		if(!(xxsps[spsid])){
	         xxsps[spsid]=[];
		}else{
		    xxsps['lost'+spsid]=xxsps[spsid];
		    
			var newlostship=document.createElement('div');//------------------------------------------------kelong
			var newlostshipfu=document.createElement('div');
			newlostshipfu.className='spfuel';
			newlostshipfu.style.background='red';
			newlostshipfu.id='dom'+'lost'+spsid+'fuel';
			newlostship.className='sp';
			newlostship.id='lostship'+spsid;
			newlostship.style.display='block';
			newlostship.style.left=xxsps[spsid][0].dom.offsetLeft+'px';
			newlostship.style.top=xxsps[spsid][0].dom.offsetTop+'px';
console.log(xxsps[spsid][0].dom.offsetLeft,xxsps[spsid][0].dom.offsetTop)
			newlostship.appendChild(newlostshipfu);
			pref.appendChild(newlostship);
			console.log(spsid)
			xxsps['lost'+spsid][0].dom=document.getElementById(['lostship'+spsid]);
				console.log(xxsps['lost'+spsid]);
				xxsps[spsid]=[];
if(time[spsid]){
	indonghua(['lost'+spsid]);
	//indonghua(xxsps['lost'+spsid]);------erro
}
//--------------------------------------------------------------------------------------------------------------
		}
		clearInterval(time[spsid]);
		time[spsid]='';
		adduibtn(spsid);//----------------------------------------------------------------------
		newship(spsid,spr);
		xxsps[spsid].push({
			dom:document.getElementById(['dom'+spsid]),
			key:false,
			spr:spr,
			ang:180,
			fuel:540,
			start:function(arg){
				instart(spsid);
				},
			stop:function(arg){
				instop(spsid);
			},
			destroy:function(spsid){
			var domship=document.getElementById(['dom'+spsid]);
				delete xxsps[spsid];
		clearInterval(time[spsid]);
		time[spsid]='';
		clearInterval(fueltime[spsid]);
		fueltime[spsid]='';
		domship.style.display='none';
			},
			donghua:function (spsid) {
			indonghua(spsid);
}
		});
		fuelshow(spsid,xxsps[spsid][0].fuel);
	log.innerHTML=log.innerHTML+'发射宇宙飞船'+spsid+'号</br>';
	return true;
};

function instop(spsid){
	clearInterval(time[spsid]);
	time[spsid]='';
		if(fueltime[spsid]){
		clearInterval(fueltime[spsid]);
		fueltime[spsid]='';
		console.log('clear ok')
	}
	addfuel(spsid);
}
function instart(spsid){
	if(fueltime[spsid]){
		clearInterval(fueltime[spsid]);
		fueltime[spsid]='';
		console.log('clear ok')
	}
	console.log(xxsps[spsid])
	xxsps[spsid][0].donghua(spsid);
}

function indonghua(spsid){
	if(time[spsid]){console.log('xxxxxxxxxxxx');return false;}else{
				time[spsid]=setInterval(function() {
						ang=getvalue(spsid,'ang');
						sp=getvalue(spsid,'dom');
					xxsps[spsid][0].ang++;
					xxsps[spsid][0].fuel--;
					console.log(xxsps[spsid][0].fuel)
					fuelcheck(spsid);
					fuelshow(spsid,xxsps[spsid][0].fuel);
					console.log(xxsps[spsid][0].ang)
				if(xxsps[spsid][0].ang>=360){xxsps[spsid][0].ang=0}
				spx=sp.offsetLeft;
				spy=sp.offsetTop;
		 var a = Math.sin( ang*Math.PI/180 ) * xxsps[spsid][0].spr;
		 var b = Math.cos( ang*Math.PI/180 ) * xxsps[spsid][0].spr;
	console.log(a+','+b)
		 sp.style.left=ox+a-10+'px';
		sp.style.top=oy+b-10+'px';
		console.log(spx+','+spy)
}, 20);}
}
//-------------------------------------------------------------------------------------------------------
xx.mediator=function(spsid,fntype,arg){
	setTimeout(function(){
	switch (fntype){
		case 'start':
		log.innerHTML=log.innerHTML+'发射信号：'+spsid+'打开引擎</br>';
		break;
		case 'stop':
		log.innerHTML=log.innerHTML+'发射信号：'+spsid+'熄灭引擎</br>';
		break;
		case 'destroy':
			for( var i=0;i<4;i++){
			if(conspsarr[i]==spsid){
				conspsarr[i]=null;
			}
		}
		
		var domspsid=document.getElementById(spsid);
		divui.removeChild(domspsid);
		log.innerHTML=log.innerHTML+'发射信号：'+spsid+'自爆</br>';
		break;
		default:
		log.innerHTML=log.innerHTML+'命令错误！';
		break;
	}
	log.scrollTop=log.scrollHeight;
	var miss=Math.round(Math.random()*100);
	if(miss<=30){//-------------------------------------记得改30
		return false;
	}
	xx.command(spsid,fntype,arg);
},1000);//-------------------------------------记得改1000
}
xx.command=function(spsid,fntype,arg){
	if(!(xxsps[spsid])){
		return false;
	}
	for (var sps in xxsps){
		if(sps==spsid){
			subscribed=xxsps[sps];
			subscribed[0][fntype](arg);
		}
	}
}
function getvalue(spsid,objname){
	return xxsps[spsid][0][objname];
}

function fuelcheck(spsid){
if(xxsps[spsid][0].fuel<=0){
	clearInterval(time[spsid]);
	time[spsid]='';
	addfuel(spsid);
}
}
function addfuel(spsid){
fueltime[spsid]=setInterval(function(){
if(xxsps[spsid][0].fuel>=540){
	clearInterval(fueltime[spsid]);
	fueltime[spsid]='';
}else{
	fuelshow(spsid,xxsps[spsid][0].fuel);
	xxsps[spsid][0].fuel++;
}
console.log(xxsps[spsid][0].fuel)
},20);
}

function fuelshow(spsid,fu){
fu=fu/540*100;
var domspfuel=document.getElementById('dom'+spsid+'fuel');
domspfuel.style.width=fu+'%';
}





})(xingxing);
//------------------------------------------------------------------------------------------------------------------
//ui部分
	function spsbh(){
	for(i=0;i<4;i++){
		if(conspsarr[i]==null){
			var j=i+1
			var xxxx='enterprise'+j;
			conspsarr.splice(i,1,xxxx);
			return j;
		}
}
}
btn.onclick=function(){
	bh=spsbh();
spbh='enterprise'+bh;
var ss=bh*40+30;
	xingxing.newsps(spbh,ss);
	
};


function adduibtn(spsid,needsps){
newdiv=document.createElement('div');
newid=document.createTextNode(spsid+'：');
newbtn1=document.createElement('button');
newbtn2=document.createElement('button');
newbtn3=document.createElement('button');
br=document.createElement('br');
newbtn3.innerHTML='自爆';
newbtn2.innerHTML='熄灭引擎';
newbtn1.innerHTML='启动引擎';
newbtn1.className='btnx'
newbtn2.className='btnx'
newbtn3.className='btnx'
newdiv.id=spsid;
newbtn1.onclick=function(){
	xingxing.mediator(spsid,'start',1);
}
newbtn2.onclick=function(){
	xingxing.mediator(spsid,'stop',1);
}
newbtn3.onclick=function(){
	xingxing.mediator(spsid,'destroy',spsid);
}
newdiv.appendChild(newid);
newdiv.appendChild(newbtn1);
newdiv.appendChild(newbtn2);
newdiv.appendChild(newbtn3);
divui.appendChild(newdiv);
}
function newship(spsid,spr){
var domship=document.getElementById(['dom'+spsid]);
domship.style.display='block';
domship.style.left='240px';
domship.style.top=oy-spr-10+'px';
domship.style.zIndex=5;
console.log(domship.offsetLeft,domship.offsetTop)
}
//动画
