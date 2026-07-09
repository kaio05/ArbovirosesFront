import { FormEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { cpfMask } from '../common/input/CpfMask';
import { MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH, sanitizePassword, sanitizeSafeText } from '../common/input/InputSecurity';
import { useAuth } from '../contexts/AuthContext';
import DefaultLayout from '../layout/DefaultLayout';
import api from '../service/api/Api';

const Profile = () => {
  const { user, updateSession } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [cpf, setCpf] = useState(cpfMask(user?.cpf ?? ''));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordChangeRequested = useMemo(
    () => !!(currentPassword || newPassword || confirmNewPassword),
    [confirmNewPassword, currentPassword, newPassword],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      return;
    }

    if (passwordChangeRequested) {
      if (!currentPassword) {
        toast.error('Informe a senha atual para alterar a senha.');
        return;
      }

      if (newPassword.length < 6 || confirmNewPassword.length < 6) {
        toast.error('A nova senha deve ter pelo menos 6 caracteres.');
        return;
      }

      if (newPassword !== confirmNewPassword) {
        toast.error('A confirmação da nova senha não confere.');
        return;
      }
    }

    try {
      setLoading(true);

      const response = await api.put('/user/me', {
        fullName,
        cpf,
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      updateSession(
        {
          fullName: response.data.fullName,
          cpf: response.data.cpf,
          role: response.data.role === 'ADMIN' ? 'ADMIN' : 'USER',
        },
        response.data.jwtToken,
      );

      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setCpf(cpfMask(response.data.cpf));
      setFullName(response.data.fullName);
      toast.success('Perfil atualizado com sucesso.');
    } catch (error: any) {
      const message = normalizeApiMessage(
        (Array.isArray(error?.response?.data?.errors) ? error.response.data.errors[0] : null) ||
        (typeof error?.response?.data?.message === 'string' ? error.response.data.message : null) ||
        'Não foi possível atualizar o perfil.',
      );

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const inputClassName = 'w-full rounded-xl border border-stroke bg-white px-4 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary';

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <Breadcrumb pageName="Meu Perfil" />

        <div className="mb-6 rounded-2xl border border-stroke bg-gradient-to-r from-primary/10 via-white to-emerald-50 p-6 shadow-sm dark:border-strokedark dark:from-primary/10 dark:via-boxdark dark:to-emerald-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Conta</p>
              <h2 className="mt-2 text-3xl font-semibold text-black dark:text-white">{user?.fullName ?? 'Usuário'}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-bodydark2">
                Atualize seus dados cadastrais e, se quiser, altere sua senha com confirmação da senha atual.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:min-w-[220px]">
              <div className="rounded-xl border border-stroke bg-white/90 px-4 py-3 dark:border-strokedark dark:bg-boxdark/70">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-bodydark2">Perfil</p>
                <p className="mt-1 text-sm font-medium text-black dark:text-white">
                  {user?.role === 'ADMIN' ? 'Administrador' : 'Usuário comum'}
                </p>
              </div>
              <div className="rounded-xl border border-stroke bg-white/90 px-4 py-3 dark:border-strokedark dark:bg-boxdark/70">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-bodydark2">CPF atual</p>
                <p className="mt-1 text-sm font-medium text-black dark:text-white">{cpf || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6 py-5 dark:border-strokedark">
            <h3 className="text-xl font-semibold text-black dark:text-white">Editar dados</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-bodydark2">
              Nome e CPF podem ser atualizados a qualquer momento. Para mudar a senha, informe primeiro a senha atual.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <label className="mb-2.5 block font-medium text-black dark:text-white">Nome completo</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(sanitizeSafeText(event.target.value))}
                  maxLength={MAX_NAME_LENGTH}
                  className={inputClassName}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">CPF</label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(event) => setCpf(cpfMask(event.target.value))}
                  inputMode="numeric"
                  maxLength={14}
                  className={inputClassName}
                  placeholder="Ex: 123.456.789-10"
                  required
                />
              </div>

              <div className="rounded-xl border border-dashed border-stroke bg-gray-50 px-4 py-4 dark:border-strokedark dark:bg-meta-4/20">
                <p className="text-sm font-medium text-black dark:text-white">Alteração de senha</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-bodydark2">
                  Preencha os campos abaixo somente se quiser definir uma nova senha.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">Senha atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(sanitizePassword(event.target.value))}
                  maxLength={MAX_PASSWORD_LENGTH}
                  className={inputClassName}
                  placeholder="Obrigatória para trocar a senha"
                />
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">Nova senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(sanitizePassword(event.target.value))}
                  maxLength={MAX_PASSWORD_LENGTH}
                  className={inputClassName}
                  placeholder="Mínimo de 6 caracteres"
                />
              </div>

              <div>
                <label className="mb-2.5 block font-medium text-black dark:text-white">Confirmar nova senha</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(event) => setConfirmNewPassword(sanitizePassword(event.target.value))}
                  maxLength={MAX_PASSWORD_LENGTH}
                  className={inputClassName}
                  placeholder="Repita a nova senha"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-stroke pt-6 dark:border-strokedark sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600 dark:text-bodydark2">
                Depois de salvar, seu nome no topo do sistema será atualizado imediatamente.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;

function normalizeApiMessage(message: string) {
  const trimmedMessage = message.trim();
  const quotedMessage = trimmedMessage.match(/^\d+\s+[A-Z_]+\s+"(.+)"$/);

  if (quotedMessage?.[1]) {
    return quotedMessage[1];
  }

  return trimmedMessage;
}
