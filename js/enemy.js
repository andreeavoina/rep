function Enemy(){

	THREE.Object3D.call(this);
	
	this.Update = function(){
		enemy.position.copy(this.position);
		
	};
	
	Updater.Add({
			Update: function(){
				enemy.position.x -= 2;
			}
		});
		

Enemy.prototype = Object.create(THREE.Object3D.prototype);
Enemy.prototype.constructor = Enemy;