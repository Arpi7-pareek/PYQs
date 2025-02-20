// Step 1: Data Structure for Branches, Subjects, and PDFs
const data = {
    "Textile Technology": {
        "Fabric Manufacturing": {
            "2023": ["FM1.pdf", "FM2.pdf"],
            "2022": ["FM1.pdf", "FM2.pdf"]
        },
        "Yarn Manufacturing": {
            "2023": ["YM1.pdf", "YM2.pdf"],
            "2022": ["YM1.pdf", "YM2.pdf"]
        }
    },
    "Textile Chemistry": {
        "Dyeing & Printing": {
            "2023": ["DP1.pdf", "DP2.pdf"],
            "2022": ["DP1.pdf", "DP2.pdf"]
        },
        "Textile Testing": {
            "2023": ["TT1.pdf", "TT2.pdf"],
            "2022": ["TT1.pdf", "TT2.pdf"]
        }
    },
    "Fashion & Apparel Engineering": {
        "Garment Manufacturing": {
            "2023": ["GM1.pdf", "GM2.pdf"],
            "2022": ["GM1.pdf", "GM2.pdf"]
        },
        "Fashion Illustration": {
            "2023": ["FI1.pdf", "FI2.pdf"],
            "2022": ["FI1.pdf", "FI2.pdf"]
        }
    }
};

// Step 2: Variables for Tracking Navigation
let currentStep = 1;
let selectedBranch = "";
let selectedSubject = "";
let selectedYear = "";

// Step 3: Function to Load Options Dynamically
function loadOptions(options) {
    const optionsList = document.getElementById("options");
    optionsList.innerHTML = ""; // Clear previous options

    options.forEach(option => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" onclick="nextStep('${option}')">${option}</a>`;
        optionsList.appendChild(li);
    });

    document.getElementById("backButton").style.display = currentStep > 1 ? "block" : "none";
}

// Step 4: Navigation Function
function nextStep(selection) {
    if (currentStep === 1) {
        selectedBranch = selection;
        document.getElementById("title").innerText = "Select Your Subject";
        loadOptions(Object.keys(data[selectedBranch]));
    } else if (currentStep === 2) {
        selectedSubject = selection;
        document.getElementById("title").innerText = "Select Year";
        loadOptions(Object.keys(data[selectedBranch][selectedSubject]));
    } else if (currentStep === 3) {
        selectedYear = selection;
        document.getElementById("title").innerText = "Download PDFs";
        loadPDFLinks(data[selectedBranch][selectedSubject][selectedYear]);
    }

    currentStep++;
}

// Step 5: Load PDF Links
function loadPDFLinks(pdfs) {
    const optionsList = document.getElementById("options");
    optionsList.innerHTML = ""; // Clear previous options

    pdfs.forEach(pdf => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="pdfs/${selectedBranch}/${selectedSubject}/${selectedYear}/${pdf}" target="_blank">${pdf}</a>`;
        optionsList.appendChild(li);
    });
}

// Step 6: Back Button Functionality
function goBack() {
    if (currentStep === 2) {
        document.getElementById("title").innerText = "Select Your Branch";
        loadOptions(Object.keys(data));
    } else if (currentStep === 3) {
        document.getElementById("title").innerText = "Select Your Subject";
        loadOptions(Object.keys(data[selectedBranch]));
    } else if (currentStep === 4) {
        document.getElementById("title").innerText = "Select Year";
        loadOptions(Object.keys(data[selectedBranch][selectedSubject]));
    }
    currentStep--;
}

// Step 7: Load First Page (Branches)
document.addEventListener("DOMContentLoaded", () => {
    loadOptions(Object.keys(data));
});
