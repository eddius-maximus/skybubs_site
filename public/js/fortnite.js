// fetch('http://localhost:3000/daily-shop')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));



fetch('http://localhost:3000/daily-shop')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Now 'data' is defined in this scope
        // Process and display the items here
        data.shop.forEach(item => {
            const itemElement = document.createElement('div');
            let rarityClass = item.rarity ? item.rarity.id.toLowerCase() : 'unknown'; // Convert rarity to lowercase
            let mainTypeClass = item.mainType ? item.mainType.toLowerCase() : 'unknown'; // Convert mainType to lowercase
            itemElement.classList.add('item', rarityClass, mainTypeClass); // Add 'item', rarity, and mainType as class names


            const name = document.createElement('h2');
            name.textContent = item.displayName;
            itemElement.appendChild(name);

            const description = document.createElement('p');
            description.textContent = item.displayDescription;
            itemElement.appendChild(description);

            if (item.displayAssets && item.displayAssets.length > 0) {
                item.displayAssets.forEach(asset => {
                    if (asset.url) {
                        const image = document.createElement('img');
                        image.src = asset.url; // Use the 'url' property
                        itemElement.appendChild(image);
                    }
                });
            }


            // if (item.mainType === "bundle" && item.granted) {
            //     item.granted.forEach(grantedItem => {
            //         const grantedName = document.createElement('p');
            //         grantedName.textContent = `Included in bundle: ${grantedItem.name}`;
            //         itemElement.appendChild(grantedName);
            //     });
            // }

            document.querySelector('.fortnite').appendChild(itemElement);
        });

    })
    .catch(error => console.error('Error:', error));
var lastRefresh = new Date(); // If the user just loaded the page you don't want to refresh either
