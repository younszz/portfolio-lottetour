$(function () {
  mainInit();
  $(document).on('click', 'a[href="#"]', function (e) { e.preventDefault() })
})
function mainInit() {
  gnb_menu();
  visual();
  vis_search();
  search();
  thema();
  exhibition();
  video();
  
}

//메뉴
function gnb_menu() {
  let $header = $('#header');
  let $gnbli = $('#header .main-menu .nav .gnb> li');
  let $subul = $('#header .main-menu .nav .gnb li ul');

  $gnbli.hover(function(){
    $subul.hide();
    $(this).find('ul').show();
    $gnbli.removeClass('on');
    $(this).addClass('on')
  })
  $header.on('mouseleave',function(){
    $subul.stop().slideUp(300);
    $gnbli.removeClass('on');
  })
}

// 비주얼
function visual() {

    let $mainBanner = $('#visual .main-banner');
    let $bannerLi = $('#visual .main-banner li');
    let $next = $('#visual .btn-wrap .next');
    let $prev = $('#visual .btn-wrap .prev');
    let cnt = 0, size = $bannerLi.length

    $next.on('click', function () {
      cnt++;
      if (cnt > size - 1) {
        cnt = 0;
      }
      $mainBanner.hide().fadeIn(800).css('background-image', 'url(images/visual' + cnt + '.jpg)');
      $bannerLi.hide();
      $bannerLi.eq(cnt).show();
    })
    $prev.on('click', function () {
      cnt--;
      if (cnt < 0) {
        cnt = size - 1;
      }
      $mainBanner.hide().fadeIn(800).css('background-image', 'url(images/visual' + cnt + '.jpg)');
      $bannerLi.hide();
      $bannerLi.eq(cnt).show();
    })

}

function vis_search(){
let tabsLi = document.querySelectorAll('#visual .search-wrap .tabs li');
let tabsBox = document.querySelectorAll('#visual .search-wrap .tabs-box');
let ticket = document.querySelectorAll('#visual .search-wrap .air .ticket li');
let btn = document.querySelector('#visual .search-wrap .tabs-search-button');
let id = null, el = null, btnTxt = '';

tabsLi.forEach(item => {
  item.addEventListener('click', (e) => {
    id = e.currentTarget.dataset.id;
    el = document.getElementById(id);
    tabsLi.forEach(liItem => {
      liItem.classList.remove('on')
    })
    item.classList.add('on');
    tabsBox.forEach(box => {
      box.classList.remove('on')
    })
    el.classList.add('on')
    btnTxt = item.textContent;
    btn.textContent = btnTxt + ' 검색';
  })
})
ticket.forEach(item => {
  item.addEventListener('click',(e) => {
    ticket.forEach(item => {
      item.classList.remove('on');
    })
    item.classList.add('on')
  })
})
}

function search(){
  const searchForm = document.getElementById("place-search");
  const searchInput = searchForm.querySelector("input");
  const recentSearch = document.querySelector(".recent-search");
  const noSearch = recentSearch.querySelector("p:nth-child(2)");
  const searchList = recentSearch.querySelector("ul");
  console.log(noSearch)

  let items = [];

  function saveSearch(){
    localStorage.setItem("searchWord", JSON.stringify(items))
  }
  function deleteSearch(e){
    const li = e.target.parentElement;
    li.remove();
    items = items.filter((item) => item.id !== parseInt(li.id));
    items.length === 0 && (noSearch.innerText = "최근검색이 없습니다.")
    saveSearch();
  }
  function paintSearch(newSearch){
    const li = document.createElement("li");
    li.id = newSearch.id;
    const span = document.createElement("span");
    span.innerText = newSearch.text;
    const btn = document.createElement("button");
    btn.innerText = "X";
    noSearch.innerText = ""
    btn.addEventListener("click", deleteSearch);
    li.appendChild(span);
    li.appendChild(btn);
    searchList.appendChild(li);
  }
  function searchSubmit(e){
    e.preventDefault();
    const newSearch = searchInput.value;
    searchInput.value = "";
    const newSearchObj= {
      text: newSearch,
      id: Date.now(),
    };
    items.push(newSearchObj);
    paintSearch(newSearchObj);
    saveSearch();
  }
  searchForm.addEventListener("submit",searchSubmit);

  const savedSearch = localStorage.getItem("searchWord");
  if(savedSearch !== null){
    const parsedSearch = JSON.parse(savedSearch);
    items = parsedSearch;
    parsedSearch.forEach(paintSearch);
  }else{
    noSearch.innerText = "최근검색이 없습니다."
  }
}

// 테마
function thema() {
  let $mainList = $('.main .thema .main-list li');
  let $themaList = $('.main .thema article .thema-list li')
  let $themaCon = $('.main .thema article .thema-con> li')
  
  $themaCon.hide();
  $themaCon.eq(0).show();

  $mainList.on('click', function () {
    $mainList.removeClass('on');
    $(this).addClass('on');
  })

  $themaList.on('click', function () {
    cnt = $(this).index();
    $themaCon.hide();
    $themaCon.eq(cnt).show();
    $themaList.removeClass('on');
    $themaList.eq(cnt).addClass('on');
  })
}

// 기획전
function exhibition() {
  let $ul = $('.main .exhibition .exhibition-list')
  let $li = $('.main .exhibition .exhibition-list li')
  let $prev = $('.main .exhibition .btn-wrap .prev')
  let $next = $('.main .exhibition .btn-wrap .next')
  let size = $li.length, cnt = size, timer = null, interval = 4000, first = '', last0 = '', last1 = '', last2 = '', w = $li.width() + 30;

  last0 = $('.main .exhibition .exhibition-list li:last');
  last1 = $('.main .exhibition .exhibition-list li:last').prev();
  last2 = $('.main .exhibition .exhibition-list li:last').prev().prev();
  $ul.prepend(last0).prepend(last1).prepend(last2).css({ marginLeft: '-=' + w * 3 });

  timer = setInterval(make, interval);
  function make() {
    cnt--;
    if (cnt < 0) {
      cnt = size - 1
    }
    $ul.animate({ marginLeft: '+=' + w }, 400, function () {
      last0 = $('.main .exhibition .exhibition-list li:last');
      $ul.prepend(last0).css({ marginLeft: '-=' + w })
      $li.removeClass('on')
      $li.eq(cnt).addClass('on')
    })
  }
  $next.on('click', function () {
    cnt--;
    if (cnt < 0) {
      cnt = size - 1
    }
    $ul.animate({ marginLeft: '+=' + w }, 500, function () {
      last0 = $('.main .exhibition .exhibition-list li:last');
      $ul.prepend(last0).css({ marginLeft: '-=' + w })
      $li.removeClass('on')
      $li.eq(cnt).addClass('on')
      console.log(cnt)
    })
    clearInterval(timer);
    timer = setInterval(make, interval);
  })
  $prev.on('click', function () {
    cnt++;
    if (cnt > size - 1) {
      cnt = 0
    }
    $ul.animate({ marginLeft: '-=' + w }, 400, function () {
      first = $('.main .exhibition .exhibition-list li:first');
      $ul.append(first).css({ marginLeft: '+=' + w })
      $li.removeClass('on')
      $li.eq(cnt).addClass('on')
      console.log(cnt)
    })
    clearInterval(timer);
    timer = setInterval(make, interval);
  })

}

function video() {
  let vid = $('.travel article .video video').get(0);
  let $video = $('.travel article .video video');
  let $playButton = $('.travel article .video span');
  let isplay = false;

  $video.on('click', function () {
    if (!isplay) {
      vid.play();
      $playButton.fadeOut();
    } else {
      vid.pause();
      $playButton.show();
    }
    isplay = !isplay;
  })

}
