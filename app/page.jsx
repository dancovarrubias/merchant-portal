'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from '@/components/ui/Link';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular login - en producción validarías con API
    document.cookie = 'session=mock-token; path=/';
    router.push('/cobrar');
  };

  return (
    <AuthLayout illustration="/grafico-inicio.svg">
      <div className="space-y-6 sm:space-y-8">
        <Card variant="primary" className="flex flex-row items-center gap-2.5">
          <Icon src="/alarm.svg" size="md" className="flex-shrink-0" />
          <p className="font-inter font-bold text-xs sm:text-body-sm text-text-primary">
            ¿Quieres Kuesi Pay para tu comercio?{' '}
            <Link to="/register" className="text-primary">
              Regístrate aquí.
            </Link>
          </p>
        </Card>

        <div>
          <h1 className="text-xl sm:text-heading-sm font-dm-sans font-normal text-text-primary">
            Iniciar sesión
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nombre@empresa.com"
            required
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            showPasswordToggle={true}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-body-sm text-text-secondary">Recuérdame</span>
            </label>

            <Link to="/forgot-password" className="text-primary text-body-sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button type="submit" variant="primary" fullWidth>
            Ingresar
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}