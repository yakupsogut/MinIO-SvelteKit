import { Client } from 'minio';

const minioClient = new Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'accessKey',//or username
  secretKey: 'secretKey'//or password
});

export default minioClient;
