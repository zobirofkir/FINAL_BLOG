$(document).ready(function() {
    // Function to get the user's full name from the cookie
    function getFullnameCookie() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf("user_cookie=") === 0) {
                return cookie.substring("user_cookie=".length, cookie.length);
            }
        } 
        return null;
    }

    // Function to set a never-expiring cookie
    function setCookie(name, value) {
        var userCookieExpiry = new Date();
        userCookieExpiry.setTime(userCookieExpiry.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
        var expires = "expires=" + userCookieExpiry.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + "; path=/; SameSite=Strict";
    }

    // Retrieve and set the fullname from the cookie
    var fullnameCookie = getFullnameCookie();
    if (fullnameCookie) {
        $("#userName").text(fullnameCookie);
    } else {
        $("#userName").text(", world");
    }

    $("#registerButton").click(function() {
        var submitButton = $("#registerButton");
        submitButton.prop("disabled", true);
        submitButton.html("Wait ...");

        var fullname = $("#fullname").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var confirm_password = $("#confirm_password").val();
        var date = $("#birthdate").val();
        
        // Retrieve the CSRF token from a <meta> tag or another secure source
        var csrfToken = $("meta[name='csrf-token']").attr("content");

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/models/register.php",
            data: {
                submit: true,
                fullname: fullname,
                email: email,
                password: password,
                confirm_password: confirm_password,
                date: date,
                csrf_token: csrfToken // Include the CSRF token in the request data
            },
            success: function(response) {
                console.log(response);

                if (response === "This user has been registered and an email has been sent.") {
                    // Set the user cookie
                    setCookie("user_cookie", fullname);

                    // Redirect to the login page with success message
                    window.location.href = "login.html?success=registration";
                } else if (response === "This user already exists in the database!") {
                    alert("This user already exists in the database!");
                } else if (response === "You are registered, but you didn't use a valid email address!") {
                    alert("You are registered, but you didn't use a valid email address!");
                } else if (password !== confirm_password) {
                    $("#passwordError").text("Passwords do not match");
                } else {
                    // Handle other response cases here
                }
            },
            error: function(xhr, status, error) {
                console.log("Error:", error);
                // Handle the error scenario here
            },
            complete: function() {
                submitButton.prop("disabled", false);
                submitButton.html("Register");
            }
        });
    });
});
