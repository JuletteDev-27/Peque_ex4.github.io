$(document).ready(() => {
    let grades = {
        "https://static.wikia.nocookie.net/gunplabuilders/images/4/4a/HGlogo.jpg": "HG",
        "https://fudoushin.wordpress.com/wp-content/uploads/2011/02/mg.jpg": "MG",
        "https://i0.wp.com/www.gunpla.co.uk/wp-content/uploads/2022/01/RGlogonew.png": "RG",
        "https://shokuningunpla.com/cdn/shop/collections/b7a639c4ef18200494c8c2d844df2e1f.gif?v=1611355978": "PG"
    };

    function getQueryParam(name) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    let itemId = getQueryParam('item');
    let itemGrade = getQueryParam('grade');
    let itemDetails = {}; // Initialize an empty object for item details
    let formModal = document.getElementById('form_modal'); // Getting the modal

    let qty = 0;
    $("#qty").text(qty);

    // Close the dialog when the close button is clicked
    $("#close-diag").on("click", (e) => {
        $("#form_modal").removeClass("flex"); // Close the modal
        e.preventDefault(); // Prevent default action of button
    });

    $("#sub").attr("disabled", true); 
    $("#buy-btn").attr("disabled", true);

    // Decrement quantity
    $("#sub").on("click", (e) => {
        if (qty > 1) {
            qty -= 1; // Decrease quantity
            $("#qty").text(qty);
        }
        if (qty == 1) {
            $("#sub").attr("disabled", true); // Disable if qty is 1
            $("#buy-btn").attr("disabled", true); // Disable buy button if qty is 1
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

    $.getJSON('assets/json/products.json', (data) => {
        for (let grade in grades) {
            let gradeAbbr = grades[grade]; 

            if (gradeAbbr == itemGrade) {
                let kits = data[gradeAbbr]; 

                kits.forEach((item) => {
                    if (item.id == itemId) {
                        itemDetails = { // Update the existing itemDetails object
                            "name": item.name,
                            "description": item.description,
                            "price": item.price,
                            "image": item.image,
                        };
                    }
                });

                console.log(itemDetails)

                // Update the modal content with the fetched item details
                $("#item-image").addClass(`bg-[url('${itemDetails.image}')]`);
                $("#item-name").text(itemDetails.name);
                $("#item-price").text(itemDetails.price);
                $("#item-desc").text(itemDetails.description);
                return; // Break out of the loop after finding the item
            }
        }
    });

    // Show the modal when the "buy" button is clicked
    $("#buy-btn").on("click", (e) => {
        let price = parseFloat($("#item-price").text().split(" ")[0]);
        let totalPrice = price * qty;

        $("#form_modal").addClass("flex");
        $("#base-price").val(price);
        $("#qty-total").val(qty);
        $("#total-price").val(totalPrice);
        e.preventDefault(); // Prevent default behavior
    });

    $("#payment_form").on("submit", (e) => {
        $("#payment_form")[0].reset();
        $("#form_modal").removeClass("flex");
        Swal.fire({
            title: 'Order Success!',
            text: 'Please check your email for further instructions regarding your order!',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        qty = 0; // Reset quantity
        $("#qty").text(qty);
        $("#sub").attr("disabled", true); 
        $("#buy-btn").attr("disabled", true);
        
        e.preventDefault();
    });
});
