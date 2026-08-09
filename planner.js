const mealPlan = document.querySelector("#mealPlan");
const mealModal = document.querySelector("#mealModal");
const mealModalTitle = document.querySelector("#mealModalTitle");
const availableMeals = document.querySelector("#availableMeals");
const cancelMealButton = document.querySelector("#cancelMealButton");
const mealFilters = document.querySelector("#mealFilters");

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

mealPlan.addEventListener("click", (event) => {
    if (!event.target.classList.contains("addMealButton")) {
        return;
    }

    const day = event.target.closest(".day");
    const meal = event.target.closest(".meal");

    selectedDay = day.id;
    selectedMealType = meal.querySelector("h3").textContent;

    mealModalTitle.textContent =
        `Add Meal to ${capitalize(selectedDay)} ${selectedMealType}`;

    selectedCategory = "all";

    displayFilters();
    displayMeals();

    mealModal.style.display = "flex";
});

function displayFilters() {
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
            const tagText = document.createElement("small");
            tagText.textContent = tags.join(" • ");

            button.appendChild(document.createElement("br"));
            button.appendChild(tagText);
        }

        button.addEventListener("click", () => {
            selectMeal(meal);
        });

        availableMeals.appendChild(button);
    });
}

mealFilters.addEventListener("click", (event) => {
    if (!event.target.classList.contains("filterButton")) {
        return;
    }

    selectedCategory = event.target.dataset.category;
    displayMeals();
});

function selectMeal(meal) {
    const day = document.querySelector(`#${selectedDay}`);
    const mealSections = day.querySelectorAll(".meal");

    let selectedMealSection = null;

    mealSections.forEach((section) => {
        const heading = section.querySelector("h3").textContent;

        if (heading === selectedMealType) {
            selectedMealSection = section;
        }
    });

    if (!selectedMealSection) {
        return;
    }

    const mealList = selectedMealSection.querySelector("ul");

    mealList.innerHTML = "";

    const listItem = document.createElement("li");
    listItem.textContent = meal.name;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("removeMealButton");

    removeButton.addEventListener("click", () => {
        removeMealFromPlan();
    });

    listItem.appendChild(removeButton);
    mealList.appendChild(listItem);

    const plan = getMealPlan();

    if (!plan[selectedDay]) {
        plan[selectedDay] = {};
    }

    const mealType = selectedMealType.toLowerCase();
    plan[selectedDay][mealType] = meal.id;

    saveMealPlan(plan);

    mealModal.style.display = "none";
}

function removeMealFromPlan() {
    const day = document.querySelector(`#${selectedDay}`);

    if (!day) {
        return;
    }

    const mealSections = day.querySelectorAll(".meal");
    let selectedMealSection = null;

    mealSections.forEach((section) => {
        const heading = section.querySelector("h3").textContent;

        if (heading === selectedMealType) {
            selectedMealSection = section;
        }
    });

    if (!selectedMealSection) {
        return;
    }

    const mealList = selectedMealSection.querySelector("ul");
    mealList.innerHTML = "";

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
            const mealType =
                section.querySelector("h3").textContent.toLowerCase();

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

    mealList.innerHTML = "";

    const listItem = document.createElement("li");
    listItem.textContent = meal.name;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("removeMealButton");

    removeButton.addEventListener("click", () => {
        const day = section.closest(".day");
        const dayName = day.id;
        const mealType = section.querySelector("h3").textContent;

        listItem.remove();

        const plan = getMealPlan();

        if (plan[dayName]) {
            plan[dayName][mealType.toLowerCase()] = null;
        }

        saveMealPlan(plan);
    });

    listItem.appendChild(removeButton);
    mealList.appendChild(listItem);
}

cancelMealButton.addEventListener("click", () => {
    mealModal.style.display = "none";
});

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

loadMealPlan();

