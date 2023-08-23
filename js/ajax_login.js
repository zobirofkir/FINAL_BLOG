$(document).ready(function() {
    $("#registerButton").click(function() {
        var email = $("#email").val();
        var password = $("#password").val();
        
        // Retrieve the CSRF token from a <meta> tag or another secure source
        var csrfToken = $("meta[name='csrf-token']").attr("content");

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/models/login.php",
            data: {
                login: true,
                email: email,
                password: password,
                csrf_token: csrfToken // Include the CSRF token in the request data
            },
            success: function(response) {
                if (response === "ok") {
                    window.location.href = "blog.html";
                } else {
                    alert("Login failed");
                }
            },
            error: function(xhr, status, error) {
                console.log("Error:", error);
            }
        });
    });
});
