document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const messageList = document.getElementById('messageList');
    const clearStorageBtn = document.getElementById('clearStorageBtn');
    let messages = [];

    // Load messages from localStorage
    if (localStorage.getItem('messages')) {
        messages = JSON.parse(localStorage.getItem('messages'));
        displayMessages(messages);
    }

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        addMessage(name, email, message);
        saveMessagesToStorage(messages);
        displayMessages(messages);
        messageForm.reset();
    });

    clearStorageBtn.addEventListener('click', function() {
        clearLocalStorage();
        messages = []; // Clear messages array
        displayMessages(messages); // Clear message list
    });

    function addMessage(name, email, message) {
        // Check if the same message already exists
        const existingMessageIndex = messages.findIndex(msg => msg.name === name && msg.email === email && msg.message === message);
        if (existingMessageIndex === -1) {
            messages.push({ name, email, message });
            saveMessagesToStorage(messages);
        } else {
            // If the same message already exists, show a warning
            alert("This message already exists!");
        }
    }

    function saveMessagesToStorage(messages) {
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function displayMessages(messages) {
        messageList.innerHTML = '';
        messages.forEach((msg, index) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');
            messageItem.innerHTML = `
                <p><strong>Name:</strong> ${msg.name}</p>
                <p><strong>Message:</strong> ${msg.message}</p>
            `;
            messageList.appendChild(messageItem);
        });
    }

    function clearLocalStorage() {
        localStorage.removeItem('messages');
    }
});
