var stringsParser = require("./strings-parser");
var fs = require("fs");
var _ = require("underscore-keypath");
var model = require("./lib/model");

exports.process = function(file){
	var language = "";
	(function(){
		var pattern = /\/([a-zA-Z_-]+)\.lproj\//g;
		var result = pattern.exec(file);

		if(result[1]){
			language = result[1];
		}
	})();

	var currentGroup = model.ensureGroup("default");
	var ast = stringsParser.parse(fs.readFileSync(file).toString());
	_(ast).each(function (each) {
		switch(each.type){
			case "comment": {
				if(each.multiline){
					return;
				}
				currentGroup = model.ensureGroup(each.text);
				break;
			}

			case "languageKey" : {
				var field = currentGroup.ensureField(each.key);
				if (language) {
					field.descriptions.push(language + " : " + each.value);
				} else {
					field.descriptions.push(each.value);
				}

				break;
			}
		}
	});
};
