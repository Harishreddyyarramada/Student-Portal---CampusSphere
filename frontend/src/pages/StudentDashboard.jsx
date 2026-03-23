import { Award, BookMarked, Clock3, GraduationCap, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const enrolledCourses = user?.enrolledCourses || [];
  const featuredCourse = enrolledCourses[0];

  return (
    <DashboardLayout
      title="Student Dashboard"
      description="Track your enrolled courses, learning pace, and overall progress."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={GraduationCap} label="Enrolled Courses" value={enrolledCourses.length} />
        <StatCard
          icon={TrendingUp}
          label="Completion Rate"
          value={`${user?.completionRate || 0}%`}
          accent="from-emerald-500 to-teal-400"
        />
        <StatCard
          icon={Clock3}
          label="Learning Hours"
          value={`${user?.learningHours || 0}h`}
          accent="from-amber-500 to-orange-400"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel overflow-hidden rounded-[28px]"
        >
          <div className="relative h-72">
            <img
              src={featuredCourse?.image || user?.avatar}
              alt={featuredCourse?.title || user?.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
            <div className="absolute inset-0 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Learning Spotlight</p>
              <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-tight">
                {featuredCourse?.title || 'Build your learning path with premium demo content.'}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/75">
                {featuredCourse?.description ||
                  'Your dashboard stays fully interactive with seeded courses, real enrollments, and profile progress tracked in code.'}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  featuredCourse?.category || user?.department,
                  featuredCourse?.duration || `${user?.attendance || 0}% attendance`,
                  `${enrolledCourses.length} active enrollments`,
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur"
                  >
                    {item}
                  </span>
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
          <p className="text-sm text-brand-500">Performance</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Student snapshot
          </h3>

          <div className="mt-6 space-y-4">
            {[
              { label: 'Attendance', value: `${user?.attendance || 0}%`, icon: Sparkles },
              { label: 'Department', value: user?.department, icon: BookMarked },
              { label: 'Role', value: user?.role?.toUpperCase() || 'STUDENT', icon: Award },
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
                    <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-[28px] p-6"
        >
          <p className="text-sm text-brand-500">Your courses</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Enrolled learning tracks
          </h3>

          <div className="mt-5 space-y-4">
            {enrolledCourses.length ? (
              enrolledCourses.map((course, index) => (
                <div
                  key={course._id}
                  className="rounded-3xl border border-white/30 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-900/50"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Module {index + 1}
                      </p>
                      <h4 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                        {course.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Instructor: {course.instructor}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300">
                      {course.duration}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {course.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                  No courses enrolled yet
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Visit the courses page to start building your learning plan.
                </p>
              </div>
            )}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass-panel rounded-[28px] p-6"
        >
          <p className="text-sm text-brand-500">Profile highlights</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Your identity at a glance
          </h3>

          <div className="mt-6 flex items-center gap-4 rounded-[28px] bg-slate-900 p-4 text-white dark:bg-slate-950">
            <img src={user?.avatar} alt={user?.name} className="h-20 w-20 rounded-[24px] object-cover" />
            <div>
              <p className="text-2xl font-semibold">{user?.name}</p>
              <p className="mt-1 text-sm text-white/70">{user?.title}</p>
              <p className="mt-2 text-sm text-brand-200">{user?.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              ['Location', user?.location],
              ['Department', user?.department],
              ['Total enrollments', String(enrolledCourses.length)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/20 bg-white/50 p-4 dark:border-white/10 dark:bg-slate-900/50"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
