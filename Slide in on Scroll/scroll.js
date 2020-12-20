function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };


  const sliderImages = document.querySelectorAll('.slide-in');

  function checkSlide(){
    sliderImages.forEach(sliderImage =>{
        const slideInAt = (window.scrollY + window.innerHeight)-sliderImage.height/2;
         //window.scrollY = 전제 화면 중 현재 화면의 맨 위쪽의 pixel y 값, window.innerHeight= 현재 한 화면의 높이값 두개를 더한 값은 현재 화면 맨 아래쪽의 pixel y 값이 된다.
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        // sliderImage.offsetTop: 전제 화면의 이미지의 맨 위쪽 pixel y값
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        console.log(sliderImage.height);
        const isNotScrolledPast = window.scrollY < imageBottom;
        
        if(isHalfShown && isNotScrolledPast){
            sliderImage.classList.add('active');
        }else{
            sliderImage.classList.remove('active');
        }

    })
  }

  window.addEventListener("scroll", debounce(checkSlide));