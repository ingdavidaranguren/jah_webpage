// Variable declaration for main render
const canvas = document.getElementById("canvas_container"); 
const context = canvas.getContext('2d'); 
const subtitle = document.querySelector(".main_subtitle"); 
const img = new Image(); 
const html = document.documentElement; 
const frameCount = 77;  // Number of images...
let width = 1920, height = 1080; // images size

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

// Function declaration for main reder
const currentFrame = index => ( `/images/renders-wp/${index.toString()}.jpg`); 
const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    }; 
const  updateFrame = (index)=>
{         
       img.src = currentFrame(index);
       context.drawImage(img, 0, 0);
}

//  // taking care of viewport responsive size----  
  window.onresize = () =>{
    width =  window.innerWidth;  
    height = window.innerHeight; 
  }
  canvas.width =  width; 
  canvas.height = height;     
// // Scope____________________________________________   
img.src = currentFrame(1);  
img.onload = ()=> context.drawImage(img, 0, 0);
preloadImages(); 
enableScroll(); 

function enableScroll(){
                window.onscroll = () =>{
                  
                let container_height = document.querySelector('.render_container').offsetHeight;
                const maxScrollTop = container_height - window.innerHeight;
                const scrollTop = html.scrollTop; 
                const scrollFraction = (scrollTop / maxScrollTop);
                const frameIndex = Math.min(
                        frameCount-1 , 
                        Math.floor(scrollFraction*frameCount) 
                ); 
                window.requestAnimationFrame(() => updateFrame(frameIndex+1)); 
                }; 
                       }
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
