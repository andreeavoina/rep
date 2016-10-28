var Animate = (function () {

	var public = {};
	public.animate = undefined;
	public.renderer = undefined;
	public.camera = undefined;
	
	public.Render = function(){

		requestAnimationFrame( public.Render );		
		Updater.Update();
		public.renderer.render( Loader.scene, public.camera);
		
	};
	
	return public;

}());