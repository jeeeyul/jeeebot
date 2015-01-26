var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var _ = require("underscore-keypath");
var fs = require("fs");
var Handlebars = require("handlebars");
var path = require("path");

var xmlUtil = require("./lib/xml-util");
var model = require("./lib/model");

var attrComment = Handlebars.compile("{{name}}:[{{type}}] attribute of {{entityName}}");

exports.process = function(modelPath){
	var me = this;

	var content = fs.readFileSync(path.join(modelPath, "contents")).toString();
	var doc = new dom().parseFromString(content);

	_(xpath.select("/model/entity", doc)).map(function(it){
		var entityName = it.getAttribute("name");

		var group = model.ensureGroup(entityName);
		var field = new model.Field(entityName);

		field.descriptions.push("A constants for entity name ‘" + entityName + "’");
		group.addField(field);

		_(xpath.select("./attribute", it)).each(function(it){
			var attributeName = it.getAttribute("name");

			var field = new model.Field(entityName + " " + attributeName, it.getAttribute("name"), attrComment({
				"optional" : Boolean(it.getAttribute("optional")),
				"name" : it.getAttribute("name"),
				"type" : it.getAttribute("attributeType"),
				"entityName" : entityName
			}));
			group.addField(field);
		});
	});
};
