$(document).ready(() => {
    $.getJSON('assets/json/carousel-items.json', (data) => {
        const totalItems = data.length; 
        let currentIndex = 0; 

     
        function showSlide(index) {
            const offset = -index * 100; 
            $('.carousel-inner').css('transform', `translateX(${offset}%)`);
        }

       
        data.forEach((item) => {
            $(".carousel-inner").append(`
                <div class="carousel-item relative"> 
                    <div class="w-full h-[500px] bg-gray-900 text-white flex flex-col justify-center items-center bg-[url('${item.image}')] bg-cover bg-center lg:bg-top">
                        <div class="absolute w-full h-full top-0 left-0 bg-gray-500/40" style="z-index: 0"></div>
                        <div class="flex flex-col items-center" style="z-index: 1">
                            <h1 class="text-4xl md:text-5xl pb-4 font-black drop-shadow-lg">${item.title}</h1>
                            <p class="text-xl pb-6 w-1/2 text-center md:w-full md:text-2xl drop-shadow-lg">${item.description}</p>
                            <a href="${item.link}" class="bg-blue-500 p-3 text-xl rounded-full font-bold md:text-2xl shadow-lg">Learn More</a>
                        </div>
                    </div>
                </div>
            `);
        });

       
        $('#next').on('click', function() {
            currentIndex = (currentIndex + 1) % totalItems; 
            showSlide(currentIndex);
        });

        $('#prev').on('click', function() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems; 
            showSlide(currentIndex);
        });

        // Swipe detection variables
        let touchStartX = 0;
        let touchEndX = 0;

        // Add event listeners for touch events
        $('.carousel').on('touchstart', (e) => {
            touchStartX = e.originalEvent.touches[0].clientX; 
        });

        $('.carousel').on('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX; 

            handleSwipe();
        });

       
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
               
                currentIndex = (currentIndex + 1) % totalItems;
                showSlide(currentIndex);
            }

            if (touchEndX > touchStartX + 50) {
           
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                showSlide(currentIndex);
            }
        }

       
        showSlide(currentIndex);
    });
});
