angular.module('app').factory('storage',function(){
	

	var storage = {
		data:{}
	}

	storage.fetch = function(){
		
		if(localStorage){
			var dataJson = localStorage.getItem('app')
			if(dataJson)
				this.data = JSON.parse(dataJson) ? JSON.parse(dataJson) : {}
			else
				this.data = {}
		}
	}

	storage.save = function(){
		if(localStorage)
			localStorage.setItem('app',JSON.stringify(this.data))
	} 

	storage.fetch()

	return storage

})