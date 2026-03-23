import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Mail, MapPin, Phone } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
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
      await updateProfile(formData);
      setFormData((current) => ({ ...current, password: '' }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Profile"
      description="Update your personal details and keep your account information current."
    >
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel overflow-hidden rounded-[28px]"
        >
          <div className="relative h-56">
            <img
              src={user?.enrolledCourses?.[0]?.image || user?.avatar}
              alt={user?.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/45 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-end gap-4 text-white">
              <img src={user?.avatar} alt={user?.name} className="h-24 w-24 rounded-[28px] object-cover ring-4 ring-white/15" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Account snapshot</p>
                <h3 className="mt-2 text-3xl font-semibold">{user?.name}</h3>
                <p className="mt-1 text-sm text-white/75">{user?.title}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {[
              ['Full name', user?.name],
              ['Email', user?.email],
              ['Role', user?.role],
              ['Courses', String(user?.enrolledCourses?.length || 0)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/20 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-900/50"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}

            <div className="mt-4 grid gap-3">
              {[
                { icon: BriefcaseBusiness, label: 'Department', value: user?.department },
                { icon: Phone, label: 'Phone', value: user?.phone },
                { icon: MapPin, label: 'Location', value: user?.location },
                { icon: Mail, label: 'Contact', value: user?.email },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/20 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-900/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-slate-900 p-3 text-white dark:bg-white dark:text-slate-900">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-[28px] p-6"
        >
          <p className="text-sm text-brand-500">Edit profile</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Keep your portal identity updated
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Changes persist inside the demo workspace as well, so you can showcase profile editing without touching a real database.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <FormField
              label="Full name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormField
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormField
              label="New password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? 'Saving changes...' : 'Update profile'}
            </button>
          </form>
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
