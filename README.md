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
