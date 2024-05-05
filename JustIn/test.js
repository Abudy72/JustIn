async function sendData(text) {
    try {
        const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        
        const data = await response.json();  // Assuming the server returns JSON
        console.log('Success:', data);
        return data;  // This can now be used when calling sendData
    } catch (error) {
        console.error('Error:', error);
        throw error;  // Rethrow to allow caller to handle it
    }
}

// Example usage
(async () => {
    try {
        const data = await sendData("your text here");
        for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value}`);
        }
    } catch (error) {
        console.error('Failed to process data:', error);
    }
})();
