function addStudy() {
    const hoursInput = document.getElementById('hours');
    const subjectInput = document.getElementById('subject');
    const notesInput = document.getElementById('notes');

    const hours = hoursInput.value;
    const subject = subjectInput.value;
    const notes = notesInput.value;

    if (hours && subject && notes) {
        const studyItem = document.createElement('li');
        studyItem.innerHTML = `<strong>${hours} hours</strong> - ${subject}<br>${notes}`;

        const studyList = document.getElementById('studyList');
        studyList.appendChild(studyItem);

        hoursInput.value = '';
        subjectInput.value = '';
        notesInput.value = '';
    }
}
