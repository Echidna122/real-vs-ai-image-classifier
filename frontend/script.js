const API_URL = "https://real-vs-ai-image-classifier.onrender.com";

// Drag and drop
const dropzone = document.getElementById('dropzone');
dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('drag-over'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        document.getElementById('fileInput').files = e.dataTransfer.files;
        previewImage(file);
    }
});

function previewImage(fileOverride) {
    const file = fileOverride || document.getElementById("fileInput").files[0];
    if (!file) return;

    const preview = document.getElementById("preview");
    preview.src = URL.createObjectURL(file);

    document.getElementById("fileName").textContent = file.name;
    document.getElementById("fileMeta").textContent =
        `${(file.size / 1024).toFixed(1)} KB · ${file.type.split('/')[1].toUpperCase()}`;

    document.getElementById("previewArea").classList.add("visible");
    document.getElementById("resultCard").style.display = "none";
    document.getElementById("resultCard").classList.remove("visible");
    document.getElementById("resetBtn").style.display = "none";
}

async function sendImage() {
    const file = document.getElementById("fileInput").files[0];
    if (!file) { alert("Please upload an image first."); return; }

    document.getElementById("btnText").style.display = "none";
    document.getElementById("btnLoading").style.display = "flex";
    document.getElementById("predictBtn").disabled = true;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${API_URL}/predict`, { method: "POST", body: formData });
        const data = await response.json();
        showResult(data);
    } catch (err) {
        alert("Error: Could not connect to the server. Make sure your backend is running.");
    } finally {
        document.getElementById("btnText").style.display = "inline";
        document.getElementById("btnLoading").style.display = "none";
        document.getElementById("predictBtn").disabled = false;
    }
}

function showResult(data) {
    const card = document.getElementById("resultCard");
    const isFake = data.label === "FAKE";
    const conf = (data.confidence * 100).toFixed(1);

    card.className = "result-card visible " + (isFake ? "fake" : "real");
    card.style.display = "block";

    document.getElementById("resultLabel").textContent = data.label;
    document.getElementById("resultConf").textContent = conf + "%";

    setTimeout(() => {
        document.getElementById("confidenceBar").style.width = conf + "%";
    }, 100);

    document.getElementById("resetBtn").style.display = "block";
}

function resetAll() {
    document.getElementById("fileInput").value = "";
    document.getElementById("preview").src = "";
    document.getElementById("previewArea").classList.remove("visible");
    document.getElementById("resultCard").style.display = "none";
    document.getElementById("resultCard").classList.remove("visible");
    document.getElementById("confidenceBar").style.width = "0%";
    document.getElementById("resetBtn").style.display = "none";
}