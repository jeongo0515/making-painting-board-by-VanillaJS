const canvas = document.getElementById("jsCanvas");  // html파일의 jsCanvas라는 ID를 canvas라는 이름으로 사용
const ctx = canvas.getContext("2d");  //context를 2D로 작업
const colors = document.getElementsByClassName("jsColor"); // html파일의 jsColor라는 class를 colors라는 이름으로 사용 
const range = document.getElementById("jsRange");  // html파일의 jsRange라는 ID를 range라는 이름으로 사용 
const mode = document.getElementById("jsMode");  // html파일의 jsMode라는 ID를 mode라는 이름으로 사용
const saveBtn = document.getElementById("jsSave"); //html파일의 jsSave라는 ID를 savewBtn라는 이름으로 사용

const INITIAL_COLOR = "#2c2c2c";  //INITIAL_COLOR의 변수에 #2C2C2C 저장 
const CANVAS_WIDTH = "1000";  // 캔버스 폭 변수에 저장
const CANVAS_HIGHT = "550";  // 캔버스 높이 변수에 저장

canvas.width = CANVAS_WIDTH;  // 캔버스 폭 정의
canvas.height = CANVAS_HIGHT;  // 캔버스의 높이 정의

ctx.fillStyle = "white";  // 캔버스 초기색상 지정 
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);  // 지정한 색상으로 설정 - 캔버스 저장시 생기는 버그로 먼저 저장
ctx.strokeStyle = INITIAL_COLOR; //paint모드의 초기색상 지정
ctx.fillStyle = INITIAL_COLOR; // fill모드의 초기색상 지정
ctx.lineWidth = 5;  // 초기 굵기 지정()

let painting = false;   // painting의 초기값을 false로 지정
let filling = false;  // filling의 초기값을 false로 지정

function stopPainting(){   // 함수 호출시 painting값을 false로 지정
    painting = false;  
}

function startPainting() {  // 함수 호출시 painting값을 true로 지정
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

function handleColorClick(event) {  // 색상 바꾸기 함수
    const color = event.target.style.backgroundColor;  // 45라인의 줄에서 받은 color정보의 rgb값만 color 저장
    ctx.strokeStyle = color;  // rgm값이 저장된  color변수의 값을 색상으로(paint모드) 
    ctx.fillStyle = color;   // rgm값이 저장된  color변수의 값을 색상으로(fill모드)
} 

function handleRangeChange(event) {  // 선의 폭 조절함수
    const size = event.target.value;  // 스크롤바의 값만 size함수에 저장 
    ctx.lineWidth = size;  // 변수 size에 저장돤 값을 선의 폭으로 지정
}

function handleModeClick() {  // fill모드와 paint모드 전환시 사용중인 모드로 글씨 교체 
    if(filling === true){  // 만약 filling이 true면 (paint모드)
        filling = false;  // filling을 false로 
        mode.innerText = "Fill";  // 텍스트를 Fill로 교체
    } else {  
        filling = true;  // filling을 true로 (fill모드)
        mode.innerText = "paint" // 텍스트를 paint로 교체
    }
}

function handleCanvasClick() {  // fill모드 함수
    if(filling){  // 만약 fill모드면 
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HIGHT);  // 해당 사이즈 크기만큼 해당 색으로 채우기(여기서 해당 사이즈는 캔버스 전체로 설정됨)
    }
}

function handleCM(event) {  // 캔버스 위에서 마우스 우클릭 방지(save버튼 사용 유도)
    event.preventDefault();
}

function handleSaveClick() {   // 이미지 저장함수
    const image = canvas.toDataURL();  // 저장할 이미지의 url을 image함수에 저장, ()안에 이미지 저장 형식 지정가능 ex) image/jpg or image/jpeg
    const link = document.createElement("a");
    link.href = image; 
    link.download = "paintJS🎨";  //다운로드한 파일의 이름 지정
    link.click();
}

if(canvas){
    canvas.addEventListener("mousedown", startPainting);     //mousedown이벤트 발생시  stopPainting 함수 호출 
    canvas.addEventListener("mousemove", onMouseMove);     //mousemove이벤트 발생시  onMouseMove 함수 호출    
    canvas.addEventListener("mouseup", stopPainting);         // mouseup이벤트 발생시 stopPainting 함수 호출
    canvas.addEventListener("mouseleave", stopPainting);   //mouseleave이벤트 발생시 stopPainting 함수 호출
    canvas.addEventListener("click", handleCanvasClick);   // click이벤트 발생시 handleCanvasClick 함수 호출
    canvas.addEventListener("contextmenu", handleCM);      // contextmenu이벤트 발생시 handleCM 함수 호풀
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));  // 색상을 클릭하면 해당 색상의 colro에 저장후 handleColorClick함수 실행

if(range) {
    range.addEventListener("input", handleRangeChange); //range라는 id에 input이벤트 발생시 handleRangeChange함수 호출 
}

if(mode) {
    mode.addEventListener("click", handleModeClick);  // mode라는 id에 click이벤트 발생시 handleModeClick함수 호출
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);  // saveBtn라는 id에 click이벤트 발생시 handleSaveClick 함수 호출
}