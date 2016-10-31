function Bullet(){

	THREE.Object3D.call(this);
	var speed = 0.3;
	
	var directionVector = new THREE.Vector3(1, 0, 0);
	var raycaster = new THREE.Raycaster(this.position, directionVector, 0, 1);
	
	this.Update = function(){
		this.position.copy(this.position);
		raycaster.set(this.position, directionVector);
		var collisionResults = raycaster.intersectObjects( Game.enemies, true );
		
		if(collisionResults.length > 0)
			collisionResults[0].object.visible = false;
		
		this.position.x += speed;
	};
	
	Updater.Add(this);

}

Bullet.prototype = Object.create(THREE.Object3D.prototype);
Bullet.prototype.constructor = Bullet;