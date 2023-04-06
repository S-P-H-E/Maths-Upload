import { addGradeDocument } from './firebase.js'; // Import the addGradeDocument function from firebase.js

// Get the form element from the DOM
const form = document.getElementById('myForm');

// Add a submit event listener to the form
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission
  // Get the form data
  const grade = document.getElementById('grade').value;
  const filename = document.getElementById('filename').value;
  const term = document.getElementById('term').value;
  const topic = document.getElementById('topic').value;
  
  // Call the addGradeDocument function to add the form data to Firestore
  await addGradeDocument(grade, filename, term, topic);
  
  // Reset the form after successful submission
  form.reset();
});
