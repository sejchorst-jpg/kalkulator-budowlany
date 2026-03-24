// Funkcja do obliczenia ceny jednostkowej * ilość
function updatePrice() {
    let total = 0; // Zmienna na łączną cenę

    // Iteracja przez wszystkie produkty
    document.querySelectorAll('.item').forEach(item => {
        const checkbox = item.querySelector('.toggle');
        const quantityInput = item.querySelector('.quantity');
        const resultSpan = item.querySelector('.result');
        const priceText = item.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('Cena: ', '').replace(' zł', ''));

        // Jeśli checkbox jest zaznaczony, a ilość większa niż 0
        if (checkbox.checked) {
            const quantity = parseInt(quantityInput.value) || 0; // Jeżeli pole jest puste, traktujemy jako 0
            if (quantity > 0) {
                const totalPrice = price * quantity;
                resultSpan.textContent = `Cena łączna: ${totalPrice.toFixed(2)} zł`; // Aktualizowanie ceny łącznej
                total += totalPrice; // Dodawanie ceny produktu do łącznej ceny
            } else {
                resultSpan.textContent = `Cena łączna: 0 zł`; // Jeśli ilość jest 0, cena łączna to 0 zł
            }
        } else {
            resultSpan.textContent = `Cena łączna: 0 zł`; // Jeśli checkbox nie jest zaznaczony, cena łączna to 0 zł
        }
    });

    // Wyświetlenie łącznej ceny na stronie
    document.querySelector('.total').textContent = `Łączna cena: ${total.toFixed(2)} zł`;
}

// Dodanie nasłuchiwaczy zdarzeń na zmiany w checkboxach oraz ilości
document.querySelectorAll('.toggle').forEach(checkbox => {
    checkbox.addEventListener('change', updatePrice); // Po zmianie stanu checkboxa
});

document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', updatePrice); // Po zmianie ilości
});

// Funkcja inicjalizująca, aby cena na początku była ustawiona na 0 zł
function initPrice() {
    document.querySelector('.total').textContent = 'Łączna cena: 0 zł'; // Inicjalizowanie ceny na 0 zł
    updatePrice(); // Zaktualizowanie ceny po załadowaniu strony
}

// Funkcja drukowania
document.getElementById("printButton").addEventListener('click', function() {
    const selectedItems = document.querySelectorAll('.item input[type="checkbox"]:checked'); // Pobieramy zaznaczone elementy
    if (selectedItems.length === 0) {
        alert("Proszę zaznaczyć przynajmniej jeden produkt.");
        return;
    }

    let printContent = ''; // Zmienna przechowująca zawartość do druku
    let totalCost = 0;

    selectedItems.forEach(item => {
        const parentItem = item.closest('.item');
        const label = parentItem.querySelector('label').textContent; // Nazwa produktu
        const quantity = parentItem.querySelector('.quantity').value || 0; // Ilość
        const priceText = parentItem.querySelector('.result').textContent; // Cena łączna (Cena jednostkowa * Ilość)
        const itemTotal = parseFloat(priceText.replace('Cena łączna: ', '').replace(' zł', ''));

        // Obliczenie łącznej ceny dla produktu
        totalCost += itemTotal;

        // Dodanie elementu do treści do druku (teraz tylko nazwa produktu, ilość i cena łączna)
        printContent += `
            <div class="print-item">
                <p><strong>${label}</strong></p>
                <p>Ilość: ${quantity}</p>
                <p>Łączna cena: ${itemTotal.toFixed(2)} zł</p>
                <hr>
            </div>
        `;
    });

    // Dodanie łącznej ceny
    printContent += `
        <div class="total-cost">
            <h2>Łączna cena: ${totalCost.toFixed(2)} zł</h2>
        </div>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Drukuj</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

// Wywołanie funkcji na początku, aby zaktualizować ceny po załadowaniu strony
initPrice();
