document.addEventListener('DOMContentLoaded', function() {
    const messageList = document.getElementById('messageList');
    const userEmail = prompt("Please enter your email:");

    if (!userEmail) {
        alert("Email is required to access the dashboard.");
        window.location.href = 'index.html'; // Redirect to main page
    }

    let messages = [];
    if (localStorage.getItem('messages')) {
        messages = JSON.parse(localStorage.getItem('messages'));
        displayUserMessages(messages, userEmail);
    } else {
        messageList.innerHTML = '<p>No messages found.</p>';
    }

    window.updateMessage = function(email, index) {
        const newMessage = prompt("Please enter your updated message:");
        if (newMessage !== null && newMessage.trim() !== '') {
            messages[index].message = newMessage;
            saveMessagesToStorage(messages);
            displayUserMessages(messages, email);
        }
    }

    window.deleteMessage = function(email, index) {
        const confirmation = confirm("Are you sure you want to delete this message?");
        if (confirmation) {
            messages.splice(index, 1);
            saveMessagesToStorage(messages);
            displayUserMessages(messages, email);
        }
    }

    function displayUserMessages(messages, email) {
        const userMessages = messages.filter(msg => msg.email === email);
        if (userMessages.length === 0) {
            messageList.innerHTML = '<p>No messages found.</p>';
            return;
        }
        messageList.innerHTML = '';
        userMessages.forEach((msg, index) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');
            messageItem.innerHTML = `
                <p><strong>Name:</strong> ${msg.name}</p>
                <p><strong>Message:</strong> ${msg.message}</p>
                <button class="update-btn" onclick="updateMessage('${msg.email}', ${index})">Update</button>
                <button class="delete-btn" onclick="deleteMessage('${msg.email}', ${index})">Delete</button>
            `;
            messageList.appendChild(messageItem);
        });
    }

    function saveMessagesToStorage(messages) {
        localStorage.setItem('messages', JSON.stringify(messages));
    }
});
