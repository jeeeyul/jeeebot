var _ = require("underscore-keypath");
var path = require("path");
var cli = require("cli");
var _options;
var model = require("./parts/lib/model");
var Handlebars = require("handlebars");
var fs = require("fs");
var moment = require("moment");
var model = require("./parts/lib/model");

Handlebars.registerHelper("indent", function(level){
	var indent = new Array(level + 1).join(" ");
	var content = _(this.split(/[\r\n]+/g)).map(function (it){
		return indent + it.trim();
	}).join("\n");
	return content;
});

Handlebars.registerHelper("comments", function(){
	var contents = [];
	var indent = " ";

	_(this.descriptions).each(function (each) {
		var lines = _(each.trim().split(/[\r\n]+/g)).map(function (it){
			return indent + it.trim();
		});
		if(lines.length == 1){
			contents = contents.concat("/**" + lines[0] + " */");
		}
		else{
			contents = contents.concat(["/**"], lines, ["*/"]);
		}

	});

	return contents.join("\n");
});

var template = Handlebars.compile(fs.readFileSync(path.join(__dirname, "generate.handlebars")).toString());

function Generator(options){
	this.options = options;
	return this;
}

Generator.prototype = {
	generate : function(){
		var me = this;

		this.ok(JSON.stringify(this.options, null, "  "));

		model.prefix = this.options.fieldPrefix;
		model.fieldStyle = this.options.fieldStyle;

		var generator = require(path.join(__dirname, "parts", this.options.type))

		_(this.options.inputs).each(function(each){
			generator.process.call(me, each);
		});

		var filename = path.basename(this.options.output);
		var content = template({
			"filename" 	: filename,
			"macroName" : filename.replace(/[^a-zA-Z0-9]/g, "_"),
			"date" 			: moment().format("llll"),
			"groups" 		: model.groups,
			"year" 			: moment().format("YYYY"),
			"copyright" : this.options.copyright,
		});

		if(this.options.output == "stdout"){
			this.ok(content);
		}else{
			fs.writeFileSync(this.options.output, content);
		}

	},

	ok : cli.ok,
	info : cli.info,
	error : cli.error
};

module.exports = Generator;
