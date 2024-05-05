// Function to send data to the Flask server and log the response
function sendData(text) {
    fetch('http://localhost:5000/analyze', {  // Update this URL to your Flask server URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => {
        if (response.ok) {
            return response.json();  // or response.text() if the server sends back plain text
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('Success:', data);
        for (const [key, value] of Object.entries(data)) {
            //key is the category and value is the percentage
            console.log(`${key}: ${value}`);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Example usage
sendData('Sample text to analyze.');