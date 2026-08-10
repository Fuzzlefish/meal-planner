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

const newMealIngredients = document.querySelector("#newMealIngredients");
const editMealIngredients = document.querySelector("#editMealIngredients");
const addIngredientButton = document.querySelector("#addIngredientButton");
const addEditIngredientButton = document.querySelector("#addEditIngredientButton");

const ingredientsModal = document.querySelector("#ingredientsModal");
const ingredientsModalTitle = document.querySelector("#ingredientsModalTitle");
const ingredientsList = document.querySelector("#ingredientsList");
const closeIngredientsButton = document.querySelector("#closeIngredientsButton");

let editingMealId = null;
let deletingMealId = null;


/* =========================
   STORAGE
========================= */

function getMeals() {
    return JSON.parse(localStorage.getItem("meals")) || [];
}

function saveMeals(meals) {
    localStorage.setItem("meals", JSON.stringify(meals));
}


/* =========================
   ADD MEAL
========================= */

addMealButton?.addEventListener("click", () => {
    addMealForm.style.display = "block";

    // Make sure tags are open when the form opens
    if (tagsSection) {
        tagsSection.classList.remove("collapsed");
    }

    if (tagArrow) {
        tagArrow.textContent = "▼";
    }

    newMealName.focus();
});


cancelMealButton?.addEventListener("click", () => {
    closeAddMealForm();
});


function closeAddMealForm() {
    addMealForm.style.display = "none";
    newMealName.value = "";

    clearTagCheckboxes();

    newMealIngredients.innerHTML = "";

    // Reset tags to open for next meal
    if (tagsSection) {
        tagsSection.classList.remove("collapsed");
    }

    if (tagArrow) {
        tagArrow.textContent = "▼";
    }
}


addIngredientButton?.addEventListener("click", () => {
    addIngredientRow(newMealIngredients);
});


saveMealButton?.addEventListener("click", () => {
    const mealName = newMealName.value.trim();

    if (!mealName) {
        alert("Please enter a meal name.");
        return;
    }

    const meals = getMeals();

    meals.push({
        id: crypto.randomUUID(),
        name: mealName,
        tags: getSelectedTags(),
        ingredients: getIngredients(newMealIngredients)
    });

    saveMeals(meals);

    closeAddMealForm();
    displayMeals();
});


/* =========================
   INGREDIENTS
========================= */

const ingredientUnits = [
    "",
    "g",
    "kg",
    "ml",
    "L",
    "tsp",
    "tbsp",
    "cup",
    "piece",
    "clove",
    "slice"
];


function addIngredientRow(container, ingredient = {}) {
    const row = document.createElement("div");
    row.className = "ingredientRow";

    /* Amount */
    const amount = document.createElement("input");

    amount.type = "number";
    amount.min = "0";
    amount.step = "any";
    amount.placeholder = "Amount";
    amount.value = ingredient.amount || "";


    /* Unit */
    const unit = document.createElement("select");

    ingredientUnits.forEach((unitName) => {
        const option = document.createElement("option");

        option.value = unitName;
        option.textContent = unitName || "Unit";

        unit.appendChild(option);
    });

    unit.value = ingredient.unit || "";


    /* Ingredient name */
    const name = document.createElement("input");

    name.type = "text";
    name.placeholder = "Ingredient";
    name.value = ingredient.name || "";


    /* Remove button */
    const remove = document.createElement("button");

    remove.type = "button";
    remove.className = "removeIngredientButton";
    remove.textContent = "×";

    remove.addEventListener("click", () => {
        row.remove();
    });


    row.append(
        amount,
        unit,
        name,
        remove
    );

    container.appendChild(row);
}


function getIngredients(container) {
    return [...container.querySelectorAll(".ingredientRow")]
        .map((row) => {
            const inputs = row.querySelectorAll("input");

            return {
                amount: inputs[0].value.trim(),
                unit: row.querySelector("select").value,
                name: inputs[1].value.trim()
            };
        })
        .filter((ingredient) => ingredient.name);
}


/* =========================
   TAGS
========================= */

function getSelectedTags() {
    return [...document.querySelectorAll(".mealTag:checked")]
        .map((checkbox) => checkbox.value);
}


function clearTagCheckboxes() {
    document.querySelectorAll(".mealTag").forEach((checkbox) => {
        checkbox.checked = false;
    });
}


function getEditTags() {
    return [...document.querySelectorAll(".editMealTag:checked")]
        .map((checkbox) => checkbox.value);
}


function createTagElement(tag) {
    const tagElement = document.createElement("span");

    tagElement.textContent = tag;
    tagElement.className = "mealTagDisplay";

    const tagClass = tag
        .toLowerCase()
        .replace(/\s+/g, "-");

    tagElement.classList.add(`tag-${tagClass}`);

    return tagElement;
}


/* =========================
   COLLAPSIBLE TAGS
========================= */

/* ADD MEAL TAGS */

const tagsToggle =
    document.querySelector("#toggleTagsButton");

const tagsSection =
    document.querySelector("#mealTags");

const tagArrow =
    document.querySelector("#tagArrow");


if (tagsToggle && tagsSection) {
    tagsToggle.addEventListener("click", () => {
        const collapsed =
            tagsSection.classList.toggle("collapsed");

        if (tagArrow) {
            tagArrow.textContent =
                collapsed ? "▶" : "▼";
        }
    });
}


/* EDIT MEAL TAGS */

const editTagsToggle =
    document.querySelector("#toggleEditTagsButton");

const editTagsSection =
    document.querySelector("#editMealTags");

const editTagArrow =
    document.querySelector("#editTagArrow");


if (editTagsToggle && editTagsSection) {
    editTagsToggle.addEventListener("click", () => {
        const collapsed =
            editTagsSection.classList.toggle("collapsed");

        if (editTagArrow) {
            editTagArrow.textContent =
                collapsed ? "▶" : "▼";
        }
    });
}


/* =========================
   DISPLAY MEALS
========================= */

function displayMeals() {
    mealList.innerHTML = "";

    const meals = getMeals();


    if (meals.length === 0) {
        const message = document.createElement("p");

        message.textContent =
            "You haven't added any meals yet.";

        mealList.appendChild(message);

        return;
    }


    meals.forEach((meal) => {
        const mealItem =
            document.createElement("div");

        mealItem.className = "mealItem";


        const title =
            document.createElement("h3");

        title.textContent = meal.name;


        const tagContainer =
            document.createElement("div");

        tagContainer.className = "mealTags";


        (meal.tags || []).forEach((tag) => {
            tagContainer.appendChild(
                createTagElement(tag)
            );
        });


        const ingredientsButton =
            createButton(
                "View Ingredients",
                () => openIngredientsModal(meal)
            );


        const editButton =
            createButton(
                "Edit",
                () => openEditModal(meal.id)
            );


        const deleteButton =
            createButton(
                "Delete",
                () => openDeleteModal(meal.id)
            );


        mealItem.append(
            title,
            tagContainer,
            ingredientsButton,
            editButton,
            deleteButton
        );


        mealList.appendChild(mealItem);
    });
}


function createButton(text, action) {
    const button =
        document.createElement("button");

    button.type = "button";
    button.textContent = text;

    button.addEventListener(
        "click",
        action
    );

    return button;
}


/* =========================
   EDIT MEAL
========================= */

function openEditModal(mealId) {
    const meal =
        getMeals().find(
            (meal) => meal.id === mealId
        );


    if (!meal) {
        return;
    }


    editingMealId = mealId;

    editMealName.value = meal.name;


    /* Restore selected tags */
    document
        .querySelectorAll(".editMealTag")
        .forEach((checkbox) => {
            checkbox.checked =
                (meal.tags || [])
                    .includes(checkbox.value);
        });


    /* Restore ingredients */
    editMealIngredients.innerHTML = "";

    (meal.ingredients || []).forEach(
        (ingredient) => {
            addIngredientRow(
                editMealIngredients,
                ingredient
            );
        }
    );


    /* Reset edit tags to open */
    if (editTagsSection) {
        editTagsSection.classList.remove("collapsed");
    }

    if (editTagArrow) {
        editTagArrow.textContent = "▼";
    }


    editMealModal.style.display = "flex";

    editMealName.focus();
}


addEditIngredientButton?.addEventListener(
    "click",
    () => {
        addIngredientRow(editMealIngredients);
    }
);


cancelEditButton?.addEventListener(
    "click",
    () => {
        closeEditModal();
    }
);


function closeEditModal() {
    editMealModal.style.display = "none";

    editingMealId = null;
}


saveEditButton?.addEventListener(
    "click",
    () => {
        if (!editingMealId) {
            return;
        }


        const newName =
            editMealName.value.trim();


        if (!newName) {
            alert("Please enter a meal name.");
            return;
        }


        const meals = getMeals();


        const meal =
            meals.find(
                (meal) =>
                    meal.id === editingMealId
            );


        if (!meal) {
            return;
        }


        meal.name = newName;

        meal.tags = getEditTags();

        meal.ingredients =
            getIngredients(editMealIngredients);


        saveMeals(meals);

        displayMeals();

        closeEditModal();
    }
);


/* =========================
   DELETE MEAL
========================= */

function openDeleteModal(mealId) {
    const meal =
        getMeals().find(
            (meal) => meal.id === mealId
        );


    if (!meal) {
        return;
    }


    deletingMealId = mealId;


    deleteMealMessage.textContent =
        `Are you sure you want to delete "${meal.name}"?`;


    deleteMealModal.style.display = "flex";
}


cancelDeleteButton?.addEventListener(
    "click",
    () => {
        closeDeleteModal();
    }
);


function closeDeleteModal() {
    deleteMealModal.style.display = "none";

    deletingMealId = null;
}


confirmDeleteButton?.addEventListener(
    "click",
    () => {
        if (!deletingMealId) {
            return;
        }


        const meals = getMeals();


        const updatedMeals =
            meals.filter(
                (meal) =>
                    meal.id !== deletingMealId
            );


        saveMeals(updatedMeals);

        displayMeals();

        closeDeleteModal();
    }
);


/* =========================
   INGREDIENTS MODAL
========================= */

function openIngredientsModal(meal) {
    ingredientsModalTitle.textContent =
        meal.name;

    ingredientsList.innerHTML = "";


    const ingredients =
        meal.ingredients || [];


    if (ingredients.length === 0) {
        const message =
            document.createElement("p");

        message.textContent =
            "No ingredients have been added.";

        ingredientsList.appendChild(message);

    } else {
        ingredients.forEach(
            (ingredient) => {
                const item =
                    document.createElement("div");

                item.className =
                    "ingredientDisplay";


                const amount =
                    ingredient.amount
                        ? `${ingredient.amount} `
                        : "";


                const unit =
                    ingredient.unit
                        ? `${ingredient.unit} `
                        : "";


                item.textContent =
                    `${amount}${unit}${ingredient.name}`;


                ingredientsList.appendChild(item);
            }
        );
    }


    ingredientsModal.style.display = "flex";
}


closeIngredientsButton?.addEventListener(
    "click",
    () => {
        ingredientsModal.style.display = "none";
    }
);


ingredientsModal?.addEventListener(
    "click",
    (event) => {
        if (event.target === ingredientsModal) {
            ingredientsModal.style.display =
                "none";
        }
    }
);


/* =========================
   MODAL BACKDROP CLOSING
========================= */

editMealModal?.addEventListener(
    "click",
    (event) => {
        if (event.target === editMealModal) {
            closeEditModal();
        }
    }
);


deleteMealModal?.addEventListener(
    "click",
    (event) => {
        if (event.target === deleteMealModal) {
            closeDeleteModal();
        }
    }
);


/* =========================
   INITIALISE
========================= */

displayMeals();

