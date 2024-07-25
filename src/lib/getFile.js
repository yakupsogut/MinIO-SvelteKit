import minioClient from '$lib/minio';

export async function getFileContentStream(bucketName, encodedObjectName, range) {
    const objectName = decodeBase64(encodedObjectName);
  return new Promise(async (resolve, reject) => {

    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : undefined;

    // Ensure start and end are numbers
    if (isNaN(start) || (end !== undefined && isNaN(end))) {
      console.error('Invalid range:', range);
      return reject(new Error('Invalid range'));
    }

    // Get object stat to determine total size if end is not provided
    let totalSize;
    try {
      const stat = await minioClient.statObject(bucketName, objectName);
      totalSize = stat.size;
    } catch (err) {
      console.error('Error getting object stat:', err);
      return reject(err);
    }

    const options = {
      offset: start,
      length: end ? (end - start + 1) : undefined
    };

    console.log('Fetching object with options:', options);

    minioClient.getPartialObject(bucketName, objectName, options.offset,options.length, (err, dataStream) => {
      if (err) {
        console.error('Error getting object:', err);
        return reject(err);
      }
      const calculatedEnd = end !== undefined ? end : (start + (totalSize - start - 1));
      resolve({ dataStream, start, end: calculatedEnd, totalSize });
    });
  });
}
function decodeBase64(input) {
    return Buffer.from(input, 'base64').toString('utf-8');
  }