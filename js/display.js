
function displaySavedRecipes() {
    const emptyState = document.getElementById('empty_state');
    const savedGrid = document.getElementById('saved_recipes_grid');

    let savedRecipes = JSON.parse(localStorage.getItem('mySavedRecipes')) || [];

    if (savedRecipes.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        
        savedGrid.classList.add('hidden');
        savedGrid.classList.remove('grid');
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        
        savedGrid.classList.remove('hidden');
        savedGrid.classList.add('grid');

        savedGrid.innerHTML = '';

        savedRecipes.forEach(recipe => {
            const card = `
                <div class="w-full bg-white flex flex-col p-4 gap-2 text-[#1e293b] shadow-md border border-gray-100 rounded-lg duration-300 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-[165px] rounded-lg object-cover max-[480px]:h-[120px]">
                    <h3 class="text-[1.1rem] font-semibold mt-2 line-clamp-1" title="${recipe.strMeal}">${recipe.strMeal}</h3>
                    
                    <button class="w-full bg-[#bbf7d0] py-2 mt-auto text-[1.1rem] text-[#1e293b] rounded-lg hover:bg-[#4ade80] transition-colors duration-300" onclick="showSavedPopUp('${recipe.idMeal}')">Lihat Resep</button>
                    
                    <button class="w-full bg-red-50 border border-red-200 py-2 text-[1.1rem] text-red-600 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors duration-300" onclick="removeRecipe('${recipe.idMeal}')">
                        Hapus Resep
                    </button>
                </div>
            `;
            savedGrid.innerHTML += card;
        });
    }
}

window.showSavedPopUp = function(idMeal) {
    let savedRecipes = JSON.parse(localStorage.getItem('mySavedRecipes')) || [];
    const selectedRecipe = savedRecipes.find(recipe => recipe.idMeal === idMeal);
    
    if (selectedRecipe) {
        showPopUp(selectedRecipe); 
    }
}

window.removeRecipe = function(idMeal) {
    let savedRecipes = JSON.parse(localStorage.getItem('mySavedRecipes')) || [];
    
    savedRecipes = savedRecipes.filter(recipe => recipe.idMeal !== idMeal);
    localStorage.setItem('mySavedRecipes', JSON.stringify(savedRecipes));
    displaySavedRecipes();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('saved_recipes_grid')) {
        displaySavedRecipes();
    }
});