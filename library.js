/* =========================================================
   LIBRARY
========================================================= */


/* =========================================================
   DOM
========================================================= */

const addMealButton =
    document.querySelector("#addMealButton");

const addMealForm =
    document.querySelector("#addMealForm");

const newMealName =
    document.querySelector("#newMealName");

const cancelMealButton =
    document.querySelector("#cancelMealButton");

const saveMealButton =
    document.querySelector("#saveMealButton");

const mealList =
    document.querySelector("#mealList");


const editMealModal =
    document.querySelector("#editMealModal");

const editMealName =
    document.querySelector("#editMealName");

const cancelEditButton =
    document.querySelector("#cancelEditButton");

const saveEditButton =
    document.querySelector("#saveEditButton");


const deleteMealModal =
    document.querySelector("#deleteMealModal");

const deleteMealMessage =
    document.querySelector("#deleteMealMessage");

const cancelDeleteButton =
    document.querySelector("#cancelDeleteButton");

const confirmDeleteButton =
    document.querySelector("#confirmDeleteButton");


const newMealIngredients =
    document.querySelector("#newMealIngredients");

const editMealIngredients =
    document.querySelector("#editMealIngredients");

const addIngredientButton =
    document.querySelector("#addIngredientButton");

const addEditIngredientButton =
    document.querySelector("#addEditIngredientButton");


const ingredientsModal =
    document.querySelector("#ingredientsModal");

const ingredientsModalTitle =
    document.querySelector("#ingredientsModalTitle");

const ingredientsList =
    document.querySelector("#ingredientsList");

const closeIngredientsButton =
    document.querySelector("#closeIngredientsButton");


const newMealVideoLink =
    document.querySelector("#newMealVideoLink");

const editMealVideoLink =
    document.querySelector("#editMealVideoLink");


let editingMealId = null;
let deletingMealId = null;


/* =========================================================
   NORMALISATION MANAGER BUTTON
========================================================= */

if (addMealButton) {

    const normalisationButton =
        document.createElement("button");

    normalisationButton.type =
        "button";

    normalisationButton.textContent =
        "Ingredient Cleanup";

    normalisationButton.className =
        "secondaryShoppingButton";

    normalisationButton.addEventListener(
        "click",
        openNormalisationManager
    );

    addMealButton.parentNode.insertBefore(
        normalisationButton,
        addMealButton.nextSibling
    );
}


/* =========================================================
   STORAGE
========================================================= */

function getMeals() {

    return JSON.parse(
        localStorage.getItem("meals")
    ) || [];
}


function saveMeals(meals) {

    localStorage.setItem(
        "meals",
        JSON.stringify(meals)
    );
}


/* =========================================================
   ADD MEAL
========================================================= */

addMealButton?.addEventListener(
    "click",
    () => {

        addMealForm.style.display =
            "block";


        if (tagsSection) {

            tagsSection.classList.add(
                "collapsed"
            );
        }


        if (tagArrow) {

            tagArrow.textContent =
                "▶";
        }


        newMealName.focus();
    }
);


cancelMealButton?.addEventListener(
    "click",
    () => {

        closeAddMealForm();
    }
);


function closeAddMealForm() {

    addMealForm.style.display =
        "none";

    newMealName.value =
        "";

    clearTagCheckboxes();

    newMealIngredients.innerHTML =
        "";

    if (newMealVideoLink) {

        newMealVideoLink.value =
            "";
    }
}


/* =========================================================
   ADD INGREDIENT
========================================================= */

addIngredientButton?.addEventListener(
    "click",
    () => {

        addIngredientRow(
            newMealIngredients
        );
    }
);


/* =========================================================
   SAVE NEW MEAL
========================================================= */

saveMealButton?.addEventListener(
    "click",
    () => {

        const mealName =
            newMealName.value.trim();


        if (!mealName) {

            alert(
                "Please enter a meal name."
            );

            return;
        }


        const meals =
            getMeals();


        const ingredients =
            getIngredients(
                newMealIngredients
            );


        const meal = {

            id:
                crypto.randomUUID(),

            name:
                mealName,

            tags:
                getSelectedTags(),

            ingredients:
                ingredients,

            videoLink:
                newMealVideoLink
                    ? newMealVideoLink.value.trim()
                    : ""
        };


        meals.push(meal);


        saveMeals(meals);

        closeAddMealForm();

        displayMeals();
    }
);


/* =========================================================
   INGREDIENT UNITS
========================================================= */

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


/* =========================================================
   ADD INGREDIENT ROW
========================================================= */

function addIngredientRow(
    container,
    ingredient = {}
) {

    const row =
        document.createElement("div");

    row.className =
        "ingredientRow";


    /* =====================================================
       AMOUNT
    ===================================================== */

    const amount =
        document.createElement("input");

    amount.type =
        "number";

    amount.min =
        "0";

    amount.step =
        "any";

    amount.placeholder =
        "Amount";

    amount.value =
        ingredient.amount || "";


    /* =====================================================
       UNIT
    ===================================================== */

    const unit =
        document.createElement("select");


    ingredientUnits.forEach(
        unitName => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                unitName;

            option.textContent =
                unitName || "Unit";

            unit.appendChild(
                option
            );
        }
    );


    unit.value =
        ingredient.unit || "";


    /* =====================================================
       INGREDIENT NAME
    ===================================================== */

    const nameWrapper =
        document.createElement("div");

    nameWrapper.className =
        "ingredientNameWrapper";


    const name =
        document.createElement("input");

    name.type =
        "text";

    name.placeholder =
        "Ingredient";

    name.value =
        ingredient.name || "";

    name.autocomplete =
        "off";


    const suggestionBox =
        document.createElement("div");

    suggestionBox.className =
        "ingredientSuggestions";


    nameWrapper.append(
        name,
        suggestionBox
    );


    /* =====================================================
       REMOVE
    ===================================================== */

    const remove =
        document.createElement("button");

    remove.type =
        "button";

    remove.className =
        "removeIngredientButton";

    remove.textContent =
        "×";


    remove.addEventListener(
        "click",
        () => {

            row.remove();
        }
    );


    /* =====================================================
       BUILD ROW
    ===================================================== */

    row.append(
        amount,
        unit,
        nameWrapper,
        remove
    );


    container.appendChild(
        row
    );


    /* =====================================================
       ENABLE SUGGESTIONS
    ===================================================== */

    setupIngredientSuggestions(
        name,
        suggestionBox
    );
}


/* =========================================================
   INGREDIENT SUGGESTIONS
========================================================= */

function setupIngredientSuggestions(
    input,
    suggestionBox
) {

    let timeout =
        null;


    input.addEventListener(
        "input",
        () => {

            clearTimeout(
                timeout
            );


            timeout =
                setTimeout(
                    () => {

                        const value =
                            input.value.trim();


                        if (
                            value.length < 2
                        ) {

                            suggestionBox.innerHTML =
                                "";

                            return;
                        }


                        const suggestions =
                            findIngredientSuggestions(
                                value
                            );


                        suggestionBox.innerHTML =
                            "";


                        if (
                            suggestions.length === 0
                        ) {

                            return;
                        }


                        const title =
                            document.createElement(
                                "div"
                            );

                        title.className =
                            "ingredientSuggestionTitle";

                        title.textContent =
                            "Did you mean?";


                        suggestionBox.appendChild(
                            title
                        );


                        suggestions.forEach(
                            suggestion => {

                                const button =
                                    document.createElement(
                                        "button"
                                    );


                                button.type =
                                    "button";


                                button.className =
                                    "ingredientSuggestion";


                                button.textContent =
                                    getIngredientDisplayName(
                                        suggestion
                                    );


                                button.addEventListener(
                                    "click",
                                    () => {

                                        const displayName =
                                            getIngredientDisplayName(
                                                suggestion
                                            );


                                        input.value =
                                            displayName;


                                        suggestionBox.innerHTML =
                                            "";


                                        input.dispatchEvent(
                                            new Event(
                                                "change"
                                            )
                                        );
                                    }
                                );


                                suggestionBox.appendChild(
                                    button
                                );
                            }
                        );

                    },
                    200
                );
        }
    );


    /* =====================================================
       CLEAR SUGGESTIONS WHEN FOCUS LEAVES
    ===================================================== */

    input.addEventListener(
        "blur",
        () => {

            setTimeout(
                () => {

                    suggestionBox.innerHTML =
                        "";

                },
                200
            );
        }
    );
}


/* =========================================================
   GET INGREDIENTS
========================================================= */

function getIngredients(
    container
) {

    return [
        ...container.querySelectorAll(
            ".ingredientRow"
        )
    ]

        .map(
            row => {

                const inputs =
                    row.querySelectorAll(
                        "input"
                    );


                const rawName =
                    inputs[1]
                        ? inputs[1].value.trim()
                        : "";


                /*
                 * We deliberately don't force
                 * normalisation here.
                 *
                 * This allows the user to type
                 * whatever they want and then
                 * use Ingredient Cleanup later.
                 * later.
                 */

                return {

                    amount:
                        inputs[0]
                            ? inputs[0].value.trim()
                            : "",

                    unit:
                        row.querySelector(
                            "select"
                        )?.value || "",

                    name:
                        rawName
                };
            }
        )

        .filter(
            ingredient =>
                ingredient.name
        );
}


/* =========================================================
   TAGS
========================================================= */

function getSelectedTags() {

    return [
        ...document.querySelectorAll(
            ".mealTag:checked"
        )
    ]

        .map(
            checkbox =>
                checkbox.value
        );
}


function clearTagCheckboxes() {

    document
        .querySelectorAll(
            ".mealTag"
        )
        .forEach(
            checkbox => {

                checkbox.checked =
                    false;
            }
        );
}


function getEditTags() {

    return [
        ...document.querySelectorAll(
            ".editMealTag:checked"
        )
    ]

        .map(
            checkbox =>
                checkbox.value
        );
}


function createTagElement(tag) {

    const tagElement =
        document.createElement(
            "span"
        );

    tagElement.textContent =
        tag;

    tagElement.className =
        "mealTagDisplay";


    const tagClass =
        tag
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            );


    tagElement.classList.add(
        `tag-${tagClass}`
    );


    return tagElement;
}


/* =========================================================
   COLLAPSIBLE TAGS
========================================================= */

const tagsToggle =
    document.querySelector(
        "#toggleTagsButton"
    );

const tagsSection =
    document.querySelector(
        "#mealTags"
    );

const tagArrow =
    document.querySelector(
        "#tagArrow"
    );


if (
    tagsToggle &&
    tagsSection
) {

    tagsToggle.addEventListener(
        "click",
        () => {

            const collapsed =
                tagsSection.classList.toggle(
                    "collapsed"
                );


            if (tagArrow) {

                tagArrow.textContent =
                    collapsed
                        ? "▶"
                        : "▼";
            }
        }
    );
}


/* =========================================================
   EDIT TAGS
========================================================= */

const editTagsToggle =
    document.querySelector(
        "#toggleEditTagsButton"
    );

const editTagsSection =
    document.querySelector(
        "#editMealTags"
    );

const editTagArrow =
    document.querySelector(
        "#editTagArrow"
    );


if (
    editTagsToggle &&
    editTagsSection
) {

    editTagsToggle.addEventListener(
        "click",
        () => {

            const collapsed =
                editTagsSection.classList.toggle(
                    "collapsed"
                );


            if (editTagArrow) {

                editTagArrow.textContent =
                    collapsed
                        ? "▶"
                        : "▼";
            }
        }
    );
}


/* =========================================================
   DISPLAY MEALS
========================================================= */

function displayMeals() {

    mealList.innerHTML =
        "";


    const meals =
        getMeals();


    if (
        meals.length === 0
    ) {

        const message =
            document.createElement(
                "p"
            );

        message.textContent =
            "You haven't added any meals yet.";

        mealList.appendChild(
            message
        );

        return;
    }


    meals.forEach(
        meal => {

            const mealItem =
                document.createElement(
                    "div"
                );

            mealItem.className =
                "mealItem";


            const title =
                document.createElement(
                    "h3"
                );

            title.textContent =
                meal.name;


            const tagContainer =
                document.createElement(
                    "div"
                );

            tagContainer.className =
                "mealTags";


            (
                meal.tags || []
            ).forEach(
                tag => {

                    tagContainer.appendChild(
                        createTagElement(
                            tag
                        )
                    );
                }
            );


            const ingredientsButton =
                createButton(
                    "View Ingredients",
                    () =>
                        openIngredientsModal(
                            meal
                        )
                );


            const editButton =
                createButton(
                    "Edit",
                    () =>
                        openEditModal(
                            meal.id
                        )
                );


            const deleteButton =
                createButton(
                    "Delete",
                    () =>
                        openDeleteModal(
                            meal.id
                        )
                );


            mealItem.append(
                title,
                tagContainer,
                ingredientsButton,
                editButton,
                deleteButton
            );


            /*
             * Recipe / video link
             */

            if (
                meal.videoLink
            ) {

                const linkButton =
                    document.createElement(
                        "button"
                    );

                linkButton.type =
                    "button";

                linkButton.textContent =
                    "Open Recipe / Video";


                linkButton.addEventListener(
                    "click",
                    () => {

                        window.open(
                            meal.videoLink,
                            "_blank",
                            "noopener,noreferrer"
                        );
                    }
                );


                mealItem.appendChild(
                    linkButton
                );
            }


            mealList.appendChild(
                mealItem
            );
        }
    );
}


/* =========================================================
   GENERIC BUTTON
========================================================= */

function createButton(
    text,
    action
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";

    button.textContent =
        text;


    button.addEventListener(
        "click",
        action
    );


    return button;
}


/* =========================================================
   EDIT MEAL
========================================================= */

function openEditModal(
    mealId
) {

    const meal =
        getMeals().find(
            meal =>
                meal.id === mealId
        );


    if (!meal) {
        return;
    }


    editingMealId =
        mealId;


    editMealName.value =
        meal.name;


    /*
     * Restore tags
     */

    document
        .querySelectorAll(
            ".editMealTag"
        )
        .forEach(
            checkbox => {

                checkbox.checked =
                    (
                        meal.tags || []
                    ).includes(
                        checkbox.value
                    );
            }
        );


    /*
     * Restore ingredients
     */

    editMealIngredients.innerHTML =
        "";


    (
        meal.ingredients || []
    ).forEach(
        ingredient => {

            addIngredientRow(
                editMealIngredients,
                ingredient
            );
        }
    );


    /*
     * Restore recipe/video link
     */

    if (editMealVideoLink) {

        editMealVideoLink.value =
            meal.videoLink || "";
    }


    /*
     * Open tags
     */

    if (editMealTags) {

        editMealTags.classList.remove(
            "collapsed"
        );
    }


    if (editTagArrow) {

        editTagArrow.textContent =
            "▼";
    }


    editMealModal.style.display =
        "flex";


    editMealName.focus();
}


addEditIngredientButton?.addEventListener(
    "click",
    () => {

        addIngredientRow(
            editMealIngredients
        );
    }
);


cancelEditButton?.addEventListener(
    "click",
    () => {

        closeEditModal();
    }
);


function closeEditModal() {

    editMealModal.style.display =
        "none";

    editingMealId =
        null;
}


/* =========================================================
   SAVE EDITED MEAL
========================================================= */

saveEditButton?.addEventListener(
    "click",
    () => {

        if (
            !editingMealId
        ) {
            return;
        }


        const newName =
            editMealName.value.trim();


        if (!newName) {

            alert(
                "Please enter a meal name."
            );

            return;
        }


        const meals =
            getMeals();


        const meal =
            meals.find(
                meal =>
                    meal.id ===
                    editingMealId
            );


        if (!meal) {
            return;
        }


        meal.name =
            newName;


        meal.tags =
            getEditTags();


        meal.ingredients =
            getIngredients(
                editMealIngredients
            );


        if (editMealVideoLink) {

            meal.videoLink =
                editMealVideoLink.value.trim();
        }


        saveMeals(
            meals
        );


        displayMeals();

        closeEditModal();
    }
);


/* =========================================================
   DELETE MEAL
========================================================= */

function openDeleteModal(
    mealId
) {

    const meal =
        getMeals().find(
            meal =>
                meal.id === mealId
        );


    if (!meal) {
        return;
    }


    deletingMealId =
        mealId;


    deleteMealMessage.textContent =
        `Are you sure you want to delete "${meal.name}"?`;


    deleteMealModal.style.display =
        "flex";
}


cancelDeleteButton?.addEventListener(
    "click",
    () => {

        closeDeleteModal();
    }
);


function closeDeleteModal() {

    deleteMealModal.style.display =
        "none";

    deletingMealId =
        null;
}


confirmDeleteButton?.addEventListener(
    "click",
    () => {

        if (
            !deletingMealId
        ) {
            return;
        }


        const meals =
            getMeals();


        const updatedMeals =
            meals.filter(
                meal =>
                    meal.id !==
                    deletingMealId
            );


        saveMeals(
            updatedMeals
        );


        displayMeals();

        closeDeleteModal();
    }
);


/* =========================================================
   INGREDIENTS MODAL
========================================================= */

function openIngredientsModal(
    meal
) {

    ingredientsModalTitle.textContent =
        meal.name;


    ingredientsList.innerHTML =
        "";


    const ingredients =
        meal.ingredients || [];


    if (
        ingredients.length === 0
    ) {

        const message =
            document.createElement(
                "p"
            );

        message.textContent =
            "No ingredients have been added.";

        ingredientsList.appendChild(
            message
        );

    } else {

        ingredients.forEach(
            ingredient => {

                const item =
                    document.createElement(
                        "div"
                    );

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


                const displayName =
                    getIngredientDisplayName(
                        ingredient.name
                    );


                item.textContent =
                    `${amount}${unit}${displayName}`;


                ingredientsList.appendChild(
                    item
                );
            }
        );
    }


    ingredientsModal.style.display =
        "flex";
}


closeIngredientsButton?.addEventListener(
    "click",
    () => {

        ingredientsModal.style.display =
            "none";
    }
);


ingredientsModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            ingredientsModal
        ) {

            ingredientsModal.style.display =
                "none";
        }
    }
);


/* =========================================================
   MODAL BACKDROP CLOSING
========================================================= */

editMealModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            editMealModal
        ) {

            closeEditModal();
        }
    }
);


deleteMealModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            deleteMealModal
        ) {

            closeDeleteModal();
        }
    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            editMealModal?.style.display ===
            "flex"
        ) {

            closeEditModal();
        }


        if (
            deleteMealModal?.style.display ===
            "flex"
        ) {

            closeDeleteModal();
        }


        if (
            ingredientsModal?.style.display ===
            "flex"
        ) {

            ingredientsModal.style.display =
                "none";
        }
    }
);


/* =========================================================
   INITIALISE
========================================================= */

displayMeals();
