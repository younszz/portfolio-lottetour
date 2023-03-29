# portfolio-lottetour
롯데투어 웹사이트 리뉴얼
<https://younszz.github.io/portfolio-lottetour/>
---
최근검색어 저장 기능
---

1. localStorage에 리스트 저장

    ```javascript
    localStorage.setItem("searchWord", JSON.stringify(items))
    ```
    
    - JSON.stringfy - javascript값이나 객체를 json객체로 변경
    
2. json객체로 변경

    ```javascript
    const parsedSearch = JSON.parse(savedSearch);
    items = parsedSearch;
    parsedSearch.forEach(paintSearch);
    ```
    
    - JSON.parse json객체를 javascript값이나 객체로 변경
    - 객체 내용 한개씩 매개변수로 넣어서 함수실행
    
3. li > item 텍스트 내용(span), 삭제 버튼(button) 화면에 보이게 body에 추가

4. 버튼의 현재 event를 실행시킨 target을 알게위해 해당 li에 랜덤한 넘버(Date.now)를 id로 지정

5. filter 사용해서 reture 결과가 true 인것들만 추출
    ```javascript
        items = items.filter((item) => item.id !== parseInt(li.id))
    ```
    
    - 추출된 내용을 items에 넣고 localStorage에 저장
    - item.id는 number, li.id는 string

6. form 전송 시 페이지 reload 막고, input창에 입력한 값을 새로운 변수에 대입, 현재 input창 초기화

    ```javascript
    function searchSubmit(e){
    e.preventDefault();
    const newSearch = searchInput.value;
    searchInput.value = "";
    ```