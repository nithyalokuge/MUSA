// Speech-to-text script

let recognition;
let isListening = false;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const output = document.getElementById('output');
const iosHelper = document.getElementById('ios-helper');
const modal = document.getElementById('modal');
const modalText = modal.querySelector('p'); 
const modalIcon = modal.querySelector('.modal-icon');

// Detect iOS
const isIOS = /iPad|iPhone/.test(navigator.userAgent);

function updateCopyButtonState() {
  const hasText = output.textContent.trim().length > 0;
  copyBtn.disabled = !hasText;
  clearBtn.disabled = !hasText;
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
      showModal('Copied to clipboard!', 'bi-emoji-wink-fill');
    } catch {
      showModal('Could not copy text. Sorry!', 'bi-emoji-tear-fill');
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
        showModal('No speech detected.', 'bi-emoji-tear-fill');
        break;
      case 'audio-capture':
        showModal('No microphone found or access is blocked.', 'bi-emoji-tear-fill');
        break;
      case 'not-allowed':
        showModal('Microphone access denied. Please allow permission.', 'bi-emoji-tear-fill');
        break;
      case 'aborted':
        showModal('Speech input was interrupted.', 'bi-emoji-tear-fill');
        break;
      case 'network':
        showModal('Network error. Please check your connection.', 'bi-emoji-tear-fill');
        break;
      case 'service-not-allowed':
        showModal('Speech service is blocked by browser settings.', 'bi-emoji-tear-fill');
        break;
      default:
        showModal('Speech recognition error occurred.', 'bi-emoji-tear-fill');
    }
  };

  recognition.onend = () => {
    if (isListening) {
      recognition.start(); // Auto-restart
    } else {
      if (output.textContent === 'Listening...') {
        output.textContent = '';
      }
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
    if (output.textContent === 'Listening...') {
      output.textContent = '';  
    }
  };

  clearBtn.onclick = () => {
    finalTranscript = '';
    output.textContent = '';
    updateCopyButtonState();
  };

  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(output.textContent);
      showModal('Copied to clipboard!', 'bi-emoji-wink-fill');
    } catch (err) {
      showModal('Could not copy text. Sorry!', 'bi-emoji-tear-fill');
    }
  };
} else {
  showModal('Speech recognition is not supported in this browser. Try Chrome, Edge or Opera.', 'bi-emoji-tear-fill');
  startBtn.disabled = true;
  stopBtn.disabled = true;
  clearBtn.disabled = true;
  copyBtn.disabled = true;
}

function showModal(message, iconClass) {
  modalText.textContent = message;
  modalIcon.className = `modal-icon ${iconClass}`;
  modal.classList.add('active');

  setTimeout(() => {
    modal.classList.remove('active');
  }, 2000); 
}