var nameParser = require("./name-parser");
var _ = require("underscore-keypath");

var _groups = {};
var _fieldMap = {};
var _fieldStyle, _currentRenderer;
var _prefix = "";

var nameRenders = {
	"camelcase" : function(segs){
		return _(segs).map(function(it, index){
			if(_prefix.length === 0 && index === 0){
				return it;
			}else{
				return it.charAt(0).toUpperCase() + it.substring(1);
			}
		}).join("");
	},

	"uppercase" : function(segs){
		return _(segs).map(function(it){
			return it.toUpperCase();
		}).join("_");
	}
};

_fieldStyle = "camelcase";
_currentRenderer = nameRenders.camelcase;

function generateFieldName(value){
	return _prefix + _currentRenderer(parseName(value));
}

function Group(name){
	this.name = name;
	this.fields = [];
	this.fieldMap = {};

	return this;
}

Group.prototype = {
	addField : function(field){
		if(this.fieldMap[field.name] !== undefined){
			return;
		}
		_fieldMap[field.name] = field;
		this.fields.push(field);
	},

	ensureField : function(name){
		var fieldName = generateFieldName(name);
		if(_fieldMap[fieldName]){
			return _fieldMap[fieldName];
		}
		var newField = new Field(name);
		this.addField(newField);
		return newField;
	}
};


function Field(){
	var name, value, description;
	if (arguments.length < 3) {
		name = arguments[0];
		value = arguments[0];
		description = arguments[1];
	} else {
		name = arguments[0];
		value = arguments[1];
		description = arguments[2];
	}

	this.name = generateFieldName(name);
	this.value = value;
	this.descriptions = description ? [description] : [];
	return this;
}

function parseName (name) {
	return nameParser.parse(normalize(name));
}

function normalize (value) {
	return value.trim().replace(/[_-]/g, " ")
		.replace(/[^a-zA-Z0-9]/g, "_");
}


function ensureGroup(name) {
	var exists = _groups[name];
	if(exists){
		return exists;
	}
	_groups[name] = new Group(name);
	return _groups[name];
}

var groupModule = {
	"Field" : Field,
	"ensureGroup" : ensureGroup,
	"groups" : _groups,
	"reset" : function(){
		this.groups = _groups = {};
	},
	"debug" : {
		"parseName" : parseName,
		"normalize" : normalize,
		"generateFieldName" : generateFieldName
	}
};

Object.defineProperty(groupModule, "fieldStyle", {
	set : function(fieldStyle){
		var newFieldStyle = fieldStyle.toLowerCase();

		if(_fieldStyle == newFieldStyle){
			return;
		}
		if(typeof nameRenders[newFieldStyle] != "function"){
			throw new Error(newFieldStyle + " is not supported!");
		}
		_fieldStyle = newFieldStyle;
		_currentRenderer = nameRenders[newFieldStyle];
	},
	get : function(){
		return _fieldStyle;
	}
});

Object.defineProperty(groupModule, "prefix", {
	set : function(prefix){
		_prefix = normalize(prefix);
	},
	get : function(){
		return _prefix;
	}
});

module.exports = groupModule;
