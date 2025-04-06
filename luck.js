// luck.js

// Example data with episode numbers, roll result, and fail status
const rollsData = [
    { episode: 1, time: '1/14/25', roll: 14, fail: true },
    { episode: 1, time: '1/14/25', roll: 8, fail: true },
    { episode: 1, time: '1/14/25', roll: 23, fail: false },
    { episode: 2, time: '3/5/25', roll: 17, fail: false },
    { episode: 2, time: '3/6/25', roll: 8, fail: true },
    { episode: 2, time: '3/6/25', roll: 13, fail: false },
    { episode: 2, time: '3/6/25', roll: 19, fail: false },
    { episode: 2, time: '3/7/25', roll: 3, fail: true },
    { episode: 2, time: '3/8/25', roll: 13, fail: false },
    { episode: 2, time: '3/9/25', roll: 17, fail: false },
    { episode: 2, time: '3/10/25', roll: 14, fail: false },
    { episode: 2, time: '3/11/25', roll: 14, fail: true },
    { episode: 2, time: '3/19/25', roll: 9, fail: true },
    { episode: 2, time: '3/19/25', roll: 20, fail: false },
    { episode: 2, time: '3/20/25', roll: 14, fail: false },
    { episode: 2, time: '3/20/25', roll: 13, fail: false },
    { episode: 2, time: '3/20/25', roll: 8, fail: true },
    { episode: 3, time: '3/21/25', roll: 21, fail: false },
    { episode: 3, time: '3/21/25', roll: 6, fail: true },
    { episode: 3, time: '3/22/25', roll: 21, fail: false },
    { episode: 3, time: '3/23/25', roll: 18, fail: false },
    { episode: 3, time: '4/1/25', roll: 19, fail: false },
    { episode: 3, time: '4/3/25', roll: 15, fail: false }
];

// Function to calculate Success Rate for a particular episode
function calculateSuccessRateForEpisode(episodeNumber) {
    // Filter the data to get the rolls for a specific episode
    const episodeRolls = rollsData.filter(roll => roll.episode === episodeNumber);

    // If no rolls found for the episode, return 0% as the success rate
    if (episodeRolls.length === 0) return '0.00';

    // Calculate the number of successful rolls and failed rolls
    const successfulRolls = episodeRolls.filter(roll => !roll.fail).length;
    const totalRolls = episodeRolls.length;
    
    // Calculate the success rate as a percentage
    const successRate = (successfulRolls / totalRolls) * 100;
    
    return successRate.toFixed(2);
}

// Function to display the success rate for each episode
function displayLuckData() {
    // Loop through the episodes
    const episodeNumbers = [1, 2, 3]; // Update with any episode numbers you want to include

    episodeNumbers.forEach(episodeNumber => {
        // Calculate success rate for the current episode
        const successRate = calculateSuccessRateForEpisode(episodeNumber);

        // Get the element with the corresponding episode ID (episode-1, episode-2, etc.)
        const successRateElement = document.querySelector(`#episode-${episodeNumber}`);

        // Update the content with the calculated success rate
        if (successRateElement) {
            successRateElement.textContent = `Success Rate: ${successRate}%`;
        }
    });
}

// Initialize and display the data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    displayLuckData();
});
