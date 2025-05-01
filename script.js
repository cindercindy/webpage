document.addEventListener("DOMContentLoaded", function () {
    fetch("collection.json") // Load the JSON file
        .then(response => response.json()) // Convert response to JavaScript object
        .then(data => {
            const container = document.getElementById("collection"); // Find the container in HTML
            data.forEach(item => { // Loop through each item in the JSON file
                let div = document.createElement("div"); // Create a new div for each item
                div.innerHTML = `
                    <h2>${item.name}</h2>
                    <p><strong>Author:</strong> ${item.author}</p>
                    <p><strong>Description:</strong> ${item.about}</p>
                    <p><strong>Keywords:</strong> ${item.keywords}</p>
                    <p><strong>Language:</strong> ${item.language}</p>
                    <p><strong>Created Date:</strong> ${item.cdate}</p>
                    <p><strong>Published Date:</strong> ${item.pdate}</p>
                    <p>${item.text}</p>
                    <a href="item-template.html?id=${item.id}">View More</a>
                `; // Insert item data and link
                container.appendChild(div); // Add item to the page
            });
        })
        .catch(error => console.error("Error loading JSON:", error)); // Show errors if loading fails
});
