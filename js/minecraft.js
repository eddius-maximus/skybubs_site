function searchPlayer() {
    var playerName = document.getElementById('playerName').value;
    fetch(`http://localhost:3000/minecraft-player/${playerName}`)
        .then(response => response.json())
        .then(data => {
            let playerInfo = `<div class="player-info">`;
            playerInfo += `<div class="name">Name: ${data.name}</div>`;
            playerInfo += `<div class="uuid">UUID: ${data.uuid}</div>`;
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
        });
}
