document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');
    
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(reportForm);
            
            // Validate form data
            if (!validateForm(formData)) {
                return;
            }
            
            // Show loading state
            const submitButton = reportForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;
            
            // Submit form data
            fetch('php/submit_report.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    showAlert('success', 'Emergency report submitted successfully!');
                    reportForm.reset();
                } else {
                    showAlert('error', 'Error submitting report. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('error', 'An error occurred. Please try again.');
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Form validation
    function validateForm(formData) {
        const requiredFields = ['emergencyType', 'location', 'description', 'severity', 'contact'];
        
        for (const field of requiredFields) {
            if (!formData.get(field)) {
                showAlert('error', `Please fill in the ${field} field`);
                return false;
            }
        }
        
        return true;
    }
    
    // Show alert message
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        
        alertDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    // Add real-time location detection
    const locationInput = document.getElementById('location');
    if (locationInput) {
        locationInput.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        
                        // Use reverse geocoding to get address
                        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.display_name) {
                                    locationInput.value = data.display_name;
                                }
                            })
                            .catch(error => {
                                console.error('Error getting address:', error);
                            });
                    },
                    function(error) {
                        console.error('Error getting location:', error);
                    }
                );
            }
        });
    }
}); 