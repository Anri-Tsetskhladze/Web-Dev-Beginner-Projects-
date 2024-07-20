document.addEventListener("DOMContentLoaded", function() {
    // Show form with animation
    const formContainer = document.querySelector(".form-container");
    setTimeout(() => {
        formContainer.classList.add("show");
    }, 100);

    // Form submission alert
    document.getElementById("surveyForm").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("თქვენი პასუხები წარმატებით გაიგზავნა!");
        this.submit();
    });

    // Input focus animation
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.backgroundColor = "#e0ffe0";
        });
        input.addEventListener("blur", () => {
            input.style.backgroundColor = "";
        });
    });
});
