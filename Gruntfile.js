/*global module:false*/
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: ["dist/"],
        copy: {
            source: {
                files: [{
                    expand: true,
                    cwd: 'src/', 
                    src: ['**'], 
                    dest: 'dist/'
                }],
            },
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components',
                    src: ['jquery/jquery.min.js'],
                    dest: 'demo/'
                }]
            }
        },
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

    grunt.registerTask('default', ['clean', 'jshint', 'qunit', 'copy', 'uglify']);
};