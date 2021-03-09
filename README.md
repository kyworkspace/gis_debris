# GIS_OCEANDEBRIS
## 2021-02-08 
1. 개발환경
    - vsCode
    - ReactJS,Openlayers
    - Ant Design(CSS FrameWork)
    - DB : Postgres
    - MapServer : geoserver
2. 설치한 외부 라이브러리
    - package.json에서 확인 후 npm install 할 것
    - server 부분, client 부분으로 나뉘어져 있음
```
    npm install ol --save
    npm install antd --save
    npm install --save @ant-design/icons
    npm install jquery --save
    npm install multer --save
    npm install react-dropzone --save
    npm install react-image-gallery --save
    npm install react-dom --save
    npm install react-redux --save
    ...
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
- edit~ : 수정
- delete : 삭제
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

### 2021-02-24
- 사이드 메뉴 뒤로가기, 메뉴간 이동시 메뉴 폴딩 처리
- 각 객체 레이어에서 보이는 피쳐를 삭제하는 기능 추가(각 메뉴 리스트 타이틀 옆의 휴지통)
- 조사사업 메서드 클래스화
- 수거사업 목록 표시 ( 데이터 제대로 들어오면 그때 다시 가공)

### 2021-02-25
- server index.js 수정
- multer 설치
- react-dropzone 설치
- react-image-gallery 설치
- 사진 업로드 component 는 utils 폴더에 저장
- 업로드 화면<br/>
    <img src="https://user-images.githubusercontent.com/45280952/109114295-c59f4200-7780-11eb-9c8e-797a077678d5.png" width="500" height="500">
- 업로드 된 화면<br/>
    <img src="https://user-images.githubusercontent.com/45280952/109114416-f2ebf000-7780-11eb-9d17-60322c3fadb1.png" width="250" height="600">

```
app.use('/uploads', express.static('uploads'));
```
- URL 경로를 통해 uploads 폴더에 접근할수 있도록 함
- 사진 같은경우 한번에 올라가고 수정이 되기 때문에 수정하게 되는 경우 기존 연결된 파일 ROW 데이터를 삭제하고 새로 추가하는 방식으로 변경
- useRef를 사용해서 이미지에 대해 수정 버튼이 누르기 전에는 Rendering 되지 않고 누르고 난 뒤에 state를 바꿔 주도록 변경

- DetailPage 스크롤바 기능은 되도록 하되, 표시만 지우도록 함. 아래 코드는 크롬,사파리,오페라에서 동작하는 코드
```
#CSS 
.TableDetailPage::-webkit-scrollbar{
  display: none;
}
```

- useMemo를 사용하여 TableList 코드 수정
- TableList, TableDetail 부분(LeftNav.js)  position 고정. 메뉴 활성화 될때 지도 밀리는 현상 수정

### 2021-02-26
- 수거실적 자료 리스트 무한 스크롤 기능으로 전환.
- 검색기능 가능하도록 수정중

### 2021-03-04
- 무한 스크롤 기능 제작중
- 기능은 만들었지만 검색에서 정상적으로 작동하지 않는 경우가 있음
- 테스트 용으로 만든 무한 스크롤은 레이어 리스트에 있지만 실제 기능이 채워질 경우 삭제 예정
- 개선기회가 되면 반드시 수정해서 만들어보겠음
- 결국 react infinite scroll을 사용했으며, 검색하는 경우 해당 컴포넌트 부분을 초기화해서 리렌더링 하는 방식으로 startPage를 초기화 함
- 해당 부분은 수거자원 목록에서 확인가능

### 2021-03-09
 - 최적화 작업 진행중