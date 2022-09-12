let mainColor = window.localStorage.getItem("color");
if(mainColor!== null){
    document.documentElement.style.setProperty("--mainColor" , mainColor);
    let colorLis = document.querySelectorAll(".color-list li");
    colorLis.forEach(li=>{
        li.classList.remove("active");
        if (li.dataset.color === mainColor){
            li.classList.add("active");
        }
    });
}

let iconContainer = document.querySelector(".icon-container");
let settingBox = document.querySelector(".settings-box");
let gear =document.querySelector(".icon-container .fa-gear");

iconContainer.addEventListener("click" , function(){
    settingBox.classList.toggle("open");
    gear.classList.toggle("fa-spin");
    
});

let colorLis = document.querySelectorAll(".color-list li");
colorLis.forEach((li)=>{
    li.addEventListener("click" , (e)=>{
       handleActive(e);
       document.documentElement.style.setProperty("--mainColor" , e.target.dataset.color);
       window.localStorage.setItem("color",e.target.dataset.color);
    });
    
});
let landingPage=document.querySelector(".landing-page");
let images= ["home-2.jpg", "home-3.jpg", "home-1.jpg"]
let backgroundChange ;
let backoption=window.localStorage.getItem("backgroundOption");
if(backoption!== null){
    if(backoption==="yes"){
        randomizeImg();
        document.querySelector(".random-background .yes").classList.add("active");
        document.querySelector(".random-background .no").classList.remove("active");
    }
    else{
        clearInterval(backgroundChange)
        document.querySelector(".random-background .no").classList.add("active");
        document.querySelector(".random-background .yes").classList.remove("active");
        landingPage.style.cssText=`background-image:url("img/${images[window.localStorage.getItem("numberOfBackground")]}");`;
        
    }
}
function randomizeImg(){
    backgroundChange =setInterval(function(){
        let randomnumber= Math.floor(Math.random()* images.length);
        window.localStorage.setItem("numberOfBackground", `${randomnumber}`);
        landingPage.style.cssText=`background-image:url("img/${images[randomnumber]}");`;
    },5000);
    
}

// random background option
let backgroundOptions = document.querySelectorAll(".random-background span");
backgroundOptions.forEach(span=>{
    span.addEventListener("click" , (e)=>{
        handleActive(e);
        window.localStorage.setItem("backgroundOption",e.target.dataset.background );
        if(e.target.dataset.background === "no"){
            clearInterval(backgroundChange);
            landingPage.style.cssText=`background-image:url("img/${images[window.localStorage.getItem("numberOfBackground")]}");`;
        }
        else{
            randomizeImg();
        }
    });
});
//show bullets 
let buttetsOptions =document.querySelectorAll(".show-bullets span");
let bulletsContainer = document.querySelector(".nav-bullets")
let displayOption= window.localStorage.getItem("display");
buttetsOptions.forEach(ele=>{
    ele.addEventListener("click" , (e)=>{
        handleActive(e);
        window.localStorage.setItem("display" , e.target.dataset.display);
        if(e.target.dataset.display === "block"){
            bulletsContainer.style.display="block";
            
        }
        else if(e.target.dataset.display === "none"){
            bulletsContainer.style.display="none";
        }
    });
});
if(displayOption!== null){
    buttetsOptions.forEach(ele =>{
        ele.classList.remove("active");
        if(displayOption === ele.dataset.display){
            ele.classList.add("active");
            bulletsContainer.style.display=ele.dataset.display;
        }
    });
}
//reset button 
document.querySelector(".reset-button").onclick = ()=>{
    localStorage.removeItem("display");
    localStorage.removeItem("backgroundOption");
    localStorage.removeItem("color");
    window.location.reload();
}
// header links
let linkslis = document.querySelectorAll(".links li");
linkslis.forEach(li=>{
    li.addEventListener("click" , (e)=>{
        handleActive(e);
        scrollToSection(e.target.dataset.section);
    });
});

// skill progress
let skillSection = document.querySelector(".skills");

window.addEventListener("scroll", function(){
    if(window.scrollY > (skillSection.offsetTop + skillSection.offsetHeight - window.innerHeight)){
        let progresses = document.querySelectorAll(".skill-progress span");
        progresses.forEach(span => {
            span.style.width=span.dataset.progress;
        });
        }

});
// gallery 
let galleryImg = document.querySelectorAll(".gallery img");
galleryImg.forEach(img=>{
    img.addEventListener("click", ()=>{
        let popupOverlay = document.createElement("div");
        popupOverlay.classList.add("popup-overlay");
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        let closeButton = document.createElement("sapn");
        closeButton.innerText="X";
        closeButton.classList.add("close-button")
        popupBox.appendChild(closeButton);
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);
        popupOverlay.appendChild(popupBox);
        document.body.appendChild(popupOverlay);
        if(img.alt!== null){
            let headTittle = document.createElement("h3");
            console.log(img.alt);
            headTittle.innerText=img.alt;
            popupImg.before(headTittle);
        }
    });
});

document.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("close-button")){
        document.querySelector(".popup-overlay").remove();
    }
    
});
// nav bullets
let bullets = document.querySelectorAll(".bullet");
bullets.forEach(bullet=>{
    bullet.addEventListener("click" , (e)=>{
        handleActive(e);
        scrollToSection(e.target.dataset.section);
    });
});
function scrollToSection(element){
    document.querySelector(element).scrollIntoView({
        behavior:"smooth",
    })
}
function handleActive(element){
    element.target.parentElement.querySelectorAll(".active").forEach(ele=>{
        ele.classList.remove("active");
    });
    element.target.classList.add("active");
}
// toggle menu
let toggleMenu = document.querySelector(".toggle-menu");
let nav = document.querySelector(".links");
toggleMenu.addEventListener("click" , (e)=>{
    console.log("hello");
    toggleMenu.classList.toggle("menu-active");
    nav.classList.toggle("open");
    e.stopPropagation();
});

document.addEventListener("click",(e)=>{
    if(e.target!== nav && e.target !== toggleMenu){
        if(nav.classList.contains("open")){
            nav.classList.remove("open");
            toggleMenu.classList.remove("menu-active");
        }
    }
});