let currentRecipe = null;

async function searchRecipes() {
    const searchName = mainDOM.searchInput.value.trim();

    if (!searchName) {
        console.log('Search input is empty. Please enter a search term.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}search.php?s=${encodeURIComponent(searchName)}`);
        const data = await response.json();

        if (data.meals) {
            await showPopUp(data.meals[0]);
        } else {
            alert('Resep tidak ditemukan!');
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

async function showPopUp(recipe) {
    await displayRecipeDetail(recipe);
    mainDOM.recipePopup.classList.remove('hidden');
}

async function displayRecipeDetail(recipe) {
    currentRecipe = recipe;

    mainDOM.recipeName.textContent = recipe.strMeal || '';
    mainDOM.recipeCountry.textContent = recipe.strArea || recipe.strCountry || '';
    mainDOM.recipeInstructions.textContent = recipe.strInstructions || '';
    mainDOM.recipeImg.src = recipe.strMealThumb || '';
    mainDOM.recipeImg.alt = recipe.strMeal || '';
    if (mainDOM.recipeCategory) {
        mainDOM.recipeCategory.textContent = recipe.strCategory || '';
    }

    mainDOM.recipeIngredients.innerHTML = '';

    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            const li = document.createElement('li');
            li.textContent = measure && measure.trim()
                ? `${ingredient.trim()} (${measure.trim()})`
                : ingredient.trim();
            mainDOM.recipeIngredients.appendChild(li);
        }
    }
}

const recipeCache = new Map();

async function getRecipeById(id) {
    if (recipeCache.has(id)) return recipeCache.get(id);

    try {
        const response = await fetch(`${API_URL}lookup.php?i=${encodeURIComponent(id)}`);
        const data = await response.json();
        if (data.meals) {
            recipeCache.set(id, data.meals[0]);
            return data.meals[0];
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
    return null;
}
s
if (mainDOM.recipesContainer) {
    mainDOM.recipesContainer.addEventListener('click', async (event) => {
        const card = event.target.closest('.recommended-recipe');
        if (!card) return;

        const isView = event.target.closest('.btn-view');
        const isSave = event.target.closest('.btn-save');
        if (!isView && !isSave) return;

        const recipe = await getRecipeById(card.dataset.id);
        if (!recipe) {
            alert('Resep tidak dapat dimuat. Coba lagi.');
            return;
        }

        if (isView) {
            await showPopUp(recipe);
        } else {
            saveRecipeToLocal(recipe);
        }
    });
}

if (mainDOM.searchButton) {
    mainDOM.searchButton.addEventListener('click', searchRecipes);
}

if (mainDOM.searchInput) {
    mainDOM.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') searchRecipes();
    });
}

if (mainDOM.closeRecipeBtn) {
    mainDOM.closeRecipeBtn.addEventListener('click', () => {
        mainDOM.recipePopup.classList.add('hidden');
    });
}
