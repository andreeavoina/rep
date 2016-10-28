var Updater = (function () {

	var updater = {};
	
	var objects = [];
	
	updater.Add = function(obj){
		objects.push(obj);
	}
	
	updater.Update = function(){
		
		for(var i = 0; i < objects.length; i++){
			objects[i].Update();
		}
		
	};
	
	return updater;

}());