
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

if (mainDOM.saveRecipeBtn) {
    mainDOM.saveRecipeBtn.addEventListener('click', () => {
        if (currentRecipe) saveRecipeToLocal(currentRecipe);
    });
}

if (mainDOM.closeSaveBtn) {
    mainDOM.closeSaveBtn.addEventListener('click', () => {
        mainDOM.savePopup.classList.add('hidden');
    });
}
