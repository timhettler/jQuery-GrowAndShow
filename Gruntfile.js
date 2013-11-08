/*global module:false*/
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            compile: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/*.js']
                }
            }
        },
        qunit: {
            all: ['test/**/*.html']
        },
        jshint: {
            src: ['src/**/*.js'],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
        }
    });

    grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);
};