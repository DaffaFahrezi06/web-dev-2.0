let searchName = mainDOM.searchInput.value;

async function searchRecipes() {
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



mainDOM.searchButton.addEventListener('click', () => {
    searchRecipes();
});
