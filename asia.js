let votes = JSON.parse(localStorage.getItem("votes")) || [
    { name: "Paras automerkki", options: ["BMW", "Audi", "Tesla"], votes: [5, 3, 2] },
    { name: "Paras ruoka", options: ["Pizza", "Sushi", "Burger"], votes: [8, 6, 1] }
];

const adminPassword = "0000";

function displayVotes(adminView = false) {
    const voteList = document.getElementById(adminView ? "votes-admin" : "votes");
    if (voteList) {
        voteList.innerHTML = "";

        votes.forEach((vote, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${vote.name}</strong>
                <button onclick="viewVote(${index})">Katso tilanne</button>
                ${adminView ? `<button onclick="voteOption(${index})">Äänestä</button><button onclick="deleteVote(${index})">Poista äänestys</button>` : `<button onclick="voteOption(${index})">Äänestä</button>`}
            `;
            voteList.appendChild(li);
        });
    }
}

function viewVote(index) {
    const vote = votes[index];
    const result = vote.options.map((option, i) => `${option}: ${vote.votes[i]} ääntä`).join("<br>");
    alert(result);
}

function voteOption(index) {
    const vote = votes[index];
    const choice = prompt(`Valitse vaihtoehto:\n${vote.options.join(", ")}`);
    const optionIndex = vote.options.indexOf(choice);
    if (optionIndex !== -1) {
        vote.votes[optionIndex]++;
        localStorage.setItem("votes", JSON.stringify(votes));
        alert("Äänesi on rekisteröity!");
    } else {
        alert("Virheellinen vaihtoehto!");
    }
}

function addVote() {
    const newVoteName = document.getElementById("new-vote-name").value;
    const newOptions = document.getElementById("new-vote-options").value.split(",").map(option => option.trim());
    
    if (newVoteName && newOptions.length > 0) {
        const newVote = { name: newVoteName, options: newOptions, votes: newOptions.map(() => 0) };
        votes.push(newVote);
        localStorage.setItem("votes", JSON.stringify(votes));
        displayVotes(true);
        document.getElementById("new-vote-name").value = "";
        document.getElementById("new-vote-options").value = "";
    } else {
        alert("Syötä äänestyksen nimi ja vähintään yksi vaihtoehto (pilkulla erotettuina).");
    }
}

function deleteVote(index) {
    if (confirm("Haluatko varmasti poistaa tämän äänestyksen?")) {
        votes.splice(index, 1);
        localStorage.setItem("votes", JSON.stringify(votes));
        displayVotes(true);
    }
}

function redirectToAdmin() {
    const password = prompt("Syötä salasana:");
    if (password === adminPassword) {
        window.location.href = "yllapitaja.html";
    } else {
        alert("Väärä salasana!");
    }
}

function redirectToUser() {
    window.location.href = "usercase.html";
}

window.onload = function() {
    const isAdminPage = window.location.pathname.includes("yllapitaja.html");
    displayVotes(isAdminPage);
};
function redirectToAdmin() {
    const password = prompt("Syötä salasana:");
    if (password === adminPassword) {
        window.location.href = "yllapitaja.html";
    } else {
        alert("Väärä salasana!");
    }
}

function redirectToUser() {
    window.location.href = "usercase.html";
}
