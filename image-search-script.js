const accessKey = '_Cy_33mVQuJNM5jkb9t3DUfcTUNkXdO4TzRULlmJcWY'; // Your Unsplash API key

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const query = document.getElementById('search-input').value;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const imageContainer = document.getElementById('image-container');
            imageContainer.innerHTML = ''; // Clear previous results

            if (data.results.length === 0) {
                imageContainer.innerHTML = '<p>No images found.</p>';
                return;
            }

            data.results.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.urls.small;
                imgElement.alt = image.alt_description || 'Image';
                imgElement.style.width = '200px'; // Adjust size as needed
                imgElement.style.margin = '10px';
                imageContainer.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            document.getElementById('image-container').innerHTML = '<p>Error fetching images. Please try again later.</p>';
        });
});
