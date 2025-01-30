document.addEventListener("DOMContentLoaded", () => {
  const pageButtons = document.querySelectorAll(".sizes .size");
  const priceElement = document.querySelector(".price");
  const notebookTypeSelect = document.getElementById("notebook-type");
  const quantityInput = document.getElementById("quantity");
  const resultDiv = document.getElementById("result");
  
  // Price mapping
  const priceMapping = {
      200: 199,
      300: 279,
      400: 329
  };

  // Event listener for size selection
  pageButtons.forEach(button => {
      button.addEventListener("click", () => {
          pageButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");
          
          const pageValue = parseInt(button.textContent);
          if (priceMapping[pageValue]) {
              priceElement.textContent = `₹${priceMapping[pageValue]}.00`;
          }
      });
  });

  // Function to calculate total price
  function calculateTotal() {
      const notebookType = notebookTypeSelect.value;
      const quantity = parseInt(quantityInput.value) || 1;
      
      let pricePerNotebook = priceMapping[notebookType] || 199;
      let deliveryCharge = quantity >= 3 ? 0 : 79;
      let discount = quantity >= 4 ? 0.10 : 0;
      
      let total = pricePerNotebook * quantity + deliveryCharge;
      total -= total * discount;
      total = Math.floor(total);
      
      resultDiv.innerHTML = `Total Price: ₹${total}`;
  }

  // Attach event listeners to update price dynamically
  notebookTypeSelect.addEventListener("change", calculateTotal);
  quantityInput.addEventListener("input", calculateTotal);
});
