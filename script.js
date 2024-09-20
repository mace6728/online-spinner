document.getElementById('spinButton').addEventListener('click', function() {
    const minRange = parseInt(document.getElementById('minRange').value);
    const maxRange = parseInt(document.getElementById('maxRange').value);

    // Validate max range to be 1-10
    if (isNaN(minRange) || isNaN(maxRange) || minRange < 1 || maxRange > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    // Generate wheel sectors dynamically based on maxRange
    const wheel = document.getElementById('wheel');
    wheel.innerHTML = ''; // Clear previous sectors

    const anglePerSector = 360 / maxRange;
    for (let i = 0; i < maxRange; i++) {
        const sector = document.createElement('div');
        sector.className = 'sector';
        const colors = ['#fdbbd5', '#bbeefd']; // Add more as needed
        sector.style.backgroundColor = colors[i % colors.length]; // Cycle through colors
        sector.style.transform = `rotate(${i * anglePerSector}deg)`;
        
        const text = document.createElement('div');
        text.className = 'sector-text';
        text.style.transform = `rotate(${i * anglePerSector}deg)`;
        text.innerText = i + 1; // Number in each sector
        sector.appendChild(text);

        wheel.appendChild(sector);
    }

    // Spin the wheel
    spinWheel(maxRange);
});

// Random color generator for sectors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to spin the wheel
function spinWheel(maxRange) {
    const wheel = document.getElementById('wheel');
    const randomDegree = Math.floor(Math.random() * 360) + 360; // Ensuring multiple spins
    const sectorAngle = 360 / maxRange;

    // Spin the wheel and slow down
    wheel.style.transition = 'transform 2s ease-out';
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Calculate which sector it lands on
    setTimeout(() => {
        const finalDegree = randomDegree % 360;
        const sectorIndex = Math.floor((360 - finalDegree) / sectorAngle) % maxRange;
        const result = sectorIndex+1;
        document.getElementById('result').innerText = `The wheel landed on: ${result}`;
    }, 2000); // 5s matches the duration of the spin
}
