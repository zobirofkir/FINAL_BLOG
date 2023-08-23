$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/models/get-comment.php", // Replace with the correct path
        success: function(response) {
            var comments = JSON.parse(response);
            var commentList = $("#commentList");
            var currentCommentIndex = 0;

            function updateComment() {
                var commentData = comments[currentCommentIndex];
                var comment = commentData.comment;

                // Display the current comment
                commentList.empty();
                var li = $("<li>").text(comment);
                commentList.append(li);

                // Move to the next comment
                currentCommentIndex = (currentCommentIndex + 1) % comments.length;
            }

            updateComment(); // Show the first comment immediately

            setInterval(updateComment, 1000); // Update comment every 5 seconds
        },
        error: function() {
            alert("Error fetching comments.");
        }
    });
});
