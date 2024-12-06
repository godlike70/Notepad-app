const noteArea = document.getElementById('noteArea');
const codeDisplay = document.getElementById('codeDisplay');
const modeSelector = document.getElementById('modeSelector');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

// Switch between modes
modeSelector.addEventListener('change', () => {
    if (modeSelector.value === 'code') {
        codeDisplay.style.display = 'block';
        noteArea.style.display = 'none';
        updateCodeDisplay();
    } else {
        codeDisplay.style.display = 'none';
        noteArea.style.display = 'block';
    }
});

// Update the code display with highlighted syntax
function updateCodeDisplay() {
    const code = noteArea.value;
    codeDisplay.querySelector('code').textContent = code;
    Prism.highlightElement(codeDisplay.querySelector('code'));
}

// Save note to local storage
saveBtn.addEventListener('click', () => {
    const note = noteArea.value;
    if (note.trim()) {
        localStorage.setItem('savedNote', note);
        showAlert('Note saved successfully!', 'success');
    } else {
        showAlert('Cannot save an empty note.', 'error');
    }
});

// Load saved note on page load
window.addEventListener('load', () => {
    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
        noteArea.value = savedNote;
        updateCodeDisplay();
        showAlert('Saved note loaded!', 'info');
    }
});

// Clear note
clearBtn.addEventListener('click', () => {
    noteArea.value = '';
    codeDisplay.querySelector('code').textContent = '';
    localStorage.removeItem('savedNote');
    showAlert('Note cleared!', 'success');
});

// Function to show alerts
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}