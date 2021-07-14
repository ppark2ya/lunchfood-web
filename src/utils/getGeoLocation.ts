export default function getGeoLocation(
  successCallback: (position: GeolocationPosition) => void,
  errorCallback?: (positionError: GeolocationPositionError) => void,
): number {
  // navigator.geolocation.getCurrentPosition(
  return navigator.geolocation.watchPosition(
    successCallback,
    errorCallback || defaultErrorCallback,
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }, // PositionOptions
  );
}

function defaultErrorCallback(positionError: GeolocationPositionError) {
  alert('위치정보 접근권한이 없습니다. 권한을 허용해주세요');
  console.error(positionError);
}

export function geoLocationClear(watchId: number) {
  navigator.geolocation.clearWatch(watchId);
}
