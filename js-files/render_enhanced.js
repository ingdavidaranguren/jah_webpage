const canvas = document.getElementById("canvas_container"); 
const context = canvas.getContext('2d'); 
const html = document.documentElement; 
const frameCount = 77; 
let width = 1920, height = 1080; 
const img = new Image(); 

let loader  = document.querySelector(".loader"); 
let textWrapper = document.querySelector('.loader-title');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='word'>$&</span>");

let close_btn = document.querySelector('.close-modal');
let modal_container   = document.querySelector('.modal-container');

const  element1   = document.querySelector('.go-contact-from-modal');
const  element2  = document.querySelector('.container2-subtitle p');
const  element3  = document.querySelector('.contact-button');
const  element4  = document.querySelector(".bar-mobile");

const hamburguer_menu = document.querySelector(".mobile_menu"); 
const content         = document.querySelector(".mobile_content");  
const openMenu        = document.querySelector("body > header > div.static_menu > button > i"); 

const smallDevices =  window.matchMedia('(min-width:320px) and (max-width:854px)'); 
const pre_gallery  =  document.querySelector('.pre_gallery_container');
let   modal_fired  =  false; 

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

const currentImageclass = index => (`.main-animation-${index.toString()}`); 
const  updateFrame = (index)=>
{         
      
      let render_image = document.querySelector(currentImageclass(index)); 
      context.drawImage(render_image, 0, 0);
}
window.onresize = () =>{
    width =  window.innerWidth;  
    height = window.innerHeight; 
}
  canvas.width =  width; 
  canvas.height = height;     


close_btn.addEventListener("click", function()
{
  modal_container.style.display = "none"; 
  enableScroll();  
}); 

smallDevices.addEventListener('change', handleSmallDeviceChange); 

[element1,element2,element3,element4].forEach((element)=>{
   element.addEventListener('click', function(){

        const url = "https://apex.oracle.com/pls/apex/david_aworkspace/r/aei-jah-aplicaci%C3%B3n-gestion-empresarial/wp-contact-us"; 
        window.open (url, '_blank');     
 });
});

handleSmallDeviceChange(smallDevices); 
img.src = '/images/new_render/1.jpg';
img.onload = ()=> context.drawImage(img, 0, 0);

function init(smallDevice)
{
    window.scrollTo(0,0); 
    setTimeout(() => { loader.classList.add("disappear");}, 3800);
    startWordsAnimation(); 
    if(smallDevice){ 
      loader.addEventListener("animationend", function()
      {
        enableScroll();  
      }); 
        
    }
    else 
    {
      loader.addEventListener("animationend", function()
      {
          modal_container.style.display= "flex";    
      }); 
    }
}

function startWordsAnimation()
{
  disableScroll(); 

  anime.timeline({loop: false})
  .add({
  targets: '.loader-title .word',
  translateX: [40,0],
  translateZ: 0,
  opacity: [0,1],
  easing: "easeOutExpo",
  duration: 800,
  delay: (el, i) => 500 + 30 * i
  }).add({
  targets: '.loader-title .word',
  translateX: [0,-30],
  opacity: [1,0],
  easing: "easeInExpo",
  duration: 500,
  delay: (el, i) => 100 + 30 * i
  });

}

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
                        
                        scrollTop = 
                        window.pageYOffset || document.documentElement.scrollTop;
                        scrollLeft = 
                        window.pageXOffset || document.documentElement.scrollLeft;
                        window.onscroll = ()=>  window.scrollTo(scrollLeft, scrollTop);
                        }

function handleSmallDeviceChange(e) {
    if (e.matches) {  init(true); }
    else {  init(false);    }
}
                                
