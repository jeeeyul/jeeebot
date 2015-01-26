var fs = require("fs");
var _ = require("underscore-keypath");
var model = require("./lib/model");
var glob = require("glob");
var path = require("path");

exports.process = function(assetDir){
	var assets = glob.sync(assetDir + "/*.*set");
	var group = model.ensureGroup("default");
	_(assets).each(function(it){
		var name = path.basename(it, path.extname(it));
		var field = group.ensureField(name);
		field.descriptions.push("An image constants for " + it);
	});
};
