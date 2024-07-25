<script>
    let filePath = '';
  
    async function viewFile() {
      const video = document.getElementById('video-viewer');
      video.style.display = 'block';
      video.src = `/api/file?path=${filePath}`;
    }
  </script>
  
  <input type="text" bind:value={filePath} placeholder="Enter file path" />
  <button on:click={viewFile}>View File</button>
  
  <video id="video-viewer" controls style="width: 100%; height: 600px; display: none;"></video>
  