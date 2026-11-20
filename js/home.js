const RECOMMENDED_COUNT = 12;

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recommended-recipe';
    card.dataset.id = recipe.idMeal;

    const img = document.createElement('img');
    img.className = 'recipe-img';
    img.src = recipe.strMealThumb;
    img.alt = recipe.strMeal;
    img.loading = 'lazy';

    const title = document.createElement('h3');
    title.className = 'recipe-title line-clamp-1';
    title.title = recipe.strMeal;
    title.textContent = recipe.strMeal;

    const desc = document.createElement('p');
    desc.className = 'recipe-desc line-clamp-3';
    const tags = [recipe.strCategory, recipe.strArea].filter(Boolean).join(' · ');
    const snippet = (recipe.strInstructions || '').replace(/\s+/g, ' ').trim();
    desc.textContent = tags ? `${tags}. ${snippet}` : snippet;

    const viewBtn = document.createElement('button');
    viewBtn.className = 'btn-view';
    viewBtn.textContent = 'Lihat Resep';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn-save';
    saveBtn.textContent = 'Simpan Resep';

    card.append(img, title, desc, viewBtn, saveBtn);
    return card;
}

async function fetchRandomRecipes(count) {
    const requests = Array.from({ length: count + 4 }, () =>
        fetch(`${API_URL}random.php`)
            .then(res => res.json())
            .then(data => (data.meals ? data.meals[0] : null))
            .catch(() => null)
    );
    const results = await Promise.all(requests);

    const unique = new Map();
    results.forEach(meal => {
        if (meal && !unique.has(meal.idMeal)) unique.set(meal.idMeal, meal);
    });
    return [...unique.values()].slice(0, count);
}

async function loadRecommendedRecipes() {
    const container = mainDOM.recipesContainer;
    const status = document.getElementById('recommendation_status');
    if (!container) return;

    const recipes = await fetchRandomRecipes(RECOMMENDED_COUNT);

    if (recipes.length === 0) {
        status.textContent = 'Gagal memuat resep. Periksa koneksi internet lalu muat ulang halaman.';
        return;
    }

    recipes.forEach(recipe => recipeCache.set(recipe.idMeal, recipe));
    container.replaceChildren(...recipes.map(createRecipeCard));
}

loadRecommendedRecipes();
