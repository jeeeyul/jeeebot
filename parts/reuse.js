var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var _ = require("underscore-keypath");
var fs = require("fs");
var Handlebars = require("handlebars");
var path = require("path");
var xmlUtil = require("./lib/xml-util");
var model = require("./lib/model");

exports.process = function(path){
	var me = this;

	var content = fs.readFileSync(path).toString();
	var doc = new dom().parseFromString(content);

	_(xpath.select("//*[@reuseIdentifier]", doc)).each(function(it){

		var scene = xpath.select1("./ancestor::scene", it);
		var comment = xmlUtil.getComment(scene);

		var group = model.ensureGroup(comment);
		var reuseID = it.getAttribute("reuseIdentifier");
		var field = new model.Field(reuseID, "A constant for reuse identifier ‘" + reuseID + "’");

		group.addField(field);
	});

};
