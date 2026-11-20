function clearSavedRecipes() {
    localStorage.removeItem('mySavedRecipes');
    alert('Semua koleksi resep telah dihapus!');
}

mainDOM.settingBtn.addEventListener('click', () => {
    mainDOM.settingPopup.classList.remove('hidden');
});

mainDOM.deleteButtonBtn.addEventListener('click', () => {
    mainDOM.settingPopup.classList.remove('hidden');
    clearSavedRecipes();
    mainDOM.settingPopup.classList.add('hidden');
});

mainDOM.cancelDeleteBtn.addEventListener('click', () => {
    mainDOM.settingPopup.classList.add('hidden');
});
