const mealPlan = document.querySelector("#mealPlan");

const mealModal = document.querySelector("#mealModal");
const mealModalTitle = document.querySelector("#mealModalTitle");
const availableMeals = document.querySelector("#availableMeals");
const cancelMealButton = document.querySelector("#cancelMealButton");
const mealFilters = document.querySelector("#mealFilters");

const ingredientsModal = document.querySelector("#ingredientsModal");
const ingredientsModalTitle =
    document.querySelector("#ingredientsModalTitle");
const ingredientsList =
    document.querySelector("#ingredientsList");
const closeIngredientsButton =
    document.querySelector("#closeIngredientsButton");


/* =========================================================
   PRESETS
========================================================= */

const savePresetButton =
    document.querySelector("#savePresetButton");

const loadPresetsButton =
    document.querySelector("#loadPresetsButton");

const savePresetModal =
    document.querySelector("#savePresetModal");

const presetNameInput =
    document.querySelector("#presetNameInput");

const cancelPresetSaveButton =
    document.querySelector("#cancelPresetSaveButton");

const confirmPresetSaveButton =
    document.querySelector("#confirmPresetSaveButton");

const presetsModal =
    document.querySelector("#presetsModal");

const presetsList =
    document.querySelector("#presetsList");

const noPresetsMessage =
    document.querySelector("#noPresetsMessage");

const closePresetsButton =
    document.querySelector("#closePresetsButton");

const renamePresetModal =
    document.querySelector("#renamePresetModal");

const renamePresetInput =
    document.querySelector("#renamePresetInput");

const cancelRenamePresetButton =
    document.querySelector("#cancelRenamePresetButton");

const confirmRenamePresetButton =
    document.querySelector("#confirmRenamePresetButton");


/* =========================================================
   STATE
========================================================= */

let selectedDay = null;
let selectedMealType = null;
let selectedCategory = "all";

let renamingPresetId = null;


/* =========================================================
   STORAGE
========================================================= */

function getMeals() {
    return JSON.parse(
        localStorage.getItem("meals")
    ) || [];
}


function getMealPlan() {
    return JSON.parse(
        localStorage.getItem("mealPlan")
    ) || {};
}


function saveMealPlan(plan) {
    localStorage.setItem(
        "mealPlan",
        JSON.stringify(plan)
    );
}


/* Leftovers are kept separately so existing saved meal plans stay compatible. */
function getMealPlanLeftovers() {

    return JSON.parse(
        localStorage.getItem("mealPlanLeftovers")
    ) || {};
}


function saveMealPlanLeftovers(leftovers) {

    localStorage.setItem(
        "mealPlanLeftovers",
        JSON.stringify(leftovers)
    );
}


function getMealPlanSlotKey(day, mealType) {

    return `${day}-${mealType}`;
}


function getPresets() {
    return JSON.parse(
        localStorage.getItem("weekPresets")
    ) || [];
}


function savePresets(presets) {
    localStorage.setItem(
        "weekPresets",
        JSON.stringify(presets)
    );
}


/* =========================================================
   ADD MEAL
========================================================= */

if (mealPlan) {

    mealPlan.addEventListener("click", (event) => {

        if (
            !event.target.classList.contains(
                "addMealButton"
            )
        ) {
            return;
        }

        const day =
            event.target.closest(".day");

        const meal =
            event.target.closest(".meal");

        if (!day || !meal || !mealModal) {
            return;
        }

        selectedDay = day.id;

        selectedMealType =
            meal.querySelector("h3").textContent;

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


/* =========================================================
   FILTERS
========================================================= */

function displayFilters() {

    if (!mealFilters) {
        return;
    }

    mealFilters.innerHTML = "";

    const allButton =
        document.createElement("button");

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

        const button =
            document.createElement("button");

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

        const message =
            document.createElement("p");

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

        const button =
            document.createElement("button");

        button.classList.add(
            "availableMealButton"
        );

        button.textContent = meal.name;

        if (tags.length > 0) {

            const tagContainer =
                document.createElement("div");

            tagContainer.classList.add(
                "mealTags"
            );

            tags.forEach((tag) => {

                tagContainer.appendChild(
                    createTagElement(tag)
                );

            });

            button.appendChild(tagContainer);
        }

        button.addEventListener(
            "click",
            () => selectMeal(meal)
        );

        availableMeals.appendChild(button);

    });

}


if (mealFilters) {

    mealFilters.addEventListener(
        "click",
        (event) => {

            if (
                !event.target.classList.contains(
                    "filterButton"
                )
            ) {
                return;
            }

            selectedCategory =
                event.target.dataset.category;

            displayMeals();
        }
    );

}


/* =========================================================
   SELECT MEAL
========================================================= */

function selectMeal(meal) {

    const day =
        document.querySelector(
            `#${selectedDay}`
        );

    if (!day) {
        return;
    }

    const mealSections =
        day.querySelectorAll(".meal");

    let selectedMealSection = null;

    mealSections.forEach((section) => {

        const heading =
            section.querySelector("h3");

        if (
            heading &&
            heading.textContent ===
                selectedMealType
        ) {
            selectedMealSection = section;
        }

    });

    if (!selectedMealSection) {
        return;
    }

    const mealList =
        selectedMealSection.querySelector("ul");

    if (!mealList) {
        return;
    }

    const plan = getMealPlan();

    if (!plan[selectedDay]) {
        plan[selectedDay] = {};
    }

    const mealType =
        selectedMealType.toLowerCase();

    plan[selectedDay][mealType] =
        meal.id;

    const leftovers = getMealPlanLeftovers();
    delete leftovers[getMealPlanSlotKey(selectedDay, mealType)];
    saveMealPlanLeftovers(leftovers);

    saveMealPlan(plan);

    displaySavedMeal(
        selectedMealSection,
        meal
    );


    if (mealModal) {
        mealModal.style.display = "none";
    }

}


/* =========================================================
   REMOVE MEAL
========================================================= */

function removeMealFromPlan() {

    const day =
        document.querySelector(
            `#${selectedDay}`
        );

    if (!day) {
        return;
    }

    const mealSections =
        day.querySelectorAll(".meal");

    let selectedMealSection = null;

    mealSections.forEach((section) => {

        const heading =
            section.querySelector("h3");

        if (
            heading &&
            heading.textContent ===
                selectedMealType
        ) {
            selectedMealSection = section;
        }

    });

    if (!selectedMealSection) {
        return;
    }

    const mealList =
        selectedMealSection.querySelector("ul");

    if (mealList) {
        mealList.innerHTML = "";
    }

    const plan = getMealPlan();

    if (plan[selectedDay]) {

        plan[selectedDay][
            selectedMealType.toLowerCase()
        ] = null;

    }

    saveMealPlan(plan);

    const leftovers = getMealPlanLeftovers();
    delete leftovers[getMealPlanSlotKey(
        selectedDay,
        selectedMealType.toLowerCase()
    )];
    saveMealPlanLeftovers(leftovers);

}


/* =========================================================
   LOAD CURRENT MEAL PLAN
========================================================= */

function loadMealPlan() {

    const plan = getMealPlan();
    const meals = getMeals();

    Object.keys(plan).forEach((dayName) => {

        const dayPlan =
            plan[dayName];

        const dayElement =
            document.querySelector(
                `#${dayName}`
            );

        if (!dayElement) {
            return;
        }

        const mealSections =
            dayElement.querySelectorAll(
                ".meal"
            );

        mealSections.forEach((section) => {

            const heading =
                section.querySelector("h3");

            if (!heading) {
                return;
            }

            const mealType =
                heading.textContent.toLowerCase();

            const mealId =
                dayPlan[mealType];

            if (!mealId) {
                return;
            }

            const meal =
                meals.find(
                    (meal) =>
                        meal.id === mealId
                );

            if (!meal) {

                displayDeletedMeal(
                    section,
                    "Deleted meal"
                );

                return;
            }

            displaySavedMeal(
                section,
                meal
            );

        });

    });

}


/* =========================================================
   DISPLAY SAVED MEAL
========================================================= */

function displaySavedMeal(section, meal) {

    const mealList =
        section.querySelector("ul");

    if (!mealList) {
        return;
    }

    mealList.innerHTML = "";

    const listItem =
        document.createElement("li");

    listItem.textContent = meal.name;

    const dayName = section.closest(".day")?.id;
    const mealType = section.querySelector("h3")
        ?.textContent.toLowerCase();
    const leftoverKey = getMealPlanSlotKey(dayName, mealType);
    const leftovers = getMealPlanLeftovers();

    const leftoversLabel = document.createElement("label");
    leftoversLabel.className = "leftoversToggle";

    const leftoversCheckbox = document.createElement("input");
    leftoversCheckbox.type = "checkbox";
    leftoversCheckbox.checked = leftovers[leftoverKey] === true;

    leftoversLabel.append(
        leftoversCheckbox,
        document.createTextNode(" Leftovers from another meal")
    );

    listItem.classList.toggle(
        "isLeftovers",
        leftoversCheckbox.checked
    );

    leftoversCheckbox.addEventListener("change", () => {
        const updated = getMealPlanLeftovers();

        if (leftoversCheckbox.checked) {
            updated[leftoverKey] = true;
        } else {
            delete updated[leftoverKey];
        }

        saveMealPlanLeftovers(updated);
        listItem.classList.toggle(
            "isLeftovers",
            leftoversCheckbox.checked
        );
    });


    const ingredientsButton =
        document.createElement("button");

    ingredientsButton.textContent =
        "View Ingredients";

    ingredientsButton.classList.add(
        "viewIngredientsButton"
    );

    ingredientsButton.addEventListener(
        "click",
        () => openIngredientsModal(meal)
    );


    const removeButton =
        document.createElement("button");

    removeButton.textContent = "Remove";

    removeButton.classList.add(
        "removeMealButton"
    );

    removeButton.addEventListener(
        "click",
        () => {

            const day =
                section.closest(".day");

            if (!day) {
                return;
            }

            const dayName = day.id;

            const heading =
                section.querySelector("h3");

            if (!heading) {
                return;
            }

            const mealType =
                heading.textContent.toLowerCase();

            mealList.innerHTML = "";

            const plan =
                getMealPlan();

            if (plan[dayName]) {

                plan[dayName][mealType] =
                    null;

            }

            saveMealPlan(plan);

            const leftovers = getMealPlanLeftovers();
            delete leftovers[getMealPlanSlotKey(dayName, mealType)];
            saveMealPlanLeftovers(leftovers);

        }
    );


    listItem.appendChild(
        document.createElement("br")
    );

    listItem.appendChild(leftoversLabel);

    listItem.appendChild(
        document.createElement("br")
    );

    listItem.appendChild(
        ingredientsButton
    );

    listItem.appendChild(
        removeButton
    );

    mealList.appendChild(listItem);

}


/* =========================================================
   DELETED MEAL
========================================================= */

function displayDeletedMeal(
    section,
    mealName = "Deleted meal"
) {

    const mealList =
        section.querySelector("ul");

    if (!mealList) {
        return;
    }

    mealList.innerHTML = "";

    const listItem =
        document.createElement("li");

    listItem.classList.add(
        "deletedMealItem"
    );


    const name =
        document.createElement("span");

    name.textContent = mealName;


    const deletedTag =
        document.createElement("span");

    deletedTag.textContent = "Deleted";

    deletedTag.classList.add(
        "deletedMealTag"
    );


    const removeButton =
        document.createElement("button");

    removeButton.textContent = "Remove";

    removeButton.classList.add(
        "removeMealButton"
    );


    removeButton.addEventListener(
        "click",
        () => {

            const day =
                section.closest(".day");

            if (!day) {
                return;
            }

            const heading =
                section.querySelector("h3");

            if (!heading) {
                return;
            }

            const plan =
                getMealPlan();

            if (plan[day.id]) {

                plan[day.id][
                    heading.textContent.toLowerCase()
                ] = null;

            }

            saveMealPlan(plan);

            const leftovers = getMealPlanLeftovers();
            delete leftovers[getMealPlanSlotKey(dayName, mealType)];
            saveMealPlanLeftovers(leftovers);

            mealList.innerHTML = "";

        }
    );


    listItem.appendChild(name);
    listItem.appendChild(deletedTag);

    listItem.appendChild(
        document.createElement("br")
    );

    listItem.appendChild(
        removeButton
    );

    mealList.appendChild(listItem);

}


/* =========================================================
   INGREDIENTS MODAL
========================================================= */

function openIngredientsModal(meal) {

    if (
        !ingredientsModal ||
        !ingredientsModalTitle ||
        !ingredientsList
    ) {
        return;
    }

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

        ingredients.forEach((ingredient) => {

            const item =
                document.createElement("div");

            item.classList.add(
                "ingredientDisplay"
            );

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

        });

    }

    ingredientsModal.style.display =
        "flex";

}


if (closeIngredientsButton) {

    closeIngredientsButton.addEventListener(
        "click",
        () => {

            if (ingredientsModal) {
                ingredientsModal.style.display =
                    "none";
            }

        }
    );

}


if (ingredientsModal) {

    ingredientsModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                ingredientsModal
            ) {
                ingredientsModal.style.display =
                    "none";
            }

        }
    );

}


/* =========================================================
   SAVE PRESET
========================================================= */

if (savePresetButton) {

    savePresetButton.addEventListener(
        "click",
        () => {

            if (!savePresetModal) {
                return;
            }

            presetNameInput.value = "";

            savePresetModal.style.display =
                "flex";

            setTimeout(() => {
                presetNameInput.focus();
            }, 50);

        }
    );

}


if (cancelPresetSaveButton) {

    cancelPresetSaveButton.addEventListener(
        "click",
        () => {

            savePresetModal.style.display =
                "none";

        }
    );

}


if (confirmPresetSaveButton) {

    confirmPresetSaveButton.addEventListener(
        "click",
        saveCurrentWeekAsPreset
    );

}


if (presetNameInput) {

    presetNameInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                saveCurrentWeekAsPreset();

            }

        }
    );

}


function saveCurrentWeekAsPreset() {

    const name =
        presetNameInput.value.trim();

    if (!name) {

        alert(
            "Please enter a name for the preset."
        );

        presetNameInput.focus();

        return;
    }


    const plan =
        getMealPlan();

    const meals =
        getMeals();


    const presetPlan = {};


    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ];


    days.forEach((day) => {

        presetPlan[day] = {
            lunch: createPresetMeal(
                plan[day]?.lunch,
                meals
            ),

            dinner: createPresetMeal(
                plan[day]?.dinner,
                meals
            )
        };

    });


    const presets =
        getPresets();


    const preset = {

        id: crypto.randomUUID(),

        name: name,

        plan: presetPlan,

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    presets.push(preset);

    savePresets(presets);


    savePresetModal.style.display =
        "none";

}


function createPresetMeal(
    mealId,
    meals
) {

    if (!mealId) {
        return null;
    }

    const meal =
        meals.find(
            (meal) =>
                meal.id === mealId
        );

    return {

        mealId: mealId,

        mealName:
            meal
                ? meal.name
                : "Deleted meal"

    };

}


/* =========================================================
   OPEN PRESETS
========================================================= */

if (loadPresetsButton) {

    loadPresetsButton.addEventListener(
        "click",
        () => {

            displayPresets();

            presetsModal.style.display =
                "flex";

        }
    );

}


if (closePresetsButton) {

    closePresetsButton.addEventListener(
        "click",
        () => {

            presetsModal.style.display =
                "none";

        }
    );

}


function displayPresets() {

    if (!presetsList) {
        return;
    }

    presetsList.innerHTML = "";

    const presets =
        getPresets();


    if (presets.length === 0) {

        if (noPresetsMessage) {
            noPresetsMessage.style.display =
                "block";
        }

        return;
    }


    if (noPresetsMessage) {
        noPresetsMessage.style.display =
            "none";
    }


    presets
        .slice()
        .reverse()
        .forEach((preset) => {

            const card =
                document.createElement("div");

            card.classList.add(
                "presetCard"
            );


            const title =
                document.createElement("h3");

            title.textContent =
                preset.name;


            const date =
                document.createElement("small");

            date.textContent =
                formatPresetDate(
                    preset.updatedAt ||
                    preset.createdAt
                );


            const summary =
                createPresetSummary(
                    preset
                );


            const actions =
                document.createElement("div");

            actions.classList.add(
                "presetActions"
            );


            const loadButton =
                document.createElement("button");

            loadButton.textContent =
                "Load";

            loadButton.addEventListener(
                "click",
                () => loadPreset(preset.id)
            );


            const updateButton =
                document.createElement("button");

            updateButton.textContent =
                "Update";

            updateButton.classList.add(
                "secondaryPresetButton"
            );

            updateButton.addEventListener(
                "click",
                () =>
                    openUpdatePresetModal(
                        preset.id
                    )
            );

            const renameButton =
                document.createElement("button");

            renameButton.textContent =
                "Rename";

            renameButton.classList.add(
                "secondaryPresetButton"
            );

            renameButton.addEventListener(
                "click",
                () =>
                    openRenamePresetModal(
                        preset.id
                    )
            );


          
            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "Delete";

            deleteButton.classList.add(
                "dangerPresetButton"
            );

            deleteButton.addEventListener(
                "click",
                () =>
                    openDeletePresetModal(
                        preset.id
                    )
            );



            actions.append(
                loadButton,
                updateButton,
                renameButton,
                deleteButton
            );


            card.append(
                title,
                date,
                summary,
                actions
            );


            presetsList.appendChild(card);

        });

}


/* =========================================================
   PRESET SUMMARY
========================================================= */

function createPresetSummary(preset) {

    const summary =
        document.createElement("div");

    summary.classList.add(
        "presetSummary"
    );


    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ];


    days.forEach((day) => {

        const dayPlan =
            preset.plan?.[day] || {};


        const row =
            document.createElement("div");

        row.classList.add(
            "presetDay"
        );


        const dayName =
            document.createElement("strong");

        dayName.textContent =
            capitalize(day);


        const lunch =
            createPresetSummaryMeal(
                "Lunch",
                dayPlan.lunch
            );

        const dinner =
            createPresetSummaryMeal(
                "Dinner",
                dayPlan.dinner
            );


        row.append(
            dayName,
            lunch,
            dinner
        );

        summary.appendChild(row);

    });


    return summary;

}


function createPresetSummaryMeal(
    mealType,
    meal
) {

    const wrapper =
        document.createElement("div");

    wrapper.classList.add(
        "presetMeal"
    );


    const type =
        document.createElement("span");

    type.classList.add(
        "presetMealType"
    );

    type.textContent =
        `${mealType}:`;


    const name =
        document.createElement("span");


    if (!meal) {

        name.textContent =
            "No meal";

        name.classList.add(
            "emptyPresetMeal"
        );

    } else {

        name.textContent =
            meal.mealName ||
            "Deleted meal";

        const meals =
            getMeals();

        const exists =
            meals.some(
                (currentMeal) =>
                    currentMeal.id ===
                    meal.mealId
            );

        if (!exists) {

            const deletedTag =
                document.createElement(
                    "span"
                );

            deletedTag.textContent =
                "Deleted";

            deletedTag.classList.add(
                "deletedMealTag"
            );

            wrapper.append(
                type,
                name,
                deletedTag
            );

            return wrapper;
        }

    }


    wrapper.append(
        type,
        name
    );

    return wrapper;

}


/* =========================================================
   LOAD PRESET
========================================================= */

function loadPreset(presetId) {

    const presets =
        getPresets();

    const preset =
        presets.find(
            (item) =>
                item.id === presetId
        );

    if (!preset) {
        return;
    }


    const meals =
        getMeals();

    const newPlan = {};


    Object.keys(
        preset.plan || {}
    ).forEach((day) => {

        const dayPreset =
            preset.plan[day];


        newPlan[day] = {

            lunch:
                getMealIdFromPreset(
                    dayPreset.lunch,
                    meals
                ),

            dinner:
                getMealIdFromPreset(
                    dayPreset.dinner,
                    meals
                )

        };

    });


    saveMealPlan(newPlan);

    clearPlannerDisplay();

    loadMealPlan();


    if (presetsModal) {
        presetsModal.style.display =
            "none";
    }

}


/* =========================================================
   GET MEAL ID FROM PRESET
========================================================= */

function getMealIdFromPreset(
    presetMeal,
    meals
) {

    if (!presetMeal) {
        return null;
    }


    const exists =
        meals.some(
            (meal) =>
                meal.id ===
                presetMeal.mealId
        );


    if (!exists) {

        /*
         * Keep the ID here even when the
         * meal has been deleted.
         *
         * That lets us detect the deleted
         * state when rendering the planner.
         */

        return presetMeal.mealId;

    }


    return presetMeal.mealId;

}


/* =========================================================
   UPDATE PRESET
========================================================= */

function updatePresetFromCurrentWeek(
    presetId
) {

    const presets =
        getPresets();

    const preset =
        presets.find(
            (item) =>
                item.id === presetId
        );

    if (!preset) {
        return;
    }


    const plan =
        getMealPlan();

    const meals =
        getMeals();


    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ];


    const updatedPlan = {};


    days.forEach((day) => {

        updatedPlan[day] = {

            lunch:
                createPresetMeal(
                    plan[day]?.lunch,
                    meals
                ),

            dinner:
                createPresetMeal(
                    plan[day]?.dinner,
                    meals
                )

        };

    });


    preset.plan =
        updatedPlan;

    preset.updatedAt =
        new Date().toISOString();


    savePresets(presets);

    displayPresets();

}


/* =========================================================
   RENAME PRESET
========================================================= */

function openRenamePresetModal(
    presetId
) {

    const presets =
        getPresets();

    const preset =
        presets.find(
            (item) =>
                item.id === presetId
        );

    if (!preset) {
        return;
    }


    renamingPresetId =
        presetId;

    renamePresetInput.value =
        preset.name;

    renamePresetModal.style.display =
        "flex";

    setTimeout(() => {
        renamePresetInput.focus();
        renamePresetInput.select();
    }, 50);

}


if (cancelRenamePresetButton) {

    cancelRenamePresetButton.addEventListener(
        "click",
        () => {

            renamePresetModal.style.display =
                "none";

            renamingPresetId = null;

        }
    );

}


if (confirmRenamePresetButton) {

    confirmRenamePresetButton.addEventListener(
        "click",
        renamePreset
    );

}


if (renamePresetInput) {

    renamePresetInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                renamePreset();

            }

        }
    );

}


function renamePreset() {

    if (!renamingPresetId) {
        return;
    }


    const newName =
        renamePresetInput.value.trim();

    if (!newName) {

        alert(
            "Please enter a preset name."
        );

        return;
    }


    const presets =
        getPresets();

    const preset =
        presets.find(
            (item) =>
                item.id ===
                renamingPresetId
        );

    if (!preset) {
        return;
    }


    preset.name =
        newName;

    preset.updatedAt =
        new Date().toISOString();


    savePresets(presets);


    renamePresetModal.style.display =
        "none";

    renamingPresetId = null;

    displayPresets();

}

/* =========================================================
DELETE PRESET
========================================================= */

function deletePreset(presetId) {

    const presets = getPresets();

    const updatedPresets =
        presets.filter(
            (preset) =>
                preset.id !== presetId
        );

    savePresets(updatedPresets);

    displayPresets();
}

/* =========================================================
   DELETE PRESET MODAL
========================================================= */

const deletePresetModal =
    document.querySelector("#deletePresetModal");

const deletePresetMessage =
    document.querySelector("#deletePresetMessage");

const cancelDeletePresetButton =
    document.querySelector("#cancelDeletePresetButton");

const confirmDeletePresetButton =
    document.querySelector("#confirmDeletePresetButton");

let deletingPresetId = null;


/* ---------------------------------------------------------
   OPEN DELETE PRESET MODAL
--------------------------------------------------------- */

function openDeletePresetModal(presetId) {

    const preset =
        getPresets().find(
            (preset) =>
                preset.id === presetId
        );

    if (!preset) {
        return;
    }

    deletingPresetId = presetId;

    if (deletePresetMessage) {
        deletePresetMessage.textContent =
            `Are you sure you want to delete "${preset.name}"?`;
    }

    if (deletePresetModal) {
        deletePresetModal.style.display = "flex";
    }
}


/* ---------------------------------------------------------
   CLOSE DELETE PRESET MODAL
--------------------------------------------------------- */

function closeDeletePresetModal() {

    if (deletePresetModal) {
        deletePresetModal.style.display = "none";
    }

    deletingPresetId = null;
}


/* ---------------------------------------------------------
   CANCEL
--------------------------------------------------------- */

cancelDeletePresetButton?.addEventListener(
    "click",
    () => {
        closeDeletePresetModal();
    }
);


/* ---------------------------------------------------------
   CONFIRM DELETE
--------------------------------------------------------- */

confirmDeletePresetButton?.addEventListener(
    "click",
    () => {

        if (!deletingPresetId) {
            return;
        }

        const presetId =
            deletingPresetId;

        closeDeletePresetModal();

        deletePreset(presetId);
    }
);


/* ---------------------------------------------------------
   CLICK BACKDROP TO CLOSE
--------------------------------------------------------- */

deletePresetModal?.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            deletePresetModal
        ) {
            closeDeletePresetModal();
        }

    }
);

/* =========================================================
   CLEAR PLANNER DISPLAY
========================================================= */

function clearPlannerDisplay() {

    document
        .querySelectorAll(".meal ul")
        .forEach((list) => {

            list.innerHTML = "";

        });

}


/* =========================================================
   PRESET DATE
========================================================= */

function formatPresetDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date =
        new Date(dateString);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "";
    }

    return `Updated ${date.toLocaleDateString(
        undefined,
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    )}`;

}


/* =========================================================
   CANCEL ADD MEAL
========================================================= */

if (cancelMealButton) {

    cancelMealButton.addEventListener(
        "click",
        () => {

            if (mealModal) {
                mealModal.style.display =
                    "none";
            }

        }
    );

}


/* =========================================================
   MODAL BACKDROP CLOSING
========================================================= */

[
    mealModal,
    ingredientsModal,
    savePresetModal,
    presetsModal,
    renamePresetModal
].forEach((modal) => {

    if (!modal) {
        return;
    }

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {
                modal.style.display =
                    "none";

                if (
                    modal ===
                    renamePresetModal
                ) {
                    renamingPresetId =
                        null;
                }

            }

        }
    );

});


/* =========================================================
   UPDATE PRESET
========================================================= */
let presetToUpdate = null;

const updatePresetModal =
    document.getElementById("updatePresetModal");

const cancelUpdatePresetButton =
    document.getElementById(
        "cancelUpdatePresetButton"
    );

const confirmUpdatePresetButton =
    document.getElementById(
        "confirmUpdatePresetButton"
    );


function openUpdatePresetModal(presetId) {

    presetToUpdate = presetId;

    if (updatePresetModal) {
        updatePresetModal.style.display = "flex";
    }
}


function closeUpdatePresetModal() {

    presetToUpdate = null;

    if (updatePresetModal) {
        updatePresetModal.style.display = "none";
    }
}


if (cancelUpdatePresetButton) {

    cancelUpdatePresetButton.addEventListener(
        "click",
        closeUpdatePresetModal
    );

}


if (confirmUpdatePresetButton) {

    confirmUpdatePresetButton.addEventListener(
        "click",
        () => {

            if (!presetToUpdate) {
                return;
            }

            const presetId =
                presetToUpdate;

            closeUpdatePresetModal();

            updatePresetFromCurrentWeek(
                presetId
            );

        }
    );

}


if (updatePresetModal) {

    updatePresetModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                updatePresetModal
            ) {
                closeUpdatePresetModal();
            }

        }
    );

}



/* =========================================================
   HELPERS
========================================================= */

function capitalize(word) {

    return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
    );

}


function createTagElement(tag) {

    const tagElement =
        document.createElement("span");

    tagElement.textContent =
        tag;

    tagElement.classList.add(
        "mealTagDisplay"
    );

    const tagClass =
        tag
            .toLowerCase()
            .replace(/\s+/g, "-");

    tagElement.classList.add(
        `tag-${tagClass}`
    );

    return tagElement;

}


/* =========================================================
   COLLAPSIBLE DAYS
========================================================= */

document
    .querySelectorAll(".dayHeader")
    .forEach((header) => {

        header.addEventListener(
            "click",
            () => {

                const day =
                    header.closest(".day");

                if (!day) {
                    return;
                }

                day.classList.toggle(
                    "collapsed"
                );

            }
        );

    });


/* =========================================================
   INITIALISE
========================================================= */

loadMealPlan();
