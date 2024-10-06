document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    let currentStep = 0;

    // Show the first step
    showStep(currentStep);

    // Next button event listener
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Previous button event listener
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Form submit event listener
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateStep(currentStep)) {
            alert('Form submitted successfully!');
        }
    });

    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index === step);
        });
        updateSummary();
    }

    function validateStep(step) {
        let isValid = true;

        if (step === 0) { // Step 1: User Information
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');

            emailError.textContent = '';
            passwordError.textContent = '';

            // Email validation
            if (!email.value || !validateEmail(email.value)) {
                emailError.textContent = 'Please enter a valid email.';
                isValid = false;
            }

            // Password strength validation
            if (!validatePassword(password.value)) {
                passwordError.textContent = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.';
                isValid = false;
            }
        }

        if (step === 1) { // Step 2: Personal Details
            const age = document.getElementById('age');
            const name = document.getElementById('name');
            const ageError = document.getElementById('age-error');
            const nameError = document.getElementById('name-error');

            ageError.textContent = '';
            nameError.textContent = '';

            // Age validation
            if (!age.value || age.value <= 0) {
                ageError.textContent = 'Please enter a valid age.';
                isValid = false;
            }

            // Name validation
            if (!name.value) {
                nameError.textContent = 'Please enter your full name.';
                isValid = false;
            }
        }

        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /\d/.test(password);
    }

    function updateSummary() {
        const summary = document.getElementById('summary');
        if (currentStep === 2) {
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;

            summary.innerHTML = `
                <p>Email: ${email}</p>
                <p>Name: ${name}</p>
                <p>Age: ${age}</p>
            `;
        } else {
            summary.innerHTML = '';
        }
    }
});
