$(document).ready(function(){
    $("#send_comment").click(function(e){
        e.preventDefault(); // Prevent the default form submission
        
        var comment = $("#comment").val();
        var name = $("#name").val();
        var email = $("#email").val();
        var website = $("#website").val();
         
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/models/post-comment.php",
            data: {
                send_comment: true,
                comment: comment,
                name: name,
                email: email,
                website: website,
            },
            dataType: "json", // Expect JSON response
            success: function(response){
                console.log(response);
                if (response.status === "success") {
                    // Comment was successfully submitted
                    window.location.href = " ";
                } else {
                    // There was an error submitting the comment
                    alert("There was an error submitting your comment.");
                }
            },
            error: function(xhr, status, error) {
                console.error(error); // Log the error for debugging
                console.log("An error occurred while submitting your comment.");
            }
        });
    });
});