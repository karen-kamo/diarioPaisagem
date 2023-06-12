function initTabNav() {
  const tabMenu = document.querySelectorAll('[data-tab="menu"] li');
  const tabContent = document.querySelectorAll('[data-tab="content"] section');

  if (tabMenu.length && tabContent.length) {
    tabContent[0].classList.add("ativo");

    function activeTab(index) {
      tabContent.forEach((section) => {
        section.classList.remove("ativo");
      });
      const direcao = tabContent[index].dataset.anime;

      tabContent[index].classList.add("ativo", direcao);
    }

    tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener("click", function () {
        activeTab(index);
      });
    });
  }
}
initTabNav();

function initAccordion() {
  const accordionList = document.querySelectorAll("[data-anime='accordion'] dt");
  const activeClass = "ativo";

  if (accordionList.length) {
    accordionList[0].classList.add(activeClass);
    accordionList[0].nextElementSibling.classList.add(activeClass);

    function activeAccordion() {
      this.classList.toggle(activeClass);
      this.nextElementSibling.classList.toggle(activeClass);
    }

    accordionList.forEach((item) => {
      item.addEventListener("click", activeAccordion);
    });
  }
}

initAccordion();

function initScrollSuave() {
  const linksInternos = document.querySelectorAll('[data-menu="suave"] a[href^="#"]');

  function scrollSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    //Forma alternativa
    /*
    const topo = section.offsetTop;
    console.log(topo);
    window.scrollTo({
      top: topo,
      behavior: 'smooth',
    } )
    */
  }
  linksInternos.forEach((link) => {
    link.addEventListener("click", scrollSection);
  });
}

initScrollSuave();

const sections = document.querySelectorAll('[data-anime="scroll"]');

function initAnimicaoScroll() {
  if (sections.length) {
    const windowMetade = window.innerHeight * 0.6;

    function animaScroll() {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const isSectionVisible = sectionTop - windowMetade < 0;
        if (isSectionVisible) {
          section.classList.add("ativo");
        } else {
          section.classList.remove("ativo");
        }
      });
    }
    animaScroll();
    window.addEventListener("scroll", animaScroll);
  }
}

initAnimicaoScroll();

function startAutoSlide1() {
  const imgs = document.querySelectorAll(".slider-caixa");
  const dots = document.querySelectorAll(".botao i");
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");
  let currentIndex = 0;
  let time = 7000; //Tempo padrão para apresentação de slides automática
  const defClass = (startPos, index) => {
    for (let i = startPos; i < imgs.length; i++) {
      imgs[i].style.display = "none";
      dots[i].classList.remove("fa-dot-circle");
      dots[i].classList.add("fa-circle");
    }
    imgs[index].style.display = "block";
    dots[index].classList.add("fa-dot-circle");
  };
  defClass(1, 0);
  leftArrow.addEventListener("click", function () {
    currentIndex <= 0 ? currentIndex = imgs.length - 1 : currentIndex--;
    defClass(0, currentIndex);
  });
  rightArrow.addEventListener("click", function () {
    currentIndex >= imgs.length - 1 ? currentIndex = 0 : currentIndex++;
    defClass(0, currentIndex);
  });
  const startAutoSlide = () => {
    setInterval(() => {
      currentIndex >= imgs.length - 1 ? currentIndex = 0 : currentIndex++;
      defClass(0, currentIndex);
    }, time);
  };
}
startAutoSlide1(); //Inicia o slideshow