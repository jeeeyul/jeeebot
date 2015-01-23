#!/usr/bin/env node
var cli = require("cli");
var _ = require("underscore-keypath");
var path = require("path");
var Generator = require("./generator");

cli.option_width = 30;

cli.parse({
	type				: ["t", "Generator type: segue | reuse | strings ", "string"],

	fieldStyle	: [null, "Field naming style: uppercase | camelcase", "string", "uppercase"],
	fieldPrefix : [null, "Prefix for field name", "string", "k"],

	copyright 	: ["c", "Copyright", "string", "Jeeeyul Lee<jeeeyul@gmail.com>"],

	output			: ["o", "Output file", "path"]
});

cli.main(function(args, options){
	var me = this;
	me.running = true;

	this.options.xcodeIO = require("./lib/xcode-io")();

	var generator;
	var errors = [];

	if(this.options.type == undefined){
		errors.push("A generate type must be setted.")
	}

	else{
		console.log(this.options.type);
		try{
			debugger;
			generator = require(path.join(__dirname, "parts", options.type));
		}catch(e){
			me.error(e.stack)
			if(e.code == 'MODULE_NOT_FOUND'){
				errors.push(options.type + " is not known generator type.");
			}
		}
	}

	if(this.options.xcodeIO.inputs.length == 0){
		errors.push("Input files are not specified.");
	}

	if(this.options.xcodeIO.outputs.length == 0){
		errors.push("Output file is not specified.");
	}

	if(errors.length > 0){
		var me = this;
		_(errors).each(function(it){
			me.error(it);
		});
		return;
	}

	new Generator(this.options).generate();
});
