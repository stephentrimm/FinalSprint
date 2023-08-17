// Function to update the HTML with results
function updateResults(resultText) {
    const resultsDiv = document.getElementById('results');
    const resultParagraph = document.createElement('p');
    resultParagraph.textContent = resultText;
    resultsDiv.appendChild(resultParagraph);
  }
  
  // Function to fetch and parse JSON data
  function fetchData() {
    fetch('greys.json') // 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response as JSON
      })
      .then(data => {
        console.log('JSON data:', data); // Display data in console
  
        // Call functions to generate data descriptions here
        const summary = generateSummary(data);
        const specialties = listSpecialties(data);
        const averageExperience = calculateAverageExperience(data);
  
        // Display the generated data descriptions on the HTML page
        updateResults(summary);
        updateResults(specialties);
        updateResults(averageExperience);
      })
      .catch(error => {
        console.error('Fetch error:', error); // Log any fetch errors
      });
  }
  
  // Function to generate a summary of the JSON data
  function generateSummary(data) {
    const totalSurgeons = data.length;
    let aliveSurgeons = 0;
    let deceasedSurgeons = 0;
  
    data.forEach(record => {
      if (record.isAlive) {
        aliveSurgeons++;
      } else {
        deceasedSurgeons++;
      }
    });
  
    return `Summary:
    Total Surgeons: ${totalSurgeons}
    Alive Surgeons: ${aliveSurgeons}
    Deceased Surgeons: ${deceasedSurgeons}`;
  }
  
  // Function to list the specialties of the surgeons
  function listSpecialties(data) {
    const specialties = data.map(record => record.specialty);
    return `Specialties: ${specialties.join(', ')}`;
  }
  
  // Function to calculate the average experience years of the surgeons
  function calculateAverageExperience(data) {
    const totalExperience = data.reduce((sum, record) => sum + record.experienceYears, 0);
    const averageExperience = totalExperience / data.length;
    return `Average Experience Years: ${averageExperience.toFixed(2)}`;
  }
  
  // Call the fetchData function to initiate the fetch process
  fetchData();
  