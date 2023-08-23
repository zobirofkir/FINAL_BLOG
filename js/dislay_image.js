function fetchImage(email) {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/models/get-image.php", // Replace with actual URL
        data: { email: email },
        success: function(response) {
            // Assuming the response is the image URL
            $("#displayImage").attr("src", response);
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}