var pokeApp = angular.module('pokedex', ['ngResource']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('Ctrl1', function($scope,$log,$http,$resource,fac1,fac2) {
   /* $scope.names =  [
        {id:'1',name:'Pikatchu'},
        {id:'2',name:'Bulbizarre'},
		{id:'3',name:'Chenipan'},
		{id:'4',name:'Dardargnan'},
		{id:'5',name:'Aspicot'}
    ];*/
	$scope.$log = $log;

	$scope.myFunction = function(name2) {
        $log.log('tu as choisi : '+name2);
		fac2.setName(name2);
    };
	$scope.myfunction2 = function(test) {
        fac2.setId(test);
		$log.log(test);
    };

    $http.get("http://pokeapi.co/api/v1/pokedex/1").then(function(response) {
      //$log.log(response);
		$scope.names = response.data.pokemon;
	 });
	/*
	 var pok = $resource("http://pokeapi.co/api/v1/type/:id/");
	 pok.get({id:2}, function(response) {
	 $log.log(response.name);
	 });
*/

});
pokeApp.factory('fac1',function($resource){

	return $resource("http://pokeapi.co/api/v1/pokemon/:id/");
});

pokeApp.controller('Ctrl2',function($scope,$log,$resource,fac1,fac2){
	/*fac1.get({id:2}, function(response) {
	 $log.log(response);
	 $log.log(response.name);
	 $log.log(response.national_id);
	 $log.log(response.moves);
	 $scope.name = response.name;
	 $scope.id = response.national_id;
	 $scope.moves = response.moves;

	 });
	*/
	$scope.$watch(function(){
		return fac2.getId();
	}, function()
	{
		fac1.get({id:fac2.getId()}, function(response)
		{

	 $scope.name = response.name;
	 $scope.id = response.national_id;
	 $scope.moves = response.moves;
		});
	});

	$scope.$watch(function(){
		return fac2.getName();
	}, function()
	{
		fac1.get({id:fac2.getName()}, function(response)
		{

	 $scope.name = response.name;
	 $scope.id = response.national_id;
	 $scope.moves = response.moves;
		});
	});
});
pokeApp.factory('fac2',function(){
	var pokId;
	var pokName;
	var pokemon2 = {
		getId : function(){
			return pokId;
		},
		setId : function(pkid2){
			pokId = pkid2;
		},
		getName : function(){
			return pokName;
		},
		setName : function(pkname2){
			pokName = pkname2;
		}

	};
	return pokemon2;
});

var pokeApiUrl = "http://pokeapi.co/"


