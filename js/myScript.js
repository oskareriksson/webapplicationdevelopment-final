/*$(document).ready(function() {

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

});*/

//Gamemode selection function, alters between quickplay and competitive
var gamemode = function() {
	$("#gamemode").click(function(){
		var $gamemode = $("#gamemode").text();

		if($gamemode === "Quickplay") {
			$("#gamemode").text("Competitive");
		} else if($gamemode === "Competitive") {
			$("#gamemode").text("Quickplay");
		}
	});
};

//Fetches a users profile through battletag, platform and region. Then displays data from your account
var fetchprofile = function() {
	$("#fetchprofile").click(function(){
		var $btag = $("#btag").val().replace("#", "-");
		var $platform = $('input[name="platform"]:checked').val();
		var $region = $('input[name="region"]:checked').val();

		$.ajax({
			type: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/profile",
			success: function(d){
				console.log(d.data.username);
				console.log(d.data.level);
				console.log(d.data.games.quick.wins);
				console.log(d.data.games.competitive.wins);
			}
		});
	});
};

//Fetches a users total statistics in either quickplay or competitive and displays that data
var fetchtotal = function() {
	$("#fetchtotal").click(function(){
		var $btag = $("#btag").val().replace("#", "-");
		var $platform = $('input[name="platform"]:checked').val();
		var $region = $('input[name="region"]:checked').val();
		var $gamemode = $("#gamemode").text().toLowerCase();

		$.ajax({
			type: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/" + $gamemode + "/allHeroes/",
			success: function(d){
				console.log(d.MeleeFinalBlows);
				console.log(d.SoloKills);
				console.log(d.ObjectiveKills);
				console.log(d.FinalBlows);
			}
		});
	});
};

//Fetches a users hero playtime in either quickplay or competitive and displays that data
var fetchplaytime = function() {
	$("#fetchplaytime").click(function(){
		var $btag = $("#btag").val().replace("#", "-");
		var $platform = $('input[name="platform"]:checked').val();
		var $region = $('input[name="region"]:checked').val();
		var $gamemode = $("#gamemode").text().toLowerCase();

		$.ajax({
			type: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/" + $gamemode + "/heroes/",
			success: function(d) {
				console.log(d);
				//Getting CORS issue with this call, will look into it
			}
		});
	});
};

$(document).ready(gamemode);
$(document).ready(fetchprofile);
$(document).ready(fetchtotal);
$(document).ready(fetchplaytime);