import { useEffect, useState } from 'react';
import { BarChart3, BookCopy, BriefcaseBusiness, TrendingUp, Users2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';
import api from '../services/api';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get('/users/analytics');
        setAnalytics(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Admin Dashboard" description="Loading your analytics workspace.">
        <div className="glass-panel rounded-[28px]">
          <Loader label="Preparing analytics..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Admin Dashboard"
      description="Manage students, courses, and academic performance from a unified control room."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Users2} label="Total Students" value={analytics?.totalStudents ?? 0} />
        <StatCard
          icon={BookCopy}
          label="Total Courses"
          value={analytics?.totalCourses ?? 0}
          accent="from-emerald-500 to-teal-400"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Enrollments"
          value={analytics?.totalEnrollments ?? 0}
          accent="from-fuchsia-500 to-pink-400"
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel overflow-hidden rounded-[28px]"
        >
          <div className="relative h-72">
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1400&q=80"
              alt="Admin overview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
            <div className="absolute inset-0 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Control Room</p>
              <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight">
                Manage courses, student growth, and academic delivery from one premium workspace.
              </h3>
              <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
                {[
                  { label: 'New signups', value: analytics?.recentStudents?.length ?? 0 },
                  { label: 'Programs live', value: analytics?.totalCourses ?? 0 },
                  { label: 'Student reach', value: analytics?.totalStudents ?? 0 },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">{label}</p>
                    <p className="mt-1 text-xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass-panel rounded-[28px] p-6"
        >
          <p className="text-sm text-brand-500">Operations pulse</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Delivery highlights
          </h3>

          <div className="mt-6 space-y-4">
            {[
              {
                label: 'Engagement status',
                value: 'Healthy growth across active learning tracks',
                icon: BarChart3,
              },
              {
                label: 'Admin workload',
                value: `${analytics?.featuredCourses?.length || 0} featured courses under watch`,
                icon: BriefcaseBusiness,
              },
              {
                label: 'Student momentum',
                value: `${analytics?.recentStudents?.length || 0} recent registrations in the pipeline`,
                icon: Users2,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-3xl border border-white/20 bg-white/50 p-4 dark:border-white/10 dark:bg-slate-900/50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-900 p-3 text-white dark:bg-white dark:text-slate-900">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel mt-4 rounded-[28px] p-6"
      >
        <p className="text-sm text-brand-500">Student roster</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
          Latest registered students
        </h3>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-white/20 dark:border-white/10">
          <div className="grid grid-cols-[1.1fr_1fr_0.6fr] bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
            <span>Name</span>
            <span>Email</span>
            <span>Courses</span>
          </div>

          {analytics?.recentStudents?.length ? (
            analytics.recentStudents.map((student) => (
              <div
                key={student._id}
                className="grid grid-cols-[1.1fr_1fr_0.6fr] items-center border-t border-white/20 bg-white/70 px-4 py-4 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200"
              >
                <span className="flex items-center gap-3">
                  <img src={student.avatar} alt={student.name} className="h-10 w-10 rounded-2xl object-cover" />
                  <span>{student.name}</span>
                </span>
                <span>{student.email}</span>
                <span>{student.enrolledCourses?.length || 0}</span>
              </div>
            ))
          ) : (
            <div className="bg-white/70 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
              No students found yet.
            </div>
          )}
        </div>
      </motion.section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
