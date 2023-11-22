function searchPlayer() {
    var playerName = document.getElementById('playerName').value;
    fetch(`http://localhost:3000/minecraft-player/${playerName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Player not found');
            }
            return response.json();
        })
        .then(data => {
            let playerInfo = `<div class="player-info">`;
            playerInfo += `<div class="name">Name: ${data.name}</div>`;
            playerInfo += `<div class="uuid">UUID: <span id="uuid">${data.uuid}</span><span class="copyButton" data-target="#uuid">copy</span></div>`;
            // Corrected URL for the avatar image
            if (data.uuid) {
                playerInfo += `<img src="https://mc-heads.net/body/${data.uuid}" alt="Player Avatar">`;
            }

            playerInfo += data.skin ? `<div class="skin"><a href="${data.skin}">Skin Download</a></div>` : '';
            playerInfo += data.cape ? `<div class="cape"><a href="${data.cape}">Cape Download</a></div>` : '';

            playerInfo += `</div>`;

            document.getElementById('playerInfo').innerHTML = playerInfo;
        })
        .catch(error => {
            console.error('Error:', error);
            // Update the UI to show the error message
            document.getElementById('playerInfo').innerHTML = '<div class="player-info"><img src="https://mc-heads.net/body/f939e136-0c4b-4df1-8b6a-c756087b8f3c"><div class="name">No results found or error occurred.</div></div>';
        });
}

document.getElementById('playerInfo').addEventListener('click', function(event) {
    // Check if the clicked element has the 'copyButton' class
    if (event.target.classList.contains('copyButton')) {
        var textToCopy = document.querySelector(event.target.getAttribute('data-target')).innerText;
        copyToClipboard(textToCopy);
    }
});

function copyToClipboard(text) {
    var tempElem = document.createElement('textarea');
    tempElem.value = text;
    document.body.appendChild(tempElem);
    tempElem.select();
    tempElem.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempElem);
    alert("Copied the text: " + text);
}



document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    searchPlayer(); // Call your function
});

