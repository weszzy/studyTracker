// Check if there are any study entries in the cache on page load
window.addEventListener('DOMContentLoaded', loadStudyEntries);

function addStudy() {
    const hoursInput = document.getElementById('hours');
    const subjectInput = document.getElementById('subject');
    const notesInput = document.getElementById('notes');

    const hours = hoursInput.value;
    const subject = subjectInput.value;
    const notes = notesInput.value;

    if (hours && subject && notes) {
        const studyItem = document.createElement('li');
        studyItem.innerHTML = `
      <strong>Studied ${hours} hours</strong> - ${subject}<br>
      <strong>Notes:</strong><br>
      <span class="long-notes">${breakLongNotes(notes)}</span>
      <button class="delete-btn" onclick="removeStudy(this)">x</button>
      <div class="study-info">${getCurrentTime()}</div>
    `;

        const studyList = document.getElementById('studyList');
        studyList.appendChild(studyItem);

        // Save the study entry to cache
        saveStudyEntry({ hours, subject, notes });

        // Clear the input fields
        studyHoursInput.value = '';
        studySubjectInput.value = '';
        studyNotesInput.value = '';

        // Reload the study entries from cache
        loadStudyEntries();
    }
}

function removeStudy(element) {
    const studyItem = element.parentNode;
    studyItem.parentNode.removeChild(studyItem);

    // Remove the study entry from cache
    const studyEntryIndex = Array.from(studyItem.parentNode.children).indexOf(studyItem);
    removeStudyEntryFromCache(studyEntryIndex);

    // Reload the study entries from cache
    loadStudyEntries();
}

function removeStudyEntryFromCache(index) {
    let studyEntries = [];

    // Get the existing study entries from the cache
    const cachedEntries = localStorage.getItem('studyEntries');
    if (cachedEntries) {
        studyEntries = JSON.parse(cachedEntries);
    }

    // Remove the study entry at the specified index
    studyEntries.splice(index, 1);

    // Save the updated study entries to the cache
    localStorage.setItem('studyEntries', JSON.stringify(studyEntries));
}

function loadStudyEntries() {
    const studyList = document.getElementById('studyList');
    studyList.innerHTML = '';

    // Get the study entries from the cache
    const cachedEntries = localStorage.getItem('studyEntries');
    if (cachedEntries) {
        const studyEntries = JSON.parse(cachedEntries);

        // Iterate through the study entries and display them
        studyEntries.forEach((entry, index) => {
            if (entry) { // Check if the study entry is valid
                const studyItem = document.createElement('li');
                studyItem.innerHTML = `
            <strong>Studied ${entry.hours} hours</strong> - ${entry.subject}<br>
            <strong>Notes:</strong><br>
            <span class="long-notes">${breakLongNotes(entry.notes)}</span>
            <button class="delete-btn" onclick="removeStudy(this)">x</button>
            <div class="study-info">${getCurrentTime()}</div>
          `;
                studyList.appendChild(studyItem);

                // Add a unique identifier to the study item
                studyItem.setAttribute('data-entry-index', index);
            }
        });
    }
}

function getCurrentTime() {
    const now = new Date();
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    const dayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDay = now.toLocaleDateString('en-US', dayOptions);
    return `${formattedTime} | ${formattedDay}`;
}

function breakLongNotes(notes) {
    if (notes.length > 30) {
        return notes.slice(0, 30) + '<br>' + notes.slice(30);
    }
    return notes;
}

function saveStudyEntry(studyEntry) {
    let studyEntries = [];

    // Get the existing study entries from the cache
    const cachedEntries = localStorage.getItem('studyEntries');
    if (cachedEntries) {
        studyEntries = JSON.parse(cachedEntries);
    }

    // Add the new study entry to the array
    studyEntries.push(studyEntry);

    // Save the updated study entries to the cache
    localStorage.setItem('studyEntries', JSON.stringify(studyEntries));
}

function loadStudyEntries() {
    const studyList = document.getElementById('studyList');
    studyList.innerHTML = '';

    // Get the study entries from the cache
    const cachedEntries = localStorage.getItem('studyEntries');
    if (cachedEntries) {
        const studyEntries = JSON.parse(cachedEntries);

        // Iterate through the study entries and display them
        studyEntries.forEach(entry => {
            const studyItem = document.createElement('li');
            studyItem.innerHTML = `
        <strong>Studied ${entry.hours} hours</strong> - ${entry.subject}<br>
        <strong>Notes:</strong><br>
        <span class="long-notes">${breakLongNotes(entry.notes)}</span>
        <button class="delete-btn" onclick="removeStudy(this)">x</button>
        <div class="study-info">${getCurrentTime()}</div>
      `;
            studyList.appendChild(studyItem);
        });
    }
}
