$(document).ready(function() {

	//GET request for Spotify-artist using "search for an item" method
	$("#b1").click(function() {
		var $artistInput = $("#i1").val();

		$.ajax({
			type: "GET",
			url: "https://api.spotify.com/v1/search?q=" + $artistInput + "&type=artist&limit=5",
			success: function(data) {
				console.log(data.artists.items[0].name);
				$("ul").append("<li>" + data.artists.items[0].name + "</li>");
				$("body").append("<img src=" + data.artists.items[0].images[2].url + ">");
				$("#i1").val("");
			}
		});
	});

	//GET request for Spotify-track using "search for an item" method
	$("#b2").click(function() {
		var $trackInput = $("#i2").val();

		$.ajax({
			type: "GET",
			url: "https://api.spotify.com/v1/search?q=" + $trackInput + "&type=track&limit=5",
			success: function(data) {
				console.log(data.tracks.items[0].name);
				$("ul").append("<li>" + data.tracks.items[0].name + "</li>");
				
				$("#i2").val("");
			}
		});
	});

});