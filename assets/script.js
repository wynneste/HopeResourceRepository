document.addEventListener("DOMContentLoaded", function() {
    fetch("data/resources.csv")
        .then(response => response.text())
        .then(data => {
            let resources = Papa.parse(data, {
                header: true,
                skipEmptyLines: true
            }).data;

            displayResources(resources);

            // Store resources globally for search function
            window.allResources = resources;
        });

    // Function to display search results
    function displayResources(resources) {
        const resourceList = document.getElementById('resource-list');
        resourceList.innerHTML = ""; // Clear the list before displaying
        
        resources.forEach(resource => {
            // If no image is provided, use the default PNG image
            const imageUrl = resource.Image || 'assets/default-image.png';
            
            // Create HTML structure for each resource card
            const resourceItem = `
                <div class="resource-card">
                    <img src="${imageUrl}" alt="${resource.Title}" class="resource-image">
                    <h2>${resource.Title}</h2>
                    <p><strong>Author:</strong> ${resource.Author}</p>
                    <p><strong>Type of Media:</strong> ${resource['Type of Media']}</p>
                    <button onclick="openResourcePage('${resource.Title}')">Learn More</button>
                </div>
            `;
            resourceList.innerHTML += resourceItem;
        });
    }

    // Function to filter resources based on checkboxes and search query
    window.searchResources = function() {
        const query = document.getElementById('search-input').value.toLowerCase();

        // Get checked categories, media types, and audience
        const selectedCategories = [...document.querySelectorAll('input[name="category"]:checked')].map(checkbox => checkbox.value);
        const selectedMediaTypes = [...document.querySelectorAll('input[name="media-type"]:checked')].map(checkbox => checkbox.value);
        const selectedAudiences = [...document.querySelectorAll('input[name="audience"]:checked')].map(checkbox => checkbox.value);

        // Filter resources
        const filteredResources = window.allResources.filter(resource => {
            const matchesQuery = query ? resource.Title.toLowerCase().includes(query) || resource.Author.toLowerCase().includes(query) : true;
            const matchesCategory = selectedCategories.length ? selectedCategories.includes(resource.Category) : true;
            const matchesMediaType = selectedMediaTypes.length ? selectedMediaTypes.includes(resource['Type of Media']) : true;
            const matchesAudience = selectedAudiences.length ? selectedAudiences.includes(resource['Target Audience']) : true;

            return matchesQuery && matchesCategory && matchesMediaType && matchesAudience;
        });

        displayResources(filteredResources);
    };

    // Function to open a detailed page for each resource
    window.openResourcePage = function(title) {
        alert(`You clicked on ${title}. This will take you to the detailed page.`);
    }
});
