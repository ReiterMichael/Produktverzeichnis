var app = angular.module('DerBewerter',[]);

/*app.config(function($routeProvider){
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
});*/

app.service('DataService',function(){

});

app.controller('NavigationController',function(){
	this.categories = category;
	this.subCategories = subCategory;
	this.products = product;
	this.hash = hash;
	this.subCategoryExisting = subCategoryExisting;

});

app.controller('MainController',function(){
	console.log("Main CTRL");
	this.categoryNames = ["R", "C", "L"];
	this.categoryImages = ["Widerstand.img" ,"Kondensator.img" ,"Induktivität.img"];

	this.subCategoryNames = ["", "", ""];
	this.subCategoryImages = ["", "", ""];

	this.productNames = ["KeramikC", "FolienC", "BipolarC"];
	this.productImages = ["KeramikC.png", "FolienC.png", "BipolarC.png"];

});

app.controller('ProductController',function(){
	var imageExisting = true;
	var descriptionExisting = true;
	var rankingExisting = true;
	this.name = "trimpoti";
	this.image = "trimpoti.png";
	this.description = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr";
	this.dealerLogos = ["conrad.png","aliExpress.img"];

	//Datenbank durchlaufen und daten übertragen

});

app.controller('FormController',function(){
	//Neues produkt und einzelne Daten in Datenbank einfügen
});

var category = ["A","B","C"];
var subCategory = ["AA","AB","AC"];
var product = ["AAA", "AAB"];
var hash = "#category";
var subCategoryExisting = true;

/*var category = [
{
	"name":"R",
	"imageURL":"Widerstand.png",
	"subcategoryExisting":"true",
	"subcategory": [
		{
			"name":"Poti",
			"image.URL":"Potis.png",
			"product": [
			{
				"name":"trimmpoti",
				"productId":"0001",
				"imageURL":"trimmpoti.png",
			}


			]
		},
		{
			"name":"MetallschichtR"
		},
		{
			"name":"KohleschichtR"
		}
	]
},
	{
		"name":"C",
		"subcategory": [
			{
				"name":"Folien"
			},
			{
				"name":"Keramik"
			},
			{
				"name":"Bipolar"
			}
		]
	},{
		"name":"L",
		"subcategory": [
			{
				"name":"Luftspule"
			},
			{
				"name":"Ringkern"
			},
			{
				"name":"Sonstiges"
			}
		]
	},
];


/*$.getJSON("document.json", function(data) {
	console.log(data);
	// data is a JavaScript object now. Handle it as such

});*/