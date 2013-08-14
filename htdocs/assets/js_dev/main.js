require.config({
	baseUrl: '/assets/js',
	shim: {
		'jquery': {
			exports: 'jQuery'
		},
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'iroha': {
			deps: ['jquery'],
			exports: 'Iroha'
		}
	},
	paths: {
		'text': 'libs/text',
		'jquery': 'libs/jquery-1.10.2',
		'underscore': 'libs/underscore',
		'backbone': 'libs/backbone',
		'iroha': 'libs/iroha'
	}
});


require([
	'page_specific/page_specific'
]);

require(['iroha', 'jquery', 'underscore', 'backbone'],
function (Iroha,   $,        _,            Backbone) {


	$(function () {


		console.log('main.js is loaded.');


	});


});
