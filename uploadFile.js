const request = require('request').defaults({ encoding: null });

function sendFile(fileName) {
  return new Promise((resolve, reject) => {
    const fileUrl = 'https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-KexYTTAcwXeC_LjWOOR?alt=media&token=4fac58e3-7ccd-4d4d-9aa5-833e0bcd7c86';
    request(fileUrl, uploadFile);

    function uploadFile(err, response, body) {
      err && console.log('ERROR: \n', err);
      const r = request.post('https://api.graph.cool/file/v1/cj5tpc7zsj16i012285uxa6j5', requestCallback);
      const form = r.form();
      form.append('data', body, {
        filename: fileName
      });
    }

    function requestCallback(err, httpResponse, body) {
      if (!err) {
        resolve(body);
      } else {
        reject(err);
      }
    }
  });
}

sendFile('test27.jpg');
sendFile('test28.jpg');
sendFile('test29.jpg');
sendFile('test210.jpg');
sendFile('test211.jpg');
sendFile('test212.jpg');
sendFile('test213.jpg');
sendFile('test214.jpg');
sendFile('test215.jpg');
sendFile('test216.jpg');
sendFile('test217.jpg');
sendFile('test218.jpg');
