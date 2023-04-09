<!--
var searchObject		= "";
var truautent			= "0";

/*---------------------------------------------------------------------------------------------------*/
function myLocation(sender){
	var MyStr 	= window.location.protocol+"//"+window.location.host;
	var mtmp		= window.location.pathname;
	mtmp			= mtmp.split("/");
	try{
		MyStr 	= window.location.protocol+"//"+window.location.host+"/"+mtmp[1];}
	catch(e){alert("Ошибка выполнения: "+e.message);}

	return MyStr;}
/*---------------------------------------------------------------------------------------------------*/
function eventFromBody(sender){
	try{
		var obj			= sender.target;
		var eventcode	= sender.which;
		var ctrlKey		= sender.ctrlKey;
		var altKey		= sender.altKey;
		var shiftKey	= sender.shiftKey;
		var typeKey		= sender.type;
		if (typeKey!="keypress") 	{searchObject = "";cancelPubling(sender);return false;}
		if (ctrlKey) 					{searchObject = "";cancelPubling(sender);return false;}
		if (altKey) 					{searchObject = "";cancelPubling(sender);return false;}
		}
	catch(e){alert("Ошибка выполнения: "+e.message);searchObject = "";cancelPubling(sender);return false;}

	if($(obj).is("textarea"))	{searchObject = "";cancelPubling(sender);return 0;}
	if($(obj).is("input"))		{searchObject = "";cancelPubling(sender);return 0;}
	if($(obj).is("checkbox"))	{searchObject = "";cancelPubling(sender);return 0;}
	/*alert(eventcode); */
	if((eventcode>47)&&(eventcode<58))		{searchObject	= searchObject+String.fromCharCode(eventcode);cancelPubling(sender);return false;}
	else if(eventcode==45)						{searchObject	= searchObject+String.fromCharCode(eventcode);cancelPubling(sender);return false;}
	else if((eventcode>64)&&(eventcode<91)){searchObject	= searchObject+String.fromCharCode(eventcode);cancelPubling(sender);return false;}
	else if((eventcode>96)&&(eventcode<123)){searchObject	= searchObject+String.fromCharCode(eventcode);cancelPubling(sender);return false;}
	else if((eventcode>1039)&&(eventcode<1105)){searchObject	= searchObject+String.fromCharCode(eventcode);cancelPubling(sender);return false;}
	else if(eventcode==13)						{}
	else												{searchObject = eventcode;cancelPubling(sender);return false;}
	/* alert(searchObject); */
	if (!subconto){subconto="0";}

	if (!searchObject) {}
	else if (window.name=="subconto_"+subconto)	{
			$("#search").attr("value",searchObject);
			Put_default($("#search"));
			$("#GO").click();}
	else if (window.name=="root_"+subconto)		{console.log(window.name);}
	else if (window.name=="payment/index")			{myEventToSubconto(searchObject);}
	else if (window.name=="document")				{myEventToSubconto(searchObject);}
	else if (window.name=="index")					{myEventToSubconto(searchObject);}
	else if (subconto=="index")						{myEventToSubconto(searchObject);}
	else if (window.name=="table/index")			{console.log(window.name);}
	searchObject = "";cancelPubling(sender);return false;}

/*---------------------------------------------------------------------------------------------------*/
function myEventToSubconto(sender){
	var MyStr=sender.toLowerCase().split("-");
	var putsubconto ="";
	if(1<MyStr.length)		{
		var putkey=MyStr[1]*1;
		MyStr[0]=MyStr[0].toLowerCase();
		if((MyStr[0]=="p")||(MyStr[0]=="з"))		{putsubconto = "payment";}
		else if(MyStr[0]=="payment")					{putsubconto = "payment";}
		else if(MyStr[0]=="зфньуте")					{putsubconto = "payment";}
		else if(MyStr[0]=="ЗФНЬУТЕ")					{putsubconto = "payment";}
		else if((MyStr[0]=="b")||(MyStr[0]=="з"))	{putsubconto = "book";}
		else if((MyStr[0]=="bb")||(MyStr[0]=="зз")){putsubconto = "bible";}
		else if((MyStr[0]=="f")||(MyStr[0]=="а"))	{putsubconto = "fizlico";}
		else if((MyStr[0]=="F")||(MyStr[0]=="А"))	{putsubconto = "fizlico";}
		else if((MyStr[0]=="a")||(MyStr[0]=="ф"))	{putsubconto = "abiturient";}
		else if((MyStr[0]=="A")||(MyStr[0]=="Ф"))	{putsubconto = "abiturient";}
		else if((MyStr[0]=="n")||(MyStr[0]=="т"))	{putsubconto = "nomenklatura";}
		else if((MyStr[0]=="m")||(MyStr[0]=="ь"))	{putsubconto = "nomenklatura";}
		else{return false;}

		if(putsubconto=="payment")	{pageToPayment(MyStr);}
		else								{pageToSubconto(putsubconto,putkey);}}
	else 							{
		var putkey= MyStr[0];
		if(MyStr[0].substr(0,3)=="977")			{putsubconto = "bible";}//ISSN
		else if(MyStr[0].substr(0,3)=="978")	{putsubconto = "bible";}//ISBN
		else												{putsubconto = "nomenklatura";}
		pageToSubconto(putsubconto,putkey);}
	return "";}

/*---------------------------------------------------------------------------------------------------*/
function pageToPayment(sender){
	var MyStr		=getSubcontoToMe("payment")*1;
	//if(MyStr!="1"){alert("Недоступно=payment");return "";}
	sender[1]	= (sender[1])?sender[1]:"0";
	if(!sender[1]){return "";}
	MyStr 			= dirArm+"payment/root.php?key="+sender[1];
	windowOpen(MyStr, "payment", "1024","768");}

/*---------------------------------------------------------------------------------------------------*/
function pageToSubconto(putsubconto,putkey){
	if(!putkey){return "";}
	var MyStr=getSubcontoToMe(putsubconto);
	while (MyStr.indexOf("\t")>0)	{MyStr=MyStr.replace("\t","");}
	while (MyStr.indexOf("\r")>0)	{MyStr=MyStr.replace("\r","");}
	while (MyStr.indexOf("\n")>0)	{MyStr=MyStr.replace("\n","");}
	if(MyStr*1!="1"){alert("Недоступно="+putsubconto+"("+MyStr+")");return "";}
	MyStr 		= subcontodir+"index.php?key="+putkey+"&subconto="+putsubconto+"&true=1";
	windowOpen(MyStr, "subconto_"+putsubconto, "1024","768");}

/*------------------------------------------------------------------------------------------*/
function loadautentification(sender){//alert(1);
	var tryalert=true;var dataload=0;
	var MyLeft =  "Необходимо правильно ввести имя и пароль.\n ";
		MyLeft+= "Если забыли пароль, обратитесь к системному администратору.";
	$.post(dirArm+"lib/autentification.php",{},function(data,status){//alert(data);
		if(data.indexOf("|")>0){
				var MyStr=data.split("|");
				MyLeft = "Вход в приложение заблокирован ";
				for (var i=0;i<MyStr.length;i++){
					var mm = MyStr[i].split("=");
					if (mm[0] == "error"){MyLeft = MyLeft + "пользователем " + mm[1] + " ";}
					if (mm[0] == "users"){MyLeft = MyLeft + "пользователем " + mm[1] + " ";}
					if (mm[0] == "fio"){MyLeft = MyLeft + "(" + mm[1] + ") <br> \n";}
					if (mm[0] == "ip"){MyLeft = MyLeft + "с компьютера - " + mm[1] + " ";}}}
		else{dataload=data;}

		if (dataload*1==0){
			if($("#users").attr("value")=="0"){tryalert=false;}
			$("#users").attr("value","...");
			$("#parole").attr("value","...");
			if(tryalert){alert(MyLeft);
			return false;}}
		else{
			truautent="1";
			$("#parole").attr("value","...");}});
		if(dataload*1==0){return false;}
		else{return true;}}

/*------------------------------------------------------------------------------------------*/
function loadform(sender){//alert(2);
	var tryalert=true;var dataload=0;
	var MyLeft =  "Необходимо правильно ввести имя и пароль.33\n ";
		MyLeft+= "Если забыли пароль, обратитесь к системному администратору.";/* alert(dirArm); */
	$.post(dirArm+"lib/autentification.php",{},function(data,status){  /*alert(data); */
		if(data.indexOf("|")>0){
				var MyStr=data.split("|");
				MyLeft = "Вход в приложение заблокирован ";
				for (var i=0;i<MyStr.length;i++){
					var mm = MyStr[i].split("=");
					if (mm[0] == "error"){MyLeft = MyLeft + "пользователем " + mm[1] + " ";}
					if (mm[0] == "users"){MyLeft = MyLeft + "пользователем " + mm[1] + " ";}
					if (mm[0] == "fio"){MyLeft = MyLeft + "(" + mm[1] + ") <br> \n";}
					if (mm[0] == "ip"){MyLeft = MyLeft + "с компьютера - " + mm[1] + " ";}}}
		else{dataload=data;}
		if (dataload*1==0){
			if($("#users").attr("value")=="0"){tryalert=false;}
			$("#users").attr("value","...");
			$("#parole").attr("value","...");
			$("#menu").load("lib/menu.php",{menu:"0",itemnumber:"index"});
			$("div[id*=panel]").each(function(data){
					$("#"+$(this).attr("id")).load("lib/root.php",{command:$(this).attr("id")});});
			if(tryalert){alert(MyLeft);}}
		else{
			$("#parole").attr("value","...");
			$("#menu").load("lib/menu.php",{menu:"1",itemnumber:"index"});
			$("div[id*=panel]").each(function(data){
					$("#"+$(this).attr("id")).load("lib/root.php",{command:$(this).attr("id")});});}});}

/*----------------------------------------------------------------------------*/
function deployElement(sender){
	var myul 	= $(sender).children('ul');
	var myspan 	= $(sender).children('span');
	 if (myul.is(':hidden')) {
           myul.fadeIn(1000);/*slideDown*/
           myspan.html('-'); }
   else {
           myul.slideUp(100);
           myspan.html('+');}}

/*----------------------------------------------------------------------------*/
function deploySw(sender){
	var MyStr	= {};
	//alert(typeof(sender));
	var objsw	= $(sender).parent().parent();
	if($(objsw).attr("isfolder") == "0"){return 0;}
   	if($(objsw).attr("deployed") == "0"){
   			MyStr.subconto	= $(objsw).attr("subconto");
			MyStr.deploy	= "1";
			MyStr.itemnumber= $(objsw).attr("itemnumber");
			if ($(sender).attr("logins")){MyStr.logins	= "1";}
			if ($(sender).attr("polesub")){MyStr.polesub	= $(sender).attr("polesub");}
			if ($(sender).attr("argument")){MyStr.argument	= $(sender).attr("argument");}
			if ($(sender).attr("argumentf")){MyStr.argumentf= $(sender).attr("argumentf");}
			if ($(sender).attr("parametr")){MyStr.parametr	= $(sender).attr("parametr");}
			try{
				if ($(sender).attr("loaderSwitch")){
					$(objsw).children("div[name='none']").load($(sender).attr("loaderSwitch"), MyStr);}
				else{
					$(objsw).children("div[name='none']").load("lib/switchboard.php", MyStr);}}
			catch(e){}
			$(objsw).children("div[name='none']").css("display","block");
			try{
				$(sender).attr("src",$(sender).attr("src").replace("/+","/-"));}
			catch(e){return;}
			$(sender).attr("title","Закрыть раздел");
			$(objsw).attr("deployed","1");}
    else{
			$(objsw).children("div[name='none']").css("display","none");
			try{
	        $(sender).attr("src",$(sender).attr("src").replace("/-","/+"));}
	       catch(e){return;}
	       $(sender).attr("title","Открыть раздел");
	       $(objsw).attr("deployed","0");}}

/*----------------------------------------------------------------------------*/
function node_clickSw(sender){
	var objCl= $("#img"+$(sender).attr("key"));
	if ($(sender).attr("isfolder")){if ($(sender).attr("isfolder") != "0"){deploySw(objCl);}}
	commandSw(sender);
	markSw(sender);}

/*----------------------------------------------------------------------------*/
function commandSw(sender){
	if($(sender).attr("subconto")!="ump"){
    	if($(sender).attr("isfolder")!="0"){return;}}

    var mcommand=$(sender).attr("command");

    if (mcommand.length<2){
		alert("Команда не (command) определена. Обратитесь к системному администратору.");
		return;}
    else if (mcommand=="showModalDialog"){
		MyStr	= $(sender).attr("argument")+"?"+$(sender).attr("parametr");
		windowOpen(MyStr,"window",1024,768);}
	else if (mcommand=="href"){
		if($(sender).attr("parametr")=="modul"){
			window.location= window.location.protocol+"//"+window.location.host+"/"+$(sender).attr("argument");}
		else if($(sender).attr("parametr")=="okno"){
			MyStr	= window.location.protocol+"//"+window.location.host+"/"+$(sender).attr("argument");
			windowOpen(MyStr,"commandSw",1024,768);}
		else{
			MyStr	= $(sender).attr("argument")+"?"+$(sender).attr("parametr");
			windowOpen(MyStr,"commandSw",1024,768);}}

	else if ((mcommand=="send")||(mcommand=="loadAjax")){
		var args		= {};
		var sendtoform = "rightpanel";
		var argumentform = "0";
		args			= stringToObj($(sender).attr("parametr"));

		if ($(sender).attr("key"))	{args.key = $(sender).attr("key");}
		else								{if(key!="0"){args.key = key;}}

		args.subconto	= $(sender).attr("subconto");

		if ($(sender).attr("ajax"))		{args.ajax	= "1";}
		if ($(sender).attr("argument"))	{argumentform	= $(sender).attr("argument");}
		if ($(sender).attr("argumentf"))	{argumentform 	= $(sender).attr("argumentf");}
		if ($(sender).attr("file"))		{args.file 		= $(sender).attr("file");}
		if ($(sender).attr("sendto"))		{sendtoform 	= $(sender).attr("sendto");}
		$("#"+sendtoform).load(argumentform,args);}
	else if (mcommand=="xmlobj"){
		var objxml		= {};
		objxml.key		= $(sender).attr("key");
		objxml.subconto	= $(sender).attr("subconto");
		if ($(sender).attr("argument")){objxml.argument	= $(sender).attr("argument");}
		if ($(sender).attr("argumentf")){objxml.argumentf= $(sender).attr("argumentf");}
		objxml.parametr	= $(sender).attr("parametr");
		loadAjax(objxml.parametr,objxml,"rightpanel");}
	else if (mcommand=="divbody"){
		if (!$("#divbody").is("div")){
			bodyOnAppend("divbody",$("#"+sender.id).html());
			$("#divbody").css({
				top		: "78px",
				left		: args.left,
				height	: "582px",
				width		: args.width,
				background	: args.background,
				color		: args.color,
				border	:"2px  solid gray"});}
		$("#divbody").show();
		$("#divbodyroot").load($(sender).attr("argument"),stringToObj($(sender).attr("parametr")));}
	else if (mcommand=="spanoutput"){
		var args = stringToObj($(sender).attr("parametr"));
		spanOutputStart(sender,args);
		$("#spanOutput").load($(sender).attr("argument"),args);}
    else if (mcommand=="shell"){
		try{
			var MyShel = new ActiveXObject("WScript.Shell");
			MyShel.Run( $(sender).attr("argument")+" "+$(sender).attr("parametr"));}
		catch(e){alert("Невозможно открыть приложение. "+e.description);}}}

/*----------------------------------------------------------------------------*/
function onmouseoverSw(sender){var obj=ajax_obj(sender);$(obj).addClass("hover");}
function onmouseoutSw(sender)	{var obj=ajax_obj(sender);$(obj).removeClass("hover");}

/** ---------------------------------------------------------- */
function v_mouseout(sender) 		{$(sender).removeClass("hover");}
function v_mouseover(sender) 	{$(sender).addClass("hover");}

/*----------------------------------------------------------------------------*/
function onmouseMark(sender)	{$(sender).addClass("mark");}
function onmouseUnMark(sender){$(".mark").removeClass("mark");}
function marks(sender){onmouseUnMark(sender);onmouseMark(sender);}

/*----------------------------------------------------------------------------*/
function onmouseMarkSw(sender)	{$(sender).addClass("active");}
function onmouseUnMarkSw(sender){$(".active").removeClass("active");}
function markSw(sender){onmouseUnMarkSw(sender);onmouseMarkSw(sender);}
function isrightpanel(){
	if ($("div[id='right_panel']").is("div")) {return "right_panel";}
	return "rightpanel";}
/*----------------------------------------------------------------------------*/
function onmouseoverMenu(sender){$(sender).addClass("menu_hover");}
function onmouseoutMenu(sender)	{$(sender).removeClass("menu_hover");}
function onmouseMarkMenu(sender)	{$(sender).addClass("menu_active");}
function onmouseUnMarkMenu(sender){$(".menu_active").removeClass("menu_active");}
function markMenu(sender) {
	spanOutputclose(sender);
	$(".spanOutput").remove();	
 	var myfunc		= $(sender).attr("myfunc");
 	var mcommand=$(sender).attr("command");
 	Put_default(sender);
	menuid	= $(sender).attr("id");
	onmouseUnMarkMenu(sender);onmouseMarkMenu(sender);
	//if($(sender).attr("myparametr")){
	//		myfunc=myfunc.split("?");
	//		if(myfunc[1]){myfunc=myfunc[0]+"?"+myfunc[1]+"&";}
	//		else{myfunc=myfunc[0]+"?";}
	//		myfunc=myfunc+$(sender).attr("myparametr");}
   if (window.name=="subconto_"+subconto){rightpanel=myfunc;reloadRight();}
   else if (window.name=="payment/"+subconto){rightpanel=myfunc;reloadRight();}
   else{
   	var args			= {};
   	var mylocation	= ($(sender).attr("argument"))?$(sender).attr("argument"):"rightpanel";
   	var parametr	= ($(sender).attr("parametr"))?$(sender).attr("parametr"):"s=groups";
   	args.main		= identification;
   	args.mylocation= mylocation;
   	args.parametr	= parametr;
   	 if ($(sender).attr("command")=="showModalDialog"){
				MyStr	= $(sender).attr("myfunc")+"?"+$(sender).attr("parametr");
				windowOpen(MyStr,"window",1024,768);return false;}
		$("#"+mylocation).empty();
		if (mylocation=="rightpanel") {
			var menuname=($(sender).attr("title"))?$(sender).attr("title"):"0";
			menuname=($(sender).attr("header"))?(($(sender).attr("header")!="0")?menuname:"0"):"0";
			//alert(menuname);
			$.post(myfunc,args,function(data) {
				var mystr="";
				if (menuname!="0") {
						mystr="<div class='center_content_main'><div class='title' id='name_rightpanel'><h3>"+menuname+
									"</h3></div><div class='content' id='right_panel' name='rightpanel'>"+data+"</div></div>";}
				else{mystr=data;}
				$("#"+mylocation).html(mystr);});}
		else if (mcommand=="href"){
			if($(sender).attr("argument")=="modul"){
				window.location= window.location.protocol+"//"+window.location.host+"/"+$(sender).attr("argument");}
			else if($(sender).attr("argument")=="okno"){
				MyStr	= window.location.protocol+"//"+window.location.host+"/"+$(sender).attr("modul");
				MyStr	+= "?"+$(sender).attr("parametr");
				windowOpen(MyStr,"commandSw",1024,768);}
			else{
				MyStr	= $(sender).attr("argument")+"?"+$(sender).attr("parametr");
				windowOpen(MyStr,"commandSw",1024,768);}}
		else {
			$("#"+mylocation).load(myfunc,args);}}}

/*------------------------------------------------------------------------*/
function mark_all(sender)	{
	sender=(sender)?sender:"checkbox";
	$("[name^='"+sender+"']").attr("checked",true);}
function no_mark(sender)	{
	sender=(sender)?sender:"checkbox";
	$("[name^='"+sender+"']").attr("checked",false);}
function revers(sender)	{
	sender=(sender)?sender:"checkbox";
	$("[name^='"+sender+"']").each(function(){this.checked=!this.checked;});}

/*------------------------------------------------------------------------*/
function logcount(sender)	{
	var args	= {},myfunc="poseshen",sendtoform="rightpanel";
	if($("#begin").attr("id"))			{args.begin	= $("#begin").attr("value");}
	if($("#end").attr("id"))			{args.end	= $("#end").attr("value");}
	if($(sender).attr("log"))			{args.log	= $(sender).attr("log");}
	if($(sender).attr("func"))			{myfunc		= $(sender).attr("func");}
	if($(sender).attr("sendtoform"))	{sendtoform	= $(sender).attr("sendtoform");}
	$("#"+sendtoform).load(myfunc+".php",args);}

/*------------------------------------------------------------------------*/
function fromMyForm(sender){
		var f_id		= $(sender).attr('formid');
		var f_line	= {};
		var f_action= $('#'+f_id).attr('submit');
		var cname	= "";
		f_line.ajax	= '1';
		$('#'+f_id + ' input').each(function(data){
				if($(this).attr('name')=="cell")			{cname = $(this).attr('cname');}
				else												{cname = $(this).attr('name');}
				if($(this).attr("type")=="checkbox")	{f_line[cname]	= this.checked*1;}
				else												{f_line[cname]	= $(this).attr('value');}});
		$.post(f_action,f_line,function(data,status){
				if(status=='success'){$('#rightpanel').html(data);}});

		return false;}
		
/*------------------------------------------------------------------------*/
function timetosec(sender) {
		var mytmp=sender.split(":");
		if (mytmp.length==1) 		{return mytmp[0]*1;}
		else if (mytmp.length==2) 	{return mytmp[0]*60+mytmp[1]*1;}
		else if (mytmp.length==3) 	{return mytmp[0]*60*60+mytmp[1]*60+mytmp[2]*1;}
		return sender;}
 
 /*------------------------------------------------------------------------*/
function sectotime(sender) {
		var h=0;var m=0;var s=0;
		h = Math.floor(sender*1/3600);
		m = Math.floor((sender*1-h*3600)/60);
		s = sender*1-h*3600-m*60;//alert(sender+"="+h+"="+m+"="+s);
		return h+":"+m+":"+s;}
 
/*------------------------------------------------------------------------*/
function pause(sender) {
 var date = new Date();
 var curDate = null;
 do { curDate = new Date(); }
 while(curDate-date < sender);}
 
/*---------------------------------------------------------------------------------------------------*/				
function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}}
            
/*---------------------------------------------------------------------------------------------------*/	            
function getNameRightPanel() {
    if($("div").is("#right_panel")) {
        return "#right_panel";
    }
    else {
        return "#rightpanel";
    }
}       	 
 /*------------------------------------------------------------------------*/
function fullScreen(sender) {alert(sender.webkitRequestFullScreen);

  if(sender.requestFullScreen) {alert(1);sender.requestFullScreen();}
  else if(sender.webkitRequestFullScreen ) {alert(2);sender.webkitRequestFullScreen();}
  else if(sender.mozRequestFullScreen) {alert(3);sender.mozRequestFullScreen();}}
//-->