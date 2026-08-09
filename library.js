const addMealButton = document.querySelector("#addMealButton");
const addMealForm = document.querySelector("#addMealForm");
const newMealName = document.querySelector("#newMealName");
const cancelMealButton = document.querySelector("#cancelMealButton");
const saveMealButton = document.querySelector("#saveMealButton");
const mealList = document.querySelector("#mealList");

function saveMeals(meals) {
    localStorage.setItem("meals", JSON.stringify(meals));
}

function getMeals() {
    return JSON.parse(localStorage.getItem("meals")) || [];
}

addMealButton.addEventListener("click", () => {
    addMealForm.style.display = "block";
    newMealName.focus();
});

cancelMealButton.addEventListener("click", () => {
    addMealForm.style.display = "none";
    newMealName.value = "";
    clearTagCheckboxes();
});

saveMealButton.addEventListener("click", () => {
    const mealName = newMealName.value.trim();

    if (mealName === "") {
        alert("Please enter a meal name.");
        return;
    }

    const meals = getMeals();

    const meal = {
        id: crypto.randomUUID(),
        name: mealName,
        tags: getSelectedTags()
    };

    meals.push(meal);
    saveMeals(meals);

    newMealName.value = "";
    clearTagCheckboxes();
    addMealForm.style.display = "none";

    displayMeals();
});

function getSelectedTags() {
    const checkboxes = document.querySelectorAll(".mealTag:checked");
    const tags = [];

    checkboxes.forEach((checkbox) => {
        tags.push(checkbox.value);
    });

    return tags;
}

function clearTagCheckboxes() {
    const checkboxes = document.querySelectorAll(".mealTag");

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
}

function displayMeals() {
    mealList.innerHTML = "";

    const meals = getMeals();

    if (meals.length === 0) {
        const message = document.createElement("p");
        message.textContent = "You haven't added any meals yet.";
        mealList.appendChild(message);
        return;
    }

    meals.forEach((meal) => {
        const mealItem = document.createElement("div");
        mealItem.classList.add("mealItem");

        const mealTitle = document.createElement("h3");
        mealTitle.textContent = meal.name;
        mealItem.appendChild(mealTitle);

        const tagContainer = document.createElement("div");
        tagContainer.classList.add("mealTags");

        meal.tags.forEach((tag) => {
            const tagElement = document.createElement("span");
            tagElement.textContent = tag;
            tagElement.classList.add("mealTagDisplay");
            tagContainer.appendChild(tagElement);
        });

        mealItem.appendChild(tagContainer);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            editMeal(meal.id);
        });

        mealItem.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteMeal(meal.id);
        });

        mealItem.appendChild(deleteButton);
        mealList.appendChild(mealItem);
    });
}

function editMeal(mealId) {
    const meals = getMeals();
    const meal = meals.find((meal) => meal.id === mealId);

    if (!meal) {
        return;
    }

    const newName = prompt("Enter new meal name:", meal.name);

    if (newName === null || newName.trim() === "") {
        return;
    }

    meal.name = newName.trim();

    const newTags = prompt(
        "Enter tags separated by commas:",
        meal.tags.join(", ")
    );

    if (newTags !== null) {
        meal.tags = newTags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");
    }

    saveMeals(meals);
    displayMeals();
}

function deleteMeal(mealId) {
    const meals = getMeals();
    const meal = meals.find((meal) => meal.id === mealId);

    if (!meal) {
        return;
    }

    const confirmed = confirm(`Delete "${meal.name}"?`);

    if (!confirmed) {
        return;
    }

    const updatedMeals = meals.filter((meal) => meal.id !== mealId);

    saveMeals(updatedMeals);
    displayMeals();
}

displayMeals();

