Parse.initialize("FxbHUb1DBPXDuN8ufGC0ssETZWRhGgDKK9rvZ8xp", "sfrGvVB4IeFORZM6gSrkIfseGNGG7fIqRSwJqXB0");

Recipe = Parse.Object.extend('Recipe');
recipe = new Recipe()
// this is defining a class named recipe in parse by typing extend
// and we are making a constructer named Recipe and its capitalized cus its a constructor
// its a constructor so that we can do all the methods like save etc


// a query is an instance of the the constructor function Parse.Query(GameScore)

// once you get into that success call back, you get a model or an array of models

$(document).ready(function(){
	console.log('test');

	var query = new Parse.Query(Recipe);
	query.find ({
		success: function(results) {
			// save all my recipes in window.recipes
			window.recipes = results

			// render all recipes into the page
			renderRecipeList(results)

			console.log("successfully retrieved " + results.length + " recipes.");
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	})

});

var renderRecipeList = function(recipes) {
	console.log('Here are my recipes: ', recipes);

// loop through the array and put each object name into the page
	for (var i = 0; i < recipes.length; i++) {
		var id = recipes[i].id
		var name = '<h3>' + recipes[i].get('name') + ":" + '</h3>';
		var description = '<p>' + recipes[i].get('description') + '</p>';

		var li = $('<li id="' + id + '">' + name + description + '</li>').click(function(){
			var id = $(this).attr('id');
			// console.log(id);

			query = new Parse.Query(Recipe);
			query.get(id, {
				success: function(result) {
					// do something
					console.log(result.get('name'));

					var name = '<h3>' + result.get('name') + ":" + '</h3>';
					var description = '<p>' + result.get('description') + '</p>';

					renderSingleRecipe(result)
					$('.js-single-recipe h3').append(name + description);

					$('.js-edit').click(function(){
						var newName = $('.recipe-name').val();
						var newDescription = $('.recipe-description').val();
  						result.set("name", newName);
  						result.set("description", newDescription);
  						result.save();
  					})

  					$('.js-hide').click(function(){
  						location.reload();
						// $('.js-single-recipe').hide();
						// $('.js-recipes-container').show();
					})


  				}
  			})
		})
	


		$('.js-recipes-container ul').append(li);

	}
}

var renderSingleRecipe = function(recipe){
	$('.js-recipes-container').hide();
	$('.js-single-recipe').show();
}






