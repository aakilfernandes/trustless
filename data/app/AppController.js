app.controller('AppController',function($scope,storage,$interval,blockchain){
	$scope.page = storage.get('page')? storage.get('page') : 'settings'
	$scope.path = self.port ? window.location.href.replace('index.html','') : '/'

	var settings = storage.get('settings')

	$scope.currency = settings && settings.currency ? settings.currency : 'BTC'


	$scope.$on('storage.save',function(event,data){
		$scope.currency = data.settings.currency ? data.settings.currency : 'BTC'
	})

	$scope.$watch('page',function(page,pageBefore){
		if(!page || !pageBefore || page == pageBefore) return
		storage.save('page',page)
	})

	$scope.$on('receipt',function($event,receipt){
		$scope.page = 'order'
	})

	$scope.$on('manifest',function($event,receipt){
		$scope.page = 'vendor'
	})

	function updateHeight(){
		blockchain.getHeightPromise().then(function(height){
			$scope.height = parseInt(height)
		})
	}

	updateHeight()

	$interval(updateHeight,10*60*1000)
})