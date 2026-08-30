/* =========================================================
   INGREDIENT NORMALISATION
========================================================= */


/* =========================================================
   STORAGE KEY
========================================================= */

const INGREDIENT_NORMALISATION_KEY =
    "ingredientNormalisation";


/* =========================================================
   STORAGE
========================================================= */

function getIngredientNormalisation() {

    try {

        return JSON.parse(
            localStorage.getItem(
                INGREDIENT_NORMALISATION_KEY
            )
        ) || {};

    } catch (error) {

        console.error(
            "Could not read ingredient normalisation:",
            error
        );

        return {};
    }
}


function saveIngredientNormalisation(
    data
) {

    localStorage.setItem(
        INGREDIENT_NORMALISATION_KEY,
        JSON.stringify(data)
    );
}


/* =========================================================
   BASIC NORMALISATION
========================================================= */

function basicNormaliseIngredientName(
    name
) {

    return String(name || "")
        .trim()
        .toLowerCase()
        .replace(
            /\s+/g,
            " "
        );
}


/* =========================================================
   GET DISPLAY NAME
========================================================= */

function getIngredientDisplayName(
    name
) {

    const canonical =
        getCanonicalIngredientName(
            name
        );


    const mappings =
        getIngredientNormalisation();


    const data =
        mappings[canonical];


    /*
     * New format
     */

    if (
        data &&
        !Array.isArray(data) &&
        data.displayName
    ) {

        return data.displayName;
    }


    /*
     * Old format
     */

    if (
        data &&
        Array.isArray(data)
    ) {

        return canonical
            .replace(
                /\b\w/g,
                letter =>
                    letter.toUpperCase()
            );
    }


    /*
     * No mapping exists.
     */

    return String(name || "")
        .trim()
        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );
}


/* =========================================================
   GET CANONICAL NAME
========================================================= */

function getCanonicalIngredientName(
    name
) {

    const normalised =
        basicNormaliseIngredientName(
            name
        );


    if (!normalised) {

        return "";
    }


    const mappings =
        getIngredientNormalisation();


    /*
     * Direct canonical match.
     */

    if (
        mappings[normalised]
    ) {

        return normalised;
    }


    /*
     * Search aliases.
     */

    for (
        const canonical
        in mappings
    ) {

        const data =
            mappings[canonical];


        /*
         * Support old format:
         *
         * "bell pepper": [
         *     "pepper",
         *     "red pepper"
         * ]
         */

        if (
            Array.isArray(data)
        ) {

            const aliases =
                data.map(
                    alias =>
                        basicNormaliseIngredientName(
                            alias
                        )
                );


            if (
                aliases.includes(
                    normalised
                )
            ) {

                return canonical;
            }


            continue;
        }


        /*
         * New format.
         */

        const aliases =
            data.aliases || [];


        const normalisedAliases =
            aliases.map(
                alias =>
                    basicNormaliseIngredientName(
                        alias
                    )
            );


        if (
            normalisedAliases.includes(
                normalised
            )
        ) {

            return canonical;
        }
    }


    /*
     * No mapping.
     */

    return normalised;
}


/* =========================================================
   GET ALIASES
========================================================= */

function getAliasesForCanonical(
    canonical
) {

    const mappings =
        getIngredientNormalisation();


    const data =
        mappings[canonical];


    if (!data) {

        return [];
    }


    if (
        Array.isArray(data)
    ) {

        return data;
    }


    return data.aliases || [];
}


/* =========================================================
   GET ALL KNOWN INGREDIENT NAMES
========================================================= */

function getAllKnownIngredientNames() {

    const names =
        new Set();


    const mappings =
        getIngredientNormalisation();


    Object.entries(
        mappings
    ).forEach(
        ([canonical, data]) => {

            names.add(
                basicNormaliseIngredientName(
                    canonical
                )
            );


            if (
                Array.isArray(data)
            ) {

                data.forEach(
                    alias => {

                        names.add(
                            basicNormaliseIngredientName(
                                alias
                            )
                        );
                    }
                );

            } else {

                (
                    data.aliases || []
                ).forEach(
                    alias => {

                        names.add(
                            basicNormaliseIngredientName(
                                alias
                            )
                        );
                    }
                );
            }
        }
    );


    /*
     * Also collect ingredients
     * currently used by meals.
     */

    const meals =
        JSON.parse(
            localStorage.getItem(
                "meals"
            )
        ) || [];


    meals.forEach(
        meal => {

            (
                meal.ingredients || []
            ).forEach(
                ingredient => {

                    if (
                        ingredient.name
                    ) {

                        names.add(
                            basicNormaliseIngredientName(
                                ingredient.name
                            )
                        );
                    }
                }
            );
        }
    );


    return [
        ...names
    ];
}


/* =========================================================
   SAVE / UPDATE MAPPING
========================================================= */

function saveIngredientMapping(
    canonicalName,
    aliases
) {

    const canonical =
        basicNormaliseIngredientName(
            canonicalName
        );


    if (!canonical) {

        return false;
    }


    const mappings =
        getIngredientNormalisation();


    const cleanAliases =
        aliases

            .map(
                alias =>
                    basicNormaliseIngredientName(
                        alias
                    )
            )

            .filter(
                alias =>
                    alias &&
                    alias !== canonical
            );


    /*
     * Remove aliases which are already
     * being used as another canonical name.
     */

    Object.entries(
        mappings
    ).forEach(
        ([existingCanonical, data]) => {

            if (
                existingCanonical ===
                canonical
            ) {

                return;
            }


            const existingAliases =
                Array.isArray(data)
                    ? data
                    : (
                        data.aliases || []
                    );


            const cleaned =
                existingAliases.filter(
                    alias =>
                        !cleanAliases.includes(
                            basicNormaliseIngredientName(
                                alias
                            )
                        )
                );


            if (
                Array.isArray(data)
            ) {

                mappings[
                    existingCanonical
                ] = cleaned;

            } else {

                mappings[
                    existingCanonical
                ].aliases =
                    cleaned;
            }
        }
    );


    mappings[canonical] = {

        displayName:
            canonicalName.trim(),

        aliases:
            [
                ...new Set(
                    cleanAliases
                )
            ]
    };


    saveIngredientNormalisation(
        mappings
    );


    return true;
}


/* =========================================================
   DELETE MAPPING
========================================================= */

function deleteIngredientMapping(
    canonical
) {

    const mappings =
        getIngredientNormalisation();


    delete mappings[
        canonical
    ];


    saveIngredientNormalisation(
        mappings
    );
}


/* =========================================================
   LEVENSHTEIN DISTANCE
========================================================= */

function levenshteinDistance(
    a,
    b
) {

    const matrix =
        [];


    for (
        let i = 0;
        i <= b.length;
        i++
    ) {

        matrix[i] =
            [i];
    }


    for (
        let j = 0;
        j <= a.length;
        j++
    ) {

        matrix[0][j] =
            j;
    }


    for (
        let i = 1;
        i <= b.length;
        i++
    ) {

        for (
            let j = 1;
            j <= a.length;
            j++
        ) {

            if (
                b.charAt(i - 1) ===
                a.charAt(j - 1)
            ) {

                matrix[i][j] =
                    matrix[i - 1][j - 1];

            } else {

                matrix[i][j] =
                    Math.min(

                        matrix[i - 1][j - 1]
                            + 1,

                        matrix[i][j - 1]
                            + 1,

                        matrix[i - 1][j]
                            + 1
                    );
            }
        }
    }


    return matrix[
        b.length
    ][
        a.length
    ];
}


/* =========================================================
   FIND INGREDIENT SUGGESTIONS
========================================================= */

function findIngredientSuggestions(
    inputName
) {

    const input =
        basicNormaliseIngredientName(
            inputName
        );


    if (
        !input ||
        input.length < 2
    ) {

        return [];
    }


    const knownNames =
        getAllKnownIngredientNames();


    const suggestions =
        [];


    knownNames.forEach(
        name => {

            if (
                name === input
            ) {

                return;
            }


            const distance =
                levenshteinDistance(
                    input,
                    name
                );


            const maxLength =
                Math.max(
                    input.length,
                    name.length
                );


            const similarity =
                maxLength === 0
                    ? 0
                    :
                        1 -
                        (
                            distance /
                            maxLength
                        );


            /*
             * Partial matches catch:
             *
             * bell pepp
             * bell pepper
             */

            const partialMatch =
                name.includes(
                    input
                ) ||
                input.includes(
                    name
                );


            /*
             * Stronger match for
             * beginning of a word.
             */

            const startsWithMatch =
                name.startsWith(
                    input
                );


            if (
                similarity >= 0.65 ||
                partialMatch ||
                startsWithMatch
            ) {

                suggestions.push({

                    name,

                    similarity:
                        startsWithMatch
                            ? similarity + 0.15
                            : similarity
                });
            }
        }
    );


    /*
     * Highest similarity first.
     */

    suggestions.sort(
        (a, b) =>
            b.similarity -
            a.similarity
    );


    /*
     * Only show one suggestion
     * for each canonical ingredient.
     */

    const unique =
        [];


    suggestions.forEach(
        suggestion => {

            const canonical =
                getCanonicalIngredientName(
                    suggestion.name
                );


            if (
                !unique.some(
                    item =>
                        getCanonicalIngredientName(
                            item
                        ) === canonical
                )
            ) {

                unique.push(
                    suggestion.name
                );
            }
        }
    );


    return unique.slice(
        0,
        3
    );
}


/* =========================================================
   INGREDIENT CLEANUP SCANNER
========================================================= */

/* Only close spelling and formatting variations are proposed. */
function getIngredientComparisonName(name) {

    let comparison =
        basicNormaliseIngredientName(name)
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    return comparison.split(" ").map(word => {

        if (word.endsWith("ies") && word.length > 3) {
            return `${word.slice(0, -3)}y`;
        }

        if (word.endsWith("es") && word.length > 3) {
            return word.slice(0, -2);
        }

        if (word.endsWith("s") && word.length > 2) {
            return word.slice(0, -1);
        }

        return word;
    }).join(" ");
}


function getMealIngredientUsage() {

    const usage = new Map();

    (JSON.parse(localStorage.getItem("meals")) || []).forEach(meal => {
        (meal.ingredients || []).forEach(ingredient => {
            const name = String(ingredient.name || "").trim();

            if (!name) {
                return;
            }

            const key = basicNormaliseIngredientName(name);

            if (!usage.has(key)) {
                usage.set(key, { name, uses: 0 });
            }

            usage.get(key).uses++;
        });
    });

    return [...usage.values()];
}


function getIngredientSimilarity(first, second) {

    const a = getIngredientComparisonName(first);
    const b = getIngredientComparisonName(second);

    if (!a || !b) {
        return 0;
    }

    if (a === b) {
        return 1;
    }

    return 1 - (
        levenshteinDistance(a, b) /
        Math.max(a.length, b.length)
    );
}


function findPotentialIngredientDuplicateGroups() {

    const ingredients = getMealIngredientUsage();
    const parent = ingredients.map((_, index) => index);

    function find(index) {
        if (parent[index] !== index) {
            parent[index] = find(parent[index]);
        }

        return parent[index];
    }

    function join(first, second) {
        const firstRoot = find(first);
        const secondRoot = find(second);

        if (firstRoot !== secondRoot) {
            parent[secondRoot] = firstRoot;
        }
    }

    for (let first = 0; first < ingredients.length; first++) {
        for (let second = first + 1; second < ingredients.length; second++) {
            if (getIngredientSimilarity(
                ingredients[first].name,
                ingredients[second].name
            ) >= 0.82) {
                join(first, second);
            }
        }
    }

    const groups = new Map();

    ingredients.forEach((ingredient, index) => {
        const root = find(index);

        if (!groups.has(root)) {
            groups.set(root, []);
        }

        groups.get(root).push(ingredient);
    });

    return [...groups.values()]
        .filter(group => group.length > 1)
        .sort((first, second) => second.length - first.length);
}


function mergeMealIngredientNames(canonicalName, aliases) {

    const displayName = String(canonicalName || "").trim();
    const normalisedAliases = aliases
        .map(alias => String(alias || "").trim())
        .filter(alias => alias &&
            basicNormaliseIngredientName(alias) !==
            basicNormaliseIngredientName(displayName));

    if (!displayName || normalisedAliases.length === 0) {
        return 0;
    }

    const canonical = basicNormaliseIngredientName(displayName);
    const mappings = getIngredientNormalisation();
    const existingAliases = getAliasesForCanonical(canonical);
    const inheritedAliases = [];

    /* A selected name may itself have been a saved standard name. */
    normalisedAliases.forEach(alias => {
        const aliasKey = basicNormaliseIngredientName(alias);
        const mapping = mappings[aliasKey];

        if (!mapping) {
            return;
        }

        inheritedAliases.push(
            ...(Array.isArray(mapping)
                ? mapping
                : (mapping.aliases || []))
        );
        delete mappings[aliasKey];
    });

    saveIngredientNormalisation(mappings);

    saveIngredientMapping(
        displayName,
        [...new Set([
            ...existingAliases,
            ...normalisedAliases,
            ...inheritedAliases
        ])]
    );

    const namesToReplace = new Set([
        canonical,
        ...normalisedAliases.map(basicNormaliseIngredientName)
    ]);
    const meals = JSON.parse(localStorage.getItem("meals")) || [];
    let changed = 0;

    meals.forEach(meal => {
        (meal.ingredients || []).forEach(ingredient => {
            if (namesToReplace.has(
                basicNormaliseIngredientName(ingredient.name)
            ) && ingredient.name !== displayName) {
                ingredient.name = displayName;
                changed++;
            }
        });
    });

    localStorage.setItem("meals", JSON.stringify(meals));

    return changed;
}


/* =========================================================
   NORMALISE ALL EXISTING MEALS
========================================================= */

function normaliseAllMealIngredients() {

    const meals =
        JSON.parse(
            localStorage.getItem(
                "meals"
            )
        ) || [];


    let changed =
        0;


    meals.forEach(
        meal => {

            (
                meal.ingredients || []
            ).forEach(
                ingredient => {

                    if (
                        !ingredient.name
                    ) {

                        return;
                    }


                    const canonical =
                        getCanonicalIngredientName(
                            ingredient.name
                        );


                    const displayName =
                        getIngredientDisplayName(
                            canonical
                        );


                    if (
                        ingredient.name !==
                        displayName
                    ) {

                        ingredient.name =
                            displayName;

                        changed++;
                    }
                }
            );
        }
    );


    localStorage.setItem(
        "meals",
        JSON.stringify(
            meals
        )
    );


    return changed;
}


/* =========================================================
   CREATE MANAGER
========================================================= */

function createNormalisationManager() {

    if (
        document.querySelector(
            "#ingredientNormalisationModal"
        )
    ) {

        return;
    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "ingredientNormalisationModal";


    modal.className =
        "mealModal";


    modal.innerHTML = `

        <div class="modalContent ingredientNormalisationContent">

            <h2>Ingredient Cleanup</h2>

            <p class="normalisationIntro">
                Scan your saved meals for close spelling,
                singular/plural, spacing, and hyphen variations.
                Nothing changes until you choose Merge.
            </p>

            <button
                type="button"
                id="scanIngredientsButton"
            >
                Scan Ingredients
            </button>

            <div id="ingredientDuplicateGroups"></div>

            <hr>


            <h3>Your Normalisations</h3>

            <div id="normalisationMappings"></div>


            <hr>


            <h3>Add Normalisation</h3>

            <label>
                Standard ingredient name
            </label>

            <input
                type="text"
                id="normalisationCanonical"
                placeholder="e.g. Bell pepper"
                autocomplete="off"
            >


            <label>
                Other names
            </label>

            <input
                type="text"
                id="normalisationAliases"
                placeholder="e.g. pepper, red pepper, bell peppr"
                autocomplete="off"
            >


            <p class="normalisationHelp">
                Separate alternative names with commas.
            </p>


            <button
                type="button"
                id="saveNormalisationButton"
            >
                Save Normalisation
            </button>


            <button
                type="button"
                id="normaliseExistingMealsButton"
                class="secondaryShoppingButton"
            >
                Apply To Existing Meals
            </button>


            <button
                type="button"
                id="closeNormalisationButton"
                class="secondaryShoppingButton"
            >
                Close
            </button>

        </div>
    `;


    document.body.appendChild(
        modal
    );


    renderNormalisationMappings();

    document
        .querySelector("#scanIngredientsButton")
        .addEventListener("click", renderIngredientDuplicateGroups);


    document
        .querySelector(
            "#saveNormalisationButton"
        )
        .addEventListener(
            "click",
            saveNormalisationFromForm
        );


    document
        .querySelector(
            "#normaliseExistingMealsButton"
        )
        .addEventListener(
            "click",
            () => {

                const changed =
                    normaliseAllMealIngredients();


                alert(
                    `${changed} ingredient ${
                        changed === 1
                            ? "entry was"
                            : "entries were"
                    } normalised.`
                );


                renderNormalisationMappings();
            }
        );


    document
        .querySelector(
            "#closeNormalisationButton"
        )
        .addEventListener(
            "click",
            () => {

                modal.style.display =
                    "none";
            }
        );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                modal
            ) {

                modal.style.display =
                    "none";
            }
        }
    );
}


/* =========================================================
   OPEN MANAGER
========================================================= */

function openNormalisationManager() {

    createNormalisationManager();


    renderNormalisationMappings();

    renderIngredientDuplicateGroups();


    const modal =
        document.querySelector(
            "#ingredientNormalisationModal"
        );


    if (modal) {

        modal.style.display =
            "flex";
    }
}


/* =========================================================
   RENDER SCAN RESULTS
========================================================= */

function renderIngredientDuplicateGroups() {

    const container = document.querySelector(
        "#ingredientDuplicateGroups"
    );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const groups = findPotentialIngredientDuplicateGroups();

    if (groups.length === 0) {
        const message = document.createElement("p");
        message.className = "emptyNormalisationMessage";
        message.textContent =
            "No likely duplicate ingredient names were found.";
        container.appendChild(message);
        return;
    }

    const heading = document.createElement("h3");
    heading.textContent =
        `Possible matches (${groups.length})`;
    container.appendChild(heading);

    groups.forEach(group => {
        const card = document.createElement("div");
        card.className = "normalisationCard";

        const label = document.createElement("label");
        label.textContent = "Use this standard name";

        const canonicalInput = document.createElement("input");
        canonicalInput.type = "text";
        canonicalInput.value = group[0].name;
        canonicalInput.maxLength = 100;

        const names = document.createElement("div");
        names.className = "normalisationAliases";

        group.forEach((ingredient, index) => {
            const choice = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = ingredient.name;
            checkbox.checked = index !== 0;

            choice.append(
                checkbox,
                document.createTextNode(
                    ` ${ingredient.name} (${ingredient.uses} use${
                        ingredient.uses === 1 ? "" : "s"
                    })`
                )
            );
            names.appendChild(choice);
        });

        const mergeButton = document.createElement("button");
        mergeButton.type = "button";
        mergeButton.textContent = "Merge Selected";
        mergeButton.addEventListener("click", () => {
            const aliases = [...names.querySelectorAll("input:checked")]
                .map(input => input.value);
            const changed = mergeMealIngredientNames(
                canonicalInput.value,
                aliases
            );

            if (changed === 0) {
                alert("Choose at least one other name to merge.");
                return;
            }

            renderIngredientDuplicateGroups();
            renderNormalisationMappings();
        });

        card.append(label, canonicalInput, names, mergeButton);
        container.appendChild(card);
    });
}


/* =========================================================
   RENDER MAPPINGS
========================================================= */

function renderNormalisationMappings() {

    const container =
        document.querySelector(
            "#normalisationMappings"
        );


    if (!container) {

        return;
    }


    container.innerHTML =
        "";


    const mappings =
        getIngredientNormalisation();


    const entries =
        Object.entries(
            mappings
        );


    if (
        entries.length === 0
    ) {

        const empty =
            document.createElement(
                "p"
            );


        empty.className =
            "emptyNormalisationMessage";


        empty.textContent =
            "No ingredient normalisations added yet.";


        container.appendChild(
            empty
        );


        return;
    }


    entries.forEach(
        ([canonical, data]) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "normalisationCard";


            const displayName =
                Array.isArray(data)
                    ? canonical
                    :
                        (
                            data.displayName ||
                            canonical
                        );


            const aliases =
                Array.isArray(data)
                    ? data
                    :
                        (
                            data.aliases ||
                            []
                        );


            const header =
                document.createElement(
                    "div"
                );


            header.className =
                "normalisationCardHeader";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                displayName;


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.className =
                "deleteNormalisationButton";


            deleteButton.textContent =
                "Delete";


            header.append(
                title,
                deleteButton
            );


            const aliasesDisplay =
                document.createElement(
                    "div"
                );


            aliasesDisplay.className =
                "normalisationAliases";


            aliasesDisplay.textContent =
                aliases.length
                    ? aliases.join(
                        ", "
                    )
                    : "No aliases";


            card.append(
                header,
                aliasesDisplay
            );


            deleteButton.addEventListener(
                "click",
                () => {

                    if (
                        confirm(
                            `Delete the normalisation for "${displayName}"?`
                        )
                    ) {

                        deleteIngredientMapping(
                            canonical
                        );


                        renderNormalisationMappings();
                    }
                }
            );


            container.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   SAVE FORM
========================================================= */

function saveNormalisationFromForm() {

    const canonicalInput =
        document.querySelector(
            "#normalisationCanonical"
        );


    const aliasesInput =
        document.querySelector(
            "#normalisationAliases"
        );


    const canonical =
        canonicalInput.value.trim();


    const aliases =
        aliasesInput.value

            .split(",")

            .map(
                alias =>
                    alias.trim()
            )

            .filter(
                Boolean
            );


    if (
        !canonical
    ) {

        alert(
            "Please enter a standard ingredient name."
        );

        canonicalInput.focus();

        return;
    }


    saveIngredientMapping(
        canonical,
        aliases
    );


    canonicalInput.value =
        "";


    aliasesInput.value =
        "";


    renderNormalisationMappings();
}


/* =========================================================
   ENTER KEY SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;
        }


        const modal =
            document.querySelector(
                "#ingredientNormalisationModal"
            );


        if (
            modal?.style.display ===
            "flex"
        ) {

            modal.style.display =
                "none";
        }
    }
);
