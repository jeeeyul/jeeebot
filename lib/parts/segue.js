var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var _ = require("underscore-keypath");
var fs = require("fs");
var Handlebars = require("handlebars");
var path = require("path");

var template = Handlebars.compile(fs.readFileSync(path.join(__dirname, "segue.handlebars")).toString());
var xmlUtil = require("./lib/xml-util");
var model = require("./lib/model");

exports.process = function(path) {
    var content = fs.readFileSync(path).toString();
    var doc = new dom().parseFromString(content);

    _(xpath.select("//segue/@identifier/..", doc)).map(function(it) {
        var scene = xpath.select1("./ancestor::scene", it);
        var comment = xmlUtil.getComment(scene);

        var destinationScene = xpath.select1("//*[@id='" + it.getAttribute("destination") + "']/ancestor::scene", doc);
        var destinationComment = xmlUtil.getComment(destinationScene);

        var identifier = it.getAttribute("identifier");

        var group = model.ensureGroup(comment);
        var field = new model.Field(identifier);

        field.descriptions.push(template({
            name: field.name,
            identifier: it.getAttribute("identifier"),
            kind: it.getAttribute("kind"),
            from: comment,
            to: destinationComment
        }).trim());
        group.addField(field);
    });
};