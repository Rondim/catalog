/**
 * Created by xax on 08.03.2017.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jsdoc : {
            dist : {
                src: [
                    './src/*.js',
                    './src/actions/*.js',
                    './src/actions/functions/*.js',
                    './src/components/*.js',
                    './src/reducers/*.js',
                    './src/containers/*.js'
                ],
                jsdoc: './node_modules/.bin/jsdoc',
                options: {
                    destination: 'doc',
                    configure: './node_modules/jsdoc/conf.json',
                    template: './node_modules/ink-docstrap/template'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');

};