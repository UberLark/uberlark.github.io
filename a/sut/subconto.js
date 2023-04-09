var tablepages	= "/tabcount";	/*Хранение умолчаний для page.*/
var monthName 	= new Array("Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сент.", "Октяб.","Ноябрь", "Декаб.");
var dayName 	= new Array("П","Вт","Ср","Ч","Пт","Сб","Вс");
var dateFormat	= "dd.mm.YYYY";
var monthSelected, yearSelected, dateSelected,omonthSelected, oyearSelected, odateSelected;
var startAt 	= 1;
var today		= new	Date();
var dateNow  	= today.getDate();
var monthNow 	= today.getMonth();
var yearNow  	= today.getYear();
var curdateobj = "";
var tmpobj 		= "";
var rightedit 	= false;
var subcontonow= 0;
var subcontostart = false;
var subcontodelta=0;
var subcontodelta1=0;
var lefttrue	= 0;
var manyclick	= 0;
var leftpanel	= leftpanel || false;
/*---------------------------------------------------------------------------------------------------*/
$(function() {
		$(".ElementSlide").click(ElementSlide);
		$(".get0").keyup(ElementKeyUp).blur(ElementChange);
		$(".get00").blur(ElementChange);
		$(".get0Text").keyup(SubContoKeyUp).dblclick(SubContoDblclick).blur(ElementChange);
		$(".getCheckbox").click(ElementChange);
		$(".getCalendar").click(CalendarOpen).change(CalendarChange).blur(CalendarBlur).keyup(SubContoKeyUp);
		$("[itype='date']").click(getInputValue).change(SubcontoChange).blur(SubcontoChange);
		$(".getInput").blur(SubcontoChange);});

/*---------------------------------------------------------------------------------------------------*/
function SubContoKeyFocus(sender){

	spanOutputclose(sender);spanOutputclose();

	if($(sender).attr("sablon")){setsablonfunc(sender);}
	if($(sender).attr("id")=="search"){
		if($(sender).hasClass("keyboardInput")){$(sender).click(KeyboardOpen).change(KeyboardChange).blur(KeyboardBlur).keyup(KeyboardKeyUp);}
		else{$(sender).keyup(SubContoKeyUp);}}
	else if($(sender).attr("type")=="password"){}
	else if($(sender).attr("type")=="checkbox"){
			Put_default(sender);
			 if($(sender).hasClass("getInput")){$(sender).blur(SubcontoChange);}}
	else if($(sender).hasClass("getAdres")){$(sender).blur(ElementChange).dblclick(SubContoDblclick).click(AdresClick);}
	else if($(sender).hasClass("gethidden")){}
	else if($(sender).hasClass("get0")){$(sender).click(getInputValue).keyup(SubContoKeyUp).blur(ElementChange);}
	else if($(sender).hasClass("get00")){$(sender).click(getInputValue).blur(ElementChange);}
	else if($(sender).hasClass("getFionew")){$(sender).click(getFionew);}
	else if($(sender).hasClass("search")){$(sender).keyup(SearchKeyUp).blur(ElementChange);}
	else if($(sender).hasClass("get0Text")){$(sender).keyup(SubContoKeyUp).dblclick(SubContoDblclick).blur(ElementChange);}
	else if($(sender).hasClass("getCheckbox")){$(sender).click(ElementChange);}
	else if($(sender).hasClass("getParent")){$(sender).mousedown(SubContoDown).keyup(ParentKeyUp).dblclick(ParentDell).blur(ParentChange);}

	else if($(sender).hasClass("getCalendar")){$(sender).click(CalendarOpen).change(CalendarChange).blur(CalendarBlur).keyup(SubContoKeyUp);}
	else if($(sender).attr("itype")=="date"){$(sender).click(getInputValue).change(SubcontoChange).blur(SubcontoChange);}
	else if($(sender).hasClass("keyboardInput")){$(sender).click(KeyboardOpen).change(KeyboardChange).blur(KeyboardBlur).keyup(KeyboardKeyUp);}
	else if($(sender).hasClass("left_unactive")){$(sender).keyup(FillEnter);}
	else if($(sender).hasClass("getInput")){$(sender).click(getInputValue).change(SubcontoChange).blur(SubcontoChange);}
	else if($(sender).hasClass("kladr")){$(sender).dblclick(SubContoDblclick).keyup(SubContoKeyUp).blur(spanOutputclose);}
	else if($(sender).hasClass("ElementSlide")){$(sender).click(ElementSlide);}
	else if($(sender).hasClass("inrol")){$(sender).click(getInRolTable);}
	else if($(sender).hasClass("insubconto")){$(sender).click(getInSubcontoTable);}
	else if($(sender).hasClass("xsubconto")){$(sender).click(getXSubcontoTable);}
	else if($(sender).hasClass("json")){$(sender).click(ReadJSON);}
	else if($(sender).hasClass("ReadEDITOR")){$(sender).click(ReadEDITOR);}
	else{
		$(sender).keyup(SubContoKeyUp).blur(SubContoBlur).mousedown(SubContoDown).contextmenu(SubContoDown);
		if($(sender).hasClass("getSubconto")){
			$(sender).click(getInputValue).dblclick(SubContoDblclick);}
		if($(sender).hasClass("getSubcontoRelation")){
			$(sender).click(getInputValue).dblclick(SubContoDblclick);}}}

/*---------------------------------------------------------------------------------------------------*/
function AdresClick(sender){//return;
		var merr={};
		try{
			var obj			= sender.target;
			merr.eventcode	= sender.keyCode || sender.which;
			merr.typeKey	= sender.type;
			merr.ctrlKey	= sender.ctrlKey;
			merr.altKey		= sender.altKey;
			merr.shiftKey	= sender.shiftKey;}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	if ($(obj).parent().parent().attr("key")!="0") {return;}
	spanOutputclose(obj);
	spanOutputStart(obj);
	tmpobj=obj;
	var tospanOutput="<textarea style='height:120px;width:"+$("#spanOutput").css("width")+"'  onkeyup='putAdressToText(2)'>";
	tospanOutput+=$(obj).attrvalue()+"</textarea>";
	tospanOutput+="<input type='button' value='OK' onclick='putAdressToText(1)'><input type='button' value='Очистить' onclick='putAdressToText(-1)'>";
	$("#spanOutput").html(tospanOutput);
	/* alert($(obj).attrvalue()); */
		cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function putAdressToText(sender){
	if(sender<="0"){$(tmpobj).attrvalue("");$("#spanOutput > textarea:first").attrvalue("");return;}
	$(tmpobj).attrvalue($("#spanOutput > textarea:first").val());
	if(sender=="1"){spanOutputclose();}}

/*---------------------------------------------------------------------------------------------------*/
function getInputValue(sender){
		var merr={};
		try{
			var obj			= sender.target;
			merr.eventcode	= sender.which;
			merr.typeKey	= sender.type;
			merr.ctrlKey	= sender.ctrlKey;
			merr.altKey		= sender.altKey;
			merr.shiftKey	= sender.shiftKey;}
		catch(e){
			alert("Ошибка выполнения: "+e.message);return false;}
		curdateobj = ($(obj).attrvalue())?$(obj).attrvalue():curdateobj;
		curdateobj = ($(obj).attrvalue()=="0")?$(obj).attrvalue():curdateobj;
		if((curdateobj =="-")||(curdateobj =="0")||(curdateobj ==" "))	{$(obj).attrvalue("");}
		else if ($(obj).parent().parent().attr("id")=="r_element0")		{$(obj).attrvalue("");}
		else																				{curdateobj = "";}
		cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function ParentKeyUp(sender){
		var merr={};
		try{
			var obj			= sender.target;
			merr.eventcode	= sender.keyCode || sender.which;
			merr.typeKey	= sender.type;
			merr.ctrlKey	= sender.ctrlKey;
			merr.altKey		= sender.altKey;
			merr.shiftKey	= sender.shiftKey;}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}
		cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function ParentDell(sender){
		var merr={};
		try{
			var obj			= sender.target;
			merr.eventcode	= sender.keyCode || sender.which;
			merr.typeKey	= sender.type;
			merr.ctrlKey	= sender.ctrlKey;
			merr.altKey		= sender.altKey;
			merr.shiftKey	= sender.shiftKey;}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}
		if(confirm("Обнулить Parent?")){
			if($(obj).attrvalue()){$(obj).attrvalue("-");}
			if($(obj).attr("realvalue")){$(obj).attr("realvalue","0");
			saveElement(obj);}}
		cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function ParentChange(sender){
		var merr={};
		try{
			var obj			= sender.target;
			merr.eventcode	= sender.which;
			merr.typeKey	= sender.type;
			merr.ctrlKey	= sender.ctrlKey;
			merr.altKey		= sender.altKey;
			merr.shiftKey	= sender.shiftKey;}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}
		cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function FotoDell(sender){
	FotoDellYN($(sender).attr("subconto"),$(sender).attr("key"));
	cancelPubling(sender);}
/*---------------------------------------------------------------------------------------------------*/
function FotoDellYN(msubconto,mkey){
		var args={};
		if(!confirm("Удалить фото?")){return;}
		args.key=mkey;
		args.subconto=msubconto;
		$.post(subcontodir+"fotodel.php",args,function(data){//alert(data);
				var MyText	=  data.split("#");
				if (MyText[0]=="0") {
							alert("Файл не удален по причине: "+MyText[1]);
							return false;}
				alert("OK");});}
/*---------------------------------------------------------------------------------------------------*/
function FileDell(sender){
	FileDellYN($(sender).attr("subconto"),$(sender).attr("key"));
	cancelPubling(sender);}
/*---------------------------------------------------------------------------------------------------*/
function FileDellYN(msubconto,mkey){
		var args={};
		if(!confirm("Удалить файл(ы)?")){return;}
		args.key=mkey;
		args.subconto=msubconto;
		$.post(subcontodir+"filedel.php",args,function(data){alert(data);
				var MyText	=  data.split("#");
				if (MyText[0]=="0") {
							alert("Файл не удален по причине: "+MyText[1]);
							return false;}
				alert("OK");});}
/*---------------------------------------------------------------------------------------------------*/
function SubContoError(sender){
		var merr={};
		try{
			merr.obj			= sender.target;
			merr.eventcode	= sender.which;
			merr.typeKey	= sender.type;
			merr.ctrlKey	= sender.ctrlKey;
			merr.altKey		= sender.altKey;
			merr.shiftKey	= sender.shiftKey;
			cancelPubling(sender);
			$(sender).returnValue=false;
			return merr;}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}}

/*---------------------------------------------------------------------------------------------------*/
function ElementChange(sender){//alert("ElementChange");
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}

	if($(obj).hasClass("get0")){
		if(($(obj).attrvalue()=='')||($(obj).attrvalue()=='0')){
			if(curdateobj){$(obj).attrvalue(curdateobj);}}
		}
	curdateobj="0";
	if($(obj).hasClass("getCheckbox")){rightedit 	= true;}
	
	Put_default(obj);
	if($(obj).hasClass("get0")){		
		try{
			if (($(obj).attr("schange"))&&(window["schange"])) {schange(obj);}}
		catch(e){return;}}
	
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function ElementKeyUp(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	var myParent= $(obj).parent().parent().parent().parent();
	if($(myParent).attr("id")){if($(myParent).attr("id")=="r_table"){
		r_table=true;
		try{r_TableKeyUp(sender);}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}
		return false;}}}

/*---------------------------------------------------------------------------------------------------*/
function ElementSlide(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;
			var typeKey		= sender.type;
			sender.stopPropagation();
			$(sender).returnValue=false;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	if($(obj).attr("class")!="ElementSlide"){obj=$(obj).parents(".ElementSlide").eq(0);}
	if($(obj).is("a")){return false;}
	else{deployElement(obj);}
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function SubContoBlur(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	setTimeout(spanOutputclose,250);

	if(s_edit){
		Put_default(obj);
		if(($(obj).attr("subconto")=="begin")||($(obj).attr("subconto")=="end")){
			putsessionvalue($(obj).attr("table"),$(obj).attrvalue());}}

	if($(obj).hasClass("getSubconto")){
			if(($(obj).attrvalue()=='')||($(obj).attrvalue()=='0')){
				if(curdateobj){$(obj).attrvalue(curdateobj);}}}
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function SubContoDblclick(sender){
	try{
		var obj			= sender.target;
		var eventcode	= sender.which;
		var ctrlKey	= sender.ctrlKey;
		var altKey		= sender.altKey;
		var shiftKey	= sender.shiftKey;
		var typeKey		= sender.type;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	if($(obj).hasClass("readonly")){return;}
	if($(obj).hasClass("getAdres")){
		if(!key){
			if(confirm("Для обработки адреса необходимо добавить запись в базу данных. \n"+
				"Добавить новую запись?")){add();return false;}}
		if ($("#r_element0").is("tr")) {var hstkey=$(obj).parent().parent().attr("key");}
		else {var hstkey=key;}

		var MyStr = subcontodir + "adres.php?" +
				"table="		+ $(obj).attr("table") +
				"&subconto="	+ $(obj).attr("subconto") +
				"&key=" + hstkey;alert(subcontodir);
		windowOpen(MyStr,"adres", 800,500);}
	else if($(obj).hasClass("kladr")){
		spanOutputclose(obj);
		spanOutputStart(obj);
		$(obj).attrvalue("");
		spanOutputKladr(obj);}
	else{
		spanOutputclose(obj);
		spanOutputStart(obj);
		spanOutputData(obj,true);}
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function SubContoDown(sender){//alert(sender.type);
		try{
			var obj			= sender.target;
			var eventcode	= sender.which;
			var shiftKey	= sender.shiftKey;
			var sctrlKey	= sender.ctrlKey;
			var typeKey		= sender.type;}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}

		if (typeKey=="contextmenu") {SubContoContextMenu(sender);return false;}
		if($(obj).hasClass("getSubconto")||$(obj).hasClass("getParent")){
			if(shiftKey){
				alert("getSubconto/sctrlKey;\n"+
					"r_table="+r_table+";\n"+
					"r_subconto="+r_subconto+";\n"+
					"r_key="+r_key);}
			else if((sctrlKey)||(typeKey=="contextmenu")){fnSubContoEx(obj);}}
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function SubContoContextMenu(sender){
		try{
			var obj			= sender.target;
			var eventcode	= sender.which;
			var shiftKey	= sender.shiftKey;
			var sctrlKey	= sender.ctrlKey;
			var typeKey		= sender.type;}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}
		alert(typeKey);
		cancelPubling(sender);
		return false;}

/*---------------------------------------------------------------------------------------------------*/
function SearchKeyUp(sender){//alert("SearchKeyUp");
	try{
		var obj			= sender.target;
		var eventcode	= sender.which;
		var ctrlKey	= sender.ctrlKey;
		var altKey		= sender.altKey;
		var shiftKey	= sender.shiftKey;
		var typeKey		= sender.type;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	spanOutputclose(obj);
	spanOutputStart(obj,{width:600,left:10});
	var args={};
	if($(obj).attr("subconto"))		{args.subconto 	= $(obj).attr("subconto");}
	if($(obj).attrvalue())			{args.value			= $(obj).attrvalue();}
	if($(obj).attr("pole"))				{args.pole			= $(obj).attr("pole");}
	$.post(subcontodir+"search.php",args,function(data){$("#spanOutput").html(data);});
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
var SubContoTimer=0;
var SubContoTimerT=5; //x*200ms
var SubContoTimerObj=0;

function SubContoKeyUp(sender){
	
	if ((typeof sender=="number")&&(SubContoTimer>=SubContoTimerT))	{
		//console.log(SubContoTimer+"="+SubContoTimerT);
		SubContoTimer=-1;
		sender=SubContoTimerObj;}	
	
	var sender_keyCode='';
	
	if (typeof sender!="number") {
	try{
		var obj			= sender.target;
		var eventcode	= sender.which;
		var ctrlKey	= sender.ctrlKey;
		var altKey		= sender.altKey;
		var shiftKey	= sender.shiftKey;		
		sender_keyCode		= sender.keyCode;
		var typeKey		= sender.type;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	cancelPubling(sender);}
	
	if ((!ctrlKey)||(sender_keyCode!=86)) {
	if ((typeof sender!="number")&&(SubContoTimer==0))	{SubContoTimer++;
		setTimeout("SubContoKeyUp(1)",200);		
		SubContoTimerObj=sender;
		return;}	
	else if	(SubContoTimer<0) {SubContoTimer=0;}
	else if ((typeof sender!="number")&&(obj==SubContoTimerObj.target)&&(SubContoTimer<SubContoTimerT))	{
		//console.log(SubContoTimer+"<"+SubContoTimerT);
		SubContoTimer=1;return;
	}
	else if ((typeof sender!="number")&&(SubContoTimer<SubContoTimerT))	{
		spanOutputclose();
		try{		
			$(SubContoTimerObj.target).val("");	}		
		catch(e){}
		SubContoTimerObj=sender;
		SubContoTimer=1;return;
	}	
	else if ((typeof sender=="number")&&(SubContoTimer<SubContoTimerT))	{			
		SubContoTimer++;
		setTimeout("SubContoKeyUp(1)",200);
		return;}		
	else {}
	} //else {console.log("ctrl key "+sender_keyCode);}

	if((eventcode==16)||(eventcode==17)){return false;}
	//if((eventcode==35)||(eventcode==37)||(eventcode==39)){return false;}
	if((eventcode==46)||(eventcode==32)){curdateobj="0";return false;}
	if((eventcode==13)||(eventcode==9)){
			spanOutputclose();Put_default(obj);
			if(eventcode==9){getInputValue(sender);}

			if(r_table){}
			else{
				if($(obj).attr("id")=="search"){if(lefttrue==0){lefttrue= 1;reloadLeft("leftpanel");}else{return false;}}
				else if($(obj).hasClass("kladr")){KladrKeyPut(obj);return false;}
				else if(shiftKey){return;}
				else if(($(obj).attr("subconto")=="begin")||($(obj).attr("subconto")=="end")){
					putsessionvalue($(obj).attr("table"),$(obj).attrvalue());
					lefttrue= true;
					GO_onclick();}}
			cancelPubling(sender);
			return false;}

	if (eventcode==27)	{/*Esc*/
		spanOutputclose(obj);
		SubContoKeyOld(obj);
		cancelPubling(sender);
		return;}

	if ($("#spanOutput").attr("id")){
		if(eventcode==38)	{/*up*/
			SubContoKeyMoveTo(obj,-1);
			if($(obj).hasClass("kladr")){}
			cancelPubling(sender);
			return false;}
		else if(eventcode==40)	{/*dn*/
			SubContoKeyMoveTo(obj,1);
			if($(obj).hasClass("kladr")){}
			cancelPubling(sender);
			return false;}}

	if(eventcode==40)	{/*dn*/
			manyclick++;
			if (manyclick==2) {
				manyclick=0;
				cancelPubling(sender);
				return false;}}
	/*alert($(obj).attrvalue()+ " " + eventcode+ " " + typeKey);console.log(eventcode); */
	if ((eventcode==8)||(eventcode==46)||(eventcode>47))	{
			s_edit = true;rightedit 	= true;
			if($(obj).hasClass("getTextarea")){}
			else if($(obj).hasClass("get0")){
				var pattern = /[^0-9\.]/i;
				if ($(obj).val().search(pattern)<0) {spanOutputclose();return  false;}
				pattern = /^\s/i;
				if ($(obj).val().search(pattern)!=0) {$(obj).attrvalue($(obj).val().replace(pattern,""));}
				if (!$("#spanOutput").attr("id")){spanOutputStart(obj);}
				spanOutputData(obj);}
			else if($(obj).hasClass("getCalendar")){
				//if($(obj).attrvalue().length==2){alert($(obj).attrvalue().length);}
				}
			else if($(obj).hasClass("kladr")){
				if (!$("#spanOutput").attr("id")){spanOutputStart(obj);}
				spanOutputKladr(obj);}
			else{
				var mtable=false;
				if(($(obj).attr("table"))&&(!$(obj).hasClass("getSubconto"))){
					var mtable=$(obj).attr("table").split("/");
					mtable=(mtable[0]=="filtr")?true:false;}
				if(mtable){Put_default(obj);return false;}
				if (!$("#spanOutput").attr("id")){spanOutputStart(obj);}
				spanOutputData(obj);}
			cancelPubling(sender);
			if ($("#poisk[pole='poisk']").attr("name")&&($(obj).attr("id")=="name")) {
					$("#poisk[pole='poisk']").attrvalue($(obj).attrvalue());}
			return  false;}


	var myParent= $(obj).parent().parent().parent().parent();
	if($(myParent).attr("id")){if($(myParent).attr("id")=="r_table"){
		r_table=true;
		try{r_TableKeyUp(sender);}
		catch(e){alert("Ошибка выполнения: "+e.message);return false;}}}
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function spanOutputData(sender,dopvalue){
	var mfirts=0;
	subcontonow = new Date().getTime();
	if(!subcontostart){subcontostart = new Date().getTime();mfirts=1;}
	if(((subcontonow*1-subcontostart*1-800)<0)&&(mfirts==0)){return false;}
	var args={};
	if($(sender).attr("realsubconto"))	{args.subconto 	= $(sender).attr("realsubconto");}
	else											{args.subconto 	= $(sender).attr("subconto");}
	if($(sender).attr("realvalue"))		{args.realvalue	= $(sender).attr("realvalue");}
	if($(sender).attrvalue())			{args.value			= (!dopvalue)?$(sender).attrvalue():"";}
	if($(sender).attr("cname"))			{args.cname			= $(sender).attr("cname");}
	if($(sender).attr("distinct"))		{args.distinct		= $(sender).attr("distinct");}
	if($(sender).attr("pole"))				{args.pole			= $(sender).attr("pole");}
	if($(sender).attr("filtr"))			{args.filtr			= $(sender).attr("filtr");}

	if($(sender).closest("div.oblast0").length) {
		args.oblast=$(sender).closest("div.oblast0").attr("oblast");
		if ($("#zach_type").length) {args.zach_type=$("#zach_type").attr("realvalue");}}

	if(key)																	{args.key			= key;}
	if($("#viddok").attr("realvalue"))	{args.viddok			= $("#viddok").attr("realvalue");}
	//alert(subcontodir);
	var mruut10=subcontodir+"root10.php";//alert(mruut10);
	$.post(mruut10,args,function(data){//alert(data);
		//$("#spanOutput").empty();
		subcontostart = new Date().getTime();
		$("#spanOutput").html(data);});}

/*---------------------------------------------------------------------------------------------------*/
function SubContoKeyOld(sender){
	if($(sender).attr("oldvalue")){
		if($(sender).attr("realvalue")){$(sender).attr("realvalue", $(sender).attr("oldvalue"));}
		else if($(sender).attrvalue()){$(sender).attrvalue($(sender).attr("oldvalue"));}
		if($(sender).attr("class")=="subconto"){console.log("90");
			$(sender).attrvalue(SubcontoPar($(sender).attr("realvalue"),"name",$(sender).attr("realsubconto")));}}
	spanOutputclose(obj);
	spanOutputElem= 0;}

/*---------------------------------------------------------------------------------------------------*/
function SubContoKeyMoveTo(sender,delta){
   var tablelen	= $("#spanOutput table tbody tr").length*1-1;
   $("#spanOutput table tbody tr").removeClass("hover");
   spanOutputElem +=delta*1;
   if(spanOutputElem >tablelen)	{spanOutputElem = 1;}
   else if(0>spanOutputElem)		{spanOutputElem = 1;}
   $("#spanOutput table tbody tr:eq("+spanOutputElem+")").addClass("hover");
   if($(sender).attr("realvalue")){$(sender).attr("realvalue", $("#spanOutput table tbody tr:eq("+spanOutputElem+")").attr("key"));}
    $(sender).attrvalue($("#spanOutput table tbody tr:eq("+spanOutputElem+")").children(0).html());}

/*---------------------------------------------------------------------------------------------------*/
function SubContoKeyPut(sender){
	var idsender	= $("#spanOutput").attr("idsender");
	var keyparent	= $("#spanOutput").attr("keyparent");
	var tsubconto	= $("#spanOutput").attr("subconto");//alert(keyparent);
	var obj        = $("input[id="+idsender+"][subconto="+tsubconto+"]");
	
	if($(obj).length!=1){ //0 или много
		if((keyparent)&&(keyparent!="0"))	{obj = $("tr[key='"+keyparent+"'] td input[id='"+idsender+"']");}
		else if((typeof $("#spanOutputFilter").attr("id")=="undefined")&&(keyparent=="0"))	{obj = $("tr[key='"+keyparent+"'] td input[id='"+idsender+"']");}
		else if ($("#spanOutputFilter").attr("id")) {
				obj= $("#spanOutputFilter #filtertable table tbody tr td input[id="+idsender+"]");}
		else				{spanOutputclose();return;}}
	
	if($(obj).is("[realvalue]")){$(obj).attr("realvalue", $(sender).attr("key"));}
	if($(obj).is("[value]")){$(obj).attrvalue($(sender).children(0).html());}

	Put_default($(obj));
	spanOutputclose();
	SubcontoRelation($(obj));
	try{
		if (($(sender).attr("schange"))&&(window["schange"])) {schange(obj);}}
		//if($(sender).attr("schange")){eval($(sender).attr("schange") + "("+$(sender).attr("key")+")");}}
	catch(e){return;}
	return false;}

/*---------------------------------------------------------------------------------------------------*/
function SubcontoRelation(sender){
	var args={};Mystr="";
	var ParentElement=$(sender).parent().parent();
	if (!$(sender).attr("realsubconto")){return;}	/*Нет связи по subconto*/
	if (!ParentElement){return;}							/*Нет родительского эемента*/
	if (!$(ParentElement).attr("subconto")){return;}/*Не определен элемент subconto*/
	var RelationElement=$("#"+$(ParentElement).attr("id")+" td [relation='"+$(sender).attr("realsubconto")+"']");
	//if (!$(RelationElement).attr("id")){RelationElement=$("[relation='"+$(sender).attr("realsubconto")+"']");}
	if (!$(RelationElement).attr("id")){return;}
	args.key1		= "0";
	args.subconto	= $(ParentElement).attr("subconto");
	args.subconto1	= $(RelationElement).attr("pole");
	args.subconto2	= $(RelationElement).attr("relation");
	args.key2		= $(sender).attr("realvalue");
	args.flag		= $(RelationElement).css("flag");
	args.x			= $(RelationElement).css("width");
	$.post(subcontodir+"getsubcontorelation.php",args,function(data){
		$(RelationElement).replaceWith(data);});}

/*---------------------------------------------------------------------------------------------------*/
function CalendarBlur(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function CalendarChange(sender){
	try{
            var obj			= sender.target;
            var eventcode	= sender.which;
        }
	catch(e){
            alert("Ошибка выполнения: "+e.message);return false;
        }
        
	$(obj).attrvalue(DateChange($(obj).attrvalue()));
	if(($(obj).attr("subconto")=="begin")||($(obj).attr("subconto")=="end")){
					putsessionvalue($(obj).attr("table"),$(obj).attrvalue());}
	Put_default(obj);
	if ($("#spanOutput").attr("id")){spanOutputclose(obj);}
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function CalendarOpen(sender){	//return 0;
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	//if ($("#spanOutput").attr("id")){spanOutputclose(obj);}
	spanOutputclose();
	spanOutputStart(obj,{width:202});
	curdateobj  = obj;
	toMyCalendar="<table width='200px'>";
	toMyCalendar+="<tr><td style='border-bottom:1px solid black;'><center>";
	toMyCalendar+="	<table width='198px'  cellpadding='0' cellspacing='0'  >";
	toMyCalendar+="		<tr><td><input type=button onclick='setCurMonthYear(this);' value='<<' style='font-size:9px;width:21px;'></td>";
	toMyCalendar+="			<td><input type=button onclick='setCurMonthYear(this);' value='<' style='font-size:9px;width:14px;'></td>";
	toMyCalendar+="			<td id='calendar_caption' style='background-color: #EDEDE1;font-size:10px;'>caption</td>";
	toMyCalendar+="			<td><input type=button onclick='setCurMonthYear(this);' value='>' style='font-size:9px;width:14px;'></td>";
	toMyCalendar+="			<td><input type=button onclick='setCurMonthYear(this);' value='>>' style='font-size:9px;width:21px;'></td>";
	toMyCalendar+="			<td><input type=button onclick='putToMyCalendar0(this);' value='0' style='font-size:9px;width:14px;'></td>";
	toMyCalendar+="			<td><input type=button onclick='spanOutputclose();' value='x' title='Close' style='font-size:9px;width:14px;'></td></tr>";
	toMyCalendar+="		</table></center></td></tr>";
	toMyCalendar+="<tr><td id='calendar_body'>body</td></tr></table>";
	$("#spanOutput").html(toMyCalendar);
	var mval	= $(obj).attrvalue();
	if(mval*1!=0){
		mval		= mval.split(".");
		monthSelected	= mval[1]*1-1;
		yearSelected	= mval[2]*1;
		dateSelected	= mval[0]*1;}
	else{
		var curDate		= new Date();
		monthSelected	= curDate.getMonth();
		yearSelected	= curDate.getFullYear();
		dateSelected	= curDate.getDay();}
	constructCalendar(obj);
	cancelPubling(sender);}

/*---------------------------------------------------------------------------------------------------*/
function constructDate(d,m,y){
	sTmp = dateFormat;
	sTmp = sTmp.replace	("dd","<e>");
	sTmp = sTmp.replace	("d","<d>");
	sTmp = sTmp.replace	("<e>",padZero(d));
	sTmp = sTmp.replace	("<d>",d);
	sTmp = sTmp.replace	("mmm","<o>");
	sTmp = sTmp.replace	("mm","<n>");
	sTmp = sTmp.replace	("m","<m>");
	sTmp = sTmp.replace	("<m>",m+1);
	sTmp = sTmp.replace	("<n>",padZero(m+1));
	sTmp = sTmp.replace	("<o>",monthName[m]);
	return sTmp.replace ("yyyy",y);}

/*---------------------------------------------------------------------------------------------------*/
function padZero(num) {
	return (num	< 10)? '0' + num : num ;}

/*---------------------------------------------------------------------------------------------------*/
function setCurMonthYear (sender) {
	var myval=$(sender).attrvalue();
	if(myval=="<<")		{yearSelected--;}
	else if(myval=="<")	{monthSelected--;}
	else if(myval==">")	{monthSelected++;}
	else if(myval==">>"){yearSelected++;}
	else						{alert("Это не календарь");return 0;}

	if (monthSelected>11) {
		monthSelected=0;
		yearSelected++;}
	if (monthSelected<0) {
		monthSelected=11;
		yearSelected--;}
	constructCalendar();}

/*---------------------------------------------------------------------------------------------------*/
function DateChange(margs){
	var MyStr		= margs;
	while (MyStr.indexOf("/")>0)	{MyStr = MyStr.replace("/",".");}
	while (MyStr.indexOf(" ")>0)	{MyStr = MyStr.replace(" ","");}
	while (MyStr.indexOf("Б")>0)	{MyStr = MyStr.replace("Б",".");}
	while (MyStr.indexOf("б")>0)	{MyStr = MyStr.replace("б",".");}
	while (MyStr.indexOf("ю")>0)	{MyStr = MyStr.replace("ю",".");}
	while (MyStr.indexOf("Ю")>0)	{MyStr = MyStr.replace("Ю",".");}
	while (MyStr.indexOf(",")>0)	{MyStr = MyStr.replace(",",".");}
	while (MyStr.indexOf("..")>0)	{MyStr = MyStr.replace("..",".");}
	return MyStr;}

/*---------------------------------------------------------------------------------------------------*/
function oknoCalendar(sender){
	var mypar=$(sender).attr("func");
	var myval="";
	if(mypar=="year-")		{mypar = "y"; myval = "-1";}
	else if(mypar=="month-"){mypar = "m"; myval = "-1";}
	else if(mypar=="month+"){mypar = "m"; myval = "1";}
	else if(mypar=="year+")	{mypar = "y"; myval = "1";}
	else{return false;}
	putBeginEndCalendar("begin",mypar,myval);
	putBeginEndCalendar("end",mypar,myval);}
/*---------------------------------------------------------------------------------------------------*/
function endDateMonth(mday,mmounth,myear) {
	var	endDate = new Date (myear,mmounth+1,1);
	endDate = new Date (endDate	- (24*60*60*1000));
	return endDate.getDate();}

/*---------------------------------------------------------------------------------------------------*/
function constructCalendar(sender) {
	var dateMessage;
	var	startDate =	new	Date (yearSelected,monthSelected,1);
	numDaysInMonth = endDateMonth(1,monthSelected,yearSelected);

	datePointer	= 0;
	dayPointer = startDate.getDay() - startAt;

	if(dayPointer < 0){	dayPointer = 6;}

	sHTML = "<table border='0' cellpadding='1' cellspacing='1' width='190px'>";
	sHTML += "<tr style='background-color: #EDEDE1;'>";

	for(i=0; i<7; i++) {
		sHTML += "<td width='27' align='center'><B style='background-color: #EDEDE1;color:blue;'>"+ dayName[i]+"</B></td>";}
	sHTML +="</tr><tr>";

	for( var i=1; i<=dayPointer;i++ ){sHTML += "<td>&nbsp;</td>";}

	for( datePointer=1; datePointer<=numDaysInMonth; datePointer++ ){
		dayPointer++;
		sHTML += "<td width='27' align='center'>";

		var sStyle="color: black;"; //regular day

		if ((datePointer==dateNow)&&(monthSelected==monthNow)&&(yearSelected==yearNow)){
			sStyle = "color: red;"; }

		//selected day
		if ((datePointer==odateSelected) &&	(monthSelected==omonthSelected) && (yearSelected==oyearSelected)){
			sStyle = " color: blue;"; }
		if ((dayPointer+startAt) % 7 == startAt) {sStyle = "background-color: #EDEDE1;color:red;";}

		sHTML += "<a style='"+sStyle+"' onClick='javascript:putToMyCalendar(this);'>" + datePointer + "</a></td>";
		msHTML="0";
		if ((dayPointer+startAt) % 7 == startAt) {sHTML += "</tr><tr>";msHTML =1;}}
	//alert(sHTML);
	if(msHTML=="0"){sHTML += "</tr>";}
	sHTML += "</table>";
	mycaption="<nobr style='text-align:center;vertical-align:middle;'>"+monthName[monthSelected]+" "+yearSelected+"</nobr>";
	$("#calendar_body").html(sHTML);
	$("#calendar_caption").html(mycaption);}

/*---------------------------------------------------------------------------------------------------*/
function putToMyCalendar(sender){
	daySelected=$(sender).html();
	var myvalue=padZero(daySelected*1)+"."+ padZero(monthSelected*1+1)+"."+yearSelected;
	$(curdateobj).attrvalue(myvalue); $(curdateobj).val(myvalue);
        Put_default(curdateobj);
	putsessionvalue($(curdateobj).attr("table"),$(curdateobj).attrvalue());
	spanOutputclose(curdateobj);}

/*---------------------------------------------------------------------------------------------------*/
function putToMyCalendar0(sender){
	var myvalue=0;
	$(curdateobj).attrvalue(myvalue);
	Put_default(curdateobj);
	putsessionvalue($(curdateobj).attr("table"),$(curdateobj).attrvalue());
	spanOutputclose("spanOutput");}

/*---------------------------------------------------------------------------------------------------*/
function putBeginEndCalendar(sender,mypar,myval){
	var mval	= $("#"+sender).attrvalue();
	mval		= mval.split(".");
	mval[0]*=1;mval[1]=mval[1]*1-1;mval[2]*=1;

	if(mypar=="y")			{mval[2]+=myval*1;}
	else if(mypar=="m")	{mval[1]+=myval*1;}
	else if(mypar=="d")	{mval[0]+=myval*1;}
	else{alert("00");}
	if(mval[1]<0){mval[1]=11;mval[2]-=1;}
	if(mval[1]>11){mval[1]=0;mval[2]+=1;}

	if(sender=="end"){mval[0] = endDateMonth(1,mval[1],mval[2]);}

	mval=padZero(mval[0]*1)+"."+ padZero(mval[1]*1+1)+"."+mval[2];
 
	$("#"+sender).attrvalue(mval);$("#"+sender).val(mval);
	Put_defParam(sender,sender,mval);
	putsessionvalue($("#"+sender).attr("table"),$("#"+sender).attrvalue());}

/*---------------------------------------------------------------------------------------------------*/
function SubcontoChange(sender){
	try{
			var obj			= sender.target;
			var eventcode	= sender.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}
	SubcontoChangePole(obj);
	if (sender.stopPropagation) {sender.stopPropagation(); }
	else {sender.cancelPubble = true;}}

/*---------------------------------------------------------------------------------------------------*/
function SubcontoChangePole(sender){
	var args	= {};
	if ($(sender).attr("subconto"))	{args.subconto	= $(sender).attr("subconto");}
	if ($(sender).attr("key"))			{args.key		= $(sender).attr("key");}
	if ($(sender).attr("field"))		{args.field		= $(sender).attr("field");}
	if ($(sender).attrvalue())		{args.value		= $(sender).attrvalue();}
	if ($(sender).attr("itype"))		{args.type		= $(sender).attr("itype");}
	if($(sender).attr("type")=="checkbox"){args.value	= $(sender).prop("checked") ? "1" : "0";}
	//debugAlert=true;
	$.post(subcontodir + "subcontochange.php",args,function(data){/*alert(data);*/});}

/*--------------------------------------------------------------------------------------------------*/
function removSubconto(sender){
	var keyE				= $(sender).attr("oldvalue");
	var keyE1			= $(sender).attr("realvalue");
	var subcontoE		= $(sender).attr("cname");
	var MyStr			= "#table_";
	MyStr += subcontoE + "_" + keyE;
	if (keyE=keyE1){return 0;}
	if ($(MyStr)){$(MyStr).remove();}}

/*---------------------------------------------------------------------------------------------------*/
function SubcontoEditUpdate(sender){return;if (menuid){if ($("#"+menuid)){$("#"+menuid).click();}}}

/*=====================================================================*/
function getSubcontoWay(sender){
	var args 		= {};
	args.key			= $(sender).attr("key");
	args.subconto	= $(sender).attr("subconto");
	var MyStr = $.post(subcontodir + "getsubcontoway.php",args);
	return MyStr.responseText;}

/*---------------------------------------------------------------------------------------------------*/
function SubcontoFilter(key,  ParametrF, TableIdF){
	var args 		= {};
	args.key			= key;
	args.ParametrF	= ParametrF;
	args.TableIdF	= TableIdF;
	var MyStr		= $.post(subcontodir + "subcontofilter.php",args);
	return MyStr.responseText;}

/*------------------------------------------------------------------------------------------*/
function putParole(sender){
	var name_id=$(sender).attr("name");
	var args = {};
	args.key	="8";
	var obj=$(sender).parent().parent().children().children("[id="+name_id+"]");
	$.post(subcontodir + "putparole.php",args,function(data){$(obj).attrvalue(data);});}

/*------------------------------------------------------------------------------------------*/
function putNDOG(sender){
	var name_id=$(sender).attr("name");
	var args = {}, MyText	=  "";
	args.key			= key;
	args.subconto	= subconto;
	args.s_subconto	= $(sender).attr("subconto");
	args.price	= $(sender).parent().parent().parent().parent().parent().parent().children().children("[id=price]").attr("realvalue");

	var obj=$(sender).parent().parent().children().children("[id="+name_id+"]");
	$.post(subcontodir + "putndog.php",args,function(data){
		if(typeof(data)=="object")	{MyText	=  data.responseText.split("|");begintext=data.responseText;}
		else								{MyText	=  data.split("|");begintext=data;}
		if (MyText[0]=="0") {
			if(MyText[1]){alert(MyText[1]);}
			else{alert("Ошибка выполнения.");}
			return 0;}
		else{//alert(MyText);
			if(MyText[0].indexOf("error") >"0")		{alert(MyText[0]);return 0;}
			if(MyText[0].indexOf("ERRNO") >"0")		{alert(MyText[0]);return 0;}
			if(MyText[0].indexOf("Undefined") >"0"){alert(MyText[0]);return 0;}
			if(MyText[0].indexOf("SELECT") >"0")	{alert(MyText[0]);return 0;}
			if ($(sender).parent().parent().parent().parent().parent().parent().children().children("[id=number]").is("input")) {
				var mval=MyText[0].substring(9, 12);
				$(sender).parent().parent().parent().parent().parent().parent().children().children("[id=number]").attrvalue(mval)}
			$(obj).attrvalue(MyText[0]);}});}

/*===============================================================================*/
function fnClickOnElement(sender){
	if ((window.event != null) && (window.event.ctrlKey)){
		var obj=event.srcElement;
		if( obj.getAttribute("readonly")){return true;}
		if(obj.tagName.toLowerCase() == "input"){
			if( obj.getAttribute("subconto") != null ){fnSubContoEx(obj);}}}}

/*-------------------------------------------------------------------------------*/
function fnSubContoEx(obj){
	var subconto=$(obj).attr("realsubconto");
	var MyStr	= myLocation(obj);
	var paymentdir=MyStr+"/payment/";
	var MyStr="";
	if(subconto=="payment"){
			var MyStr=paymentdir + "root.php?" +
					"table="		+ $(obj).attr("table") +
					"&subconto="	+ subconto +
					"&key="	+ $(obj).attr("realvalue");}
	else{
			var MyStr=subcontodir + "subcontowex.php?" +
					"table="		+ $(obj).attr("table") +
					"&subconto="	+ subconto +
					"&realvalue="	+ $(obj).attr("realvalue");}

		windowOpen(MyStr,"SubContoEx", 1024,750);}

/*------------------------------------------------------------------------------------------*/
function editPayment(sender){//Редактирование документов	31/12/2006
	var obj	= (sender)?sender:event.srcElement;
	var MyStr	= myLocation(sender);
	var paymentdir=MyStr+"/payment/";
	if (key==0){alert("Для редактирования необходимо выбрать документ.");return;}
	if (obj.tagName == "TD"){obj=obj.parentElement;}
	var MyStr1	= " dialogWidth: 1000px; dialogHeight: 750px; status: no; scroll: no; ";
	var MyStr	= "root.php?key=" + obj.realvalue;
	if (paymentdir){MyStr	= paymentdir+MyStr;}
	if ($("#viddokElement")){MyStr	+= "&viddok=" + $("#viddokElement").attrvalue();}
	if (subconto){MyStr += "&subconto=payment";}
	var args= new args_obj();
	window.showModalDialog(MyStr,args,MyStr1);
	if (args.value.length>1){
		var MyStr	= "key=" + obj.key + "&subconto=" + subconto;
		if (paymentdir){MyStr = $.post(paymentdir+"allwordslist_new.php",MyStr);}
		else{MyStr = $.post("allwordslist_new.php",MyStr);}
		var Myval = MyStr.responseText.split("|");
		try{
			for (var tt=1;tt<Myval.length-1;tt++){obj.children[tt].innerHTML =Myval[tt]+"&nbsp;";}}
		catch(e){alert("Строка не обновляется.");}}}

/*---------------------------------------------------------------------------------------------------*/
function key_selected(sender){
	var args={};
   	if (window.name.substr(0,4)!="root"){return;}
   	args.realvalue	= $(sender).attr("key");
   	args.key			= $(sender).attr("key");
   	args.value		= $(sender).html();
   	if	((args.key!="0")&&(subconto!="ndog")){args.value = SubcontoPar(args.key,"name",subconto);}
   	args.flag		= flag;
   	window.close();}

/*-------------------------------------------------------------------------------*/
function GO_onclick(sender){//alert($("#search").attrvalue());
	var args		= {};
	args.subconto=subconto;
	if(leftpanel!="allwordslist.php"){leftpanel="allwordslist.php";}
	if ($(sender).attr("id")=="GOAll"){
			$("#search").attrvalue("");
			Put_default($("#search"));
			lefttrue= 1;}
	else if ($(sender).attr("id")=="GO"){
			Put_default($("#search"));
			lefttrue= 1;}
	//if ($("#spanOutput").attr("id")){spanOutputclose(sender);}
	args.search=$("#search").attrvalue();//alert($("#search").attrvalue());
	$.post(leftpanel,args,function (data) {$("#leftpanel").html(data);});
	//reloadLeft("leftpanel");
	cancelPubling(sender);
	return false;
	}

/*-------------------------------------------------------------------------------*/
function GO_Switch(sender){
	if(leftpanel=="allwordslist.php")	{leftpanel = "switchboard.php";}
	else											{leftpanel = "allwordslist.php";}
	lefttrue= 1;reloadLeft();}

/*-------------------------------------------------------------------------------*/
function reloadLeft(curlocation){
	var args		= {};
	args.subconto=subconto;
	if (window.name.substr(0,4)=="root"){args.filterno = "1";}
	if (curlocation)	{$.post(leftpanel,args,function (data) {$("#"+curlocation).html(data);});}
	else{
		if(lefttrue==0){cancelPubling();return false;}
		$.post(leftpanel,args,function (data) {/* alert(data); */
			$("#leftpanel").html(data);/* alert(lefttrue); */
			lefttrue= 0;
			if(leftpanel=="allwordslist.php"){return;
				if($("#tbody tr").eq(1).attr("id")){$("#tbody tr").eq(1).click();}}});}
	cancelPubling();
	return false;}

/*----------------------------------------------------------------------------*/
function reloadRight() {
	try{if(!$("#rightpanel").attr("id")){return false;}}catch(e){return false;}
	r_tablex	= "0";r_tabley	= "0";
	var MyStr = "";
	var args= {};
	var rightdop		= new Array();
	if (window.name.substr(0,4)=="root"){return false;}
	//alert(rightpanel);
	rightdop	= rightpanel.split("?");
	if (rightdop[1]){rightdop[menuid] = rightdop[1];}
	//rightpanel		= rightdop[0];alert("rightpanel="+rightpanel);
	args.key		= key;
	args.menuid	= menuid;
	args.subconto= subconto;//alert("subconto="+subconto);
	try{if (rightdop[menuid].length){
			var MyText=rightdop[menuid].split("&");
			for (var i=0;i<MyText.length;i++){
				var tt	= MyText[i].split("=");
				args[tt[0]]	= tt[1];}
			$.post(rightdop[0],args,function(data){$("#rightpanel").html(data);});}
		else {$.post(rightpanel,args,function(data){$("#rightpanel").html(data);});}}
	catch(e){$.post(rightpanel,args,function(data){$("#rightpanel").html(data);});}
	cancelPubling();
	return false;}

/*----------------------------------------------------------------------------*/
function newloadRight(sender) {
	var MyStr = "Обновить умолчания -ОК\n Оставить умолчания без изменения - Отмена(Cancel)";
	var args= {};
	var rightdop		= new Array();
	if (window.name.substr(0,4)=="root"){return;}
	rightdop	= rightpanel.split("?");
	if (rightdop[1]!=null){rightdop[menuid] = rightdop[1];}

	args.key		= "0";
	args.menuid	= "edit";
	args.subconto= subconto;
	if(confirm(MyStr)){Put_defaultAll();}
	$.post(rightpanel,args,function(data){$("#rightpanel").html(data);});}

/*------------------------------------------------------------------------------------------*/	
function FillEnter(mye){
	try{
		var obj			= mye.target;
		var eventcode	= mye.which;}
	catch(e){alert("Ошибка выполнения: "+e.message);return false;}

	if (eventcode ==27){window.close();return 0;}
	else if (keyCode ==13){send(obj);}
	else if (keyCode ==40){MoveElement(obj,1);}
	else if (keyCode ==34){MoveElement(obj,10);}
	else if (keyCode ==38){MoveElement(obj,-1);}
	else if (keyCode ==33){MoveElement(obj,-10);}}

/*------------------------------------------------------------------------------------------*/
function MoveElement(sender,MyDelta){
	if ((currentElement + MyDelta) >= finish)		{gotoelement(finish-1);}
	else if((currentElement + MyDelta) < 0)		{gotoelement(0);}
	else														{gotoelement(currentElement + MyDelta);}}

/*-------------------------------------------------------------------------------*/
function gotoelement(element){
	var newElement=0;
	if (finish==0){return 0;}
	if (element>finish){Ell=0;}
	key = collectionleft[element].key;
	if ($("#element"+key+" td div")){
		$("#element"+key+" td div").focus();
		$("#element"+key+" td div").select();}
	else{return 0;}
	newElement = $("#element"+key);
	reloadRight();
	scrollelement(newElement);
	marks(newElement);}

/*------------------------------------------------------------------------------------------*/
function scrollelement(obg){
	//$(obg).scrolltop();
	//if ($("#toppanel")){$("#toppanel").scrollIntoView(true);}
	}


/*----------------------------------------------------------------------------*/
function send(sender){
	marks(sender);
	key = $(sender).attr("key");
	reloadRight();}

/*------------------------------------------------------------------------------------------*/
function printDokSubconto(sender){
	spanOutputStart(sender,{width:240});
	$.post(subcontodir+"print/print.php",{subconto:subconto},function(data){$("#spanOutput").html(data);});}

/*------------------------------------------------------------------------------------------*/
function showDok(sender){//Печать документов 13/04/2009,21/10/2011
	var MyStr		="";
	var modul 		= $(sender).attr("key");
	var subconto 	= $(sender).attr("subconto");
	var spath 		= ($(sender).attr("path"))?$(sender).attr("path"):"print";
	$('#spanOutput').remove();
	if (modul == "null")			{alert("Отказ от печати.");return 0;}
	if (modul == "undefined")	{alert("Отказ от печати.");return 0;}

	try{
		if (modul.indexOf(".php") == 0){modul += ".php";}
		MyStr =subcontodir+spath+"/" + modul + "?key=" + key + "&subconto="+ subconto;
		while (MyStr.indexOf(" ")>0)	{MyStr = MyStr.replace(" ","");}
		oknoname= spath + key;
		while (oknoname.indexOf(" ")>0)	{oknoname = oknoname.replace(" ","");}
		while (oknoname.indexOf(".")>0)	{oknoname = oknoname.replace(".","_");}
		while (oknoname.indexOf("/")>0)	{oknoname = oknoname.replace("/","_");}
		windowOpen (MyStr , oknoname,1024,700);}
	catch(e){
		alert("Невозможно выполнить открытие отчета.");
		cancelPubling(sender);}}

/*------------------------------------------------------------------------------------------*/
function dellElementSubconto(sender){
	var args 	=  {};
	if (!confirm("Удалить запись?")){return;}
	args.source	= $(sender).attr("table");
	args.key		= $(sender).attr("realvalue");
	$.post(dirFrame+"del.php",args,function(data){x=data;alert(data);});}

/*------------------------------------------------------------------------------------------*/
function dellFilter (sender){
	spanOutputclose("spanOutputFilter");
	lefttrue= 1;
	var msubconto=($(sender).attr("subconto"))?$(sender).attr("subconto"):subconto;
	$.post(subcontodir+"dellfilter.php",{subconto:msubconto},function(data){reloadLeft("leftpanel");reloadRight();});
	//if(sender!="1"){
	//	$.post(subcontodir+"filter/filter",{subconto:msubconto},function(data){$("#rightpanel").html(data);});
	//	GO_onclick();}
	//else{reloadRight();}
	}

/*------------------------------------------------------------------------------------------*/
function putFilter (sender){
	spanOutputclose("spanOutputFilter");
	reloadRight();}

/*-------------------------------------------------------------------------------------,function(data){alert(data);}-----*/
function removFilter (sender){
	lefttrue= 1;
	$.post(subcontodir+"dellfilter.php",{subconto:$(sender).attr("subconto")},function(data){reloadLeft();reloadRight();});
	putFilter (sender);}

/*------------------------------------------------------------------------------------------*/
function printFilter (sender){
	windowOpen(subcontodir+"filter/printlist.php?subconto="+subconto , "printFilter", 1000,760);}

/*------------------------------------------------------------------------------------------*/
function printFilterExcel (sender){
	windowOpen(subcontodir+"filter/printlistexcel.php?subconto="+subconto , "printFilter", 1000,760);}

/*------------------------------------------------------------------------------------------*/
function printFilterSumm (sender){
	spanOutputStart(sender,{"width":300});
	$.post(subcontodir+"filter/summa/print.php",{subconto:subconto},function(data){$("#spanOutput").html(data);});}

/*------------------------------------------------------------------------------------------*/
function colFilter (sender){
	spanOutputStart(sender,{"width":440,"height":480});
	$.post(subcontodir+"colfilter.php",{subconto:subconto},function(data){$("#spanOutput").html(data);});}

/*------------------------------------------------------------------------------------------*/
function EditList (sender){
	windowOpen (subcontodir+"editlist.php?subconto="+sender , "EditList", 1000,760);}

/*------------------------------------------------------------------------------------------*/
function SearchSubconto (sender){
	windowOpen (subcontodir+"searchsubconto.php?subconto="+sender , "SearchSubconto", 1024,800);}

/*------------------------------------------------------------------------------------------*/
function ViewSQL (sender){
	windowOpen (subcontodir+"getfiltrsql.php?subconto="+sender+"&ViewSQL=1" , "ViewSQL", 1024,800);}

/*------------------------------------------------------------------------------------------*/
function printRecLog (sender){
	var source= subconto;
	source= ($(sender).attr("source"))?$(sender).attr("source"):subconto;
	windowOpen(subcontodir+"print/reclog.php?subconto="+source+"&key="+key , "reclog", 1024,800);}

/*------------------------------------------------------------------------*/
function schetsubconto(sender,mshet){
	}

/*---------------------------------------------------------------------------------------------------*/
function IsSubconto(sender){ //
	var args 	=  {};
	var x 	=  "0";
	args.key	= sender;
	$.post(subcontodir + "issubconto.php",args,function(data){x=data;});
	return x;}

/*---------------------------------------------------------------------------------------------------*/
function getSubcontoToMe(sender){ //
	var args 	=  {};
	var x 	=  "0";
	args.key	= sender;//debugAlert=true;
	$.post(subcontodir + "getsubcontotome.php",args,function(data){x=data;});
	return x;}

/*---------------------------------------------------------------------------------------------------*/
function getMailTru(sender){
	var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;	}

/*---------------------------------------------------------------------------------------------------*/
function rightLiave(sender){
	rightedit = false;return 0;
	if(rightedit){rightedit = false;
		if($("img[func='save']").is("img")){
			if(confirm("Вы не сохранили данные!\n Сохранить?")){$("img[func='save']").click();}}}}

/*---------------------------------------------------------------------------------------------------*/
function setsablonfunc(sender){
	var sablon=$(sender).attr("sablon");
	if($.browser.chrome){return false;}
	if((sablon=="mail")||(sablon=="email"))							{$(sender).keyup(maskregcheck);}
	else if ((sablon.charAt(0)=="r")||(sablon.charAt(0)=="R")) 	{$(sender).keyup(maskregcheck);}
	else																			{$(sender).mask(sablon);}}

/*---------------------------------------------------------------------------------------------------*/
function maskregcheck(sender){
	var obj	= sender.target;
	var sablon=$(obj).attr("sablon");

	if ((sablon.charAt(0)=="r")||(sablon.charAt(0)=="R")) {
		sablon=sablon.substr(1,sablon.length-1);}

	regexpc=new RegExp(sablon);

	maskhelp=$(obj).attr("maskhelp");
	spanOutputClose("inputmaskhelp");
	//alert(regexpc);
	//alert($(obj).attr("sablon"));

	if(($(obj).attr("sablon")=="mail")||($(obj).attr("sablon")=="email")){
		var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
		if ($(obj).val().search(pattern)==0) {$(obj).css({"background-Color":"#ffffff"});}
		else {

		spanOutputStart($(obj),{id:"inputmaskhelp"});
		$("#inputmaskhelp").html(((maskhelp)?"шаблон вида "+maskhelp:"не соответствует шаблону"));
		$(obj).css({"background-Color":"#ffe0e0"});
		}}
	else{
		if ($(obj).val().match(regexpc)) {$(obj).css({"background-Color":"#ffffff"});}
		else {

			spanOutputStart($(obj),{id:"inputmaskhelp"});
			$("#inputmaskhelp").html(((maskhelp)?"шаблон вида "+maskhelp:"не соответствует шаблону"));
			$(obj).css({"background-Color":"#ffe0e0"});}}}

/*---------------------------------------------------------------------------------------------------*/
function getInRolTable(sender){
	var obj=sender.target;
	var args = {};
	spanOutputStart($(sender.target),{"width":"305px"});
	args.s		= $(obj).attr("subconto");
	args.key		= $(obj).attr("key");
	$.post(subcontodir+"roltable.php",args,function(data){$("#spanOutput").html(data);});}

/*---------------------------------------------------------------------------------------------------*/
function getInSubcontoTable(sender){
	var obj=sender.target;
	var args = {};
	spanOutputStart($(sender.target),{"width":"305px"});
	args.s		= $(obj).attr("subconto");
	args.key		= $(obj).attr("key");
	args.pole	= $(obj).attr("pole");
	args.filtr	= $(obj).attr("filtr");
	$.post(subcontodir+"subcontotable.php",args,function(data){$("#spanOutput").html(data);});}
	
/*---------------------------------------------------------------------------------------------------*/
function getXSubcontoTable(sender){
	var obj=sender.target;
	var args = {};
	spanOutputStart($(sender.target),{"width":"305px"});
	args.s		= $(obj).attr("subconto");
	args.table	= $(obj).attr("table");
	args.key		= $(obj).attr("key");
	args.pole	= $(obj).attr("pole");
	args.filtr	= $(obj).attr("filtr");
	$.post(subcontodir+"xsubconto.php",args,function(data){$("#spanOutput").html(data);});}
	
/*---------------------------------------------------------------------------------------------------*/
function getInSubcontoKeyTable(sender){
	var args = {};
	spanOutputStart($(sender),{"width":"305px"});
	args.s		= $(sender).attr("subconto");
	args.key		= $(sender).attr("keys");
	$.post(subcontodir+"subcontokeytable.php",args,function(data){$("#spanOutput").html(data);});}

/*--------------------------------------------------------------------------------------------------*/
function ajaxFileUpload(sender){/* Если не работает, проверить права на каталог */
		var val				= $(sender).attr("realvalue");
		var args 			=  {};
		args.subconto		= subconto;
		args.key				= key;
		args.tr_key			= val;
		args.tr_subconto	= $(sender).attr("subconto");
		args.dopcommand	= ($(sender).attr("dopcommand"))?$(sender).attr("dopcommand"):"0";
		var mfile			= ($(sender).attr("file"))?$(sender).attr("file"):"lib/ajaxfileupload.php";
		
		if(args.key=="0"){alert("Невозможно загрузить файл в путую запись!");return;}

		if(args.subconto!=args.tr_subconto){/**** Попали в таблицу   **/
			if($(sender).parent().parent().attr("id")=="r_element0"){
				if(confirm("Прежде, чем загрузить файл, необходимо сохранить запись.\n Сохранить?")){
					$("#r_element0>td:last-child>input").click();}
				alert("Попробуйте снова загрузить файл.");
				return;}
			if($(sender).parent().parent().attr("key")!="0"){
				args.tr_key	= $(sender).parent().parent().attr("key");}
			else{alert($(sender).parent().parent().attr("key"));return;}}
		else{if(!confirm("Загрузить файл?")){return;}}

		args.valid		= "jpg|png|jpeg|gif|doc|docx|msword|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet|pdf|xml|xmls|xls|xlsx|pli|plz|plm";
		args.valid		= ($(sender).attr("valid"))?$(sender).attr("valid"):args.valid;
		$.ajaxFileUpload({
				"url":				dirArm+mfile,
				"secureuri":		false,
				"fileElementId":	'fileToUpload_'+val,
				"dataType"	: 		"json",
				"data":				args,
				"success": 			function (data, status){
											if(typeof(data)=="object"){
												if((data.error != '')&&(data.error != '0'))		{alert(data.error);}
												else if(data.load != '')								{alert(data.load);}
												else if(data.msg != '')									{alert(data.msg);}

												else{alert(data);}}
											else{alert(data);}},
				"error": function (data, status, e){alert(data);}});
		return false;}
/*--------------------------------------------------------------------------------------------------*/
function getFionew(sender){
	var obj=sender.target;
	r_dopdata(obj);}

/*--------------------------------------------------------------------------------------------------*/
function ReadJSON(sender) {
	var obj=sender.target;
	var args={};
	args.id="subjson";
	spanOutputStart(obj,args);

	args.json=$(obj).attr("realvalue");
	args.hiden=($(obj).attr("hiden"))?$(obj).attr("hiden"):"0";
	args.viddok=$(obj).attr("subconto");
	args.cname=$(obj).attr("cname");

	$.post("/subconto/json.php",args,function (data) {$("#subjson").html(data);});}
	
/*--------------------------------------------------------------------------------------------------*/
function ReadEDITOR(sender) {/* Вызов ReadEDITOR */
	var obj=sender.target;
	var args={};
	args.id="subjson";
	alert("Вызов getJSForm. В разработке.");
	}
	
/*--------------------------------------------------------------------------------------------------*/
function jseditorbuttons(iobj,val) {
    var name=$(iobj).attr("key");
    if (val==1) {$("#"+name+"_text").html($("#"+name).val());
        $("#"+name).hide();$("#"+name+"_text").show();}
    if (val==2) {$("#"+name).show();$("#"+name+"_text").hide();}
    if (val==3) {    
        window.open(dirFrame+"jseditoropen.php?key="+key+"&subconto="+subconto+"&name="+name,"_blank");}}	
        
/*--------------------------------------------------------------------------------------------------*/
function Subconto_wex(sender){
	var subconto 	= $(sender).attr("subconto");
	var key 			= $(sender).attr("key");
	var nomenu 		= ($(sender).attr("nomenu"))?$(sender).attr("nomenu"):"0";
	var MyStr		= subcontodir+ "subcontowex.php?subconto="+subconto+"&realvalue="+key;
	if (nomenu!="0") {MyStr=MyStr+ "&nomenu=1";}
	windowOpen(MyStr,"viewStudent",1024,760);}

/*------------------------------------------------------------------------------------------*/
function editDokSt(sender){

	var okey		= $(sender).attr("key");
	var MyStr	= dirArm+"payment/root.php?key=" + okey;

	//MyStr	+= "&viddok=" + $("#viddok").attr("realvalue");
	windowOpen(MyStr,"editDokSt",1024,760);}

/*------------------------------------------------------------------------------------------*/
function delimetertoggle(sender) {
	var state= $(sender).attr("state");
	if (state==0) { state=1;} else { state=0;}
	var subc=$(sender).attr("id").split("_");
	if (subc.length==2) {
		if (subc[0].indexOf("elimeter")>0) {
			Put_defParam("filtr/"+subc[1],subc[0],state);
			var src=$(sender).attr("src");
			if (state==0)  {$(sender).attr("src",src.replace("+.gif","-.gif"));}
			else  {$(sender).attr("src",src.replace("-.gif","+.gif"));}
			$("."+subc[0]+"_class").toggle();}}}
/*------------------------------------------------------------------------------------------*/
function putSubcontoPole(sender){	
	var key			= $(sender).attr("key");
	var subconto	= $(sender).attr("subconto");
	var pole			= $(sender).attr("pole");
	//var myval		= ($(sender).attrvalue())?$(sender).attrvalue():0;
	var mywidth		= ($(sender).attr("width"))?$(sender).attr("width"):400;
	var myheight	= ($(sender).attr("height"))?$(sender).attr("height"):300;
	spanOutputStart(sender,{width:mywidth,height:myheight,id:"SbspanOutput"});
	var MyStr		= subcontodir+"putsubcontopole.php?key="+key;
	MyStr		+= "&subconto="+subconto+"&pole="+pole;
	$("#SbspanOutput").load(MyStr);} 	


