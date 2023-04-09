/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.3 
	======!!! MODIFIED by mighty Art===========
*/


/*
помощь.
шаблон - 0 - цифры
шаблон - a,A - лат .русск. алфавит
шаблон - x,X - любой символ
символ - ! для ввода служебных символов 0,а,А,х,Х ввиде фиксированных
	пример !а - фикс. а , !0 - фикс. 0 
символ -[любой]- фиксированный символ


преопределенный
 шаблон - mail - заменяется на r\\w{1,}@\\w{2,}[.]\\w{2,}
 шаблон - date - заменяется на 00.00.2!010
 

префикс шаблона \ - указывает что шаблон регулярное выражение
префикс шаблона r - указывает что шаблон регулярное выражение
 
суффикс шаблона L - позволяет вводить больше символов чем в шаблоне
	пример 00-00L 
	
аттрибуты полей ввода
 аттрибут - maskhelp - текст подсказка для вывода вместо шаблона	
 аттрибут -	softmaskinp=1 - сохраняет текст в поле даже при несовпадении его с шаблоном

*/




(function($) {
        $.browser = {};
        $.browser.mozilla=/mozilla/.test(navigator.userAgent.toLowerCase())&&!/webkit/.test(navigator.userAgent.toLowerCase());
        $.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase());
        $.browser.opera=/opera/.test(navigator.userAgent.toLowerCase());
        $.browser.msie=/msie/.test(navigator.userAgent.toLowerCase());
        var pasteEventName = ($.browser.msie ? 'paste' : 'input') + ".mask";
	var iPhone = (window.orientation != undefined);

	$.mask = {
		//Predefined character definitions
		definitions: {
			'0': "[0-9]",
			'a': "[A-Za-zА-Яа-яёЁ]",
			'A': "[A-Za-zА-Яа-яёЁ]",
			'x': "[A-Za-z0-9А-Яа-яёЁ]",
			'X': "[A-Za-z0-9А-Яа-яёЁ]",
			'*': "[A-Za-z0-9А-Яа-яёЁ]"
		},
		dataName:"rawMaskFn"
	};

	$.fn.extend({
		//Helper Function for Caret positioning
		caret: function(begin, end) {
			if (this.length == 0) {return;}
			if (typeof begin == 'number') {
				end = (typeof end == 'number') ? end : begin;
				return this.each(function() {
					if (this.setSelectionRange) {
						this.setSelectionRange(begin, end);
					} else if (this.createTextRange) {
						var range = this.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', begin);
						range.select();
					}
				});
			} else {
				if (this[0].setSelectionRange) {
					begin = this[0].selectionStart;
					end = this[0].selectionEnd;
				} else if (document.selection && document.selection.createRange) {
					var range = document.selection.createRange();
					begin = 0 - range.duplicate().moveStart('character', -100000);
					end = begin + range.text.length;
				}
				return { begin: begin, end: end };
			}
		},
		unmask: function() { return this.trigger("unmask"); },
		mask: function(mask, settings) {
			if (!mask && this.length > 0) {
				var input = $(this[0]);
				return input.data($.mask.dataName)();
			}
			
			var nolenlimit=0;
			
			if (mask.charAt(mask.length-1)=="L") {	
				mask=mask.substr(0,mask.length-1);
				nolenlimit=1;
			} 		
			
			var fixedsymb=new Array();
			var tempmask="";
			for (ni=0;ni<mask.length;ni++) {
				if (mask.charAt(ni)!="!") {
					tempmask+=mask.charAt(ni);
					fixedsymb[ni]=0;
				} else {fixedsymb[ni]=1;}
			}
			mask=tempmask;
			
			settings = $.extend({
				placeholder: "_",
				completed: null
			}, settings);

			var defs = $.mask.definitions;
			var tests = [];
			var partialPosition = mask.length;
			var firstNonMaskPos = null;
			var len = mask.length;
			var orlen = mask.length;

			$.each(mask.split(""), function(i, c) {
				if (c == '?') {
					len--;
					partialPosition = i;
				} else if ((defs[c])&&(!fixedsymb[i])) {
					tests.push(new RegExp(defs[c]));
					if(firstNonMaskPos==null) {	firstNonMaskPos =  tests.length - 1;}
				} else {
					tests.push(null);
				}
			});

			return this.trigger("unmask").each(function() {
				var input = $(this);
				var buffer = $.map(mask.split(""), function(c, i) { if (c != '?') return defs[c] ? (((fixedsymb[i])?mask.charAt(i):settings.placeholder)) : c });
				var focusText = input.val();

				function seekNext(pos) {
					while (++pos <= len && !tests[pos]);
					return pos;
				};
				function seekPrev(pos) {
					while (--pos >= 0 && !tests[pos]);
					return pos;
				};

				function shiftL(begin,end) {
					if (begin<0) {  return;}
					for (var i = begin,j = seekNext(end); i < len; i++) {
						if (tests[i]) {
							if (j < len && tests[i].test(buffer[j])) {
								buffer[i] = buffer[j];
								buffer[j] = settings.placeholder;
							} else {break;}
							j = seekNext(j);
						}
					}
					writeBuffer();
					input.caret(Math.max(firstNonMaskPos, begin));
				};

				function shiftR(pos) {
					for (var i = pos, c = settings.placeholder; i < len; i++) {
						if (tests[i]) {
							var j = seekNext(i);
							var t = buffer[i];
							buffer[i] = c;
							if (j < len && tests[j].test(t)) {	c = t;}
							else {break;}
						}
					}
				};

				function keydownEvent(e) {
					var k=e.which;

					//backspace, delete, and escape get special treatment
					if(k == 8 || k == 46 || (iPhone && k == 127)){
												
						var pos = input.caret(),
							begin = pos.begin,
							end = pos.end;

						if ((len>orlen)&&
							(((begin>0)&&(k == 8))||((begin<len)&&(k == 46)))
							) {
							mask=mask.substr(0,mask.length-1);
							len=mask.length;tests.pop();
							buffer.pop();					
						}	
						
						if(end-begin==0){
							begin=k!=46?seekPrev(begin):(end=seekNext(begin-1));
							end=k==46?seekNext(end):end;
						}
						clearBuffer(begin, end);
						shiftL(begin,end-1);						
						
						return false;
					} else if (k == 27) {//escape						
						if (!input.attr("softmaskinp")) {
							input.val(focusText);
							input.caret(0, checkVal());}
						return false;
					}
				};

				function keypressEvent(e) {
					var k = e.which,
						pos = input.caret();
					if (e.ctrlKey || e.altKey || e.metaKey || k==46 || k<32) {//Ignore
						return true;
					} else if (k) {
						if(pos.end-pos.begin!=0){
							clearBuffer(pos.begin, pos.end);
							shiftL(pos.begin, pos.end-1);
						}

						var p = seekNext(pos.begin - 1);						
						
						if (p < len) {
							var c = String.fromCharCode(k);
							if (tests[p].test(c)) {
								shiftR(p);
								buffer[p] = c;
								writeBuffer();
								var next = seekNext(p);
								input.caret(next);
								if (settings.completed && next >= len){
									settings.completed.call(input);}
																
								input.css({"background-Color":"#ffffff"});	
								$("#inputmaskhelp").css({"display":"none"});
							} else {
								ofposy=input.offset().top;
								ofposx=input.offset().left+input.attr("offsetWidth")+5;
								spanOutputStart(input,{id:"inputmaskhelp"});								
								$("#inputmaskhelp").html("ожидается символ "+tests[p]+"<br>шаблон "+mask);
								input.css({"background-Color":"#ffe0e0"});	
							}
						}
						if ((p >= len)&&(nolenlimit)) {							
							var c = String.fromCharCode(k);							
							buffer[buffer.length] = c;
							writeBuffer();	
							mask=mask+"*";len=mask.length;							
							tests.push(new RegExp(defs['*']));									
						}
						return false;
					}
				};

				function clearBuffer(start, end) {
					for (var i = start; i < end && i < len; i++) {
						if (tests[i]){	buffer[i] = settings.placeholder;}
					}
				};

				function writeBuffer() { return input.val(buffer.join('')).val(); };

				function checkVal(allow) {
					//try to place characters where they belong
					var test = input.val();
					var lastMatch = -1;
					for (var i = 0, pos = 0; i < len; i++) {
						if (tests[i]) {
							buffer[i] = settings.placeholder;
							while (pos++ < test.length) {
								var c = test.charAt(pos - 1);
								if (tests[i].test(c)) {
									buffer[i] = c;
									lastMatch = i;
									break;
								}
							}
							if (pos > test.length) {break;}
						} else if (buffer[i] == test.charAt(pos) && i!=partialPosition) {
							pos++;
							lastMatch = i;
						}
					}
					if (!allow && lastMatch + 1 < partialPosition) {
						input.val("");
						clearBuffer(0, len);
					} else if (allow || lastMatch + 1 >= partialPosition) {
						writeBuffer();
						if (!allow) {input.val(input.val().substring(0, lastMatch + 1));}
					}
					return (partialPosition ? i : firstNonMaskPos);
				};

				input.data($.mask.dataName,function(){
					return $.map(buffer, function(c, i) {
						return tests[i]&&c!=settings.placeholder ? c : null;
					}).join('');
				})

				if (!input.attr("readonly"))
					input
					.one("unmask", function() {
						input
							.unbind(".mask")
							.removeData($.mask.dataName);
					})
					.bind("focus.mask", function() {
						if (input.attr("softmaskinp")) {return;}
						focusText = input.val();
						var pos = checkVal();
						writeBuffer();
						var moveCaret=function(){
							if (pos == mask.length)
								input.caret(0, pos);
							else
								input.caret(pos);
						};
						($.browser.msie ? moveCaret:function(){setTimeout(moveCaret,0)})();
					})
					.bind("blur.mask", function() {
						if (input.attr("softmaskinp")) {
							var regexpc=new RegExp(settings.placeholder,"g");
							input.val(input.val().replace(regexpc," "));
							input.css({"background-Color":"#ffffff"});								
							return;}
						$("#inputmaskhelp").css({"display":"none"});	
						checkVal();
						if (input.val() != focusText) {input.change();}
						
					})
					.bind("keydown.mask", keydownEvent)
					.bind("keypress.mask", keypressEvent)
					.bind(pasteEventName, function() {
						setTimeout(function() { input.caret(checkVal(true)); }, 0);
					});

				checkVal(); //Perform initial check for existing values
			});
		}
	});
})(jQuery);
