import { getFileContentStream } from '$lib/getFile.js';
import mime from 'mime-types';


export async function GET({ url, request }) {
  const bucketName = 'bucket-name';
  const objectName = encodeBase64(url.searchParams.get('path') || 'default.mp4');
//   const objectName = url.searchParams.get('path') || 'default.mp4';
  const range = request.headers.get('range');
  if (!range) {
    console.error('Range header is required');
    return new Response(JSON.stringify({ error: 'Range header is required' }), {
      status: 416,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const { dataStream, start, end, totalSize } = await getFileContentStream(bucketName, objectName, range);
    // const mimeType = mime.lookup(objectName) || 'application/octet-stream';
    const mimeType = mime.lookup(decodeBase64(objectName)) || 'application/octet-stream';

    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${objectName}"`
    };

    console.log('Returning response with headers:', headers);

    return new Response(dataStream, {
      status: 206,
      headers: headers
    });
  } catch (error) {
    console.error('Error fetching file content:', error);
    return new Response(
      JSON.stringify({ error: 'File fetch failed.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
function encodeBase64(input) {
	return Buffer.from(input, 'utf-8').toString('base64');
  }
  
  function decodeBase64(input) {
	return Buffer.from(input, 'base64').toString('utf-8');
  }