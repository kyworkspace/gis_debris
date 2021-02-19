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

- 항적조회 일부 수정
- 해구 상세정보 Window.open으로 하려다가
- Modal로 표출 할 예정. 

### 2021-02-17
- 조사 수거 통합정보는 별로의 Window를 펼쳐서 좌우 구분해서 사용
```
npm install --save react-chartjs-2 chart.js
```
- chartjs 설치
### 2021-02-18
- VWorldMap 적용
![image](https://user-images.githubusercontent.com/45280952/108332420-1eb42680-7213-11eb-9468-6fa35478d21f.png)


### 2021-02-19
- 항적정보는 보여줄때 오른쪽에 notification으로 표출여부 컨트롤할 예정
- 레이어 정보도 오른쪽 버튼으로 컨트롤할 예정

- 레이어 정보를 notification에서 컨트롤 할수 있도록 수정
- 레이어 정보를 redux에서 컨트롤 할려고 했는데, 굳이 그럴필요가 없어서 메뉴 실행시 정보를 가지고 오는 것으로 전환
- 폴더 분류
    1. Tile Map 관련 해서는 MapLayer.js에서 컨트롤
    2. Feature 정보가 직접적으로 표현되는 레이어는 FeatureLayer에서 컨트롤

- MainMap에 AddTarget 되기전에도 AddLayer가 가능하기 때문에 FeatureLayer 부분을 만들어서 레이어를 별도 추가해줌
- AntDesign 쓰려고 했는데, 제대로 안되서 삽질을 얼마나 했는지 모르겠다...

- 맵 타일 레이어 부분
![image](https://user-images.githubusercontent.com/45280952/108494060-71acdd00-72ea-11eb-8198-2aedf3f90edb.png)
- 객체레이어 부분
![image](https://user-images.githubusercontent.com/45280952/108494115-82f5e980-72ea-11eb-9053-a24f472ab54d.png)
