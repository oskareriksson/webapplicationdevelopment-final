# Web Application Development - Final assignment

### School: Lernia Stockholm, Sweden.

### Program: JavaScript Developer - Front End, YHJUST16.

### Course: Web Application Development.

#### Technologies

* HTML for structure.
* CSS for design.
* Bootstrap 3 for additional structure/styling.
* jQuery for functionality.
* Git for version control.
* AJAX for asynchronous content update, with JSON as datatype.

#### API

[Unofficial Overwatch API](https://api.lootbox.eu/documentation "Unofficial Overwatch API")

In the lack of an official Overwatch API from Blizzard, the community has developed one themselves. It's not advanced and its pretty slow, but it gets the job done.

#### Description

A single page application where you can fetch and display your stats in the game Overwatch.

Enter your Battletag, select platform, select region, choose game mode and use the fetch buttons to get your stats! If you don't have a battletag, fear not! Use one of these sample tags:

* MOONMOON#1629, PC, US
* Seagull#1894, PC, US

#### Workflow

I made this web application with Mobile-first in mind, since Bootstrap is a mobile-first framework. It scales pretty well and looks as intended in Firefox, Chrome and Safari. I have not tested Internet Explorer.

I think that this project went well overall, but since the API is community made it had some flaws that staggered me a bit. The data structure is different for each AJAX call, so I had to take a slightly different approach for each one.

For example userprofile returns an object with "category" properties, fetchtotal is just a large object with a property for each stat and fetchplaytime returns an array of objects.

But I managed to achieve the result I wanted within the deadline I had, so overall satisfied with this project.

#### Potential future improvements

* Make a more practical solution to adding the returned JSON data to DOM in fetchtotal.
* Improving the design. I wanted it to be simple and obvious, but there is still room for more details and overall better display.

#### Website live at: https://oskareriksson.github.io/webapplicationdevelopment-final/

### Made by: Oskar Eriksson

### [Linkedin](https://se.linkedin.com/in/oskar-eriksson-827748133 "Linkedin")

### Project finished: Not yet

### Grade: Not finished (IG/G/VG)