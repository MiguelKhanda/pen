import {drawLine, clearLocalCanvas} from './canvas.js'


const socketUrl = 'ws://localhost:3000' 
let socket = null;

export function initWebSocket(){
    socket = new WebSocket(socketUrl);
    
    socket.onopen = () => {
        console.log('Connected to Live-Canvas backend synchronization hub.')
        document.querySelector('.status-dot').className= 'status-dot connected'
    }

    socket.onmessage = (event) => {
        const packet = JSON.parse(event.data)
        if (packet.type=='draw'){
            const data = packet.payload;
            drawLine(data.x0, data.x1, data.y1, data.color, data.lineWidth, data.isEraser)
        }else if(packet.type == 'clear'){
            clearLocalCanvas();
        }
    }
    socket.onclose = () => {
        console.warn('Diconnected from sync server.');
        document.querySelector('.status-dot').className='status-dot'
    }
}

export function emitDrawAction(drawData){
    if(socket&&socket.readyState == WebSocket.OPEN){
        socket.send(JSON.stringify({type:'clear'}));
    }
}

export function emitClearAction() {
    if(socket && socket.readyState == WebSocket.OPEN){
        socket.send(JSON.stringify({type:'clear'}))
    }
}

initWebSocket();