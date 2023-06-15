let but = []; 
let mes = ["-||-", "--.--.---- --:--:--"]; 
let mma = [];
let sch_title = [[],[],[],[],[]];
let restartMessage, restartTitle, resetCountMessage;
let parsed_day = 29, parsed_month = 12, parsed_year = 2020, parsed_hour = 12, parsed_week = 0;
let timeZone = 5, days_in_prev_month = 0;
let day_from, day_to;
let chart;
let rssi = 0,  s_mode = 0;
let svg_wifi = 'M0 13.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
let svg_led = "M2.23 4.35A6.004 6.004 0 0 0 2 6c0 1.691.7 3.22 1.826 4.31.203.196.359.4.453.619l.762 1.769A.5.5 0 0 0 5.5 13a.5.5 0 0 0 0 1 .5.5 0 0 0 0 1l.224.447a1 1 0 0 0 .894.553h2.764a1 1 0 0 0 .894-.553L10.5 15a.5.5 0 0 0 0-1 .5.5 0 0 0 0-1 .5.5 0 0 0 .288-.091L9.878 12H5.83l-.632-1.467a2.954 2.954 0 0 0-.676-.941 4.984 4.984 0 0 1-1.455-4.405l-.837-.836zm1.588-2.653.708.707a5 5 0 0 1 7.07 7.07l.707.707a6 6 0 0 0-8.484-8.484zm-2.172-.051a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708z";
let ttip_wifi = "";
let ver = [[],[]];
let ttip_rel = [];
let days = [['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'], ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']];
let selectLang = [['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']];
let daysOfw = [6, 0, 1, 2, 3, 4, 5];
let endOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let test_json = "{\"now\":\"2023-05-10T11:59:50\",\"t\":85,\"led\":11,\"rssi\":-78,\"bf\":7,\"heap\":17992}";
//let test_json = "{\"now\":\"2165-165-165T165:165:85\",\"t\":85,\"led\":11,\"rssi\":-78,\"bf\":7,\"heap\":17992}";
let dtnow;
let sec_left;
let nowValid = false;
let col_fan, col_ten;
let st_fan = 0, st_ten = 0, st_led = 0, st_mqtt = 0, st_heap = 10000, ws_client = 0, rst_count = 0, ota = 0;
let colUnknown = 'orange', colBackgrd = '#3370B7', colError = 'red', colOn = 'green', colOff = 'red', colNorm = 'white';

let btnTry = 5;
let funcTry = 5;
let countTry = 0;

let new_date;
let dataOption;
let onceChart = 0;
let smoothChart = 1.0;
let rightGapChart = 5;
let g;
//let localData = new Map([['dw', [null, null]],['vr', null]]);
let localData = {};
//error error.message error.name error.stack error.at error.text	
const log = (color, i, t, v) => {
    let t2 = (t == "") ? t : " " + t + " ";
	console.log('%c' + " " + i + " " + '%c' + t2 + '%c' + " " + v, 
	'color:white; background-color:' + color, 
	'color:white; background-color: grey',
	'color:black; background-color: white');
};	
const  ShowErrorMessage = (textMessage, typeMessage) => {
/*
	document.getElementById("er_mes").style.opacity = 0.8;	
	document.getElementById("er_mes1").innerText += textMessage + "\n"; //20
	document.getElementById("er_mes2").innerText += typeMessage + "\n"; //20
	
    setInterval(function () {
		document.getElementById("er_mes").style.opacity = 0;	
		document.getElementById("er_mes1").innerText = "";
		document.getElementById("er_mes2").innerText = "";	
	}, 5000);
*/
}
const fillWithColor = (myId, myColor) => {
	switch (myId) {
	  case 'time': //time
		document.getElementById("text_time").style.color = myColor;
		break;
	  case 'temp': //temp
		document.getElementById("text_temp").style.color = myColor;
		document.getElementById("temp1ID").setAttribute('fill', myColor);	
		document.getElementById("temp2ID").setAttribute('fill', myColor);
		break;
	  case 'led': //led
		document.getElementById("text_l").style.color = myColor;	
		document.getElementById("ledID").setAttribute('fill', myColor);
		break;
	  case 'fan': //fan
		document.getElementById("fanID").setAttribute('fill', myColor);
		break;
	  case 'ten': //ten
		document.getElementById("tenID1").setAttribute('fill', myColor);
		document.getElementById("tenID2").setAttribute('fill', myColor);
		document.getElementById("tenID3").setAttribute('fill', myColor);
		document.getElementById("tenID4").setAttribute('fill', myColor);
		break;		
	}	
}
const add_zero = (n) => {return n > 9 ? n: "0" + n; }
function checkForm(fobj) {document.getElementById("uploadPanel").hidden = false;document.getElementById("opacity_all").hidden = false;fobj.submit();};
const getCountSec = () => {
	if (ota)
		return;
	if (!nowValid) 
		return noDate();	
	sec_left++;	
	new_date = new Date(sec_left * 1000);
	parsed_year = new_date.getFullYear();
	parsed_month = new_date.getMonth() + 1;
	parsed_day = new_date.getDate();
	parsed_hour = new_date.getHours();
	parsed_week = new_date.getDay();
	document.getElementById("text_time").innerText = new_date.toLocaleString().replace(",", "") + " " + days[document.getElementById("selLang").value][parsed_week];
	document.getElementById("text_time").style.color = colNorm;
}
const noDate = (time) => {
	document.getElementById("text_time").innerText = mes[1];
	document.getElementById("text_l").innerText = '--%';
	svg_led = "M2.23 4.35A6.004 6.004 0 0 0 2 6c0 1.691.7 3.22 1.826 4.31.203.196.359.4.453.619l.762 1.769A.5.5 0 0 0 5.5 13a.5.5 0 0 0 0 1 .5.5 0 0 0 0 1l.224.447a1 1 0 0 0 .894.553h2.764a1 1 0 0 0 .894-.553L10.5 15a.5.5 0 0 0 0-1 .5.5 0 0 0 0-1 .5.5 0 0 0 .288-.091L9.878 12H5.83l-.632-1.467a2.954 2.954 0 0 0-.676-.941 4.984 4.984 0 0 1-1.455-4.405l-.837-.836zm1.588-2.653.708.707a5 5 0 0 1 7.07 7.07l.707.707a6 6 0 0 0-8.484-8.484zm-2.172-.051a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708z";
	fillWithColor("led", colError);
	fillWithColor("time", colError);		
}
const updateDate = (date) => {
	dtnow = new Date(date);
	sec_left = dtnow.getTime() / 1000;
	parsed_year = dtnow.getFullYear();
	parsed_month = dtnow.getMonth() + 1;
	parsed_day = dtnow.getDate();
	parsed_hour = dtnow.getHours();
	parsed_week = dtnow.getDay();
	document.getElementById("text_time").innerHTML = dtnow.toLocaleString().replace(",", "") + " " + days[document.getElementById("selLang").value][parsed_week];
	fillWithColor("time", colNorm);
	//openChart(nowValid, parsed_year, parsed_month, parsed_day, parsed_hour, 0);		
}	
const getJson = async (jsonFile) => {
	if (ota)
		return;
	json = JSON.parse(jsonFile);		
	st_heap = json.heap;
	let s = json.bf.toString(2).padStart(11, '0');
	let bf = s.match(/.{1,6}/g);
	log('orange', "[SSE]", json.now.replace("T", " "), "ALL BF: " + bf.join(' ') + ' (654321 TFWMV)');		
	
	nowValid  = (json.bf > 2048) ?  0 : !(json.bf & 1) ? 0 : 1; // valid     00000001 1
	st_mqtt   = (json.bf > 2048) ? '-': !(json.bf & 2) ? 0 : 1; // mqtt      00000010 2
	ws_client = (json.bf > 2048) ? '-': !(json.bf & 4) ? 0 : 1; // ws_client 00000100 4
	st_fan  = (json.bf > 2048) ? colUnknown : !(json.bf & 8) ? 0 : 1; // fan  10000000 128
	st_ten  = (json.bf > 2048) ? colUnknown : !(json.bf & 16) ? 0 : 1;  // ten  01000000 64
	
	let iN = 32;
	for (let i = 1; i <= 6; i++) {	
		if (document.getElementById('text_rel' + i)) { document.getElementById('text_rel' + i).style.background = (json.bf > 2048)?colUnknown:!(json.bf&iN)?colOff:colOn; }
		iN +=iN;
	}
	if (nowValid && json.now != "2165-165-165T165:165:85"){
		updateDate(json.now);
		if (!onceChart) {
			if (document.getElementById("selMonth")) { document.getElementById("selMonth").options.selectedIndex = parsed_month - 1; }	
			await openChart(nowValid, parsed_year, parsed_month, parsed_day, parsed_hour, 0); 
			openInitialGraph();
			onceChart = 1;
		}
		if (json.led <= 10)
			svg_led = "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z";
		else
			svg_led = "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z";
	} else {
		noDate();		
	}
	/*Чтение и закрашивание wifi*/
	rssi = json.rssi;			
	if (rssi <= -110) //wifi0
		svg_wifi = 'M0 13.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
    else if (rssi <= -100) //wifi1
		svg_wifi = 'M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
	else if (rssi <= -85) //wifi2
		svg_wifi = 'M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4 5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
	else if (rssi <= -70) //wifi3
		svg_wifi = 'M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
	else //wifi4
		svg_wifi = 'M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z';			

	ttip_wifi = 'RSSI: '+rssi+' dBm\n'+ 'HeapMin: ' +st_heap+ '\nMQTT: ' +st_mqtt+ ' WS: ' +ws_client+ '\nRST COUNT: ' +rst_count;
	let bool = json.t == 850 || json.t <= -550 || json.t >= 1250 || json.t == "undefined";		
	
	if (document.getElementById("wifiID")) 
		document.getElementById("wifiID").setAttribute('d', svg_wifi);
	if (document.getElementById("ttip_wifi"))
		document.getElementById("ttip_wifi").setAttribute('tooltip_wifi', ttip_wifi);
	if (document.getElementById("ledID"))
		document.getElementById("ledID").setAttribute('d', svg_led);
	if (document.getElementById("text_l"))
		document.getElementById("text_l").innerHTML = json.led + "%";
	if (document.getElementById("text_temp"))
		document.getElementById("text_temp").innerText = (bool)?mes[0]:(parseFloat(json.t)/10).toFixed(1)+"°C";
	fillWithColor("led", colNorm);	
	fillWithColor("temp", (bool)?colError:colNorm);
	fillWithColor("fan", (bool)?colError:(st_fan)?'white':'#36343361');
	fillWithColor("ten", (bool)?colError:(st_ten)?'white':'#36343361');
	if (bool) {
		fillWithColor("temp", colError);
		fillWithColor("fan", colError);
		fillWithColor("ten", colError);	
	}			
}
if (!!window.EventSource) {
  var source = new EventSource('/events');
  source.addEventListener('open', function(e) {}, false);
  source.addEventListener('error', function(e) {}, false);
  source.addEventListener('message', function(e) {console.info(`[SYSTEM] ${e.data}`);}, false);
  source.addEventListener('ota', function(e) {
	try {			
		log('#D33F49', "[SSE]", "", "OTA: " + e.data);
        ota = JSON.parse(e.data);	
		document.getElementById("myprogressBar").innerHTML = ota + "%";
	    document.getElementById("myprogressBar").style.width = ota + "%";
	} catch(err) {
		log('red', "[SSE]", "", "OTA: ERROR PARSING JSON");		
	}
	}, false);
  source.addEventListener('ws',  function(e) {
	try {  
        let s = JSON.parse(e.data);			
		log('#95B46A', "[SSE]", s.d.replace("T", " "), "WS: " + s.ws);	
		ws_client = s.ws;
		ttip_wifi = 'RSSI: '+rssi+' dBm\n'+ 'HeapMin: ' +st_heap+ '\nMQTT: ' +st_mqtt+ ' WS: ' +ws_client+ '\nRST COUNT: ' +rst_count;
		document.getElementById("ttip_wifi").setAttribute('tooltip_wifi', ttip_wifi);
		updateDate(s.d);
	} catch(err) {
		log('red', "[SSE]", "", "WS: ERROR PARSING JSON");		
	}
	}, false);
  source.addEventListener('mqtt', function(e) {
	try {	
		let s = JSON.parse(e.data);			
		log('#95B46A', "[SSE]", s.d.replace("T", " "), "MQTT: " + s.mqtt);			
		st_mqtt = s.mqtt;	
		ttip_wifi = 'RSSI: '+rssi+' dBm\n'+ 'HeapMin: ' +st_heap+ '\nMQTT: ' +st_mqtt+ ' WS: ' +ws_client+ '\nRST COUNT: ' +rst_count;
		document.getElementById("ttip_wifi").setAttribute('tooltip_wifi', ttip_wifi);	
		updateDate(s.d);
	} catch(err) {
		log('red', "[SSE]", "", "MQTT: ERROR PARSING JSON");		
	}
	}, false);  
  source.addEventListener('rssi', function(e) {
	try {
        let s = JSON.parse(e.data);			
		log('#95B46A', "[SSE]", s.d.replace("T", " "), "RSSI: " + s.rssi);	
		let wi_fi;		
		rssi = s.rssi;
		if (rssi <= -110) { //wifi0
			wi_fi = 'M0 13.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
		} else if (rssi <= -100){ //wifi1
			wi_fi = 'M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
		} else if (rssi <= -85){ //wifi2
			wi_fi = 'M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4 5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
		} else if (rssi <= -70){ //wifi3
			wi_fi = 'M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z';
		} else { //wifi4
			wi_fi = 'M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z';			
		}
		document.getElementById("wifiID").setAttribute('d', wi_fi);
		ttip_wifi = 'RSSI: '+rssi+' dBm\n'+ 'HeapMin: ' +st_heap+ '\nMQTT: ' +st_mqtt+ ' WS: ' +ws_client+ '\nRST COUNT: ' +rst_count;
		document.getElementById("ttip_wifi").setAttribute('tooltip_wifi', ttip_wifi);
		updateDate(s.d);	
	} catch(err) {
		log('red', "[SSE]", "", "OTA: ERROR PARSING JSON");		
	}		
	}, false); 
  source.addEventListener('heap', function(e) {
	try {
        let s = JSON.parse(e.data);			
		log('#95B46A', "[SSE]", s.d.replace("T", " "), "HEAP: " + s.heap);		
		st_heap = s.heap;
		ttip_wifi = 'RSSI: '+rssi+' dBm\n'+ 'HeapMin: ' +st_heap+ '\nMQTT: ' +st_mqtt+ ' WS: ' +ws_client+ '\nRST COUNT: ' +rst_count;
		document.getElementById("ttip_wifi").setAttribute('tooltip_wifi', ttip_wifi);	
		updateDate(s.d);
	} catch(err) {
		log('red', "[SSE]", "", "OTA: ERROR PARSING JSON");		
	}	
	}, false); 
  source.addEventListener('bf', function(e) {
	try {  
	    let s = JSON.parse(e.data);
		let sS = parseInt(s.bf).toString(2).padStart(11, '0');
		let bf = sS.match(/.{1,6}/g);
		log('#95B46A', "[SSE]", s.d.replace("T", " "), "BF: " + bf.join(' ') + ' (654321 TFWMV)');			
		nowValid  = (s.bf > 2048) ?  0 : !(s.bf & 1) ? 0 : 1; // valid     00000001 1
		st_mqtt   = (s.bf > 2048) ? '-': !(s.bf & 2) ? 0 : 1; // mqtt      00000010 2
		ws_client = (s.bf > 2048) ? '-': !(s.bf & 4) ? 0 : 1; // ws_client 00000100 4
		st_fan  = (s.bf > 2048) ? colUnknown : !(s.bf & 8) ? 0 : 1; // fan  10000000 128
		st_ten  = (s.bf > 2048) ? colUnknown : !(s.bf & 16) ? 0 : 1;  // ten  01000000 64
		let bool = (document.getElementById("text_temp").innerText == mes[0]);
		fillWithColor("fan", (bool)?colError:(st_fan)?'white':'#36343361');
		fillWithColor("ten", (bool)?colError:(st_ten)?'white':'#36343361');		
		let iN = 32;
		for (let i = 1; i <= 6; i++) {
			document.getElementById('text_rel' + i).style.background = (s.bf > 2048)?colUnknown:!(s.bf&iN)?colOff:colOn;
			iN +=iN;
		}
		updateDate(s.d);
	} catch(err) {
		log('red', "[SSE]", "", "BF: ERROR PARSING JSON");		
	}		
    }, false);  
  source.addEventListener('led', function(e) {
	try {  
        let s = JSON.parse(e.data);		
		log('#95B46A', "[SSE]", s.d.replace("T", " "), "LED: " + s.led);		
		st_led = s.led;
		document.getElementById("text_l").innerHTML = st_led + "%";
		updateDate(s.d);	
	} catch(err) {
		log('red', "[SSE]", "", "LED: ERROR PARSING JSON");		
	}		
	}, false);   
  source.addEventListener('temp', function(e) {
	try {  
        let s = JSON.parse(e.data);		
		log('#95B46A', "[SSE]", s.d.replace("T", " "), "TEMP: " + s.temp);
		if (s.temp == 850 || s.temp <= -550 || s.temp >= 1250 || s.temp == "undefined") {
			document.getElementById("text_temp").innerText = mes[0];
		} else {
			document.getElementById("text_temp").innerText = (parseFloat(s.temp) / 10).toFixed(1) + "°C";
		}
		updateDate(s.d);	
	} catch(err) {
		log('red', "[SSE]", "", "TEMP: ERROR PARSING JSON");		
	}		
  }, false);
  source.addEventListener('ALL', function(e) {
	try {
        let s = JSON.parse(e.data);			
		log('orange', "[SSE]", s.now.replace("T", " "), "ALL: " + e.data);		
		getJson(e.data);
	} catch(err) {
		log('red', "[SSE]", "", "ALL: ERROR PARSING JSON");		
	}		
	}, false);
  source.addEventListener('now', function(e) {
		log('#95B46A', "[SSE]", e.data.replace("T", " "), "NOW: " + e.data.replace("T", " "));				
		updateDate(e.data);	
	}, false); 
}
const openlang = async (cfgLang, countTry) => {
	try {
		let url = (cfgLang == 0) ? 'RUS.json' : 'ENG.json';
		let response = await fetch(url);
		if (!response.ok)			
			throw new Error(JSON.stringify({ procedure: "openlang", code: response.status, message: response.statusText}));
		
		let configLang = await response.json();
		for (let i = 0; i <= 11; i++){
			document.getElementById("m" + i).text = selectLang[cfgLang][i];
		}		
		
		for (let j = 0; j <= 8; j++) { //Загрузка Авто Вкл Выкл
			for (let i in configLang.s_mode) {
				document.getElementById("sm"+j+i).innerText = configLang.s_mode[i]; 
			}
		}
		
		for (let i = 0; i <= 4; i++) { //Загрузка всех text	
		//for (let i = 1; i <= 4; i++) { //Загрузка всех text
			for (let j in configLang.text[i])  { 
				document.getElementById('text'+i+j).innerText = configLang.text[i][j]; 
			}
		}
		for (let i = 3; i <= 9; i++) {document.getElementById('input3'+i).title = configLang.popup[1];} //Требуется перезагрузка
		for (let i in configLang.but) { but[i] = configLang.but[i]; } //Сообщения кнопок
		for (let i in configLang.mes) { mes[i] = configLang.mes[i]; } //Сообщения ошибок
		
		restartMessage = configLang.popup[0]; //Перезагрузить ESP8266-12E?
		resetCountMessage = configLang.popup[2];//Сбросить счетчик перезагрузок?
		
		document.getElementById("Button11").value = but[6]; //Сохранить
		document.getElementById("Button21").value = but[6]; //Сохранить
		document.getElementById("Button22").value = but[6]; //Сохранить			
		document.getElementById("Button31").value = but[6]; //Сохранить
		document.getElementById("Button41").value = but[6]; //Сохранить			
		document.getElementById("Button51").value = but[4]; //Ручной ввод даты			
		document.getElementById("Button52").value = but[5]; //Автонастройка даты
		document.getElementById("Button53").value = but[6]; //Сохранить		
		document.getElementById("uploadLabel").innerHTML = but[7]; //Открыть
		document.getElementById("Button55").value = but[8]; //Загрузить
		document.getElementById("Button56").value = but[9]; //Перезагрузить	
		ShowErrorMessage("openlang", "[OK]");	
	} catch(error) {	
		if (countTry >= funcTry)
			return;
		countTry += 1;
		let jsonParsed = JSON.parse(error.message);
		log('red', "["+ error.name +" "+ jsonParsed.code +"]", json.now.replace("T", " "), "\""+ jsonParsed.procedure+ "\" with error: "+ jsonParsed.message +". Try: " +countTry);	
		await new Promise((resolve, reject) => setTimeout(resolve, 2000));			
		openlang(cfgLang, countTry);		
	}	
}
const openValues = async (countTry) => {
	let url = 'configSetup.json';
	try {	
		let response = await fetch(url);
		if (!response.ok)		
			throw new Error(JSON.stringify({ procedure: "openValues", code: response.status, message: response.statusText }));
		let configSetup = await response.json();	
		
		ver[0] = configSetup.ver[0];
		ver[1] = configSetup.ver[1];	
		document.getElementById("text_fw").innerText=' FW: ' + ver[0];
		document.getElementById("text_fs").innerText=' FS: ' + ver[1];
		timeZone = configSetup.input[3][2];

		document.getElementById("selLang").value = configSetup.defaultLang;			
		document.getElementById("selMonth").value = parsed_month - 1;
		await openlang(configSetup.defaultLang, 0);
		
		rst_count = configSetup.restart;
		//for (let i = 1; i <= 4; i++) { //Все инпуты
		for (let i = 0; i <= 4; i++) { //Все инпуты
			for (let j in configSetup.input[i]) { 
				document.getElementById('input'+i+j).value = configSetup.input[i][j]; 
			}
		}
		document.getElementById('input00').value = configSetup.input[0][0] / 10; //повторно читаем значения сглаживания и переводим во float
		smoothChart = document.getElementById('input00').value;
		rightGapChart = document.getElementById('input01').value;
		let powA = 3;
		for (let i = 0; i <= 8; i++) { //Загрузка режимов реле Выкл Вкл Авто
			document.getElementById('select_smode' + i).options.selectedIndex = parseInt((configSetup.s_mode & powA) >> (i*2), 10) - 1;
			powA = powA * 4 + 3;
		}
		
		document.getElementById('input20').value = configSetup.input[2][0] / 10; 
		for (let i = 3; i <= 6; i++) { //повторно читаем значения гистерезиса и переводим во float
			document.getElementById('input2' + i).value = configSetup.input[2][i] / 100; 
		}		
		
		let powC = 1;
		for (let i = 9; i <= 16; i++) { //Чтение checkbox
			document.getElementById('input2' + i).checked = parseInt((document.getElementById('input28').value & powC) >> (i - 9), 10); 
			//console.log(powC + " | " + parseInt((document.getElementById('input28').value & powC) >> (i - 9), 10));
			powC += powC;
		}
		let fan_on  = parseFloat(configSetup.input[2][3]/100 + (configSetup.input[2][4] / 200)).toFixed(1);
		let fan_off = parseFloat(configSetup.input[2][3]/100 - (configSetup.input[2][4] / 200)).toFixed(1);
		let ten_off  = parseFloat(configSetup.input[2][5]/100 + (configSetup.input[2][6] / 200)).toFixed(1);
		let ten_on = parseFloat(configSetup.input[2][5]/100 - (configSetup.input[2][6] / 200)).toFixed(1);

		let ttip_temp = 'COR : '+ parseFloat(configSetup.input[2][0] / 10).toFixed(1) + ' °C';
		ttip_wifi = 'RSSI: '+rssi+' dBm\n'+ 'HeapMin: ' +st_heap+ '\nMQTT: ' +st_mqtt+ ' WS: ' +ws_client+ '\nRST COUNT: ' +rst_count;			
		let ttip_led = 'MAX: '+configSetup.input[2][1]+' % ' + ' ' + ' MIN : '+configSetup.input[2][2]+' %';		
		let ttip_fan = 'ON : '+ parseFloat(fan_on).toFixed(2) +' °C ' + ' ' + 'OFF: '+ parseFloat(fan_off).toFixed(2) +' °C';
		let ttip_ten = 'OFF: '+ parseFloat(ten_off).toFixed(2) +' °C ' + ' ' + 'ON : '+ parseFloat(ten_on).toFixed(2) +' °C';
		let ttip_rel1 = 'ON : ' + ttip_rel[0] + ' ' + 'OFF: ' + ttip_rel[1];
		let ttip_rel2 = 'ON : ' + ttip_rel[2] + ' ' + 'OFF: ' + ttip_rel[3];

		document.getElementById("ttip_wifi").setAttribute('tooltip_wifi', ttip_wifi);
		document.getElementById("ttip_temp").setAttribute('tooltip_temp', ttip_temp);
		document.getElementById("ttip_led").setAttribute('tooltip_led', ttip_led);
		document.getElementById("ttip_fan").setAttribute('tooltip_fan', ttip_fan);
		document.getElementById("ttip_ten").setAttribute('tooltip_ten', ttip_ten);	
	} catch(error) {
		if (countTry >= funcTry)
			return;
		countTry += 1;
		let jsonParsed = JSON.parse(error.message);
		log('red', "["+ error.name +" "+ jsonParsed.code +"]", json.now.replace("T", " "), "\""+ jsonParsed.procedure+ "\" with error: "+ jsonParsed.message +". Try: " +countTry);	
		await new Promise((resolve, reject) => setTimeout(resolve, 2000));			
		openValues(countTry);		
	}
}		
//openValues().catch(error => { error.message; });	
const openInitialGraph = () => {
	let dw, vr;
	if (localStorage.getItem('localData') !== null) {
		localData = JSON.parse(localStorage.getItem("localData"));
		dw = localData.dw;
		vr = localData.vr[0];
	} else {
		dw = null;
		vr = null;
	}	
	
	g.updateOptions({
	    dateWindow: dw,
        valueRange: vr
	});
}
const calculateMinMax = (dw) => {
	
/* 	g.setAnnotations([{
		series: 'Temp',
		x: Date.parse('2023/05/04'),
		shortText: 'Min',
		text: 'Min value'
	}]); */
}

const openChart = async (n, y, m, d, h, countTry) => {
	let url = m + '.json';
	let jsonVal = "";
	if (!n) {
		return;
	}
	try {	
		let response = await fetch(url);
		if (!response.ok)		
			throw new Error(JSON.stringify({ procedure: "openChart", code: response.status, message: response.statusText }));
		let configChart = await response.json();

		for (let i = 1; i <= (d - 1); i++) { // текущий месяц и до текущего дня				
			for (let j = 0; j <= 23; j++) {
				let val = configChart.days[i][j];
				let numb = (val == undefined || val == null || val == NaN || val == "") ? "NaN" : parseFloat(configChart.days[i][j] / 10).toFixed(1);
				jsonVal+= y + "-" + add_zero(m) + "-" + add_zero(i) + " " + add_zero(j)+":00,"+ numb +"\n"; 
			}
		} 
		for (let j = 0; j <= h; j++) { //текущий день и до текущего часа
			let val = configChart.days[d][j];
			let numb = (val == undefined || val == null || val == NaN || val == "") ? "NaN" : parseFloat(configChart.days[d][j] / 10).toFixed(1);
			jsonVal += y + "-" + add_zero(m) + "-" + add_zero(d) + " " + add_zero(j)+":00,"+ numb +"\n"; 
			

		}	
		jsonVal += y + "-" + add_zero(m) + "-" + add_zero(d) + " " + add_zero(h)+":10,NaN\n"; 
		jsonVal += y + "-" + add_zero(m) + "-" + add_zero(d) + " " + add_zero(h)+":20,NaN\n"; 
		jsonVal += y + "-" + add_zero(m) + "-" + add_zero(d) + " " + add_zero(h)+":30,NaN\n"; 		
		jsonVal += y + "-" + add_zero(m) + "-" + add_zero(d) + " " + add_zero(h)+":40,NaN\n"; 	
		jsonVal += y + "-" + add_zero(m) + "-" + add_zero(d) + " " + add_zero(h)+":50,NaN\n"; 			
		g = new Dygraph(
			document.getElementById("graphdiv2"),
			jsonVal,
			{
				labels: [ "Data", "Temp"],
				plotter: smoothPlotter,
				legend: 'always', // 'follow',
				color:  '#3370B7',
				strokeWidth: 2,
				drawPoints: true,	
				rightGap: rightGapChart,	
				pointSize: 2,
				showRangeSelector: true,
				labelsSeparateLines: true,
				interactionModel: Dygraph.defaultInteractionModel,
				zoomCallback: function(minDate, maxDate, yRange) {
					localData.dw[0] = minDate;
					localData.dw[1] = maxDate;
					localData.vr = yRange;
					localStorage.setItem("localData", JSON.stringify(localData));
				},
				drawCallback: function(x) {
					if (x.dateWindow_ !== null) {
						localData.dw = x.dateWindow_;
						localStorage.setItem("localData", JSON.stringify(localData));
						calculateMinMax(localData.dw);
					}
				}
			}
		);
		
		smoothPlotter.smoothing = smoothChart;		
		g.updateOptions({}) ;
		ShowErrorMessage("openChart", "[OK]");	
	} catch(error) {
/* 		if (countTry < funcTry) {
			countTry += 1;
			let jsonParsed = JSON.parse(error.message);
			log('red', "["+ error.name +" "+ jsonParsed.code +"]", json.now.replace("T", " "), "\""+ jsonParsed.procedure+ "\" with error: "+ jsonParsed.message +". Try: " +countTry);	
			await new Promise((resolve, reject) => setTimeout(resolve, 2000));			
			openChart(n, y, m, d, h, countTry);			
		} */
	}		
}
const ButtonClick = async (btnNumb, method, url, setText, setBody, countTry) => {
	//event.preventDefault(); 
    let message = new Object();	
	message.loading = but[0];
	message.success = but[1];
	message.failure = but[2];
	message.trying = but[3];

	btnNumb.value = message.loading;
	btnNumb.style.backgroundColor = colUnknown;	
	await new Promise((resolve, reject) => setTimeout(resolve, 200));
	try {	
		let response = await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: setBody
		});
		if (response.ok) {
			let answer = await response.text();
			log('#95B46A',method.toUpperCase(), "", answer);				
			btnNumb.value = message.success;
			btnNumb.style.backgroundColor = '#008000';
			await new Promise((resolve, reject) => setTimeout(resolve, 1000));
			btnNumb.style.backgroundColor = colBackgrd;			
			btnNumb.value = setText;
		} else {
			log('red', method.toUpperCase(), "", "ERROR: " + response.status);				
			btnNumb.value = message.failure;
			btnNumb.style.backgroundColor = colError;	
			await new Promise((resolve, reject) => setTimeout(resolve, 1000));
			let errorButtonName = btnNumb.value	;
			if (countTry < btnTry) {
				countTry += 1;
				ButtonClick(btnNumb, method, url, setText, setBody, countTry);
				btnNumb.style.backgroundColor = colUnknown;	
				btnNumb.value = message.trying + ": " + countTry;
			} else {
				btnNumb.value = message.failure;
				btnNumb.style.backgroundColor = colError;	
				await new Promise((resolve, reject) => setTimeout(resolve, 1000));				
				btnNumb.style.backgroundColor = colBackgrd;	
				btnNumb.value = setText;				
			}
		}
	} catch(err) {	
		log('red', method.toUpperCase(), "", "ERROR: " + err);			
		btnNumb.style.backgroundColor = colError;	
		btnNumb.value = message.failure;
		await new Promise((resolve, reject) => setTimeout(resolve, 1000));
		if (countTry < btnTry) {	
			countTry += 1;	
			ButtonClick(btnNumb, method, url, setText, setBody, countTry);	
			btnNumb.style.backgroundColor = colUnknown;	
			btnNumb.value = message.trying + ": " + countTry;
		} else {
			btnNumb.value = message.failure;
			btnNumb.style.backgroundColor = colError;	
			await new Promise((resolve, reject) => setTimeout(resolve, 1000));			
			btnNumb.style.backgroundColor = colBackgrd;	
			btnNumb.value = setText;		
		}
	
		
	}
}
const init = () => {
	let btn00 = document.getElementById("selLang");
	let btn01 = document.getElementById("selMonth");
	//let btn02 = document.getElementById("Button02");
	let btn11 = document.getElementById("Button11");
	let btn21 = document.getElementById("Button21");
	let btn22 = document.getElementById("Button22");
	let btn31 = document.getElementById("Button31");
	let btn41 = document.getElementById("Button41");
	let btn51 = document.getElementById("Button51");
	let btn52 = document.getElementById("Button52");
	let btn53 = document.getElementById("Button53");
	//let btn55 = document.getElementById("Button55");
	let btn56 = document.getElementById("Button56");

	btn00.addEventListener("change", function(event){ 
		event.preventDefault();
		openlang(this.value, 0);
	});

	btn01.addEventListener("change", function(event){ 
		event.preventDefault();
		let selM = document.getElementById("selMonth").options.selectedIndex + 1;
		let m, d, h;
		if (selM != parsed_month) {
			m = selM;
			d = endOfMonth[selM - 1];
			h = 23;
		} else {
		    m = parsed_month;
			d = parsed_day;
			h = parsed_hour;			
		}
		openChart(nowValid, parsed_year, m, d, h, 0);	
	});
/* 	
	btn02.addEventListener("change", function(event){ 
		event.preventDefault();
		localStorage.setItem("jsonData", JSON.stringify(jsonData));

	}); 
*/
	btn11.addEventListener("click", function(event){ 
		let jsonData = '';
		event.preventDefault(); 
		smoothChart = document.getElementById('input00').value;
		smoothPlotter.smoothing = smoothChart;		
		rightGapChart = document.getElementById('input01').value;
		g.updateOptions({
			rightGap: rightGapChart
		});
			jsonData = 'input[0][0]=' + document.getElementById('input00').value + '&input[0][1]=' + document.getElementById('input01').value;
		ButtonClick(btn11, "get", 'smooth?'+jsonData, but[6], undefined, 1); 		
	});
	btn21.addEventListener("click", function(event){ 
		let jsonData = '';
		event.preventDefault(); 
		for (let i = 0; i <= 21; i++) {
			jsonData += 'input[1]['+i+']='+document.getElementById('input1'+i).value+'&';
		}
		ButtonClick(btn21, "get", 'save_schedule?'+jsonData.substring(0, jsonData.length-1), but[6], undefined, 1); 
	});	
	btn22.addEventListener("click", function(event){ 
		event.preventDefault(); 
		s_mode = 0; //max 262143
		for (let i = 0; i <= 8; i++) {
			s_mode += (document.getElementById("select_smode" + i).options.selectedIndex + 1) << (i * 2);	
			//console.log(`${i} | value: ${document.getElementById("select_smode" + i).options.selectedIndex} s_mode: ${s_mode} ${s_mode.toString(2)}`);
		}
		ButtonClick(btn22, "get", 's_mode?s_mode='+s_mode, but[6], undefined, 1); 
	});	
	btn31.addEventListener("click", function(event){ 
		event.preventDefault(); 
		let jsonData = '';
		let chk = 0;
		for (let i = 9; i <= 16; i++) {chk += (document.getElementById("input2" + i).checked) << (i-9);}
		document.getElementById('input28').value = chk;
		for (let i = 0; i <= 8; i++) {jsonData += 'input[2]['+i+']='+document.getElementById('input2'+i).value+'&';}
		let fan_on  = parseFloat(document.getElementById("input23").value) + (parseFloat(document.getElementById("input24").value) / 2);
		let fan_off = parseFloat(document.getElementById("input23").value) - (parseFloat(document.getElementById("input24").value) / 2);
		let ten_off = parseFloat(document.getElementById("input25").value) + (parseFloat(document.getElementById("input26").value) / 2);
		let ten_on  = parseFloat(document.getElementById("input25").value) - (parseFloat(document.getElementById("input26").value) / 2);
		let ttip_fan = 'ON : ' + parseFloat(fan_on).toFixed(2) + ' °C OFF: ' + parseFloat(fan_off).toFixed(2) + ' °C';
		let ttip_ten = 'OFF: ' + parseFloat(ten_off).toFixed(2) + ' °C ON : ' + parseFloat(ten_on).toFixed(2) + ' °C';
		let ttip_temp = 'COR : ' + parseFloat(document.getElementById('input20').value).toFixed(1) + ' °C';	
		let ttip_led = 'MAX: '+document.getElementById("input21").value+' % ' + ' ' + ' MIN: '+document.getElementById("input22").value+' %';		
		
		document.getElementById("ttip_temp").setAttribute('tooltip_temp', ttip_temp);
		document.getElementById("ttip_fan").setAttribute('tooltip_fan', ttip_fan);
		document.getElementById("ttip_ten").setAttribute('tooltip_ten', ttip_ten);			
		document.getElementById("ttip_led").setAttribute('tooltip_led', ttip_led);	
		log('blue',"[OPTION]", "INV", chk.toString(2));			
		//console.log(`INV: ${chk.toString(2)}`);
		ButtonClick(btn31, "get", 'save?'+jsonData.substring(0, jsonData.length-1), but[6], undefined, 1); 
	});	
	btn41.addEventListener("click", function(event){ 
		let jsonData = '';
		event.preventDefault(); 
		for (let i = 0; i <= 16; i++) {
			jsonData += 'input[3]['+i+']='+document.getElementById('input3'+i).value+'&';
		}
		ButtonClick(btn41, "get", 'mqtt?'+jsonData.substring(0, jsonData.length-1), but[6], undefined, 1); 
	});	
	btn51.addEventListener("click", function(event){ 
		let jsonData = '';
		event.preventDefault(); 
		for (let i = 0; i <= 2; i++) {
			jsonData += 'input[4]['+i+']='+document.getElementById('input4'+i).value+'&';
		}
		ButtonClick(btn51, "get", 'save_date?'+jsonData.substring(0, jsonData.length-1), but[4], undefined, 1); 
	});
	btn52.addEventListener("click", function(event){ 
		event.preventDefault(); 
		let jsonData = 'input[4][2]=' + document.getElementById("input42").value;
		ButtonClick(btn52, "get", 'auto_sync?'+jsonData, but[5], undefined, 1); 
	});		
	btn53.addEventListener("click", function(event){ 
		let jsonData = '';
		event.preventDefault(); 
  		for (let i = 3; i <= 9; i++) {
			jsonData += 'input[4]['+i+']='+document.getElementById('input4'+i).value+'&';
		} 
  		ButtonClick(btn53, "get", '/ssid?' + jsonData.substring(0, jsonData.length-1), but[6], undefined, 1); 
  		//ButtonClick(btn53, "post", '/ssid', jsonData.substring(0, jsonData.length-1), 1);
	});	
	btn56.addEventListener("click", function(event){ 
		event.preventDefault(); 
		let device = confirm(restartMessage)?1:0;
        if (device == 1) {
			ButtonClick(btn56, "get", '/restart?device='+device, but[9], undefined, 1); 		
			//ButtonClick(btn56, "post", '/restart', 'device='+device, 1); 		
			setTimeout(() => {window.location.reload(true);}, 10000);
		}
	});
	document.getElementById("rst_c").addEventListener("click", function(event){ 
		event.preventDefault(); 
		rst_count=confirm(resetCountMessage)?1:0;
		let btn00 = document.getElementById("rst_c");	
		ttip_wifi = 'RSSI: '+rssi+' dBm\n'+ 'HeapMin: ' +st_heap+ '\nMQTT: ' +st_mqtt+ ' WS: ' +ws_client+ '\nRST COUNT: 0';			
		document.getElementById("ttip_wifi").setAttribute('tooltip_wifi', ttip_wifi);
		ButtonClick(btn00, "get", '/rst_count?restart=' + rst_count, but[6], undefined, 1);
	});
}
window.onerror = function(message, url, lineNumber) {
	console.log("Поймана ошибка, выпавшая в глобальную область!\n" +
	"Сообщение: " + message + "\n(" + url + ":" + lineNumber + ")");
};
window.onload = function() {
	openValues(0);		
	init();	
	//getJson(test_json);
	getCountSec();
    setInterval(function () { getCountSec();}, 1000);	
}
/*
document.addEventListener("visibilitychange", function(){
	if (document.hidden){
		console.log('Вкладка не активна');
	} else {
		console.log('Вкладка активна');    
	}
});
*/
/*
let eventType = 1;	
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);
let xDown = null;
let yDown = null;
let xDiff = null;
let yDiff = null;
let timeDown = null;
let startEl = null;
*/
/*
function handleTouchEnd(e) {
	if (document.getElementById("opacity_all").hidden) { 
		if (startEl !== e.target) return;
		let swipeThreshold = 200;
		let swipeTimeout = 1000;
		let timeDiff = Date.now() - timeDown;
		if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
			if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
				if (xDiff > 0) {
					console.log("xDiff > 0");
					//eventType ++;				
					//if (eventType > 5) eventType = 1;
				}
				else {
					console.log("xDiff < 0");
					//eventType --;	
					//if (eventType < 1) eventType = 5;
				}
			}
			//changeZindex(eventType);
			//document.getElementById('tab_'+ eventType).checked = true;		
			//if (eventType==1) {updateChart();}
		}		
		//if (eventType !== '') {
		//	startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true }));
		//}
		xDown = null;
		yDown = null;
		timeDown = null;
	}
};

function handleTouchStart(e){if (e.target.getAttribute('data-swipe-ignore') === 'true') return;startEl = e.target;timeDown = Date.now();xDown = e.touches[0].clientX;yDown = e.touches[0].clientY;xDiff = 0;yDiff = 0;}
function handleTouchMove(e) {if (!xDown || !yDown) return;let xUp = e.touches[0].clientX;let yUp = e.touches[0].clientY;xDiff = xDown - xUp;yDiff = yDown - yUp;}

*/