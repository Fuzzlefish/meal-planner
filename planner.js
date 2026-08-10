const mealPlan = document.querySelector("#mealPlan");
const mealModal = document.querySelector("#mealModal");
const mealModalTitle = document.querySelector("#mealModalTitle");
const availableMeals = document.querySelector("#availableMeals");
const cancelMealButton = document.querySelector("#cancelMealButton");
const mealFilters = document.querySelector("#mealFilters");

const ingredientsModal = document.querySelector("#ingredientsModal");
const ingredientsModalTitle = document.querySelector("#ingredientsModalTitle");
const ingredientsList = document.querySelector("#ingredientsList");
const closeIngredientsButton = document.querySelector("#closeIngredientsButton");

let selectedDay = null;
let selectedMealType = null;
let selectedCategory = "all";

function getMeals() {
    return JSON.parse(localStorage.getItem("meals")) || [];
}

function getMealPlan() {
    return JSON.parse(localStorage.getItem("mealPlan")) || {};
}

function saveMealPlan(plan) {
    localStorage.setItem("mealPlan", JSON.stringify(plan));
}

if (mealPlan) {
    mealPlan.addEventListener("click", (event) => {
        if (!event.target.classList.contains("addMealButton")) {
            return;
        }

        const day = event.target.closest(".day");
        const meal = event.target.closest(".meal");

        if (!day || !meal || !mealModal) {
            return;
        }

        selectedDay = day.id;
        selectedMealType = meal.querySelector("h3").textContent;

        if (mealModalTitle) {
            mealModalTitle.textContent =
                `Add Meal to ${capitalize(selectedDay)} ${selectedMealType}`;
        }

        selectedCategory = "all";

        displayFilters();
        displayMeals();

        mealModal.style.display = "flex";
    });
}

function displayFilters() {
    if (!mealFilters) {
        return;
    }

    mealFilters.innerHTML = "";

    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.classList.add("filterButton");
    allButton.dataset.category = "all";
    mealFilters.appendChild(allButton);

    const meals = getMeals();
    const categories = new Set();

    meals.forEach((meal) => {
        if (!meal.tags) {
            return;
        }

        meal.tags.forEach((tag) => {
            categories.add(tag);
        });
    });

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.classList.add("filterButton");
        button.dataset.category = category;
        mealFilters.appendChild(button);
    });
}

function displayMeals() {
    if (!availableMeals) {
        return;
    }

    availableMeals.innerHTML = "";

    const meals = getMeals();

    if (meals.length === 0) {
        const message = document.createElement("p");
        message.textContent =
            "You don't have any meals in your library yet.";
        availableMeals.appendChild(message);
        return;
    }

    meals.forEach((meal) => {
        const tags = meal.tags || [];

        if (
            selectedCategory !== "all" &&
            !tags.includes(selectedCategory)
        ) {
            return;
        }

        const button = document.createElement("button");
        button.classList.add("availableMealButton");
        button.textContent = meal.name;

        if (tags.length > 0) {
            const tagContainer = document.createElement("div");
            tagContainer.classList.add("mealTags");

            tags.forEach((tag) => {
                tagContainer.appendChild(createTagElement(tag));
            });

            button.appendChild(tagContainer);
        }

        button.addEventListener("click", () => {
            selectMeal(meal);
        });

        availableMeals.appendChild(button);
    });
}

if (mealFilters) {
    mealFilters.addEventListener("click", (event) => {
        if (!event.target.classList.contains("filterButton")) {
            return;
        }

        selectedCategory = event.target.dataset.category;
        displayMeals();
    });
}

function selectMeal(meal) {
    const day = document.querySelector(`#${selectedDay}`);

    if (!day) {
        return;
    }

    const mealSections = day.querySelectorAll(".meal");
    let selectedMealSection = null;

    mealSections.forEach((section) => {
        const heading = section.querySelector("h3");

        if (heading && heading.textContent === selectedMealType) {
            selectedMealSection = section;
        }
    });

    if (!selectedMealSection) {
        return;
    }

    const mealList = selectedMealSection.querySelector("ul");

    if (!mealList) {
        return;
    }

    mealList.innerHTML = "";

    const listItem = document.createElement("li");
    listItem.textContent = meal.name;

    const ingredientsButton = document.createElement("button");
    ingredientsButton.textContent = "View Ingredients";
    ingredientsButton.classList.add("viewIngredientsButton");

    ingredientsButton.addEventListener("click", () => {
        openIngredientsModal(meal);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("removeMealButton");

    removeButton.addEventListener("click", () => {
        removeMealFromPlan();
    });

    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(ingredientsButton);
    listItem.appendChild(removeButton);

    mealList.appendChild(listItem);

    const plan = getMealPlan();

    if (!plan[selectedDay]) {
        plan[selectedDay] = {};
    }

    const mealType = selectedMealType.toLowerCase();
    plan[selectedDay][mealType] = meal.id;

    saveMealPlan(plan);

    if (mealModal) {
        mealModal.style.display = "none";
    }
}

function removeMealFromPlan() {
    const day = document.querySelector(`#${selectedDay}`);

    if (!day) {
        return;
    }

    const mealSections = day.querySelectorAll(".meal");
    let selectedMealSection = null;

    mealSections.forEach((section) => {
        const heading = section.querySelector("h3");

        if (heading && heading.textContent === selectedMealType) {
            selectedMealSection = section;
        }
    });

    if (!selectedMealSection) {
        return;
    }

    const mealList = selectedMealSection.querySelector("ul");

    if (mealList) {
        mealList.innerHTML = "";
    }

    const plan = getMealPlan();

    if (plan[selectedDay]) {
        plan[selectedDay][selectedMealType.toLowerCase()] = null;
    }

    saveMealPlan(plan);
}

function loadMealPlan() {
    const plan = getMealPlan();
    const meals = getMeals();

    Object.keys(plan).forEach((dayName) => {
        const dayPlan = plan[dayName];
        const dayElement = document.querySelector(`#${dayName}`);

        if (!dayElement) {
            return;
        }

        const mealSections = dayElement.querySelectorAll(".meal");

        mealSections.forEach((section) => {
            const heading = section.querySelector("h3");

            if (!heading) {
                return;
            }

            const mealType = heading.textContent.toLowerCase();
            const mealId = dayPlan[mealType];

            if (!mealId) {
                return;
            }

            const meal = meals.find((meal) => meal.id === mealId);

            if (!meal) {
                dayPlan[mealType] = null;
                saveMealPlan(plan);
                return;
            }

            displaySavedMeal(section, meal);
        });
    });
}

function displaySavedMeal(section, meal) {
    const mealList = section.querySelector("ul");

    if (!mealList) {
        return;
    }

    mealList.innerHTML = "";

    const listItem = document.createElement("li");
    listItem.textContent = meal.name;

    const ingredientsButton = document.createElement("button");
    ingredientsButton.textContent = "View Ingredients";
    ingredientsButton.classList.add("viewIngredientsButton");

    ingredientsButton.addEventListener("click", () => {
        openIngredientsModal(meal);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("removeMealButton");

    removeButton.addEventListener("click", () => {
        const day = section.closest(".day");

        if (!day) {
            return;
        }

        const dayName = day.id;
        const heading = section.querySelector("h3");

        if (!heading) {
            return;
        }

        const mealType = heading.textContent;

        listItem.remove();

        const plan = getMealPlan();

        if (plan[dayName]) {
            plan[dayName][mealType.toLowerCase()] = null;
        }

        saveMealPlan(plan);
    });

    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(ingredientsButton);
    listItem.appendChild(removeButton);

    mealList.appendChild(listItem);
}

if (cancelMealButton) {
    cancelMealButton.addEventListener("click", () => {
        if (mealModal) {
            mealModal.style.display = "none";
        }
    });
}

function openIngredientsModal(meal) {
    if (
        !ingredientsModal ||
        !ingredientsModalTitle ||
        !ingredientsList
    ) {
        return;
    }

    ingredientsModalTitle.textContent = meal.name;
    ingredientsList.innerHTML = "";

    const ingredients = meal.ingredients || [];

    if (ingredients.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No ingredients have been added.";
        ingredientsList.appendChild(message);
    } else {
        ingredients.forEach((ingredient) => {
            const item = document.createElement("div");
            item.classList.add("ingredientDisplay");

            const amount = ingredient.amount
                ? `${ingredient.amount} `
                : "";

            const unit = ingredient.unit
                ? `${ingredient.unit} `
                : "";

            item.textContent =
                `${amount}${unit}${ingredient.name}`;

            ingredientsList.appendChild(item);
        });
    }

    ingredientsModal.style.display = "flex";
}

if (closeIngredientsButton) {
    closeIngredientsButton.addEventListener("click", () => {
        if (ingredientsModal) {
            ingredientsModal.style.display = "none";
        }
    });
}

if (ingredientsModal) {
    ingredientsModal.addEventListener("click", (event) => {
        if (event.target === ingredientsModal) {
            ingredientsModal.style.display = "none";
        }
    });
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function createTagElement(tag) {
    const tagElement = document.createElement("span");

    tagElement.textContent = tag;
    tagElement.classList.add("mealTagDisplay");

    const tagClass = tag
        .toLowerCase()
        .replace(/\s+/g, "-");

    tagElement.classList.add(`tag-${tagClass}`);

    return tagElement;
}

document.querySelectorAll(".dayHeader").forEach((header) => {
    header.addEventListener("click", () => {
        const day = header.closest(".day");

        if (!day) {
            return;
        }

        day.classList.toggle("collapsed");
    });
});

loadMealPlan();