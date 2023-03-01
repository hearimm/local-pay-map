import React, { useEffect, useRef, useState } from 'react';

const { kakao } = window;

function KakaoMap(props) {

  const { markerPositions } = props;
  const mapContainer = useRef();
  const [kakaoMap, setKakaoMap] = useState(null);
  const [,setMarkers] = useState([]);
  //처음 지도 그리기
  useEffect(() => {
    const map = new kakao.maps.Map(mapContainer.current, {
      center: new kakao.maps.LatLng(37.4134038262846, 127.098334109561), // 지도의 중심좌표
      level: 6 // 지도의 확대 레벨
    }); // 지도를 생성합니다
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setKakaoMap(map);
  }, [mapContainer]);

  useEffect(() => {
    console.log('markerPositions');
    if(kakaoMap === null) return;

    const positions = markerPositions.map(
      (o) => new kakao.maps.LatLng(o.lat, o.lng)
    );

    console.log(positions)

    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null));

      // assign new markers
      return markerPositions.map(
        (o) => {
          const position = new kakao.maps.LatLng(o.lat, o.lng);
          const marker = new kakao.maps.Marker({ map: kakaoMap, position })
          
          var infowindow = new kakao.maps.InfoWindow({
            map: kakaoMap,
            position,
            content: o.name
          });
          infowindow.close();
          kakao.maps.event.addListener(marker, 'click', function () {
            alert('마커를 클릭했습니다!' + o.name);
          });
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(kakaoMap, marker);

          });
          kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });
          return marker;
      }
      );
    });
  }, [kakaoMap, markerPositions]);


  return (
    <div className="Kakaomap"
      style={{
        width: '100%',
        display: 'inline-block',
        marginLeft: '5px',
        marginRight: '5px'
      }}
    >
      <div id="map" style={{ width: '99%', height: '500px' }} ref={mapContainer}></div>
    </div>
  );
}

function getGeocoder(map) {
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch('경기도 성남시 수정구 사송로 48, 지층, 1층 한우랑돼지랑', function (result, status) {

    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {

      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
      });
      infowindow.open(map, marker);

      kakao.maps.event.addListener(marker, 'click', function () {
        alert('마커를 클릭했습니다!' + coords);
      });
    }
  });
}

export default KakaoMap;