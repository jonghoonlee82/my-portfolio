// ------------------ Intro typing animation ------------------

let target = document.querySelector("#dynamic");
let stringArr = ["프론트엔드 개발자", "Front-End Developer", "UI / UX Developer", "사용자 경험을 만드는 개발자", "Interactive Web Developer"];
let selectString = stringArr[Math.floor(Math.random() * stringArr.length)]
let selectStringArr = selectString.split("");

function randomString() {
  let target = document.querySelector("#dynamic");
  let stringArr = ["프론트엔드 개발자", "Front-End Developer", "UI / UX Developer", "사용자 경험을 만드는 개발자", "Interactive Web Developer"];
  let selectString = stringArr[Math.floor(Math.random() * stringArr.length)]
  let selectStringArr = selectString.split("");

  return selectStringArr;
}

// 타이핑 리셋
function resetTyping() {
  target.textContent = "";
  dynamic(randomString());
}

// 한글자씩 테스트 출력 함수
function dynamic(randomArr) {
  if (randomArr.length > 0) {
    target.textContent += randomArr.shift();
    setTimeout(() => dynamic(randomArr), 80);
  } else {
    setTimeout(resetTyping, 3000);
  }
}

dynamic(randomString());

// 커서 깜빡임 효과
function blink() {
  target.classList.toggle("active");
}
setInterval(blink, 500);






//--------------------------- GSAP 플러그인 등록 --------------------
gsap.registerPlugin(ScrollTrigger);


// ----------------- Title 애니메이션-------------------
gsap.utils.toArray(".title").forEach(title => {

  gsap.from(title, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: title,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });

});


// -------------------- About 섹션----------------------
gsap.from(".about_box > *, .introduction", {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about_box",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});


// --------------------------  Skills ---------------------
gsap.from(".skill", {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".skill_box",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});


// ---------------------- Project ------------------------
gsap.utils.toArray(".project").forEach((project, i) => {
  gsap.from(project, {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: project, // 각 프로젝트를 개별 trigger로
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    delay: i * 0.2 // 기존 stagger 효과 유지
  });
});


// ------------------- Contact 섹션 ---------------------
gsap.from(".contact_item", {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".contact_box",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

// -------------- border width 조절 -------------- 

gsap.utils.toArray(".title").forEach(title => {

  gsap.to(title, {
    "--line-width": "70%",
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: title,
      start: "top 85%"
    }
  });
});


// --------------------- scroll_event -----------------------

$(".fix_menu > div").click(function () {

  const target = $(this).data("target");

  $("html, body").animate({
    scrollTop: $(target).offset().top
  }, 300);

});


// --------- fix_box 스크롤에 따라 백그라운드 컬러 변경 ----------

const sections = ["#intro", "#about", "#skill", "#project", "#contact"];

$(window).scroll(function () {

  let scroll = $(window).scrollTop();
  let windowHeight = $(window).height();
  let documentHeight = $(document).height();

  sections.forEach((sec, i) => {

    if (scroll >= $(sec).offset().top - 200) {

      $(".fix_menu > div").removeClass("active");
      $(".fix_menu > div").eq(i).addClass("active");

    }

  });

  // !! 페이지 맨 아래 도달 시 강제 활성화 !!
  if (scroll + windowHeight >= documentHeight - 10) {
    $(".fix_menu > div").removeClass("active");
    $(".fix_menu > div").eq(sections.length - 1).addClass("active");
  }

});





//  -----------------------  modal  -----------------------

// 모달 내용 교체
$(function () {

  $(".project").click(function () {

    let p = $(this);

    // 기본 정보
    $(".modal_icon").attr("src", p.data("icon"));
    $(".modal_title_text").text(p.data("title"));

    $(".modal_preview video source").attr("src", p.data("video"));
    $(".modal_preview video")[0].load();

    $(".modal_site").attr("href", p.data("site"));
    $(".modal_github").attr("href", p.data("github"));

    $(".modal_desc").text(p.data("desc"));

    $(".modal_member").text(p.data("member"));
    $(".modal_plan").text(p.data("plan"));
    $(".modal_code").text(p.data("code"));

    $(".modal_problem").text(p.data("problem"));
    $(".modal_solution").text(p.data("solution"));
    $(".modal_review").text(p.data("review"));


    // skills 자동 처리
    for (let i = 1; i <= 5; i++) {

      let skill = p.data("skill" + i);

      if (skill) {
        $(".skill" + i).attr("src", skill).show();
      } else {
        $(".skill" + i).hide();
      }
    }

    // feature 자동 처리
    for (let i = 1; i <= 3; i++) {

      let feature = p.data("feature" + i);

      if (feature) {
        $(".feature" + i).text(feature).show();
      } else {
        $(".feature" + i).hide();
      }
    }

    // 문제&상황 자동 처리
    for (let i = 1; i <= 4; i++) { // 최대 4개까지 처리
  let problem = p.data("problem" + i);
  let solution = p.data("solution" + i);

  if (problem) {
    $(".problem_text02").eq(i - 1).text(problem).show();
  } else {
    $(".problem_text02").eq(i - 1).hide();
  }

  if (solution) {
    $(".solution_text02").eq(i - 1).text(solution).show();
  } else {
    $(".solution_text02").eq(i - 1).hide();
  }
}

// 개발 후 느낀점 자동 처리
for (let i = 1; i <= 1; i++) { // 최대 1개까지 처리 가능
  let review = p.data("review" + i);

  if (review) {
    $(".review").eq(i - 1).text(review).show();
  } else {
    $(".review").eq(i - 1).hide();
  }
}

    // 모달 열기
    $(".modal_wrap").fadeIn(200).addClass("active");
    $("body").addClass("modal_open");
  });


  // 모달 닫기
  function closeModal() {

    $(".modal_wrap").removeClass("active").fadeOut(200);
    $("body").removeClass("modal_open");
  }


  // 닫기 버튼
  $(".modal_close").click(closeModal);

  // 배경 클릭
  $(".modal_wrap").click(function (e) {

    if ($(e.target).is(".modal_wrap")) {
      closeModal();
    }
  });


  // ESC 닫기
  $(document).keydown(function (e) {

    if (e.key === "Escape") {
      closeModal();
    }
  });
});

