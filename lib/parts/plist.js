var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var _ = require("underscore-keypath");
var fs = require("fs");
var path = require("path");
var Handlebars = require("handlebars");

var model = require("./lib/model");
var template = Handlebars.compile("A plist key ‘{{identifier}}’ in ‘{{filename}}’");

exports.process = function(fullPath) {
		var content = fs.readFileSync(fullPath).toString();
		var doc = new dom().parseFromString(content);
		var filename = path.basename(fullPath);
		var group = model.ensureGroup(filename);

		_(xpath.select("//key", doc)).map(function(it) {
			var identifier = it.textContent.trim();
			var field = group.ensureField(identifier);
			field.descriptions.push(template({
				"identifier" : identifier,
				"filename" : filename
			}));
		});
};
