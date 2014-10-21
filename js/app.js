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
			controller:"MainController"
		})
		.when("/addProduct",{
			templateUrl:"addProduct.html",
			controller:"AddController"
		})
		.otherwise({
			redirectTo:"welcomePage"
		})
});

app.controller('MainController',['$scope', '$http', function($scope, $http){
	$scope.showSettings = false;

	//Productverzeichnis übertragen & Categorien schaffen

	$scope.productRegister = {};     //data

	$http.get("products.json").success(function(data){
		$scope.productRegister = data;

		$scope.categories = [];
		for(var i = 0; i < $scope.productRegister.length; i++)
		{
			var category = $scope.productRegister[i];

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
				var obj = {};

				obj.categoryName = categoryName;
				obj.categoryImage = categoryImage;

				//Push new Object to the category Array
				$scope.categories.push(obj);
			}
		}//End for()
	})
	.error(function(){
		console.log("Failed to load productRegister");
	});


	//Nur Data laden von der Kategorie die angeklicked wurde                         Wiso nicht $scope?
	this.findCategoryContent = function(searchItem) {
		//console.log("Category: " + searchItem);
		$scope.showSettings = false;
		findPath(searchItem);
		$scope.subCategories = [];

		//Suchalgorythmus
		for (var i = 0; i < $scope.productRegister.length; i++) {
			var category = $scope.productRegister[i];
			if (category != undefined) {
				if (category.name == searchItem) {
					$scope.categoryName = category.name;
					if (category.subCategory != undefined) {
						for (var j = 0; j < category.subCategory.length; j++) {
							var subCategory = category.subCategory[j];

							if (subCategory.name != undefined) {
								var subCategoryName = subCategory.name;
							}
							if (subCategory.imageUrl != undefined) {
								var subCategoryImage = subCategory.imageUrl;
							}

							//Make new object
							var obj = {};

							obj.subCategoryName = subCategoryName;
							obj.subCategoryImage = subCategoryImage;

							//Push new Object to the category Array
							$scope.subCategories.push(obj);
						}
					}
				}
			}
		}//End for()
		console.log("Subs:");
		console.log($scope.subCategories);

	};

	this.findSubCategoryContent = function(searchItem){
		//console.log("SubCategory: " + searchItem);
		$scope.showSettings = false;
		findPath(searchItem);
		$scope.products = [];


		//Suchalgorythmus
		for(var i = 0; i < $scope.productRegister.length; i++)
			{
				var category = $scope.productRegister[i];
				if(category != undefined)
				{
					if (category.subCategory != undefined)
					{
						for (var j = 0; j < category.subCategory.length; j++)
						{
							var subCategory = category.subCategory[j];
							if (subCategory.name == searchItem)
							{
								$scope.subCategoryName = subCategory.name;
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
										var obj = {};

										obj.productName = productName;
										obj.productImage = productImage;

										//Push new Object to the category Array
										$scope.products.push(obj);
									}//End for()
								}
							}
						}//End for()
					}
				}
			}//End for()
			//console.log($scope.products);

	};

	this.search = function(){

		$scope.showSettings = false;
		var maxSearchResults = 10;
		$scope.noProductFound = false;

		$scope.products = [];
		var searchItem = document.getElementsByClassName("searchField")[0].value;

		searchItem = searchItem.toLowerCase();
		searchItem = searchItem.replace(/ /g, "");


		for(var i = 0; i < $scope.productRegister.length; i++)
		{
			var category = $scope.productRegister[i];

			if(category != undefined)  // sicher nicht nötig
			{
				/*if(category.name != undefined)
					 {
					 if (category.name.toLowerCase().replace(/ /g, "") == searchItem)
					 {
					 //alle KetegorieDaten finden
					 }
					 }*/
				if ((category.subCategory != undefined))
				{
					for (var j = 0; j < category.subCategory.length; j++)
					{
						var subCategory = category.subCategory[j];
						/*if (subCategory.name != undefined)
							 {
							 if (subCategory.name.toLowerCase().replace(/ /g, "") == searchItem)
							 {

							 }
							 }*/
						if (subCategory.product != undefined)
						{
							for (var k = 0; k < subCategory.product.length; k++)
							{
								var product = subCategory.product[k];
								if (product.name != undefined)
								{
									var newProductName = product.name.toLowerCase().replace(/ /g, "");
									var newProductNamePosition = newProductName.search(searchItem);

									if ((newProductNamePosition >= 0)&&($scope.products.length < maxSearchResults))
									{
										var obj = {};
										obj.productName = product.name;
										obj.productImage = product.imageUrl;
										$scope.products.push(obj);


									}
								}
							}//End for()
						}
					}//End for()
				}
			}
		}//End for()

		if($scope.products.length > 1)
		{
			$scope.subCategoryName = "Die besten " + $scope.products.length + " Suchergebnisse";
		}
		else{
			if($scope.products.length == 1)
			{
				$scope.subCategoryName = "Das beste Suchergebnis";
			}
			else
			{
				$scope.subCategoryName = "Leider kein passendes Produkt gefunden";
				$scope.noProductFound = true;
				$scope.searchText = "Du kannst ein entsprechendes Produkt gerne Anlegen";
				//Add blinken lassen
			}
		}
	};

	this.findPath = function(searchItem){
		findPath(searchItem);
	};

	var findPath = function(searchItem){
		console.log("Path Item" + searchItem);
		$scope.path = {};
		$scope.path.depth = 0;

		for(var i = 0; i < $scope.productRegister.length; i++)
			{
				var category = $scope.productRegister[i];

				if(category != undefined)  // sicher nicht nötig
				{
					if(category.name != undefined)
					{
						$scope.path.categoryName = category.name;
						if (category.name == searchItem)
						{
							$scope.path.depth = 1;                  //Tiefe des Pfads
							return $scope.path.categoryName;
						}
					}
					if ((category.subCategory != undefined))
					{
						for (var j = 0; j < category.subCategory.length; j++)
						{
							var subCategory = category.subCategory[j];
							if (subCategory.name != undefined)
							{
								$scope.path.subCategoryName = subCategory.name;
								if (subCategory.name == searchItem)
								{
									$scope.path.depth = 2;
									return $scope.path.subCategoryName;
								}
							}
							if (subCategory.product != undefined)
							{
								for (var k = 0; k < subCategory.product.length; k++)
								{
									var product = subCategory.product[k];
									if (product.name != undefined)
									{
										$scope.path.productName = product.name;
										if (product.name == searchItem) {
											$scope.path.depth = 3;
											return $scope.path.productName;
										}
									}
								}//End for()
							}
						}//End for()
					}
				}
			}//End for()
		console.log("Depth:" + $scope.path.depth);

	};

	this.findProductContent = function(searchItem){
		console.log("PRODUCTS: ");
		console.log($scope.productRegister);
		console.log(searchItem);

		findPath(searchItem);
		$scope.productInfo = {};

		$scope.showSettings = true;

		for(var i = 0; i < $scope.productRegister.length; i++)
		{
			var category = $scope.productRegister[i];
			if(category != undefined)
			{
				if (category.subCategory != undefined)
				{
					for (var j = 0; j < category.subCategory.length; j++)
					{
						var subCategory = category.subCategory[j];
						if (subCategory.product != undefined)
						{
							for (var k = 0; k < subCategory.product.length; k++)
							{
								var product = subCategory.product[k];
								if (product.name == searchItem)
								{
									var productName = product.name;

									if (product.imageUrl != undefined) {
										var productImage = product.imageUrl;
										var imageExisting = true;
									}
									if (product.littleImages != undefined) {
										var littleImages = [];
										for(var l = 0; l < product.littleImages.length; l++)
										{
											var littleImage = product.littleImages[l];
											littleImages.push(littleImage);
										}
										imageExisting = true;
									}
									if (product.videoUrl != undefined) {
										var productVideo = product.videoUrl;
										var videoExisting = true;
									}
									if (product.description != undefined) {
										var description = product.description;
										var descriptionExisting = true;
									}
									if (product.dealer != undefined) {//-------------------------------------allas darstellen
										var dealers = [];
										for(l = 0; l < product.dealer.length; l++)
										{
											var dealerLink = product.dealer[l].dealerLink;
											var dealerLogo;
											switch (product.dealer[l].dealerName)
											{
												case "Conrad": dealerLogo = "http://www.conrad.at/ce/de/Welcome.html";
													break;
												case "Alibaba": dealerLogo = "http://www.alibaba.com";
													break;
												case "Amazoon": dealerLogo = "http://www.phpdiver.de/wp-content/uploads/2013/04/amazon.jpg";
													break;
												case "Reichelt": dealerLogo = "http://cdn-reichelt.de/bilder/elements/title/Reichelt-Logo_pdf.gif";
													break;
												default : dealerLogo = "";
													break;
											}
											var dealer = {};
											dealer.dealerLinks = dealerLink;
											dealer.dealerLogos = dealerLogo;
											dealers.push(dealer);
										}
										var rankingExisting = true;
									}
									if (product.comment != undefined) {
										var comments = [];
										for(l = 0; l < product.comment.length; l++)
										{
											var author = product.comment[l].author;
											var content = product.comment[l].content;

											var comment = {};
											comment.authors = author;
											comment.contents = content;
											comments.push(comment);
										}
										var commentExisting = true;
									}

									$scope.productInfo.productName = productName;
									$scope.productInfo.productImage = productImage;
									$scope.productInfo.littleImages = littleImages;
									$scope.productInfo.productVideo = productVideo;
									$scope.productInfo.description = description;
									$scope.productInfo.dealers = dealers;
									$scope.productInfo.comments = comments;
									$scope.productInfo.imageExisting = imageExisting;
									$scope.productInfo.videoExisting = videoExisting;
									$scope.productInfo.descriptionExisting = descriptionExisting;
									$scope.productInfo.rankingExisting = rankingExisting;
									$scope.productInfo.commentExisting = commentExisting;


								}
							}
						}
					}
				}
			}
		}//End for()


		console.log("PRODUCTS2: ");
		console.log($scope.productInfo);


	};




}]);

app.controller('ProductController',['$scope', '$http', function($scope, $http){


	/*$scope.productInfo = {
		"productName": "Product1",
		"imageExisting": true,
		"productImage": "http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg",
		"littleImages": [
			"http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg",
			"http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg",
			"http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg"
		],
		"videoExisting": true,
		"productVideo": "link",
		"descriptionExisting": true,
		"description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ",
		"rankingExisting": true,
		"dealer":[
			{
				"dealerLink":"http://www.conrad.at/ce/de/Welcome.html",
				"dealerLogo":"http://www.conrad.at/images/default/default/conrad.gif"
			},
			{
				"dealerLink":"http://www.alibaba.com",
				"dealerLogo":"http://www.momentumsignals.de/wp-content/uploads/breaking-IPO-record.jpg"
			}
		],
		"commentExisting": true,//false
		"comment":[
			{
				"author": "Gordon Shumway",
				"content": "Lorem Ipsum dolor"
			},
			{
				"author": "John Doe",
				"content": "Lorem Ipsum dolar sit ament, consetetur"
			}
		]
	};*/




}]);

app.controller('NavigationController',['$http', "$scope", function($http, $scope){
	$scope.categories = [];

	$http.get("products.json").success(function(data){
		for(var i = 0; i < data.length; i++)
		{
			var category = data[i];
			var subCategories = [];

			if(category == undefined){
				console.log("Categorie undefiniert");
			}
			if (category.name != undefined) {
				var categoryName = category.name;
			}
			if ((category.subCategory != undefined))
			{
				for (var j = 0; j < category.subCategory.length; j++)
				{
					var products = [];
					var subCategory = category.subCategory[j];

					if (subCategory.name != undefined) {
						var subCategoryName = subCategory.name;
					}
					if (subCategory.product != undefined)
					{
						for (var k = 0; k < subCategory.product.length; k++)
						{
							var product = subCategory.product[k];

							if (product.name != undefined) {
								var productName = product.name;
							}

							var productObj = new Object();
							productObj.name = productName;
							products.push(productObj);

						}//End for()
					}
					var subCategoryObj = new Object();

					subCategoryObj.name = subCategoryName;
					subCategoryObj.product = products;
					subCategories.push(subCategoryObj)

				}//End for()
			}
			var categoryObj = new Object();

			categoryObj.name = categoryName;
			categoryObj.subCategory = subCategories;
			$scope.categories.push(categoryObj)
		}//End for()
	})
	.error(function(){
		console.log("Failed to load products");
	});

}]);//Soll erst bei klick aufklappen

app.controller('FormController',function(){//Vielleicht kein Extra Kontroller von Nöten
	//Neues produkt und einzelne Daten in Datenbank einfügen

	//Bei neuem händler auswahl zw händlern dann richtiges Logo einfügen


});


//Support ist dealer nicht vorhanden wir fügen gern hinzu

//suchfunktion
