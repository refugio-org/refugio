'use strict';


module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        express: {
            options: {
                port: process.env.PORT || 3000
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            },
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            express: {
                files: [
                    './jade/**/*.jade',
                    './routes/{,*//*}*.js',
                    './server.js'
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'express',
        'watch'
    ]);
}