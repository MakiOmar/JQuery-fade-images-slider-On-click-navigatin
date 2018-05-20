$(document).ready(function(){
	"use strict";
	var Imageslider;
	var SlideIndex;
	var SlidesNo = $('.view').length;
	for(var i=0; i < SlidesNo; i++){
		$('.view').eq(i).css({"z-index":SlidesNo - i});
	}
	function imageSlider(t){
		if($('.view').hasClass('animate')){	
		Imageslider = setTimeout(function(){
			var that = $('.animate');
			SlideIndex = SlidesNo - $('.view').index(that);
			that.animate(
				{
					"opacity": "0",
				},
				{
					duration: t,
					complete: function(){
						that.removeClass('animate');
						that.css({"z-index":SlideIndex});
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
	function enterSlide(){
		clearTimeout(Imageslider);
		that = $('.animate');
		that.stop( true, false );
		that.animate(
					{
						"opacity":"1",
						"visibility":"visibile"
					});
		that.removeClass('animate');
	}
	function leaveSlide(){
		that.addClass('animate');
		imageSlider(500);
	}
	$('.view').hover(enterSlide,leaveSlide);	
	
	$('.slide-item').click(function(e){
		var currActive = $('.active-slide');
		var currAnimate = $('.animate');
		var activURL;
		e.preventDefault();
		clearTimeout(Imageslider);
		currActive.removeClass('active-slide');
		currAnimate.removeClass('animate');
		$(this).addClass('active-slide');
		activURL= $(this).attr('href');
		$('.view > img').each(function(){
			if($(this).attr('src') === activURL){
				$(this).parent().addClass('animate');
				$('.animate').css({"opacity":"1","z-index":$('.view').length+1});
			}
		});
	});
	
	$('.active-slide').mouseleave(function(){
		imageSlider(500);
	});
});