/*
The MIT License (MIT) Copyright (c) 2014 Wekhrozo Medo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


var dimension = {
	GlobalWindowObj : function () {
		return window;
	},
	width : function () {
		var localWindow = this.GlobalWindowObj(),
		width = $(localWindow).width();
		localWindow = null;
		return width;
	},
	height : function () {
		var localWindow = this.GlobalWindowObj(),
		height = $(window).height();
		localWindow = null;
		return height;
	},
	computeCenter : function (custom) {
		var oneForth = Math.floor((this.width() - custom) / 2);
		return (oneForth > 0) ? oneForth : false;
	},
	percentageComputeCenter : function (custom) {
		var per = Math.floor((this.computeCenter(custom) / custom) * 100);
		return (per > 0) ? per : false;
	}
};
var TypeFunction = function (str) {
	return str();
};
var browser = {
	name : function (str) {
		if (navigator.appName.match('Opera'))
			return 'Opera';
		else if (navigator.appName.match('Mozilla'))
			return 'Mozilla';
		else if (navigator.appName.match('Netscape'))
			return 'Chrome';
		else
			return navigator.appName;
	},
	orientation : function (initial) {
		var prevOri = dimension.width();
		if (initial != prevOri)
			window.location = "?orentated";
	}
};
var filter = {
	integer : function (val) {
		var r = /[^0-9]/g;
		return val.replace(r, "");
	},
	loose : function (str) {
		var r = /[^a-z 0-9!.,?!$#()]/gi;
		return str.replace(r, "");
	}
};
var time = function () {
	'use strict';
	var d = new Date();
	var month = function () {
		return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	};
	var week = function () {
		return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
	};
	time.prototype.monthName = function (i) {
		return month()[i];
	};
	time.prototype.stringToMonth = function (string) {
		var i = 0,
		tmp = false;
		for (i = 0; i < month().length; i++) {
			if (month()[i] === string) {
				tmp = i;
			}
		}
		return tmp;
	};
	time.prototype.weekName = function (obj) {
		var newday = new Date(obj.year, obj.month, obj.date);
		return week()[newday.getDay()];
	};
	time.prototype.hrs = function () {
		var h = d.getHours();
		if (h > 12)
			h = h - 12;
		return h;
	};
	time.prototype.apm = function () {
		var m;
		if (d.getHours() > 12)
			m = 'pm';
		else
			m = 'am';
		return m;
	};
	time.prototype.mins = function () {
		var m = d.getMinutes();
		if (m < 10)
			m = '0' + m;
		return m;
	};
	time.prototype.secs = function () {
		var s = d.getSeconds();
		if (s < 10)
			s = '0' + s;
		return s;
	};
	time.prototype.date = function () {
		return d.getDate();
	};
	time.prototype.weeks = function () {
		var n = n || false;
		if (!n)
			return week()[d.getDay()];
		else
			return week()[n];
	};
	time.prototype.numWeeks = function () {
		return d.getDay();
	};
	time.prototype.months = function (n) {
		var n = n || false;
		if (!n)
			return month()[d.getMonth()];
		else
			return month()[n];
	};
	time.prototype.numMonths = function () {
		return d.getMonth();
	};
	time.prototype.years = function () {
		return d.getFullYear();
	};
};
var DOM = function (id) {
	var elem = document.getElementById(id);
	return elem;
};
var absolute = function (num) {
	return Math.abs(num);
};
var Store = function () {
	'use strict';
	var a,
	b,
	i,
	name,
	SetMethod,
	GetMethod;
	var p = JSON.stringify({
			"present" : "false"
		});
	try {
		if (typeof window.navigator.productSub === 'undefined')
			name = window.navigator.appName + "$IO$";
		else
			name = window.navigator.productSub + '$IO$';
	} catch (e) {
		name = 'LOCALSTORE_$IO$';
	}
	SetMethod = function (name, p) {
		sessionStorage.setItem(name, p);
	};
	GetMethod = function (name) {
		return sessionStorage.getItem(name);
	};
	(function () {
		var arr = new Array('memory', 'TODOLIST', 'DATA');
		for (i = 0; i < arr.length; i++) {
			if (!GetMethod(arr[i]))
				SetMethod(arr[i], p);
		}
	})();
	var init = function () {
		if (!GetMethod(name))
			SetMethod(name, p);
	};
	Store.prototype.get = function (a) {
		if (!a) {
			return GetMethod(name);
		} else {
			a = JSON.parse(GetMethod(a));
			return a;
		}
	};
	Store.prototype.set = function (a, b, c, d) {
		if ((b === false && typeof a === 'object') && (c === false && d === false)) {
			init();
			a = a || false;
			a1 = JSON.stringify(a[1]);
			SetMethod(a[0], a1);
		} else {
			init();
			var ss = JSON.stringify({
					present : a,
					conducted : b,
					time : c,
					percentage : d
				});
			SetMethod(name, ss);
		}
	};
	Store.prototype.show = function () {
		init();
		var a,
		b,
		c,
		d,
		ss = JSON.parse(this.get(false));
		if (ss.present === 'false') {
			return {
				"present" : 'empty'
			};
		} else {
			a = ss.present;
			b = ss.conducted;
			c = ss.time;
			d = ss.percentage;
			return {
				present : a,
				conducted : b,
				time : c,
				percentage : d
			};
		}
	};
};
var calculate = function (obj) {
	'use strict';
	var i,
	count = 0,
	present = obj.present || 0,
	total = obj.total || 0,
	need = obj.need || 0,
	percentage = 0;
	calculate.prototype = this;
	var percentage100 = (present / total) * 100;
	function evaluate() {
		for (i = 0; i < 3800; i++) {
			percentage = (present / total) * 100;
			if (percentage >= need && percentage <= (need + 1)) {
				count = i;
			}
			present++;
			total++;
		}
	}
	calculate.prototype.generate = function () {
		void evaluate();
		return {
			"thisStatus" : count,
			"thisPercentage" : Math.floor(percentage100) || parseInt(percentage100)
		};
	}
};
var writeHtml = function (type, attrs, childrenVarArgs) {
	var elements = document.createElement(type);
	for (var i = 2; i < arguments.length; i++) {
		var child = arguments[i];
		if (typeof child === 'string') {
			elements.appendChild(document.createTextNode(child));
		} else {
			if (child) {
				elements.appendChild(child);
			}
		}
	}
	if (typeof attrs === "string") {
		attrs = {
			id : attrs
		};
		for (var attr in attrs)
			elements.setAttribute(attr, attrs[attr]);
	} else {
		for (var attr in attrs) {
			if (attr === "className") {
				elements[attr] = attrs[attr];
			} else if (attr === "href") {
				elements[attr] = attrs[attr];
			} else if (attr === "title") {
				elements[attr] = attrs[attr];
			} else if (attr === "placeholder") {
				elements[attr] = attrs[attr];
			} else if (attr === "type") {
				elements[attr] = attrs[attr];
			} else if (attr === "value") {
				elements[attr] = attrs[attr];
			} else {
				elements.setAttribute(attr, attrs[attr]);
			}
			if (attr === "style") {
				elements[attr] = attrs[attr];
			}
		}
	}
	return elements;
};
var AddById = {
	IdRnd : function () {
		var num = Math.floor(11795 * (35701 * Math.random()) / (51307 * Math.random()));
		var apha = new Array('Skjhkl', 'XKjlkj', 'Enbhjygu', 'cJHgjjmh', 'RHkjhj', 'ZHJbH', 'qNBGkj', 'tLJgui', 'iKkjHGT', 'oJGRG', 'VytP');
		return apha[Math.floor(10 * Math.random())] + num + Math.floor(173570 * Math.random());
	},
	IdRndNum : function () {
		var num = Math.floor(117220503 * (35701 * Math.random()) / (5 * Math.random()));
		return Math.floor(10 * Math.random()) + num;
	},
	ChangeId : function (Id, Name) {
		var doc = DOM(Id);
		doc.id = Name;
		doc = null;
	},
	Name : function (Id, Name) {
		var doc = DOM(Id);
		doc.name = Name;
		doc = null;
	}
};
var viewChart = {
	draw : function (obj) {
		'use strict';
		var id = obj.id,
		value = obj.value,
		total = obj.total;
		var Data = [{
				value : value,
				color : '#5bf'
			}, {
				value : total,
				color : '#eee'
			}
		];
		var doc = document.getElementById(id).getContext("2d");
		return new Chart(doc).Doughnut(Data);
	}
};
var PChart = function (dataArray, labelArray, id) {
	var radii = function () {
		var width = dimension.width();
		var height = dimension.height();
		var returnData = 60;
		if (width <= 540) {
			returnData = width / 9;
		}
		if (height <= 440) {
			returnData = height / 9;
		}
		return returnData;
	};
	var pie = new RGraph.Pie({
			id : id,
			data : dataArray,
			options : {
				labels : {
					self : labelArray,
					sticks : {
						self : true,
						length : 5
					}
				},
				tooltips : labelArray,
				radius : radii(),
				strokestyle : 'transparent',
				exploded : [15]
			}
		}).roundRobin();
};
var memoryData = {
	fetchLen : function (a) {
		a = a.length;
		if (a >= 20)
			a = 20;
		else
			a = a;
		return a;
	},
	getLine : function (a) {
		var a = filter.loose(a) || false;
		if (a) {
			var b = [];
			for (i = 0; i < this.fetchLen(a); i++) {
				b[i] = a[i];
			}
			b = b.join("");
			if (this.fetchLen(a) == 20)
				b = b + '...';
			return b;
		}
	},
	createStore : function (a) {
		var index,
		bool = false,
		b = filter.loose(a) || false,
		c = this.getLine(a);
		var d = new Store();
		if (d.get('memory').present) {
			d.set(['memory', []], false, false, false);
		}
		var StoreArray = new Array();
		for (i = 0; i < d.get('memory').length; i++) {
			StoreArray[i] = d.get('memory')[i];
		}
		index = StoreArray.length;
		for (i = 0; i < StoreArray.length; i++) {
			if (StoreArray[i] === c) {
				bool = true;
			}
		}
		if (!bool) {
			StoreArray[i++] = c;
			d.set(['memory', StoreArray], false, false, false);
			d.set([c, [b, index]], false, false, false);
		}
	},
	deleteStore : function (a) {
		var bool = false,
		tmp1 = [],
		tmp2 = [],
		tmp3;
		var d = new Store();
		if (typeof a === 'object') {
			i = a.indexs || false;
			c = a.name || false;
			tmp1 = d.get('memory');
			for (tmp3 = 0; tmp3 < tmp1.length; tmp3++) {
				if (tmp3 == i) {
					tmp2[tmp3] = tmp1[i++];
					bool = true;
				} else if (bool) {
					tmp2[tmp3] = tmp1[i++];
				} else {
					tmp2[tmp3] = tmp1[tmp3];
				}
			}
			d.set(['memory', tmp2], false, false, false);
			localStorage.removeItem(c);
		}
	}
};
var cursorEvent = {
	action : function () {
		return new Array("progress", "pointer", "default");
	},
	target : function (a, b, c) {
		$('body').css('cursor', a);
		$('.cursorDefault').css('cursor', b);
		$('.cursorPointer').css('cursor', c);
	},
	actionMethod : function () {
		var data = [cursorEvent.action()[2], cursorEvent.action()[2], cursorEvent.action()[1]];
		cursorEvent.target(data[0], data[1], data[2]);
	},
	setTimeInterval : function (func) {
		setInterval(func, 1000);
	},
	progress : function () {
		var data = cursorEvent.action()[0];
		cursorEvent.target(data, data, data);
		cursorEvent.setTimeInterval(cursorEvent.actionMethod);
	}
};
function catchExp(bool) {
	try {
		if (!bool || typeof bool === 'undefined') {
			throw new bool;
		}
	} catch (bool) {
		console.log('GroupX : ' + bool);
	}
}
var leak = {
	ObjProperty : function (arrayList) {
		for (var i = 0; i < arrayList.length; i++) {
			delete arrayList[i];
		}
		this.VarData(i);
		return null;
	},
	VarData : function (val) {
		val = null;
		return;
	}
};
var bool = false;
var calender = {
	height : function () {
		'use strict';
		var adjustDetailWidth = function (id) {
			var MyScreenWidth = dimension.width();
			var MyScreenHeight = dimension.height();
			var computeWidth = function () {
				var length = Math.floor(MyScreenWidth / 92);
				for (var i = 1; i < (length - 1); i++) {
					var count = i * 3;
				}
				length = (length * 92) - ((length - 1) * 3);
				length = length - 10;
				return length;
			};
			if (MyScreenHeight > 200) {
				$('#detailHeight').css('overflow', 'hidden');
				$('#tdSizeIndex').css('height', (MyScreenHeight - 140) + 'px');
			}
			if (MyScreenWidth < 600) {}
		};
		adjustDetailWidth('#detailHeight');
		$('#month').css('height', (dimension.height() - 140) + 'px');
		$('body').css('overflow-y', 'scroll');
	},
	month : function (obj, obj1) {
		'use strict';
		var bool = false;
		var get = new time();
		var date = get.date();
		var month = get.months();
		var year = get.years();
		var week = get.weeks();
		function htmlmonth(obj) {
			var showToday = function () {
				$('#events').prepend(writeHtml('div', {
						className : 'zright fixed',
						id : 'today'
					}, writeHtml('div', {
							id : 'todayCard',
							className : 'textCenter redBg fontWhite cursorDefault fontVariant',
							title : 'Today'
						}, '')));
				$('#todayCard').append('<div class="">' + week + '<br/><b class="font30">' + date + '</b><br/>&nbsp;' + year + ' ' + month + '&nbsp;</div>');
			};
			if (!bool) {
				$('#events').append(writeHtml('div', {
						className : 'zbottom textCenter whiteBg zleft hideScrollY fixed p23 zIndex10',
						id : 'monthBottom'
					}, ''));
				bool = true;
			}
			$.each(obj, function (key, val) {
				var IdMonthBottom = $('#monthBottom');
				IdMonthBottom.css('width', (dimension.width() - 20) + 'px');
				IdMonthBottom.css('padding', '12px');
				IdMonthBottom.append(writeHtml('span', {
						id : AddById.IdRnd(),
						className : 'zleft w50 p3'
					}, writeHtml('a', {
							id : 'link' + key,
							href : '#' + key
						}, writeHtml('span', {
								className : 'activeMonth whiteBg bold black p10 fontVariant borderGrey boxShadow font15 textCenter borderRadius5'
							}, key))));
			});
			if (!bool) {
				showToday();
			}
			bool = true;
		}
		if (obj1) {
			htmlmonth(obj1);
			obj1 = false;
		}
		if (!obj1) {
			htmlmonth(obj);
		}
	},
	detail : function (obj, obj1) {
		'use strict';
		var bool = false;
		function htmldetail(obj, confYear) {
			$.each(obj, function (month, val) {
				$.each(val, function (days, details) {
					var uniqid = AddById.IdRnd();
					var thisDate = days,
					thisYear = confYear,
					thisMonth = new time().stringToMonth(month),
					nowWeek = new time().weekName({
							year : thisYear,
							month : thisMonth,
							date : thisDate
						});
					$('#events').append(writeHtml('div', {
							className : '' + month + ' relative detail' + uniqid
						}, writeHtml('div', {
								className : 'detail  boxShadow e' + month,
								id : uniqid
							}, '')));
					$('#' + uniqid).html('<table class="p3"><tr><td class="middle">'
						 + '<div class="textCenter fontVaraint fontSilver font11"><div class="fontGreen fontVariant p3 white">' + nowWeek + '</div><div class="font24 universalColor p3 SegoeUI">' + days + '</div><div class="fontVariant font11 p3">' + month + '&nbsp;' + thisYear + '</div></div>'
						 + '</td><td class="middle"><div class="textLeft p5 black">' + details + '</div></td></tr></table>');
					$('#' + uniqid).click(function () {
						$('#' + uniqid).css('background-color', '#f2f2f2');
						(function () {
							$('#events').append(writeHtml('div', {
									className : 'cursorPointer absolute whiteBg boxShadow',
									id : 'centerDetail'
								}, ''));
							$("#centerDetail").slideDown('fast');
							(function () {
								var topValue = function () {
									var dim = dimension.height();
									if (dim < 500 && dim > 200) {
										return (dim / 100) + '%';
									} else {
										return '23%';
									}
								};
								$('#centerDetail').html(writeHtml('div', {
										className : 'textLeft font13 fixed whiteBg scrollY zleft p23 zIndex10 boxShadowGrey black',
										id : 'close' + uniqid
									}, '')).css('top', topValue());
							})();
							$('#close' + uniqid).html('<table id="ifGreaterThan600" class="h100p textCenter marginAuto w100p"><tr><td class="middle font30"><div class="zright ztop absolute p5"><img class="borderRadius5 boxShadow" src="./images/close.png" width="40px" height="40px"/></div><div class="greyBg textCenter boxShadow fontVaraint relative ztop marginAuto"><span class="fontSilver"><div class="fontGreen fontVariant p5 white">' + nowWeek + '</div></span><div class="font60">' + days + '<br/></div><div class="fontSilver fontVariant p3">' + month + '&nbsp;' + thisYear + '</div></div></td></tr><tr><td><div class="p5 textLeft">' + details + '</div></td></tr></table><br/><br/>');
							if (dimension.width() > 580) {
								$('#ifGreaterThan600').css('max-width', '540px');
							}
							$('#close' + uniqid).css('width', '100%').css('height', dimension.height() - 100 + 'px').css('top', '106px');
						})();
						$('#close' + uniqid).click(function () {
							$("#centerDetail").hide('fast');
						});
					});
				});
			});
			bool = true;
		}
		if (!bool) {
			htmldetail(obj, 2014);
			obj = false;
		}
		if (!obj) {
			htmldetail(obj1, 2015);
		}
		(function () {
			'use strict';
			var params;
			if (dimension.width() <= 540) {
				params = {
					id : "#detailHeight",
					position : "relative"
				};
			} else {
				params = {
					id : "#events",
					position : "relative"
				};
			}
			$(params.id).prepend(writeHtml('div', {
					id : 'calenderMonth'
				}, ''));
			var fullMonthName = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
			function showTheMonth() {
				var tm = new time();
				function dislight(StrMonth, fullMonth) {
					$('#calenderMonth').html('<div class="zleft ' + params.position + ' w100p textCenter"><div class="p15 font15 fontVariant universalColor zIndex10">' + fullMonth + '</div></div><div class="font11 fontSilver globalfont ">St.Joseph`s College</div><br/>');
					for (var i = 0; i < 12; i++) {
						if (tm.monthName(i) === StrMonth) {
							$('.' + tm.monthName(i)).slideDown('slow').css('display', 'block');
						} else {
							if (dimension.width() <= 540) {
								$('.' + tm.monthName(i)).css('display', 'none');
							} else {
								$('.' + tm.monthName(i)).css('display', 'none');
							}
						}
					}
					cursorEvent.progress();
				}
				(function () {
					'use strict';
					var month = tm.monthName(new Date().getMonth());
					window.location = '#' + month;
					dislight(month, fullMonthName[new Date().getMonth()]);
				})();
				$('#linkJan').click(function () {
					dislight('Jan', fullMonthName[0]);
				});
				$('#linkFeb').click(function () {
					dislight('Feb', fullMonthName[1]);
				});
				$('#linkMar').click(function () {
					dislight('Mar', fullMonthName[2]);
				});
				$('#linkApr').click(function () {
					dislight('Apr', fullMonthName[3]);
				});
				$('#linkMay').click(function () {
					dislight('May', fullMonthName[4]);
				});
				$('#linkJun').click(function () {
					dislight('Jun', fullMonthName[5]);
				});
				$('#linkJul').click(function () {
					dislight('Jul', fullMonthName[6]);
				});
				$('#linkAug').click(function () {
					dislight('Aug', fullMonthName[7]);
				});
				$('#linkSept').click(function () {
					dislight('Sept', fullMonthName[8]);
				});
				$('#linkOct').click(function () {
					dislight('Oct', fullMonthName[9]);
				});
				$('#linkNov').click(function () {
					dislight('Nov', fullMonthName[10]);
				});
				$('#linkDec').click(function () {
					dislight('Dec', fullMonthName[11]);
				});
			}
			showTheMonth();
		})();
	}
};
var attendanceEngine = {
	height : function () {
		$('#tableCalculate').css('height', (dimension.height() - 133) + 'px').css('z-index', '10').css('width', '99%');
	},
	enterData : function () {
		var uniqid = AddById.IdRnd();
		var IdShowCalculate = $('#showCalculate');
		IdShowCalculate.prepend(writeHtml('div', {
				className : 'p3 black textCenter font15',
				id : 'textHeader'
			}, ''));
		$('#textHeader').append('<br/><span class="fontVariant">One subject attendance at a Time</span><div class="font11 fontSilver globalfont">St.Joseph`s College</div>');
		IdShowCalculate.append(writeHtml('div', {
				className : 'textCenter w270',
				id : 'input' + uniqid
			}, ''));
		(function (inputForm) {
			'use strict';
			IdShowCalculate.append(writeHtml('div', {
					className : 'textCenter w100p',
					id : 'textBox' + uniqid
				}, writeHtml('div', {
						id : 'labelInput1',
						className : 'p3'
					}, '')));
			$('#labelInput1').append(writeHtml('div', {}, writeHtml('div', {
						id : 'appendInput1',
						className : 'DisplayInline fontSilver fontVariant w100p'
					}, '')));
			$('#appendInput1').append(writeHtml(inputForm, {
					type : 'text',
					className : 'borderNone black w93p p20_10 font24 fontVariant boxShadow',
					placeholder : 'Present',
					id : 'userPresentData',
					value : ''
				}, ''));
			$('#labelInput1').append(writeHtml('div', {}, writeHtml('div', {
						id : 'appendInput2',
						className : 'DisplayInline fontSilver fontVariant w100p'
					}, '')));
			$('#appendInput2').append(writeHtml(inputForm, {
					type : 'text',
					className : 'borderNone black w93p p20_10 font24 fontVariant boxShadow',
					placeholder : 'Total',
					id : 'userTotalData',
					value : ''
				}, ''));
			$('#labelInput1').append('<br/>');
			$('#labelInput1').append(writeHtml('button', {
					type : 'button',
					className : 'cursorPointer checkButton w100p',
					id : 'userCheckButton'
				}, ''));
			$('#userCheckButton').html('<div class="font15 white p20_10">CALCULATE</div>');
			$('#calculate').append(writeHtml('div', {
					className : 'font11 fixed zbottom textCenter w100p fontSilver boxShadow p10',
					id : 'footerBrief'
				}, 'Calculate your attendance percentage and more.'));
		})('input');
		$('#textBox' + uniqid).append('<div class="textLeft p10 font11 fontSilver fontVariant">Present : Your attendance.<br/>Total &nbsp;&nbsp;&nbsp;&nbsp;: Total number of class conducted.</div>');
	},
	EventHandler : function () {
		'use strict';
		var bool = false;
		$('#HeaderID').html(writeHtml('div', {
				className : 'fixed w100p font15 fontVariant ztop textCenter zIndex100 boxShadow',
				id : 'warningText'
			}, ''));
		window.location = '#showCalculate';
		var warningText = function (val) {
			var comment = "";
			bool = true;
			if (!parseInt(val)) {
				comment = 'Please enter a number';
			}
			if (parseInt(val) === 0) {
				comment = "Zero is not valid";
			}
			if (!parseInt(val) && val === '') {
				comment = "Please enter a number";
			}
			if (val >= 90) {
				comment = 'Should not exceed 90';
			}
			if (comment.length >= 1) {
				comment = writeHtml('div', {
						className : 'white redBg p5',
						id : 'warningID1'
					}, comment);
				$('#welcomeHome').css('top', '30px');
				$('#tableCalculate').css('margin-top', '30px');
				$('#MainMenu').css('top', '86px');
				bool = false;
			} else {
				comment = writeHtml('div', {
						className : 'white redBg',
						id : 'warningID1'
					}, '');
				$('#welcomeHome').css('top', '0px');
				$('#tableCalculate').css('margin-top', '0px');
				$('#MainMenu').css('top', '55px');
			}
			return {
				bool : bool,
				comment : comment
			};
		};
		$('#userPresentData').keyup(function () {
			$('#warningText').html(warningText(filter.integer(DOM('userPresentData').value)).comment);
			$('#warningID1').hide();
			$('#warningID1').slideDown('fast');
		});
		$('#userTotalData').keyup(function () {
			$('#warningText').html(warningText(filter.integer(DOM('userTotalData').value)).comment);
			$('#warningID1').hide();
			$('#warningID1').slideDown('fast');
		});
		$('#userCheckButton').click(function () {
			var inputPresent = parseInt(filter.integer(DOM('userPresentData').value)) || false;
			var inputConducted = parseInt(filter.integer(DOM('userTotalData').value)) || false;
			var present = warningText(inputPresent) || false;
			var conducted = warningText(inputConducted) || false;
			if ((present.bool && conducted.bool) && (inputPresent <= inputConducted)) {
				attendanceEngine.evaluateData();
				$('#welcomeHome').css('top', '0px');
			} else {
				$('#warningText').html(writeHtml('div', {
						className : 'white p5 redBg'
					}, 'Please check again'));
				$('#warningText').hide();
				$('#warningText').slideDown('fast');
				$('#welcomeHome').css('top', '30px');
			}
			$('#footerBrief').hide();
			cursorEvent.progress();
		});
	},
	evaluateData : function () {
		var present = filter.integer(DOM('userPresentData').value) || false;
		var total = filter.integer(DOM('userTotalData').value) || false;
		var for75Data = String(new calculate({
					present : present,
					total : total,
					need : 75
				}).generate().thisStatus) || false;
		var for80Data = String(new calculate({
					present : present,
					total : total,
					need : 80
				}).generate().thisStatus) || false;
		var for85Data = String(new calculate({
					present : present,
					total : total,
					need : 85
				}).generate().thisStatus) || false;
		var for90Data = String(new calculate({
					present : present,
					total : total,
					need : 90
				}).generate().thisStatus) || false;
		var for95Data = String(new calculate({
					present : present,
					total : total,
					need : 95
				}).generate().thisStatus) || false;
		var for100percentage = String(new calculate({
					present : present,
					total : total,
					need : 100
				}).generate().thisPercentage) || false;
		$('#showCalculate').append(writeHtml('div', {
				className : 'font15 relative tLightYellowBg',
				id : 'showGraphicsInterface'
			}, ''));
		var AddMarksShow = function (val) {
			var marks = 0;
			if (val <= 75)
				marks = 0;
			else if (val > 75 && val <= 80)
				marks = '+1';
			else if (val > 80 && val <= 85)
				marks = '+2';
			else if (val > 85 && val <= 90)
				marks = '+3';
			else if (val > 90 && val <= 95)
				marks = '+4';
			else if (val > 95 && val <= 100)
				marks = '+5';
			return marks;
		};
		(function (centralId) {
			'use strict';
			var uniqid = AddById.IdRnd();
			var canvasResize = function (id) {
				$('#' + id).css('width', '50px');
				$('#' + id).css('height', '50px');
			};
			$(centralId).html(writeHtml('div', {
					className : 'p3',
					id : 'list' + uniqid
				}, ''));
			$('#list' + uniqid).append('<div class="p3 font15" id="SummaryPerNumMarks"><br/><div class="textLeft black fontVariant">Detail:</div><table class="w100p textCenter"><tr><td class="middle">' + '<div class="p5 textCenter">Percentage<div class=" p3">' + for100percentage + '%</div></div>'
				 + '</td><td class="middle">' + '<div class="p3 "><div class="p3">Present&nbsp;:&nbsp;<span class="font13">' + present + '</span>&nbsp;Class</div><div class="p3">Absent&nbsp;&nbsp;:&nbsp;<span>' + (total - present) + '</span> Class</div></div>'
				 + '</td><td class="middle">' + '<div class="p5 textCenter">Add. Marks<div class="p3"><span>' + AddMarksShow(for100percentage) + '</span>&nbsp;<span class="font11">Marks</span></div></div>'
				 + '</td></td></tr></table></div>');
			var idForResult = function (obj) {
				var id = obj.id,
				idGen = obj.idGen,
				forValue = obj.forValue,
				forDataValue = obj.forDataValue;
				$(id).append(writeHtml('div', {
						className : 'p5 ',
						id : 'idFor' + idGen
					}, '')).hide();
				$('#idFor' + idGen).html(writeHtml('table', {
						className : 'p3 w100p borderBottom',
						id : 'list' + idGen
					}, writeHtml('tr', {
							className : '',
							id : 'forTr' + idGen
						}, '')));
				$('#forTr' + idGen).append(writeHtml('td', {
						className : 'p5 w50 middle',
						id : 'forTd1' + idGen
					}, ''));
				$('#forTd1' + idGen).append('<canvas id="piChart' + idGen + '" width="120px" height="120px"></canvas>');
				$('#forTd1' + idGen).append(writeHtml('div', {
						style : 'z-index:100;margin-top: -37px;margin-left: 13px;',
						className : 'absolute font15 fontBlue'
					}, forValue + '%'));
				$('#forTr' + idGen).append(writeHtml('td', {
						className : 'p10 middle',
						id : 'forTd2' + idGen
					}, writeHtml('div', {
							id : 'content' + idGen
						}, '')));
				if (forDataValue > 0) {
					$('#content' + idGen).html('<div class="p5"><ul><li><span class="universalColor">You need <b>' + forDataValue + '</b> Class(approx.).</span></li><li><div class="fontSilver">(&nbsp;To obtain above ' + forValue + '% attendance&nbsp;)</li></ul></div></div>');
				} else {
					$('#content' + idGen).html('<div class="p5"><div class="fontGold fontVariant font15"><img src="./images/smiley.png" style="width:17px"/>&nbsp;OUTSTANDING!</div> You&nbsp;have&nbsp;above&nbsp;<b>' + forValue + '&nbsp;%</b>&nbsp;attendance.<span> Happy&nbsp;to&nbsp;see&nbsp;you&nbsp;working&nbsp;like&nbsp;that.</span></div>');
				}
				$(id).fadeIn('slow');
			};
			(function (idB) {
				'use strict';
				$('#SummaryPerNumMarks').append(writeHtml('div', {
						className : 'textCenter whiteBg',
						id : 'forLineChartCanvas'
					}, ''));
				$('#SummaryPerNumMarks').append(writeHtml('div', {
						id : 'forLineChartButtonDiv',
						className : 'p3'
					}, ''));
				$('#forLineChartButtonDiv').html(writeHtml('div', {
						className : 'p15 pointer textCenter boxShadow listPer whiteBg font15 black fontVariant bold',
						id : 'forLineChartButton'
					}, 'View Chart'));
				$('#forLineChartButton').click(function () {
					$('#forLineChartCanvas').slideDown('slow');
				});
				$('#forLineChartCanvas').click(function () {
					$('#forLineChartCanvas').slideUp('slow');
				});
				var smartScreenCheck = {
					width : function () {
						return (dimension.width() > 500) ? 470 : (dimension.width() - 50);
					},
					height : function () {
						return (dimension.height() > 500) ? 350 : (dimension.width() / 2);
					}
				};
				$('#forLineChartCanvas').html('<canvas class="whiteBg" id="' + idB + '" width="' + smartScreenCheck.width() + 'px" height="' + smartScreenCheck.height() + 'px" class="relative"></canvas>').hide();
				var returnCalArray = {
					SmallScreen320 : function (data) {
						if (dimension.width() <= 340) {
							if (data === 'Class') {
								return '';
							}
							if (data === 'Above') {
								return '+';
							}
						} else {
							return ' ' + data + ' ';
						}
					},
					data : function () {
						var myArray = [],
						comment = [];
						if (for75Data > 0) {
							myArray.push(parseInt(for75Data) + 20);
							comment.push(' \t\n' + for75Data + returnCalArray.SmallScreen320('Class') + '(75%)\n\t ');
						} else {
							myArray.push(75);
							comment.push(returnCalArray.SmallScreen320('Above') + '75%');
						}
						if (for80Data > 0) {
							myArray.push(parseInt(for80Data) + 20);
							comment.push(' \t\n' + for80Data + returnCalArray.SmallScreen320('Class') + '(80%)\n\t ');
						} else {
							myArray.push(80);
							comment.push(returnCalArray.SmallScreen320('Above') + '80%');
						}
						if (for85Data > 0) {
							myArray.push(parseInt(for85Data) + 20);
							comment.push(' \t\n' + for85Data + returnCalArray.SmallScreen320('Class') + '(85%)\n\t ');
						} else {
							myArray.push(85);
							comment.push(returnCalArray.SmallScreen320('Above') + '85%');
						}
						if (for90Data > 0) {
							myArray.push(parseInt(for90Data) + 20);
							comment.push('\t \n' + for90Data + returnCalArray.SmallScreen320('Class') + '(90%)\n \t');
						} else {
							myArray.push(90);
							comment.push(returnCalArray.SmallScreen320('Above') + '90%');
						}
						if (for95Data > 0) {
							myArray.push(parseInt(for95Data) + 20);
							comment.push('\t \n' + for95Data + returnCalArray.SmallScreen320('Class') + '(95%)\n \t');
						} else {
							myArray.push(95);
							comment.push(returnCalArray.SmallScreen320('Above') + '95%');
						}
						return {
							myArray : myArray,
							comment : comment
						};
					}
				};
				PChart(returnCalArray.data().myArray, returnCalArray.data().comment, idB);
			})('BarGraphUI');
			var forEachList = function (val, forData) {
				idForResult({
					id : '#list' + uniqid,
					idGen : val,
					forValue : val,
					forDataValue : forData
				});
				viewChart.draw({
					id : 'piChart' + val,
					value : parseInt(forData),
					total : 100
				});
				canvasResize('piChart' + val);
				leak.ObjProperty(viewChart);
				leak.VarData(viewChart);
			}
			var boolList = false;
			TypeFunction(function () {
				if (for75Data != 0) {
					forEachList(75, for75Data);
					boolList = false;
				} else
					boolList = true;
			});
			TypeFunction(function () {
				if (for80Data != 0) {
					forEachList(80, for80Data);
					boolList = false;
				} else
					boolList = true;
			});
			TypeFunction(function () {
				if (for85Data != 0) {
					forEachList(85, for85Data);
					boolList = false;
				} else
					boolList = true;
			});
			TypeFunction(function () {
				if (for90Data != 0) {
					forEachList(90, for90Data);
					boolList = false;
				} else
					boolList = true;
			});
			TypeFunction(function () {
				if (for95Data != 0) {
					forEachList(95, for95Data);
					boolList = false;
				} else
					boolList = true;
			});
			if (boolList) {
				forEachList(95, 0);
			}
		})('#showGraphicsInterface');
	}
};
var $domain = {
	init : function () {
		$('#welcomeHome').append(writeHtml('div', {
				className : 'fixed zIndex100 textCenter w100p',
				id : 'homeCenter'
			}, ''));
		$('#detailHeight').hide();
	},
	name : function ($bg) {
		return '<div id="home" class="' + $bg + ' font24 zIndex10 SegoeUI"><table id="GoHomeNow" class="p3"><tr><td><div class="black textShadow " id="ChangeDomainName"><div class=" marginTop20 p10 black font40 ">'
		 + '</div></div></td></tr></table><div id="GoBackHome" class="hide pointer ztop absolute zright p10"></div></div>';
	},
	body : function () {
		$('head').append('<title>IOberry</title>');
		function homeMenu321() {
			return '<table id="MainMenu" class="blue fontVariant boxShadow zIndex100 fixed ztop font15 w100p whiteBg"><tr><td>'
			 + '<div id="HomeAttendance" class="p10 whiteBg pointer p3">Attendance</div></td><td>'
			 + '<div id="HomeCalender" class="p10 whiteBg pointer p3">Calender&nbsp;&nbsp;</div></td><td>'
			 + '<div id="HomeSkyweb" class="p10 whiteBg pointer p3">SJC&nbsp;&nbsp;&nbsp;</div></td></tr></table>';
		}
		function bodyFooter() {
			return '<div style="margin-top:120px;" class="fontSilver font20 fontVariant">' + 'IOberry App<br/>'
			 + 'College year calender and Calculate the class you had attended.'
			 + '</div>'
			 + '<div class="w100p p5 fixed zbottom font40 textShadow blue"><span class="blueBg white borderRadius5">&nbsp;IO&nbsp;</span>berry<br/><br/><br/></div>'
			 + '<div class="boxShadow font11 fixed zbottom fontSilver p15 w100p fontVariant textLeft">'
			 +
			AboutIOberry.AppName + '<br/>'
			 +
			AboutIOberry.Info + '<br/>'
			 +
			AboutIOberry.contact + '<br/>'
			 +
			AboutIOberry.License
			 + '</div>';
		}
		var determin = {
			menu : function () {
				return homeMenu321();
			},
			home : function () {
				return bodyFooter();
			}
		};
		$('body').append(determin.menu());
		$('#home').append(determin.home());
	}
};
var IdWelcomeHome = $('#welcomeHome');
var IdHomeCenter = $('#homeCenter');
var home = '#welcomeHome';
var TreeModule = {
	HomeAttendance : function () {
		loading('bodyUI', 'calculate');
		attendanceEngine.height();
		$('#calender').hide();
		$('#about').hide();
		$('#events').html('');
		$('#calenderMonth').html('');
		IdWelcomeHome.html('');
		attendanceEngine.enterData();
		attendanceEngine.EventHandler();
		IdWelcomeHome.html($domain.name('tGreyBg')).css('width', '100%').css('top', '0px');
		IdHomeCenter.css('top', '5px');
		$('#MainMenu').css('top', '50px');
		$('#calculate').css('top', '33px').css('position', 'relative');
		$('#HomeAttendance').css('border-bottom', '4px solid #17A3B7');
		$('#HomeCalender').css('border-bottom', '4px solid #fff');
		$('#ChangeDomainName').html('<table class="middle boxShadow p3 borderRadius5"><tr><td><img src="./images/back.png" style="width:10px;height:25px;"/></td><td>&nbsp;<span><span class="blueBg white borderRadius5 p3">IO</span><span class="blue">berry</span></span></td></tr></table>');
		$('#GoBackHome').show();
		$('#ChangeDomainName').click(function () {
			window.location = "?";
		});
	},
	HomeCalender : function () {
		loading('bodyUI', 'calender');
		calender.height();
		$('#detailHeight').fadeIn();
		$('#calculate').hide();
		$('#about').hide();
		$('#showCalculate').html('');
		IdWelcomeHome.html('');
		calender.month(SJCdata14, SJCdata15);
		calender.detail(SJCdata14, SJCdata15);
		IdWelcomeHome.html($domain.name('tGreyBg')).css('width', '100%').css('top', '0px');
		IdHomeCenter.css('top', '5px');
		$('#MainMenu').css('top', '50px');
		$('#calender').css('border-bottom', '4px solid #17A3B7');
		$('body').css('position', 'relative').css('top', '35px');
		$('#HomeCalender').css('border-bottom', '4px solid #17A3B7');
		$('#HomeAttendance').css('border-bottom', '4px solid #fff');
		$('#ChangeDomainName').html('<table class="middle boxShadow p3 borderRadius5"><tr><td><img src="./images/back.png" style="width:10px;height:25px;"/></td><td>&nbsp;<span><span class="blueBg white borderRadius5 p3">IO</span><span class="blue">berry</span></span></td></tr></table>');
		$('#GoBackHome').show();
		$('#ChangeDomainName').click(function () {
			window.location = "?";
		});
	},
	HomeWeb : function () {
		$('#calender').hide();
		$('#calculate').hide();
		loading('bodyUI', 'webApi');
	}
};
$('.backgroundImage').css('background-size', dimension.width() + 'px ' + dimension.height() + 'px');
var loading = function (bodyId, targetId) {
	var IdS = [$('#' + bodyId), $('#' + targetId)];
	IdS[0].hide();
	IdS[1].hide();
	IdS[0].fadeIn('slow');
	IdS[1].fadeIn('slow');
};
(function (home, $domain) {
	var initial = dimension.width();
	var mem = new Store();
	var BGIM = function () {
		$('#BGIM').html('<div class="backgroundImage fixed h100p w100p"></div>');
		$('.backgroundImage').css('background-size', dimension.width() + 'px ' + dimension.height() + 'px');
	};
	var cleanUpHtml = function (params) {
		for (var i = 0; i <= params.length; i++) {
			$('#' + params).html('');
		}
	};
	var memName = 'MyPathRes',
	attendanceName = 'att01',
	calenderName = 'cal01',
	aboutName = 'abt01',
	homeName = 'hom01',
	counter = 0;
	mem.set([memName, homeName]);
	$domain.init();
	$('#homeCenter').html($domain.name());
	$('#calculate').hide();
	$('#calender').hide();
	$domain.body();
})('#welcomeHome', $domain);
var GLOBAL = {
	HOME : function () {
		TreeModule.HomeAttendance();
	},
	CALENDER : function () {
		TreeModule.HomeCalender();
	},
	ABOUT : function () {
		TreeModule.HomeAbout();
	}
};
var html = document.getElementById('bodyUI').innerHTML;
var att = true, cal = true, abt = true;
$('#HomeAttendance').click(function () {
	if (att) {
		$('bodyUI').html(html);
		GLOBAL.HOME();
		att = false;
		cal = true;
		abt = true;
	}
});
$('#HomeCalender').click(function () {
	if (cal) {
		$('bodyUI').html(html);
		GLOBAL.CALENDER();
		att = true;
		cal = false;
		abt = true;
	}
});
$("#HomeSkyweb").click(function () {
	window.open("http://sjc.ac.in");
});
