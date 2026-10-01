/* =========================================
   IRONSALES JAVASCRIPT
========================================= */


/* =========================================
   NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}


document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });

});


/* =========================================
   SMOOTH SCROLL
========================================= */

function scrollToContact() {

    const contact =
        document.getElementById("contact");

    if (!contact) return;

    contact.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function scrollToHow() {

    const features =
        document.getElementById("features");

    if (!features) return;

    features.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   AI CHAT
========================================= */

const chatButton =
    document.getElementById("chatButton");

const chatBox =
    document.getElementById("chatBox");

const closeChat =
    document.getElementById("closeChat");

const chatMessages =
    document.getElementById("chatMessages");


if (chatButton && chatBox) {

    chatButton.addEventListener("click", function () {

        chatBox.classList.add("open");

        chatButton.style.display = "none";

    });

}


if (closeChat && chatBox && chatButton) {

    closeChat.addEventListener("click", function () {

        chatBox.classList.remove("open");

        chatButton.style.display = "flex";

    });

}


/* =========================================
   AI RESPONSES
========================================= */

const responses = {

    "How fast does it answer calls?":
        "IronSales is designed to answer incoming calls immediately, so your customers aren't left waiting or sent to voicemail.",

    "Can it qualify leads?":
        "Yes. The AI can ask questions based on your business, understand what the caller needs, and collect the information your team needs.",

    "Can it book appointments?":
        "Yes. Once a caller is qualified, IronSales can connect with your scheduling workflow and book an appointment based on your availability."

};


document.querySelectorAll(
    ".chat-options button"
).forEach(function (button) {

    button.addEventListener("click", function () {

        if (!chatMessages) return;


        const question =
            button.dataset.question;


        const userMessage =
            document.createElement("div");

        userMessage.className =
            "message user";

        userMessage.textContent =
            question;

        chatMessages.appendChild(
            userMessage
        );


        const options =
            document.querySelector(".chat-options");

        if (options) {
            options.remove();
        }


        setTimeout(function () {

            const aiMessage =
                document.createElement("div");

            aiMessage.className =
                "message ai";

            aiMessage.textContent =
                responses[question] ||
                "I can show you how IronSales works for your business.";

            chatMessages.appendChild(
                aiMessage
            );


            chatMessages.scrollTop =
                chatMessages.scrollHeight;


            setTimeout(function () {

                const followUp =
                    document.createElement("div");

                followUp.className =
                    "chat-options";


                const followUpButton =
                    document.createElement("button");

                followUpButton.textContent =
                    "I want to see it for my business →";


                followUpButton.addEventListener(
                    "click",
                    scrollToContact
                );


                followUp.appendChild(
                    followUpButton
                );


                chatMessages.appendChild(
                    followUp
                );


                chatMessages.scrollTop =
                    chatMessages.scrollHeight;

            }, 500);

        }, 600);

    });

});


/* =========================================
   LEAD FORM
========================================= */

const leadForm =
    document.getElementById("leadForm");

const formMessage =
    document.getElementById("formMessage");


if (leadForm) {

    leadForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")?.value || "";

            const business =
                document.getElementById("business")?.value || "";

            const email =
                document.getElementById("email")?.value || "";

            const phone =
                document.getElementById("phone")?.value || "";

            const businessType =
                document.getElementById("businessType")?.value || "";

            const message =
                document.getElementById("message")?.value || "";


            const emailBody = `
New IronSales Demo Request

Name: ${name}
Business: ${business}
Email: ${email}
Phone: ${phone}
Business Type: ${businessType}

Message:
${message}
            `;


            const mailtoUrl =
                "mailto:ironsales.ai@gmail.com" +
                "?subject=" +
                encodeURIComponent(
                    "New IronSales Demo Request - " +
                    business
                ) +
                "&body=" +
                encodeURIComponent(
                    emailBody
                );


            if (formMessage) {

                formMessage.textContent =
                    "Opening your email app...";

            }


            window.location.href =
                mailtoUrl;

        }
    );

}
