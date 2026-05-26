const canvas = document.getElementById("drawingBoard");
const ctx = canvas.getContext('2d');


ctx.lineCap = 'round';
ctx.lineJoin = 'round';


export function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    console.log("Canvas resized to:", canvas.width, canvas.height); // Check if this is > 0
    
    // Explicitly set styles after resizing
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

export function drawLine(x0, y0, x1,y1,color,lineWidth,isEraser=false){
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);

    if(isEraser){
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = lineWidth*2;
    }else{
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
    }
    ctx.stroke();
}

export function clearLocalCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
}