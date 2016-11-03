function Bullet(settings){

	THREE.Object3D.call(this);
	var speed = 0.3;
	var targets = settings.targets;	
	
	if(targets.constructor !== Array)
		targets = [targets];	
	 
	var directionVector = settings.directionVector;
	
	var raycaster = new THREE.Raycaster(this.position, directionVector, 0, 1);
	
	this.Update = function(){
		this.position.copy(this.position);
		raycaster.set(this.position, directionVector);
		var collisionResults = raycaster.intersectObjects( targets, true );
		
		if(collisionResults.length > 0){
			collisionResults[0].object.parent.TakeDamage();		
			Updater.Remove(this);
			Loader.scene.remove(this);
		}

		//var moveVector(directionVector.multiplyScalar(speed))
		this.position.add(directionVector)
		
		
		//this.position.x += speed;
	};
	
	Updater.Add(this);

}

Bullet.prototype = Object.create(THREE.Object3D.prototype);
Bullet.prototype.constructor = Bullet;