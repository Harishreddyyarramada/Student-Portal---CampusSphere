import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthShell from '../components/AuthShell';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { user } = await register(formData);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Register as a student or admin and launch your portal workspace with seeded demo-ready course flows."
      asideTitle="Built for modern academic operations"
      asideText="The portal supports realistic onboarding, role-aware workspaces, premium UI details, and mock-powered usage that still behaves like a real product."
      heroImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
      heroBadge="Rapid onboarding"
      heroStats={[
        { label: 'Setup time', value: 'Under 1 minute' },
        { label: 'Role routing', value: 'Auto dashboard redirect' },
        { label: 'Starter access', value: 'Seeded course paths' },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <FormField
          label="Full name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Email address"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          placeholder="Minimum 6 characters"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Role</span>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button type="submit" disabled={loading} className="primary-btn w-full">
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Already registered?{' '}
        <Link className="font-semibold text-brand-500 hover:text-brand-600" to="/login">
          Login here
        </Link>
      </p>
    </AuthShell>
  );
};

export default RegisterPage;
