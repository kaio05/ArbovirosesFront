import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import api from '../../service/api/Api';
import { SuccessModal } from '../../components/Modals/SuccessModal';

export default function UploadDeterminantes() {
    const navigate = useNavigate();

    // Estado upload
    const [file, setFile]                   = useState<File | null>(null);
    const [fileName, setFileName]           = useState<string | null>(null);
    const [uploadError, setUploadError]     = useState<string | null>(null);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage]     = useState('Arquivo processado com sucesso!');

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUploadError(null);
        setFile(null);
        setFileName(null);
        const uploaded = event.target.files?.[0];
        if (uploaded) {
            const ext = uploaded.name.split('.').pop()?.toLowerCase();
            if (ext !== 'xlsx') {
                setUploadError(`O arquivo precisa estar no formato .xlsx`);
                return;
            }
            setFile(uploaded);
            setFileName(uploaded.name);
        }
    }

    async function handleUpload() {
        if (!file) { alert('Por favor, selecione um arquivo primeiro.'); return; }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('ano', '2026');
        try {
            setLoadingUpload(true);
            const endpoint = '/determinantes/upload';
            const response = await api.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setFile(null);
            setFileName(null);
            
            if (response.status === 200 || response.status === 201) {
                const body = response.data;
                let msg = body?.message || 'Arquivo processado com sucesso!';
                const dataInfo = body?.data;
                if (dataInfo !== undefined && dataInfo !== null) {
                    if (typeof dataInfo === 'object') {
                        const entries = Object.entries(dataInfo as Record<string, unknown>).map(([k, v]) => `${k}: ${v}`).join(', ');
                        if (entries) msg += ` (${entries})`;
                    } else {
                        msg += ` — ${dataInfo} registros processados.`;
                    }
                }
                setSuccessMessage(msg);
                setOpenSuccessModal(true);
            } else if (response.status === 401) {
                navigate('/auth/login');
            } else {
                setUploadError('Falha no envio do arquivo.');
            }
        } catch (error: any) {
            setUploadError(error?.response?.data?.message || 'Ocorreu um erro ao enviar o arquivo.');
        } finally {
            setLoadingUpload(false);
        }
    }

    return (
        <DefaultLayout>
            <div className="mx-auto p-6">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-5">Importar Determinantes Sociais</h2>

                {/* Aba Upload */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="border-2 border-dashed border-indigo-400 rounded-lg p-6 text-center">
                        <p className="text-gray-700 font-medium">Arraste e solte seu arquivo aqui ou</p>
                        <label htmlFor="file-upload-manage" className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition">
                            Escolher arquivo
                            <input
                                id="file-upload-manage"
                                type="file"
                                className="sr-only"
                                accept='.xlsx'
                                onChange={handleFileChange}
                            />
                        </label>
                        {fileName && <p className="mt-2 text-green-600 font-medium">Arquivo selecionado: {fileName}</p>}
                        {uploadError && <p className="mt-3 text-red-600">{uploadError}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                        <button
                            onClick={handleUpload}
                            disabled={!file || loadingUpload}
                            className="flex items-center justify-center bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {loadingUpload && (
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            Enviar Arquivo
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative">

            <SuccessModal
                openModal={openSuccessModal}
                handleModalClose={() => setOpenSuccessModal(false)}
                message={successMessage}
                position="center"
            />
            </div>
        </DefaultLayout>
    );
}
