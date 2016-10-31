var main = (function () {
	
	function Start(){
		Loader.scene = new THREE.Scene();
		Animate.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		Animate.camera.position.set(0, 0, 30);

		Animate.renderer = new THREE.WebGLRenderer({antialias:true});
		Animate.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( Animate.renderer.domElement );
		
		var controls = new THREE.OrbitControls( Animate.camera, Animate.renderer.domElement );
		
		var light = new THREE.DirectionalLight( 0xffffff, 1 );
		light.position.set( 30, 30, 3 );
		Loader.scene.add( light );
		
		var amblight = new THREE.AmbientLight( 0xFFFFFF, 0.5 ); 
		Loader.scene.add( amblight );
		
		Game.AddPlanets();
		Game.AddPlanets2();
		Game.AddPlane();	
		Game.AddAsteroids();
		Game.Start();
		Animate.Render();

	}
	
	Start();
	
}());

/*
	var t = THREE, scene, camera, renderer, controls

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var ship1;
	var ship2;			

	scene = Loader.scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({alpha: true, antialias:true});
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	camera.position.z = 50;


	var geom = new THREE.PlaneBufferGeometry(1000, 1000);
	var mat  = new THREE.MeshBasicMaterial ({ visible: false});
	var plane = new THREE.Mesh (geom, mat);

	scene.add (plane);


	function onMouseMove( event ) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;	
	}			

	document.addEventListener( 'mousemove', onMouseMove, false );

	var light = new THREE.DirectionalLight( 0xffffff, 3.5 );
	light.position.set( -22, -25, 10 );
	scene.add( light );

	//sky
	var loader = new THREE.TextureLoader();
	var texture = loader.load('planet.jpg');
	texture.anisotropy = 8;
	var geometry = new THREE.SphereBufferGeometry( 150, 64, 64 );
	var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
	var sky = new THREE.Mesh( geometry, material );
	scene.add( sky );
	sky.position.set(0, 0, 0);
	
	var skyUpdate = {
		Update: function(){
			sky.rotation.y += 0.002;
		}
	};	
	Updater.Add(skyUpdate);

	//ships
	loader = new THREE.JSONLoader();

	Loader.load( "warp_ship.js", function( ship1 ) {
		ship1.scale.set( 0.7, 0.7, 0.7 );
		ship1.position.y = 10;
		ship1.position.x = -22;
		ship1.position.z = 10;
		ship1.rotation.y += Math.PI / 2;	
		
	});
	
	/*				
		raycaster.setFromCamera( mouse, camera );					
		var intersects = raycaster.intersectObjects( [plane] );
		ship1.position.y = intersects[0].point.y;*/

	
	/*Loader.load("warp_ship3.js", function(ship){ 
		ship.scale.set( 0.7, 0.7, 0.7 );
		ship.position.y = 10;
		ship.position.x = 22;
		ship.position.z = 10;
		ship.rotation.y += Math.PI / 2;
	});

	/*loader.load( "warp_ship3.js", function( geometry, materials ) {
		ship2 = new THREE.Mesh( geometry, materials[0] );
		ship2.scale.set( 0.7, 0.7, 0.7 );
		ship2.position.y = 10;
		ship2.position.x = 22;
		ship2.position.z = 10;
		ship2.rotation.y += Math.PI / 2;
		scene.add(ship2);				
	});*/

	/*var object = new THREE.LineSegments( line, new THREE.LineDashedMaterial( { color: 0xffaa00, dashSize: 3, gapSize: 5, linewidth: 2 } ) );
	var geometry = new THREE.Geometry();
	geometry.vertices.push(
	new THREE.Vector3( -20, 0, 0 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 10, 0, 0 )
	);
	var line = new THREE.Line( geometry, material );
	scene.add( line );*/

	//clouds
	/*loader.load("spacerock.js", function (geometry, materials){
		
		for (var i = 0; i < 30; i++){
			var rock = new THREE.Mesh (geometry, materials[0] );
			rock.scale.set (0.1, 0.1, 0.1);				
			rock.position.x = ( Math.random () - 0.5 ) * 150;
			rock.position.y = ( Math.random () - 0.5 ) * 150;
			rock.position.z = ( Math.random () - 0.5 ) * 150;
			sky.add(rock);
			
		}
	});


	//planet
	var loader = new THREE.TextureLoader();
	var texture = loader.load('bla.jpg');
	texture.anisotropy = 8;
	var geometry = new THREE.SphereBufferGeometry( 35, 64, 64 );
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	var sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );
	sphere.position.set(0, -40, 30);
	

	/*var render = function () {

		requestAnimationFrame( render );
		
		
		sphere.rotation.y += 0.001;
		//container.rotation.y += 0.002;
		renderer.render(scene, camera);
		raycaster.setFromCamera( mouse, camera );
		//bullet.rotation.x += 0.05; 
		Updater.Update();
		
	};*/

		//render();