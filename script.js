$(document).ready(function(){
	"use strict";
	var Imageslider;
	function imageSlider(t){
		if($('.view').hasClass('animate')){
			var SlidesNo = $('.view').length;
		for(var i=0; i < SlidesNo; i++){
			$('.view').eq(i).css({"z-index":SlidesNo - i});
		}
		Imageslider = setTimeout(function(){
			var that = $('.animate');
			that.animate(
				{
					"opacity": "0",
				},
				{
					duration: t,
					complete: function(){
						that.removeClass('animate');
						var activeImg = $('.active-slide');
						activeImg.removeClass('active-slide');
						if(activeImg.next().length !== 0){
							activeImg.next().addClass('active-slide');
							that.next().addClass('animate');
						}else{
							$('.slide-item').eq(0).addClass('active-slide');
							$('.view').eq(0).addClass('animate');
							$('.view').animate({"opacity":"1"},{duration:t});
						}	
						imageSlider(t);
					},
				}
			);
		},7000);
		}
		
	}
	imageSlider(500);
	var that;
	$('.view').hover(function(){
		clearTimeout(Imageslider);
		that = $('.animate');
		that.stop( true, false );
		that.animate(
					{
						"opacity":"1",
						"visibility":"visibile"
					});
		that.removeClass('animate');
	},function(){
		that.addClass('animate');
		imageSlider(500);
	});
});