
document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById('message-input');
    const sendMessageButton = document.getElementById('send-message');
    const messagesContainer = document.querySelector('.messages');

    sendMessageButton.addEventListener('click', function() {
        sendMessage();
    });

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message.length > 0) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.textContent = message;

            messagesContainer.appendChild(messageElement);
            messageInput.value = ''; // Clear input field
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }
    }
});




