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


app.controller('MainController',['$http', function($http){

	//Nur daten laden von der Kategorie die angeklicked wurde
	this.findCategory = function(element){
		var searchItem = element;//element....categoryName
		console.log(searchItem);
		//Bei einem Klick auf die categories in der welcomePage soll hier der Name der Kategorie herausgefunden und in searchItem
		//gespeichert werde um dann im Verzeichnis danach zu suchen werden.
	};




	this.categoryNames = ["R", "C", "L"];
	this.categoryImages = ["http://images.tutorvista.com/cms/images/95/electrical-resistance.png" ,"http://www.elektropla.net/grundlagen/kondensator/kondensator.jpg" ,"http://www.hobby-bastelecke.de/bilder/bauteile/spule.png"];
	this.subCategoryNames = ["RR", "CC", "LL"];
	this.subCategoryImages = ["", "", ""];

	this.productNames = ["KeramikC", "FolienC", "BipolarC"];
	this.productImages = ["http://www.itwissen.info/bilder/keramikkondensator-foto-epcos.png", "http://www.hellsound.de/contents/media/mkp_q4.jpg", "http://www.conrad.at/medias/global/ce/4000_4999/4400/4450/4453/445335_LB_00_FB.EPS_1000.jpg"];

}]);

app.controller('NavigationController',['$http', function($http){

	var categoryNames = [];
	var subCategoryNames = [];
	var productNames = [];

	$http.get("products.json").success(function(data){
		console.log(data);
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

		console.log(categoryNames);
		console.log(subCategoryNames);
		console.log(productNames);

	});


	this.categories = categoryNames;
	this.subcategories = subCategoryNames;
	this.productNames = productNames;
	//this.productId = productId;
	//this.hash = hash;


}]);

app.controller('ProductController',function(){
	var imageExisting = true;
	var descriptionExisting = true;
	var rankingExisting = true;

	this.imageExisting = imageExisting;
	this.descriptionExisting = descriptionExisting;
	this.rankingExisting = rankingExisting;
	this.name = "Stellpoti";
	this.image = "http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg";
	this.littleImages = ["http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg","http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg","http://upload.wikimedia.org/wikipedia/commons/b/b5/Potentiometer.jpg"];
	this.description = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ";
	this.dealerLogos = ["http://www.conrad.at/images/default/default/conrad.gif","http://www.momentumsignals.de/wp-content/uploads/breaking-IPO-record.jpg"];
	this.dealerLinks = ["http://www.conrad.at/ce/de/", "http://www.alibaba.com/"];
	//ng-repeat mit filtern
	//DealerBewertung aussuchen ob nach preis oder bewertung gereiht wird

	//Datenbank durchlaufen und daten übertragen

});

app.controller('FormController',function(){
	//Neues produkt und einzelne Daten in Datenbank einfügen

	//Bei neuem händler auswahl zw händlern
});
