$(document).ready(function () {
    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomUser(users) {
        const randomIndex = getRandomIndex(users.length);
        return users[randomIndex];
    }

    function fetchAndShowRandomUser() {
        $.ajax({
            url: "http://localhost:3000/models/get-users-data.php", // Replace with the actual path to your PHP script
            method: "GET",
            dataType: "json",
            success: function (data) {
                const userTable = $("#userTable");
                userTable.html(""); // Clear previous data

                const randomUser = getRandomUser(data);
                userTable.append("<tr><td>" + randomUser.fullname + "</td><td>" + randomUser.email + "</td></tr>");
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }

    fetchAndShowRandomUser(); // Show a random user immediately

    setInterval(fetchAndShowRandomUser, 1000); // Fetch and show a random user every 5 seconds
});
