import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Sparkles, Users2 } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const initialCourseForm = {
  title: '',
  description: '',
  instructor: '',
  duration: '',
  category: '',
  level: '',
  image: '',
  lessons: '',
  seats: '',
  rating: '',
};

const CoursesPage = () => {
  const { user, refreshProfile } = useAuth();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState(initialCourseForm);
  const [assignment, setAssignment] = useState({ userId: '', courseId: '' });

  const isAdmin = user?.role === 'admin';

  const fetchCourses = async () => {
    const { data } = await api.get('/courses');
    setCourses(data);
    return data;
  };

  const fetchStudents = async () => {
    if (!isAdmin) return;
    const { data } = await api.get('/users/students');
    setStudents(data);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchCourses(), fetchStudents()]);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAdmin]);

  const filteredCourses = useMemo(() => {
    const term = search.toLowerCase();
    return courses.filter((course) =>
      [course.title, course.description, course.instructor, course.duration, course.category, course.level]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [courses, search]);

  const enrolledCourseIds = useMemo(
    () => new Set((user?.enrolledCourses || []).map((course) => course._id || course)),
    [user]
  );

  const handleEnroll = async (courseId) => {
    setActionLoading(true);
    try {
      await api.post('/users/enroll', { courseId });
      await refreshProfile();
      toast.success('Course enrolled successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const resetForm = () => {
    setEditingCourse(null);
    setCourseForm(initialCourseForm);
  };

  const handleCourseSubmit = async (event) => {
    event.preventDefault();
    setActionLoading(true);

    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse._id}`, courseForm);
        toast.success('Course updated successfully.');
      } else {
        await api.post('/courses', courseForm);
        toast.success('Course created successfully.');
      }

      await fetchCourses();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save course.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    setActionLoading(true);
    try {
      await api.delete(`/courses/${courseId}`);
      await fetchCourses();
      toast.success('Course deleted successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete course.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      category: course.category || '',
      level: course.level || '',
      image: course.image || '',
      lessons: String(course.lessons || ''),
      seats: String(course.seats || ''),
      rating: String(course.rating || ''),
    });
  };

  const handleAssignCourse = async (event) => {
    event.preventDefault();
    setActionLoading(true);

    try {
      await api.post('/users/assign-course', assignment);
      await fetchStudents();
      toast.success('Course assigned successfully.');
      setAssignment({ userId: '', courseId: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to assign course.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Courses" description="Loading course catalog...">
        <div className="glass-panel rounded-[28px]">
          <Loader label="Fetching courses..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Courses"
      description={
        isAdmin
          ? 'Create, edit, delete, and assign courses from one streamlined workspace.'
          : 'Discover and enroll in the courses available in your portal.'
      }
    >
      <div className="glass-panel rounded-[28px] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-brand-500">Course catalog</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Browse and manage learning tracks
            </h3>
          </div>
          <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-white/20 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-slate-900/60">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, instructor, or duration"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <SlidersHorizontal size={18} className="text-brand-500" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="glass-panel rounded-[28px] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-900 p-3 text-white dark:bg-white dark:text-slate-900">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Courses available</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">{courses.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-[28px] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-500 p-3 text-white">
              <Users2 size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {isAdmin ? 'Students available' : 'Your enrollments'}
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                {isAdmin ? students.length : enrolledCourseIds.size}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-[28px] p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Search status</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            {filteredCourses.length} matches
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Refine by title, instructor, category, duration, or level.
          </p>
        </div>
      </div>

      {isAdmin ? (
        <div className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="glass-panel rounded-[28px] p-6">
            <p className="text-sm text-brand-500">Admin tools</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {editingCourse ? 'Edit course' : 'Create a new course'}
            </h3>

            <form onSubmit={handleCourseSubmit} className="mt-5 space-y-4">
              {[
                ['title', 'Course title'],
                ['description', 'Description'],
                ['instructor', 'Instructor'],
                ['duration', 'Duration'],
                ['category', 'Category'],
                ['level', 'Level'],
                ['image', 'Image URL'],
                ['lessons', 'Lessons'],
                ['seats', 'Seats'],
                ['rating', 'Rating'],
              ].map(([field, label]) => (
                <label key={field} className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    {label}
                  </span>
                  {field === 'description' ? (
                    <textarea
                      rows="4"
                      value={courseForm[field]}
                      onChange={(event) =>
                        setCourseForm((current) => ({ ...current, [field]: event.target.value }))
                      }
                      className="input-field resize-none"
                      required
                    />
                  ) : (
                    <input
                      type={['lessons', 'seats', 'rating'].includes(field) ? 'number' : 'text'}
                      value={courseForm[field]}
                      onChange={(event) =>
                        setCourseForm((current) => ({ ...current, [field]: event.target.value }))
                      }
                      className="input-field"
                      required={['title', 'instructor', 'duration', 'description'].includes(field)}
                      step={field === 'rating' ? '0.1' : undefined}
                    />
                  )}
                </label>
              ))}

              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={actionLoading} className="primary-btn">
                  {editingCourse ? 'Save changes' : 'Add course'}
                </button>
                <button type="button" onClick={resetForm} className="secondary-btn">
                  Clear
                </button>
              </div>
            </form>

            <div className="mt-8">
              <p className="text-sm text-brand-500">Assign course</p>
              <h4 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                Map a course to a student
              </h4>
              <form onSubmit={handleAssignCourse} className="mt-4 space-y-4">
                <select
                  value={assignment.userId}
                  onChange={(event) =>
                    setAssignment((current) => ({ ...current, userId: event.target.value }))
                  }
                  className="input-field"
                  required
                >
                  <option value="">Select student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name} ({student.email})
                    </option>
                  ))}
                </select>

                <select
                  value={assignment.courseId}
                  onChange={(event) =>
                    setAssignment((current) => ({ ...current, courseId: event.target.value }))
                  }
                  className="input-field"
                  required
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>

                <button type="submit" disabled={actionLoading} className="primary-btn w-full">
                  Assign to student
                </button>
              </form>

              <div className="mt-6 space-y-3">
                {students.slice(0, 3).map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center gap-3 rounded-3xl border border-white/20 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-900/50"
                  >
                    <img src={student.avatar} alt={student.name} className="h-12 w-12 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{student.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {student.enrolledCourses?.length || 0} assigned courses
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {filteredCourses.length ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  isAdmin
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  actionLoading={actionLoading}
                />
              ))
            ) : (
              <div className="glass-panel col-span-full rounded-[28px] p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No courses match your search.
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.length ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isEnrolled={enrolledCourseIds.has(course._id)}
                onEnroll={handleEnroll}
                actionLoading={actionLoading}
              />
            ))
          ) : (
            <div className="glass-panel col-span-full rounded-[28px] p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No courses found for that search.
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CoursesPage;
