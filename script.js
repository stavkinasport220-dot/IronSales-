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

            const isOpen =
                navLinks.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
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
   IMPROVED AI DEMO
========================================= */

const chatButton =
    document.getElementById("chatButton");

const chatBox =
    document.getElementById("chatBox");

const closeChat =
    document.getElementById("closeChat");

const chatMessages =
    document.getElementById("chatMessages");

const chatQuestionButtons =
    document.querySelectorAll(
        ".chat-question"
    );


const chatResponses = {

    "How fast does it answer calls?":
        "IronSales can answer incoming calls immediately, helping prevent callers from being sent to voicemail when your team is unavailable.",

    "Can it qualify leads?":
        "Yes. The AI can ask questions based on your business, understand what the caller needs, collect important details, and help identify qualified opportunities.",

    "Can it book appointments?":
        "Yes. IronSales can connect with your scheduling workflow and offer available appointment times based on your calendar.",

    "What happens after hours?":
        "IronSales can keep answering calls after normal business hours, capture the caller's information, determine what they need, and continue your configured booking or follow-up process."

};


/* OPEN CHAT */

if (
    chatButton &&
    chatBox
) {

    chatButton.addEventListener(
        "click",
        function () {

            chatBox.classList.add(
                "open"
            );


            chatBox.setAttribute(
                "aria-hidden",
                "false"
            );


            chatButton.style.display =
                "none";

        }
    );

}


/* CLOSE CHAT */

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


            chatBox.setAttribute(
                "aria-hidden",
                "true"
            );


            chatButton.style.display =
                "flex";

        }
    );

}


/* =========================================
   ADD CHAT MESSAGE
========================================= */

function addChatMessage(
    text,
    type
) {

    if (!chatMessages) {
        return null;
    }


    const message =
        document.createElement("div");


    message.className =
        "message " + type;


    message.textContent =
        text;


    chatMessages.appendChild(
        message
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    return message;

}


/* =========================================
   ENABLE / DISABLE CHAT QUESTIONS
========================================= */

function setChatButtonsDisabled(
    disabled
) {

    chatQuestionButtons.forEach(
        function (button) {

            button.disabled =
                disabled;

        }
    );

}


/* =========================================
   CHAT QUESTION HANDLER
========================================= */

chatQuestionButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const question =
                    button.dataset.question;


                if (!question) {
                    return;
                }


                /*
                 * IMPORTANT:
                 * The buttons are NOT removed.
                 * They stay available after every answer.
                 */


                addChatMessage(
                    question,
                    "user"
                );


                setChatButtonsDisabled(
                    true
                );


                const typingMessage =
                    addChatMessage(
                        "Typing...",
                        "ai typing"
                    );


                setTimeout(
                    function () {

                        if (typingMessage) {

                            typingMessage.remove();

                        }


                        const response =
                            chatResponses[question] ||
                            "IronSales can be configured around your business and your call handling workflow.";


                        addChatMessage(
                            response,
                            "ai"
                        );


                        setChatButtonsDisabled(
                            false
                        );

                    },
                    550
                );

            }
        );

    }
);


/* =========================================
   FORMSPREE FORM
========================================= */

const leadForm =
    document.getElementById("leadForm");

const formMessage =
    document.getElementById("formMessage");

const submitButton =
    document.getElementById("submitButton");


let formIsSubmitting =
    false;


if (leadForm) {

    leadForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =========================================
               VALIDATE
            ========================================= */

            if (!leadForm.checkValidity()) {

                leadForm.reportValidity();

                return;

            }


            /* =========================================
               STOP DUPLICATE SUBMISSIONS
            ========================================= */

            if (formIsSubmitting) {
                return;
            }


            formIsSubmitting =
                true;


            /* =========================================
               LOADING UI
            ========================================= */

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

                /* =========================================
                   GET ALL FORM FIELDS
                ========================================= */

                const formData =
                    new FormData(
                        leadForm
                    );


                /* =========================================
                   SEND TO YOUR EXACT FORMSPREE FORM
                ========================================= */

                const response =
                    await fetch(
                        leadForm.action,
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
                   HANDLE FORMSPREE ERROR
                ========================================= */

                if (!response.ok) {

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
                            responseData.errors.length > 0
                        ) {

                            errorMessage =
                                responseData.errors
                                    .map(
                                        function (error) {

                                            return (
                                                error.message ||
                                                "Submission failed."
                                            );

                                        }
                                    )
                                    .join(" ");

                        }

                    } catch (jsonError) {

                        /*
                         * Keep default error message.
                         */

                    }


                    throw new Error(
                        errorMessage
                    );

                }


                /* =========================================
                   SUCCESS
                ========================================= */

                leadForm.reset();


                if (formMessage) {

                    formMessage.textContent =
                        "Thank you! Your demo request was sent successfully. We'll be in touch soon.";


                    formMessage.className =
                        "form-message success";

                }


                if (submitButton) {

                    submitButton.textContent =
                        "Request Received ✓";

                }


                setTimeout(
                    function () {

                        formIsSubmitting =
                            false;


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


                formIsSubmitting =
                    false;


                console.error(
                    "IronSales Formspree submission error:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "We couldn't send your request. Please try again or text DEMO to (954) 417-5240.";


                    formMessage.className =
                        "form-message error";

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
