'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from '@/components/ui/Link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <AuthLayout illustration="/grafico-inicio.svg">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl sm:text-heading-sm font-dm-sans font-normal text-text-primary mb-1 sm:mb-2">
            Registra tu comercio
          </h1>
          <p className="text-xs sm:text-body-sm text-text-secondary">
            Únete a Kueski Pay y aumenta tus ventas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <Input
            label="Nombre del comercio"
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Mi Tienda S.A. de C.V."
          />

          <Input
            label="Correo electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com.mx"
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            showPasswordToggle
          />

          <Input
            label="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••••••"
            showPasswordToggle
          />

          <Button type="submit" fullWidth>
            Registrarse
          </Button>
        </form>

        <p className="text-center text-xs sm:text-body-sm text-text-secondary">
          ¿Ya tienes cuenta?{' '}
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