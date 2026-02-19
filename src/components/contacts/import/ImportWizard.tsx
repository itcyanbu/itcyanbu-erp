import { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle, X, ChevronRight, Loader2 } from 'lucide-react';

import { useContacts } from '../../../context/ContactContext';
import { parseCSV } from '../../../utils/csvParser';
import { parseVCF } from '../../../utils/vcfParser';

interface ImportWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'start' | 'upload' | 'map' | 'verify';

export const ImportWizard = ({ isOpen, onClose }: ImportWizardProps) => {

    const { bulkAddContacts } = useContacts();
    const [step, setStep] = useState<Step>('start');
    const [file, setFile] = useState<File | null>(null);
    const [csvData, setCsvData] = useState<{ headers: string[], data: Record<string, string>[] } | null>(null);
    const [mapping, setMapping] = useState<Record<string, string>>({});
    const [isImporting, setIsImporting] = useState(false);

    // Preferences
    const [createSmartList, setCreateSmartList] = useState(false);
    const [smartListName, setSmartListName] = useState('');
    const [addToWorkflow, setAddToWorkflow] = useState(false);
    const [workflowId, setWorkflowId] = useState('');
    const [addTags, setAddTags] = useState(false);
    const [tags, setTags] = useState('');
    const [duplicateStrategy, setDuplicateStrategy] = useState('create_update'); // create_update, find_existing

    const fileInputRef = useRef<HTMLInputElement>(null);

    const steps = [
        { id: 'start', label: 'Start' },
        { id: 'upload', label: 'Upload' },
        { id: 'map', label: 'Map' },
        { id: 'verify', label: 'Verify' },
    ];

    const currentStepIndex = steps.findIndex(s => s.id === step);

    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        setError(null);

        if (uploadedFile) {
            const isCsv = uploadedFile.name.toLowerCase().endsWith('.csv');
            const isVcf = uploadedFile.name.toLowerCase().endsWith('.vcf') || uploadedFile.name.toLowerCase().endsWith('.vcard');

            if (!isCsv && !isVcf) {
                setError('Please upload a valid .csv or .vcf file.');
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }

            setFile(uploadedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                let parsed: { headers: string[], data: Record<string, string>[] };

                if (isCsv) {
                    parsed = parseCSV(text);
                } else {
                    parsed = parseVCF(text);
                }

                if (parsed.headers.length === 0 || parsed.data.length === 0) {
                    setError('The uploaded file appears to be empty or invalid.');
                    setFile(null);
                    return;
                }
                setCsvData(parsed);
                // Auto-map predictable fields
                const newMapping: Record<string, string> = {};
                parsed.headers.forEach(header => {
                    const lower = header.toLowerCase();
                    if (lower.includes('first') && lower.includes('name')) newMapping[header] = 'firstName';
                    else if (lower.includes('last') && lower.includes('name')) newMapping[header] = 'lastName';
                    else if (lower === 'name' || lower === 'fn' || lower === 'fullname') newMapping[header] = 'name';
                    else if (lower.includes('email')) newMapping[header] = 'email';
                    else if (lower.includes('phone') || lower === 'tel') newMapping[header] = 'phone';
                    else if (lower.includes('tag')) newMapping[header] = 'tags';
                    else if (lower === 'company' || lower === 'org') newMapping[header] = 'companyName'; // potential custom field
                });
                setMapping(newMapping);
            };
            reader.readAsText(uploadedFile);
        }
    };

    const handleNext = () => {
        if (step === 'start') setStep('upload');
        else if (step === 'upload' && file) setStep('map');
        else if (step === 'map') setStep('verify');
        else if (step === 'verify') handleImport();
    };

    const handleBack = () => {
        setError(null);
        if (step === 'upload') setStep('start');
        else if (step === 'map') setStep('upload');
        else if (step === 'verify') setStep('map');
    };

    const [progress, setProgress] = useState(0);

    const handleImport = async () => {
        if (!csvData) return;
        setIsImporting(true);
        setProgress(0);

        const globalTags = addTags && tags ? tags.split(',').map(t => t.trim()) : [];

        const newContacts = csvData.data.map(row => {
            const contact: any = { customFields: {} };

            Object.entries(mapping).forEach(([csvHeader, ghlField]) => {
                if (!ghlField) return;
                const value = row[csvHeader];

                if (ghlField === 'tags') {
                    // Combine CSV tags with global tags
                    const rowTags = value ? value.split(',').map(t => t.trim()) : [];
                    contact.tags = [...(contact.tags || []), ...rowTags];
                } else if (['name', 'firstName', 'lastName', 'email', 'phone'].includes(ghlField)) {
                    contact[ghlField] = value;
                } else {
                    // Assume custom field
                    contact.customFields[ghlField] = value;
                }
            });

            // Append global tags if not already added
            if (globalTags.length > 0) {
                contact.tags = [...new Set([...(contact.tags || []), ...globalTags])];
            }

            return contact;
        });

        await bulkAddContacts(newContacts, (p) => setProgress(p));

        setIsImporting(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex flex-col justify-center items-center">
            <div className="bg-white w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Imports</h2>
                        <p className="text-sm text-gray-500">Import contacts and opportunities</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-12 py-8 bg-white border-b border-gray-100">
                    <div className="flex items-center justify-between relative">
                        {/* Line */}
                        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10" />

                        {steps.map((s, index) => {
                            const isCompleted = index < currentStepIndex;
                            const isCurrent = index === currentStepIndex;

                            return (
                                <div key={s.id} className="flex flex-col items-center bg-white px-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors ${isCompleted ? 'bg-blue-600 border-blue-600 text-white' :
                                        isCurrent ? 'bg-white border-blue-600 text-blue-600' :
                                            'bg-white border-gray-300 text-gray-400'
                                        }`}>
                                        {isCompleted ? <Check size={16} /> : index + 1}
                                    </div>
                                    <span className={`mt-2 text-xs font-medium uppercase ${isCurrent ? 'text-blue-600' : 'text-gray-500'
                                        }`}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-12 bg-gray-50">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 min-h-[400px]">

                        {step === 'start' && (
                            <div>
                                <h3 className="text-lg font-bold mb-6">Select objects to start importing</h3>
                                <div className="space-y-4">
                                    <label className="flex items-start p-4 border-2 border-blue-600 bg-blue-50 rounded-lg cursor-pointer">
                                        <input type="radio" checked readOnly className="mt-1 w-4 h-4 text-blue-600" />
                                        <div className="ml-3">
                                            <span className="block text-sm font-bold text-gray-900">Contacts</span>
                                            <span className="block text-sm text-gray-500">Contains list of all leads, their details, and specifications.</span>
                                        </div>
                                    </label>
                                    <label className="flex items-start p-4 border border-gray-200 rounded-lg opacity-60 cursor-not-allowed">
                                        <input type="radio" disabled className="mt-1 w-4 h-4 text-gray-300" />
                                        <div className="ml-3">
                                            <span className="block text-sm font-bold text-gray-900">Opportunities</span>
                                            <span className="block text-sm text-gray-500">Contains list of all deals, their stages, statuses and pipeline progress.</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {step === 'upload' && (
                            <div className="text-center">
                                <h3 className="text-lg font-bold mb-2">Upload your files</h3>
                                <p className="text-sm text-gray-500 mb-8">Before uploading files, make sure your file is ready to import.</p>

                                {error && (
                                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center gap-2 text-sm justify-center">
                                        <AlertCircle size={16} />
                                        {error}
                                    </div>
                                )}

                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                        <Upload size={32} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-500 mt-1">csv or vcf (max size 30MB)</p>
                                    {file && (
                                        <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 font-bold bg-blue-50 py-2 px-4 rounded-full inline-flex">
                                            <FileText size={16} />
                                            {file.name}
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".csv,.vcf,.vcard"
                                    onChange={handleFileUpload}
                                />

                                <div className="mt-8 text-left">
                                    <h4 className="text-sm font-bold mb-4">Advanced Options</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500 font-medium uppercase mb-1">Choose how to import contacts</label>
                                            <select
                                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                value={duplicateStrategy}
                                                onChange={(e) => setDuplicateStrategy(e.target.value)}
                                            >
                                                <option value="create_update">Create and update contacts</option>
                                                <option value="create_only">Add new contacts only</option>
                                                <option value="update_only">Update existing contacts only</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 'map' && csvData && (
                            <div>
                                <h3 className="text-lg font-bold mb-4">Map columns</h3>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                                        <AlertCircle size={16} />
                                        Ensure all required fields are correctly mapped for a smooth import process.
                                    </p>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Column Header</th>
                                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Preview Info</th>
                                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">GHL Field</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {csvData.headers.map(header => (
                                                <tr key={header} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-medium text-gray-900">{header}</td>
                                                    <td className="py-3 px-4 text-sm text-gray-500">{csvData.data[0]?.[header] || '-'}</td>
                                                    <td className="py-3 px-4">
                                                        {mapping[header] ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                <Check size={12} /> Mapped
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                Unmapped
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <select
                                                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                                            value={mapping[header] || ''}
                                                            onChange={(e) => setMapping({ ...mapping, [header]: e.target.value })}
                                                        >
                                                            <option value="">Select field...</option>
                                                            <option value="name">Name</option>
                                                            <option value="firstName">First Name</option>
                                                            <option value="lastName">Last Name</option>
                                                            <option value="email">Email</option>
                                                            <option value="phone">Phone</option>
                                                            <option value="tags">Tags</option>
                                                            {/* Add Custom Fields here dynamically in next iteration */}
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {step === 'verify' && (
                            <div>
                                <h3 className="text-lg font-bold mb-6">Preferences</h3>
                                <p className="text-sm text-gray-500 mb-6">Review your data and mapping settings before starting the import.</p>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            id="smartlist"
                                            className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300"
                                            checked={createSmartList}
                                            onChange={(e) => setCreateSmartList(e.target.checked)}
                                        />
                                        <div className="flex-1">
                                            <label htmlFor="smartlist" className="block text-sm font-bold text-gray-900">Create a Smartlist for new contacts</label>
                                            {createSmartList && (
                                                <input
                                                    type="text"
                                                    className="mt-2 w-full border border-gray-300 rounded-md p-2 text-sm"
                                                    placeholder="Smart List Name"
                                                    value={smartListName}
                                                    onChange={(e) => setSmartListName(e.target.value)}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            id="workflow"
                                            className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300"
                                            checked={addToWorkflow}
                                            onChange={(e) => setAddToWorkflow(e.target.checked)}
                                        />
                                        <div className="flex-1">
                                            <label htmlFor="workflow" className="block text-sm font-bold text-gray-900">Add imported contacts to a workflow</label>
                                            {addToWorkflow && (
                                                <select
                                                    className="mt-2 w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
                                                    value={workflowId}
                                                    onChange={(e) => setWorkflowId(e.target.value)}
                                                >
                                                    <option value="">Select Workflow</option>
                                                    <option value="wf1">Nurture</option>
                                                    <option value="wf2">Onboarding</option>
                                                </select>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            id="tags"
                                            className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300"
                                            checked={addTags}
                                            onChange={(e) => setAddTags(e.target.checked)}
                                        />
                                        <div className="flex-1">
                                            <label htmlFor="tags" className="block text-sm font-bold text-gray-900">Add tags to imported contacts</label>
                                            {addTags && (
                                                <input
                                                    type="text"
                                                    className="mt-2 w-full border border-gray-300 rounded-md p-2 text-sm"
                                                    placeholder="Enter tags separated by comma"
                                                    value={tags}
                                                    onChange={(e) => setTags(e.target.value)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h4 className="text-sm font-bold mb-4">Review import</h4>
                                    <div className="flex items-center gap-3 bg-white p-3 rounded border border-gray-200">
                                        <FileText size={20} className="text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{file?.name}</p>
                                            <p className="text-xs text-gray-500">{(file?.size || 0) / 1024 > 1024 ? `${((file?.size || 0) / 1024 / 1024).toFixed(2)} MB` : `${((file?.size || 0) / 1024).toFixed(2)} KB`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 bg-white border-t border-gray-200 flex justify-between items-center">
                    <button
                        onClick={step === 'start' ? onClose : handleBack}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                        {step === 'start' ? 'Cancel' : 'Back'}
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={step === 'upload' && !file}
                        className={`px-6 py-2.5 rounded-lg font-bold text-white flex items-center gap-2 transition-colors ${step === 'upload' && !file
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                            }`}
                    >
                        {isImporting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Importing {progress}%...
                            </>
                        ) : (
                            <>
                                {step === 'verify' ? 'Start Bulk Import' : 'Next'}
                                {step !== 'verify' && <ChevronRight size={18} />}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
