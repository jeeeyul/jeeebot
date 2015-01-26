/* globals it:false, describe:false, it:false */
require("should");

var path = require("path");

describe("xcode-io", function(){
	var fixture = {
		SCRIPT_INPUT_FILE_COUNT : 1,
		SCRIPT_INPUT_FILE_0 : path.join(__dirname, "dummy-input", "*.txt"),
		SCRIPT_OUTPUT_FILE_COUNT : 1,
		SCRIPT_OUTPUT_FILE_0 : "out-1.txt"
	};
	var xcodeIOs = require("../lib/xcode-io")(fixture);

	describe("input", function(){
		it("count", function(){
			xcodeIOs.inputs.length.should.be.exactly(2);
		});

		it("file 1", function(){
			xcodeIOs.inputs[0].should.be.exactly(path.join(__dirname, "dummy-input", "1.txt"));
		});

		it("file 2", function(){
			xcodeIOs.inputs[1].should.be.exactly(path.join(__dirname, "dummy-input", "2.txt"));
		});
	});

	describe("output", function(){
		it("count", function(){
			xcodeIOs.outputs.length.should.be.exactly(1);
		});

		it("output file 1", function(){
			xcodeIOs.outputs[0].should.be.exactly("out-1.txt");
		});
	});
});
