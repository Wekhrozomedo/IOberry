(function () {
	/*
	 * Get http request in frame
	 * @param {object:path, url, tag; optional:{width and height} }
	 */
	this.webS = {
		http : function (param) {
			'use strict';
			this.url = param.url || false;
			this.id = '#' + param.id || false;
			var tag = param.tag || false;
			var width = param.width || window.innerWidth;
			var height = param.Height || window.innerHeight;
			if (tag) {
				var elements = document.createElement(tag);
				elements.src = this.url;
				elements.width = width + 'px';
				elements.height = height + 'px';
				elements.style.border = 'none';
				this.elements = elements;
				elements = null;
			}
		},
		/*
		 * @param{object}
		 */
		frameOne : function (param) {
			var id = param.id || false;
			var val = param.val;
			var span = function (val) {
				return '<span><div class="p3 twhiteBg">' + val + '</div></span>';
			}
			 || false;
			if (span && id) {
				$.each(val, function (name, val) {
					$(id).append(span(val));
				});
			}
		}
	}
	/*
	 * web http protocol
	 */
	var wh = webS.http.prototype;
	wh.html = function () {
		$(this.id).html(this.elements);
	};
	wh.append = function () {
		$(this.id).append(this.elements);
	};
	wh.prepend = function () {
		$(this.id).prepend(this.elements);
	};
})();
