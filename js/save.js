
function saveRecipeToLocal(recipe) {
    let savedRecipes = JSON.parse(localStorage.getItem('mySavedRecipes')) || [];
    const isAlreadySaved = savedRecipes.some(item => item.idMeal === recipe.idMeal);

    if (isAlreadySaved) {
        alert("Resep ini sudah ada di koleksi Anda!");
        return; 
    }

    savedRecipes.push(recipe);
    localStorage.setItem('mySavedRecipes', JSON.stringify(savedRecipes));
    mainDOM.savePopup.classList.remove('hidden');
}

mainDOM.saveRecipeBtn.addEventListener('click', () => {
    const currentRecipe = {
        idMeal: mainDOM.recipeName.textContent,
        strMeal: mainDOM.recipeName.textContent,
        strCountry: mainDOM.recipeCountry.textContent,
        strInstructions: mainDOM.recipeInstructions.textContent,
        strMealThumb: mainDOM.recipeImg.src
    };
    saveRecipeToLocal(currentRecipe);
});

mainDOM.closeSaveBtn.addEventListener('click', () => {
    mainDOM.savePopup.classList.add('hidden');
});

