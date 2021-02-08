const canvas = document.getElementById("jsCanvas");

let painting = false;   // painting의 초기값을 false로 지정

function stopPainting(){   // 함수 호출시 painting값을 false로 지정
    painting = false;
}

function onMouseMove(event) {  // 함수 호출시 마우스 포인터의 좌표 저장
    const x = event.offsetX;   // 스크린상의 X좌표가 아닌 캔버스상의 X좌표
    const y = event.offsetY;   // 스크린상의 Y좌표가 아닌 캔버스상의 Y좌표 
}

function onMouseDown(event) {   // 마우스를 누르면 painting값을 ture로 지정
    painting = true;
}

function onMouseUp(event) {   // 마우스를 때면 stopPainting함수 호출
    stopPainting();
}

if(canvas){
    canvas.addEventListener("mousedown", onMouseDown);     //mousedown라는 이벤트 발생시  onMouseDown라는 함수 실행 
    canvas.addEventListener("mousemove", onMouseMove);     //mousemove라는 이벤트 발생시  onMouseMove라는 함수 실행    
    canvas.addEventListener("mouseup", onMouseUp);         // mouseup라는 이벤트 발생시 onMouseUp라는 함수 실행
    canvas.addEventListener("mouseleave", stopPainting);   //mouseleave라는 이벤트 발생시 onMouseLeave라는 함수 실행
}