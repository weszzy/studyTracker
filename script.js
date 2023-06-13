// Detect user's browser preference and set initial theme
function setThemeBasedOnBrowser() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersDarkScheme) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.add("light-mode");
    }
}

const browserLanguage = navigator.language;

// Set the document language to the browser language
document.documentElement.lang = browserLanguage;

// Toggle between light and dark mode
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");
}

// Call the function to set initial theme based on browser preference
setThemeBasedOnBrowser();

function addStudy() {
    const hoursInput = document.getElementById('hours');
    const subjectInput = document.getElementById('subject');
    const notesInput = document.getElementById('notes');

    const hours = hoursInput.value;
    const subject = subjectInput.value;
    const notes = notesInput.value;

    if (hours && subject && notes) {
        const studyItem = createStudyItem(hours, subject, notes);
        const studyList = document.getElementById('studyList');
        studyList.appendChild(studyItem);

        saveStudyEntry({ hours, subject, notes, timestamp: new Date().getTime() }); // Add timestamp to the study entry
        clearInputFields();
    }
}

function createStudyItem(hours, subject, notes) {
    const studyItem = document.createElement('li');
    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    studyItem.innerHTML = `
        <strong>Studied for ${hours} hours</strong> - ${subject}<br>
        <strong>Notes:</strong><br>
        <span class="long-notes">${breakLongNotes(notes)}</span>
        <button class="delete-btn" onclick="removeStudy(this)">x</button>
        <div class="study-info">${timestamp}</div>
    `;

    return studyItem;
}

function getCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    const formattedDay = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return `${formattedTime} | ${formattedDay}`;
}

function breakLongNotes(notes) {
    if (notes.length > 30) {
        const truncatedNotes = notes.slice(0, 30);
        const remainingNotes = notes.slice(30);
        return truncatedNotes + "<br>" + breakLongNotes(remainingNotes);
    }
    return notes;
}

function saveStudyEntry(studyEntry) {
    let studyEntries = [];

    // Get the existing study entries from local storage
    const cachedEntries = localStorage.getItem('studyEntries');
    if (cachedEntries) {
        studyEntries = JSON.parse(cachedEntries);
    }

    // Add the new study entry to the array
    studyEntries.push(studyEntry);

    // Save the updated study entries to local storage
    localStorage.setItem('studyEntries', JSON.stringify(studyEntries));
}

function loadStudyEntries() {
    const studyList = document.getElementById('studyList');
    studyList.innerHTML = '';

    const cachedEntries = localStorage.getItem('studyEntries');
    if (cachedEntries) {
        const studyEntries = JSON.parse(cachedEntries);

        studyEntries.forEach(entry => {
            const studyItem = createStudyItem(entry.hours, entry.subject, entry.notes);
            studyList.appendChild(studyItem);
        });
    }
}

function removeStudy(button) {
    const studyItem = button.parentNode;
    const studyList = studyItem.parentNode;
    studyList.removeChild(studyItem);

    // Remove the study entry from cache
    const studyEntries = getStudyEntriesFromCache();
    const index = Array.from(studyList.children).indexOf(studyItem);
    studyEntries.splice(index, 1);
    saveStudyEntriesToCache(studyEntries);
}

function getStudyEntriesFromCache() {
    const cachedEntries = localStorage.getItem('studyEntries');
    return cachedEntries ? JSON.parse(cachedEntries) : [];
}

function saveStudyEntriesToCache(studyEntries) {
    localStorage.setItem('studyEntries', JSON.stringify(studyEntries));
}

// Load study entries when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    loadStudyEntries();
    clearStudyEntriesFromCache(); // Remove any stale cached entries
});

function clearStudyEntriesFromCache() {
    localStorage.removeItem('studyEntries');
}
