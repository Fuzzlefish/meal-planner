/* =========================================================
SHOPPING LIST
========================================================= */


/* =========================================================
DOM
========================================================= */

const shoppingMealSelection =
    document.querySelector("#shoppingMealSelection");

const shoppingList =
    document.querySelector("#shoppingList");

const emptyShoppingMessage =
    document.querySelector("#emptyShoppingMessage");

const shoppingListSummary =
    document.querySelector("#shoppingListSummary");

const selectAllMealsButton =
    document.querySelector("#selectAllMealsButton");

const addShoppingItemButton =
    document.querySelector("#addShoppingItemButton");

const removeAllManualItemsButton =
    document.querySelector("#removeAllManualItemsButton");
const removeAllManualItemsModal =
    document.querySelector("#removeAllManualItemsModal");
const cancelRemoveAllManualItemsButton =
    document.querySelector("#cancelRemoveAllManualItemsButton");
const confirmRemoveAllManualItemsButton =
    document.querySelector("#confirmRemoveAllManualItemsButton");

const shoppingListViewControls =
    document.querySelector(".shoppingListViewControls");

const shoppingPage = document.querySelector("#shoppingPage");
const shoppingMode = document.querySelector("#shoppingMode");
const shoppingModeButton = document.querySelector("#shoppingModeButton");
const exitShoppingModeButton = document.querySelector("#exitShoppingModeButton");
const shoppingModeList = document.querySelector("#shoppingModeList");
const shoppingModeEmpty = document.querySelector("#shoppingModeEmpty");


/* =========================================================
MODAL
========================================================= */

const shoppingItemModal =
    document.querySelector("#shoppingItemModal");

const shoppingItemModalTitle =
    document.querySelector("#shoppingItemModalTitle");

const shoppingItemName =
    document.querySelector("#shoppingItemName");

const shoppingItemAmount =
    document.querySelector("#shoppingItemAmount");

const shoppingItemUnit =
    document.querySelector("#shoppingItemUnit");

const cancelShoppingItemButton =
    document.querySelector("#cancelShoppingItemButton");

const saveShoppingItemButton =
    document.querySelector("#saveShoppingItemButton");

const commonIngredientsSection =
    document.querySelector(
        "#commonIngredientsSection"
    );

const commonIngredientsToggle =
    document.querySelector(
        "#commonIngredientsToggle"
    );

const commonIngredientsArrow =
    document.querySelector(
        "#commonIngredientsArrow"
    );

const commonIngredientsList =
    document.querySelector(
        "#commonIngredientsList"
    );
/* =========================================================
DELETE MODAL
========================================================= */

const deleteShoppingItemModal =
    document.querySelector("#deleteShoppingItemModal");

const deleteShoppingItemMessage =
    document.querySelector("#deleteShoppingItemMessage");

const cancelDeleteShoppingItemButton =
    document.querySelector(
        "#cancelDeleteShoppingItemButton"
    );

const confirmDeleteShoppingItemButton =
    document.querySelector(
        "#confirmDeleteShoppingItemButton"
    );

/* =========================================================
COMMONLY USED INGREDIENTS
========================================================= */

const commonlyUsedShoppingItems = [

    "Milk",
    "Butter",
    "Cheese",
    "Eggs",
    "Bread",
    "Onions",
    "Garlic",
    "Bananas",
    "Tinned Tomatoes",
    "Toilet Paper",

];
/* =========================================================
STATE
========================================================= */

let editingShoppingItemId = null;

let deletingShoppingItemId = null;
let isShoppingMode = false;

removeAllManualItemsButton?.addEventListener("click", () => {
    removeAllManualItemsModal.style.display = "flex";
});

cancelRemoveAllManualItemsButton?.addEventListener("click", () => {
    removeAllManualItemsModal.style.display = "none";
});

confirmRemoveAllManualItemsButton?.addEventListener("click", () => {
    /* shoppingList stores manual entries only; meal-derived items are rebuilt
       from the current plan and therefore remain untouched. */
    saveShoppingItems([]);
    removeAllManualItemsModal.style.display = "none";
    renderShoppingList();
});

removeAllManualItemsModal?.addEventListener("click", event => {
    if (event.target === removeAllManualItemsModal) removeAllManualItemsModal.style.display = "none";
});


/* =========================================================
DAYS
========================================================= */

const shoppingDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];


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


function getShoppingItems() {

    return JSON.parse(
        localStorage.getItem("shoppingList")
    ) || [];

}


function saveShoppingItems(items) {

    localStorage.setItem(
        "shoppingList",
        JSON.stringify(items)
    );

}


function getMealPlanLeftovers() {

    return JSON.parse(
        localStorage.getItem("mealPlanLeftovers")
    ) || {};
}


function getShoppingListView() {

    return localStorage.getItem("shoppingListView") ||
        "grouped";
}


function saveShoppingListView(view) {

    localStorage.setItem("shoppingListView", view);
}


/* =========================================================
MEAL INGREDIENT STATUS STORAGE
========================================================= */

/*
 * Meal ingredients are generated from the selected meals,
 * rather than being stored inside shoppingList.
 *
 * Therefore we keep their bought/unavailable state
 * separately.
 */

function getShoppingMealStatuses() {

    return JSON.parse(
        localStorage.getItem(
            "shoppingMealStatuses"
        )
    ) || {};

}


function saveShoppingMealStatuses(statuses) {

    localStorage.setItem(
        "shoppingMealStatuses",
        JSON.stringify(statuses)
    );

}


/* =========================================================
MEAL SELECTION STORAGE
========================================================= */

function getShoppingMealSelection() {

    return JSON.parse(
        localStorage.getItem(
            "shoppingMealSelection"
        )
    ) || {};

}


function saveShoppingMealSelection(selection) {

    localStorage.setItem(
        "shoppingMealSelection",
        JSON.stringify(selection)
    );

}


/* =========================================================
MEAL PLAN HELPERS
========================================================= */

function capitalize(word) {

    return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
    );

}


function getPlannedMeals() {

    const plan =
        getMealPlan();

    const meals =
        getMeals();

    const leftovers = getMealPlanLeftovers();

    const plannedMeals = [];


    shoppingDays.forEach(
        (day) => {

            const dayPlan =
                plan[day];

            if (!dayPlan) {
                return;
            }


            ["lunch", "dinner"].forEach(
                (mealType) => {

                    if (leftovers[`${day}-${mealType}`] === true) {
                        return;
                    }

                    const mealId =
                        dayPlan[mealType];

                    if (!mealId) {
                        return;
                    }


                    const meal =
                        meals.find(
                            (item) =>
                                item.id ===
                                mealId
                        );


                    if (!meal) {
                        return;
                    }


                    plannedMeals.push({

                        key:
                            `${day}-${mealType}`,

                        day,

                        mealType,

                        meal

                    });

                }
            );

        }
    );


    return plannedMeals;

}


/* =========================================================
MEAL SELECTION
========================================================= */

function displayMealSelection() {

    if (!shoppingMealSelection) {
        return;
    }


    shoppingMealSelection.innerHTML = "";


    const plannedMeals =
        getPlannedMeals();


    if (plannedMeals.length === 0) {

        const message =
            document.createElement("p");

        message.className =
            "noPlannedMealsMessage";

        message.textContent =
            "You don't have any meals planned yet.";


        shoppingMealSelection.appendChild(
            message
        );

        return;

    }


    const selection =
        getShoppingMealSelection();


    let currentDay = null;


    plannedMeals.forEach(
        (plannedMeal) => {

            if (
                plannedMeal.day !==
                currentDay
            ) {

                currentDay =
                    plannedMeal.day;


                const dayHeading =
                    document.createElement(
                        "h3"
                    );

                dayHeading.className =
                    "shoppingDayHeading";

                dayHeading.textContent =
                    capitalize(
                        plannedMeal.day
                    );


                shoppingMealSelection
                    .appendChild(
                        dayHeading
                    );

            }


            const label =
                document.createElement(
                    "label"
                );

            label.className =
                "shoppingMealOption";


            const checkbox =
                document.createElement(
                    "input"
                );

            checkbox.type =
                "checkbox";


            checkbox.checked =
                selection[
                    plannedMeal.key
                ] === true;


            checkbox.addEventListener(
                "change",
                () => {

                    const currentSelection =
                        getShoppingMealSelection();


                    currentSelection[
                        plannedMeal.key
                    ] =
                        checkbox.checked;


                    saveShoppingMealSelection(
                        currentSelection
                    );


                    renderShoppingList();

                }
            );


            const content =
                document.createElement(
                    "div"
                );

            content.className =
                "shoppingMealContent";


            const mealName =
                document.createElement(
                    "strong"
                );

            mealName.textContent =
                plannedMeal.meal.name;


            const mealType =
                document.createElement(
                    "span"
                );

            mealType.textContent =
                capitalize(
                    plannedMeal.mealType
                );


            content.append(
                mealName,
                mealType
            );


            label.append(
                checkbox,
                content
            );


            shoppingMealSelection
                .appendChild(label);

        }
    );

}


/* =========================================================
SELECT ALL MEALS
========================================================= */

selectAllMealsButton?.addEventListener(
    "click",
    () => {

        const plannedMeals =
            getPlannedMeals();


        const selection =
            getShoppingMealSelection();


        const allSelected =
            plannedMeals.length > 0 &&
            plannedMeals.every(
                (plannedMeal) =>
                    selection[
                        plannedMeal.key
                    ] === true
            );


        plannedMeals.forEach(
            (plannedMeal) => {

                selection[
                    plannedMeal.key
                ] =
                    !allSelected;

            }
        );


        saveShoppingMealSelection(
            selection
        );


        displayMealSelection();

        renderShoppingList();

    }
);


/* =========================================================
GET SELECTED MEALS
========================================================= */

function getSelectedPlannedMeals() {

    const selection =
        getShoppingMealSelection();


    return getPlannedMeals().filter(
        (plannedMeal) =>
            selection[
                plannedMeal.key
            ] === true
    );

}


/* =========================================================
INGREDIENT NORMALISATION
========================================================= */

function normaliseIngredientName(name) {

    return getCanonicalIngredientName(
        name
    );
}


/* =========================================================
UNIT CONVERSION
========================================================= */

const unitConversions = {

    g: {
        base: "g",
        multiplier: 1
    },

    kg: {
        base: "g",
        multiplier: 1000
    },

    ml: {
        base: "ml",
        multiplier: 1
    },

    L: {
        base: "ml",
        multiplier: 1000
    },

    tsp: {
        base: "tsp",
        multiplier: 1
    },

    tbsp: {
        base: "tsp",
        multiplier: 3
    },

    cup: {
        base: "ml",
        multiplier: 240
    },

    piece: {
        base: "piece",
        multiplier: 1
    },

    clove: {
        base: "clove",
        multiplier: 1
    },

    slice: {
        base: "slice",
        multiplier: 1
    }

};


function convertAmount(
    amount,
    unit
) {

    const numericAmount =
        Number(amount);


    if (
        Number.isNaN(numericAmount) ||
        !unitConversions[unit]
    ) {

        return null;

    }


    return (
        numericAmount *
        unitConversions[unit].multiplier
    );

}


/* =========================================================
FORMAT AMOUNT
========================================================= */

function formatAmount(amount) {

    if (
        Number.isInteger(amount)
    ) {

        return String(amount);

    }


    return Number(
        amount.toFixed(2)
    ).toString();

}


/* =========================================================
FORMAT COMBINED UNIT
========================================================= */

function formatCombinedAmount(
    amount,
    baseUnit
) {

    if (baseUnit === "g") {

        if (amount >= 1000) {

            return `${formatAmount(
                amount / 1000
            )} kg`;

        }


        return `${formatAmount(amount)} g`;

    }


    if (baseUnit === "ml") {

        if (amount >= 1000) {

            return `${formatAmount(
                amount / 1000
            )} L`;

        }


        return `${formatAmount(amount)} ml`;

    }


    return `${formatAmount(amount)} ${baseUnit}`;

}


/* =========================================================
MEAL INGREDIENT STATUS KEY
========================================================= */

/*
 * Creates a stable key for an ingredient.
 *
 * This is important because Math.random() must NOT be used
 * for shopping item status keys. Otherwise the item would
 * receive a new identity every time the list renders.
 */

function getMealIngredientStatusKey(
    ingredient
) {

    const name =
        normaliseIngredientName(
            ingredient.name || ""
        );


    const unit =
        ingredient.baseUnit ||
        ingredient.unit ||
        "";


    return `${name}|${unit}`;

}


/* =========================================================
COMBINE INGREDIENTS
========================================================= */

function buildMealIngredients() {

    const selectedMeals =
        getSelectedPlannedMeals();


    const combined =
        new Map();


    selectedMeals.forEach(
        (plannedMeal) => {

            const ingredients =
                plannedMeal.meal.ingredients ||
                [];


            ingredients.forEach(
                (ingredient) => {

                    if (!ingredient.name) {
                        return;
                    }


                    const name =
                        getIngredientDisplayName(
                            ingredient.name
                        );


                    const key =
                        normaliseIngredientName(
                            name
                        );


                    const amount =
                        ingredient.amount;


                    const unit =
                        ingredient.unit || "";


                    const numericAmount =
                        convertAmount(
                            amount,
                            unit
                        );


                    /*
                     * Numeric ingredient with a
                     * known unit.
                     */

                    if (
                        numericAmount !== null
                    ) {

                        const conversion =
                            unitConversions[
                                unit
                            ];


                        if (
                            !combined.has(key)
                        ) {

                            combined.set(
                                key,
                                {

                                    name,

                                    amount:
                                        numericAmount,

                                    baseUnit:
                                        conversion.base,

                                    hasNumericAmount:
                                        true

                                }
                            );


                        } else {

                            const existing =
                                combined.get(
                                    key
                                );


                            if (
                                existing.hasNumericAmount &&
                                existing.baseUnit ===
                                    conversion.base
                            ) {

                                existing.amount +=
                                    numericAmount;

                            } else {

                                /*
                                 * Different incompatible
                                 * units get their own stable
                                 * key instead of Math.random().
                                 */

                                const separateKey =
                                    `${key}|${unit}`;


                                if (
                                    !combined.has(
                                        separateKey
                                    )
                                ) {

                                    combined.set(
                                        separateKey,
                                        {

                                            name,

                                            amount,

                                            unit,

                                            hasNumericAmount:
                                                false

                                        }
                                    );

                                }

                            }

                        }

                    } else {

                        /*
                         * Ingredients without a usable
                         * numeric amount.
                         */

                        const uniqueKey =
                            `${key}|${unit}`;


                        if (
                            !combined.has(
                                uniqueKey
                            )
                        ) {

                            combined.set(
                                uniqueKey,
                                {

                                    name,

                                    amount:
                                        amount || "",

                                    unit,

                                    hasNumericAmount:
                                        false

                                }
                            );

                        }

                    }

                }
            );

        }
    );


    return [...combined.values()];

}


/* =========================================================
SHOPPING STATUS HELPERS
========================================================= */

function getShoppingItemStatus(
    itemData,
    itemType
) {

    if (itemType === "manual") {

        return (
            itemData?.status ||
            "needed"
        );

    }


    if (itemType === "meal") {

        const statuses =
            getShoppingMealStatuses();


        const key =
            getMealIngredientStatusKey(
                itemData
            );


        return (
            statuses[key] ||
            "needed"
        );

    }


    return "needed";

}


/* =========================================================
SAVE SHOPPING ITEM STATUS
========================================================= */

function setShoppingItemStatus(
    itemData,
    itemType,
    status
) {

    if (itemType === "manual") {

        const items =
            getShoppingItems();


        const item =
            items.find(
                (currentItem) =>
                    currentItem.id ===
                    itemData.id
            );


        if (!item) {
            return;
        }


        item.status =
            status;


        saveShoppingItems(
            items
        );


        return;

    }


    if (itemType === "meal") {

        const statuses =
            getShoppingMealStatuses();


        const key =
            getMealIngredientStatusKey(
                itemData
            );


        statuses[key] =
            status;


        saveShoppingMealStatuses(
            statuses
        );

    }

}


/* =========================================================
NEXT SHOPPING STATUS
========================================================= */

function getNextShoppingStatus(
    currentStatus
) {

    if (
        currentStatus === "needed"
    ) {

        return "bought";

    }


    if (
        currentStatus === "bought"
    ) {

        return "unavailable";

    }


    return "needed";

}


/* =========================================================
APPLY SHOPPING STATUS DISPLAY
========================================================= */

function applyShoppingItemStatus(
    element,
    checkbox,
    status
) {

    /*
     * Remove any previous state.
     */

    element.classList.remove(
        "shoppingItemBought",
        "shoppingItemUnavailable"
    );


    checkbox.checked =
        status === "bought";


    checkbox.indeterminate =
        status === "unavailable";


    if (
        status === "bought"
    ) {

        element.classList.add(
            "shoppingItemBought"
        );

    }


    if (
        status === "unavailable"
    ) {

        element.classList.add(
            "shoppingItemUnavailable"
        );

    }

}


/* =========================================================
CREATE SHOPPING CHECKBOX
========================================================= */

function createShoppingCheckbox(
    itemData,
    itemType,
    parentElement
) {

    const checkbox =
        document.createElement("input");

    checkbox.type =
        "checkbox";

    checkbox.className =
        "shoppingCheckbox";


    const status =
        getShoppingItemStatus(
            itemData,
            itemType
        );


    checkbox.checked =
        status === "bought";


    checkbox.indeterminate =
        status === "unavailable";


    checkbox.addEventListener(
        "click",
        () => {

            const currentStatus =
                getShoppingItemStatus(
                    itemData,
                    itemType
                );


            const nextStatus =
                getNextShoppingStatus(
                    currentStatus
                );


            setShoppingItemStatus(
                itemData,
                itemType,
                nextStatus
            );


            /*
             * Immediately update the current
             * element if one was supplied.
             */

            if (parentElement) {

                applyShoppingItemStatus(
                    parentElement,
                    checkbox,
                    nextStatus
                );

            }


            /*
             * Re-render so everything remains
             * completely in sync.
             */

            refreshShoppingViews();

        }
    );


    return checkbox;

}


/* =========================================================
RENDER SHOPPING LIST
========================================================= */

function renderShoppingList() {

    if (!shoppingList) {
        return;
    }


    shoppingList.innerHTML = "";


    const manualItems =
        getShoppingItems();


    const mealIngredients =
        buildMealIngredients();


    const totalItems =
        manualItems.length +
        mealIngredients.length;


    if (emptyShoppingMessage) {

        emptyShoppingMessage.style.display =
            totalItems === 0
                ? "block"
                : "none";

    }


    if (shoppingListSummary) {

        if (totalItems === 0) {

            shoppingListSummary.textContent =
                "Nothing added yet.";

        } else {

            shoppingListSummary.textContent =
                `${totalItems} ${
                    totalItems === 1
                        ? "item"
                        : "items"
                }`;

        }

    }


    if (getShoppingListView() === "full") {

        mealIngredients.forEach(ingredient =>
            renderMealShoppingItem(ingredient, shoppingList)
        );

        manualItems.forEach(item =>
            renderManualShoppingItem(item, shoppingList)
        );

    } else {

        renderCategorisedShoppingList(
            mealIngredients,
            manualItems
        );
    }


    updateShoppingListViewControls();

}

function getShoppingModeMeasurement(ingredient, type) {
    if (type === "meal" && ingredient.hasNumericAmount) {
        return formatCombinedAmount(ingredient.amount, ingredient.baseUnit);
    }
    const amount = ingredient.amount ? `${ingredient.amount} ` : "";
    return `${amount}${ingredient.unit || ""}`.trim();
}

function renderShoppingModeItem(itemData, itemType, container) {
    const item = document.createElement("div");
    item.setAttribute("role", "button");
    item.tabIndex = 0;
    item.className = "shoppingModeItem";
    const status = getShoppingItemStatus(itemData, itemType);
    const checkbox = createShoppingCheckbox(itemData, itemType, item);
    checkbox.tabIndex = -1;
    const content = document.createElement("span");
    content.className = "shoppingItemContent";
    const name = document.createElement("span");
    name.className = "shoppingItemName";
    name.textContent = itemData.name;
    const measurement = document.createElement("span");
    measurement.className = "shoppingItemMeasurement";
    measurement.textContent = getShoppingModeMeasurement(itemData, itemType);
    content.append(name, measurement);
    item.append(checkbox, content);
    applyShoppingItemStatus(item, checkbox, status);
    item.addEventListener("click", event => {
        if (event.target === checkbox) return;
        checkbox.click();
    });
    item.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            checkbox.click();
        }
    });
    container.appendChild(item);
}

function renderShoppingMode() {
    if (!shoppingModeList || !shoppingModeEmpty) return;
    shoppingModeList.innerHTML = "";
    const mealItems = buildMealIngredients();
    const manualItems = getShoppingItems();
    const groups = new Map();
    const add = (item, type) => {
        const category = getShoppingCategory(item.name);
        if (!groups.has(category)) groups.set(category, []);
        groups.get(category).push({ item, type });
    };
    mealItems.forEach(item => add(item, "meal"));
    manualItems.forEach(item => add(item, "manual"));
    shoppingModeEmpty.hidden = groups.size !== 0;
    groups.forEach((items, category) => {
        const heading = document.createElement("h2");
        heading.className = "shoppingModeCategory";
        heading.textContent = category;
        shoppingModeList.appendChild(heading);
        items.forEach(({ item, type }) => renderShoppingModeItem(item, type, shoppingModeList));
    });
}

function refreshShoppingViews() {
    renderShoppingList();
    if (isShoppingMode) renderShoppingMode();
}

function setShoppingMode(active) {
    isShoppingMode = active;
    if (shoppingPage) shoppingPage.hidden = active;
    if (shoppingMode) shoppingMode.hidden = !active;
    if (active) renderShoppingMode();
    else renderShoppingList();
}

shoppingModeButton?.addEventListener("click", () => setShoppingMode(true));
exitShoppingModeButton?.addEventListener("click", () => setShoppingMode(false));


/* =========================================================
SHOPPING LIST CATEGORIES
========================================================= */

function getShoppingCategory(name) {

    const value = String(name || "").toLowerCase();

    if (/chicken|beef|pork|lamb|turkey|bacon|sausage|fish|salmon|tuna|prawn/.test(value)) {
        return "Meat & Fish";
    }

    if (/milk|cheese|butter|yoghurt|yogurt|cream|egg/.test(value)) {
        return "Dairy & Eggs";
    }

    if (/bread|bagel|wrap|pitta|pita|roll|pastry|tortilla/.test(value)) {
        return "Bakery";
    }

    if (/frozen|ice cream|chips|peas|pizza/.test(value)) {
        return "Frozen";
    }

    if (/tomato|onion|pepper|potato|carrot|broccoli|lettuce|salad|spinach|mushroom|cucumber|garlic|ginger|avocado|lemon|lime|apple|banana|berry|berries|grape|orange/.test(value)) {
        return "Fruit & Vegetables";
    }

    if (/tin|canned|beans|chickpea|lentil|stock|soup/.test(value)) {
        return "Tins & Jars";
    }

    if (/rice|pasta|noodle|flour|sugar|oil|vinegar|herb|spice|salt|peppercorn|cereal|sauce/.test(value)) {
        return "Cupboard";
    }

    return "Other";
}


function renderCategorisedShoppingList(mealIngredients, manualItems) {

    const categories = new Map();

    function add(category, type, item) {
        if (!categories.has(category)) {
            categories.set(category, []);
        }

        categories.get(category).push({ type, item });
    }

    mealIngredients.forEach(item =>
        add(getShoppingCategory(item.name), "meal", item)
    );

    manualItems.forEach(item =>
        add(getShoppingCategory(item.name), "manual", item)
    );

    const order = [
        "Fruit & Vegetables",
        "Meat & Fish",
        "Dairy & Eggs",
        "Bakery",
        "Frozen",
        "Tins & Jars",
        "Cupboard",
        "Other"
    ];

    order.forEach(category => {
        const items = categories.get(category);

        if (!items || items.length === 0) {
            return;
        }

        renderSectionHeading(category, shoppingList);

        items.forEach(({ type, item }) => {
            if (type === "meal") {
                renderMealShoppingItem(item, shoppingList);
            } else {
                renderManualShoppingItem(item, shoppingList);
            }
        });
    });
}


function updateShoppingListViewControls() {

    const view = getShoppingListView();

    shoppingListViewControls?.querySelectorAll("button")
        .forEach(button => {
            const active = button.dataset.shoppingView === view;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
}


shoppingListViewControls?.addEventListener("click", event => {

    const button = event.target.closest("button[data-shopping-view]");

    if (!button) {
        return;
    }

    saveShoppingListView(button.dataset.shoppingView);
    renderShoppingList();
});


/* =========================================================
SECTION HEADING
========================================================= */

function renderSectionHeading(text, container = shoppingList) {

    const heading =
        document.createElement("h3");


    heading.className =
        "shoppingListSectionHeading";


    heading.textContent =
        text;


    container.appendChild(
        heading
    );

}


/* =========================================================
DISPLAY MEAL INGREDIENT
========================================================= */

function renderMealShoppingItem(
    ingredient,
    container = shoppingList
) {

    const item =
        document.createElement("div");


    item.className =
        "shoppingListItem";


    /*
     * Get the current saved status.
     */

    const status =
        getShoppingItemStatus(
            ingredient,
            "meal"
        );


    /*
     * Create checkbox.
     */

    const checkbox =
        createShoppingCheckbox(
            ingredient,
            "meal",
            item
        );


    const content =
        document.createElement("div");


    content.className =
        "shoppingItemContent";


    const name =
        document.createElement("span");


    name.className =
        "shoppingItemName";


    name.textContent =
        ingredient.name;


    const measurement =
        document.createElement("span");


    measurement.className =
        "shoppingItemMeasurement";


    if (
        ingredient.hasNumericAmount
    ) {

        measurement.textContent =
            formatCombinedAmount(
                ingredient.amount,
                ingredient.baseUnit
            );

    } else {

        const amount =
            ingredient.amount
                ? `${ingredient.amount} `
                : "";


        const unit =
            ingredient.unit
                ? `${ingredient.unit} `
                : "";


        measurement.textContent =
            `${amount}${unit}`.trim();

    }


    content.append(
        name,
        measurement
    );


    item.append(
        checkbox,
        content
    );


    /*
     * Apply bought/unavailable styling.
     */

    applyShoppingItemStatus(
        item,
        checkbox,
        status
    );


    container.appendChild(
        item
    );

}


/* =========================================================
DISPLAY MANUAL ITEM
========================================================= */

function renderManualShoppingItem(
    itemData,
    container = shoppingList
) {

    const item =
        document.createElement("div");


    item.className =
        "shoppingListItem manualShoppingItem";


    const status =
        getShoppingItemStatus(
            itemData,
            "manual"
        );


    const checkbox =
        createShoppingCheckbox(
            itemData,
            "manual",
            item
        );


    const content =
        document.createElement("div");


    content.className =
        "shoppingItemContent";


    const name =
        document.createElement("span");


    name.className =
        "shoppingItemName";


    name.textContent =
        itemData.name;


    const measurement =
        document.createElement("span");


    measurement.className =
        "shoppingItemMeasurement";


    const amount =
        itemData.amount
            ? `${itemData.amount} `
            : "";


    const unit =
        itemData.unit
            ? itemData.unit
            : "";


    measurement.textContent =
        `${amount}${unit}`.trim();


    content.append(
        name,
        measurement
    );


    const actions =
        document.createElement("div");


    actions.className =
        "shoppingItemActions";


    const editButton =
        document.createElement("button");


    editButton.type =
        "button";


    editButton.textContent =
        "Edit";


    editButton.className =
        "shoppingEditButton";


    editButton.addEventListener(
        "click",
        () =>
            openEditShoppingItem(
                itemData.id
            )
    );


    const deleteButton =
        document.createElement("button");


    deleteButton.type =
        "button";


    deleteButton.textContent =
        "Delete";


    deleteButton.className =
        "shoppingDeleteButton";


    deleteButton.addEventListener(
        "click",
        () =>
            openDeleteShoppingItem(
                itemData.id
            )
    );


    actions.append(
        editButton,
        deleteButton
    );


    item.append(
        checkbox,
        content,
        actions
    );


    /*
     * Apply the same status styling
     * used for meal ingredients.
     */

    applyShoppingItemStatus(
        item,
        checkbox,
        status
    );


    container.appendChild(
        item
    );

}


/* =========================================================
ADD ITEM
========================================================= */

addShoppingItemButton?.addEventListener(
    "click",
    () => {

        editingShoppingItemId =
            null;

        commonIngredientsList.classList.remove(
            "open"
        );

        commonIngredientsToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        commonIngredientsArrow.textContent =
            "▸";


        shoppingItemModalTitle.textContent =
            "Add Shopping Item";


        shoppingItemName.value =
            "";


        shoppingItemAmount.value =
            "";


        shoppingItemUnit.value =
            "";


        shoppingItemModal.style.display =
            "flex";


        setTimeout(
            () =>
                shoppingItemName.focus(),
            50
        );

    }
);


/* =========================================================
EDIT ITEM
========================================================= */

function openEditShoppingItem(
    itemId
) {

    const item =
        getShoppingItems().find(
            (shoppingItem) =>
                shoppingItem.id ===
                itemId
        );


    if (!item) {
        return;
    }


    editingShoppingItemId =
        itemId;


    shoppingItemModalTitle.textContent =
        "Edit Shopping Item";


    shoppingItemName.value =
        item.name || "";


    shoppingItemAmount.value =
        item.amount || "";


    shoppingItemUnit.value =
        item.unit || "";


    shoppingItemModal.style.display =
        "flex";


    setTimeout(
        () => {

            shoppingItemName.focus();

            shoppingItemName.select();

        },
        50
    );

}


/* =========================================================
SAVE ITEM
========================================================= */

saveShoppingItemButton?.addEventListener(
    "click",
    saveShoppingItem
);


function saveShoppingItem() {

    const name =
        shoppingItemName.value.trim();


    if (!name) {

        alert(
            "Please enter an item."
        );


        shoppingItemName.focus();


        return;

    }


    const amount =
        shoppingItemAmount.value.trim();


    const unit =
        shoppingItemUnit.value;


    const items =
        getShoppingItems();


    if (
        editingShoppingItemId
    ) {

        const item =
            items.find(
                (shoppingItem) =>
                    shoppingItem.id ===
                    editingShoppingItemId
            );


        if (item) {

            item.name =
                name;


            item.amount =
                amount;


            item.unit =
                unit;

        }

    } else {

        items.push({

            id:
                crypto.randomUUID(),

            name,

            amount,

            unit,

            status:
                "needed",

            createdAt:
                new Date().toISOString()

        });

    }


    saveShoppingItems(
        items
    );


    closeShoppingItemModal();


    renderShoppingList();

}


/* =========================================================
CLOSE ITEM MODAL
========================================================= */

function closeShoppingItemModal() {

    if (shoppingItemModal) {

        shoppingItemModal.style.display =
            "none";

    }


    editingShoppingItemId =
        null;

}


/* =========================================================
CANCEL ITEM
========================================================= */

cancelShoppingItemButton?.addEventListener(
    "click",
    closeShoppingItemModal
);


/* =========================================================
DELETE ITEM
========================================================= */

function openDeleteShoppingItem(
    itemId
) {

    const item =
        getShoppingItems().find(
            (shoppingItem) =>
                shoppingItem.id ===
                itemId
        );


    if (!item) {
        return;
    }


    deletingShoppingItemId =
        itemId;


    deleteShoppingItemMessage.textContent =
        `Are you sure you want to delete "${item.name}"?`;


    deleteShoppingItemModal.style.display =
        "flex";

}


function closeDeleteShoppingItemModal() {

    deleteShoppingItemModal.style.display =
        "none";


    deletingShoppingItemId =
        null;

}


cancelDeleteShoppingItemButton?.addEventListener(
    "click",
    closeDeleteShoppingItemModal
);


confirmDeleteShoppingItemButton?.addEventListener(
    "click",
    () => {

        if (
            !deletingShoppingItemId
        ) {
            return;
        }


        const items =
            getShoppingItems();


        const updatedItems =
            items.filter(
                (item) =>
                    item.id !==
                    deletingShoppingItemId
            );


        saveShoppingItems(
            updatedItems
        );


        closeDeleteShoppingItemModal();


        renderShoppingList();

    }
);


/* =========================================================
MODAL BACKDROP CLOSING
========================================================= */

shoppingItemModal?.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            shoppingItemModal
        ) {

            closeShoppingItemModal();

        }

    }
);


deleteShoppingItemModal?.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            deleteShoppingItemModal
        ) {

            closeDeleteShoppingItemModal();

        }

    }
);


/* =========================================================
ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            shoppingItemModal?.style.display ===
            "flex"
        ) {

            closeShoppingItemModal();

        }


        if (
            deleteShoppingItemModal?.style.display ===
            "flex"
        ) {

            closeDeleteShoppingItemModal();

        }

    }
);


/* =========================================================
ENTER TO SAVE
========================================================= */

shoppingItemName?.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            saveShoppingItem();

        }

    }
);


/* =========================================================
REFRESH WHEN PAGE BECOMES VISIBLE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            displayMealSelection();

            renderShoppingList();

        }

    }
);
/* =========================================================
COMMON INGREDIENTS DROPDOWN
========================================================= */

function renderCommonIngredients() {

    if (!commonIngredientsList) {
        return;
    }


    commonIngredientsList.innerHTML = "";


    commonlyUsedShoppingItems.forEach(
        (ingredientName) => {

            const row =
                document.createElement("div");

            row.className =
                "commonIngredientRow";


            const name =
                document.createElement("span");

            name.className =
                "commonIngredientName";

            name.textContent =
                ingredientName;


            const addButton =
                document.createElement("button");

            addButton.type =
                "button";

            addButton.className =
                "commonIngredientAddButton";

            addButton.textContent =
                "+";

            addButton.setAttribute(
                "aria-label",
                `Add ${ingredientName}`
            );


            addButton.addEventListener(
                "click",
                () => {

                    addCommonShoppingIngredient(
                        ingredientName
                    );

                }
            );


            row.append(
                name,
                addButton
            );


            commonIngredientsList.appendChild(
                row
            );

        }
    );

}
/* =========================================================
ADD COMMON INGREDIENT
========================================================= */

function addCommonShoppingIngredient(
    ingredientName
) {

    const items =
        getShoppingItems();


    const normalisedName =
        normaliseIngredientName(
            ingredientName
        );


    const alreadyExists =
        items.some(
            (item) =>
                normaliseIngredientName(
                    item.name
                ) === normalisedName
        );


    if (alreadyExists) {

        /*
         * The ingredient is already
         * on the shopping list.
         */

        return;

    }


    items.push({

        id:
            crypto.randomUUID(),

        name:
            ingredientName,

        amount:
            "",

        unit:
            "",

        status:
            "needed",

        createdAt:
            new Date().toISOString()

    });


    saveShoppingItems(
        items
    );


    renderShoppingList();

}
/* =========================================================
TOGGLE COMMON INGREDIENTS
========================================================= */

commonIngredientsToggle?.addEventListener(
    "click",
    () => {

        const isOpen =
            commonIngredientsList.classList.contains(
                "open"
            );


        if (isOpen) {

            commonIngredientsList.classList.remove(
                "open"
            );

            commonIngredientsToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            commonIngredientsArrow.textContent =
                "▸";

        } else {

            commonIngredientsList.classList.add(
                "open"
            );

            commonIngredientsToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            commonIngredientsArrow.textContent =
                "▾";

        }

    }
);
/* =========================================================
INITIALISE
========================================================= */

displayMealSelection();

renderShoppingList();

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

renderCommonIngredients();

