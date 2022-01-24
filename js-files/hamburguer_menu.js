// This is for mobile hamburguer menu 
const hamburguer_menu = document.querySelector(".mobile_menu"); 
const content         = document.querySelector(".mobile_content");  
const openMenu        = document.querySelector("body > header > div.static_menu > button > i")

hamburguer_menu.addEventListener("click", function() {
    content.classList.toggle("active");
  
  if ( openMenu.classList.contains('fa-bars')) {
  
    openMenu.classList.remove('fa-bars');
    openMenu.classList.add('fa-times');
    disableScroll();
  } else {
    openMenu.classList.remove('fa-times');
    openMenu.classList.add('fa-bars');
    enableScroll(); 
  }
  
  }); 
  

     function enableScroll(){  window.onscroll = () =>{ }; }
     function disableScroll(){
        // Get the current page scroll position
        scrollTop = 
        window.pageYOffset || document.documentElement.scrollTop;
        scrollLeft = 
        window.pageXOffset || document.documentElement.scrollLeft;
        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = ()=>  window.scrollTo(scrollLeft, scrollTop);
      }
