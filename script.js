// Matrix rain effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
        
        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Interactive functions
let commandHistory = [];

function runCommand(cmd) {
    const output = document.getElementById('output');
    const line = document.createElement('div');
    line.className = 'output-line';
    
    switch(cmd) {
        case 'whoami':
            line.innerHTML = '<span style="color: #ff6b35;">root@system:~$</span> whoami<br><span style="color: #00ff41;">GEAR - System Administrator</span>';
            break;
        case 'ls -la':
            line.innerHTML = '<span style="color: #ff6b35;">root@system:~$</span> ls -la<br><span style="color: #00ff41;">total 1337<br>-rwxr-xr-x 1 gear gear 2550 Feb  4 profile.dat<br>-rwxr-xr-x 1 gear gear 1337 Feb  4 skills.exe<br>-rwxr-xr-x 1 gear gear  420 Feb  4 projects.zip</span>';
            break;
        case 'ps aux':
            line.innerHTML = '<span style="color: #ff6b35;">root@system:~$</span> ps aux<br><span style="color: #00ff41;">USER    PID %CPU %MEM COMMAND<br>gear   1337  0.1  0.5 /bin/awesome<br>gear   2550  0.0  0.2 /usr/bin/coding<br>root   9999  0.0  0.1 /sbin/matrix</span>';
            break;
        case 'netstat':
            line.innerHTML = '<span style="color: #ff6b35;">root@system:~$</span> netstat<br><span style="color: #00ff41;">Active connections:<br>TCP 127.0.0.1:8080 LISTENING<br>TCP 0.0.0.0:22 ESTABLISHED<br>UDP 8.8.8.8:53 CONNECTED</span>';
            break;
        case 'hack':
            line.innerHTML = '<span style="color: #ff6b35;">root@system:~$</span> hack_mode<br><span style="color: #ff6b35;">INITIALIZING HACK MODE...<br>ACCESS GRANTED ✓<br>WELCOME TO THE MATRIX</span>';
            hackMode();
            break;
        case 'clear':
            output.innerHTML = '';
            return;
        default:
            line.innerHTML = '<span style="color: #ff6b35;">root@system:~$</span> ' + cmd + '<br><span style="color: #ff6b35;">Command not found</span>';
    }
    
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    commandHistory.push(cmd);
}

function hackMode() {
    const terminal = document.getElementById('terminal');
    terminal.style.animation = 'glitch 0.5s infinite';
    
    setTimeout(() => {
        terminal.style.animation = '';
    }, 3000);
}

function closeTerminal() {
    if(confirm('Are you sure you want to close the terminal?')) {
        document.querySelector('.terminal-window').style.display = 'none';
        setTimeout(() => {
            document.querySelector('.terminal-window').style.display = 'block';
        }, 2000);
    }
}

function minimizeTerminal() {
    const terminal = document.querySelector('.terminal-window');
    terminal.style.transform = 'scale(0.1)';
    terminal.style.opacity = '0.5';
    
    setTimeout(() => {
        terminal.style.transform = 'scale(1)';
        terminal.style.opacity = '1';
    }, 1000);
}

function maximizeTerminal() {
    const terminal = document.querySelector('.terminal-window');
    terminal.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        terminal.style.transform = 'scale(1)';
    }, 300);
}

function showDetails(section) {
    alert('🔍 ACCESSING CLASSIFIED DATA...\n\n' + 
          '📊 PROFILE ANALYSIS COMPLETE\n' + 
          '🔐 SECURITY LEVEL: MAXIMUM\n' + 
          '⚡ STATUS: ACTIVE HACKER');
}

function copyEmail(event) {
    event.preventDefault();
    navigator.clipboard.writeText('Gaer12TH@gmail.com');
    
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <button class="popup-close" onclick="this.parentElement.remove()">×</button>
        <h3 style="color: #00ff41;">EMAIL COPIED!</h3>
        <p style="color: #ff6b35;">Gaer12TH@gmail.com</p>
        <p style="color: #00ff41; font-size: 12px;">Ready to send secure transmission...</p>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

function showSystemInfo() {
    const uptime = Math.floor(Math.random() * 9999) + 1000;
    const cpu = Math.floor(Math.random() * 30) + 5;
    const memory = Math.floor(Math.random() * 40) + 20;
    
    alert(`🖥️ SYSTEM STATUS REPORT\n\n` +
          `⏱️ UPTIME: ${uptime} hours\n` +
          `💾 CPU USAGE: ${cpu}%\n` +
          `🧠 MEMORY: ${memory}%\n` +
          `🌐 NETWORK: SECURE\n` +
          `🔒 FIREWALL: ACTIVE\n` +
          `⚡ POWER: UNLIMITED`);
}

function playSound() {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Update uptime every second
setInterval(() => {
    const now = new Date();
    const uptime = document.getElementById('uptime');
    uptime.textContent = `SYSTEM_ONLINE: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        runCommand('hack');
    }
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        runCommand('clear');
    }
});