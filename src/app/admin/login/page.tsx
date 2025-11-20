'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';

function AdminLoginPageContent() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refresh } = useAdmin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const payload = {
        username: username.trim(),
        password: password.trim(),
      };

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data?.error ?? 'שגיאת התחברות');
        setIsSubmitting(false);
        return;
      }

      await refresh();
      router.replace('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('שגיאה לא צפויה, נסה שוב.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f4ef] px-4">
      <div className="w-full max-w-md bg-white border border-[#ebe7dd] rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-8 space-y-6">
        <div className="text-right space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8696a7]">Area Manager</p>
          <h1 className="text-3xl font-semibold text-[#1e1f24]">כניסת מנהל</h1>
          <p className="text-sm text-[#4b4d55]">הזן את פרטי המנהל כדי להוסיף תוצאות חדשות.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          aria-label="טופס התחברות מנהל"
          autoComplete="off"
        >
          <div className="space-y-2 text-right">
            <label htmlFor="username" className="block text-sm font-medium text-[#1e1f24]">
              שם משתמש מנהל
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              name="username"
              autoComplete="off"
              className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
            />
          </div>

          <div className="space-y-2 text-right">
            <label htmlFor="password" className="block text-sm font-medium text-[#1e1f24]">
              סיסמה
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-[#dcd8ce] px-4 py-3 text-right text-[#1e1f24] focus:outline-none focus:ring-2 focus:ring-[#d4a65a]/40 focus:border-[#d4a65a]"
            />
          </div>

          {errorMessage && (
            <div role="alert" className="text-sm text-red-600 text-right">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-full bg-[#d4a65a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c1954d] disabled:opacity-60"
          >
            {isSubmitting ? 'מתחבר...' : 'כניסה'}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminLoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f4ef] px-4">
      <div className="w-full max-w-md bg-white border border-[#ebe7dd] rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-8 space-y-6">
        <div className="text-right space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8696a7]">Area Manager</p>
          <h1 className="text-3xl font-semibold text-[#1e1f24]">כניסת מנהל</h1>
          <p className="text-sm text-[#4b4d55]">טוען את טופס ההתחברות...</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AdminLoginFallback />}>
      <AdminLoginPageContent />
    </Suspense>
  );
}

