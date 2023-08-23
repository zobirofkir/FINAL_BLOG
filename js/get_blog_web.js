$(document).ready(function() {
    // Fetch and display blog post data using AJAX
    $.ajax({
        url: 'http://localhost:3000/models/get_blog_web.php', // Update to the correct URL
        type: 'GET',
        dataType: 'html', // Expecting HTML response
        success: function(data) {
            $('#blogPostsContainer').html(data); // Insert fetched HTML into container
        },
        error: function(xhr, status, error) {
            console.log('AJAX Error: ' + error);
        }
    });
});
