function Player(){

	THREE.Object3D.call(this);
	
	this.health = 10;
	
	
	this.Update = function(){
		this.position.copy(Input.GetHitOnPlane().point);
	}
	
	this.OnMouseDown = function(){
		var geometry = new THREE.SphereBufferGeometry(0.5,20,20);
		var mat = new THREE.MeshPhongMaterial({ color: 0xF01111, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  });
		var mesh = new THREE.Mesh (geometry, mat);
		var bullet = new Bullet();
		bullet.add(mesh);
		bullet.position.copy(this.position);
		Loader.scene.add( bullet );		
		
	};
	
	Updater.Add(this);
	Input.Add(this);

}

Player.prototype = Object.create(THREE.Object3D.prototype);
Player.prototype.constructor = Player;