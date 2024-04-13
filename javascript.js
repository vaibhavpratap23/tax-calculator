document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('resultModal');
    const closeBtn = document.querySelector('.close');
    const ageError = document.getElementById('ageError');
    const incomeError = document.getElementById('incomeError');
    const extraIncomeError = document.getElementById('extraIncomeError');
    const deductionsError = document.getElementById('deductionsError');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const age = document.getElementById('age').value;
        const income = parseFloat(document.getElementById('income').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const deductions = parseFloat(document.getElementById('deductions').value);

        // Validation
        let isValid = true;
        if (isNaN(income) || income < 0) {
            incomeError.style.display = 'block';
            isValid = false;
        } else {
            incomeError.style.display = 'none';
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            extraIncomeError.style.display = 'block';
            isValid = false;
        } else {
            extraIncomeError.style.display = 'none';
        }
        if (isNaN(deductions) || deductions < 0) {
            deductionsError.style.display = 'block';
            isValid = false;
        } else {
            deductionsError.style.display = 'none';
        }
        if (age === '') {
            ageError.style.display = 'block';
            isValid = false;
        } else {
            ageError.style.display = 'none';
        }

        if (isValid) {
            const taxAmount = calculateTax(income, extraIncome, deductions, age);
            document.getElementById('taxAmount').textContent = `Tax Amount: ${taxAmount} Lakhs`;
            modal.style.display = 'block';
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function calculateTax(income, extraIncome, deductions, age) {
        const totalIncome = income + extraIncome - deductions;
        let tax = 0;

        if (totalIncome > 800000) {
            if (age === '<40') {
                tax = 0.3 * (totalIncome - 800000);
            } else if (age === '>=40&<60') {
                tax = 0.4 * (totalIncome - 800000);
            } else {
                tax = 0.1 * (totalIncome - 800000);
            }
        }

        return tax.toFixed(2);
    }
});
