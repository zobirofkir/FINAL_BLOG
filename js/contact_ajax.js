$(document).ready(function(){
    $("#contactForm").submit(function(event){
        event.preventDefault();

        var submitButton = $("#submitButton");
        submitButton.prop("disabled", true); // Disable the button
        submitButton.html("Sending...");     // Change the button text

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
            success: function(response){
                console.log(response);
                if (response === "We call you soon") {
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
                } else if (response === "error") {
                    alert("An error occurred while processing your request.");
                } else {
                    alert("Bad request or unknown response.");
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
                alert("An error occurred while making the request.");
            },
            complete: function() {
                submitButton.prop("disabled", false); // Re-enable the button
                submitButton.html("Send");            // Restore the button text
            }
        });
    });
});
