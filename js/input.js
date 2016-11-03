var Input = (function () {

	var public = {};
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var objects = [];
	
	
	public.Add = function(obj){
		objects.push(obj);
	}
	
	public.Stop = function(){
		objects = [];
	}
	
	public.GetHitOnPlane = function() {
		raycaster.setFromCamera( mouse, Animate.camera );					
		var intersects = raycaster.intersectObject( Game.plane );
		return intersects[0];
	};
	

	function onMouseMove( event ) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
	}
	
	function onMouseDown( event ){
		for(var i = 0; i < objects.length; i++){
			objects[i].OnMouseDown();
		}		
	}
	
	window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'mousedown', onMouseDown, false );
	
	return public;

}());