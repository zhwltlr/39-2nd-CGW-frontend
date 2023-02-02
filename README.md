# <p align="center">CGW

<p align="center"> 📆 2022.11.28~ 12.9

<br>
<br>
<br>
  
<img width="1386px" alt="CGW main" align="center" src="https://user-images.githubusercontent.com/110847597/206863973-b5dc727d-037f-4ce5-9c9e-feb21622a4bc.gif"/>

<br>

## CGW Goal

- 예매 그 정도, CGW
- 사용자를 위한 더 간편한 예약 페이지
  - 가독성을 높인 UI
  - 지도 API 가까운 영화관 안내
  - 소셜로그인, 소셜 결제를 활용한 구매 허들 낮추기

## 📼 DEMO

- <a href="https://vimeo.com/779910229">📎 시연 영상</a>

## Team CGW

`FE` 곽종범, 박지영, 이다빈, 이혜원 <br>
`BE` 김한솔, 임창현, 조상원

## CGW Features

- 🔵 `종범 FE` - 좌석 선택
- 🔵 `지영 FE` - 소셜 로그인& 지도 API Map 기능
- 🔵 `다빈 FE` - 영화 예매, 영화 검색
- 🔵 `혜원 FE` - 결제, 예매내역
- 🟢 `한솔 BE` - 예매페이지 API, AWS
- 🟢 `창현 BE` - 카카오결제 API, 주문 API
- 🟢 `상원 BE` - 카카오로그인 API, 예매페이지 API

## CGW Tools

- `Notion`, `Trello`, `Git`, `Slack`

## CGW Engineering Stack

- 💻 BE:
  - `JavaScript`, `Node.js`, `AWS`, `MySql`
- 💻 FE:
  - `JavaScript`, `React`, `Styled-components`

## DB Modeling

<img width="1386" alt="CGW DB" src="https://user-images.githubusercontent.com/110847597/206862017-45340383-0d5d-49d2-aa46-4f8ff1ccf7e7.png">

## 구현 기능

1. 영화 예매, 영화 검색
1. 좌석 선택
1. 소셜 로그인& 지도 API Map 기능
1. 카카오톡 결제, 예매내역

<br>

## 담당 기능

#### <b>1. 소셜 로그인</b>

- 사용자의 편리성 증대를 위하여 카카오 api를 이용한 소셜 로그인 구현
- 로그인에 성공했을시 카카오 api로 제공 받는 access_token 외 영화 예매를 위해 필요한 사용자의 이메일, 생년월일, 전화번호를 추가로 입력받는 유저 정보 페이지 구현

<br />

#### <b>2. 구글 지도 api를 활용한 길 안내 기능</b>

- 예매 완료 내역에 지도 페이지를 나타내어, 사용자의 현재 위치에서 영화관까지의 위치 및 소요시간 안내
- 저장된 영화관의 위도 경도와 사용자의 현위치를 계산하여 영화관까지의 경로 안내
  <img src="https://user-images.githubusercontent.com/100506719/216211441-bfa6c839-c864-4ac5-b6cd-640bc3af7c06.PNG" align="center" width="900px" />

<br />

#### <b>3. 메인 리스트 페이지 구현</b>

- swiper 라이브러리를 이용하여 영화 예매 서비스와 어울리는 이미지 애니메이션 효과 구현
- grid를 이용하여 영화 리스트 페이지 구현

<br />

---

## 회고

<a href="https://blog.naver.com/zhwltlr/222973053378">🔗 2차 프로젝트 회고</a>

- 카카오 로그인 api, 구글 지도 api를 사용할 수 있는 좋은 기회였습니다.
- 프로젝트 목적상 카카오 지도와 네이버 지도 api를 사용하지 않았습니다. 유저가 경로보기를 클릭해서 카카오맵이나 네이버 지도로 이동하는 것이 아닌 웹 서비스 자체에서 제공을 하고자 했기에 구글 지도 api를 선택하게 되었습니다. 이와 유사하게 경로를 나타낼 수 있게 도와주는 tmap api를 공부해보고 싶다는 생각이 들었습니다.

---
