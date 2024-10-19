$(document).ready(()=>{
    $.getJSON('assets/json/coming-soon-items.json', (data) => {
        data.forEach((item) => {
            $("#coming-soon").append(`
                <div>
                    <div class="w-72 h-72 bg-[url('${item.image}')] bg-cover rounded-lg"></div>
                    <h1 class="text-xl font-bold">${item.name}</h1>
                    <p class="text-lg">${item.grade} - ${item.scale}</p>
                    <p class="text-lg">Release Date: ${item.release_date}</p>
                    <p class="font-bold">${item.price}</p>
                </div>
                
            `);
        });
    });
})