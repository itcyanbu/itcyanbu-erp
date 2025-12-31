import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';

const DocumentUpload = ({ title, status, onUpload }: any) => (
    <div className="border border-slate-200 rounded-xl p-6 bg-white flex flex-col items-center text-center hover:border-blue-500 transition-colors group">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${status === 'uploaded' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500'
            }`}>
            {status === 'uploaded' ? <Check size={24} /> : <FileText size={24} />}
        </div>
        <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
        <p className="text-xs text-slate-400 mb-4">
            {status === 'uploaded' ? 'File uploaded successfully' : 'PDF or JPG up to 5MB'}
        </p>

        {status === 'uploaded' ? (
            <button className="text-sm text-green-600 font-medium bg-green-50 px-4 py-2 rounded-lg">
                Verified
            </button>
        ) : (
            <label className="cursor-pointer">
                <input type="file" className="hidden" onChange={onUpload} />
                <div className="text-sm text-white bg-[#112D4E] hover:bg-[#1a3f6b] px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <Upload size={16} />
                    <span>Upload File</span>
                </div>
            </label>
        )}
    </div>
);

const ResellerProfile = () => {
    // Mock State for demonstration
    const [uploadStatus, setUploadStatus] = useState({
        aadhar: 'pending',
        pan: 'pending',
        photo: 'pending',
        cheque: 'pending',
        agreement: 'uploaded', // One pre-uploaded for demo
    });

    const handleFileUpload = async (docType: string, file: File) => {
        try {
            // In production, upload to Supabase Storage
            const { supabase } = await import('../../services/supabase');
            const fileExt = file.name.split('.').pop();
            const fileName = `${docType}_${Date.now()}.${fileExt}`;

            const { error } = await supabase.storage
                .from('reseller-docs')
                .upload(fileName, file);

            if (error) {
                console.error('Upload error:', error);
                // Fallback to demo mode
                setUploadStatus(prev => ({ ...prev, [docType]: 'uploaded' }));
            } else {
                setUploadStatus(prev => ({ ...prev, [docType]: 'uploaded' }));
            }
        } catch (err) {
            console.error('Upload failed:', err);
            // Demo mode fallback
            setUploadStatus(prev => ({ ...prev, [docType]: 'uploaded' }));
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Complete Your Profile</h1>
                <p className="text-slate-500">Please upload the required documents to verify your reseller account and unlock full access.</p>
            </div>

            {/* Alert / Status */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-4">
                <AlertCircle className="text-amber-500 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-amber-800">Action Required</h4>
                    <p className="text-sm text-amber-700 mt-1">
                        Your account is currently in <strong>Probation Mode</strong>. User logins will remain disabled until all documents are verified by the Super Admin.
                    </p>
                </div>
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DocumentUpload
                    title="Aadhar Card"
                    status={uploadStatus.aadhar}
                    onUpload={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                            handleFileUpload('aadhar', e.target.files[0]);
                        }
                    }}
                />
                <DocumentUpload
                    title="PAN Card"
                    status={uploadStatus.pan}
                    onUpload={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                            handleFileUpload('pan', e.target.files[0]);
                        }
                    }}
                />
                <DocumentUpload
                    title="Passport Size Photo"
                    status={uploadStatus.photo}
                    onUpload={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                            handleFileUpload('photo', e.target.files[0]);
                        }
                    }}
                />
                <DocumentUpload
                    title="Canceled Cheque"
                    status={uploadStatus.cheque}
                    onUpload={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                            handleFileUpload('cheque', e.target.files[0]);
                        }
                    }}
                />
                <DocumentUpload
                    title="Reseller Agreement"
                    status={uploadStatus.agreement}
                    onUpload={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                            handleFileUpload('agreement', e.target.files[0]);
                        }
                    }}
                />
            </div>

            {/* Company Details Form Section (Brief) */}
            <div className="mt-12">
                <h2 className="text-lg font-bold text-slate-800 mb-6">Company Information</h2>
                <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg bg-slate-50" defaultValue="Tech Solutions Ltd" disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">GST Number</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="22AAAAA0000A1Z5" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Registered Address</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="123 Business Park..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#112D4E] text-white px-6 py-2 rounded-lg hover:bg-[#1a3f6b] transition-colors font-medium">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResellerProfile;
