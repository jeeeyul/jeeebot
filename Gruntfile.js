module.exports = function (grunt) {
	grunt.initConfig({
		mochaTest: {
			testCases : ["test/*.js"],
			options : {
				reporter : "spec"
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-mocha-test");

	grunt.registerTask("default", ["mochaTest:testCases"]);
};
