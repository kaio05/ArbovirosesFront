import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import UserRegistrationForm from '../../components/Users/UserRegistrationForm';
import DefaultLayout from '../../layout/DefaultLayout';

const SignUp: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <Breadcrumb pageName="Registrar Usuario" />

        <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-primary">Registrar Usuario</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-bodydark2">
              Cadastro direto de contas por administradores.
            </p>
          </div>

          <UserRegistrationForm />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
