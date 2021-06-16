const fetch = require('node-fetch');

const fetchMeals = (req, res) => {
    fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=239d999794e542e4aab14c9d678902c2&timeFrame=day&targetCalories=${req.params.calories}`
    )
    .then(resp => resp.json())
    .then(data => {
        res.json(data);
    })
    .catch(() => {
        res.status(400).json("Please try again");
    })
}

const fetchMealImage = (req, res, meal) => {
    fetch(
        `https://api.spoonacular.com/recipes/${req.params.meal}/information?apiKey=239d999794e542e4aab14c9d678902c2&includeNutrition=false`
    )
    .then(resp => resp.json())
    .then(data => {
        res.json(data);
    })
    .catch(() => {
        res.status(400).json("Please try again");
    })
}


module.exports = { 
    fetchMeals: fetchMeals,
    fetchMealImage: fetchMealImage
};