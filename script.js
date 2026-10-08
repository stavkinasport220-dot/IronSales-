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
