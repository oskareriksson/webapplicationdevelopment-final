$(document).ready(function() {
	$("button").click(function() {
		var $userInput = $("input").val();

		$.ajax({
			type: "GET",
			url: "https://api.spotify.com/v1/search?q=" + $userInput + "&type=artist",
			success: function(data) {
				console.log(data.artists.items[0].name);
				$("ul").append("<li>" + data.artists.items[0].name + "</li>");
			}
		});
	});

});