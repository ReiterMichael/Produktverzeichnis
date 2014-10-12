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
		console.log("Failed to load categories");
	});


	//Nur Data laden von der Kategorie die angeklicked wurde
	this.findCategoryContent = function(searchItem){
		console.log("SubCategory: " + searchItem);
		$scope.subCategories = [];

		//Suchalgorythmus
		$http.get("products.json").success(function(data){
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
			console.log("Failed to load subCategories");
		});
	};


	this.findSubCategoryContent = function(searchItem){
		console.log("Product: " + searchItem);
		$scope.products = [];

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
									}//End for()
								}
							}
						}//End for()
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


	//Datenbank durchlaufen und daten übertragen
	this.findProductContent = function(searchItem){
		$scope.productInfo = {
		 "productName": "Product1",
		 "imageExisting": true,
		 "productImage": "http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg",
		 "littleImages": [
		    "http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg",
			"http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg",
		    "http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg"
		 ],
		 "videoExisting": false,
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
		 };
		console.log($scope.productInfo);

		console.log("ProductContent: " + searchItem);
		var imageExisting = false;
		var videoExisting = false;
		var descriptionExisting = false;
		var rankingExisting = false;
		var commentExisting = false;


		//Suchalgorythmus
		/*$http.get("products.json").success(function(data){
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
											imageExisting = true;
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
											videoExisting = true;
										}
										if (product.description != undefined) {
											var description = product.description;
											descriptionExisting = true;
										}
										if (product.dealer != undefined) {
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
												var dealer = new Object();
												dealer.dealerLinks = dealerLink;
												dealer.dealerLogos = dealerLogo;
												dealers.push(dealer);
											}
											rankingExisting = true;
										}
										if (product.comment != undefined) {
											var comments = [];
											for(l = 0; l < product.comment.length; l++)
											{
												var author = product.comment[l].author;
												var content = product.comment[l].content;

												var comment = new Object();
												comment.authors = author;
												comment.contents = content;
												comments.push(comment);
											}
											commentExisting = true;
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
			console.log($scope.productInfo);
		})
		.error(function(){
			console.log("Failed to load products");
		});*/

	}
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
