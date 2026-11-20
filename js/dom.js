const mainDOM = {
        searchInput: document.getElementById('search_input'),
        searchButton: document.getElementById('search_button'),
        recipesContainer: document.getElementById('recommendation_container'),

        recipePopup: document.getElementById('recipe_popup'),
        closeRecipeBtn: document.getElementById('close_recipe_detail'),

        savePopup: document.getElementById('save_popup'),
        closeSaveBtn: document.getElementById('close_save_popup'),
        saveRecipeBtn: document.getElementById('save_recipe'),

        recipeName: document.getElementById('popup_title'),
        recipeCountry: document.getElementById('popup_country'),
        recipeInstructions: document.getElementById('popup_instructions'),
        recipeIngredients: document.getElementById('popup_ingredients'),
        recipeImg: document.getElementById('popup_img'),
        recipeCategory: document.getElementById('popup_category'),

        settingBtn: document.getElementById('setting_icon'),
        deleteButtonBtn: document.getElementById('delete_button'),
        cancelDeleteBtn: document.getElementById('cancel_delete_button'),

        settingPopup: document.getElementById('setting_popup'),
    };

const savedDOM = {
    emptyState: document.getElementById('empty_state'),
    savedRecipesGrid: document.getElementById('saved_recipes_grid'),
};
