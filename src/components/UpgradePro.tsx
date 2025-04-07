'use client'

import React, { useState } from 'react'

interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  popular?: boolean
  savePercent?: number
  originalPrice?: number
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'weekly',
    name: '周体验',
    price: 6.9,
    period: '周',
    description: '短期体验，低成本尝鲜',
    features: [
      '无限次添加水印',
      '基础水印模板',
      '标准防伪功能',
      '邮件支持'
    ]
  },
  {
    id: 'monthly',
    name: '月度会员',
    price: 19.9,
    period: '月',
    description: '最受欢迎的选择',
    features: [
      '无限次添加水印',
      '所有水印模板',
      '高级防伪功能',
      '批量处理',
      '优先邮件支持'
    ],
    popular: true,
    originalPrice: 29.9,
    savePercent: 33
  },
  {
    id: 'quarterly',
    name: '季度会员',
    price: 49.9,
    period: '季',
    description: '更优惠的选择',
    features: [
      '无限次添加水印',
      '所有水印模板',
      '高级防伪功能',
      '批量处理',
      '优先邮件支持',
      '导出无限制'
    ],
    originalPrice: 89.7,
    savePercent: 44
  },
  {
    id: 'yearly',
    name: '年度会员',
    price: 169.9,
    period: '年',
    description: '最优惠的选择',
    features: [
      '无限次添加水印',
      '所有水印模板',
      '高级防伪功能',
      '批量处理',
      '24/7 优先支持',
      '导出无限制',
      '自定义模板'
    ],
    originalPrice: 358.8,
    savePercent: 53
  },
  {
    id: 'lifetime',
    name: '终身会员',
    price: 399,
    period: '终身',
    description: '一次付费，终身使用',
    features: [
      '无限次添加水印',
      '所有水印模板',
      '高级防伪功能',
      '批量处理',
      '24/7 优先支持',
      '导出无限制',
      '自定义模板',
      '终身免费更新'
    ],
    originalPrice: 1199,
    savePercent: 67
  }
]

interface UpgradeProProps {
  onClose: () => void
  onSubscribe: (plan: PricingPlan) => void
}

export const UpgradePro: React.FC<UpgradeProProps> = ({
  onClose,
  onSubscribe
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly')

  const handleSubscribe = (plan: PricingPlan) => {
    onSubscribe(plan)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full mx-auto p-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">升级到专业版</h2>
          <p className="text-gray-600">选择最适合您的计划，随时可以升级或降级</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border p-6 ${
                plan.popular
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    最受欢迎
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <div className="text-gray-400 line-through text-sm">
                      原价 ¥{plan.originalPrice}
                    </div>
                  )}
                  <div className="text-3xl font-bold">¥{plan.price}</div>
                  <div className="text-gray-600">/ {plan.period}</div>
                  {plan.savePercent && (
                    <div className="text-green-500 text-sm mt-1">
                      立省 {plan.savePercent}%
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-2 px-4 rounded-lg ${
                    plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  立即升级
                </button>

                <ul className="text-left space-y-3 mt-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <h4 className="font-semibold">支付方式</h4>
            <div className="flex space-x-4">
              <img src="/alipay.png" alt="支付宝" className="h-8" />
              <img src="/wechat.png" alt="微信支付" className="h-8" />
              <img src="/union.png" alt="银联" className="h-8" />
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <p>所有订阅计划均支持7天无理由退款</p>
            <p>新用户首月仅需 ¥9.9，限时特惠</p>
            <p>如需企业版或定制功能，请联系客服</p>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            暂不升级
          </button>
        </div>
      </div>
    </div>
  )
} 