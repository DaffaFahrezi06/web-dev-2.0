
async function searchRecipes() {
    let searchName = mainDOM.searchInput.value;

    console.log('Searching for:', searchName); 

    if (!searchName) {
        console.log('Search input is empty. Please enter a search term.');
    } else {
        fetch(`${API_URL}search.php?s=${searchName}`)
            .then(response => response.json())
            .then(data => {
            if (data.meals) {
                let recipe = data.meals[0];
                showPopUp(recipe);
            } else {
                alert('Resep tidak ditemukan!');
            }
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
    };      
}

async function showPopUp(recipe) {
    await displayRecipeDetail(recipe);
    mainDOM.recipePopup.classList.remove('hidden');
}

async function displayRecipeDetail(recipe) {
    mainDOM.recipeName.textContent = recipe.strMeal;
    mainDOM.recipeCountry.textContent = recipe.strCountry;
    mainDOM.recipeInstructions.textContent = recipe.strInstructions;
    mainDOM.recipeImg.src = recipe.strMealThumb;
    mainDOM.recipeImg.alt = recipe.strMeal;
    mainDOM.recipeCategory.textContent = recipe.strCategory;

    for(let i = 1; i <= 20; i++) {
        let ingredient = `strIngredient${i}`;
        let measure = `strMeasure${i}`;
        if(recipe[ingredient] && recipe[ingredient].trim() !== "") {
            const ingredientItem = document.createElement('li');
            const ingredientString = `${recipe[ingredient].trim()} (${recipe[measure]})`;
            
            ingredientItem.textContent = ingredientString;
            mainDOM.recipeIngredients.appendChild(ingredientItem);
        }  
    }
}

mainDOM.searchButton.addEventListener('click', async () => {
    await searchRecipes();
});

mainDOM.closeRecipeBtn.addEventListener('click', () => {
    mainDOM.recipePopup.classList.add('hidden');
}); 



