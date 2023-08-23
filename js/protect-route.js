$(document).ready(function() {
    // Check user's session status before accessing the route
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/models/sessionCheck.php",
        dataType: "json", // Specify that the response should be treated as JSON
        success: function(response) {
            var fullnameCookie = getCookie("user_cookie");
            
            if (response.authenticated || fullnameCookie) {
                // User is authenticated via session or cookie, allow access to the route
                var csrfToken = ""; // Set the CSRF token received from the server

                $("#registerButton").click(function() {
                    var email = $("#email").val();
                    var password = $("#password").val();

                    // Make sure to include the CSRF token in your AJAX request data
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/models/protected_register.php", // Update to your protected registration endpoint
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
                                alert("Registration failed");
                            }
                        },
                        error: function(xhr, status, error) {
                            console.log("Error:", error);
                        }
                    });
                });
            } else {
                // User is not authenticated, prevent access
                alert("You are not logged in. Please log in to access this route.");
                window.location.href = "register.html"; // Redirect the user to the login page
            }
        },
        error: function(xhr, status, error) {
            console.log("Error:", error);
        }
    });

    // Function to retrieve a specific cookie by name
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // Function to set a never-expiring cookie
    function setCookie(name, value) {
        document.cookie = name + "=" + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }

    // Example usage to set a never-expiring cookie (commented out)
    // setCookie("user_cookie", "user_cookie");
});
