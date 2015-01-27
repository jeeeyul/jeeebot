/* globals it:false, describe:false */
/* jshint -W030 */
require("should");

var path = require("path");
var Generator = require("../lib/generator");
var fs = require("fs");
var path = require("path");

function getExpectedContent(relPath){
    return fs.readFileSync(path.join(__dirname, relPath)).toString();
}

describe("generate strings", function(){
    it("hello", function(){
        var g = new Generator({
            fieldPrefix : "kLang",
            fieldStyle : "camelcase",
            inputs : [
              path.join(__dirname, "dummy-input", "en.lproj", "strings.strings"),
              path.join(__dirname, "dummy-input", "ko.lproj", "strings.strings")
            ],
            output : "strings.h",
            type : "strings",
            templateOverwrite : {
                "date" : null
            }
        });

        g.generate().should.be.eql(getExpectedContent("expected/strings.h"));
    });
});
