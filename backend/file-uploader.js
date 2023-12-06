//Import Minio SDK
const Minio = require('minio');

// Instantiate the Minio client
// https://min.io/docs/minio/linux/developers/javascript/API.html
const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000, //Default value set to 80 for HTTP and 443 for HTTPs.
    useSSL: false, //https is used instead of http. Default is true.
    accessKey: '7JNDnnK1K5d7O9oUcSSq',
    secretKey: 'xH4yPs3GmZYRPTmBykx50brxdzdjzXXaLbPbeumP',
});

// File that needs to be uploaded
// demo for testing
const file = '/Users/Tommy/Documents/WebApp_Group/ambitious-bishes/storage-service/this_is_a_test.js';

// Make a bucket called myminio
const minioBucket = 'myminio';

minioClient.makeBucket(minioBucket, 'us-east-1', function (err) {
    if (err) return console.log(err);

    console.log('Bucket created successfully in "us-east-1".');

    // Set metadata for the file
    const metaData = {
        'Content-Type': 'message/code',
        'Content-Language': 'js',
        'version': '1.0',
        example: 112233,
    };

  // Use fPutObject API to upload the file to the bucket europetrip
  minioClient.fPutObject(minioBucket, 'code', file, metaData, function (err, objInfo) {
    if (err) return console.log(err);
    console.log('File uploaded successfully.',objInfo.etag, objInfo.versionId);
  });
});