<!--
/*****************************************************************************
 * Load-Save for Ajax  (iframePostData)                                      *
 * Copyright (c) 2008,2010,2014 Miden co. All rights reserved.               *
 ****************************************************************************/
var contObject		= "";
var menuid				= null;
var identification	= 0;

var pagemin			= 15;	/*Минимум записей на страницу*/
var pagecur			= 1;	/*Текущая страница*/
var pageold			= 1;	/*Предыдущая страница*/
var pagemax			= 1;	/*Всего страниц*/

var r_table			= false;
var r_tablex		= "0";
var r_tabley		= "0";
var r_subconto		= false;
var r_key			= false;
var r_id				= false;
var s_edit			= false;
var spanOutputElem= 0;
var saveObject_counter=0;

/*----------------------------------------------------------------------------*/
function save(sender,dop){	
	var elements = $("[name='cell']"); 
	var args = {};
	if (!key){key="0";}
	var ii="0";
	var mdop="0";
	if(dop){if(dop=="copy"){mdop="copy";}}
	$("[name='cell']").each(function(index){
		if($(this).attr("cname")=="Array")	{return;}
		if((($(this).attr("cname")=="new")||($(this).attr("pole")=="new"))||(key=="0")||(mdop=="copy"))	{
			args["new"]=$(this).attr("subconto");
			if ($("#key"+$(this).attr("subconto")).attrvalue()){
				key=$("#key"+$(this).attr("subconto")).attrvalue();}
			if ($(this).attr("key"))	{args["new"] += "|" + $(this).attr("key");}
			else						{args["new"] += "|" + key;}}
		if ($(this).attr("key"))	{mtmp = $(this).attr("key") + "|";}
		else						{mtmp = key + "|";}
		mtmp +=  $(this).attr("subconto") + "|";
		if($(this).attr("cname"))		{mtmp += $(this).attr("cname") + "|";}
		else if($(this).attr("field")){mtmp += $(this).attr("field") + "|";}
		else									{mtmp += $(this).attr("cname") + "|";}

   	if($(this).attr("type") == "checkbox")					{mtmp += ($(this).prop("checked") ? "1" : "0");}
   	else if($("textarea[id='"+this.id+"']").attr("id")){mtmp += $(this).val();}
   	else if($(this).attr("realvalue") != null)			{mtmp += $(this).attr("realvalue");}
		else													{
			mtmp += ($(this).attrvalue())?$(this).attrvalue():"0";}	
			ii++;if(mtmp){args["source"+ii]=mtmp;}});
	//multiAlert=true;//debugAlert=true;alert(mtmp);
	args.functoajax="save";
	if(dop){
		if(dop=="copy"){
			if(confirm("Произвести копирование?")){$.post(dirFrame+"ajax_"+"copy.php",args);}}
		if(dop=="add"){
			if(confirm("Добавить запись?")){$.post(dirFrame+"ajax_"+"edit.php",args,function(data){alert(data);});}}}
	else{
		if(!confirm("Произвести сохранение?")){return 0;}
		if(key=="0"){
			$.post(dirFrame+"ajax_"+"prov.php",args,function(data){
				if(data=="0"){$.post(dirFrame+"ajax_"+"edit.php",args);}
				else{
					if ($("#spanOutput").attr("id")){spanOutputclose();}
					var argsSpan={};
					//argsSpan.top=200;
					//argsSpan.left=300;
					argsSpan.width=600;
					spanOutputStart(sender,argsSpan);
					$("#spanOutput").html(data);}});}
		else{$.post(dirFrame+"ajax_"+"edit.php",args);}}
	return false;}
/*--------------------------------------------------------------------------------------------*/
function save_prov(sender){save(sender,"add");}

/*--------------------------------------------------------------------------------------------*/
function saveObject(flag,dop_html,sender,m_alert){
	var xkey			= "0" ;
	var obj			= sender;
	var xsubconto	= subconto;
	flag				= (flag)	? flag  : "";
	dop_html			= (dop_html)? dop_html  : "";
	var args			= {};
	var args1		= {};
	if(!$(obj).is("tr")){obj=$(obj).parent();
		if(!$(obj).is("tr")){obj=$(obj).parent();}
		if(!$(obj).attr("key")){return;}}
	var mkey		= $(obj).attr("key");
	if(flag=="copy"){flag="new";args["copy"]="1";}
	var msubconto	= $(obj).attr("subconto");
	if (flag.length>1){
		if(flag=="new"){
			args["new"]=msubconto + "|" ;
			if (mkey=="0"){
				if ($("#"+$(obj).attr("id")+ " td input[cname='"+msubconto+"']").attrvalue()){
					mkey=$("#"+$(obj).attr("id")+ " td input[cname='"+msubconto+"']").attrvalue();}}
			args["new"] +=mkey;
			try		{
				if ($(obj).attr("pole")){xsubconto=$(obj).attr("pole");}
				else{xsubconto = source;}}
			catch(e)	{xsubconto = subconto;}
			try{
				if((subconto)&&(key)){args["source0"]=mkey+"|"+msubconto+"|"+xsubconto+"|"+key;}}
			catch(e){alert("Ошибка в Object(new):"+e.message);return false;}}}
	//alert(args);	
	
	$(obj).children().each(function(pos){
		var element =$(this).children(0);
		if (!$(element).attr("id"))	{element = $(element).children(0);}
	
		if ($(element).is("table")) {element = $(element).children(0).children(0).children(0).children(0);}
		
		if ($(element).attr("subconto")){
			mystr=mkey + "|" + msubconto + "|";
			if($(element).attr("id")=="itemnumber")	{mystr += $(element).attr("id") + "|";}
			else if($(element).attr("cname"))			{mystr += $(element).attr("cname") + "|";}
   		else													{mystr += $(element).attr("id") + "|";}
   		if($(element).attr("type") == "checkbox")	{mystr += ($(element).prop("checked") ? "1" : "0");}
   		else if($(element).is("TEXTAREA"))			{mystr += $(element).val();}
   		else if($(element).attr("realvalue"))		{mystr += $(element).attr("realvalue");}
			else													{mystr += $(element).attrvalue();}
			tsource		= "source" + pos;//alert(mystr);
			args[tsource]= mystr;}});
	//args=stringToObj(dop_html);
	args.functoajax="saveObject";
	args.parenttoajax	= mkey;//debugAlert=true;
	if(args["copy"])	{$.post( dirFrame+"ajax_"+"copy.php",args,function (data){saveObject_counter++;});}
	else					{$.post( dirFrame+"ajax_"+"edit.php",args,function (data){saveObject_counter++;});}
	return false;}

/*--------------------------------------------------------------------------------------------*/
function saveElement(sender){
	if(!sender){return 0;}
	var obj= sender;
	var args	= {};
	if($(obj).attr("key")){args.source= $(obj).attr("key") + "|" + $(obj).attr("subconto") + "|";}
	else{args.source= key + "|" + $(obj).attr("subconto") + "|";}
	
	if($(obj).attr("pole"))			{args.source +=  $(obj).attr("pole") + "|";}
	else if($(obj).attr("field"))	{args.source +=  $(obj).attr("field") + "|";}
   else									{args.source +=  $(obj).attr("id") + "|";}
	
   if($(obj).attr("type") == "checkbox")					{args.source+=($(obj).prop("checked") ? "1" : "0");}	
   else if($("textarea[id='"+obj.id+"']").attr("id"))	{args.source+=$(obj).val();}
   else if($(obj).attr("realvalue")!= null)				{args.source+=$(obj).attr("realvalue");}
	else																{
		args.source+=($(obj).attrvalue())?$(obj).attrvalue():"0";}
	args.functoajax="saveElement";
	$.post(dirFrame+"ajax_"+"edit.php",args);
	return false;}
	
/*--------------------------------------------------------------------------------------------*/
function Put_default(sendert){ 
	try{
		sender=(typeof(sendert)=="object")?sendert:$("#"+sendert);}
	catch(e){sender=sendert;}
	var args	= {};
	if(!$(sender).attr("table")){return;}
	
	args.tableid= $(sender).attr("table");
	args.tableid = args.tableid.replace("new/","edit/");
	var mytmp=args.tableid.split("/");
	if(mytmp[0]=="filtr")		{}
	else if(mytmp[1]=="soderg")			{args.tableid = "edit/"+mytmp[1];}
	else if(mytmp[0]=="search")	{}
	else if(mytmp[0]=="groupby")	{}
	else if(mytmp[0]=="menu")		{}
	else if(mytmp[0]=="payment")	{}
	else if(mytmp[0]=="sub")		{}
	else if(mytmp[1]=="ocenka")	{args.tableid = "edit/"+mytmp[1];}
	else if(mytmp[1]=="begin")		{args.tableid = mytmp[1];}
	else if(mytmp[1]=="end")		{args.tableid = mytmp[1];}
	else if(mytmp[1]=="payment")	{}
	else if(mytmp[1]=="top")		{}
	else {
			if(mytmp[1])	{args.tableid = "edit/"+mytmp[1];}
			else				{args.tableid = args.tableid.replace("new","edit");}}
	
	if ($(sender).attr("parametr"))	{args.parametr = $(sender).attr("parametr");}
	else										{args.parametr = $(sender).attr("id");} 
	
	if($(sender).attr("type") == "checkbox")		{args.valueum = ($(sender).prop("checked") ? "1" : "0");}
	else if($(sender).is("textarea"))				{args.valueum = $(sender).val();}
	else if($(sender).is("nobr"))						{args.valueum = $(sender).attr("id");}
	else if($(sender).is("span"))						{args.valueum = $(sender).attr("id");}
	else if($(sender).is("table"))					{args.valueum = $(sender).attr("id");}
	else if($(sender).is("a"))							{args.valueum = $(sender).attr("id");}
	else if($(sender).attr("realvalue")!= null)	{args.valueum = $(sender).attr("realvalue");}
	else													{
		args.valueum=($(sender).attrvalue())?$(sender).attrvalue():"0";}
	 if($(sender).attr("oldvalue")){
	 	if($(sender).attr("oldvalue")==args.valueum){return false;}}	
		
	if(args.parametr =="orderby"){if(!isNaN(args.valueum)){return	 "0";}}
	if ($(sender).attr("cookie")) {Put_defCookie(args);}
	else									{Put_defParam(args);}
	return false;}
	
/*--------------------------------------------------------------------------------------------*/
function Put_defaultAll(sender){ 
	$("[name='cell']").each(function(index){
		if($(this).attr("type") == "checkbox")						{mvalue = ($(this).prop("checked") ? "1" : "0");}
   	else if($("textarea[id='"+this.id+"']").attr("id"))	{mvalue = $(this).html();}
   	else if($(this).attr("realvalue") != null)				{mvalue = $(this).attr("realvalue");}
		else																	{mvalue = ($(this).attrvalue())?$(this).attrvalue():"0";}
		mtable	= "edit/"+$(this).attr("subconto");
		mparametr= ($(this).attr("pole"))?$(this).attr("pole"):$(this).attr("cname");
		Put_defParam(mtable,mparametr,mvalue);});
		return false;}
		
/*--------------------------------------------------------------------------------------------*/
function Put_defParam(mtable,mparametr,mvalue){/*alert(mtable);*/
	var args	= {};
	if (typeof(mtable)=="object")	{args	= mtable;}
	else									{args	= {tableid:mtable,parametr:mparametr,valueum:mvalue};}

	$.post(dirFrame+"ajax_"+"default.php",args,function (data) {/* alert(data)*/});
	return false;}
	
/*--------------------------------------------------------------------------------------------*/
function Put_defCookie(mtable,mparametr,mvalue){
	var args	= {};
	if (typeof(mtable)=="object")	{args	= mtable;}
	else									{args	= {tableid:mtable,parametr:mparametr,valueum:mvalue};}
	var days = "1";
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	$.cookie(args.tableid+":"+args.parametr, args.valueum,{expires: date.toGMTString(), path: "/"});
	return false;}	
	
/*--------------------------------------------------------------------------------------------*/
function Put_defUnset(){
	if(!confirm("Удалить умолчания?\n При удалении удалятся фильтры, рабочие периоды. \n Советуем хорошо подумать ...")){
		return false;}
	var args	= {};
	$.post(dirFrame+"ajax_"+"defunset.php",args,function (data) {
		alert(data);
		window.location="?";});
	return false;}	
	
/*--------------------------------------------------------------------------------------------*/
function Erase_Interf(){
	if(!confirm("Очистить интерфейс?")){return false;}
	var args	= {};
	$.post(dirFrame+"ajax_"+"erase.php",args,function (data) {
		alert(data);
		window.location="?";});
	return false;}	
	
/*--------------------------------------------------------------------------------------------*/
function Put_UnsetCookie(mtable,mparametr){
	if(!confirm("Удалить умолчания?\n При удалении удалятся фильтры, рабочие периоды. \n Советуем хорошо подумать ...")){
		return false;}
	$.cookie(tableid+":"+parametr, null);
	return false;}	
		
/*--------------------------------------------------------------------------------------------*/
function Get_DefaultOfTable(mtable,mparametr){
	var args	= {tableid:mtable,parametr:mparametr}
	args=$.post(dirFrame+"ajax_"+"getdefault.php",args);
	return args.responseText;}	
	
/*--------------------------------------------------------------------------------------------*/
function Get_DefaultOfCookie(mtable,mparametr){
	var args=$.cookie(tableid+":"+parametr);
	return args;}	
	
/*------------------------------------------------------------------------------------------*/
function putsession(sender){
	var myval=$(sender).attrvalue();
	$.post(dirFrame+"updatesession.php",{key:$(sender).attr("id"),value:myval});
	return false;}
		
/*------------------------------------------------------------------------------------------*/
function putsessionvalue(sender,mvalue){
	//alert(sender+mvalue);
	$.post(dirFrame+"updatesession.php",{key:sender,value:mvalue},function (data) {
		//alert(data);
		});
	return false;}
			 
/*--------------------------------------------------------------------------------------------*/
function dell(sender){
	if(!confirm("Произвести удаление (с возможностью восстановления)?"))return false;
	$("#dell").attrvalue("1");save(sender);$("#dell").attrvalue("0");
	return false;}
	
/*--------------------------------------------------------------------------------------------*/
function add(sender){
	if($("#new").attrvalue()==null){
		if(key=="0"){return false;}
		if(!confirm("Сохранить запись?")){return false;}
		save();return false;}
	if(!confirm("Добавить новую запись?")){return false;}
	$("#new").attrvalue("1");save();$("#new").attrvalue("0");
	return false;}

/*--------------------------------------------------------------------------------------------*/
function update_record(sender){
	if(sender.key=="0"){return "0";}
	var key		= sender.key;
	var MyStr	= sender.name;//alert(MyStr);
	if (MyStr=="0") {return;}
	if (window.name=="subconto_"+subconto){
		var switchC=$("#switch").attr("checked");
		if(!switchC){$("#element" + key + " td div").html(MyStr);}
		else{$("#switchboard" + key + " nobr span").html(MyStr);}}
	if (window.name=="payment/index"){
		$("#element" + key + " td input").innerHTML=MyStr;}
	if (window.name=="table/index"){
		}
	return "0";}

/*--------------------------------------------------------------------------------------------*/
function insert_record(sender){
	if(sender.key=="0"){return "0";}
	var MyStr		= sender.name;
	var functoajax	= "0";
	if(sender.functoajax){functoajax=sender.functoajax;}
	//alert(window.name+"-"+"payment/"+subconto);
	if ((window.name=="subconto_"+subconto)||(window.name=="payment/"+subconto)||(window.name=="payment_"+subconto)||(window.name=="table/"+subconto)){
			if(functoajax=="save"){
				var switchC=$("#switch").attr("checked");
				if(switchC)	{alert();return false;}
				if($("#element" + sender.key).attr("id")){return 0;}
				if(MyStr	=="0"){return 0;}	
				var oClone	= $("#tfoot tr").clone(true);			
				$(oClone).attr("key", sender.key)
							.attr("name", MyStr)
							.attr("id", "element" + sender.key);
				$(oClone).children("td").children("div")
							.attr("key", sender.key)
							.attr("title", MyStr)
							.html(MyStr);
				$(oClone).children("td:last-child").html(sender.key);
				$("#tbody").append(oClone);
				$("#element" + sender.key + " td div").click();}
			if(functoajax=="saveObject"){
				if(sender.parenttoajax){
					var parenttoajax=$("#r_element"+sender.parenttoajax);
					var oClone	= $(parenttoajax).clone(true);
					if($(oClone).is("tr")){
						$(oClone).attr("class","left_unactive")
							.attr("key",sender.key)
							.attr("id","r_element"+sender.key);						
						$(oClone).children("td:eq(0)")
							.html("<INPUT name='checkbox' type='checkbox' id='checkbox"+sender.key+"' key='"+sender.key+"' style='width:16px;'>");
						$(oClone).children("td:last")
							.children("input")
							.attr("key",sender.key)
							.attr("value","...")
							.attr("title","Редактировать");	
						$("#r_body").append(oClone);}}}}
	if (window.name=="payment/index"){
		MyStr			= dirArm+"payment/root.php?key=" + sender.key;
		var oClone	= $("#tfoot tr").clone(true);
		$(oClone).attr("class","left_unactive")
					.attr("key", sender.key)
					.attr("id", "element" + sender.key);
		$("#tbody").append(oClone);
		reloadRowDok(sender.key);
		windowOpen(MyStr,"addDok",1024,750);}
	if (window.name=="table/index"){
		}
	if (window.name=="index"){
		if(subconto=="abiturient"){
			$("#new").remove();key=sender.key;
			$("#abiturient_key").html(key);
			$("#kabinet").click(save);}}
	return "0";}

/*--------------------------------------------------------------------------------------------*/
function clear_record(sender){
	if(sender.key=="0"){return "0";}
	var key=sender.key;
	if (window.name=="subconto_"+subconto){
			var switchC=$("#switch").attr("checked");
			if(!switchC)	{$("#element" + key).remove();}
			else{$("#switchboard" + key).css({display:"none"});}}
	if (window.name=="payment/index"){}
	if (window.name=="table/index"){}
	$("#rightpanel").html = "";
	return "0";}

/*---------------------------------------------------------------------------------------------------*/
function SubcontoPar(key, ParametrF, TableIdF){
	var MyStr = $.post(subcontodir + "subcontopar.php",{"key":key,"ParametrF":ParametrF,"TableIdF":TableIdF});
	pause(900);
	try		{MyStr=MyStr.responseText;}
	catch(e)	{MyStr="";}
	return MyStr;}
	
/*---------------------------------------------------------------------------------------------------*/	
function pause(prmSec){
	var dateP = new Date();
	var curDate = null;
	do {curDate = new Date();}
	while((curDate-dateP) < prmSec);}
	
/*---------------------------------------------------------------------------------------------------*/
function PageSave(sender){//Переход по страницам
	var mylocation	= $(sender).attr("location"); 
	var newvalue	= $(sender).attr("max_pages");
	var tablepages	= $(sender).attr("tablepages");
	newvalue = prompt("Количество записей для " + tablepages,newvalue);
	if (newvalue == null)	{return 0;}
	if (newvalue < 5)		{newvalue = 5;}
	if (newvalue != null){
			Put_defParam(tablepages,"onpage",newvalue);
			$(sender).attr("max_pages",newvalue);}}	
//-->
