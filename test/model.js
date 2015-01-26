/* globals it:false, describe:false, beforeEach:false */
/* jshint -W030 */
require("should");
var model = require("../lib/parts/lib/model");

describe("model", function(){
    beforeEach(function(){
        model.reset();
        model.fieldStyle = "camelcase";
        model.prefix = "k";
    });

    describe("group", function(){
        it("ensure group", function(){
            var previous = model.ensureGroup("hello");
            (model.groups.hello).should.be.exist;
            model.ensureGroup("hello").should.be.exactly(previous);
        });
    });

    describe("field", function(){
        describe("ensure", function(){
            var helloGroup, worldField;

            beforeEach(function(){
                helloGroup = model.ensureGroup("hello");
                worldField = helloGroup.ensureField("world");
            });

            it("ensure field", function(){
                (helloGroup.ensureField("world"))
                    .should.be.exactly(worldField);
            });

            it("ensure from different group", function(){
                (model.ensureGroup("other").ensureField("world"))
                    .should.be.exactly(worldField);
            });
        });

        describe("naming", function(){
            describe("camelcase", function(){
                beforeEach(function(){
                    model.prefix = "k";
                    model.fieldStyle = "camelcase";
                });

                it("basic", function(){
                    model.debug.generateFieldName("helloWorld")
                        .should.be.exactly("kHelloWorld");
                });

                it("escape", function(){
                    model.debug.generateFieldName(model.debug.normalize("hello!world123!!!"))
                        .should.be.exactly("kHelloWorld123");
                });
            });

            describe("uppercase", function(){
                beforeEach(function(){
                    model.prefix = "K_";
                    model.fieldStyle = "uppercase";
                });

                it("basic", function(){
                    model.debug.generateFieldName("helloWorld")
                    .should.be.exactly("K_HELLO_WORLD");
                });

                it("escape", function(){
                    model.debug.generateFieldName(model.debug.normalize("hello!world123!!!"))
                    .should.be.exactly("K_HELLO_WORLD123");
                });
            });
        });
    });
});
