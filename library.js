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
   MEAL FILTER
========================================================= */

const mealFilterWrapper =
    document.createElement("div");

mealFilterWrapper.className =
    "mealFilterWrapper";


const mealFilterButton =
    document.createElement("button");

mealFilterButton.type =
    "button";

mealFilterButton.className =
    "mealFilterButton";

mealFilterButton.setAttribute(
    "aria-label",
    "Filter meals"
);

mealFilterButton.setAttribute(
    "aria-expanded",
    "false"
);

mealFilterButton.innerHTML = `
    <span class="mealFilterButtonText">All meals</span>
    <span class="mealFilterArrow">▼</span>
`;


const mealFilterOptions =
    document.createElement("div");

mealFilterOptions.className =
    "mealFilterOptions";


/* =========================================================
   ALL MEALS OPTION
========================================================= */

const allMealsOption =
    document.createElement("button");

allMealsOption.type =
    "button";

allMealsOption.className =
    "mealFilterOption allMealsFilter";

allMealsOption.dataset.value =
    "";

allMealsOption.innerHTML = `
    <span>All meals</span>
`;

mealFilterOptions.appendChild(
    allMealsOption
);


/* =========================================================
   TAG OPTIONS
========================================================= */

document
    .querySelectorAll(".mealTag")
    .forEach(
        checkbox => {

            const option =
                document.createElement("button");

            option.type =
                "button";

            option.className =
                "mealFilterOption";

            option.dataset.value =
                checkbox.value;


            const tagClass =
                checkbox.value
                    .toLowerCase()
                    .replace(
                        /\s+/g,
                        "-"
                    );


            option.innerHTML = `
                <span class="mealFilterBubble tag-${tagClass}">
                    ${checkbox.value}
                </span>
            `;


            option.addEventListener(
                "click",
                () => {

                    setMealFilter(
                        checkbox.value
                    );
                }
            );


            mealFilterOptions.appendChild(
                option
            );
        }
    );


/* =========================================================
   BUILD FILTER
========================================================= */

mealFilterWrapper.append(
    mealFilterButton,
    mealFilterOptions
);


if (mealList?.parentNode) {

    mealList.parentNode.insertBefore(
        mealFilterWrapper,
        mealList
    );
}


/* =========================================================
   FILTER STATE
========================================================= */

let currentMealFilter = "";
let currentIngredientSearch = "";
let mealLibraryView = "list";
let librarySearchMode = "ingredient";

const librarySearchControls = document.createElement("div");
librarySearchControls.className = "mealSearchControls";
librarySearchControls.innerHTML = `
    <div class="ingredientNameWrapper mealIngredientSearchWrapper">
        <input type="search" class="ingredientMealSearch" placeholder="Search by ingredient" autocomplete="off">
        <div class="ingredientSuggestions"></div>
    </div>
    <div class="mealViewControls" role="group" aria-label="Search mode">
        <button type="button" data-search-mode="ingredient" aria-pressed="true">Ingredient</button>
        <button type="button" data-search-mode="name" aria-pressed="false">Meal name</button>
    </div>
    <div class="mealViewControls" aria-label="Meal Library view">
        <button type="button" data-view="list" aria-pressed="true">List</button>
        <button type="button" data-view="grid" aria-pressed="false">Grid</button>
    </div>
`;

mealFilterWrapper.insertAdjacentElement("afterend", librarySearchControls);

const libraryIngredientSearch = librarySearchControls.querySelector("input");
const librarySuggestionBox = librarySearchControls.querySelector(".ingredientSuggestions");

function normaliseIngredientForSearch(value) {
    return typeof getCanonicalIngredientName === "function"
        ? getCanonicalIngredientName(value)
        : String(value || "").trim().toLowerCase();
}

function mealMatchesIngredient(meal, query) {
    const search = normaliseIngredientForSearch(query);

    if (!search) {
        return true;
    }

    return (meal.ingredients || []).some(ingredient => {
        const ingredientName = normaliseIngredientForSearch(ingredient.name);
        return ingredientName.includes(search) || search.includes(ingredientName);
    });
}

function mealMatchesSearch(meal, query) {
    if (librarySearchMode === "ingredient") return mealMatchesIngredient(meal, query);
    return String(meal.name || "").toLowerCase().includes(String(query || "").trim().toLowerCase());
}

function getLibraryMealNameSuggestions(value) {
    const search = String(value || "").trim().toLowerCase();
    if (search.length < 2) return [];
    return getMeals().filter(meal => String(meal.name || "").toLowerCase().includes(search)).slice(0, 6);
}

function setupMealIngredientSearch(input, suggestionBox, onSearch) {
    let timeout = null;
    let hasFocused = false;
    const hideSuggestions = () => {
        suggestionBox.innerHTML = "";
        suggestionBox.style.display = "none";
    };

    hideSuggestions();

    input.addEventListener("input", () => {
        clearTimeout(timeout);
        onSearch(input.value);
        hideSuggestions();

        timeout = setTimeout(() => {
            const value = input.value.trim();
            const suggestions = librarySearchMode === "ingredient" && typeof findIngredientSuggestions === "function"
                ? findIngredientSuggestions(value)
                : librarySearchMode === "name" ? getLibraryMealNameSuggestions(value) : [];

            if (!hasFocused || document.activeElement !== input || value.length < 2 || suggestions.length === 0) {
                return;
            }

            const title = document.createElement("div");
            title.className = "ingredientSuggestionTitle";
            title.textContent = librarySearchMode === "ingredient" ? "Ingredients" : "Meals";
            suggestionBox.appendChild(title);

            suggestions.forEach(suggestion => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "ingredientSuggestion";
                button.textContent = librarySearchMode === "ingredient" ? getIngredientDisplayName(suggestion) : suggestion.name;
                button.addEventListener("pointerdown", event => {
                    event.preventDefault();
                    input.value = librarySearchMode === "ingredient" ? getIngredientDisplayName(suggestion) : suggestion.name;
                    hideSuggestions();
                    onSearch(input.value);
                });
                suggestionBox.appendChild(button);
            });
            suggestionBox.style.display = "block";
        }, 200);
    });

    input.addEventListener("focus", () => { hasFocused = true; });
    input.addEventListener("blur", () => setTimeout(hideSuggestions, 200));
}

setupMealIngredientSearch(libraryIngredientSearch, librarySuggestionBox, value => {
    currentIngredientSearch = value.trim();
    displayMeals();
});

librarySearchControls.querySelectorAll("button[data-search-mode]").forEach(button => {
    button.addEventListener("click", () => {
        librarySearchMode = button.dataset.searchMode;
        librarySearchControls.querySelectorAll("button[data-search-mode]").forEach(control =>
            control.setAttribute("aria-pressed", String(control === button))
        );
        libraryIngredientSearch.placeholder = librarySearchMode === "ingredient" ? "Search by ingredient" : "Search by meal name";
        displayMeals();
    });
});

librarySearchControls.querySelector(".mealViewControls").addEventListener("click", event => {
    const button = event.target.closest("button[data-view]");
    if (!button) return;
    mealLibraryView = button.dataset.view;
    librarySearchControls.querySelectorAll("button[data-view]").forEach(control => {
        control.setAttribute("aria-pressed", String(control === button));
    });
    displayMeals();
});


function setMealFilter(value) {

    currentMealFilter =
        value;


    const buttonText =
        mealFilterButton.querySelector(
            ".mealFilterButtonText"
        );


    buttonText.textContent =
        value || "All meals";


    /*
     * Give the closed button the same
     * colour as the selected tag.
     */

    mealFilterButton.className =
        "mealFilterButton";


    if (value) {

        const tagClass =
            value
                .toLowerCase()
                .replace(
                    /\s+/g,
                    "-"
                );

        mealFilterButton.classList.add(
            `tag-${tagClass}`
        );
    }


    mealFilterOptions
        .classList.remove("open");

    mealFilterButton
        .setAttribute(
            "aria-expanded",
            "false"
        );


    displayMeals();
}


/* =========================================================
   OPEN / CLOSE
========================================================= */

mealFilterButton.addEventListener(
    "click",
    () => {

        const isOpen =
            mealFilterOptions.classList.toggle(
                "open"
            );


        mealFilterButton.setAttribute(
            "aria-expanded",
            isOpen
                ? "true"
                : "false"
        );
    }
);


/* =========================================================
   ALL MEALS
========================================================= */

allMealsOption.addEventListener(
    "click",
    () => {

        setMealFilter("");
    }
);


/* =========================================================
   CLOSE WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !mealFilterWrapper.contains(
                event.target
            )
        ) {

            mealFilterOptions
                .classList.remove("open");

            mealFilterButton
                .setAttribute(
                    "aria-expanded",
                    "false"
                );
        }
    }
);
``

/* =========================================================
   NORMALISATION MANAGER BUTTON
========================================================= */

if (addMealButton) {

    addMealButton.classList.add(
        "secondaryShoppingButton"
    );

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

function recordRecentMeal(mealId) {
    const history = (JSON.parse(localStorage.getItem("mealUsageHistory")) || [])
        .filter(entry => entry.mealId !== mealId);
    history.unshift({ mealId, usedAt: new Date().toISOString() });
    localStorage.setItem("mealUsageHistory", JSON.stringify(history.slice(0, 8)));
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
        recordRecentMeal(meal.id);

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


function setupIngredientSuggestions(
    input,
    suggestionBox
) {

    let timeout = null;
    let hasFocused = false;


    function hideSuggestions() {

        suggestionBox.innerHTML = "";
        suggestionBox.style.display = "none";
    }


    function showSuggestions() {

        suggestionBox.style.display = "block";
    }


    /* Start hidden */
    hideSuggestions();


    input.addEventListener(
        "input",
        () => {

            clearTimeout(timeout);

            hideSuggestions();


            timeout = setTimeout(
                () => {

                    const value =
                        input.value.trim();


                    if (!hasFocused || document.activeElement !== input || value.length < 2) {
                        return;
                    }


                    const suggestions =
                        findIngredientSuggestions(value);


                    if (suggestions.length === 0) {
                        return;
                    }


                    suggestionBox.innerHTML = "";


                    const title =
                        document.createElement("div");

                    title.className =
                        "ingredientSuggestionTitle";

                    title.textContent =
                        "Did you mean?";


                    suggestionBox.appendChild(title);


                    suggestions.forEach(
                        suggestion => {

                            const button =
                                document.createElement("button");


                            button.type = "button";

                            button.className =
                                "ingredientSuggestion";

                            button.textContent =
                                getIngredientDisplayName(
                                    suggestion
                                );


                            button.addEventListener(
                                "pointerdown",
                                event => {

                                    event.preventDefault();


                                    input.value =
                                        getIngredientDisplayName(
                                            suggestion
                                        );


                                    hideSuggestions();


                                    input.dispatchEvent(
                                        new Event(
                                            "change",
                                            {
                                                bubbles: true
                                            }
                                        )
                                    );
                                }
                            );


                            suggestionBox.appendChild(button);
                        }
                    );


                    showSuggestions();

                },
                200
            );
        }
    );


    input.addEventListener("focus", () => {
        hasFocused = true;
    });

    /* Clear suggestions when focus leaves */

    input.addEventListener(
        "blur",
        () => {

            setTimeout(
                () => {
                    hideSuggestions();
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


    const filteredMeals = meals.filter(meal =>
        (!currentMealFilter || (meal.tags || []).includes(currentMealFilter)) &&
        mealMatchesSearch(meal, currentIngredientSearch)
    );

    mealList.classList.toggle("mealGrid", mealLibraryView === "grid");

    if (filteredMeals.length === 0) {

        const message =
            document.createElement(
                "p"
            );

        message.textContent = meals.length === 0
            ? "You haven't added any meals yet."
            : "No meals match your filters.";

        mealList.appendChild(
            message
        );

        return;
    }


    filteredMeals.forEach(
        meal => {

            if (mealLibraryView === "grid") {
                const mealButton = document.createElement("button");
                mealButton.type = "button";
                mealButton.className = "mealGridItem";
                mealButton.textContent = meal.name;
                mealButton.addEventListener("click", () => openEditModal(meal.id));
                mealList.appendChild(mealButton);
                return;
            }

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


            const shareButton =
                createButton(
                    "Share",
                    () => shareMeal(meal)
                );


            mealItem.append(
                title,
                tagContainer,
                ingredientsButton,
                editButton,
                shareButton,
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
   SHARE / IMPORT MEALS
========================================================= */

function getShareableMeal(meal) {

    return {
        name: meal.name,
        tags: meal.tags || [],
        ingredients: (meal.ingredients || []).map(ingredient => ({
            amount: ingredient.amount || "",
            unit: ingredient.unit || "",
            name: ingredient.name || ""
        })),
        videoLink: meal.videoLink || "",
        favourite: Boolean(meal.favourite)
    };
}


function encodeMealForShare(meal) {

    const bytes = new TextEncoder().encode(JSON.stringify(meal));
    let binary = "";

    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}


function decodeSharedMeal(value) {

    try {
        const base64 = value
            .replace(/-/g, "+")
            .replace(/_/g, "/") +
            "=".repeat((4 - (value.length % 4)) % 4);
        const bytes = Uint8Array.from(atob(base64), char =>
            char.charCodeAt(0)
        );
        const meal = JSON.parse(new TextDecoder().decode(bytes));

        if (
            !meal ||
            typeof meal.name !== "string" ||
            !meal.name.trim() ||
            !Array.isArray(meal.ingredients)
        ) {
            return null;
        }

        return meal;

    } catch {
        return null;
    }
}


async function shareMeal(meal) {

    const link = `${location.origin}${location.pathname}` +
        `#import-meal=${encodeMealForShare(getShareableMeal(meal))}`;

    try {
        if (navigator.share) {
            await navigator.share({
                title: meal.name,
                text: `Add ${meal.name} to your Meal Planner`,
                url: link
            });
            return;
        }

        await navigator.clipboard.writeText(link);
        alert("Meal link copied to your clipboard.");

    } catch (error) {
        if (error.name !== "AbortError") {
            window.prompt("Copy this meal link:", link);
        }
    }
}


function clearSharedMealHash() {

    history.replaceState(
        null,
        "",
        `${location.pathname}${location.search}`
    );
}


function offerSharedMealImport() {

    const prefix = "#import-meal=";

    if (!location.hash.startsWith(prefix)) {
        return;
    }

    const meal = decodeSharedMeal(location.hash.slice(prefix.length));

    if (!meal) {
        clearSharedMealHash();
        alert("That meal link could not be read.");
        return;
    }

    const modal = document.createElement("div");
    modal.className = "mealModal";
    modal.style.display = "flex";

    const content = document.createElement("div");
    content.className = "modalContent";

    const title = document.createElement("h2");
    title.textContent = "Add shared meal?";

    const message = document.createElement("p");
    message.textContent =
        `Add “${meal.name.trim()}” to your Meal Library?`;

    const details = document.createElement("p");
    details.textContent =
        `${meal.ingredients.length} ingredient${
            meal.ingredients.length === 1 ? "" : "s"
        } will be imported.`;

    const buttons = document.createElement("div");
    buttons.className = "modalButtons";

    const cancel = createButton("Cancel", () => {
        modal.remove();
        clearSharedMealHash();
    });

    const confirmImport = createButton("Add Meal", () => {
        const meals = getMeals();
        const imported = getShareableMeal(meal);
        const exists = meals.some(existing =>
            JSON.stringify(getShareableMeal(existing)) === JSON.stringify(imported)
        );
        if (exists) {
            modal.remove();
            clearSharedMealHash();
            alert("This meal is already in your Meal Library.");
            return;
        }
        meals.push({
            ...imported,
            id: crypto.randomUUID()
        });
        saveMeals(meals);
        modal.remove();
        clearSharedMealHash();
        displayMeals();
    });

    buttons.append(cancel, confirmImport);
    content.append(title, message, details, buttons);
    modal.appendChild(content);
    document.body.appendChild(modal);
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
offerSharedMealImport();

document.querySelectorAll(".mealModal > .modalContent").forEach(content => {
    if (content.querySelector(".modalCloseButton")) return;
    const close = document.createElement("button");
    close.type = "button";
    close.className = "modalCloseButton";
    close.textContent = "×";
    close.setAttribute("aria-label", "Close dialog");
    close.addEventListener("click", () => { content.parentElement.style.display = "none"; });
    content.prepend(close);
});
