// const pomodoroTab = document.querySelector('.js-pomodoro');
// // pomodoroTab.addEventListener('click',()=>{
// //     console.log('clicked');
// // })
// pomodoroTab.onclick=function(){
//     pomodoroTab.setAttribute('className','selected')
// };
// for(let i=0;i<3;i++){
//     document.querySelector('.js-tab'+i).addEventListener('click',()=>{

//     })
    // document.querySelector('.js-tab'+i).classList.add('selected');
// }
var pomoTime={
    min:25,
    sec:60
};
var intervalId;
var isPaused = false;
function UpdateTimer(min,sec){
    pomoTime.min = min;
    pomoTime.sec = sec;
    UpdateScreen(pomoTime.min,pomoTime.sec);
};
document.querySelector('.timer').innerHTML = '25:00';
document.querySelector('.js-tab0').addEventListener('click',()=>{
    UpdateTimer(25,60);
    UpdateTab(0);
});
document.querySelector('.js-tab1').addEventListener('click',()=>{
    UpdateTimer(5,60);
    UpdateTab(1);
});
document.querySelector('.js-tab2').addEventListener('click',()=>{
    UpdateTimer(15,60);
    UpdateTab(2);
});

function formatTime(time){
    if(time<10){
        time = '0'+time;
        return time.toString();
    }
    else if(time===60){
        time = '00';
    }
    return time.toString();
}

function UpdateScreen(min,sec){
    document.querySelector('.timer').innerHTML = formatTime(min)+':'+formatTime(sec);
}

function StopTimer(){
    document.getElementById('btn-start').style.display = 'inline-flex';
        document.getElementById('btn-stop').style.display = 'none';
        document.getElementById('btn-pause').style.display = 'none';
        document.getElementById('btn-continue').style.display = 'none';
        if(document.querySelector('.js-tab0').classList.contains('selected')){
            clearInterval(intervalId);
            UpdateTimer(25,60);
        }
        else if(document.querySelector('.js-tab1').classList.contains('selected')){
            clearInterval(intervalId);
            UpdateTimer(5,60);
        }
        else if(document.querySelector('.js-tab2').classList.contains('selected')){
            clearInterval(intervalId);
            UpdateTimer(15,60);
        }
}

function UpdateTab(tabId){
    isPaused = false;
    clearInterval(intervalId);
    document.getElementById('btn-start').style.display = 'inline-flex';
    document.getElementById('btn-stop').style.display = 'none';
    document.getElementById('btn-pause').style.display = 'none';
    document.getElementById('btn-continue').style.display = 'none';
    for(let i=0;i<=2;i++){
        if(i===tabId){
            document.querySelector('.js-tab'+i).classList.add('selected');
        }
        else{
            document.querySelector('.js-tab'+i).classList.remove('selected');
        }
    }
}
document.getElementById('btn-start').onclick = function(){
    document.getElementById('btn-start').style.display = 'none';
        document.getElementById('btn-stop').style.display = 'inline-flex';
        document.getElementById('btn-pause').style.display = 'inline-flex';
        document.getElementById('btn-continue').style.display = 'none';
        if(document.querySelector('.js-tab0').classList.contains('selected')){
            StartTimer(25,60);
        }
        else if(document.querySelector('.js-tab1').classList.contains('selected')){
            StartTimer(5,60);
        }
        else if(document.querySelector('.js-tab2').classList.contains('selected')){
            StartTimer(15,60);
        }
};
document.getElementById('btn-stop').onclick = function(){
    StopTimer();
};
document.getElementById('btn-pause').onclick = function(){
    isPaused = true;
    document.getElementById('btn-continue').style.display = 'inline-flex';
    document.getElementById('btn-pause').style.display = 'none';
};    
document.getElementById('btn-continue').onclick = function(){
    isPaused = false;
    document.getElementById('btn-pause').style.display = 'inline-flex';
    document.getElementById('btn-continue').style.display = 'none';
};    

function StartTimer(min,sec){
        pomoTime.min -= 1;
        intervalId = setInterval(()=>{
        if(!isPaused){
        pomoTime.sec -= 1;
        if(pomoTime.sec===0 && pomoTime.min>0){
            pomoTime.min -= 1;
            pomoTime.sec=60;
        }
        else if(pomoTime.min=== 0 && pomoTime.sec===0){
            var audiointervalId = setInterval(document.getElementById('audio').play(),5);
            clearInterval(intervalId);
            StopTimer();
            UpdateTimer(min,sec);
            clearInterval(audiointervalId);
        }
        UpdateScreen(pomoTime.min,pomoTime.sec);
    }
    },1000)
}

// setInterval(BGChange,1000);

// function BGChange(){
//     let randomColor = "#" + Math.floor(Math.random() * (12560038-10926783)+10926783).toString(16);
//     document.querySelector('body').style.transition = 'backgroundColor 1s ease 1s';
//     document.querySelector('body').style.backgroundColor = randomColor; 
//     console.log(getComputedStyle(document.querySelector('body')).transition); 
// } 

// //12560038
// //10926783

// setInterval(BGChange, 1000);

function BGChange() {
    // Generate a random color in hex format
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    
    // Select the body element
    const body = document.querySelector('body');
    
    // Apply the transition property to ensure a smooth background color change
    body.style.transition = 'background-color 1s ease';
    
    // Change the background color
    body.style.backgroundColor = randomColor;
    
    // Log the transition property to the console
    console.log(getComputedStyle(body).transition);
}
