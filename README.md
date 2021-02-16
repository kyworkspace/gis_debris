# GIS_OCEANDEBRIS
## 2021-02-08 
1. 개발환경
    - vsCode
    - ReactJS,Openlayers
    - Ant Design(CSS FrameWork)
    - DB : Postgres
    - MapServer : geoserver
2. 설치한 외부 라이브러리
```
    npm install ol --save
    npm install antd --save
    npm install --save @ant-design/icons
    npm install jquery
    or
    yarn add ...

```
## FIRST INIT
- component에 사용할 컴포넌트 생성예정
- Navbar안에서 Site와 Footer를 컴포넌트로 가져와서 보여줌
- MainMap에서 맵 세팅

![image](https://user-images.githubusercontent.com/45280952/107192865-84ddc400-6a31-11eb-8954-a474d95f35c9.png)
- 자료 가져오기

### CommonMethod.js
- MapMove : 맵 이동
- get~Layer : 레이어 가져오기
- ~Display : 해당 위치로 이동 및 레이어 표출
### Investigation List
![image](https://user-images.githubusercontent.com/45280952/107192938-9a52ee00-6a31-11eb-83f6-a2901b3a97f3.png)

- Ant Design List와 Card로 리스트 표출
- 페이징 할 방법은 스토어에서 불러온 데이터를 페이지에 맞게 필터링하여 재표출


## 2021-02-10
### SERVER 
1. Node서버 구축, postgres 연결
```
    npm install pg --save
```
2. client.end()를 하는 타이밍을 찾아보는 중임, 각 쿼리마다 end를 던지면 다음 쿼리 사용에서 자꾸 끊어져버리는데.. 공식 문서상에서 예제는 각 쿼리마다 end가 적용되어 있음
    - 방법을 찾을 것이다. 늘 그래 왔듯이
### CLIENT
1. 기존 TableList type별로 분할
2. 해구 목록 및 이동기능 추가
3. 리스트별 제목 입력
4. 해구 선택시 Vector 강조되도록 함
![image](https://user-images.githubusercontent.com/45280952/107493133-a1fcc900-6bd0-11eb-9ad6-f68721f052d2.png)
#### 항적조회
- Material UI , Ant Design 혼합 사용
- 로딩바 사용
- 검색 & 상세보기 적용
![image](https://user-images.githubusercontent.com/45280952/108010560-7fdbce80-7048-11eb-955b-b7fa51bd5153.png)

- 상세보기
![그림1](https://user-images.githubusercontent.com/45280952/108010840-2e800f00-7049-11eb-8ad6-05fb8991d989.png)
- 항적조회
- 기간 설정 후 나오도록 함
![image](https://user-images.githubusercontent.com/45280952/108010784-07294200-7049-11eb-84c7-540e2c115238.png)
- 테스스