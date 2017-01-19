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
				//Quickplay
				//Meele
				var $meeleFinalBlows = d.MeleeFinalBlows;
				var $meeleFinalAvg = d["MeleeFinalBlows-Average"];
				var $mostMeeleFinalInGame = d["MeleeFinalBlows-MostinGame"];
				//Eliminations/Kills
				var $eliminations = d.Eliminations;
				var $elimAvg = d["Eliminations-Average"];
				var $mostElimInGame = d["Eliminations-MostinGame"];
				var $soloKills = d.SoloKills;
				var $soloKillsAvg = d["SoloKills-Average"];
				var $soloKillsInGame = d["SoloKills-MostinGame"];
				var $objKills = d.ObjectiveKills;
				var $objKillsAvg = d["ObjectiveKills-Average"];
				var $mostObjKillsInGame = d["ObjectiveKills-MostinGame"];
				var $finalBlows = d.FinalBlows;
				var $finalBlowsAvg = d["FinalBlows-Average"];
				var $mostFinalBlowsInGame = d["FinalBlows-MostinGame"];
				var $multiKills = d.Multikills;
				var $multiKillBest = d["Multikill-Best"];
				var $environmentalKills = d.EnvironmentalKills;
				//Damage done
				var $dmgDone = d.DamageDone;
				var $dmgDoneAvg = d["DamageDone-Average"];
				var $mostDmgInGame = d["DamageDone-MostinGame"];
				//Healing done
				var $healingDone = d.HealingDone;
				var $healingDoneAvg = d["HealingDone-Average"];
				var $mostHealingInGame = d["HealingDone-MostinGame"];
				//Assists
				var $offAss = d.OffensiveAssists;
				var $offAssAvg = d["OffensiveAssists-Average"];
				var $mostOffAssInGame = d["OffensiveAssists-MostinGame"];
				var $defAss = d.DefensiveAssists;
				var $defAssAvg = d["DefensiveAssists-Average"];
				var $mostDefAssInGame = d["DefensiveAssists-MostinGame"];
				var $reconAss = d.ReconAssists;
				var $reconAssAvg = d["ReconAssists-Average"];
				//Objective
				var $objTime = d.ObjectiveTime;
				var $objTimeAvg = d["ObjectiveTime-Average"];
				var $mostObjTimeInGame = d["ObjectiveTime-MostinGame"];
				//On fire
				var $onFire = d.TimeSpentonFire;
				var $onFireAvg = d["TimeSpentonFire-Average"];
				var $onFireInGame = d["TimeSpentonFire-MostinGame"];
				//Deaths
				var $deaths = d.Deaths;
				var $deathsAvg = d["Deaths-Average"];
				var $environmentalDeaths = d.EnvironmentalDeaths;
				//Medals
				var $medals = d.Medals;
				var $goldMedals = d["Medals-Gold"];
				var $silverMedals = d["Medals-Silver"];
				var $bronzeMedals = d["Medals-Bronze"];
				//Misc
				var $cards = d.Cards;
				var $gamesWon = d.GamesWon;
				var $timePlayed = d.TimePlayed;
				var $teleporterPadsDestroyed = d.TeleporterPadsDestroyed;

				//Competitive
				//No recon stats are logged in competitive(recon assists/recon assists average), but the variables below are logged in competitive mode only and not quickplay. Other than that the same
				//properties/variables are used.
				var $gamesPlayed = d.GamesPlayed;
				var $gamesTied = d.GamesTied;
				var $gamesLost = d.GamesLost;

				var $totalData = 
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Meele Stats</h2>" +
				"<h3>" + d["MeleeFinalBlows"] + " Final blows</h3>" +
				"<h3>" + d["MeleeFinalBlows-Average"] + " Average Final Blows</h3>" +
				"<h3>" + d["MeleeFinalBlows-MostinGame"] + " Most Final Blows In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Eliminations/Kills</h2>" +
				"<h3>" + d["Eliminations"] + " Total Eliminations</h3>" +
				"<h3>" + d["Eliminations-Average"] + " Average Eliminations</h3>" +
				"<h3>" + d["Eliminations-MostinGame"] + " Most Eliminations In Game" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Solo Kills</h2>" +
				"<h3>" + d["SoloKills"] + " Solo Kills</h3>" +
				"<h3>" + d["SoloKills-Average"] + " Average Solo Kills</h3>" +
				"<h3>" + d["SoloKills-MostinGame"] + " Most Solo Kills In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Objective Kills</h2>" +
				"<h3>" + d["ObjectiveKills"] + " Objective Kills</h3>" +
				"<h3>" + d["ObjectiveKills-Average"] + " Average Objective Kills</h3>" +
				"<h3>" + d["ObjectiveKills-MostinGame"] + " Most Objective Kills In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Multikills</h2>" +
				"<h3>" + d["Multikills"] + " Multikills</h3>" +
				"<h3>" + d["Multikill-Best"] + " Average Multikills</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Final Blows</h2>" +
				"<h3>" + d["FinalBlows"] + " Final Blows</h3>" +
				"<h3>" + d["FinalBlows-Average"] + " Average Final Blows</h3>" +
				"<h3>" + d["FinalBlows-MostinGame"] + " Most Final Blows In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Environmental Kills/Deaths</h2>" +
				"<h3>" + d["EnvironmentalKills"] + " Environmental Kills</h3>" +
				"<h3>" + d["EnvironmentalDeaths"] + " Environmental Deaths</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Damage Done</h2>" +
				"<h3>" + d["DamageDone"] + " Damage Done</h3>" +
				"<h3>" + d["DamageDone-Average"] + " Average Damage Done</h3>" +
				"<h3>" + d["DamageDone-MostinGame"] + " Most Damage Done In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Healing Done</h2>" +
				"<h3>" + d["HealingDone"] + " Damage Done</h3>" +
				"<h3>" + d["HealingDone-Average"] + " Average Healing Done</h3>" +
				"<h3>" + d["HealingDone-MostinGame"] + " Most Healing Done In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Offensive Assists</h2>" +
				"<h3>" + d["OffensiveAssists"] + " Offensive Assists</h3>" +
				"<h3>" + d["OffensiveAssists-Average"] + " Average Offensive Assists</h3>" +
				"<h3>" + d["OffensiveAssists-MostinGame"] + " Most Offensive Assists In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Recon Assists</h2>" +
				"<h3>" + d["ReconAssists"] + " Recon Assists</h3>" +
				"<h3>" + d["ReconAssists-Average"] + " Average Recon Assists</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Defensive Assists</h2>" +
				"<h3>" + d["DefensiveAssists"] + " Defensive Assists</h3>" +
				"<h3>" + d["DefensiveAssists-Average"] + " Average Defensive Assists</h3>" +
				"<h3>" + d["DefensiveAssists-MostinGame"] + " Most Defensive Assists In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Objective Time</h2>" +
				"<h3>" + d["ObjectiveTime"] + " Objective Time</h3>" +
				"<h3>" + d["ObjectiveTime-Average"] + " Average Objective Time</h3>" +
				"<h3>" + d["ObjectiveTime-MostinGame"] + " Most Objective Time In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>On Fire</h2>" +
				"<h3>" + d["TimeSpentonFire"] + " Time Spent On Fire</h3>" +
				"<h3>" + d["TimeSpentonFire-Average"] + " Average Time On Fire</h3>" +
				"<h3>" + d["TimeSpentonFire-MostinGame"] + " Most Time On Fire In Game</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Medals</h2>" +
				"<h3>" + d["Medals"] + " Total Medals</h3>" +
				"<h3>" + d["Medals-Gold"] + " Gold Medals</h3>" +
				"<h3>" + d["Medals-Silver"] + " Silver Medals</h3>" +
				"<h3>" + d["Medals-Bronze"] + " Bronze Medals</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Games Stats</h2>" +
				"<h3>" + d["GamesPlayed"] + " Games Played</h3>" +
				"<h3>" + d["GamesWon"] + " Games Won</h3>" +
				"<h3>" + d["GamesTied"] + " Games Tied</h3>" +
				"<h3>" + d["GamesLost"] + " Games Lost</h3>" +
				"</div>"
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Deaths</h2>" +
				"<h3>" + d["Deaths"] + " Deaths</h3>" +
				"<h3>" + d["Deaths-Average"] + " Average Deaths</h3>" +
				"</div>" +
				"<div class='col-xs-12 col-sm-6 col-lg-4 center'>" +
				"<h2>Miscellaneous</h2>" +
				"<h3>" + d["Cards"] + " Total Cards</h3>" +
				"<h3>" + d["TimePlayed"] + " Played</h3>" +
				"<h3>" + d["TeleporterPadsDestroyed"] + " Teleporter Pads Destroyed</h3>" +
				"</div>" +


				$($totalData).appendTo($mainrow);

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
				for(i = 0; i < d.length; i++){
					$("<img>").attr("src", d[i].image).appendTo($mainrow);
					$("<h3>" + d[i].name + "</h3>").addClass("center").appendTo($mainrow);
					$("<h3>" + d[i].playtime + "</h3>").addClass("center").appendTo($mainrow);
				}
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