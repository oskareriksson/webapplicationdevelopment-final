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
		$("#mainrow").empty();
		$("#loading").addClass("loader");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/profile",
			dataType: "json",
			success: function(d){

				var $userProfile = 
				"<div class='col-xs-12 card center'>" +
					"<img src='" + d.data.avatar + "' class='userpics'/>" +
					"<h2>" + d.data.username + "</h2>" +
					"<h3>Playtime</h3>" +
					"<div class='col-xs-6'>" +
						"<h3>Quickplay</h3>" +
						"<h4>" + d.data.playtime.quick + "</h4>" +
					"</div>" +
					"<div class='col-xs-6'>" +
						"<h3>Competitive</h3>" +
						"<h4>" + d.data.playtime.competitive + "</h4>" +
					"</div>" +
					"<h3>Wins/Losses</h3>" +
					"<div class='col-xs-6'>" +
						"<h3>Quickplay</h3>" +
						"<h4>" + d.data.games.quick.wins + " Won</h4>" +
					"</div>" +
					"<div class='col-xs-6'>" +
						"<h3>Competitive</h3>" +
						"<h4>" + d.data.games.competitive.wins + " Won</h4>" +
						"<h4>" + d.data.games.competitive.lost + " Lost</h4>" +
						"<h4>" + d.data.games.competitive.played + " Played</h4>" +
					"</div>" +
					"<img src='" + d.data.competitive.rank_img + "' class='userpics'/>" +
					"<h3>" + d.data.competitive.rank + "</h3>" +
				"</div>"

				$($userProfile).appendTo("#mainrow");
				$("#loading").removeClass("loader");
			},
			error: function(jqXHR, textStatus, errorThrown){
				var $error = 
				"<div class='col-xs-12 center'>" +
					"<h3>" + textStatus + " " + errorThrown + "</h3>" +
					"<h3>Oops! An error has occured. Try refreshing the page or try making the request again later.</h3>" +
				"</div>"
				$($error).appendTo("#mainrow");
				$("#loading").removeClass("loader");
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
		$("#mainrow").empty();
		$("#loading").addClass("loader");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/" + $gamemode + "/allHeroes/",
			dataType: "json",
			success: function(d){
				//Since these stats doesnt count in quickplay, I make sure that their value turns into "-" if user wants the competitive stats
				var $gamesPlayed = d["GamesPlayed"];
				var $gamesTied = d["GamesTied"];
				var $gamesLost = d["GamesLost"];

				if($gamemode === "quickplay"){
					var $gamesPlayed = "-";
					var $gamesTied = "-";
					var $gamesLost = "-";
				}

				var $totalData = 
				//Meele Stats
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Meele Stats</h2>" +
					"<h3>" + d["MeleeFinalBlows"] + " Final blows</h3>" +
					"<h3>" + d["MeleeFinalBlows-Average"] + " Average Final Blows</h3>" +
					"<h3>" + d["MeleeFinalBlows-MostinGame"] + " Most Final Blows In Game</h3>" +
				"</div>" +
				//Eliminations/Kills
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Eliminations/Kills</h2>" +
					"<h3>" + d["Eliminations"] + " Total Eliminations</h3>" +
					"<h3>" + d["Eliminations-Average"] + " Average Eliminations</h3>" +
					"<h3>" + d["Eliminations-MostinGame"] + " Most Eliminations In Game" +
				"</div>" +
				//Solo Kills
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Solo Kills</h2>" +
					"<h3>" + d["SoloKills"] + " Solo Kills</h3>" +
					"<h3>" + d["SoloKills-Average"] + " Average Solo Kills</h3>" +
					"<h3>" + d["SoloKills-MostinGame"] + " Most Solo Kills In Game</h3>" +
				"</div>" +
				//Objective Kills
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Objective Kills</h2>" +
					"<h3>" + d["ObjectiveKills"] + " Objective Kills</h3>" +
					"<h3>" + d["ObjectiveKills-Average"] + " Average Objective Kills</h3>" +
					"<h3>" + d["ObjectiveKills-MostinGame"] + " Most Objective Kills In Game</h3>" +
				"</div>" +
				//Multikills
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Multikills</h2>" +
					"<h3>" + d["Multikills"] + " Multikills</h3>" +
					"<h3>" + d["Multikill-Best"] + " Average Multikills</h3>" +
				"</div>" +
				//Final Blows
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Final Blows</h2>" +
					"<h3>" + d["FinalBlows"] + " Final Blows</h3>" +
					"<h3>" + d["FinalBlows-Average"] + " Average Final Blows</h3>" +
					"<h3>" + d["FinalBlows-MostinGame"] + " Most Final Blows In Game</h3>" +
				"</div>" +
				//Environmental Kills
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Environmental Kills/Deaths</h2>" +
					"<h3>" + d["EnvironmentalKills"] + " Environmental Kills</h3>" +
					"<h3>" + d["EnvironmentalDeaths"] + " Environmental Deaths</h3>" +
				"</div>" +
				//Damage Done
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Damage Done</h2>" +
					"<h3>" + d["DamageDone"] + " Damage Done</h3>" +
					"<h3>" + d["DamageDone-Average"] + " Average Damage Done</h3>" +
					"<h3>" + d["DamageDone-MostinGame"] + " Most Damage Done In Game</h3>" +
				"</div>" +
				//Healing Done
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Healing Done</h2>" +
					"<h3>" + d["HealingDone"] + " Damage Done</h3>" +
					"<h3>" + d["HealingDone-Average"] + " Average Healing Done</h3>" +
					"<h3>" + d["HealingDone-MostinGame"] + " Most Healing Done In Game</h3>" +
				"</div>" +
				//Offensive Assists
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Offensive Assists</h2>" +
					"<h3>" + d["OffensiveAssists"] + " Offensive Assists</h3>" +
					"<h3>" + d["OffensiveAssists-Average"] + " Average Offensive Assists</h3>" +
					"<h3>" + d["OffensiveAssists-MostinGame"] + " Most Offensive Assists In Game</h3>" +
				"</div>" +
				//Recon Assists
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Recon Assists</h2>" +
					"<h3>" + d["ReconAssists"] + " Recon Assists</h3>" +
					"<h3>" + d["ReconAssists-Average"] + " Average Recon Assists</h3>" +
				"</div>" +
				//Defensive Assists
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Defensive Assists</h2>" +
					"<h3>" + d["DefensiveAssists"] + " Defensive Assists</h3>" +
					"<h3>" + d["DefensiveAssists-Average"] + " Average Defensive Assists</h3>" +
					"<h3>" + d["DefensiveAssists-MostinGame"] + " Most Defensive Assists In Game</h3>" +
				"</div>" +
				//Objective Time
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Objective Time</h2>" +
					"<h3>" + d["ObjectiveTime"] + " Objective Time</h3>" +
					"<h3>" + d["ObjectiveTime-Average"] + " Average Objective Time</h3>" +
					"<h3>" + d["ObjectiveTime-MostinGame"] + " Most Objective Time In Game</h3>" +
				"</div>" +
				//On Fire
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>On Fire</h2>" +
					"<h3>" + d["TimeSpentonFire"] + " Time Spent On Fire</h3>" +
					"<h3>" + d["TimeSpentonFire-Average"] + " Average Time On Fire</h3>" +
					"<h3>" + d["TimeSpentonFire-MostinGame"] + " Most Time On Fire In Game</h3>" +
				"</div>" +
				//Medals
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Medals</h2>" +
					"<h3>" + d["Medals"] + " Total Medals</h3>" +
					"<h3>" + d["Medals-Gold"] + " Gold Medals</h3>" +
					"<h3>" + d["Medals-Silver"] + " Silver Medals</h3>" +
					"<h3>" + d["Medals-Bronze"] + " Bronze Medals</h3>" +
				"</div>" +
				//Game Stats
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Games Stats</h2>" +
					"<h3>" + $gamesPlayed + " Games Played</h3>" +
					"<h3>" + d["GamesWon"] + " Games Won</h3>" +
					"<h3>" + $gamesTied + " Games Tied</h3>" +
					"<h3>" + $gamesLost + " Games Lost</h3>" +
				"</div>" +
				//Deaths
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Deaths</h2>" +
					"<h3>" + d["Deaths"] + " Deaths</h3>" +
					"<h3>" + d["Deaths-Average"] + " Average Deaths</h3>" +
				"</div>" +
				//Miscellaneous
				"<div class='col-xs-12 col-sm-6 col-lg-4 center card'>" +
					"<h2>Miscellaneous</h2>" +
					"<h3>" + d["Cards"] + " Total Cards</h3>" +
					"<h3>" + d["TimePlayed"] + " Played</h3>" +
					"<h3>" + d["TeleporterPadsDestroyed"] + " Teleporter Pads Destroyed</h3>" +
				"</div>"

				$($totalData).appendTo("#mainrow");
				$("#loading").removeClass("loader");
			},
			error: function(jqXHR, textStatus, errorThrown){
				var $error = 
				"<div class='col-xs-12 center'>" +
					"<h3>" + textStatus + " " + errorThrown + "</h3>" +
					"<h3>Oops! An error has occured. Try refreshing the page or try making the request again later.</h3>" +
				"</div>"
				$($error).appendTo("#mainrow");
				$("#loading").removeClass("loader");
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
		$("#mainrow").empty();
		$("#loading").addClass("loader");

		$.ajax({
			method: "GET",
			url: "https://api.lootbox.eu/" + $platform + "/" + $region + "/" + $btag + "/" + $gamemode + "/heroes",
			dataType: "json",
			success: function(d) {
				var count = 1;

				for(i = 0; i < d.length; i++){
					var $heroPlaytime =
					
					"<div class='col-xs-6 col-sm-4 col-lg-3 card center'>" +
						"<h3>" + count + "</h3>" + "<img src='" + d[i].image + "'/>" +
						"<h3>" + d[i].name + "</h3>" +
						"<h3>" + d[i].playtime + "</h3>" +
					"</div>"

					$($heroPlaytime).appendTo("#mainrow");

					count++;
				}
				$("#loading").removeClass("loader");
			},
			error: function(jqXHR, textStatus, errorThrown){
				var $error = 
				"<div class='col-xs-12 center'>" +
					"<h3>" + textStatus + " " + errorThrown + "</h3>" +
					"<h3>Oops! An error has occured. Try refreshing the page or try making the request again later.</h3>" +
				"</div>"
				$($error).appendTo("#mainrow");
				$("#loading").removeClass("loader");
			}
		});
	});
};

$(document).ready(gamemode);
$(document).ready(fetchprofile);
$(document).ready(fetchtotal);
$(document).ready(fetchplaytime);