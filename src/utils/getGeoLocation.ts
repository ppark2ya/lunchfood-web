export default function getGeoLocation(
  successCallback: (position: GeolocationPosition) => void,
  errorCallback?: (positionError: GeolocationPositionError) => void,
) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback || defaultErrorCallback,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }, // PositionOptions
    );
  }
}

function defaultErrorCallback(positionError: GeolocationPositionError) {
  alert('위치정보 접근권한이 없습니다. 권한을 허용해주세요');
  console.error(positionError);
}
