// Load Header
fetch('partials/header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load header: ${response.statusText}`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("header").innerHTML = data;
        console.log("Header loaded successfully");
    })
    .catch(error => console.error('Error loading header:', error));

// Load Footer
fetch('partials/footer.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load footer: ${response.statusText}`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("footer").innerHTML = data;
        console.log("Footer loaded successfully");
    })
    .catch(error => console.error('Error loading footer:', error));
