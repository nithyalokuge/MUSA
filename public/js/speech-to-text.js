// Speech-to-text script

let recognition;
let isListening = false;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const output = document.getElementById('output');
const iosHelper = document.getElementById('ios-helper');

// Detect iOS
const isIOS = /iPad|iPhone/.test(navigator.userAgent);

// Toast notifications
const notyf = new Notyf({
  types: [
    {
      type: 'success',
      background: '#198754',
      icon: false
    },
    {
      type: 'error',
      background: '#61941D',
      icon: false
    }
  ]
});

function updateCopyButtonState() {
  copyBtn.disabled = output.textContent.trim().length === 0;
}

// iOS Devices 
if (isIOS) {
  output.setAttribute('contenteditable', 'true');
  output.textContent = ''; 

  if (iosHelper) iosHelper.classList.remove('d-none');

  // Hide listening and pausing buttons as they don't work on iOS
  startBtn.style.display = 'none';
  stopBtn.style.display = 'none';

  output.addEventListener('input', updateCopyButtonState);

  clearBtn.onclick = () => {
    output.textContent = '';
    updateCopyButtonState();
  };

  copyBtn.onclick = async () => {
    if (output.textContent.trim().length === 0) return;
    try {
      await navigator.clipboard.writeText(output.textContent);
      notyf.success('Copied to clipboard!');
    } catch {
      notyf.error('Could not copy text. Sorry!');
    }
  };
} else if ('webkitSpeechRecognition' in window) {
  // Non iOS devices (allow Web Speech API)
  output.setAttribute('contenteditable', 'false');

  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let finalTranscript = '';

  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }
    output.textContent = finalTranscript + interimTranscript;
    updateCopyButtonState();
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error: ', event.error);
    switch (event.error) {
      case 'no-speech':
        notyf.error('No speech detected.');
        break;
      case 'audio-capture':
        notyf.error('No microphone found or access is blocked.');
        break;
      case 'not-allowed':
        notyf.error('Microphone access denied. Please allow permission.');
        break;
      case 'aborted':
        notyf.error('Speech input was interrupted.');
        break;
      case 'network':
        notyf.error('Network error. Please check your connection.');
        break;
      case 'service-not-allowed':
        notyf.error('Speech service is blocked by browser settings.');
        break;
      default:
        notyf.error('Speech recognition error occurred.');
    }
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start(); // Auto-restart
    }
  };

  startBtn.onclick = () => {
    if (isListening) return;
    isListening = true;
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    output.textContent = 'Listening...';
    startBtn.classList.add('glow');
  };

  stopBtn.onclick = () => {
    isListening = false;
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    startBtn.classList.remove('glow');
  };

  clearBtn.onclick = () => {
    finalTranscript = '';
    output.textContent = '';
    updateCopyButtonState();
  };

  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(output.textContent);
      notyf.success('Copied to clipboard!');
    } catch (err) {
      notyf.error('Could not copy text. Sorry!');
    }
  };
} else {
  notyf.error('Speech recognition is not supported in this browser. Try Chrome, Edge or Opera.');
  startBtn.disabled = true;
  stopBtn.disabled = true;
  clearBtn.disabled = true;
  copyBtn.disabled = true;
}
