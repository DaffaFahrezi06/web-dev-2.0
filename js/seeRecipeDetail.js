async function fetchRecipeDetails() {
    fetch(`${API_URL}?s=${searchName}`)
        .then(response => response.json())
        .then(data => {
            // Handle the search results
            console.log('Search results:', data);
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}


