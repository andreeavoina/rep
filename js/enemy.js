function Enemy(){

	THREE.Object3D.call(this);
	
	var speed = 0.1;
	
	this.Update = function(){
		this.position.copy(this.position);
		
	};
	
	Updater.Add({
		Update: function(){
			this.position.x -= speed;
		}.bind(this)
	});
		
}
		

Enemy.prototype = Object.create(THREE.Object3D.prototype);
Enemy.prototype.constructor = Enemy;