const addMealButton = document.querySelector("#addMealButton");
const addMealForm = document.querySelector("#addMealForm");
const newMealName = document.querySelector("#newMealName");
const cancelMealButton = document.querySelector("#cancelMealButton");
const saveMealButton = document.querySelector("#saveMealButton");
const mealList = document.querySelector("#mealList");

const editMealModal = document.querySelector("#editMealModal");
const editMealName = document.querySelector("#editMealName");
const cancelEditButton = document.querySelector("#cancelEditButton");
const saveEditButton = document.querySelector("#saveEditButton");

const deleteMealModal = document.querySelector("#deleteMealModal");
const deleteMealMessage = document.querySelector("#deleteMealMessage");
const cancelDeleteButton = document.querySelector("#cancelDeleteButton");
const confirmDeleteButton = document.querySelector("#confirmDeleteButton");

let editingMealId = null;
let deletingMealId = null;

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

        const tagClass = tag
            .toLowerCase()
            .replace(/\s+/g, "-");

        tagElement.classList.add(`tag-${tagClass}`);

        tagContainer.appendChild(tagElement);
    });

        mealItem.appendChild(tagContainer);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            openEditModal(meal.id);
        });

        mealItem.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            openDeleteModal(meal.id);
        });

        mealItem.appendChild(deleteButton);
        mealList.appendChild(mealItem);
    });
}

function openEditModal(mealId) {
    const meals = getMeals();
    const meal = meals.find((meal) => meal.id === mealId);

    if (!meal) {
        return;
    }

    editingMealId = mealId;

    editMealName.value = meal.name;

    const tagCheckboxes = document.querySelectorAll(".editMealTag");

    tagCheckboxes.forEach((checkbox) => {
        checkbox.checked = meal.tags.includes(checkbox.value);
    });

    editMealModal.style.display = "flex";
    editMealName.focus();
}

cancelEditButton.addEventListener("click", () => {
    editMealModal.style.display = "none";
    editingMealId = null;
});

saveEditButton.addEventListener("click", () => {
    if (!editingMealId) {
        return;
    }

    const newName = editMealName.value.trim();

    if (newName === "") {
        alert("Please enter a meal name.");
        return;
    }

    const meals = getMeals();
    const meal = meals.find((meal) => meal.id === editingMealId);

    if (!meal) {
        return;
    }

    meal.name = newName;
    meal.tags = getEditTags();

    saveMeals(meals);
    displayMeals();

    editMealModal.style.display = "none";
    editingMealId = null;
});

function getEditTags() {
    const checkboxes = document.querySelectorAll(".editMealTag");
    const tags = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            tags.push(checkbox.value);
        }
    });

    return tags;
}

function openDeleteModal(mealId) {
    const meals = getMeals();
    const meal = meals.find((meal) => meal.id === mealId);

    if (!meal) {
        return;
    }

    deletingMealId = mealId;

    deleteMealMessage.textContent =
        `Are you sure you want to delete "${meal.name}"?`;

    deleteMealModal.style.display = "flex";
}

cancelDeleteButton.addEventListener("click", () => {
    deleteMealModal.style.display = "none";
    deletingMealId = null;
});

confirmDeleteButton.addEventListener("click", () => {
    if (!deletingMealId) {
        return;
    }

    const meals = getMeals();

    const updatedMeals = meals.filter(
        (meal) => meal.id !== deletingMealId
    );

    saveMeals(updatedMeals);
    displayMeals();

    deleteMealModal.style.display = "none";
    deletingMealId = null;
});

editMealModal.addEventListener("click", (event) => {
    if (event.target === editMealModal) {
        editMealModal.style.display = "none";
        editingMealId = null;
    }
});

deleteMealModal.addEventListener("click", (event) => {
    if (event.target === deleteMealModal) {
        deleteMealModal.style.display = "none";
        deletingMealId = null;
    }
});

displayMeals();

