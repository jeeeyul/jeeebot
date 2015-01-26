"use strict";
var _ = require("underscore-keypath");
var path = require("path");
var url = require("url");
var glob = require("glob");

function createList(env, prefix){
	var count = parseInt(env[prefix + "_COUNT"]);
	var i;
	var result = [];
	for(i=0; i<count; i++){
		var key = prefix + "_" + i;
		result.push(env[key]);
	}
	return result;
}

function ensureAbsolute(filepath){
	var absolute = path.resolve(filepath) == path.normalize(filepath);
	if (absolute) {
		return filepath;
	} else {
		return path.join(process.cwd(), filepath);
	}
}

module.exports = function(env){
	env = env || process.env;
	var xcodeInputs = resolve(createList(env, "SCRIPT_INPUT_FILE"));
	var xcodeOutputs = createList(env, "SCRIPT_OUTPUT_FILE");

	return {
		"inputs" : xcodeInputs,
		"outputs" : xcodeOutputs,
		"provided" : xcodeInputs.length > 0 || xcodeOutputs.length > 0
	};
};

function resolve(list){
	var result = [];
	_(list).each(function (each) {
		var files = glob.sync(each);
		result = result.concat(files);
	});
	return result;
}
