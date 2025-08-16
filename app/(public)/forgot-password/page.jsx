'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from '@/components/ui/Link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleBackToLogin = () => {
    // Limpiar sesión al ir a login para evitar redirección
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  };

  return (
    <AuthLayout illustration="/grafico-inicio.svg">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-heading-sm font-dm-sans font-normal text-text-primary mb-1 sm:mb-2">
            {isSubmitted ? 'Revisa tu correo' : 'Recuperar contraseña'}
          </h1>
          <p className="text-xs sm:text-body-sm text-text-secondary">
            {isSubmitted 
              ? `Hemos enviado instrucciones a ${email}`
              : 'Te enviaremos un enlace para restablecer tu contraseña'}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com.mx"
            />

            <Button type="submit" fullWidth>
              Enviar instrucciones
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <Button onClick={handleBackToLogin} fullWidth>
              Regresar al inicio de sesión
            </Button>
          </div>
        )}

        <p className="text-center text-xs sm:text-body-sm text-text-secondary">
          ¿Recordaste tu contraseña?{' '}
          <a 
            href="/" 
            className="text-primary font-medium hover:underline cursor-pointer"
            onClick={() => {
              // Limpiar sesión al ir a login para evitar redirección
              document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
            }}
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}