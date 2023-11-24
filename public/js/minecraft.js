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
            if (data.uuid) {
                playerInfo += `<img class="avatar" src="https://mc-heads.net/body/${data.uuid}" alt="Player Avatar">`;
            }

            playerInfo += data.skin ? `<div class="skin"><a href="${data.skin}">Skin Download</a></div>` : '';
            playerInfo += data.cape ? `<div class="cape"><a href="${data.cape}">Cape Download</a></div>` : '';

            // Hypixel Info
            let hypixelInfo = `<div class="hypixel-info">`;
            // Add Hypixel online status
            hypixelInfo += data.hypixelStatus && data.hypixelStatus.online ?
                `<div class="hypixelstatus"><img class="logo" src="../public/images/hypixellogo.png">Hypixel Status: <span class="online">Online</span></div>` :
                `<div class="hypixelstatus"><img class="logo" src="../public/images/hypixellogo.png">Hypixel Status: <span class="offline">Offline</span></div>`;

            hypixelInfo += data.hypixelGuild ?
                `<div class="hypixelguild">Guild: ${data.hypixelGuild.name || 'None'}</div>` :
                `<div class="hypixelguild">Guild: None</div>`;

            hypixelInfo += '</div>';

            playerInfo += hypixelInfo;
            playerInfo += `</div>`;

            document.getElementById('playerInfo').innerHTML = playerInfo;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('playerInfo').innerHTML = '<div class="player-info"><img class="avatar" src="https://mc-heads.net/body/f939e136-0c4b-4df1-8b6a-c756087b8f3c"><div class="name">No results found or an error occurred.</div></div>';
        });
}


document.getElementById('playerInfo').addEventListener('click', function(event) {
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
