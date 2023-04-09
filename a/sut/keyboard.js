<!--
/*****************************************************************************
 * Load-Save for Ajax  (iframePostData)                                      *
 * Copyright (c) 2011 Miden co. All rights reserved.                  		  *
 ****************************************************************************/
var curKeyboardobj= "",shift = false,capslock = false,keyboardlang = "RU";

$(function() {
		$(".keyboardInput").click(KeyboardOpen).change(KeyboardChange).blur(KeyboardBlur).keyup(KeyboardKeyUp);});
		
/*---------------------------------------------------------------------------------------------------*/
function keyboardInput(sender){alert("keyboardInput");}

/*---------------------------------------------------------------------------------------------------*/
function KeyboardChange(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	Put_default(obj);
	if ($("#spanOutput").attr("id")){spanOutputclose(obj);}
	if (sender.stopPropagation) {sender.stopPropagation(); } 
	else {sender.cancelBubble = true;}}

/*---------------------------------------------------------------------------------------------------*/
function KeyboardBlur(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	if (sender.stopPropagation) {sender.stopPropagation(); } 
	else {sender.cancelBubble = true;}}

/*---------------------------------------------------------------------------------------------------*/
function KeyboardKeyUp(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	Put_default(obj);}

/*------------------------------------------------------------------------------------------*/
function KeyboardLangFunc(lang){
	keyboardlang=(lang)?lang:keyboardlang;
	var toMyKeyboard="";
	if(keyboardlang=="US"){
			toMyKeyboard="		<li class='symbol'><span class='off' id='1'>`</span><span class='on' id='2'>~</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>1</span><span class='on' id='2'>!</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>2</span><span class='on' id='2'>@</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>3</span><span class='on' id='2'>\#</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>4</span><span class='on' id='2'>$</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>5</span><span class='on' id='2'>%</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>6</span><span class='on' id='2'>^</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>7</span><span class='on' id='2'>\&</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>8</span><span class='on' id='2'>*</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>9</span><span class='on' id='2'>(</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>0</span><span class='on' id='2'>)</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>-</span><span class='on' id='2'>_</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>=</span><span class='on' id='2'>+</span></li>";
			toMyKeyboard+="	<li class='delete'>delete</li>";
			toMyKeyboard+="	<li class='tab'>tab</li>";
			toMyKeyboard+="	<li class='letter'>q</li>";
			toMyKeyboard+="	<li class='letter'>w</li>";
			toMyKeyboard+="	<li class='letter'>e</li>";
			toMyKeyboard+="	<li class='letter'>r</li>";
			toMyKeyboard+="	<li class='letter'>t</li>";
			toMyKeyboard+="	<li class='letter'>y</li>";
			toMyKeyboard+="	<li class='letter'>u</li>";
			toMyKeyboard+="	<li class='letter'>i</li>";
			toMyKeyboard+="	<li class='letter'>o</li>";
			toMyKeyboard+="	<li class='letter'>p</li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>[</span><span class='on' id='2'>{</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>]</span><span class='on' id='2'>}</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>\\</span><span class='on' id='2'>|</span></li>";
			toMyKeyboard+="	<li class='capslock'>caps lock</li>";
			toMyKeyboard+="	<li class='letter'>a</li>";
			toMyKeyboard+="	<li class='letter'>s</li>";
			toMyKeyboard+="	<li class='letter'>d</li>";
			toMyKeyboard+="	<li class='letter'>f</li>";
			toMyKeyboard+="	<li class='letter'>g</li>";
			toMyKeyboard+="	<li class='letter'>h</li>";
			toMyKeyboard+="	<li class='letter'>j</li>";
			toMyKeyboard+="	<li class='letter'>k</li>";
			toMyKeyboard+="	<li class='letter'>l</li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>;</span><span class='on' id='2'>:</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>'</span><span class='on' id='2'>\"</span></li>";
			toMyKeyboard+="	<li class='return'>return</li>";
			toMyKeyboard+="	<li class='left-shift'>shift</li>";
			toMyKeyboard+="	<li class='letter'>z</li>";
			toMyKeyboard+="	<li class='letter'>x</li>";
			toMyKeyboard+="	<li class='letter'>c</li>";
			toMyKeyboard+="	<li class='letter'>v</li>";
			toMyKeyboard+="	<li class='letter'>b</li>";
			toMyKeyboard+="	<li class='letter'>n</li>";
			toMyKeyboard+="	<li class='letter'>m</li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>,</span><span class='on' id='2'>&lt;</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>.</span><span class='on' id='2'>&gt;</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>/</span><span class='on' id='2'>?</span></li>";
			toMyKeyboard+="	<li class='right-shift'>shift</li>";
			toMyKeyboard+="	<li class='lang' id='RU'>RU</li>";
			toMyKeyboard+="	<li class='lang' id='US'>US</li>";
			toMyKeyboard+="	<li class='space lastitem'>&nbsp;</li>";
			toMyKeyboard+="	<li class='backspace'>backspace</li>";}
	else{
			toMyKeyboard="		<li class='symbol'><span class='off' id='1'>ё</span><span class='on' id='2'>Ё</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>1</span><span class='on' id='2'>!</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>2</span><span class='on' id='2'>\"</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>3</span><span class='on' id='2'>№</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>4</span><span class='on' id='2'>;</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>5</span><span class='on' id='2'>%</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>6</span><span class='on' id='2'>:</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>7</span><span class='on' id='2'>?</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>8</span><span class='on' id='2'>*</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>9</span><span class='on' id='2'>(</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>0</span><span class='on' id='2'>)</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>-</span><span class='on' id='2'>_</span></li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>=</span><span class='on' id='2'>+</span></li>";
			toMyKeyboard+="	<li class='delete'>delete</li>";
			toMyKeyboard+="	<li class='tab'>tab</li>";
			toMyKeyboard+="	<li class='letter'>й</li>";
			toMyKeyboard+="	<li class='letter'>ц</li>";
			toMyKeyboard+="	<li class='letter'>у</li>";
			toMyKeyboard+="	<li class='letter'>к</li>";
			toMyKeyboard+="	<li class='letter'>е</li>";
			toMyKeyboard+="	<li class='letter'>н</li>";
			toMyKeyboard+="	<li class='letter'>г</li>";
			toMyKeyboard+="	<li class='letter'>ш</li>";
			toMyKeyboard+="	<li class='letter'>щ</li>";
			toMyKeyboard+="	<li class='letter'>з</li>";
			toMyKeyboard+="	<li class='letter'>х</li>";
			toMyKeyboard+="	<li class='letter'>ъ</li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>\\</span><span class='on' id='2'>|</span></li>";
			toMyKeyboard+="	<li class='capslock'>caps lock</li>";
			toMyKeyboard+="	<li class='letter'>ф</li>";
			toMyKeyboard+="	<li class='letter'>ы</li>";
			toMyKeyboard+="	<li class='letter'>в</li>";
			toMyKeyboard+="	<li class='letter'>а</li>";
			toMyKeyboard+="	<li class='letter'>п</li>";
			toMyKeyboard+="	<li class='letter'>р</li>";
			toMyKeyboard+="	<li class='letter'>о</li>";
			toMyKeyboard+="	<li class='letter'>л</li>";
			toMyKeyboard+="	<li class='letter'>д</li>";
			toMyKeyboard+="	<li class='letter'>ж</li>";
			toMyKeyboard+="	<li class='letter'>э</li>";
			toMyKeyboard+="	<li class='return'>return</li>";
			toMyKeyboard+="	<li class='left-shift'>shift</li>";
			toMyKeyboard+="	<li class='letter'>я</li>";
			toMyKeyboard+="	<li class='letter'>ч</li>";
			toMyKeyboard+="	<li class='letter'>с</li>";
			toMyKeyboard+="	<li class='letter'>м</li>";
			toMyKeyboard+="	<li class='letter'>и</li>";
			toMyKeyboard+="	<li class='letter'>т</li>";
			toMyKeyboard+="	<li class='letter'>ь</li>";
			toMyKeyboard+="	<li class='letter'>б</li>";
			toMyKeyboard+="	<li class='letter'>ю</li>";
			toMyKeyboard+="	<li class='symbol'><span class='off' id='1'>.</span><span class='on' id='2'>,</span></li>";
			toMyKeyboard+="	<li class='right-shift'>shift</li>";
			toMyKeyboard+="	<li class='lang' id='RU'>RU</li>";
			toMyKeyboard+="	<li class='lang' id='US'>US</li>";
			toMyKeyboard+="	<li class='space lastitem'>&nbsp;</li>";
			toMyKeyboard+="	<li class='backspace'>backspace</li>";}
    return toMyKeyboard;}
    
 /*---------------------------------------------------------------------------------------------------*/
function KeyboardBackspace(sender){
		var value=$(curKeyboardobj).attr("value");
		var valueto="";
		for(i=0; i<value.length-1; i++){valueto+=value[i];}
		$(curKeyboardobj).attr("value",valueto);
		Put_default(curKeyboardobj);} 
		  
/*---------------------------------------------------------------------------------------------------*/
function KeyboardSift(sender){
		shift = (shift === true) ? false : true;
		KeyboardSiftOn(sender);}
				
/*---------------------------------------------------------------------------------------------------*/
function KeyboardSiftOn(sender){
		$(".letter").each(function(index){
				var character=(shift)?$(this).html().toUpperCase():$(this).html().toLowerCase();
				$(this).html(character);});
		$(".symbol").each(function(index){
			if(shift){$(this).children("[id=1]").attr("class","on");$(this).children("[id=2]").attr("class","off");}
			else{$(this).children("[id=1]").attr("class","off");$(this).children("[id=2]").attr("class","on");}});		
		if(shift){$(".right-shift").css({color:"red"});$(".left-shift").css({color:"red"});}
		else{$(".right-shift").css({color:"black"});$(".left-shift").css({color:"black"});}	}
				
/*---------------------------------------------------------------------------------------------------*/
function KeyboardClick(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	var character="";
	if($(obj).is("span")){obj=$(obj).parent();}
	if ($(obj).hasClass("letter")) 				{character = $(obj).html();}
	else if ($(obj).hasClass("symbol")) 		{character = $(obj).children('.off').html();}
	else if ($(obj).hasClass("delete")) 		{$(curKeyboardobj).attr("value","");return false;}
	else if ($(obj).hasClass("tab")) 			{alert("tab - вразработке");return false;}
	else if ($(obj).hasClass("capslock")) 		{alert("capslock - вразработке");return false;}
	else if ($(obj).hasClass("return")) 		{spanOutputclose("spanOutput");return false;}
	else if ($(obj).hasClass("left-shift")) 	{KeyboardSift();return false;}
	else if ($(obj).hasClass("right-shift")) 	{KeyboardSift();return false;}
	else if ($(obj).hasClass("backspace")) 	{KeyboardBackspace();return false;}
	else if ($(obj).hasClass("lang")) 			{
			$("#keyboard").html(KeyboardLangFunc($(obj).html()));
			$('#keyboard li').click(KeyboardClick);
			KeyboardSiftOn();
			if(keyboardlang=="RU"){$("#RU").css({color:"red"});$("#US").css({color:"black"});}
			else{$("#RU").css({color:"black"});$("#US").css({color:"red"});}	
			return false;}
	else if ($(obj).hasClass('space')) 			{character = " ";}
	else													{alert($(obj).html()+"- не поддерживается");return false;}
	
	$(curKeyboardobj).attr("value",$(curKeyboardobj).attr("value") + character);
	Put_default(curKeyboardobj);
	if (sender.stopPropagation) {sender.stopPropagation(); } 
	else {sender.cancelBubble = true;}}

/*---------------------------------------------------------------------------------------------------*/
function KeyboardOpen(sender){	
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	curKeyboardobj  = obj;
	if ($("#spanOutput").attr("id")){spanOutputclose(obj);}
	
	spanOutputStart(obj,{width:700});
		
	toMyKeyboard="<ul id='keyboard'>"+KeyboardLangFunc(keyboardlang)+"</ul>";
	$("#spanOutput").html(toMyKeyboard);
	
	$('#keyboard li').click(KeyboardClick);
	KeyboardSiftOn();
	if(keyboardlang=="RU"){$("#RU").css({color:"red"});$("#US").css({color:"black"});}
	else{$("#RU").css({color:"black"});$("#US").css({color:"red"});}	
	if (sender.stopPropagation) {sender.stopPropagation(); } 
	else {sender.cancelBubble = true;}}

//-->