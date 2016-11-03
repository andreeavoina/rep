var Animate = (function () {

	var public = {};
	public.animate = undefined;
	public.renderer = undefined;
	public.camera = undefined;
	
	var frameID;
	
	public.Render = function(time){
		
		frameID = requestAnimationFrame( public.Render );		
		Updater.Update();		
		$('#score').text(Game.score++);
		
		var health = $('#healthBar');
		
		
		public.renderer.render( Loader.scene, public.camera);
		
	};
	
	public.Stop = function(){
		cancelAnimationFrame(frameID);
	}
	
	return public;

}());