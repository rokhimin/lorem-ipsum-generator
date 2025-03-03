
$(document).ready(function() {
    $('#generate-btn').on('click', function(e) {
        e.preventDefault();
        
        // Show loading
        $('#loading').show();
        
        const number = $('#number').val();
        const type = $('#type').val();
        const length = $('#length').val();
        
        const apiUrl = `https://api.allorigins.win/raw?url=http://loripsum.net/api/${number}/${type}/${length}`;
        
        $.ajax({
            type: 'GET',
            url: apiUrl,
            success: function(data) {
                // Hide loading
                $('#loading').hide();
                
                // Add content class for styling
                $('#loripsum-result').addClass('has-content');
                
                // Update content
                $('#loripsum-result').html(data);
                
                // Enable copy button
                $('#copy-btn').prop('disabled', false);
            },
            error: function(xhr, status, error) {
                // Hide loading
                $('#loading').hide();
                
                // Show error message
                $('#loripsum-result').html(`
                    <div class="notification is-danger">
                        <i class="fas fa-exclamation-triangle mr-2"></i> 
                        Error: Could not generate text. Please try again.
                    </div>
                `);
                
                console.log(`Error: ${error}`);
            }
        });
    });
    
    // Copy to clipboard functionality
    $('#copy-btn').on('click', function(e) {
        e.preventDefault();
        
        // Create a temporary textarea
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = $('#loripsum-result').text();
        document.body.appendChild(tempTextArea);
        
        // Select and copy
        tempTextArea.select();
        document.execCommand('copy');
        
        // Remove the textarea
        document.body.removeChild(tempTextArea);
        
        // Change button text temporarily
        const originalText = $(this).html();
        $(this).html('<span class="icon"><i class="fas fa-check"></i></span><span>Copied!</span>');
        
        // Reset button text after 2 seconds
        setTimeout(() => {
            $(this).html(originalText);
        }, 2000);
    });
});