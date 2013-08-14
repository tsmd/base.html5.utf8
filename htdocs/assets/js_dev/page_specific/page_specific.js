require(['underscore', 'text!page_specific/page_specific_map.json'],
function (_,            map) {


	var specifics = JSON.parse(map);
	var path = '/assets/js/page_specific';

	var myScreenId = getScreenId();
	if (myScreenId) {
		_(specifics).each(function (val, key) {
			_(val).each(function (sid) {
				if (sid === myScreenId) {
					require([path + '/' + key + '.js']);
				}
			});
		});
	}

	function getScreenId() {
		return /^sid-(.+)/.test(document.body.id) ? RegExp.$1 : '';
	}


});
