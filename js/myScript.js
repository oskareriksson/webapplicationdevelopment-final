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
		var $mainrow = $("#mainrow");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/profile",
			dataType: "json",
			success: function(d){
				$mainrow.empty();
				var $profileImg = d.data.avatar;
				var $username = d.data.username;
				var $level = d.data.level;
				var $quickPlaytime = d.data.playtime.quick;
				var $compPlaytime = d.data.playtime.competitive;
				var $quickWins = d.data.games.quick.wins;
				var $compWins = d.data.games.competitive.wins;
				var $compLoss = d.data.games.competitive.lost;
				var $compPlayed = d.data.games.competitive.played;
				var $compRank = d.data.competitive.rank;
				var $compRankImg = d.data.competitive.rank_img;

				if($compWins === undefined || null){
					var $compWins = "-";
				}
				if($compLoss === null || undefined){
					var $compLoss = "-";
				}
				if($compRank === null || undefined){
					var $compRank = "-";
				}

				$("<img>").attr("src", $profileImg).appendTo($mainrow);
				$("<h2>" + $username + "</h2>").addClass("center").appendTo($mainrow);
				$("<h3>Level: " + $level + "</h3>").addClass("center").appendTo($mainrow);
				$("<h3>Playtime</h3>").addClass("center").appendTo($mainrow);
				$("<h4>Quickplay: " + $quickPlaytime + "</h4>").addClass("col-xs-6 center").appendTo($mainrow);
				$("<h4>Competitive: " + $compPlaytime + "</h4>").addClass("col-xs-6 center").appendTo($mainrow);
				$("<h3>Wins/Losses</h3>").addClass("center").appendTo($mainrow);
				$("<h3>Quickplay</h3>").addClass("center").appendTo($mainrow);
				$("<h4>" + $quickWins + " Won</h4>").addClass("center").appendTo($mainrow);
				$("<h3>Competitive</h3>").addClass("center").appendTo($mainrow);
				$("<h4>" + $compWins + " Won</h4>").addClass("center").appendTo($mainrow);
				$("<h4>" + $compLoss + " Lost</h4>").addClass("center").appendTo($mainrow);
				$("<h4>" + $compPlayed + " Played</h4>").addClass("center").appendTo($mainrow);
				$("<img>").attr("src", $compRankImg).appendTo($mainrow);
				$("<h3>" + $compRank + " Rating</h3>").addClass("center").appendTo($mainrow);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus, errorThrown);
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
		var $mainrow = $("#mainrow");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/" + $gamemode + "/allHeroes/",
			dataType: "json",
			success: function(d){
				$mainrow.empty();
				console.log(d.MeleeFinalBlows);
				console.log(d.SoloKills);
				console.log(d.ObjectiveKills);
				console.log(d.FinalBlows);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus, errorThrown);
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
		var $mainrow = $("#mainrow");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/" + $gamemode + "/heroes",
			dataType: "json",
			success: function(d) {
				$mainrow.empty();
				console.log(d[0].name);
				console.log(d[1].name);
				console.log(d[2].name);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus, errorThrown);
			}
		});
	});
};

$(document).ready(gamemode);
$(document).ready(fetchprofile);
$(document).ready(fetchtotal);
$(document).ready(fetchplaytime);