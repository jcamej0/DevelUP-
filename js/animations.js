$("body > header > nav nav").parent().hover(function(){$(this).addClass("hover"); $(this).find("> nav").width($(this).width()).each(function(){clearTimeout($(this).data("time")); $(this).css("margin-top",0); $(this).removeData('data name'); }) },function(){$(this).removeClass("hover"); var elem = $(this).find("> nav"); elem.data("time",setTimeout(function(){$(elem).removeAttr('style'); },700)); });

window.rad = function(num){
	return Math.random()*num;
}

// Atributos estandares de los las etiquetas PATH

var pathWA={fillOpacity:0,stroke:"#1d312f"},
textWA={fill:"black"};

//Recorre un objeto svg y lo transforma en un Wireframe
//Guarda el resto de los atributos en la variable svgAttr

window.toWireframe = function(svg,hide){
	forEach(svg.children,function(){
		if(/g/.test(this.tagName)){
			toWireframe(this,hide);
		}else{
			if(this.saveSvgAttr)
				this.saveSvgAttr();
			if("path"==this.tagName){
				var length=this.getTotalLength();
				TweenLite.set(this,extend({strokeWidth:this.svgAttr["stroke-width"]||1},pathWA,hide?{strokeDasharray:length,strokeDashoffset:length}:{}));
			}else if (this.tagName=="text") {
				TweenLite.set(this,extend(textWA,hide?{fillOpacity:0}:{}));
			}
		}
	})
}

function animateWF(tl,elems,i,yoyo){
	tl.to(elems,3,{strokeDashoffset:0},"pais"+i);
	elems.each(function(){
		tl.to(this,1,extend(this.svgAttr,{fillOpacity:this.svgAttr["fill-opacity"]||1}),"fill-"+i);
		if(yoyo){
			tl.to(this,1,extend({delay:1,strokeWidth:this.svgAttr["stroke-width"]||1},pathWA),"empy-"+i);
			var length=this.getTotalLength();
			tl.to(this,3,{strokeDasharray:length,strokeDashoffset:length},"undraw-"+i);
		}
	});
}

toWireframe($("svg")[0],true);

var countries = new TimelineLite({delay:1,/*onComplete:function(){
	countries.seek("pais0");
}*/});

$(".store").each(function() {
	animateWF(countries,$(this).find("path"),"tienda");
});

$(".world svg > g:not(.store)").each(function(index, el) {
	animateWF(countries,$(this).find("path"),index,true);
});

countries.stop();

$(".world").click(function(){
	countries.play();
})

function getGradiant (e) {
	return $($(e).attr("fill").replace(/url\(|\)/gi,""))[0].children;
}

var lab = new TimelineLite();

function fillTo (tl,e,to,t,label) {
	tl.to(e[2],t,{attr:{offset:to}},label);
	tl.to(e[1],t,{attr:{offset:to+0.001}},label);
}

function animateLine (tl,e,t,label) {
	var length=e[0].getTotalLength();
	TweenLite.set(e,{strokeDasharray:length,strokeDashoffset:length});
	tl.to(e,t,{strokeDashoffset:0},label);
}

TweenLite.defaultEase = Linear.easeNone;

$(".client-skill").each(function() {
	var label="content-cliente";
	fillTo(lab,getGradiant(this),0.01,5,label);
	animateLine(lab,$(".line-0"),2,label)
	fillTo(lab,getGradiant($(".refine-ideas")),1.1,3,label+"+=2");
	animateLine(lab,$(".line-1"),2)
	fillTo(lab,getGradiant($(".refine-tec")),1,3,"tec");
	animateLine(lab,$(".line-2"),3);
	fillTo(lab,getGradiant($(".refine-tools")),1,3,"tools");
	animateLine(lab,$(".line-3"),3);
	lab.to($(".screan"),1,{fill:"#77b2a9",ease:RoughEase.ease.config({strength:4,points:10, template:Elastic.easeIn})},"screan");
	lab.fromTo(".blue-sky",2,{opacity:0},{opacity: 1,delay:1})
});

// lab.seek("line-3");
lab.timeScale(1.5)
lab.play();

window.svgResize = function(svg){
	var def=$(svg).attr("width"),current=$(svg).width(),perc=(current*100/def)/100;
	$(svg).height($(svg).attr("height")*perc);
}

$(window).on('resize', function(e) {
	$("svg").each(function() {
		svgResize(this)
	});
}).trigger('resize');

//draw($("svg > g.store")[0],true);
