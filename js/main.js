import {resizeCanvas, drawLine, clearLocalCanvas} from './canvas.js'
import {emitDrawAction, emitClearAction} from './socket.js'

const canvas = document.getElementById('drawingBoard')
const state = {
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    color: '#000',
    lineWidth: 5,
    currentTool: 'brush'
};

window.addEventListener('DOMContentLoaded', resizeCanvas);
window.addEventListener('resize', resizeCanvas)

canvas.addEventListener('mousedown',(e) => {
    state.isDrawing = true;
    state.lastX = e.offsetX;
    state.lastY  = e.offsetY;
})

canvas.addEventListener('mousemove', (e) => {
    if(!state.isDrawing) return;
    const currentX = e.offsetX;
    const currentY = e.offsetY;
    const isEraser = state.currentTool === 'eraser';
    drawLine(state.lastX,state.lastY,currentX, currentY,state.color, state.lineWidth, isEraser);

    emitDrawAction({
        x0: state.lastX,
        y0: state.lastY,
        x1: currentX,
        y1: currentY,
        color: state.color,
        lineWidth: state.lineWidth,
        isEraser: isEraser
    })
    state.lastX = currentX;
    state.lastY = currentY;
})

canvas.addEventListener('mouseup',()=>state.isDrawing=false);
canvas.addEventListener('mouseleave',()=> state.isDrawing = false)



const colorPicker = document.getElementById('colorPicker');
const lineWidthSlider = document.getElementById('lineWidth');
const btnBrush = document.getElementById('btnBrush')
const btnEraser = document.getElementById('btnEraser')
const btnClear = document.getElementById('btnClear')

colorPicker.addEventListener('input', (e) =>{
    state.color = e.target.value;
    state.currentTool = 'brush';
    btnBrush.classList.add('active');
    btnEraser.classList.remove('active');
})

lineWidthSlider.addEventListener('input',(e) =>state.lineWidth = e.target.value)

btnBrush.addEventListener('click', () => {
    state.currentTool = 'brush';
    btnBrush.classList.add('active');
    btnEraser.classList.remove('active');
})

btnEraser.addEventListener('click', () => {
    state.currentTool = 'eraser';
    btnBrush.classList.remove('active');
    btnEraser.classList.add('active')
})

btnClear.addEventListener('click',() =>{
    clearLocalCanvas();
    emitClearAction();
})