"use strict";


/* =========================================
   NAVIGATION
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        function () {

            const opened =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

        }
    );

}


document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );

                }

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    });


/* =========================================
   SMOOTH SCROLL
========================================= */

function scrollToContact() {

    const contact =
        document.getElementById("contact");

    if (!contact) {
        return;
    }

    contact.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function scrollToHow() {

    const features =
        document.getElementById("features");

    if (!features) {
        return;
    }

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

    chatButton.addEventListener(
        "click",
        function () {

            chatBox.classList.add("open");

            chatButton.style.display =
                "none";

        }
    );

}


if (
    closeChat &&
    chatBox &&
    chatButton
) {

    closeChat.addEventListener(
        "click",
        function () {

            chatBox.classList.remove(
                "open"
            );

            chatButton.style.display =
                "flex";

        }
    );

}


/* =========================================
   AI RESPONSES
========================================= */

const responses = {

    "How fast does it answer calls?":
        "IronSales is designed to answer incoming calls immediately, so customers aren't left waiting or sent to voicemail.",

    "Can it qualify leads?":
        "Yes. IronSales can ask questions based on your business, understand what the caller needs, and collect the information your team needs.",

    "Can it book appointments?":
        "Yes. IronSales can connect with your scheduling workflow and book qualified callers based on your availability."

};


/* =========================================
   AI QUESTION BUTTONS
========================================= */

document
    .querySelectorAll(
        ".chat-options button[data-question]"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (!chatMessages) {
                    return;
                }


                const question =
                    button.dataset.question;


                if (!question) {
                    return;
                }


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
                    button.closest(".chat-options");


                if (options) {
                    options.remove();
                }


                chatMessages.scrollTop =
                    chatMessages.scrollHeight;


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


                        const demoButton =
                            document.createElement("button");


                        demoButton.type =
                            "button";


                        demoButton.textContent =
                            "I want to see it for my business →";


                        demoButton.addEventListener(
                            "click",
                            function () {

                                scrollToContact();


                                if (
                                    chatBox &&
                                    chatButton
                                ) {

                                    chatBox.classList.remove(
                                        "open"
                                    );


                                    chatButton.style.display =
                                        "flex";

                                }

                            }
                        );


                        followUp.appendChild(
                            demoButton
                        );


                        chatMessages.appendChild(
                            followUp
                        );


                        chatMessages.scrollTop =
                            chatMessages.scrollHeight;

                    }, 350);

                }, 500);

            }
        );

    });


/* =========================================
   FORMSPREE FORM
========================================= */

const leadForm =
    document.getElementById("leadForm");

const formMessage =
    document.getElementById("formMessage");

const submitButton =
    document.getElementById("submitButton");


let submitting = false;


if (leadForm) {

    leadForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* HTML VALIDATION */

            if (!leadForm.checkValidity()) {

                leadForm.reportValidity();

                return;

            }


            /* PREVENT DUPLICATE SEND */

            if (submitting) {
                return;
            }


            submitting = true;


            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Sending...";

            }


            if (formMessage) {

                formMessage.textContent =
                    "Sending your demo request...";


                formMessage.className =
                    "form-message";

            }


            try {

                const formData =
                    new FormData(leadForm);


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


                if (!response.ok) {

                    let message =
                        "We couldn't send your request. Please try again.";


                    try {

                        const result =
                            await response.json();


                        if (
                            result &&
                            Array.isArray(
                                result.errors
                            ) &&
                            result.errors.length
                        ) {

                            message =
                                result.errors
                                    .map(
                                        function (error) {

                                            return error.message;

                                        }
                                    )
                                    .join(" ");

                        }

                    } catch (error) {

                        /* Keep default error */

                    }


                    throw new Error(
                        message
                    );

                }


                /* SUCCESS */

                leadForm.reset();


                if (formMessage) {

                    formMessage.textContent =
                        "Thank you! Your demo request was sent successfully. We'll be in touch soon.";


                    formMessage.classList.add(
                        "success"
                    );

                }


                if (submitButton) {

                    submitButton.textContent =
                        "Request Received ✓";

                }


                setTimeout(
                    function () {

                        submitting = false;


                        if (submitButton) {

                            submitButton.disabled =
                                false;


                            submitButton.textContent =
                                "Request My Free Demo →";

                        }

                    },
                    4000
                );


            } catch (error) {

                submitting = false;


                console.error(
                    "IronSales Formspree error:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "We couldn't send your request. Please try again or text DEMO to (954) 417-5240.";


                    formMessage.classList.add(
                        "error"
                    );

                }


                if (submitButton) {

                    submitButton.disabled =
                        false;


                    submitButton.textContent =
                        "Request My Free Demo →";

                }

            }

        }
    );

}
