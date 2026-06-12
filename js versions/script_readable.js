const start_btn = document.getElementById("start_btn");
const stop_btn = document.getElementById("stop_btn");
const done_signal = document.getElementById("done_signal");
const display = document.getElementById("counter_container");
const set_hour = document.getElementById("set_hour");
const set_min = document.getElementById("set_min");
const set_sec = document.getElementById("set_sec");

let hour_tracker = 0;
let minute_tracker = 0;
let second_tracker = 0;

let interfere = false;
let started = false;

function stop_timer(){
    interfere = true;
}

function start_timer(){
    started = true;
    start_btn.classList.toggle('hide');
    stop_btn.classList.toggle('show');
    second_tracker = second_tracker + 1;

    set_hour.textContent = '--';
    set_min.textContent = '--';
    set_sec.textContent = '--';

    const time = setInterval(()=>{        
        if(!interfere){
            if(second_tracker >= 0)second_tracker--;
            
            if(second_tracker < 0 && minute_tracker !== 0){
                minute_tracker--;
                second_tracker=59;
            }

            if(second_tracker === 0 && minute_tracker === 0 && hour_tracker !== 0){
                hour_tracker--;
                second_tracker = 59;
                minute_tracker = 59;
            }

            if(hour_tracker === 0 && minute_tracker === 0 && second_tracker === 0){
                clearInterval(time);
                handleDisplay();
                setTimeout(()=>{
                    done_signal.textContent = 'Counting completed';
                    done_signal.classList.toggle('show_message');
                    display.classList.toggle('hide_counter');
                },1000);
                setTimeout(()=>{
                    doneSettings();                    
                    done_signal.classList.toggle('show_message');
                    display.classList.toggle('hide_counter');
                    started = false;
                },3000);
                return;
            }
            handleDisplay();
        }else{
            clearInterval(time);
            doneSettings();
            hour_tracker = 0;
            minute_tracker = 0;
            second_tracker = 0;
            interfere = false;
            started = false;
            return;
        }
    },1000);
}

function set_timer(input){
    if(!started){
        if(input === 'h+')hour_tracker < 23 ? ++hour_tracker : hour_tracker=0;
        if(input === 'h-')hour_tracker <= 0 ? hour_tracker = 23 : --hour_tracker;
        if(input === 'm+')minute_tracker < 59 ? ++minute_tracker : minute_tracker = 0;
        if(input === 'm-')minute_tracker <= 0 ? minute_tracker = 59 : --minute_tracker;
        if(input === 's+')second_tracker < 59 ? ++second_tracker : second_tracker = 0;
        if(input === 's-')second_tracker <= 0 ?second_tracker = 59 : --second_tracker;
        handleDisplay();
    }
}

function doneSettings(){
    done_signal.textContent = '';
    set_hour.textContent = 'HH';
    set_min.textContent = 'MM';
    set_sec.textContent = 'SS';
    start_btn.classList.toggle('hide');
    stop_btn.classList.toggle('show');
}

function handleDisplay(){
    let temp_sec = '';
    let temp_min = '';
    let temp_hour = '';

    hour_tracker < 10 ? temp_hour = `0${hour_tracker}`: temp_hour = `${hour_tracker}`;
    minute_tracker < 10 ? temp_min = `0${minute_tracker}`: temp_min = `${minute_tracker}`;
    second_tracker < 10 ? temp_sec = `0${second_tracker}`: temp_sec = `${second_tracker}`;

    set_hour.textContent = temp_hour;
    set_min.textContent = temp_min;
    set_sec.textContent = temp_sec;
}