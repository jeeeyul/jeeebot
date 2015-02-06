var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var _ = require("underscore-keypath");
var fs = require("fs");
var path = require("path");
var Handlebars = require("handlebars");

var model = require("./lib/model");
var template = Handlebars.compile("An storyboard id cosntant for ‘{{identifier}}’:{{type}}.");

exports.process = function(fullPath) {
		var content = fs.readFileSync(fullPath).toString();
		var doc = new dom().parseFromString(content);
		var filename = path.basename(fullPath);
		var group = model.ensureGroup(filename);

		_(xpath.select("//*[@storyboardIdentifier]", doc)).map(function(it) {
			var identifier = it.getAttribute("storyboardIdentifier");
			group.ensureField(identifier).descriptions.push(template({
				"identifier" : identifier,
				"type" : it.tagName
			}));
		});
};
