var Animate = (function () {

	var public = {};
	public.animate = undefined;
	public.renderer = undefined;
	public.camera = undefined;
	
	public.Render = function(time){
		
		requestAnimationFrame( public.Render );		
		Updater.Update();		
		$('#score').text(Game.score++);
		public.renderer.render( Loader.scene, public.camera);
		
	};
	
	return public;

}());