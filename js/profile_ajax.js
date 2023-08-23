$(document).ready(function() {
    $("#submitBtn").click(function() {
        let name = $("#name").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let avatar = $("#avatar")[0].files[0];

        let formData = new FormData();
        formData.append("submit", true);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", avatar);

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/models/img-post.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log("Response:", response);
                if (response === "Data posted successfully") {
                    alert("Data posted successfully");
                } else {
                    alert(response); // Display the response message
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
                alert("AJAX error: " + error);
            }
        });
    });
});

