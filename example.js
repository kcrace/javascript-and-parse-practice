Parse.initialize("FxbHUb1DBPXDuN8ufGC0ssETZWRhGgDKK9rvZ8xp", "sfrGvVB4IeFORZM6gSrkIfseGNGG7fIqRSwJqXB0");

$(document).ready(function(){
 
  $('.save-recipe').click(function(){
    var attributes = {};
    attributes.name = $('.recipe-name').val();
    attributes.description = $('.recipe-description').val();


 
    var Recipe = Parse.Object.extend('Recipe');
    var newRecipe = new Recipe();
    newRecipe.save(attributes, {
      success: function(recipe){
      	window.fetchedRecipe = recipe;
        console.log('saved your recipe! awesome!');
      }
    })
  });


    $('.update').click(function(){
  		fetchedRecipe.set("name","weird cake");
  		fetchedRecipe.save();
  	})


	$('.see-recipe').click(function(){
	  	var Recipe = Parse.Object.extend("Recipe");
		var query = new Parse.Query(Recipe);
		query.get("7yx1kD9vTK", {
	  		success: function(result) {
	  			var about = result.get("description");
				console.log (about);
	    // The object was retrieved successfully.
	 		 },
	  		error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and description.
	  		}
		});

});

	$('.find').click(function(){
		console.log('WTF')
	  	var Recipe = Parse.Object.extend("Recipe");
		var query = new Parse.Query(Recipe);
		query.equalTo("name", "cake");
		query.find({
	  		success: function(result) {
	  			var results = result[0].get("description");
				console.log('test');
	    // The object was retrieved successfully.
	 		 },
	  		error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and description.
	  		}
		});
	});


	$('.delete').click(function(){
  		fetchedRecipe.destroy({
		  success: function(dead) {
		  	alert("we killed what you last save haha!");
		  	console.log("we killed what you last save haha!");
		    // The object was deleted from the Parse Cloud.
		  },
		  error: function(dead, error) {
		    // The delete failed.
		    // error is a Parse.Error with an error code and description.
		  }
		});
	});
});

	// var TestObject = Parse.Object.extend("TestObject");
	// var testObject = new TestObject();
	// testObject.save({foo: "bar"}, {
 // 	success: function(object) {
 //    alert("yay! it bugging worked");

  //   var Animal = Parse.Object.extend("Animal");

  //   var sadie = new Animal();
  //   var quincy = new Animal();

  //   sadie.save({name:"sadie", colors: ['black','white'], age: 9},{
  //   	success: function(object) {
  //   		console.log("yay sadie daved");
  //   	}
  //   });
  //   quincy.save({name:"quincy", colors: ['red','tan'], age: 2},{
  //  		 success: function(object) {
  //   		console.log("yay quincy daved");
  //   	}
  //   });
  // });


	window.recipes= {}
	// making a blank object that can then be filled in as an array

// a callback function is a function that occurs when an action(function) has been done
// so this is saying run a callback function after the button is clicked

	$('.get-recipe').click(function(){

		var id = $('.recipe-id').val();

		var url = '/recipe/' + id + '.json';

		console.log(url);

		$.getJSON(url, function(data){
			console.log(data);
		// so this goes into json and packs it into a variable called data

			renderRecipe(data);

			var recipe = new Recipe(data);
			window.recipes[id] = recipe
			// this creates an array item for the empty object loaded at the beginnig
			// now if you do the following in console it will work
			
			// item = recipes['1']
			// item.attributes
			// 	-->object {namedfsdfs descrip sdfsdf}
			// item.attributes.name
			// 	--> angel food cake
			// item.attributes.description
			// 	--> a delicous cake
			// item.constructor
		})

	});



// so recipe is a variable of function, so you have to do the name recipe.name to get name
// recipe is just a word, it could be anything just have to match each other
// recipe is the data jusst called the data
var renderRecipe = function(recipe){
	$('h1').text(recipe.name);
	$('.description').text(recipe.description)
}

// a constructor function
// you have to be inside of an object for there to be a this, otherwise this is window
// var test = function () { this.masonrules = 'hello'} ----> so this is referring to 
// window and messes up javascript!!! dont do this, put it in an object!


// if you capitalize something it means you are making a constructor


// writing a constructor for recipes and give it basic info about a recipe

var Recipe = function (attr) {
	this.attributes = attr;

	this.convert = function(){
		console.log('32oz');
	}

	this.save = function (){
		concole.log('saved successfullly');
	}
}

// so when your in the console you can do this:
// cake = new Recipe()
// it will redefine stuff

// so you could do hamburger = new Recipe ({name:'burger', calories: 1000})
// hamburger.attributes.calories
// 1000

// hamburger.attributes.name = "fancy"
// hamburger.attributes.name
// "fancy"
// HAVE TO USE NEW!!!!


// when you use var, you are keeping the scope internal to where you are, 
// if you dont use var it throws it into window and is global
