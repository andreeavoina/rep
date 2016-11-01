function Enemy(){

	THREE.Object3D.call(this);
	
	var speed = 0.1;	
	
	var directionVector = new THREE.Vector3(-1, 0, 0);
	
	this.Shoot = function(){		
		var geometry = new THREE.SphereBufferGeometry(0.5,20,20);
		var mat = new THREE.MeshPhongMaterial({ color: 0xFF0000, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  });
		var mesh = new THREE.Mesh (geometry, mat);
		var bulletData = { targets: Game.player, directionVector: new THREE.Vector3(-1, 0, 0) };
		var bullet = new Bullet(bulletData);
		bullet.add(mesh);
		bullet.position.copy(this.position);
		Loader.scene.add( bullet );	
	};
	
	this.Update = function(){
		this.position.x -= speed;
	};
	

	this.Die = function(){		
		Updater.Remove(this);
		Loader.scene.remove(this);
	};
	
	
	setInterval( function(){
		this.Shoot();		
	}.bind(this), 3000 );
	Updater.Add(this);	
		
}
		

Enemy.prototype = Object.create(THREE.Object3D.prototype);
Enemy.prototype.constructor = Enemy;