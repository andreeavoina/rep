var Loader = (function () {
	
	var loader = {};
	var jsonLoader = new THREE.JSONLoader();
	var textureLoader = new THREE.TextureLoader();
	
	this.scene = undefined;

	loader.load = function (url, callback) {
		
		jsonLoader.load( url, function( geometry, materials ) {
			
			var material = new THREE.MultiMaterial( materials );
			var mesh = new THREE.Mesh( geometry, material );			
			loader.scene.add(mesh);	
			callback(mesh);
			
		});
		
	};

	return loader;
	
}());