document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const item = data.find(item => item.id === itemId);
            if (item) {
                // Update visible page content
                document.getElementById("item-title").innerText = item.name; // Poem title
                document.getElementById("item-description").innerText = item.about; // Poem about text
                document.getElementById("item-author").innerText = item.author; // Poem author
                document.getElementById("item-keywords").innerText = item.keywords; // Poem keywords
                document.getElementById("item-language").innerText = item.language; // Poem language
                document.getElementById("item-created-date").innerText = item.cdate; // Poem creation date
                document.getElementById("item-published-date").innerContent = item.pdate || "Not available";
                document.getElementById("item-text").innerText = item.text.replace(/\\n/g, '\n'); // Poem text with line breaks
                document.getElementById("item-url").innerContent = item.url || "Not available";

                // Create JSON-LD metadata
                const jsonLd = {
                    "@context": "https://schema.org/",
                    "@type": "CreativeWork",
                    "name": item.name,
                    "author": item.author,
                    "description": item.about,
                    "keywords": item.keywords,
                    "text": item.text,
                    "inLanguage": item.language,
                    "dateCreated": item.cdate,
                    "datePublished": item.pdate || "Not available"
                    "url": item.url || "Not available"
                };

                // Insert JSON-LD into the <head> of the document
                const script = document.createElement("script");
                script.type = "application/ld+json";
                script.textContent = JSON.stringify(jsonLd);
                document.head.appendChild(script);
            } else {
                console.error("Item not found!");
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
});
