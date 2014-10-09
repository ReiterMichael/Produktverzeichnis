var app = angular.module('DerBewerter',['ngRoute', 'ngSanitize']);

app.config(function($routeProvider){
	$routeProvider
		 .when("/welcomePage",{
		    templateUrl:"welcomePage.html",
		    controller:"MainController"
		 })
		 .when("/category",{
			templateUrl:"category.html",
			controller:"MainController"
		})
		 .when("/subCategory",{
		    templateUrl:"subCategory.html",
		    controller:"MainController"
		 })
		 .when("/product",{
			templateUrl:"product.html",
			controller:"ProductController"
		})
		.otherwise({
			redirectTo:"welcomePage"
		})
});


app.controller('MainController',['$scope', '$http', function($scope, $http){

	var that = this;
	$scope.categories = [];

	$http.get("products.json").success(function(data){
		for(var i = 0; i < data.length; i++)
		{
			var category = data[i];

			if(category != undefined)
			{
				if (category.name != undefined)
				{
					var categoryName = category.name;
				}
				if (category.imageUrl != undefined)
				{
					var categoryImage = category.imageUrl;
				}
				//Make new object
				var obj = new Object();

				obj.categoryName = categoryName;
				obj.categoryImage = categoryImage;

				//Push new Object to the category Array
				$scope.categories.push(obj);
			}
		}//End for()
		//console.log($scope.categories);
	})
	.error(function(){
		console.log("Failed to load Categories");
	});


	$scope.subCategories = [
		{
			"subCategoryName":"Widerstände",
			"subCategoryImage":"Image"
		}
	];

	//Nur Data laden von der Kategorie die angeklicked wurde
	this.findCategoryContent = function(searchItem){
		console.log("SearchItem: " + searchItem);
		//Suchalgorythmus
		$http.get("products.json").success(function(data){
			console.log(data);
			for(var i = 0; i < data.length; i++)
			{
				var category = data[i];
				if(category != undefined)
				{
					if (category.name == searchItem)
					{
						if (category.subCategory != undefined)
						{
							for (var j = 0; j < category.subCategory.length; j++) {
								var subCategory = category.subCategory[j];

								if (subCategory.name != undefined)
								{
									var subCategoryName = subCategory.name;
								}
								if (subCategory.imageUrl != undefined)
								{
									var subCategoryImage = subCategory.imageUrl;
								}

								//Make new object
								var obj = new Object();

								obj.subCategoryName = subCategoryName;
								obj.subCategoryImage = subCategoryImage;

								//Push new Object to the category Array
								$scope.subCategories.push(obj);
							}
						}
					}
				}
			}//End for()
			console.log($scope.subCategories);
		})
		.error(function(){
			console.log("Failed to load SubCategories");
		});
	};

	$scope.products = [
		{
			"productName": "KeramikC",
			"productImage": "http://www.itwissen.info/bilder/keramikkondensator-foto-epcos.png"
		}
	];

	this.findSubCategoryContent = function(searchItem){
		console.log("SearchItem: " + searchItem);
		//Suchalgorythmus
		$http.get("products.json").success(function(data){
			//console.log(data);
			for(var i = 0; i < data.length; i++)
			{
				var category = data[i];
				if(category != undefined)
				{
					if (category.subCategory != undefined)
					{
						for (var j = 0; j < category.subCategory.length; j++)
						{
							var subCategory = category.subCategory[j];
							if (subCategory.name == searchItem)
							{
								if (subCategory.product != undefined)
								{
									for (var k = 0; k < subCategory.product.length; k++)
									{
										var product = subCategory.product[k];

										if (product.name != undefined) {
											var productName = product.name;
										}
										if (product.imageUrl != undefined) {
											var productImage = product.imageUrl;
										}

										//Make new object
										var obj = new Object();

										obj.productName = productName;
										obj.productImage = productImage;

										//Push new Object to the category Array
										$scope.products.push(obj);
									}
								}
							}
						}
					}
				}
			}//End for()
			console.log($scope.products);
		})
			.error(function(){
				console.log("Failed to load products");
			});
	};



}]);

app.controller('ProductController',['$scope', '$http', function($scope, $http){
	var imageExisting = true;
	var descriptionExisting = true;
	var rankingExisting = true;

	this.imageExisting = imageExisting;
	this.descriptionExisting = descriptionExisting;
	this.rankingExisting = rankingExisting;
	//this.name = "Stellpoti";
	//this.image = "http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg";
	this.littleImages = ["http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg","http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg","http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg"];
	this.description = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ";
	this.dealerLogos = ["http://www.conrad.at/images/default/default/conrad.gif","http://www.momentumsignals.de/wp-content/uploads/breaking-IPO-record.jpg"];
	this.dealerLinks = ["http://www.conrad.at/ce/de/", "http://www.alibaba.com/"];
	$scope.product = [
		{
			"productName": "Stellpoti",
			"productImage": "http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg"
		}
	];



	//Datenbank durchlaufen und daten übertragen
	/*this.findProductContent = function(searchItem){
		console.log("Hey yaa + " + searchItem);
		//Suchalgorythmus
		$http.get("products.json").success(function(data){
			//console.log(data);
			for(var i = 0; i < data.length; i++)
			{
				var category = data[i];
				if(category != undefined)
				{
					if (category.subCategory != undefined)
					{
						for (var j = 0; j < category.subCategory.length; j++)
						{
							var subCategory = category.subCategory[j];
							if (subCategory.name == searchItem)
							{
								if (subCategory.product != undefined)
								{
									for (var k = 0; k < subCategory.product.length; k++)
									{
										var product = subCategory.product[k];

										if (product.name != undefined) {
											var productName = product.name;
										}
										if (product.imageUrl != undefined) {
											var productImage = product.imageUrl;
										}
										if (product.name != undefined) {
											var productName = product.name;
										}
										if (product.imageUrl != undefined) {
											var productImage = product.imageUrl;
										}


										//Make new object
										var obj = new Object();

										obj.productName = productName;
										obj.productImage = productImage;

										//Push new Object to the category Array
										$scope.products.push(obj);
									}
								}
							}
						}
					}
				}
			}//End for()
			console.log($scope.products);
		})
			.error(function(){
				console.log("Failed to load products");
			});

	}*/

}]);

app.controller('NavigationController',['$http', function($http){

	//Vielleicht array Machen und mit dotNot in Html darauf zugraufen (nur durch erstes Loopen und dann . )
	this.categories = [
		{
		categoryNames:"A",
		subCategoryNames:"B",
		productNames:"C"
		}

	];

	var categoryNames = [];
	var subCategoryNames = [];
	var productNames = [];

	$http.get("products.json").success(function(data){
		//console.log(data);
		for(var i = 0; i < data.length; i++)
		{
			var category = data[i];

			if(category.name != undefined)
			{
				var categoryName = category.name;
			}

			if(category.subCategory != undefined)
			{
				for(var j = 0; j < category.subCategory.length; j++)
				{
					var subCategory = category.subCategory[j];

					if(subCategory.name != undefined)
					{
						var subCategoryName = subCategory.name;
					}
					if(subCategory.product != undefined)
					{
						for(var k = 0; k < subCategory.product.length; k++)
						{
							var product = subCategory.product[k];

							if(product.name != undefined)
							{
								var productName = product.name;
							}
							productNames.push(productName);
						}
					}
					subCategoryNames.push(subCategoryName);
				}
			}

			//In jedem Schleifendurchgang einzelne Variablen zum verwertbaren Array hinzufügen
			categoryNames.push(categoryName);

		}//End for()

		/*console.log(categoryNames);
		console.log(subCategoryNames);
		console.log(productNames);*/

	});

	/*this.categories = categoryNames;
	this.subcategories = subCategoryNames;
	this.productNames = productNames;*/


}]);//Genauso wie Main erst bei klick aufklappen

app.controller('FormController',function(){
	//Neues produkt und einzelne Daten in Datenbank einfügen

	//Bei neuem händler auswahl zw händlern
});
