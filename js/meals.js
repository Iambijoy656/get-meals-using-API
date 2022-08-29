const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    // console.log(meals)
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = ``;

    meals.forEach(meal => {
        // console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">  
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">
                   ${meal.strInstructions.slice(0, 200)}
                </p>
            </div>
        </div>
        `

        mealsContainer.appendChild(mealDiv)
    });

}

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log('searching', searchText)
    loadMeals(searchText);
    searchField.value = '';
}
const loadMealDetails = (idMeal) => {
    // console.log('get deails of id', idMeal)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`

    // console.log(url)

    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))

}

const displayMealDetails = meal => {
    console.log(meal)
    const detailContainer = document.getElementById('detail-contaier');
    detailContainer.innerHTML = ``;
    window.scrollTo(0, 20)
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('card');

    mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="">${meal.strInstructions.slice(0, 100)}</p>
                <p class="">Source: ${meal.strYoutube}</p>
                <a href="#" class="btn btn-primary">Order</a>
            </div>
        
    `
    detailContainer.appendChild(mealDiv);

}

loadMeals('')