module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bless');

	var root = './htdocs';
	var asset = root + '/assets';
	var images = asset + '/img';
	var imagesDummy = asset + '/img_dummy';
	var styles = asset + '/css';
	var stylesDev = asset + '/css_dev';
	var scripts = asset + '/js';
	var scriptsDev = asset + '/js_dev';
	var page_specific_map = grunt.file.readJSON(scriptsDev + '/page_specific/page_specific_map.json');

	grunt.initConfig({

		path: {
			root: root,
			asset: asset,
			images: images,
			imagesDummy: imagesDummy,
			styles: styles,
			stylesDev: stylesDev,
			scripts: scripts,
			scriptsDev: scriptsDev
		},

		clean: {
			src: [scripts, styles]
		},

		sass: {
			devel: {
				options: { style: 'expanded' },
				src: stylesDev + '/base.scss',
				dest: styles + '/base.css'
			},
			deploy: {
				options: { style: 'compressed' },
				src: stylesDev + '/base.scss',
				dest: styles + '/base.css'
			}
		},

		bless: {
			bless: {
				options: {
					compress: false,
					cacheBuster: false
				},
				src: [styles + '/base.css'],
				dest: styles + '/base.css'
			}
		},

		copy: {
			js: {
				files: [
					{
						expand: true,
						cwd: scriptsDev,
						src: '**',
						dest: scripts
					}
				]
			}
		},

		watch: {
			options: {
				debounceDelay: 200
			},
			css: {
				files: stylesDev + '/**',
				tasks: ['sass:devel', 'bless']
			},
			js: {
				files: scriptsDev + '/**',
				tasks: ['copy:js']
			}
		},

		requirejs: {
			js: {
				options: {
					appDir: scriptsDev,
					baseUrl: './',
					mainConfigFile: scriptsDev + '/main.js',
					optimize: 'uglify2',
					generateSourceMaps: true,
					dir: scripts,
					modules: (function () {
						var modules = [{ name: 'main' }];
						for (var key in page_specific_map) {
							if (page_specific_map.hasOwnProperty(key)) {
								modules.push({
									name: 'page_specific/' + key,
									exclude: ['main']
								});
							}
						}
						return modules;
					})(),
					preserveLicenseComments: false
				}
			}
		},

		concat: {
			requirejs: {
				src: [scripts + '/libs/require.js', scripts + '/main.js'],
				dest: scripts + '/libs/require.js'
			}
		}

	});

	grunt.registerTask('default', ['clean', 'sass:devel', 'bless', 'copy', 'watch']);
	grunt.registerTask('deploy' , ['clean', 'sass:deploy', 'bless', 'requirejs']);

};
