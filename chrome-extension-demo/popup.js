let allImages = [];

// 确保下载按钮有事件监听器
if(document.getElementById('downloadAllBtn')) {
    document.getElementById('downloadAllBtn').addEventListener('click', () => {
        if(allImages.length > 0) {
            allImages.forEach(src => {
                chrome.downloads.download({
                    url: src,
                    filename: 'Download/test/' + src.split('/').pop()
                });
            });
        } else {
            console.log('没有可下载的图片');
        }
    });
}

document.getElementById('actionBtn').addEventListener('click', () => {
    const minWidth = parseInt(document.getElementById('minWidth').value) || 0;
    const minHeight = parseInt(document.getElementById('minHeight').value) || 0;
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: (minWidth, minHeight) => {
                const imgElements = Array.from(document.getElementsByTagName('img'));
                const imgSrcs = imgElements
                    .filter(img => img.naturalWidth >= minWidth && img.naturalHeight >= minHeight)
                    .map(img => img.src);
                
                const elements = document.querySelectorAll('*');
                const bgImages = [];
                
                elements.forEach(el => {
                    const bgImage = window.getComputedStyle(el).backgroundImage;
                    if (bgImage && bgImage !== 'none') {
                        const url = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                        bgImages.push(url);
                    }
                });
                
                return [...imgSrcs, ...bgImages];
            },
            args: [minWidth, minHeight]
        }, (results) => {
            const imagesContainer = document.getElementById('imagesContainer');
            imagesContainer.innerHTML = '';
            
            if (results && results[0] && results[0].result) {
                allImages = results[0].result || [];
                allImages.forEach(src => {
                    const imgElement = document.createElement('img');
                    imgElement.src = src;
                    imgElement.style.maxWidth = '100%';
                    imgElement.style.margin = '5px 0';
                    
                    const downloadBtn = document.createElement('button');
                    downloadBtn.textContent = '下载图片';
                    downloadBtn.style.margin = '5px 0';
                    downloadBtn.addEventListener('click', () => {
                        chrome.downloads.download({
                            url: src,
                            filename: 'Download/test/' + src.split('/').pop()
                        });
                    });
                    
                    const container = document.createElement('div');
                    container.appendChild(imgElement);
                    container.appendChild(downloadBtn);
                    imagesContainer.appendChild(container);
                });
            }
        });
    });
});