$(document).ready(()=>{
    let isOpen = false

    $("#open-hidden").on("click", (e)=>{

        $("#hidden").removeClass("hidden");

        e.preventDefault();
    })

    $("#close-hidden").on("click", (e)=>{

        $("#hidden").addClass("hidden");

        e.preventDefault();
    })

    
    
})