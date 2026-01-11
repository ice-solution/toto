import React, { useState } from 'react';
import { Button, Card } from './UIComponents';
import { Edit, Trash, Save, X, Calendar, User, Mail, Phone } from 'lucide-react';
import { MembershipApplication, MembershipStatus } from '../types';
import { MEMBERSHIP_TIERS } from '../data';

interface MembershipCMSProps {
  memberships: MembershipApplication[];
  onSave: (membership: MembershipApplication) => void;
  onDelete: (id: string) => void;
}

const MembershipCMS: React.FC<MembershipCMSProps> = ({ memberships, onSave, onDelete }) => {
  const [editingMembership, setEditingMembership] = useState<MembershipApplication | null>(null);
  const [formData, setFormData] = useState<{
    status: MembershipStatus;
    notes?: string;
  }>({
    status: 'pending',
    notes: '',
  });

  const handleEdit = (membership: MembershipApplication) => {
    setEditingMembership(membership);
    setFormData({
      status: membership.status,
      notes: membership.notes || '',
    });
  };

  const handleCancel = () => {
    setEditingMembership(null);
    setFormData({
      status: 'pending',
      notes: '',
    });
  };

  const handleSave = () => {
    if (!editingMembership) return;

    const updatedMembership: MembershipApplication = {
      ...editingMembership,
      status: formData.status,
      notes: formData.notes,
      updatedAt: new Date().toISOString(),
      paidAt: formData.status === 'paid' ? new Date().toISOString() : editingMembership.paidAt,
    };

    onSave(updatedMembership);
    handleCancel();
  };

  const getStatusBadgeClass = (status: MembershipStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: MembershipStatus) => {
    switch (status) {
      case 'pending':
        return '待付款';
      case 'paid':
        return '已付款';
      case 'cancelled':
        return '已取消';
      case 'expired':
        return '已過期';
      default:
        return status;
    }
  };

  const selectedTier = (tierId: string) => MEMBERSHIP_TIERS.find(t => t.id === tierId);

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">會員申請列表 ({memberships && Array.isArray(memberships) ? memberships.length : 0})</h3>
        </div>
        <div className="space-y-4">
          {memberships && Array.isArray(memberships) && memberships.map(membership => (
            <div key={membership.id} className="flex items-start justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-base">{membership.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(membership.status)}`}>
                    {getStatusLabel(membership.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{membership.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{membership.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{membership.dob}</span>
                  </div>
                  <div>
                    <span className="font-medium">會員等級：</span>
                    {selectedTier(membership.tier)?.name || membership.tier}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  <span>申請時間：{new Date(membership.createdAt).toLocaleString('zh-TW')}</span>
                  {membership.paidAt && (
                    <span className="ml-4">付款時間：{new Date(membership.paidAt).toLocaleString('zh-TW')}</span>
                  )}
                </div>
                {membership.notes && (
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">備註：</span>{membership.notes}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(membership)} className="text-blue-500 hover:text-blue-700 p-2">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(membership.id)} className="text-red-500 hover:text-red-700 p-2">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {(!memberships || !Array.isArray(memberships) || memberships.length === 0) && (
            <div className="text-center py-8 text-gray-400">
              <p>暫無會員申請。</p>
            </div>
          )}
        </div>
      </Card>

      {editingMembership && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <h3 className="text-xl font-bold mb-6">編輯會員申請</h3>
            <button onClick={handleCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">申請人</label>
                <div className="px-3 py-2 border border-gray-200 rounded bg-gray-50">
                  {editingMembership.name}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">狀態 *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as MembershipStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="pending">待付款</option>
                  <option value="paid">已付款</option>
                  <option value="cancelled">已取消</option>
                  <option value="expired">已過期</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">備註</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="輸入備註..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleCancel}>取消</Button>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="w-4 h-4" /> 保存
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MembershipCMS;

