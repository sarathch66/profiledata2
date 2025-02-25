const GITHUB_TOKEN = "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"; // Keep this secure
const REPO_OWNER = "sarathch66";
const REPO_NAME = "profiledata2";
const FILE_PATH = "profiles.json"; // Path to JSON file in repo
const BRANCH = "main"; // Or any branch you use

async function updateJsonFile(newProfile) {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

    // Get the existing file data
    const response = await fetch(url, {
        headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const fileData = await response.json();

    // Decode existing JSON content
    const existingData = JSON.parse(atob(fileData.content));

    // Add new profile
    existingData.push(newProfile);

    // Encode back to Base64
    const updatedContent = btoa(JSON.stringify(existingData, null, 2));

    // Update file on GitHub
    const updateResponse = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Updated JSON file",
            content: updatedContent,
            sha: fileData.sha, // Required to update existing file
            branch: BRANCH
        })
    });

    if (updateResponse.ok) {
        alert("JSON file updated successfully!");
    } else {
        alert("Failed to update JSON file.");
    }
}
