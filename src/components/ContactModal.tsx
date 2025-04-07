import React from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">联系作者</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 mb-2">扫描下方二维码添加作者微信</p>
              <div className="flex justify-center">
                <img
                  src="/qrcode.jpg" // 请替换为实际的二维码图片路径
                  alt="作者微信二维码"
                  className="w-48 h-48 object-cover border-4 border-white shadow-lg rounded-lg"
                />
              </div>
            </div>
            
            <div className="text-left space-y-2 bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800">其他联系方式：</h4>
              <p className="text-blue-600">
                <span className="font-medium">邮箱：</span>
                <a href="mailto:your@email.com" className="hover:underline">yangweishuo297@gmail.com</a>
              </p>
              <p className="text-blue-600">
                <span className="font-medium">微信号：</span>
                <span className="select-all">muyiredbook</span>
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 text-left">
              <p className="text-yellow-800 text-sm">
                <span className="font-medium">提示：</span>
                添加微信时请注明"水印工具"，方便及时通过。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 