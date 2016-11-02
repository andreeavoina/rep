function Player(){

	THREE.Object3D.call(this);
	var raycaster = new THREE.Raycaster(this.position, new THREE.Vector3(1, 0, 0), 0, 1);
	
	this.score = 0;
	
	
	this.Update = function(){
		this.position.copy(Input.GetHitOnPlane().point);
	}
	
	this.OnMouseDown = function(){
		var geometry = new THREE.SphereBufferGeometry(0.5,20,20);
		var mat = new THREE.MeshPhongMaterial({ color: 0xF01111, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  });
		var mesh = new THREE.Mesh (geometry, mat);
		var bullet = new Bullet({
			targets: Game.enemies, 
			directionVector: new THREE.Vector3(1, 0, 0)
		});
		bullet.add(mesh);
		bullet.position.copy(this.position);
		Loader.scene.add( bullet );		
		
	};
	
	this.TakeDamage = function(){
		
	};
	
	this.Die = function(){	
	
	};
	
	Updater.Add(this);
	Input.Add(this);

}

Player.prototype = Object.create(THREE.Object3D.prototype);
Player.prototype.constructor = Player;