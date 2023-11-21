function searchPlayer() {
    var playerName = document.getElementById('playerName').value;
    fetch(`http://localhost:3000/minecraft-player/${playerName}`)
        .then(response => response.json())
        .then(data => {
            let playerInfo = `<div class="player-info">`;
            playerInfo += `<div class="name">Name: ${data.name}</div>`;
            playerInfo += `<div class="uuid">UUID: ${data.uuid}</div>`;
            playerInfo += data.skin ? `<div class="skin">Skin URL: <a href="${data.skin}">${data.skin}</a></div>` : '';
            playerInfo += data.cape ? `<div class="cape">Cape URL: <a href="${data.cape}">${data.cape}</a></div>` : '';
            playerInfo += `</div>`;

            document.getElementById('playerInfo').innerHTML = playerInfo;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
