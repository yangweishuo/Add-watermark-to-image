const fs = require('fs-extra');
const path = require('path');

// 创建一个独立的HTML文件，包含所有必要的内联样式和脚本
function createStandalonePage() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>图片水印工具</title>
  <meta name="description" content="轻松为您的图片添加自定义水印" />
  <style>
    /* 基本样式 */
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    
    body {
      background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
      color: #111827;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    
    .header p {
      font-size: 1.25rem;
      color: #6b7280;
    }
    
    .card {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      overflow: hidden;
    }
    
    .card-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .layout {
      display: grid;
      grid-template-columns: 1fr;
      border-top: 1px solid #e5e7eb;
    }
    
    @media (min-width: 1024px) {
      .layout {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .panel {
      padding: 1.5rem;
      border-right: 1px solid #e5e7eb;
    }
    
    .panel-section {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .panel-section h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    
    .preview {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .dropzone {
      width: 100%;
      height: 300px;
      border: 2px dashed #d1d5db;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f9fafb;
      cursor: pointer;
    }
    
    .dropzone:hover {
      border-color: #9ca3af;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }
    
    input[type="range"] {
      width: 100%;
    }
    
    .color-picker {
      display: flex;
      align-items: center;
    }
    
    input[type="color"] {
      height: 2rem;
      width: 2rem;
      padding: 0;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
    }
    
    input[type="text"].color-text {
      margin-left: 0.5rem;
      width: 7rem;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border: 1px solid transparent;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }
    
    .btn-primary {
      background-color: #4f46e5;
      color: white;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    
    .btn-primary:hover {
      background-color: #4338ca;
    }
    
    .preview-image {
      max-width: 100%;
      max-height: 500px;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .spinner {
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top: 3px solid #4f46e5;
      width: 2rem;
      height: 2rem;
      animation: spin 1s linear infinite;
      margin: 1rem auto;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .checkbox-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .range-value {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }
    
    /* 改进的控件样式 */
    input[type="range"] {
      -webkit-appearance: none;
      height: 0.5rem;
      background: #e5e7eb;
      border-radius: 0.25rem;
      outline: none;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      background: #4f46e5;
      border-radius: 50%;
      cursor: pointer;
      border: none;
    }
    
    input[type="range"]::-moz-range-thumb {
      width: 1.25rem;
      height: 1.25rem;
      background: #4f46e5;
      border-radius: 50%;
      cursor: pointer;
      border: none;
    }
    
    input[type="checkbox"] {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 0.25rem;
      border: 1px solid #d1d5db;
      background-color: white;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
      display: grid;
      place-content: center;
    }
    
    input[type="checkbox"]::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em #4f46e5;
      border-radius: 0.125rem;
    }
    
    input[type="checkbox"]:checked::before {
      transform: scale(1);
    }
    
    select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    
    /* 媒体查询适配小屏幕 */
    @media (max-width: 640px) {
      .header h1 {
        font-size: 1.875rem;
      }
      
      .header p {
        font-size: 1rem;
      }
      
      .card-header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .card-header > div {
        margin-top: 1rem;
        width: 100%;
      }
      
      .card-header button {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>图片水印工具</h1>
      <p>轻松为您的图片添加自定义水印</p>
    </header>
    
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">图片水印工具</h2>
        <div>
          <input type="file" id="fileInput" accept="image/*" style="display: none;" multiple />
          <button id="selectImage" class="btn btn-primary">选择图片</button>
        </div>
      </div>
      
      <div class="layout">
        <div class="panel">
          <div class="panel-section">
            <h3>文字水印</h3>
            
            <div class="form-group">
              <label class="form-label" for="watermarkText">水印文字</label>
              <input type="text" id="watermarkText" class="form-control" placeholder="输入水印文字" />
            </div>
            
            <div class="form-group">
              <label class="form-label" for="fontSize">字体大小</label>
              <input type="range" id="fontSize" min="10" max="100" value="20" />
              <div class="range-value"><span id="fontSizeValue">20</span>px</div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="textColor">颜色</label>
              <div class="color-picker">
                <input type="color" id="textColor" value="#000000" />
                <input type="text" id="colorText" class="form-control color-text" value="#000000" />
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="opacity">透明度</label>
              <input type="range" id="opacity" min="1" max="100" value="50" />
              <div class="range-value"><span id="opacityValue">50</span>%</div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="position">位置</label>
              <select id="position" class="form-control">
                <option value="center">居中</option>
                <option value="top-left">左上角</option>
                <option value="top-right">右上角</option>
                <option value="bottom-left">左下角</option>
                <option value="bottom-right">右下角</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="rotation">旋转角度</label>
              <input type="range" id="rotation" min="0" max="360" value="0" />
              <div class="range-value"><span id="rotationValue">0</span>°</div>
            </div>
            
            <div class="form-group checkbox-group">
              <label class="form-label" for="tiled">平铺水印</label>
              <input type="checkbox" id="tiled" />
            </div>
            
            <div id="spacingGroup" class="form-group" style="display: none;">
              <label class="form-label" for="spacing">间距</label>
              <input type="range" id="spacing" min="50" max="400" value="100" />
              <div class="range-value"><span id="spacingValue">100</span>px</div>
            </div>
          </div>
          
          <div>
            <h3>防伪水印</h3>
            
            <div class="form-group">
              <button id="addSecurityCode" class="btn btn-primary">添加随机防伪码</button>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="securityCodeSize">防伪码大小</label>
              <input type="range" id="securityCodeSize" min="10" max="100" value="20" />
              <div class="range-value"><span id="securityCodeSizeValue">20</span>px</div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="securityCodePosition">防伪码位置</label>
              <select id="securityCodePosition" class="form-control">
                <option value="tiled">平铺</option>
                <option value="diagonal">对角线</option>
                <option value="border">边框</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="securityFont">防伪字体</label>
              <select id="securityFont" class="form-control">
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="preview">
          <div id="dropzone" class="dropzone">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p style="margin-top: 1rem; color: #6b7280;">请选择一张图片或拖放图片到此处</p>
          </div>
          
          <div id="imagePreview" style="display: none; width: 100%;">
            <img id="previewImage" class="preview-image" src="" alt="预览" />
            <button id="downloadButton" class="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下载图片
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // 元素引用
      const fileInput = document.getElementById('fileInput');
      const selectImageBtn = document.getElementById('selectImage');
      const dropzone = document.getElementById('dropzone');
      const imagePreview = document.getElementById('imagePreview');
      const previewImage = document.getElementById('previewImage');
      const downloadButton = document.getElementById('downloadButton');
      
      // 水印设置元素
      const watermarkText = document.getElementById('watermarkText');
      const fontSize = document.getElementById('fontSize');
      const fontSizeValue = document.getElementById('fontSizeValue');
      const textColor = document.getElementById('textColor');
      const colorText = document.getElementById('colorText');
      const opacity = document.getElementById('opacity');
      const opacityValue = document.getElementById('opacityValue');
      const position = document.getElementById('position');
      const rotation = document.getElementById('rotation');
      const rotationValue = document.getElementById('rotationValue');
      const tiled = document.getElementById('tiled');
      const spacingGroup = document.getElementById('spacingGroup');
      const spacing = document.getElementById('spacing');
      const spacingValue = document.getElementById('spacingValue');
      
      // 防伪水印元素
      const addSecurityCodeBtn = document.getElementById('addSecurityCode');
      const securityCodeSize = document.getElementById('securityCodeSize');
      const securityCodeSizeValue = document.getElementById('securityCodeSizeValue');
      const securityCodePosition = document.getElementById('securityCodePosition');
      const securityFont = document.getElementById('securityFont');
      
      // 当前上传的图片
      let currentImage = null;
      
      // 水印配置
      const config = {
        text: '',
        fontSize: 20,
        color: '#000000',
        opacity: 50,
        position: 'center',
        rotation: 0,
        tiled: false,
        spacing: 100,
        securityCodeSize: 20,
        securityCodePosition: 'tiled',
        securityFont: 'Arial'
      };
      
      // 更新控件值显示
      function updateValueDisplays() {
        fontSizeValue.textContent = fontSize.value;
        opacityValue.textContent = opacity.value;
        rotationValue.textContent = rotation.value;
        spacingValue.textContent = spacing.value;
        securityCodeSizeValue.textContent = securityCodeSize.value;
      }
      
      // 显示/隐藏间距设置
      function toggleSpacingGroup() {
        spacingGroup.style.display = tiled.checked ? 'block' : 'none';
      }
      
      // 处理图片上传
      function handleImageUpload(file) {
        if (!file || !file.type.startsWith('image/')) return;
        
        currentImage = file;
        const reader = new FileReader();
        
        reader.onload = function(e) {
          previewImage.src = e.target.result;
          dropzone.style.display = 'none';
          imagePreview.style.display = 'flex';
          processImage();
        };
        
        reader.readAsDataURL(file);
      }
      
      // 处理图片并添加水印
      function processImage() {
        if (!currentImage) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            // 绘制原始图片
            ctx.drawImage(img, 0, 0);
            
            // 添加水印
            ctx.save();
            ctx.globalAlpha = config.opacity / 100;
            
            // 文字水印
            if (config.text) {
              ctx.font = \`\${config.fontSize}px \${config.securityFont || 'Arial'}\`;
              ctx.fillStyle = config.color;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              
              if (config.tiled) {
                const spacingValue = config.spacing || 100;
                for (let x = spacingValue; x < canvas.width; x += spacingValue) {
                  for (let y = spacingValue; y < canvas.height; y += spacingValue) {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate((config.rotation * Math.PI) / 180);
                    ctx.fillText(config.text, 0, 0);
                    ctx.restore();
                  }
                }
              } else {
                const pos = getPosition(canvas.width, canvas.height, config.position);
                ctx.save();
                ctx.translate(pos.x, pos.y);
                ctx.rotate((config.rotation * Math.PI) / 180);
                ctx.fillText(config.text, 0, 0);
                ctx.restore();
              }
            }
            
            // 添加防伪码水印的特殊处理
            if (config.securityCodePosition && config.text) {
              ctx.font = \`\${config.securityCodeSize}px \${config.securityFont || 'Arial'}\`;
              
              if (config.securityCodePosition === 'diagonal') {
                // 对角线模式
                ctx.save();
                ctx.translate(canvas.width * 0.25, canvas.height * 0.25);
                ctx.rotate((config.rotation * Math.PI) / 180);
                ctx.fillText(config.text, 0, 0);
                ctx.restore();
                
                ctx.save();
                ctx.translate(canvas.width * 0.75, canvas.height * 0.75);
                ctx.rotate((config.rotation * Math.PI) / 180);
                ctx.fillText(config.text, 0, 0);
                ctx.restore();
              } else if (config.securityCodePosition === 'border') {
                // 边框模式
                const positions = [
                  { x: canvas.width * 0.2, y: canvas.height * 0.1 },
                  { x: canvas.width * 0.8, y: canvas.height * 0.1 },
                  { x: canvas.width * 0.2, y: canvas.height * 0.9 },
                  { x: canvas.width * 0.8, y: canvas.height * 0.9 }
                ];
                
                positions.forEach(pos => {
                  ctx.save();
                  ctx.translate(pos.x, pos.y);
                  ctx.rotate((config.rotation * Math.PI) / 180);
                  ctx.fillText(config.text, 0, 0);
                  ctx.restore();
                });
              }
            }
            
            ctx.restore();
            
            // 更新预览
            previewImage.src = canvas.toDataURL('image/jpeg');
          };
          
          img.src = e.target.result;
        };
        
        reader.readAsDataURL(currentImage);
      }
      
      // 获取水印位置
      function getPosition(width, height, position) {
        switch (position) {
          case 'top-left':
            return { x: width * 0.1, y: height * 0.1 };
          case 'top-right':
            return { x: width * 0.9, y: height * 0.1 };
          case 'bottom-left':
            return { x: width * 0.1, y: height * 0.9 };
          case 'bottom-right':
            return { x: width * 0.9, y: height * 0.9 };
          default: // center
            return { x: width * 0.5, y: height * 0.5 };
        }
      }
      
      // 生成随机防伪码
      function generateSecurityCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
      }
      
      // 下载处理后的图片
      function downloadImage() {
        if (!previewImage.src) return;
        
        const a = document.createElement('a');
        a.href = previewImage.src;
        a.download = 'watermarked_image_' + new Date().getTime() + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      
      // 事件监听器
      selectImageBtn.addEventListener('click', () => fileInput.click());
      
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleImageUpload(e.target.files[0]);
        }
      });
      
      dropzone.addEventListener('click', () => fileInput.click());
      
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#9ca3af';
      });
      
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = '#d1d5db';
      });
      
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#d1d5db';
        if (e.dataTransfer.files.length > 0) {
          handleImageUpload(e.dataTransfer.files[0]);
        }
      });
      
      downloadButton.addEventListener('click', downloadImage);
      
      // 水印设置更改事件
      watermarkText.addEventListener('input', (e) => {
        config.text = e.target.value;
        processImage();
      });
      
      fontSize.addEventListener('input', (e) => {
        config.fontSize = parseInt(e.target.value);
        fontSizeValue.textContent = e.target.value;
        processImage();
      });
      
      textColor.addEventListener('input', (e) => {
        config.color = e.target.value;
        colorText.value = e.target.value;
        processImage();
      });
      
      colorText.addEventListener('input', (e) => {
        config.color = e.target.value;
        textColor.value = e.target.value;
        processImage();
      });
      
      opacity.addEventListener('input', (e) => {
        config.opacity = parseInt(e.target.value);
        opacityValue.textContent = e.target.value;
        processImage();
      });
      
      position.addEventListener('change', (e) => {
        config.position = e.target.value;
        processImage();
      });
      
      rotation.addEventListener('input', (e) => {
        config.rotation = parseInt(e.target.value);
        rotationValue.textContent = e.target.value;
        processImage();
      });
      
      tiled.addEventListener('change', (e) => {
        config.tiled = e.target.checked;
        toggleSpacingGroup();
        processImage();
      });
      
      spacing.addEventListener('input', (e) => {
        config.spacing = parseInt(e.target.value);
        spacingValue.textContent = e.target.value;
        processImage();
      });
      
      addSecurityCodeBtn.addEventListener('click', () => {
        const securityCode = generateSecurityCode();
        watermarkText.value = (watermarkText.value ? watermarkText.value + ' ' : '') + securityCode;
        config.text = watermarkText.value;
        processImage();
      });
      
      securityCodeSize.addEventListener('input', (e) => {
        config.securityCodeSize = parseInt(e.target.value);
        securityCodeSizeValue.textContent = e.target.value;
        processImage();
      });
      
      securityCodePosition.addEventListener('change', (e) => {
        config.securityCodePosition = e.target.value;
        processImage();
      });
      
      securityFont.addEventListener('change', (e) => {
        config.securityFont = e.target.value;
        processImage();
      });
      
      // 初始化显示
      updateValueDisplays();
      toggleSpacingGroup();
    });
  </script>
</body>
</html>
  `;

  // 保存到项目根目录
  fs.writeFileSync(path.join(__dirname, '图片水印工具.html'), htmlContent);
  console.log('创建了可直接在浏览器中打开的HTML文件: 图片水印工具.html');
}

// 创建独立HTML文件
createStandalonePage(); 