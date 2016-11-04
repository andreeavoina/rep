var Game = (function () {

	var public = {};
	public.plane = undefined;
	public.sky = undefined;
	public.sphere = undefined;
	public.newShip = undefined;
	public.player2 = undefined;
	public.enemies = [];
	public.player = undefined;
	public.interval =  undefined;
	public.score = 0;
	public.spawnRate = 2000;
	public.healthPoint = '<td><div id="healthBar" style= "height: 15px; width: 15px; border-radius: 100%; background-color: #ffcc00; position: relative;"></div></td>';
	public.particleCount = 2000;
	public.particles = new THREE.Geometry();	
	
	
	public.Start = function(){		
		Animate.Render();
		public.AddPlayer();
		StartInt();
	};
	
	public.Stop = function(){
		Updater.Stop();
		Input.Stop();
		Animate.Stop();
		clearTimeout(public.interval);
		
		for	(var i = 0; i < public.enemies.length; i++)
			public.enemies[i].Die();
	};
	
	public.RemoveEnemy = function(obj){
		var index = public.enemies.indexOf(obj);
		if(index !== -1)
			public.enemies.splice(index, 1);
	};
	
	public.RemovePlayer = function(obj){
		var index = public.player.indexOf(obj);
		if(index !== -1)
			public.player.splice(index, 1);
	};
	
	
	public.ParticleSystem = function() {
		
		var loader = new THREE.TextureLoader();
		var texture = loader.load('particle_1.png');
		var material  = new THREE.ParticleBasicMaterial({map: texture, size: 5, transparent: true, blending: THREE.AdditiveBlending });
		var size = 200;
		
		for(var i = 0; i < public.particleCount; i++){
			var posX = ( Math.random() - 0.5 ) * size;
			var posY = ( Math.random() - 0.5 ) * size;
			var posZ = ( Math.random() - 0.5 ) * size;
			var particle =  new THREE.Vector3 (posX, posY, posZ);
			
			public.particles.vertices.push(particle);
		} 
		public.particleSystem = new THREE.ParticleSystem(public.particles, material);
		Loader.scene.add( public.particleSystem );	
		
		Updater.Add ({
			Update: function(){
				
				for(var i = 0; i < public.particleSystem.geometry.vertices.length; i++){
					var vert = public.particleSystem.geometry.vertices[i];
					vert.x -= 0.1;
					if(vert.x < -100)
						vert.x = 100;
				}
				
				public.particleSystem.geometry.verticesNeedUpdate = true;
			}			
		});
	};
	
	public.Explosion = function(position) {		
		var loader = new THREE.TextureLoader();
		var texture = loader.load('fire_particle.png');
		var material  = new THREE.ParticleBasicMaterial({map: texture, size: 35, transparent: true, blending: THREE.AdditiveBlending });
		var explosion = new THREE.Geometry();
		
		for(var i = 0; i < 4; i++){
			var boom =  new THREE.Vector3 (position.x, position.y, position.z);			
			explosion.vertices.push(boom);			
		} 
		explosion.verticesNeedUpdate = true;
		var particleExplosion = new THREE.ParticleSystem(explosion, material);
		Loader.scene.add( particleExplosion );	
		var directions = [new THREE.Vector3(-1, 0, 0),
						  new THREE.Vector3 (1, 0, 0),
						  new THREE.Vector3(0, -1, 0), 
						  new THREE.Vector3(0, 1, 0)];
		
		Updater.Add ({
			lifetime: 0,
			Update: function(){		
				this.lifetime++;
				if(this.lifetime > 10){
					Updater.Remove(this);
					Loader.scene.remove( particleExplosion );
				}
					
				for(var i = 0; i < particleExplosion.geometry.vertices.length; i++){
					var vert = particleExplosion.geometry.vertices[i];
					vert.add(directions[i]);
				}
				
				particleExplosion.geometry.verticesNeedUpdate = true;
			}		
		});
	};
	
	public.AddPlayer = function() {
		Loader.load( "warp_ship.js", function( ship1 ) {
			
			ship1.scale.set( 0.7, 0.7, 0.7 );
			ship1.rotation.y += Math.PI / 2;	

			public.player = new Player();
			public.player.add(ship1);
			Loader.scene.add(public.player);
		
			
			for(var i = 0; i < public.player.health; i++)
				$('#healthBar').append(public.healthPoint);
			
		});
	
	};
	
	public.AddPlayer2 = function() {
		Loader.load( "warp_ship3.js", function( ship2 ) {			
			var enemy = new Enemy();
			enemy.add(ship2);
			Loader.scene.add(enemy);
			enemy.position.set( 45, random(-21, 21), 0);
			enemy.rotation.y -= Math.PI / 2;
			enemy.scale.set( 0.5, 0.5, 0.5 );
			public.enemies.push(enemy);
		});
		
	};
	
	function StartInt() {
		public.interval = setInterval( public.AddPlayer2, public.spawnRate );
	}
	
	
	public.AddPlanets = function() {
		var loader = new THREE.TextureLoader();
		var texture = loader.load('planet.jpg');
		texture.anisotropy = 8;
		var geometry = new THREE.SphereBufferGeometry( 150, 64, 64 );
		var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
		public.sky = new THREE.Mesh( geometry, material );		
		Loader.scene.add( public.sky );
		
		Updater.Add({
			Update: function(){
				public.sky.rotation.y += 0.002;
			}
		});
		
		
	};
	
	public.AddPlanets2 = function(){
		var loader = new THREE.TextureLoader();
		var texture = loader.load('bla.jpg');
		texture.anisotropy = 8;
		var geometry = new THREE.SphereBufferGeometry( 35, 64, 64 );
		var material = new THREE.MeshBasicMaterial( {map: texture} );
		public.sphere = new THREE.Mesh( geometry, material );
		Loader.scene.add( public.sphere );
		public.sphere.position.set(0, -40, 30);
		
		
		Updater.Add ({
			Update: function(){
				public.sphere.rotation.y -= 0.002;
			}
		});
	};
	
	public.AddPlane = function() {
		var geom = new THREE.PlaneBufferGeometry(1000, 1000);
		var mat  = new THREE.MeshBasicMaterial ({ visible: false });
		public.plane = new THREE.Mesh (geom, mat);
		Loader.scene.add(public.plane);
	};
	
	public.AddAsteroids = function(){
		Loader.load("spacerock.js", function(rock){
			rock.visible = false;
		
			for (var i = 0; i < 30; i++){
				var newRock = rock.clone();
				newRock.scale.set (0.1, 0.1, 0.1);				
				newRock.position.x = ( Math.random () - 0.5 ) * 150;
				newRock.position.y = ( Math.random () - 0.5 ) * 150;
				newRock.position.z = ( Math.random () - 0.5 ) * 150;
				newRock.visible = true;
				public.sky.add(newRock);			
			}
		});
	}
	
	function random(min, max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	
	return public;

}());