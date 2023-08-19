
//navbar behavior

let navbar = document.querySelector('nav');
let oldscroll = 0;

window.addEventListener('scroll', function () {
    if (scrollY > oldscroll && oldscroll != 0) { //scroll down case
        navbar.style.cssText = `top: -65px !important;
        background-color: #333333 !important;`;
    }
    else if (scrollY < oldscroll && window.scrollY >= 600) {
        navbar.style.cssText = `top: 0 !important;
        background-color: #333333 !important;`;
    }
    else {
        navbar.style.cssText = "background-color: #transparent !important;";
    }
    oldscroll = scrollY;
});

let navSections = document.querySelectorAll('.nav-link');
let navMenu = document.querySelector('.navbar-collapse');

for (let i = 0; i < navSections.length; i++) {
    navSections[i].addEventListener('click', function () {
        for (let j = 0; j < navSections.length; j++) {
            navSections[j].classList.remove('active');
        }
        navSections[i].classList.add('active');
        navMenu.classList.remove('show');
    });
}

let shuffleElments = document.querySelectorAll('#portfolio .row-img');

let shuffleSelector = document.querySelectorAll('.shuffle li');

for (let i = 0; i < shuffleSelector.length; i++) {
    shuffleSelector[i].addEventListener('click', function (e) {
        for (let i = 0; i < shuffleSelector.length; i++) {
            shuffleSelector[i].classList.remove('active');
        }
        shuffleSelector[i].classList.add('active');
        let shuffleCase = e.target.lastChild.data;
        shuffleFun(shuffleCase);
    })
}

function shuffleFun(shuffleCase) {
    switch (shuffleCase) {
        case 'graphic':
            for (let i = 0; i < shuffleElments.length; i++) {
                if (shuffleElments[i].classList.contains('graphic')) {
                    shuffleElments[i].classList.remove('d-none');
                }
                else {
                    shuffleElments[i].classList.add('d-none');
                }
            }
            break;

        case 'web design':
            for (let i = 0; i < shuffleElments.length; i++) {
                if (shuffleElments[i].classList.contains('web')) {
                    shuffleElments[i].classList.remove('d-none');
                }
                else {
                    shuffleElments[i].classList.add('d-none');
                }
            }
            break;

        case 'branding':
            for (let i = 0; i < shuffleElments.length; i++) {
                if (shuffleElments[i].classList.contains('branding')) {
                    shuffleElments[i].classList.remove('d-none');
                }
                else {
                    shuffleElments[i].classList.add('d-none');
                }
            }
            break;

        default:
            for (let i = 0; i < shuffleElments.length; i++) {
                shuffleElments[i].classList.remove('d-none');
            }
            break;
    }
}

let portfolioImageList = Array.from(document.querySelectorAll('.image-layer'));
let portfolioLink = Array.from(document.querySelectorAll('.link-layer'));
let popupVideo = document.querySelector('.video-layer');
let lightboxContainer = document.querySelector('.lightbox-container');
let popupImageContainer = document.querySelector('.popup-image-container');
let popupLinkContainer = document.querySelector('.popup-link');
let popupVideoContainer = document.querySelector('.popup-video');
let popupLinkImage = document.querySelector('.link-info img');
let popupVideoFrame = document.querySelector('.video-holder iframe');
let popupImage = document.querySelector('.popup-image .img-slider');
let nextButton = document.querySelector('#next-img');
let prevButton = document.querySelector('#prev-img');
let closeButton = document.querySelectorAll('.close');
let imageCurrentIndex = 0;
let currentFeedbackIndex = 0;
let clientsFeedback = document.querySelectorAll('.clinet');
let feedbackBullets = Array.from(document.querySelectorAll('.bullets li'));
let memberCounterElement = document.querySelectorAll('.element-counter');
let counter = [];
let counterLimit = [];
let counterInterval = [];
let counterTime = [];

//set item counter
for (let i = 0; i < memberCounterElement.length; i++) {
    counter[i] = 0;
    counterInterval[i] = 0;
    counterLimit[i] = memberCounterElement[i].getAttribute('value');
    counterTime[i] = 1 / (counterLimit[i] / 5) * 1000;
}

function interval(index) {
    counterInterval[index] = setInterval(() => {
        counterIncrement(index, counterLimit[index]);
    }, counterTime[index]);
}
for (let i = 0; i < memberCounterElement.length; i++) {
    interval(i);
}
function counterIncrement(index, limit) {
    counter[index]++;
    memberCounterElement[index].innerHTML = counter[index];
    if (counter[index] == limit) {
        clearInterval(counterInterval[index]);
    }
}

setInterval(() => {

}, interval);

//Client's Feedback slider

for (let i = 0; i < feedbackBullets.length; i++) {
    feedbackBullets[i].addEventListener('click', function (e) {
        if (e.target.classList.contains('active-bullet') == 0) {
            for (let i = 0; i < feedbackBullets.length; i++) {
                feedbackBullets[i].classList.remove('active-bullet');
            }
            e.target.classList.add('active-bullet');
            currentFeedbackIndex = feedbackBullets.indexOf(e.target);
            clientsFeedbackControler(currentFeedbackIndex);
        }
    })
}
function clientsFeedbackControler(index) {
    switch (index) {
        case 1:
            clientsFeedback[index].classList.add('left-position');
            clientsFeedback[index - 1].classList.remove('right-position');
            break;

        default:
            clientsFeedback[index + 1].classList.remove('left-position');
            clientsFeedback[index].classList.add('right-position');
            break;
    }
}

function popupImageContent(index) {
    popupImage.innerHTML = `<img class="img-fluid" src="${portfolioImageList[index].getAttribute('href')}">
                <div class="item-count text-end mt-2 fs-6">${index + 1} of ${portfolioImageList.length}</div>`;
}
//show Image layer in portfolio section
for (let i = 0; i < portfolioImageList.length; i++) {
    portfolioImageList[i].addEventListener('click', function (e) {
        imageCurrentIndex = portfolioImageList.indexOf(e.target);
        lightboxContainer.classList.remove('d-none');
        popupImageContainer.classList.remove('d-none');
        popupImageContent(i);
        document.body.style.cssText = "overflow-y: hidden";
    })
}
//show Link layer in portfolio section
for (let i = 0; i < portfolioLink.length; i++) {
    portfolioLink[i].addEventListener('click', function () {
        popupLinkImage.setAttribute('src', portfolioLink[i].getAttribute('href'));
        lightboxContainer.classList.remove('d-none');
        popupLinkContainer.classList.remove('d-none');
        document.body.style.cssText = "overflow-y: hidden";
    });
}

//show vieo layer in portfolio section
popupVideo.addEventListener('click', function () {
    popupVideoFrame.setAttribute('src', popupVideo.getAttribute('href'));
    lightboxContainer.classList.remove('d-none');
    popupVideoContainer.classList.remove('d-none');
    document.body.style.cssText = "overflow-y: hidden";
});

//slider of image layer
function imageSlider(i) {
    imageCurrentIndex = imageCurrentIndex + i;
    if (imageCurrentIndex == portfolioImageList.length) {
        imageCurrentIndex = 0;
    }
    if (imageCurrentIndex == -1) {
        imageCurrentIndex = portfolioImageList.length - 1;
    }
    popupImageContent(imageCurrentIndex);
}

nextButton.addEventListener('click', function () {
    imageSlider(1);
});
prevButton.addEventListener('click', function () {
    imageSlider(-1);
});

//close image layer in portfolio section
function close() {
    lightboxContainer.classList.add('d-none');
    popupImageContainer.classList.add('d-none');
    popupLinkContainer.classList.add('d-none');
    popupVideoContainer.classList.add('d-none');
    popupVideoFrame.removeAttribute('src');
    document.body.style.cssText = "overflow-y: scroll";
}


for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener('click', close);
}

document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowRight') {
        imageSlider(1);
    }
    else if (e.key == 'ArrowLeft') {
        imageSlider(-1);
    }
    else if (e.key == 'Escape') {
        close();
        close();
    }

})

// form vlidation

let messageName = document.querySelector('#messageName');
let nameAlert = document.querySelector('#name small');
let messageEmail = document.querySelector('#messageEmail');
let emailAlert = document.querySelector('#email small');
let messageSubject = document.querySelector('#messageSubject');
let subjectAlert = document.querySelector('#subject small');
let message = document.querySelector('#message');
let messageContainer = document.querySelector('#messageContainer small');
let mainButton = document.querySelector('#mainButton');

messageName.addEventListener('change', function () {
    nameValidation();
});
messageEmail.addEventListener('change', function () {
    emailValidation();
});

messageSubject.addEventListener('change', function () {
    subjectValidation();
});

message.addEventListener('change', function () {
    messageValidation();
});

let nameValidationState = 0;
let emailValidationState = 0;
let subjectValidationState = 0;
let messageValidationState = 0;

function nameValidation() {
    let regex = /^([A-Z]|[a-z]){3,15}(\s([A-Z]|[a-z])+)?$/gm;
    if (regex.test(messageName.value)) {
        nameAlert.classList.add('d-none');
        nameValidationState = true;
        buttonEnable();
    }
    else {
        nameAlert.classList.remove('d-none');
        nameValidationState = false;
        buttonEnable();
    }
}
function emailValidation() {
    let regex = /^\w+@(([a-z])+.)+([a-z])+$/gm;
    if (regex.test(messageEmail.value)) {
        emailAlert.classList.add('d-none');
        emailValidationState = true;
        buttonEnable();
    }
    else {
        emailAlert.classList.remove('d-none');
        emailValidationState = false;
        buttonEnable();
    }
}
function subjectValidation() {
    let regex = /^([A-Z]|[a-z]){3,15}(\s([A-Z]|[a-z])+)?$/gm;
    if (regex.test(messageSubject.value)) {
        subjectAlert.classList.add('d-none');
        subjectValidationState = true;
        buttonEnable();
    }
    else {
        subjectAlert.classList.remove('d-none');
        subjectValidationState = false;
        buttonEnable();
    }
}
function messageValidation() {
    let regex = /^([a-z]{2,15}\s){5,30}[a-z]{2,15}$/gm;
    if (regex.test(message.value)) {
        messageContainer.classList.add('d-none');
        messageValidationState = true;
        buttonEnable();
    }
    else {
        messageContainer.classList.remove('d-none');
        messageValidationState = false;
        buttonEnable();
    }
}
function buttonEnable() {
    if (nameValidationState && emailValidationState && subjectValidationState && messageValidationState) {
        mainButton.disabled = false;
    }
    else {
        mainButton.disabled = true;
    }
}

mainButton.addEventListener('click', function () {
    messageName.value = "";
    messageEmail.value = "";
    messageSubject.value = "";
    message.value = "";
    mainButton.disabled = true;
})
