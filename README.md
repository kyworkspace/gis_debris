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

### CallbackMethod.js
- select~List : 목록 가져오기
- get~Detail : 단일 상세정보 가져오기
- get~Count : 갯수 가져오기
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
![image](https://user-images.githubusercontent.com/45280952/108494996-935a9400-72eb-11eb-8b8a-e046c6326d8f.png)

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

### 2021-02-22
- 항적정보 표출 리스트를 notification으로 컨트롤 할수 있도록 해봄
- 항적 정보 표시를 Notification & useSelector로 해보았다.
    1. useSelector로 가져온 정보를 State에 담아서 쓰는거는 좀더 연습이 필요하다.
    2. 타이밍상 렌더링이 되고 useEffect가 실행이 되어 리렌더링이 되는데 , dispatch는 콜백함수내에서 쓰지말라고 오류가 발생한다.
    3. 라이브러리를 통해 쓰고 있는 notification은 DOM 아닌것 같아서 변경된 값을 가져와서 즉각적으로 적용하는게 힘들다. 나중에 시간이 되면 그냥 직접 만들던지, 새로운 걸 찾아봐야겠다.
    ![1](https://user-images.githubusercontent.com/45280952/108696583-16c2f200-7545-11eb-93db-6bdd150ea18e.png)

    ![2](https://user-images.githubusercontent.com/45280952/108696596-1cb8d300-7545-11eb-9299-86cd79bf02ab.png)

### 2021-02-23
- 항적정보 notification 디자인 적용
- Switch 버튼으로 검색 한 항적 on/Off 기능 적용
![1](https://user-images.githubusercontent.com/45280952/108799564-f4c48080-75d3-11eb-8d7b-1a61075c1a53.png)

- 검색 항적목록은 Redux에 저장
- server쪽 Client connect 방식 변경
- Axios로 불러오는 메서드는 CallbackMethod에서 일괄 처리 (=> 재활용성이 높은 메서드들)

- VideoList 생성
![image](https://user-images.githubusercontent.com/45280952/108811974-927a7880-75f1-11eb-8bf1-96901396b2e7.png)
- material UI Card import 
- 동영상 재생이 되는 기능 추가
![image](https://user-images.githubusercontent.com/45280952/108813376-3f55f500-75f4-11eb-8783-9c0bcca660ee.png)
- 데이터를 어떻게 받아야 할지 정해지지 않음. VideoListComponent에서 임의의 데이터 생성