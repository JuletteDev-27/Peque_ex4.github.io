$(document).ready(() => {
    // Grade names and their corresponding abbreviations
    let grades = {
        "https://static.wikia.nocookie.net/gunplabuilders/images/4/4a/HGlogo.jpg": "HG",
        "https://fudoushin.wordpress.com/wp-content/uploads/2011/02/mg.jpg": "MG",
        "https://i0.wp.com/www.gunpla.co.uk/wp-content/uploads/2022/01/RGlogonew.png": "RG",
        "https://shokuningunpla.com/cdn/shop/collections/b7a639c4ef18200494c8c2d844df2e1f.gif?v=1611355978": "PG"
    };

    

    $.getJSON('assets/json/products.json', (data) => {
        // Iterate over each grade
        for (let grade in grades) {
            let gradeAbbr = grades[grade]; // Get the correct abbreviation (e.g., HG, MG)

            // Append the grade title and create a container for the kits
            $("#kits").append(`
                <img src="${grade}" class="max-w-96">
                <div id="${gradeAbbr}" class="grid-cols-1 md:grid-cols-2 grid place-items-center gap-5 lg:grid-cols-3"></div>
            `);

            // Get the kits for this grade
            let kits = data[gradeAbbr]; // Access the corresponding kits using the abbreviation

            // Now append each item in the respective grade's div
            kits.forEach((item) => {
                $(`#${gradeAbbr}`).append(`
                    <a href="views/buyKit.html?item=${item.id}&grade=${gradeAbbr}" class="flex flex-col justify-start w-full lg:w-[500px] gap-4 shadow-2xl rounded-2xl p-4 min-h-[580px] hover:scale-125 hover:m-5 bg-white transition-all ease-out cursor-pointer border-gray-300 border-2 hover:border-green-500 hover:border-[10px] hover:shadow-green-900">
                        <div class="w-full   h-72 bg-[url('${item.image}')] bg-cover bg-center rounded-lg"></div>
                        <h1 class="font-bold text-2xl">${item.name}</h1>
                        <p class="w-3/4 text-xl">${item.description}</p>
                        <p class="text-2xl font-semibold italic"> PHP ${item.price}</p>
                        <p>Remaining Stock: ${item.remaining_stock}</p>
                    </a>
                `);
            });
        }
    });
});
