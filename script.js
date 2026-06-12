const elements = {
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
    start_btn: document.getElementById("start_btn"),
    stop_btn: document.getElementById("stop_btn"),
    completion_message: document.getElementById("completion_message"),
    counter_container: document.getElementById("counter_container")
}

let totalSeconds = 0;
let timeInterval = null;

let isRunning = () => timeInterval !== null;

function set_timer(input){

    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = Math.floor(totalSeconds % 60);

    switch(input){
        case 'h+': h = h<23 ? ++h : 0;break;
        case 'h-': h = h>0 ? --h : 23;break;
        case 'm+': m = m<59 ? ++m : 0;break;
        case 'm-': m = m>0 ? --m : 59;break;
        case 's+': s = s<59 ? ++s : 0;break;
        case 's-': s = s>0 ? --s : 59;break;
    }

    totalSeconds = (h*3600) + (m*60) + s;
    updateDisplay();
}

function updateDisplay(){
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    
    elements.hours.textContent = String(h).padStart(2,'0');
    elements.minutes.textContent = String(m).padStart(2,'0');
    elements.seconds.textContent = String(s).padStart(2,'0');
}

function start_timer(){
    if(!isRunning || totalSeconds <= 0)return;
    totalSeconds++;
    renderUI(isRunning);
    elements.hours.textContent = '--';
    elements.minutes.textContent = '--';
    elements.seconds.textContent = '--';

    timeInterval = setInterval(() => {
        totalSeconds--;
        if(totalSeconds < 0){
            clearInterval(timeInterval);
            timeInterval = null;
            completionSequence(true);
            return;
        }
        updateDisplay();
    }, 1000);
}

function stop_timer(){
    if(!isRunning)return;
    clearInterval(timeInterval);
    timeInterval = null;
    totalSeconds = 0;
    resetUIToDefault();
}

function renderUI(timeIsActive){
    elements.start_btn.classList.toggle('hide',timeIsActive);
    elements.stop_btn.classList.toggle('show',timeIsActive);
}

function completionSequence(toggleComplete){
    elements.completion_message.classList.toggle('show_message',toggleComplete);
    elements.counter_container.classList.toggle('counter_disp', toggleComplete);

    setTimeout(()=>{          
        elements.completion_message.classList.toggle('show_message',!toggleComplete);
        elements.counter_container.classList.toggle('counter_disp', !toggleComplete);
        resetUIToDefault();
    },3000);
}

function resetUIToDefault(){
    renderUI(!isRunning);
    totalSeconds = 0;
    elements.hours.textContent = 'HH';
    elements.minutes.textContent = 'MM';
    elements.seconds.textContent = 'SS';
}