$(document).ready(()=>{
    $.getJSON('assets/json/pre-order-items.json', (data) => {
        data.forEach((item) => {
            $("#pre-order").append(`
                <a href="pre-order-component.html?item=${item.id}" class="hover:scale-125 hover:ease-in-out hover:mx-5 hover:transition-all">
                    <div class="w-72 h-72 bg-[url('${item.image}')] bg-cover bg-center rounded-lg"></div>
                    <h1 class="text-xl font-bold">${item.name}</h1>
                    <p class="text-lg">${item.grade} - ${item.scale}</p>
                    <p class="text-lg">Pre-order-close-date: ${item.pre_order_close_date}</p>
                    <p class="font-bold">${item.price}</p>
                     <p class="text-lg">Expected Release Date: ${item.expected_release_date}</p>
                </a>
                
            `);
        });
    });
})