window.addEventListener('load', getLocation);

function getLocation() {
  const status = document.getElementById('status');
  status.textContent = '位置情報の取得中...';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const deviceInfo = getDeviceInfo();
        sendLocationToServer(latitude, longitude, accuracy, deviceInfo);
      },
      error => {
        status.textContent = 'エラー: ' + error.message;
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity
      }
    );
  } else {
    status.textContent = 'ブラウザに位置情報機能がありません';
  }
}

function getDeviceInfo() {
  const deviceInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform
  };
  return deviceInfo;
}

function sendLocationToServer(latitude, longitude, accuracy, deviceInfo) {
  fetch('https://express-hello-world-1-i5x5.onrender.com/location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ latitude, longitude, accuracy, deviceInfo })
  })
  .then(response => response.json())
  .then(data => {
    const status = document.getElementById('status');
    status.textContent = 'サーバーに位置情報を送信しました';
  })
  .catch(error => {
    const status = document.getElementById('status');
    status.textContent = 'エラー: ' + error.message;
  });
}
