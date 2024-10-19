$(document).ready(() => {
    function getQueryParam(name) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    let itemId = getQueryParam('item');
    let itemDetails = {};
    let formModal = document.getElementById('form_modal'); // Getting the modal

    let qty = 0;

    formModal.close()
    // Close the dialog when the close button is clicked
    $("#close-diag").on("click", (e) => {
        $("#form_modal").removeClass("flex") // Close the modal
        e.preventDefault(); // Prevent default action of button
    });

    $("#qty").text(qty);

    $("#sub").attr("disabled", true); 
    $("#buy-btn").attr("disabled", true)


    // Decrement quantity
    $("#sub").on("click", (e) => {
        if (qty == 1) {
            $("#sub").attr("disabled", true);
            $("#buy-btn").attr("disabled", true) // Disable if qty is zero or less
            qty -= 1;
            $("#qty").text(qty);
        } else {
            qty -= 1; // Decrease quantity
            $("#qty").text(qty);
        }
        e.preventDefault(); // Prevent form submission
    });

    // Increment quantity
    $("#add").on("click", (e) => {
        qty += 1; // Increase quantity
        $("#qty").text(qty);

        // Enable the "sub" button if qty is greater than 0
        if (qty > 0) {
            $("#sub").removeAttr("disabled");
            $("#buy-btn").removeAttr("disabled");
        }

        e.preventDefault(); // Prevent form submission
    });

    // Fetch the item details from the JSON file
    $.getJSON('/assets/json/pre-order-items.json', (data) => {
        data.forEach((item) => {
            if (item.id == itemId) {
                itemDetails = {
                    "name": item.name,
                    "image": item.image,
                    "price": item.price,
                };
            }
        });

        // Update the modal content with the fetched item details
        $("#item-image").addClass(`bg-[url('${itemDetails.image}')]`);
        $("#item-name").text(itemDetails.name);
        $("#item-price").text(itemDetails.price);
    });

    // Show the modal when the "buy" button is clicked
    $("#buy-btn").on("click", (e) => {

        let totalPrice = $("#item-price").text().split(" ")[0] * $("#qty").text()

        $("#form_modal").addClass("flex")
        $("#base-price").val($("#item-price").text().split(" ")[0])
        $("#qty-total").val($("#qty").text())
        $("#total-price").val(totalPrice)
        e.preventDefault(); // Prevent default behavior
    });

    $("#payment_form").on("submit", (e)=>{
        $("#payment_form")[0].reset();
        $("#form_modal").removeClass("flex")
        Swal.fire({
            title: 'Order Success!',
            text: 'Please check your email for further instructions regarding your order!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        qty = 0;
        $("#qty").text(qty);
        $("#sub").attr("disabled", true); 
        $("#buy-btn").attr("disabled", true)
        
        e.preventDefault();
    })
});
