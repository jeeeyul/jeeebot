var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var _ = require("underscore-keypath");
var fs = require("fs");
var Handlebars = require("handlebars");
var path = require("path");
var xmlUtil = require("./xml-util");
var template = Handlebars.compile(fs.readFileSync(path.join(__dirname, "reuse-identifiers.handlebars")).toString());

exports.process = function(path){
	var me = this;

	var content = fs.readFileSync(path).toString();
	var doc = new dom().parseFromString(content);

	var ids = _(xpath.select("//*[@reuseIdentifier]", doc)).map(function(it){
		return {
			name : me.options.fieldPrefix + me.options.reusePrefix + it.getAttribute("reuseIdentifier").replace(/[^a-zA-Z0-9]/g, "_").toUpperCase(),
			identifier:it.getAttribute("reuseIdentifier")
		};
	});

	if(ids.length){
		this.info("Parsing " + path + "...");
		this.info(template(ids));
	}
};
