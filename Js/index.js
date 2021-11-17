
// read color in local storage
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null){
    // if color exist change css variable
    document.documentElement.style.setProperty("--main-color",mainColor);
    // chack on active class 
    document.querySelectorAll(".colors-list li").forEach(element =>{
       // remove it from all elements
        element.classList.remove("active");
        // chack to find matched with localStorage
        if(element.getAttribute("data-color") == mainColor){
            // add it to the color found in local storage
            element.classList.add("active");
        }
    });
}

// read background option from localstorage
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background_option");
if(backgroundLocalItem !== null){
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    });

    if(backgroundLocalItem == true){
        backgroundOption = true;
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        backgroundOption = false;
        document.querySelector(".random-background .no").classList.add("active");
    } 
}

// read nav bullets options from local storage
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach(element => {
    element.classList.remove("active");
  });
  if (bulletLocalItem == "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }

}

// setting box open 
document.querySelector(".toggle-settings .fa-gear").addEventListener("click",function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
})


// save background option in localstorage
document.querySelectorAll(".random-background span").forEach(element =>{
    element.addEventListener("click",function(e){
        handleActiveClass(e);
        if(e.target.getAttribute("data-backgroud") == "yes"){
            backgroundOption = true;
            changeImage();
            localStorage.setItem("background_option",backgroundOption);
            
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",backgroundOption);
            
        }
    })
});

// home section change background image randomly
function changeImage(){
    let imgArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
    if(backgroundOption == true){
        backgroundInterval =  setInterval(function(){
            let randomImg = (Math.floor(Math.random() * imgArray.length));
            document.querySelector(".image-container").style.backgroundImage = "url('images/"+imgArray[randomImg]+"')";
        },10000);
    }
}
changeImage();


// change the color of web site
let colorList = document.querySelectorAll(".colors-list li");
colorList.forEach(element =>{
    // add eventlistner on all colors
    element.addEventListener("click",function(e){
        // save choosen color in variable
        let color = e.target.getAttribute("data-color");
        // Access the css variable and change its value with the choosen color
        document.documentElement.style.setProperty('--main-color',color);
        // save choosen color in local storage
        localStorage.setItem("color_option",color);
        handleActiveClass(e);
    })
});


// save nav bullet option to local storage
bulletsSpan.forEach(element => {
  element.addEventListener("click", (e) => {
    if (element.getAttribute("data-display") == "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActiveClass(e);
  });
});

// reset button 
document.querySelector(".reset-options").addEventListener("click",function(){
    // local storage remove Items
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    // relod window
    window.location.reload();
});

// handle active class to events
function handleActiveClass(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

// image pop up
let img = document.querySelectorAll(".img-box img");
img.forEach(img =>{
    img.addEventListener("click",function(){
        let modal = document.querySelector(".modal");
        modal.classList.add("show");
        modal.style.display = "block";
        let title = document.querySelector(".modal .modal-header h5");
        title.textContent = img.getAttribute("alt");
        let content = document.querySelector(".modal .modal-body img");
        content.setAttribute("src",img.getAttribute("src"));
        content.setAttribute("alt",img.getAttribute("alt"));
    });
});

// nav bar toggle button
let toggleButton = document.querySelector("#home .navbar button");
toggleButton.addEventListener("click",function(){
    let title = document.querySelector("#home .title");
    if(title.style.transform == "translate(-50%, -12%)"){
        title.style.transform = "translate(-50%, -50%)";
    }
    else{
        title.style.transform = "translate(-50%, -12%)";
    }
});


