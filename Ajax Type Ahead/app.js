const endpoint = 
'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
//json 가져오기
/* fetch() 서버에게 파일 응답
    .then() 콜백함수 실행
    ...전개연산자
    cities.push(data)라고 썼으면 배열자체가 cities 배열에 들어감
*/
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

/* 사용자가 입력한 단어가 데이터에 있는지 판단하는 함수
    .filter를 사용하여 조건에 맞는 데이터로 새로운 배열을 만들어줌
    RegExp 정규표현식을 사용하기 위한 객체 생성
    g : 텍스트 전체에서 일치하는 문자를 찾을 때, 지정하지 않으면 첫번째 일치하는 문자만 검색
    i : 대소문자를 구분하지 않는다.
    match() : 주어진 정규표현식과 일치하는 문자열 반환, 파라미터로는 정규표현식 패턴을 가짐
              반환값으로는 정규표현식 패턴과 일치하는 문자열들을 담고 있는 배열을 반환 
*/
function findMatches(wordToMatch, cities){
    return cities.filter(place =>{
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

/* 사용자가 입력한 단어에 관한 데이터 화면에 보여주는 함수
    .map을 사용하여 반환값 리턴, map은 배열을 반환하기 때문에 join()을 사용하여 배열의 모든 요소를 연결해 하나의 문자열로 반환
    replace()를 이용하여 사용자가 input한 값에 대한 value를 강조하도록 교체
*/

function displayMatches(){
    const matchArray = findMatches(this.value , cities);
    const html = matchArray.map(place=>{ 
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
            <span class= "name">${cityName},${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML=html;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
