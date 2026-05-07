import { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { SuccessModal } from '../../components/Modals/SuccessModal';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api/Api';
import gerarArquivoComErros from '../../components/NotificationsWithError/NotificationsWithError';

type FileType = 'xlsx' | 'csv' | 'dbf';

const FILE_TYPE_CONFIG: Record<FileType, { endpoint: string; accept: string; label: string }> = {
    xlsx: { endpoint: '/uploadXlsx', accept: '.xlsx', label: 'Excel (.xlsx)' },
    csv:  { endpoint: '/uploadCsv',  accept: '.csv',  label: 'CSV (.csv)'   },
    dbf:  { endpoint: '/uploadDbf',  accept: '.dbf',  label: 'DBF (.dbf)'   },
};

const CarregarDados: React.FC = () => {
    const navigate = useNavigate();
    const [fileType, setFileType] = useState<FileType>('xlsx');
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('Arquivo processado com sucesso!');
    const [asyncPending, setAsyncPending] = useState<boolean>(false);

    function handleTypeChange(type: FileType) {
        setFileType(type);
        setFile(null);
        setFileName(null);
        setErrorMessage(null);
        setAsyncPending(false);
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        setErrorMessage(null);
        setFile(null);
        setFileName(null);
        setAsyncPending(false);
        const uploadedFile = event.target.files?.[0];

        if (uploadedFile) {
            const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
            if (ext !== fileType) {
                setErrorMessage(`O arquivo precisa estar no formato .${fileType}`);
                return;
            }

            setFile(uploadedFile);
            setFileName(uploadedFile.name);
        }
    }

    function handleModalClose() {
        setOpenSuccessModal(false);
    }

    async function handleButtonClick() {
        if (!file) {
            alert('Por favor, selecione um arquivo primeiro.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoadingData(true);
            setAsyncPending(false);
            const { endpoint } = FILE_TYPE_CONFIG[fileType];
            const response = await api.post(endpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setFile(null);
            setFileName(null);

            if (response.status === 202) {
                setAsyncPending(true);
            } else if (response.status === 200 || response.status === 201) {
                const responseBody = response.data;
                const dataInfo = responseBody?.data;
                let msg = responseBody?.message || 'Arquivo processado com sucesso!';
                if (dataInfo !== undefined && dataInfo !== null) {
                    if (typeof dataInfo === 'object') {
                        const entries = Object.entries(dataInfo as Record<string, unknown>)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(', ');
                        if (entries) msg += ` (${entries})`;
                    } else {
                        msg += ` — ${dataInfo} registros processados.`;
                    }
                }
                setSuccessMessage(msg);
                setOpenSuccessModal(true);
            } else if (response.status === 401) {
                navigate('/auth/register');
            } else {
                setErrorMessage('Falha no envio do arquivo.');
            }
        } catch (error: any) {
            const apiMessage = error?.response?.data?.message;
            setErrorMessage(apiMessage || 'Ocorreu um erro ao enviar o arquivo.');
        } finally {
            setLoadingData(false);
        }
    }

    return (
        <DefaultLayout>
            <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Importar Notificações</h2>

                {/* Seleção do tipo de arquivo */}
                <div className="mb-6">
                    <p className="text-gray-700 font-medium mb-3 text-center">Selecione o formato do arquivo</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {(Object.keys(FILE_TYPE_CONFIG) as FileType[]).map((type) => (
                            <label
                                key={type}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition select-none ${
                                    fileType === type
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                                        : 'border-gray-300 text-gray-600 hover:border-indigo-400'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="fileType"
                                    value={type}
                                    checked={fileType === type}
                                    onChange={() => handleTypeChange(type)}
                                    className="accent-indigo-600"
                                />
                                {FILE_TYPE_CONFIG[type].label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Área de upload */}
                <div className="border-2 border-dashed border-indigo-400 rounded-lg p-6 text-center">
                    <p className="text-gray-700 font-medium">Arraste e solte seu arquivo aqui ou</p>
                    <label htmlFor="file-upload" className="inline-block mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition">
                        Escolher arquivo
                        <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            accept={FILE_TYPE_CONFIG[fileType].accept}
                            onChange={handleFileChange}
                        />
                    </label>
                    {fileName && (
                        <p className="mt-2 text-green-600 font-medium">Arquivo selecionado: {fileName}</p>
                    )}
                    {errorMessage && (
                        <div className="mt-3 flex items-center justify-center text-red-600">
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </div>

                {/* Aviso de processamento assíncrono */}
                {asyncPending && (
                    <div className="mt-4 flex items-start gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
                        <svg className="mt-0.5 h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-semibold">Arquivo recebido — processamento em andamento</p>
                            <p className="text-sm mt-1">O servidor está processando os dados em segundo plano. Isso pode levar alguns minutos. Os registros estarão disponíveis em breve.</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    <button
                        onClick={handleButtonClick}
                        disabled={!file || loadingData}
                        className="flex items-center justify-center bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {loadingData && (
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        Enviar Arquivo
                    </button>

                    <button
                        onClick={gerarArquivoComErros}
                        className="flex items-center justify-center bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                    >
                        Verificar Erros
                    </button>
                </div>
            </div>

            <SuccessModal
                openModal={openSuccessModal}
                handleModalClose={handleModalClose}
                message={successMessage}
                position="center"
            />
        </DefaultLayout>
    );
};

export default CarregarDados;