/*
compile.js
Compiles stuff from the src directory into the root directory html files.

Language: NodeJS
How to use: Don't! Just use the already compiled files. If you really need to, run "node compile" to run this NodeJS program.
*/

var nav = [
	{title:"Intro",			href:"index",		label:"Index"},
	{title:"Problem 1",		href:"prob1",		label:"1"},
	{title:"Problem 2",		href:"prob2",		label:"2"},
	{title:"Problem 3",		href:"prob3",		label:"3"},
	{title:"Problem 4",		href:"prob4",		label:"4"},
	{title:"Problem 5",		href:"prob5",		label:"5"},
	{title:"Problem 6",		href:"prob6",		label:"6"},
	{title:"Problem 7",		href:"prob7",		label:"7"},
	{title:"Problem 8",		href:"prob8",		label:"8"},
	{title:"Problem 9",		href:"prob9",		label:"9"},
	{title:"Problem 10",	href:"prob10",		label:"10"},
	{title:"Problem 11",	href:"prob11",		label:"11"},
	{title:"Problem 12",	href:"prob12",		label:"12"},
	{title:"Libraries",		href:"libraries",	label:"Libraries"}
];



var fs = require('fs');
var mu = require('./src/mustache.js');

console.log("Compiling pages... ");

var template = fs.readFileSync('./src/TEMPLATE.html','utf8');
mu.parse(template);

for(var i = 0; i < nav.length; i++){
	(function(i){ //Callback scoping is tricky, I need to capture the variable's current value, since it'll have changed by the time the callback is called. https://stackoverflow.com/questions/8026853/passing-variables-to-callbacks-in-node-js
		fs.readFile('./src/'+nav[i].href+'.content.html', 'utf8', function(err, content){
			if(err)console.log(nav[i].title + ": Read error");
			else{
				var navlinks = "";
				for(var k = 0; k < nav.length; k++){
					if(k == i)navlinks += "<b>"+nav[k].label+"</b> \n";
					else navlinks += "<a href='"+nav[k].href+".html'>"+nav[k].label+"</a> \n";
				}
				
				var processed = mu.render(template,{
					title: nav[i].title,
					navlinks: navlinks,
					content: content
				});
				
				fs.writeFile('./'+nav[i].href+'.html', processed, 'utf8', function(err){
					if(err)console.log(nav[i].title + ": Write error");
					else console.log(nav[i].title + ": Compiled successfully to /"+nav[i].href+".html.");
				});
			}
		});
	})(i);
}

