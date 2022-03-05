let visib_state = 1;
let box_name = [];
let line_color = [];
let selected_val = [];
let dt_addr = [[],[],[],[],[],[],[],[],[],[]];
let not_used = "Not Used";
let last_index = 10;
let configDs_float = [[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12],[12]];
//let line_color = ["#1511e8", "#0f9dcc", "#df3320", "#d9e70d", "#e042d3", "#680317", "#800cdf", "#09ce44", "#83e633", "#d0961b"];
//let box_name = ["home", "kitchen", "bath", "toilet", "spaln", "street", "prihoj", "vanna", "okno", "podval"];

let parsed_day = 5;
let parsed_month = 2;
let parsed_year = 2022;
let parsed_hour = 10;
let parsed_week = 0;
let day_count = 0;

let day_from, day_to;
let month_from, month_to;

let days_in_prev_month = 0;

let load_values = 1;
let myChart, data, options;

function add_zero(n){return n > 9 ? n: "0" + n; }

window.onload = function() {
	//openChart();
	openValues();
}

function changeColor(num,val){
	line_color[num] = val;
    myChart.data.datasets[num].borderColor = val;	
    myChart.data.datasets[num].backgroundColor = val;	
	//myChart.update();
}

async function loadChart(base_numb,once){
	n = document.getElementById("input_chart").value;
    if (!load_values && !n) {
		setTimeout(function () { loadChart(); }, 1000);
	} else {
		//parsed_day>=n?(day_from=parsed_day-n+1,day_to=parsed_day):(days_in_prev_month=new Date(parsed_year,parsed_month-1,0).getDate(),day_from=days_in_prev_month-n+parsed_day+1,day_to=parsed_day);
		day_to = parsed_day;			
		month_to = parsed_month;
		if (parsed_day >= n) {
			day_from = parsed_day - n + 1;
			month_from = parsed_month;
		} else {
			days_in_prev_month = new Date(parsed_year,parsed_month - 1,0).getDate();			
			day_from = days_in_prev_month - n + parsed_day + 1;	
			month_from = parsed_month - 1;
		}
		//console.log("days in chart: " + n);
		let k = day_from;
		let time_ost = (parsed_hour / 2);	
		if (day_from > day_to) {
			k = 1;
			loadDataForChart(month_from, day_from, days_in_prev_month, 11, base_numb, once);
			//console.log("from: " + add_zero(day_from) + "." + add_zero(month_from) + " - " + add_zero(days_in_prev_month) + "." + add_zero(month_from));	
			//console.log("days:" + parseInt(days_in_prev_month-day_from + 1));

		}
		//console.log("to: " + add_zero(k) + "." + add_zero(month_to) + " - " + add_zero(day_to) + "." + add_zero(month_to));	
		//console.log("days:" + parseInt(day_to-k + 1));
		loadDataForChart(month_to, k, day_to, time_ost, base_numb, once);
		myChart.update();
	}
}		

async function openValues() {
	await openChart();
	let url = 'configSetup.json';
	let response = await fetch(url);
	if (response.ok) {
		let once = 1;
		let configSetup = await response.json();
		load_selectList(configSetup);
		load_chart_box(configSetup);
		load_langList(configSetup);
		for (let i in configSetup.selected_val) {
			if (configSetup.selected_val != 10) {
				loadChart(i,once);
				once = 0;
			}
		}
		myChart.update();
	} else {
	    console.log("Ошибка openValues: " + response.status);
	}
}

async function loadDataForChart(load_month, load_day_from, load_day_to, load_hours, base_numb, once){
	let json_url = '/' + load_month + '/ds' + parseInt(base_numb) + '.json';	
	let response = await fetch(json_url);
	if (response.ok) {
		let jsonfile = await response.json();
		for (let i = load_day_from; i <= (load_day_to-1); i++) {
			for (let j = 0; j <= 11; j++) {				
				let xlabel = add_zero(i)+"."+add_zero(load_month)+"."+parsed_year+"_" + add_zero(j*2)+":00";
				if (once) myChart.data.labels.push(xlabel);
				myChart.data.datasets[base_numb].data.push(jsonfile.days[i][j]);
			}
		}		
		let lh = (load_hours == 11) ? 11 : load_hours;
		for (let j = 0; j <= lh; j++) {
			let xlabel = add_zero(load_day_to)+"."+add_zero(load_month)+"."+parsed_year+"_" + add_zero(j*2)+":00";				
			if (once) myChart.data.labels.push(xlabel);
			myChart.data.datasets[base_numb].data.push(jsonfile.days[load_day_to][j]);
		}		
		myChart.update();
	} else {
	    console.log("Ошибка loadDataForChart: " + response.status);
	}
}

function openChart(){
	data = {
		datasets: [{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			},{ pointRadius: 0,fill: false
			}
		]
	}
	options = {
		animation: false,		
		scales: {
			x: {	
				ticks: {
					callback: function(val, index) {
					return index % 2 === 0 ? this.getLabelForValue(val) : '';
					}
				}
			},	
			y: {
				ticks: {
					callback: function(value, index, ticks) {
						return value+'°C';
					}
				}
			}	
		},
		plugins: {
			legend: {
				display: true,
				position: "bottom",
				lineWidth: 0,
				labels: {
					filter: function(legendItem, myChart) {
						if (selected_val[legendItem.datasetIndex] == last_index) {
							myChart.datasets[legendItem.datasetIndex].hidden = true;								
							return false
						} else {
							myChart.datasets[legendItem.datasetIndex].hidden = false;								
							return true
						}
					},
					usePointStyle: true,
					boxWidth: 8
				}
			}
		}
	};
	const ctx = document.getElementById('myChart').getContext('2d');		
	myChart = new Chart(ctx, {type: 'line', data, options});
}

function ds_mac_selected() { //Скрытие графика в зависимости от выбранных датчиков
	for (let i = 0; i <= 9; i++) { 	
		selected_val[i] = document.getElementById('ds_sel' + parseInt(i+1)).selectedIndex;
		if (selected_val[i] == last_index) {
			myChart.setDatasetVisibility(i, false);	
			document.getElementById('dash_box' + parseInt(i+1)).hidden = true;
		} else {
			myChart.setDatasetVisibility(i, true);	
			document.getElementById('dash_box' + parseInt(i+1)).hidden = false;			
		}
	}	
	myChart.update();			
}

function edit_label_name() { //Изменение названия label в legend
	visib_state = !visib_state;
	document.getElementById("t_edit").value = (visib_state == 0) ? "Save" : "Edit";
	for (let i = 0; i <= 9; i++) {
		document.getElementById('t_text' + parseInt(i + 1)).readOnly = visib_state;		
		if (visib_state == 1) {		
			box_name[i] = document.getElementById('t_text' + parseInt(i + 1)).value;		
			document.getElementById('in_box' + parseInt(i + 1)).value = box_name[i];	
			myChart.data.datasets[i].label = box_name[i];
		}
	}
	myChart.update();	
}

function load_selectList(configSetup) {
	for (let m = 1; m <= 10; m++) { 				
		for (let i = 0; i <= 9; i++) { 	
			for (let j = 0; j <= 7; j++) { 				
				dt_addr[i][j] = configSetup.dt_addr[i][j];
			}			
			let tmp = 25.4;
			let val_text = parseFloat(tmp+i) + "°C - " + dt_addr[i];
			let option = document.createElement("option");
			option.value = val_text;
			option.text = val_text;
			document.getElementById('ds_sel' + parseInt(m)).appendChild(option);				
		}
		let option = document.createElement("option");
		option.value = not_used;
		option.text = not_used;
		document.getElementById('ds_sel' + parseInt(m)).appendChild(option);
	}
}

function load_chart_box(configSetup) {
	for (let i = 0; i <= 9; i++) { 	
		line_color[i] = configSetup.line_color[i];
		document.getElementById('t_color' + parseInt(i+1)).value = configSetup.line_color[i];
		myChart.data.datasets[i].borderColor = line_color[i];	
		myChart.data.datasets[i].backgroundColor = line_color[i];	

		box_name[i] = configSetup.box_name[i];
		document.getElementById('t_text' + parseInt(i + 1)).value = box_name[i];
		document.getElementById('in_box' + parseInt(i + 1)).value = box_name[i];
		myChart.data.datasets[i].label = box_name[i];
		
		selected_val[i] = configSetup.selected_val[i];	
		document.getElementById('ds_sel' + parseInt(i + 1)).selectedIndex = selected_val[i];

		let bool = (selected_val[i] == last_index) ? false : true;				
		myChart.setDatasetVisibility(i, bool);
		document.getElementById('dash_box' + parseInt(i + 1)).hidden = !bool;				
	}	
}

function load_langList(configSetup) {
    let selectList = document.getElementById("select_lang");	
	for (let i in configSetup.lang) {
		let option = document.createElement("option");
		option.value = configSetup.lang[i];
		option.text = configSetup.lang[i];
		selectList.appendChild(option);
	}
	selectList.value = configSetup.defaultLang;	
}

