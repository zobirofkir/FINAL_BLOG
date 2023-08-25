$(document).ready(function() {
    $("#contactForm").submit(function(event) {
        event.preventDefault();

        var submitButton = $("#submitButton");
        submitButton.prop("disabled", true);
        submitButton.html("Sending...");

        var message = $("#message").val();
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/models/contact.php",
            data: {
                contact: true,
                message: message,
                name: name,
                email: email,
                subject: subject
            },
            success: function(response) {
                console.log(response);
                if (response === "Thank you! We will get in touch soon.") {
                    // Open a jQuery UI dialog with the colored message
                    var dialogContent = "We will call you soon on this email: <span style='color: red;'>" + email + "</span> <br/><br/> Wait 5 seconds, and this page will automatically reload.";
                    var dialog = $("<div>" + dialogContent + "</div>").dialog({
                        title: "Notification",
                        modal: true,
                        buttons: {
                            OK: function() {
                                $(this).dialog("close");
                            }
                        }
                    });

                    // Automatically close the dialog after 5 seconds
                    setTimeout(function() {
                        dialog.dialog("close");
                        location.reload();
                    }, 5000);
                } else {
                    var errorMessage = $("<div>", {
                        class: "error-message",
                        text: response // Display the error message directly from the server
                    });
                    $("#notificationArea").html(errorMessage);
                    alert('Bad request');
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
                var errorMessage = $("<div>", {
                    class: "error-message",
                    text: "An error occurred while making the request."
                });
                $("#notificationArea").html(errorMessage);
            },
            complete: function() {
                submitButton.prop("disabled", false);
                submitButton.html("Send");
            }
        });
    });
});
