function Enemies(){

	THREE.Object3D.call(this);
	
	this.Update = function(){
		newShip.rotation.x -= dxPerFrame;
	
	}
	
	
	Updater.Add(this);
	Enemies.Add(this);

}

Enemies.prototype = Object.create(THREE.Object3D.prototype);
Enemies.prototype.constructor = Enemies;        