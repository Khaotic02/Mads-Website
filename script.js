document.getElementById('serverForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('serverName').value;
    const description = document.getElementById('serverDescription').value;
    const link = document.getElementById('serverLink').value;
    const image = document.getElementById('serverImage').files[0];
    
    if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
            const server = { name, description, link, image: reader.result };
            let servers = JSON.parse(localStorage.getItem('servers') || '[]');
            servers.push(server);
            localStorage.setItem('servers', JSON.stringify(servers));
            alert('Server submitted!');
        };
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const serverList = document.getElementById('serverList');
    let servers = JSON.parse(localStorage.getItem('servers') || '[]');
    servers.forEach(server => {
        const serverBox = document.createElement('div');
        serverBox.className = 'server-box';
        serverBox.innerHTML = `
            <h3>${server.name}</h3>
            <img src="${server.image}" alt="${server.name}" class="server-img">
            <button onclick="this.nextElementSibling.classList.toggle('show')">Details</button>
            <div class="server-details">
                <p>${server.description}</p>
                <a href="https://${server.link.startsWith('discord.gg/') || server.link.startsWith('discord.com/invite/') ? server.link : 'discord.gg/' + server.link}" target="_blank">Join Server</a>
            </div>
        `;
        serverList.appendChild(serverBox);
    });
});
