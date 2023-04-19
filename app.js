// Select DOM elements
const entriesList = document.getElementById('entries-list');
const newEntryBtn = document.getElementById('new-entry-btn');
const newEntryModal = document.getElementById('new-entry-modal');
const closeBtn = document.getElementsByClassName('close')[0];
const newEntryForm = document.getElementById('new-entry-form');

// Define an empty array to store entries
let entries = [];

// Check if there are any existing entries in local storage
if (localStorage.getItem('entries')) {
  entries = JSON.parse(localStorage.getItem('entries'));
  displayEntries();
}

// Function to display entries in the UI
function displayEntries() {
  entriesList.innerHTML = '';
  entries.forEach((entry, index) => {
    const entryCard = document.createElement('div');
    entryCard.classList.add('entry-card');
    entryCard.innerHTML = `
      <h2>${entry.title}</h2>
      <p>${entry.body}</p>
      <button onclick="deleteEntry(${index})">Delete</button>
    `;
    entriesList.appendChild(entryCard);
  });
}

// Function to add a new entry
function addEntry(title, body) {
  const entry = {
    title,
    body
  };
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries();
}

// Function to delete an entry
function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries();
}

// Show the new entry modal when the new entry button is clicked
newEntryBtn.onclick = function() {
  newEntryModal.style.display = 'block';
}

// Close the new entry modal when the close button is clicked
closeBtn.onclick = function() {
  newEntryModal.style.display = 'none';
}

// Add a new entry when the new entry form is submitted
newEntryForm.onsubmit = function(event) {
  event.preventDefault();
  const title = document.getElementById('entry-title').value;
  const body = document.getElementById('entry-body').value;
  addEntry(title, body);
  newEntryModal.style.display = 'none';
  newEntryForm.reset();
}
