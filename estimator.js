const ids = [
    28, 42, 34, 9, 1, 37, 54, 64, 44, 49, 59, 91, 31, 70, 80, 84, 76, 79, 82,
    23, 0, 30, 3, 15, 45, 67, 20, 26, 17, 12, 19, 61, 52, 99, 87, 85, 48, 21,
    40, 56, 72, 74, 77, 53, 25, 86, 6, 2, 11, 29, 57, 60, 8, 66, 46, 55, 78,
    94, 51, 41, 68, 73, 36, 62, 81, 89, 83, 88, 71, 75, 18, 13, 7, 5, 47, 63,
    65, 10, 96, 27, 98, 58, 32, 39, 93, 33, 22, 16, 90, 92, 50, 38, 43, 24,
    14, 35, 69, 95, 4, 97
];

const ratings = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
    98, 99, 100
];

let selectedGlyphs = [];

const dictionary = {};

ids.forEach((key, index) => {
    dictionary[key] = ratings[index];
});

function drawImages() {
    const container = document.getElementById("image-grid-container");

    // Iterate over sortedIds to generate HTML for each image
    ids.forEach(id => {
        // Create image element
        const img = document.createElement("img");
        img.src = `./assets/glyphs/${id}.png`; // Assuming image files are named with ids and have a .jpg extension
        img.alt = `Glyph ID ${id}`;
        img.classList.add("grid-image");

        // Add click event listener
        img.addEventListener("click", () => {
            
            // Update selectedId
            selectedId = id;
            const index = selectedGlyphs.findIndex(id => id === -1);

            // If there's an element with ID -1, replace it with the new one
            if (index !== -1) {
                selectedGlyphs[index] = selectedId;
            } 

            const negativeIdx = selectedGlyphs.findIndex(id => id === -1);
            if (negativeIdx == -1) {
                calculateRating();
            }
            drawSelected();
        });

        // Append image element to the container
        container.appendChild(img);
    });
}

function drawSelected() {
    const container = document.getElementById("selected-grid-container");
    container.innerHTML = "";

    if (selectedGlyphs.length == 0) {
        selectedGlyphs.push(-1);
        selectedGlyphs.push(-1);
        selectedGlyphs.push(-1);
        selectedGlyphs.push(-1);
    }

    // Iterate over sortedIds to generate HTML for each image
    selectedGlyphs.forEach(id => {
        // Create image element
        
        const img = document.createElement("img");
        if (id == -1) {
            img.classList.add("blank-grid-image");
        } else {
            img.src = `./assets/glyphs/${id}.png`; // Assuming image files are named with ids and have a .jpg extension
            img.alt = `Glyph ID ${id}`;
            img.classList.add("selected-glyph");
        }

        // Add click event listener
        img.addEventListener("click", () => {
        
            // Update selectedId
            selectedId = id;
            let index = selectedGlyphs.indexOf(selectedId);
            if (index !== -1) {
                selectedGlyphs[index] = -1;
            }
            resultDisplay = document.getElementById("result-text");
            resultDisplay.textContent = "Select four glyphs!";
            drawSelected();

        });

        // Append image element to the container
        container.appendChild(img);
    });
}

function calculateRating() {
    glyphSum = 0
    selectedGlyphs.forEach(id => {
        glyphSum += ratings[id];
    });
    cardRating = glyphSum / 4;
    resultDisplay = document.getElementById("result-text");
    resultDisplay.textContent = "Glyphcard Estimation: " + Math.round(cardRating);
}

drawImages();
drawSelected();