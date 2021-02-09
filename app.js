const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");  //context를 2D로 작업

canvas.width = 1000;  // 캔버스 폭 정의
canvas.height = 550;  // 캔버스의 높이 정의

ctx.strokStyle = "#2c2c2c"; // 초기색상 지정
ctx.lineWidth = 2.5;  // 초기 굵기 지정()

let painting = false;   // painting의 초기값을 false로 지정

function stopPainting(){   // 함수 호출시 painting값을 false로 지정
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {  // 함수 호출시 마우스 포인터의 좌표 저장
    const x = event.offsetX;   // 스크린상의 X좌표가 아닌 캔버스상의 X좌표
    const y = event.offsetY;   // 스크린상의 Y좌표가 아닌 캔버스상의 Y좌표 
    if(!painting){  // 만약 painting을 하지 않는다면
        ctx.beginPath();  // path를 만들기 시작(가상의 선)
        ctx.moveTo(x, y);  // x, y좌표를 따라서
    } else {
        ctx.lineTo(x, y);  // 가장 최근의 path위치와 현재의 위치를 선으로 연결
        ctx.stroke();
    }
}

function onMouseDown(event) {   // 마우스를 누르면 painting값을 ture로 지정
    painting = true;
}

if(canvas){
    canvas.addEventListener("mousedown", startPainting);     //mousedown라는 이벤트 발생시  stopPainting라는 함수 실행 
    canvas.addEventListener("mousemove", onMouseMove);     //mousemove라는 이벤트 발생시  onMouseMove라는 함수 실행    
    canvas.addEventListener("mouseup", stopPainting);         // mouseup라는 이벤트 발생시 stopPainting라는 함수 실행
    canvas.addEventListener("mouseleave", stopPainting);   //mouseleave라는 이벤트 발생시 stopPainting라는 함수 실행
}