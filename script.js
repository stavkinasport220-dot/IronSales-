"use strict";


/* =========================================
   MOBILE NAVIGATION
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

    const section =
        document.getElementById("contact");


    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function scrollToHow() {

    const section =
        document.getElementById("features");


    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   FREQUENTLY ASKED QUESTIONS
========================================= */

const faqButton =
    document.getElementById("faqButton");

const faqBox =
    document.getElementById("faqBox");

const closeFaq =
    document.getElementById("closeFaq");

const faqMessages =
    document.getElementById("faqMessages");

const faqQuestions =
    document.querySelectorAll(".faq-question");


const faqAnswers = {

    "How fast does it answer calls?":
        "IronSales is designed to answer incoming calls immediately so customers are not left waiting when your team is unavailable.",

    "Can it qualify leads?":
        "Yes. IronSales can ask questions based on your business, collect important caller details, and help determine what the customer needs.",

    "Can it book appointments?":
        "Yes. IronSales can be connected to your scheduling workflow so qualified callers can be offered available appointment times.",

    "What happens after hours?":
        "IronSales can continue handling incoming calls after normal business hours, collect caller information, and follow the workflow configured for your business."

};


/* =========================================
   OPEN FAQ
========================================= */

if (faqButton && faqBox) {

    faqButton.addEventListener(
        "click",
        function () {

            faqBox.classList.add(
                "open"
            );


            faqBox.setAttribute(
                "aria-hidden",
                "false"
            );


            faqButton.style.display =
                "none";

        }
    );

}


/* =========================================
   CLOSE FAQ
========================================= */

if (
    closeFaq &&
    faqBox &&
    faqButton
) {

    closeFaq.addEventListener(
        "click",
        function () {

            faqBox.classList.remove(
                "open"
            );


            faqBox.setAttribute(
                "aria-hidden",
                "true"
            );


            faqButton.style.display =
                "flex";

        }
    );

}


/* =========================================
   ADD FAQ MESSAGE
========================================= */

function addFaqMessage(
    text,
    type
) {

    if (!faqMessages) {
        return;
    }


    const message =
        document.createElement("div");


    message.className =
        "faq-message " + type;


    message.textContent =
        text;


    faqMessages.appendChild(
        message
    );


    faqMessages.scrollTop =
        faqMessages.scrollHeight;

}


/* =========================================
   FAQ QUESTIONS
========================================= */

faqQuestions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const question =
                    button.dataset.question;


                if (!question) {
                    return;
                }


                addFaqMessage(
                    question,
                    "question"
                );


                const answer =
                    faqAnswers[question] ||
                    "Contact IronSales and we'll answer your question.";


                setTimeout(
                    function () {

                        addFaqMessage(
                            answer,
                            "answer"
                        );

                    },
                    250
                );

            }
        );

    }
);


/* =========================================
   FORMSPREE FORM
   STAY ON IRONSALES AFTER SUBMISSION
========================================= */

const leadForm =
    document.getElementById("leadForm");


if (leadForm) {

    const submitButton =
        leadForm.querySelector(
            'button[type="submit"]'
        );


    /*
     * Create the confirmation-message area
     * automatically.
     *
     * This means you DO NOT need to change
     * index.html.
     */

    let formMessage =
        document.getElementById(
            "formMessage"
        );


    if (!formMessage) {

        formMessage =
            document.createElement("div");


        formMessage.id =
            "formMessage";


        formMessage.setAttribute(
            "role",
            "status"
        );


        formMessage.setAttribute(
            "aria-live",
            "polite"
        );


        formMessage.style.marginTop =
            "16px";


        formMessage.style.fontSize =
            "13px";


        formMessage.style.lineHeight =
            "1.6";


        if (submitButton) {

            submitButton.insertAdjacentElement(
                "afterend",
                formMessage
            );

        } else {

            leadForm.appendChild(
                formMessage
            );

        }

    }


    const normalButtonText =
        submitButton
            ? submitButton.textContent.trim()
            : "Request My Free Demo →";


    let isSubmitting =
        false;


    leadForm.addEventListener(
        "submit",
        async function (event) {

            /*
             * This prevents the browser from
             * leaving IronSales and opening
             * Formspree's page.
             */

            event.preventDefault();


            /*
             * Use normal browser validation.
             */

            if (!leadForm.checkValidity()) {

                leadForm.reportValidity();

                return;

            }


            /*
             * Prevent somebody from clicking
             * Submit several times.
             */

            if (isSubmitting) {
                return;
            }


            isSubmitting =
                true;


            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Submitting...";


                submitButton.style.opacity =
                    "0.7";

            }


            formMessage.textContent =
                "Submitting your request...";


            formMessage.style.color =
                "#94a3b8";


            try {

                /*
                 * Collect every field from the
                 * existing form.
                 */

                const formData =
                    new FormData(
                        leadForm
                    );


                /*
                 * Send directly to the Formspree
                 * endpoint already stored in the
                 * form's action attribute.
                 */

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


                /*
                 * SUCCESS
                 */

                if (response.ok) {

                    leadForm.reset();


                    formMessage.textContent =
                        "Thank you for submitting your request! Someone from our team will contact you shortly.";


                    formMessage.style.color =
                        "#93c5fd";


                    if (submitButton) {

                        submitButton.textContent =
                            "Request Submitted ✓";


                        submitButton.style.opacity =
                            "1";

                    }


                    /*
                     * Re-enable the button after
                     * a few seconds.
                     */

                    setTimeout(
                        function () {

                            isSubmitting =
                                false;


                            if (submitButton) {

                                submitButton.disabled =
                                    false;


                                submitButton.textContent =
                                    normalButtonText;

                            }

                        },
                        5000
                    );


                    return;

                }


                /*
                 * FORMSPREE RETURNED AN ERROR
                 */

                let errorMessage =
                    "We couldn't submit your request. Please try again.";


                try {

                    const data =
                        await response.json();


                    if (
                        data &&
                        Array.isArray(
                            data.errors
                        ) &&
                        data.errors.length
                    ) {

                        errorMessage =
                            data.errors
                                .map(
                                    function (error) {

                                        return error.message;

                                    }
                                )
                                .join(" ");

                    }

                } catch (error) {

                    /*
                     * Keep the default message.
                     */

                }


                throw new Error(
                    errorMessage
                );


            } catch (error) {

                /*
                 * ERROR
                 *
                 * The visitor stays on IronSales
                 * and their form information is
                 * NOT cleared.
                 */

                console.error(
                    "IronSales form submission error:",
                    error
                );


                isSubmitting =
                    false;


                formMessage.textContent =
                    "We couldn't submit your request. Please try again.";


                formMessage.style.color =
                    "#ffffff";


                if (submitButton) {

                    submitButton.disabled =
                        false;


                    submitButton.textContent =
                        normalButtonText;


                    submitButton.style.opacity =
                        "1";

                }

            }

        }
    );

}
