const themeButton = document.querySelector("#themeButton");
const themeOptions = document.querySelector("#themeOptions");

const savedTheme = localStorage.getItem("theme") || "coffee";

document.body.dataset.theme = savedTheme;

if (themeButton && themeOptions) {
    themeButton.addEventListener("click", () => {
        themeOptions.style.display =
            themeOptions.style.display === "flex" ? "none" : "flex";
    });

    themeOptions.addEventListener("click", (event) => {
        if (!event.target.matches("[data-theme]")) {
            return;
        }

        const theme = event.target.dataset.theme;

        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);

        themeOptions.style.display = "none";
    });
}