async function analyzeText(inText) {
    const textData = { text: inText};
    const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(textData)
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();
    console.log(data);
}

analyzeText("COCK");