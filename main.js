// Step A: Remove corresponding health circle IDs based on the current HP
const healthCircles = document.querySelectorAll('.health-stats .circle');

let circlesToRemove = 14 - HP; // Calculate how many circles should be removed based on HP

healthCircles.forEach((circle, index) => {
    let circleId = `health${index + 1}`;

    // Remove the corresponding health circle ID if HP is less than 14
    if (index >= circlesToRemove) {
        circle.removeAttribute('id'); // Remove the ID for the corresponding circle
    }
});

// Step B: Set stats dynamically
const statElements = document.querySelectorAll('.stats-card .stat');
statElements.forEach(stat => {
    let statName = stat.classList[1]; // get the class name (e.g., 'endurance')
    const statValue = stats[statName]; // get the value from stats object

    // Adjust stat name display (change 'first_aid' to 'First Aid')
    if (statName === 'first_aid') {
        statName = 'First Aid'; // change 'firstAid' to 'First Aid'
    } else {
        // Capitalize first letter of other stat names
        statName = statName.charAt(0).toUpperCase() + statName.slice(1);
    }

    stat.textContent = `${statName} ${statValue}`;
});
