/* =========================
   INITIALIZE ANIMATIONS
========================= */

/*
   We only activate the hidden/reveal
   animation AFTER JavaScript has loaded.

   This prevents the entire website from
   becoming invisible if script.js fails.
*/

document.body.classList.add("js-ready");


/* =========================
   NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

}


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });

});


/* =========================
   SMOOTH SCROLL
========================= */

function scrollToContact() {

    const contact = document.getElementById("contact");

    if (contact) {

        contact.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function scrollToHow() {

    const features = document.getElementById("features");

    if (features) {

        features.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.08
        }
    );


    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    /*
       Fallback for browsers that don't
       support IntersectionObserver.
    */

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================
   AI CHAT DEMO
========================= */

const chatButton =
    document.getElementById("chatButton");

const chatBox =
    document.getElementById("chatBox");

const closeChat =
    document.getElementById("closeChat");

const chatMessages =
    document.getElementById("chatMessages");


if (chatButton && chatBox) {

    chatButton.addEventListener("click", () => {

        chatBox.classList.add("open");

        chatButton.style.display = "none";

    });

}


if (closeChat) {

    closeChat.addEventListener("click", () => {

        chatBox.classList.remove("open");

        chatButton.style.display = "flex";

    });

}


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
).forEach(button => {

    button.addEventListener("click", () => {

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


        setTimeout(() => {

            const aiMessage =
                document.createElement("div");

            aiMessage.className =
                "message ai";

            aiMessage.textContent =
                responses[question];

            chatMessages.appendChild(
                aiMessage
            );


            chatMessages.scrollTop =
                chatMessages.scrollHeight;


            setTimeout(() => {

                const followUp =
                    document.createElement("div");

                followUp.className =
                    "chat-options";


                const button =
                    document.createElement("button");

                button.textContent =
                    "I want to see it for my business →";


                button.addEventListener(
                    "click",
                    scrollToContact
                );


                followUp.appendChild(button);

                chatMessages.appendChild(
                    followUp
                );

            }, 500);

        }, 600);

    });

});


/* =========================
   LEAD FORM
========================= */

const leadForm =
    document.getElementById("leadForm");

const formMessage =
    document.getElementById("formMessage");


if (leadForm) {

    leadForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value;

            const business =
                document.getElementById("business").value;

            const email =
                document.getElementById("email").value;

            const phone =
                document.getElementById("phone").value;

            const businessType =
                document.getElementById("businessType").value;

            const message =
                document.getElementById("message").value;


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


            formMessage.textContent =
                "Opening your email app...";


            window.location.href =
                mailtoUrl;

        }
    );

}
