// FUNTION TO GET AND USE USER NAME AS PROFILE PICTURE 
const username = "<%= user.username %>";

function getInitials(name) {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return parts[0][0] + parts[1][0];
    } else if (parts.length === 1) {
        return parts[0][0];
    }
    return '';
}

const placeholders = document.querySelectorAll('.profile-placeholder'); // Select ALL placeholders

placeholders.forEach(placeholder => {
    placeholder.textContent = getInitials(username);
});






// FUCTION RELATED TO CAHRT AND REPLY 
const chatMessages = [
    { type: 'received', text: "Yoo! What's up? 😎" },
    { type: 'sent', text: "I'm cool man, what about you? 🙌" },
    { type: 'received', text: "Cool, I got the code I would like you to buy. It's a complete website I made. 🚀" },
    { type: 'sent', text: "Yoo man, tell me more about it. 👍" },
    { type: 'received', text: "Awesome, it's a gift card website where users can sell all kinds of gift cards.\nI made the rates very high to beat legit gift card platforms, so people won't have a choice.\nYou know we like money. 💵" },
    { type: 'sent', text: "Damn, that's crazy... 🤯" },
    { type: 'received', text: "Chill man, I'm not done yet.\nIt's a Ponzi scheme but I made it look very legit. 😅 It's also installable — to tell you how awesome it is.\nTo round everything up, we gaz not talk much. 😂" },
    { type: 'received', text: "You as the web owner have a separate page aside from the main web where every gift card detail (e.g., image, code, country, user info, etc.) will be displayed to you.\nWhen a user fills all the needed gift card details and clicks the **Sell** button, all their information is sent to you. Plus, you'll receive an email notification. 📧" },
    { type: 'sent', text: "Bro, that is SICK!!! 🔥\nYou don't even have to say more. I'll just take the details to a legit gift card platform and sell it there — zero trace. Damn. 🤐" },
    { type: 'received', text: "Lol, correct! bad boy😆" },
    { type: 'sent', text: "Send me a REVIEW, let me see how the web looks. Damn! 🧐" },
    { type: 'received', text: 'You can check the web at: <a href="https://gift-castle.onrender.com" target="_blank">https://gift-castle.onrender.com</a>\nOnce paid for, I will customize it (logo, name, colors, etc. — optional) and host it for you for free. 🎯' },
    { type: 'sent', text: "Lol, I almost sold my own gift card there! LMAO 🤣 It looks so legit!\nHOW MUCH IS IT???" },
    { type: 'received', text: "Click the WhatsApp button and let's discuss. 📲" },
    { type: 'sent', text: "Bet! Gonna hit you up now. 🏃‍♂️💨" }
];

const messagesContainer = document.getElementById('messages');
let index = 0;

function playNotificationSound() {
    const notifSound = document.getElementById('notifSound');
    notifSound.currentTime = 0;
    notifSound.play().catch(err => {
        console.warn('Notification sound blocked:', err);
    });
}

function playTypingSound() {
    const typingSound = document.getElementById('typingSound');
    typingSound.currentTime = 0;
    typingSound.play().catch(err => {
        console.warn('Typing sound blocked:', err);
    });
}

function stopTypingSound() {
    const typingSound = document.getElementById('typingSound');
    typingSound.pause();
    typingSound.currentTime = 0;
}

function showNextMessage() {
    if (index >= chatMessages.length) return;

    const messageData = chatMessages[index];

    const typing = document.createElement('div');
    typing.classList.add('message', messageData.type);
    typing.innerText = 'Typing';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    playTypingSound();

    let dotCount = 0;
    const typingInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        typing.innerText = 'Typing' + '.'.repeat(dotCount);
    }, 500);

    setTimeout(() => {
        clearInterval(typingInterval);
        stopTypingSound();
        typing.innerHTML = messageData.text;

        playNotificationSound();

        index++;
        setTimeout(showNextMessage, 1000);
    }, 3000);
}

setTimeout(showNextMessage, 1000);

