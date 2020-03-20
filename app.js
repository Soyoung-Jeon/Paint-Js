const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 500;

const defaultColor = "#2c2c2c";
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = defaultColor;
ctx.fillStyle = defaultColor;
ctx.lineWidth = 2.5;

let painting = false; 
let filling = false;
const stopPainting = () => { painting = false; };
const startPainting = () => { painting = true; };

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else { 
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 캔버스 칠하기
function handleCanvasClick(){
  if( filling == true ){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", event => { event.preventDefault(); });  // 우클릭 방지
}



// 색상선택 이벤트
function resetColorStyle() { 
  Array.from(colors).forEach( color => { color.style.boxShadow = `` } );
};

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  if ( color == "transparent" ) {
    resetColorStyle();
  } else if ( color == "white" ) {
      resetColorStyle();
      event.target.style.boxShadow = `0px 0px 10px #bcbcbc`;
  } else {
    resetColorStyle();
    event.target.style.boxShadow = `0px 0px 8px ${color}`;
  }
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));



// 사용자 정의 컬러피커 이벤트
const colorPicker = document.getElementById("jsColorPicker");

colorPicker.addEventListener("input", () => {
  ctx.strokeStyle = colorPicker.value;
  ctx.fillStyle = colorPicker.value;
});


// 스트로크 굵기 조정
function handleRangeChange(){
  const size = event.target.value;
  ctx.lineWidth = size;
}
if(range){
  range.addEventListener("input", handleRangeChange);
}


// 칠하기 모드 조정
function handleModeClick() {
  if( filling == true ){
    filling = false;
    mode.innerText = "fill";
    canvas.style.cursor = "url(./img/brush.cur) 0 35, auto";
  } else {
    filling = true;
    mode.innerText = "brush";
    canvas.style.cursor = "url(./img/fill.cur) 0 0, auto";
  }
}
if(mode){
  mode.addEventListener("click", handleModeClick);
}


// 저장버튼 이벤트
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "mycat";
  link.click();
}
if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}


// 리셋버튼 이벤트
function handleResetClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = defaultColor;
  ctx.fillStyle = defaultColor;
  ctx.lineWidth = 2.5;
  painting = false; 
  filling = false;
}
if(resetBtn){
  resetBtn.addEventListener("click", handleResetClick);
}