import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SectionTitle, Button } from '../components/UIComponents';
import { CreditCard, QrCode, CheckCircle } from 'lucide-react';
import { getMembershipById } from '../utils/membershipsStorage';
import { MembershipApplication } from '../types';
import { MEMBERSHIP_TIERS } from '../data';

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [membership, setMembership] = useState<MembershipApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMembership = async () => {
      if (!id) {
        navigate('/membership');
        return;
      }

      try {
        // 添加小延遲確保數據已保存
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = await getMembershipById(id);
        if (!data) {
          console.error('Membership not found:', id);
          // 不立即導航，讓用戶有機會看到錯誤
          alert('找不到會員申請資料，請返回重新提交');
          navigate('/membership');
          return;
        }
        setMembership(data);
      } catch (error) {
        console.error('Error loading membership:', error);
        alert('載入會員申請資料時發生錯誤，請返回重新提交');
        navigate('/membership');
      } finally {
        setIsLoading(false);
      }
    };

    loadMembership();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-paper">
        <div className="container mx-auto px-6">
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">載入中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!membership) {
    return null;
  }

  const selectedTier = MEMBERSHIP_TIERS.find(t => t.id === membership.tier);

  // Demo QR Code (使用 QR code generator API)
  const fpsQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FPS-DEMO-${membership.id}`;
  const paymeQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYME-DEMO-${membership.id}`;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-paper animate-fade-in">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionTitle title="付款方式" subtitle="Payment Methods" />

        {/* Order Summary */}
        <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-serif mb-6 border-b border-gray-200 pb-4">訂單摘要</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">申請人</span>
              <span className="font-bold">{membership.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">會員等級</span>
              <span className="font-bold">{selectedTier?.name || membership.tier}</span>
            </div>
            <div className="flex justify-between text-lg border-t border-gray-200 pt-4">
              <span className="font-bold">總額</span>
              <span className="font-bold text-2xl">HK${selectedTier?.price.toLocaleString() || '0'}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white shadow-lg border border-gray-100 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-serif mb-6 border-b border-gray-200 pb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            付款方式
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FPS 轉數快 */}
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h4 className="text-lg font-bold mb-1">轉數快 (FPS)</h4>
                <p className="text-sm text-gray-500">快速轉賬服務</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">轉數快號碼：</p>
                  <p className="text-xl font-mono font-bold">1234 5678</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-600 mb-3">掃描 QR Code</p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <img
                      src={fpsQrCodeUrl}
                      alt="FPS QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payme */}
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h4 className="text-lg font-bold mb-1">Payme</h4>
                <p className="text-sm text-gray-500">手機支付</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Payme 連結：</p>
                  <p className="text-sm font-mono text-blue-600 break-all">
                    https://payme.hsbc.com/xxxxx
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-600 mb-3">掃描 QR Code</p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <img
                      src={paymeQrCodeUrl}
                      alt="Payme QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            付款說明
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 請使用您選擇的付款方式完成付款</li>
            <li>• 完成付款後，請保留付款截圖或記錄</li>
            <li>• 我們將於 24 小時內確認您的付款並啟動會員服務</li>
            <li>• 如有任何問題，請透過 WhatsApp 聯絡我們</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/membership')}
          >
            返回申請表
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              alert('付款完成後，我們將盡快處理您的申請。請保留付款記錄以便核對。');
              navigate('/');
            }}
            className="flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            我已完成付款
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
