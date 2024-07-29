function searchAnimal() {
    const searchInput = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (searchInput.trim() === '') {
        alert('Please enter an animal or bird name.');
        return;
    }

    // Use your actual Unsplash API access key here
    const accessKey = '_Cy_33mVQuJNM5jkb9t3DUfcTUNkXdO4TzRULlmJcWY';

    fetch(`https://api.unsplash.com/search/photos?query=${searchInput}&client_id=${accessKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const images = data.results;
            if (images.length === 0) {
                resultsDiv.innerHTML = '<p>No images found.</p>';
                return;
            }

            // Fetch details about the animal/bird
            fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchInput}`)
                .then(response => response.json())
                .then(details => {
                    if (details.type === 'disambiguation' || details.title === 'Not found.') {
                        resultsDiv.innerHTML += '<p>No details found.</p>';
                    } else {
                        resultsDiv.innerHTML += `<h3>${details.title}</h3><p>${details.extract}</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error fetching details:', error);
                    resultsDiv.innerHTML += '<p>Error fetching details. Please try again later.</p>';
                });

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.urls.small;
                imgElement.alt = image.alt_description;
                imageContainer.appendChild(imgElement);
            });
            resultsDiv.appendChild(imageContainer);
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            resultsDiv.innerHTML = '<p>Error fetching images. Please try again later.</p>';
        });
}
