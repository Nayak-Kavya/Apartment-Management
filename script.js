
document.getElementById('logForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form fields
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const loginTime = document.getElementById('loginTime').value;
    const logoutTime = document.getElementById('logoutTime').value;
    const doorNumber = document.getElementById('doorNumber').value;
    const flatName = document.getElementById('flatName').value;

    // Prepare the data for submission
    const logData = {
        name,
        address,
        loginTime,
        logoutTime,
        doorNumber,
        flatName,
    };

    // Send the data to the backend
    console.log('sending data:', logData);
    fetch('/submit-log', {  // Ensure this matches the backend route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  // Show success message
        displayLogInfo(logData);  // Display the logged information
    })
    .catch(error => {
        alert('Error submitting log');
        console.error(error);
    });

    // Optionally reset the form fields
    resetForm();
});

// Function to display the logged information
function displayLogInfo(logData) {
    document.getElementById('displayName').textContent = logData.name;
    document.getElementById('displayAddress').textContent = logData.address;
    document.getElementById('displayLoginTime').textContent = logData.loginTime;
    document.getElementById('displayLogoutTime').textContent = logData.logoutTime;
    document.getElementById('displayDoorNumber').textContent = logData.doorNumber;
    document.getElementById('displayFlatName').textContent = logData.flatName;

    // Show the logged information
    document.getElementById('logDisplay').style.display = 'block';
}

// Reset the form fields and displayed information
document.getElementById('resetButton').addEventListener('click', function() {
    resetForm();
});

function resetForm() {
    // Reset the form fields
    document.getElementById('logForm').reset();
    
    // Clear the displayed information
    document.getElementById('logDisplay').style.display = 'none';
    document.getElementById('displayName').textContent = '';
    document.getElementById('displayAddress').textContent = '';
    document.getElementById('displayLoginTime').textContent = '';
    document.getElementById('displayLogoutTime').textContent = '';
    document.getElementById('displayDoorNumber').textContent = '';
    document.getElementById('displayFlatName').textContent = '';
}

