/* =========================================
   IRONSALES JAVASCRIPT
========================================= */

"use strict";


/* =========================================
   NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isActive =
            navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isActive)
        );

    });

}


document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
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
   AI CHAT RESPONSES
========================================= */

const responses = {

    "How fast does it answer calls?":
        "IronSales is designed to answer incoming calls immediately, so your customers aren't left waiting or sent to voicemail.",

    "Can it qualify leads?":
        "Yes. The AI can ask questions based on your business, understand what the caller needs, and collect the information your team needs.",

    "Can it book appointments?":
        "Yes. Once a caller is qualified, IronSales can connect with your scheduling workflow and book an appointment based on your availability."

};


/* =========================================
   AI CHAT OPTION HANDLER
========================================= */

function handleChatQuestion(button) {

    if (!chatMessages) return;

    const question =
        button.dataset.question;

    if (!question) return;


    /* USER MESSAGE */

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "message user";

    userMessage.textContent =
        question;

    chatMessages.appendChild(
        userMessage
    );


    /* REMOVE ORIGINAL OPTIONS */

    const options =
        button.closest(".chat-options");

    if (options) {
        options.remove();
    }


    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    /* AI RESPONSE */

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


        /* FOLLOW-UP CTA */

        setTimeout(function () {

            const followUp =
                document.createElement("div");

            followUp.className =
                "chat-options";


            const followUpButton =
                document.createElement("button");

            followUpButton.type =
                "button";

            followUpButton.textContent =
                "I want to see it for my business →";


            followUpButton.addEventListener(
                "click",
                function () {

                    scrollToContact();

                    if (chatBox && chatButton) {

                        chatBox.classList.remove(
                            "open"
                        );

                        chatButton.style.display =
                            "flex";

                    }

                }
            );


            followUp.appendChild(
                followUpButton
            );


            chatMessages.appendChild(
                followUp
            );


            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        }, 400);

    }, 500);

}


/* =========================================
   INITIAL CHAT BUTTONS
========================================= */

document.querySelectorAll(
    ".chat-options button[data-question]"
).forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            handleChatQuestion(button);

        }
    );

});


/* =========================================
   FORMSPREE LEAD FORM
========================================= */

const leadForm =
    document.getElementById("leadForm");

const formMessage =
    document.getElementById("formMessage");


if (leadForm) {

    const submitButton =
        leadForm.querySelector(
            'button[type="submit"]'
        );


    const originalButtonText =
        submitButton
            ? submitButton.textContent.trim()
            : "Request My Free Demo →";


    let formSubmitting = false;


    leadForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =========================================
               VALIDATE FORM
            ========================================= */

            if (!leadForm.checkValidity()) {

                leadForm.reportValidity();

                return;

            }


            /* =========================================
               PREVENT DUPLICATE SUBMISSIONS
            ========================================= */

            if (formSubmitting) {
                return;
            }


            formSubmitting = true;


            /* =========================================
               LOADING STATE
            ========================================= */

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";

            }


            if (formMessage) {

                formMessage.textContent =
                    "Sending your request...";

                formMessage.classList.remove(
                    "success",
                    "error"
                );

            }


            /* =========================================
               COLLECT FORM DATA
            ========================================= */

            const formData =
                new FormData(leadForm);


            /* =========================================
               ADD WEBSITE SOURCE
            ========================================= */

            if (!formData.has("source")) {

                formData.append(
                    "source",
                    "IronSales Website"
                );

            }


            try {

                /* =========================================
                   SEND TO FORMSPREE
                ========================================= */

                const response =
                    await fetch(
                        "https://formspree.io/f/mkjogneb",
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                /* =========================================
                   SUCCESS
                ========================================= */

                if (response.ok) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your demo request has been received. We'll be in touch soon.";

                        formMessage.classList.remove(
                            "error"
                        );

                        formMessage.classList.add(
                            "success"
                        );

                    }


                    leadForm.reset();


                    if (submitButton) {

                        submitButton.textContent =
                            "Request Received ✓";

                    }


                    setTimeout(function () {

                        formSubmitting =
                            false;


                        if (submitButton) {

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                originalButtonText;

                        }

                    }, 4000);


                    return;

                }


                /* =========================================
                   FORMSPREE ERROR RESPONSE
                ========================================= */

                let errorMessage =
                    "We couldn't send your request. Please try again.";


                try {

                    const responseData =
                        await response.json();


                    if (
                        responseData &&
                        Array.isArray(
                            responseData.errors
                        ) &&
                        responseData.errors.length
                    ) {

                        errorMessage =
                            responseData.errors
                                .map(function (error) {

                                    return (
                                        error.message ||
                                        "Submission error"
                                    );

                                })
                                .join(" ");

                    }

                } catch (jsonError) {

                    /* Keep default error message */

                }


                throw new Error(
                    errorMessage
                );

            } catch (error) {

                /* =========================================
                   NETWORK / SERVER ERROR
                ========================================= */

                console.error(
                    "IronSales form submission error:",
                    error
                );


                formSubmitting =
                    false;


                if (formMessage) {

                    formMessage.textContent =
                        error.message ||
                        "We couldn't send your request. Please try again or email ironsales.ai@gmail.com.";

                    formMessage.classList.remove(
                        "success"
                    );

                    formMessage.classList.add(
                        "error"
                    );

                }


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        originalButtonText;

                }

            }

        }
    );

}
