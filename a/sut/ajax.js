
//---------------------------------------------------------------------------------------------------
//----------------------------------------------- ContentLoader -------------------------------------
//---------------------------------------------------------------------------------------------------
var multiAlert 		= false;
var debugAlert 		= false;
$.browser = {};
$.browser.mozilla=/mozilla/.test(navigator.userAgent.toLowerCase())&&!/webkit/.test(navigator.userAgent.toLowerCase());
$.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera=/opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie=/msie/.test(navigator.userAgent.toLowerCase());
var IE					= $.browser.msie;
var keyj					=  keyj || "0";
	
$.ajaxSetup({
	"type"		: "POST",
	"dataType"	: "text",
	"async"		: "false",
	"error"		: function(data,status){ajaxError(data,status);return false;},
	"success"	: function(data,status){ajaxSuccess(data,status);return false;},
	"complete"	: function(data,status){ajaxComplete(data,status);return false;}});
	
//--------------------------------------------------------------------------------------------	
(function( $ ){
  $.fn.attrvalue = function(val) {      
    if (typeof val!="undefined") {
         if ((typeof this.prop('tagName')=="undefined")||(typeof this.prop("value")=="undefined")) {this.attr("value",val); }
         else {this.val(val);}        
        return val;}
   if (typeof this.prop('tagName')=="undefined") {return this.attr("value");}
   return (typeof this.prop("value")!="undefined")?this.val():this.attr("value");  };
})( jQuery );

//--------------------------------------------------------------------------------------------
function ajaxSuccess(data,status){/*
	try		{$(".getCalendar").dateEntry({dateFormat: 'dmy.'});}
	catch(e)	{alert("Ошибка при dateEntry:"+e.message);return values;}*/
	return false;}

//--------------------------------------------------------------------------------------------
function ajaxError(data,status){
	var httproot="Ошибка \n\n" +
			"status: "	+ status + "\n" +
			"text: "		+ data.statusText+ "\n" +
			"headers: "	+ data.responseText;
	if(debugAlert){if($("#rightpanel").attr("id")){$("#rightpanel").html(httproot);}}
	return httproot;	}
//--------------------------------------------------------------------------------------------
function ajaxComplete(data,status){//alert(data.responseText);
	var MyText	=  "",returnkey="0",malert	= "",malert0	= "";
	var values	= {};
	if(typeof(data)=="object")	{/*console.log(data.responseText);*/
            if (typeof data.responseText === 'undefined') {
                begintext=data;
            } else {
                MyText	=  data.responseText.split("|");
                begintext=data.responseText;
            }
        } else {
            MyText	=  data.split("|");
            begintext=data;
        }
	//alert(begintext);
	values["flag"]="0";
	values["alert"]="0";
	//if(MyText.indexOf("flag")*1>0){
		for (var i=0;i<MyText.length;i++){
			var mm = MyText[i].split("=");
			values[mm[0]]	= mm[1];
			if (mm[0] == "key"){returnkey = mm[1];}
			if (mm[0] == "alert"){malert0 = mm[1];}}//}
		//alert("flag="+values["flag"]);
	if(values["alert"]=="0")	{}
	else								{malert = values["alert"].split(";");malert = malert[0];}
	if ((values["flag"]!="0")&&(values["flag"]!="default")){
			if (values["flag"] == "updated")	{
				try		{update_record(values);}
				catch(e)	{alert("Ошибка при обновлении:"+e.message);return values;}}
			else if (values["flag"] == "no_updated"){}
			else if (values["flag"] == "insertdb"){
				try		{insert_record(values);}
				catch(e)	{alert("Ошибка при добавлении:"+e.message);return values;}}
			else if (values["flag"] == "no_insertdb"){}
			else if (values["flag"] == "deleted")	{
				try		{clear_record(values);}
				catch(e)	{alert("Ошибка при удалении:"+e.message);return values;}}
			else if (values["flag"] == "no_deleted"){}}
	//multiAlert=true;
	if(multiAlert){//alert("OK ("+values["flag"]+"\n "+malert+")");
			var dflag=(values["flag"]!="0")?(values["flag"]+"\n "):"";
			if (values["flag"]=="updated")				{alert("OK ("+dflag+malert+") "+returnkey);}
			else if (values["flag"]=="no_updated")		{alert("OK ("+dflag+malert+") "+returnkey);}
			else if (values["flag"]=="insertdb")		{alert("OK ("+dflag+malert+") "+returnkey);}
			else if (values["flag"]=="no_insertdb")	{alert("NO ("+dflag+malert+") "+returnkey);}
			else if (values["flag"]=="deleted")			{alert("OK ("+dflag+malert+") "+returnkey);}
			else if (values["flag"]=="no_deleted")		{alert("OK ("+dflag+malert+") "+returnkey);}
			else{alert("OK ("+dflag+malert+") ");}
			//else{alert("OK ("+begintext+") "+returnkey);}
			multiAlert=false;}
	//debugAlert=true;
	if(debugAlert){debugAlert=false;alert(begintext);}
	values["flag"] ="0";

	return values;}

//--------------------------------------------------------------------------------------------
function stringToObj(form_html){
	var myhtml		= {};
	var MyStr		= "";
	if (typeof(form_html)=="string"){
		if(1==1){
			var elements=form_html.split("&");
			for(var i = 0; i < elements.length; ++i){
				MyStr=elements[i].split("=");
				myhtml[MyStr[0]]=MyStr[1];}}
		else{//json
				myhtml=eval("({"+form_html+"})");}}
	else {myhtml = form_html;}
	return myhtml;}

/*------------------------------------------------------------------------------------------*/
function loadAjax(MyForm,form_html,Myteg){
	var loadform ="";
	if (!Myteg){Myteg="rightpanel";}
	var myhtml		= stringToObj(form_html);
	if (myhtml.viddok){if (myhtml.subconto){myhtml.viddok=myhtml.subconto;}}
	if (contObject)	{loadform = "#"+contObject+" #"+Myteg;}
	else			{loadform = "#"+Myteg;}
	myhtml.ajax	= "1";
	$(loadform).load(MyForm,myhtml,function(data,status){
		if(status=="error"){$(loadform).html(MyForm + " = " + data);}});
	return false;}

/*------------------------------------------------------------------------*/
function spanOutputStart(sender,args)	{
	var pozobj	= (sender)?$(sender).offset():0;
	var dleft	= (pozobj)?pozobj.left:70;
	var dtop		= (pozobj)?pozobj.top + 20:220;
	var dwidth	= (typeof(args)=="object")?args.width:$(sender).css("width");
			dwidth		= (!dwidth)?280:dwidth;
			dwidth		= (parseInt(dwidth,10)<120)?120:dwidth;
	var mr_key	= (r_key)?r_key:"0";
	var idsender= ($(sender).attr("id"))?$(sender).attr("id"):"";
	try{var spanId=args.id;}catch(e){var spanId="spanOutput";}
	try{
		dtop=(args.top)?args.top:dtop;
		dleft=(args.left)?args.left:dleft;}
	catch(e){}
	try{$.leaks.watch();}catch(e){}
	if (parseInt(dleft,10)+parseInt(dwidth,10)-parseInt($(window).scrollLeft(),10)>parseInt( window.innerWidth,10)) {
 				dleft=parseInt( window.innerWidth,10)-parseInt(dwidth,10)+parseInt($(window).scrollLeft(),10);}
	if(!spanId){spanId="spanOutput";}
	spanOutputclose();

	$("body").append("<div id='"+spanId+"' class='spanOutput'  style='z-index	: 100;'>Данные ...</div>");//alert(spanId);//return;
//.mouseleave(spanOutputclose)
	$("#"+spanId)
		.attr("idsender",idsender)
		.attr("keyparent",mr_key)
		.css({
			position		: "absolute",
			top			: dtop,
			left			: dleft,
			width			: dwidth,
			background	: "white",
			color			: "black",
			border		: "3px  solid gray"});
	if($(sender).attr("subconto")){
		$("#"+spanId).attr("subconto",$(sender).attr("subconto"));}}
		
/*------------------------------------------------------------------------*/
function spanRightStart(args)	{
		var mright	= (!args)?"span":args;
		var spanR	= "#rightpanel";
		var dleft	= ($(spanR).css("left"))?$(spanR).css("left"):"0";
		var dtop		= ($(spanR).css("top"))?$(spanR).css("top"):"0";
		var dwidth	= ($(spanR).css("width"))?$(spanR).css("width"):"0";
		var dheight	= "100%";//($(spanR).css("height"))?$(spanR).css("height"):"0";	
		
		if ((dleft=="0")||(dtop=="0")||(dwidth=="0")||(dheight=="0")) {alert("NoRightPanel");return;}
		keyj=key;
		$("body").append("<div id='"+mright+"Right'>Данные загружаются...</div>");
		$("body").append("<div type	= 'button' name= 'srightclose' "+
				"id='"+mright+"close' title='Назад' onclick	= 'spanRightclose(\""+mright+"\");'>&nbsp;<< Назад</div>");	// ("+mright+")	
		$("#"+mright+"Right").css({
			top			: dtop,
			left			: dleft,
			width			: dwidth,
			height		: dheight});
		$("#"+mright+"close").css({
			top			: dtop});
		if (mright=="dop") {$("#spanclose").css({visibility:"hidden"});}
		}
/*------------------------------------------------------------------------*/
function spanRightclose(args)	{	
		var mright	= (!args)?"span":args;
		if (mright=="all") {
			key=(keyj)?keyj:key;
			spanRightclose("span");spanRightclose("dop");return;}
		if (mright=="dop") {key=(keyj)?keyj:key;$("#spanclose").css({visibility:"visible"});}
		$("#"+mright+"Right").remove();
		$("#"+mright+"close").remove();}	
/*---------------------------------------------------------------------------------------------------*/
function spanOutputclose(sender){
	var spanId="spanOutput";
	var typeKey		= "0";
	if(!sender)	{$("#spanOutput").remove();return;}

	try{
		var obj	= sender.target;
		spanId	= $(obj).attr("id");
		var typeKey		= sender.type;}
	catch(e){}

	if (typeof(sender)=="string")			{spanId = sender;}
	else if (typeof(sender)=="object")	{//alert(sender);
		spanId=   ($(sender).attr("id"))?$(sender).attr("id"):"spanOutput";
		if((typeKey =="mouseleave")&&(spanId =="spanOutput")){$("#spanOutput").remove();return 0;}
		if((typeKey =="mouseleave")&&(spanId =="SbspanOutput")){$("#SbspanOutput").remove();return 0;}
		if(!$(sender).is("div")){return 0;}}
	else									{spanId = sender;}

	//alert(spanId);
	if(spanId=="spanOutputFilter"){$("#spanOutputFilter").remove();return;}
	if(spanId=="SbspanOutput"){$("#SbspanOutput").remove();return;}
	//$("#spanOutput").remove();
	if (spanId==null)						{spanId = "spanOutput";}
	if($("#"+spanId).is("img"))		{return 0;}
	if($("#"+spanId).is("checkbox"))	{return 0;}
	if($("#"+spanId).is("textarea"))	{return 0;}
	if($("#"+spanId).is("input"))		{return 0;}

	spanOutputElem= 0;
	
	$("#"+spanId).remove();
	try{$.leaks.remove();}
	catch(e){}}

/*---------------------------------------------------------------------------------------------------*/
function spanOutputEmpty(sender){
	var spanId="spanOutput";
	var typeKey		= "0";
	if(!sender)	{$("#spanOutput").empty();return;}

	try{
		var obj	= sender.target;
		spanId	= $(obj).attr("id");
		var typeKey		= sender.type;}
	catch(e){}

	if (typeof(sender)=="string")			{spanId = sender;}
	else if (typeof(sender)=="object")	{
		if((typeKey =="mouseleave")&&(spanId =="spanOutput")){$("#spanOutput").remove();return 0;}
		if(!$(sender).is("div")){return 0;}}
	else									{spanId = sender;}

	//alert(spanId);
	if(spanId=="spanOutputFilter"){$("#spanOutputFilter").remove();return;}
	//$("#spanOutput").remove();
	if (spanId==null)						{spanId = "spanOutput";}
	if($("#"+spanId).is("img"))		{return 0;}
	if($("#"+spanId).is("checkbox"))	{return 0;}
	if($("#"+spanId).is("textarea"))	{return 0;}
	if($("#"+spanId).is("input"))		{return 0;}

	spanOutputElem= 0;
	
	$("#"+spanId).empty();
	try{$.leaks.remove();}
	catch(e){}}

/*---------------------------------------------------------------------------------------------------*/
function windowOpen(source,name,width,height){
	if($.browser.webkit){
		window.open(source,name);
		window.open (location.href+"#maintain_focus","_self");}
	else{window.open(source,name,"width="+width+",height="+height+",resizable=yes,scrollbars=yes,menubar=yes,dependent=yes");}}

/*---------------------------------------------------------------------------------------------------*/
function windowOpenModal(source,name,width,height){
	if(IE){window.showModalDialog(source,"", " dialogWidth: "+width+"; dialogHeight: "+height+";  status: no; scroll=yes;center=yes");}
	else	{windowOpen(source,name,width,height);}}

/*------------------------------------------------------------------------*/
function MoveHost(sender){
	if(typeof(form_html)=="object")	{$(sender).focus();$(sender).select();}
	else										{$("#"+sender).focus();$("#"+sender).select();}}

//---------------------------------------------------------
function MeHide(sender){alert();
	$(sender).hide();}

//---------------------------------------------------------
function clickOnPrint(sender){
	$("[id='printPanel']").hide();
	if(IE){window.document.getElementById("WebBrowser1").ExecWB(6, 6);
	$("[id='printPanel']").show();}}

//---------------------------------------------------------
function clickOnPrintW(sender){
	$("[id='printPanel']").hide();
	if(!IE){window.print();}
	else{
		try{window.document.getElementById("WebBrowser1").ExecWB(6, 6);}
		catch(e){}}

	$("[id='printPanel']").show();}

/*------------------------------------------------------------------------*/
function ajax_obj(sender){
	try{
		if(sender.target){return sender.target;}
		else{return sender;}}
	catch(e){return sender;}}


/*------------------------------------------------------------------------*/
function ajax_click(sender){
	var merr={};
	merr.eventcode	= sender.keyCode || sender.which;
	merr.typeKey	= sender.type;
	merr.ctrlKey	= sender.ctrlKey;
	merr.altKey		= sender.altKey;
	merr.shiftKey	= sender.shiftKey;
	return merr;}

/*---------------------------------------------------------------------------------------------------*/
function cancelPubling(sender){ 
	try{$.leaks.remove();}
	catch(e){}
	sender=(typeof sender!="undefined")?sender:window.event;	
	if (typeof sender=="undefined") {return;}
	sender.stopPropagation();
	sender.cancelPubble=true;}

/*---------------------------------------------------------------------------------------------------*/
function clearSelection() {
	    if (window.getSelection) {
	      window.getSelection().removeAllRanges();}
		else {
	      document.selection.empty();}}

/*------------------------------------------------------------------------------------------*/
jQuery.fn.positioncenter = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;}

/*------------------------------------------------------------------------------------------*/
function putLoginTo(sender){//alert(4);
			var tryalert=true;var dataload=0;//alert(dirArm);
			var MyLeft =  "Необходимо правильно ввести имя и пароль.\n ";
				MyLeft+= "Если забыли пароль, обратитесь к системному администратору.";
			var args={};	
			args.users=	$("#users").attrvalue();
			args.parole=	$("#parole").attrvalue();
			$.post(dirArm+"lib/autentificationok.php",args,function(data,status){ /*alert(data);*/
				if(data.indexOf("|")>0){
						var MyStr=data.split("|");dataload=0;
						MyLeft = "Вход в приложение заблокирован ";
						for (var i=0;i<MyStr.length;i++){
							var mm = MyStr[i].split("=");
							if (mm[0] == "error")		{MyLeft = MyLeft + ". " + mm[1] + " ";}
							else if (mm[0] == "users")	{MyLeft = MyLeft + "пользователем " + mm[1] + " ";}
							else if (mm[0] == "fio")	{MyLeft = MyLeft + "(" + mm[1] + ") <br> \n";}
							else if (mm[0] == "ip")		{MyLeft = MyLeft + "с компьютера - " + mm[1] + " ";}}}
				else{dataload=data;}
				//alert(dataload);

				if (dataload*1==0){
					if($("#users").attrvalue()=="0"){tryalert=false;}
					$("#users").attrvalue("...");
					$("#parole").attrvalue("...");
					if(tryalert){alert(MyLeft);
					return false;}}
				else{
					truautent="1";
					$("#parole").attrvalue("...");
					window.location="?login=yes";}

				});
				if(dataload*1==0){return false;}
				else{return true;}}

/*------------------------------------------------------------------------------------------*/
function putLoginNull(sender){
			if(confirm("Выйти из приложения?")){
					putsessionvalue("users","0");
					putsessionvalue("parole","0");
					putsessionvalue("people_type","0");
					/*alert("OK");*/
					window.location="?login=no";}}

/*********************************************************************************/
function putMSession(sender){//alert($(sender).attr("realvalue"));
			if (!$(sender).attr("realvalue")) {return false;}
			var ss=$(sender).attr("realvalue");//alert(ss);
			if($("#"+ss).attr("realvalue")!="0"){//alert($("#"+ss).attr("realvalue"));
			$.post(dirFrame+"updatesession.php",{key:ss,value:$("#"+ss).attr("realvalue")},
				function(data){alert("OK");
				window.location="";});}
			else{window.location="";}
			return false;}

/*********************************************************************************/
function show_block(sender){
	var ss="block";
	if ($("#"+sender).css("display")=="block") 	{$("#"+sender).css("display", "none");ss="none";}
	else 														{$("#"+sender).css("display", "block");}
	return ss;}


//-->
		