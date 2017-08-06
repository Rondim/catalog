const request = require('request').defaults({ encoding: null });

function sendFile(fileName) {
  return new Promise((resolve, reject) => {
    const fileUrl = 'https://firebasestorage.googleapis.com/v0/b/catalog-26b41.appspot.com/o/items%2F-KdploACMTh4jUKOtf5d?alt=media&token=79faec85-ca59-45d8-ad88-ebea9ef7e34d';
    request(fileUrl, uploadFile);

    function uploadFile(err, response, body) {
      err && console.log('ERROR: \n', err);
      const r = request.post('https://api.graph.cool/file/v1/cj5tpc7zsj16i012285uxa6j5', requestCallback);
      const form = r.form();
      form.append('data', body, {
        filename: fileName
      });
    }

    function requestCallback(e, httpResponse, body) {

      if (!e) {
        resolve(body);
      } else {
        reject(e);
      }
    }
  });
}

sendFile('test.jpg');
