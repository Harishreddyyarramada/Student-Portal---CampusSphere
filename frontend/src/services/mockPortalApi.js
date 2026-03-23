const STORAGE_KEY = 'student-portal-demo-db';
const TOKEN_PREFIX = 'demo-token';
const DEFAULT_DELAY = 180;

const heroImages = {
  analytics:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  cybersecurity:
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
  design:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  ai: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  cloud:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  management:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
};

const seedCourses = [
  {
    _id: 'course-ux-101',
    title: 'Product Design Studio',
    description:
      'Master user journeys, interface systems, and rapid prototyping for modern digital products.',
    instructor: 'Ariana Flores',
    duration: '8 weeks',
    category: 'Design',
    level: 'Intermediate',
    lessons: 28,
    seats: 48,
    rating: 4.9,
    image: heroImages.design,
    accent: 'from-rose-500 via-orange-400 to-amber-300',
    createdAt: '2026-03-22T08:00:00.000Z',
  },
  {
    _id: 'course-ai-205',
    title: 'Applied AI Foundations',
    description:
      'Build practical AI workflows, understand model evaluation, and launch responsible automation projects.',
    instructor: 'Dr. Ethan Park',
    duration: '10 weeks',
    category: 'Artificial Intelligence',
    level: 'Advanced',
    lessons: 36,
    seats: 42,
    rating: 4.8,
    image: heroImages.ai,
    accent: 'from-violet-500 via-indigo-500 to-sky-400',
    createdAt: '2026-03-21T08:00:00.000Z',
  },
  {
    _id: 'course-cloud-120',
    title: 'Cloud Operations Lab',
    description:
      'Deploy resilient services, monitor workloads, and design secure cloud infrastructure at scale.',
    instructor: 'Mason Reid',
    duration: '6 weeks',
    category: 'Infrastructure',
    level: 'Beginner',
    lessons: 22,
    seats: 60,
    rating: 4.7,
    image: heroImages.cloud,
    accent: 'from-cyan-500 via-sky-500 to-blue-500',
    createdAt: '2026-03-20T08:00:00.000Z',
  },
  {
    _id: 'course-data-330',
    title: 'Business Intelligence & Analytics',
    description:
      'Turn raw data into dashboards, forecasts, and decision-ready reports for executive teams.',
    instructor: 'Sophia Morgan',
    duration: '9 weeks',
    category: 'Analytics',
    level: 'Intermediate',
    lessons: 31,
    seats: 35,
    rating: 4.9,
    image: heroImages.analytics,
    accent: 'from-emerald-500 via-teal-400 to-cyan-300',
    createdAt: '2026-03-19T08:00:00.000Z',
  },
  {
    _id: 'course-cyber-410',
    title: 'Cyber Defense Command',
    description:
      'Learn threat hunting, access control, and incident response for enterprise-grade security operations.',
    instructor: 'Nadia Khan',
    duration: '12 weeks',
    category: 'Security',
    level: 'Advanced',
    lessons: 40,
    seats: 24,
    rating: 5,
    image: heroImages.cybersecurity,
    accent: 'from-slate-900 via-slate-700 to-slate-500',
    createdAt: '2026-03-18T08:00:00.000Z',
  },
  {
    _id: 'course-mgmt-210',
    title: 'Academic Project Leadership',
    description:
      'Coordinate teams, timelines, and budgets while delivering polished capstone and department projects.',
    instructor: 'Olivia Bennett',
    duration: '5 weeks',
    category: 'Leadership',
    level: 'Beginner',
    lessons: 18,
    seats: 54,
    rating: 4.6,
    image: heroImages.management,
    accent: 'from-amber-500 via-yellow-400 to-lime-300',
    createdAt: '2026-03-17T08:00:00.000Z',
  },
];

const seedUsers = [
  {
    _id: 'user-admin-demo',
    name: 'Dr. Maya Bennett',
    email: 'admin@demoportal.com',
    password: 'Admin@123',
    role: 'admin',
    enrolledCourses: ['course-data-330', 'course-mgmt-210'],
    createdAt: '2026-03-18T08:00:00.000Z',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    department: 'Academic Operations',
    title: 'Director of Digital Learning',
    phone: '+91 98765 43210',
    location: 'Innovation Tower, Level 6',
    bio: 'Leads student experience, faculty enablement, and campus-wide digital transformation.',
  },
  {
    _id: 'user-student-demo',
    name: 'Aarav Sharma',
    email: 'student@demoportal.com',
    password: 'Student@123',
    role: 'student',
    enrolledCourses: ['course-ux-101', 'course-ai-205', 'course-data-330'],
    createdAt: '2026-03-21T09:30:00.000Z',
    avatar:
      'https://media.istockphoto.com/id/2105091005/photo/young-student-taking-notes-while-e-learning-on-laptop-at-the-university.jpg?s=612x612&w=0&k=20&c=5AoTWNFmHm-HeQfx0FzB3LPm3MKQXgokYelEvmC_47E=',
    department: 'Computer Science',
    title: 'Final Year Student',
    phone: '+91 99887 66554',
    location: 'Residence Hall A',
    bio: 'Focused on AI products, analytics, and design-led problem solving across campus projects.',
  },
  {
    _id: 'user-student-demo-2',
    name: 'Riya Patel',
    email: 'riya.patel@demoportal.com',
    password: 'Student@123',
    role: 'student',
    enrolledCourses: ['course-cloud-120', 'course-cyber-410'],
    createdAt: '2026-03-20T10:15:00.000Z',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    department: 'Information Technology',
    title: 'Third Year Student',
    phone: '+91 98111 22334',
    location: 'Tech Block',
    bio: 'Interested in infrastructure reliability, security operations, and applied cloud engineering.',
  },
  {
    _id: 'user-student-demo-3',
    name: 'Kabir Mehta',
    email: 'kabir.mehta@demoportal.com',
    password: 'Student@123',
    role: 'student',
    enrolledCourses: ['course-mgmt-210', 'course-data-330', 'course-ux-101'],
    createdAt: '2026-03-19T12:45:00.000Z',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    department: 'Business Administration',
    title: 'Campus Venture Fellow',
    phone: '+91 99000 11223',
    location: 'Enterprise Lab',
    bio: 'Brings business strategy, analytics, and student venture operations together.',
  },
];

const demoAccounts = {
  student: {
    email: 'student@demoportal.com',
    password: 'Student@123',
  },
  admin: {
    email: 'admin@demoportal.com',
    password: 'Admin@123',
  },
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const createError = (status, message) => {
  const error = new Error(message);
  error.response = { status, data: { message } };
  return error;
};

const delay = (value, ms = DEFAULT_DELAY) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(value), ms);
  });

const readDb = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

const writeDb = (db) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  return db;
};

const createStudentProfile = (user, courseCount = 0) => ({
  department: user.department || 'Student Success',
  title: user.title || 'New Student',
  phone: user.phone || '+91 90000 00000',
  location: user.location || 'Main Campus',
  bio:
    user.bio ||
    'Building a focused course plan and exploring new opportunities through the campus portal.',
  learningHours: 14 + courseCount * 3,
  attendance: Math.min(98, 80 + courseCount * 4),
  completionRate: Math.min(96, 52 + courseCount * 12),
});

const createAdminProfile = (user, courseCount = 0, studentCount = 0) => ({
  department: user.department || 'Administration',
  title: user.title || 'Portal Administrator',
  phone: user.phone || '+91 91111 22222',
  location: user.location || 'Admin Block',
  bio:
    user.bio ||
    'Oversees academic delivery, reporting, and operational quality across the portal.',
  managedPrograms: Math.max(courseCount, 3),
  activeStudents: studentCount,
  satisfaction: 96,
});

const ensureDb = () => {
  const existingDb = readDb();

  if (existingDb) {
    return existingDb;
  }

  return writeDb({
    users: seedUsers,
    courses: seedCourses,
  });
};

const populateCourse = (course) => clone(course);

const populateUser = (user, db) => {
  const courseList = user.enrolledCourses
    .map((courseId) => db.courses.find((course) => course._id === courseId))
    .filter(Boolean)
    .map(populateCourse);

  const baseProfile =
    user.role === 'admin'
      ? createAdminProfile(
          user,
          db.courses.length,
          db.users.filter((entry) => entry.role === 'student').length
        )
      : createStudentProfile(user, courseList.length);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    avatar: user.avatar,
    enrolledCourses: courseList,
    ...baseProfile,
  };
};

const generateToken = (userId) => `${TOKEN_PREFIX}-${userId}`;

const getUserIdFromToken = (token) => {
  if (!token?.startsWith(`${TOKEN_PREFIX}-`)) {
    return null;
  }

  return token.replace(`${TOKEN_PREFIX}-`, '');
};

const getCurrentUser = (token, db) => {
  const userId = getUserIdFromToken(token);
  if (!userId) {
    throw createError(401, 'Invalid or expired session.');
  }

  const user = db.users.find((entry) => entry._id === userId);
  if (!user) {
    throw createError(404, 'User not found.');
  }

  return user;
};

const sortByDateDesc = (items) =>
  [...items].sort(
    (left, right) =>
      new Date(right.createdAt || '1970-01-01T00:00:00.000Z') -
      new Date(left.createdAt || '1970-01-01T00:00:00.000Z')
  );

const withAuth = (handler) => async (token, payload) => {
  const db = ensureDb();
  const user = getCurrentUser(token, db);
  return handler({ db, user, payload });
};

const demoApi = {
  isDemoToken: (token) => token?.startsWith(`${TOKEN_PREFIX}-`) || false,
  isEnabled: () => import.meta.env.VITE_USE_DEMO_MODE !== 'false',
  getDemoAccounts: () => clone(demoAccounts),
  resetDemoData: () => writeDb({ users: seedUsers, courses: seedCourses }),
  login: async ({ email, password }) => {
    const db = ensureDb();

    if (!email || !password) {
      throw createError(400, 'Email and password are required.');
    }

    const user = db.users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      throw createError(401, 'Invalid email or password.');
    }

    return delay({
      data: {
        message: 'Login successful.',
        token: generateToken(user._id),
        user: populateUser(user, db),
      },
    });
  },
  register: async ({ name, email, password, role }) => {
    const db = ensureDb();

    if (!name || !email || !password) {
      throw createError(400, 'Name, email, and password are required.');
    }

    const existingUser = db.users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      throw createError(400, 'Email is already registered.');
    }

    const user = {
      _id: `user-${crypto.randomUUID()}`,
      name,
      email,
      password,
      role: role === 'admin' ? 'admin' : 'student',
      enrolledCourses: role === 'admin' ? ['course-mgmt-210'] : ['course-cloud-120'],
      createdAt: new Date().toISOString(),
      avatar:
        role === 'admin'
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      department: role === 'admin' ? 'Academic Operations' : 'Emerging Technology',
      title: role === 'admin' ? 'Assistant Program Lead' : 'New Portal Member',
      phone: '+91 90000 12345',
      location: role === 'admin' ? 'Admin Annex' : 'Student Commons',
      bio:
        role === 'admin'
          ? 'Coordinates student programs, course quality, and onboarding experiences.'
          : 'Joined the portal to explore high-impact learning tracks and campus opportunities.',
    };

    db.users.push(user);
    writeDb(db);

    return delay({
      data: {
        message: 'Registration successful.',
        token: generateToken(user._id),
        user: populateUser(user, db),
      },
    });
  },
  getProfile: withAuth(async ({ db, user }) => delay({ data: populateUser(user, db) })),
  updateProfile: withAuth(async ({ db, user, payload }) => {
    const nextEmail = payload.email?.trim();

    if (nextEmail) {
      const existingUser = db.users.find(
        (entry) => entry.email.toLowerCase() === nextEmail.toLowerCase() && entry._id !== user._id
      );

      if (existingUser) {
        throw createError(400, 'Email is already registered.');
      }
    }

    user.name = payload.name?.trim() || user.name;
    user.email = nextEmail || user.email;
    user.password = payload.password?.trim() || user.password;
    writeDb(db);

    return delay({
      data: {
        message: 'Profile updated successfully.',
        user: populateUser(user, db),
      },
    });
  }),
  getCourses: async () => {
    const db = ensureDb();
    const courses = sortByDateDesc(
      db.courses.map((course) => ({
        ...course,
        enrolledCount: db.users.filter((user) => user.enrolledCourses.includes(course._id)).length,
      }))
    );

    return delay({ data: courses.map(populateCourse) });
  },
  createCourse: withAuth(async ({ db, user, payload }) => {
    if (user.role !== 'admin') {
      throw createError(403, 'Admin access required.');
    }

    const requiredFields = ['title', 'description', 'instructor', 'duration'];
    const missingField = requiredFields.find((field) => !payload[field]?.trim());

    if (missingField) {
      throw createError(400, 'All course fields are required.');
    }

    const course = {
      _id: `course-${crypto.randomUUID()}`,
      title: payload.title.trim(),
      description: payload.description.trim(),
      instructor: payload.instructor.trim(),
      duration: payload.duration.trim(),
      category: payload.category?.trim() || 'Special Program',
      level: payload.level?.trim() || 'Intermediate',
      lessons: Number(payload.lessons) || 24,
      seats: Number(payload.seats) || 40,
      rating: Number(payload.rating) || 4.8,
      image: payload.image?.trim() || heroImages.analytics,
      accent: payload.accent?.trim() || 'from-brand-500 via-sky-500 to-cyan-300',
      createdAt: new Date().toISOString(),
    };

    db.courses.unshift(course);
    writeDb(db);

    return delay({
      data: {
        message: 'Course created successfully.',
        course: populateCourse(course),
      },
    });
  }),
  updateCourse: withAuth(async ({ db, user, payload }) => {
    if (user.role !== 'admin') {
      throw createError(403, 'Admin access required.');
    }

    const course = db.courses.find((entry) => entry._id === payload.id);
    if (!course) {
      throw createError(404, 'Course not found.');
    }

    ['title', 'description', 'instructor', 'duration', 'category', 'level', 'image', 'accent'].forEach(
      (field) => {
        if (payload[field]?.trim()) {
          course[field] = payload[field].trim();
        }
      }
    );

    ['lessons', 'seats', 'rating'].forEach((field) => {
      if (payload[field] !== undefined && payload[field] !== '') {
        course[field] = Number(payload[field]);
      }
    });

    writeDb(db);

    return delay({
      data: {
        message: 'Course updated successfully.',
        course: populateCourse(course),
      },
    });
  }),
  deleteCourse: withAuth(async ({ db, user, payload }) => {
    if (user.role !== 'admin') {
      throw createError(403, 'Admin access required.');
    }

    const courseIndex = db.courses.findIndex((entry) => entry._id === payload.id);
    if (courseIndex === -1) {
      throw createError(404, 'Course not found.');
    }

    db.courses.splice(courseIndex, 1);
    db.users.forEach((entry) => {
      entry.enrolledCourses = entry.enrolledCourses.filter((courseId) => courseId !== payload.id);
    });
    writeDb(db);

    return delay({ data: { message: 'Course deleted successfully.' } });
  }),
  enrollCourse: withAuth(async ({ db, user, payload }) => {
    if (user.role !== 'student') {
      throw createError(403, 'Only students can enroll in courses.');
    }

    if (!payload.courseId) {
      throw createError(400, 'Course ID is required.');
    }

    const course = db.courses.find((entry) => entry._id === payload.courseId);
    if (!course) {
      throw createError(404, 'Course not found.');
    }

    if (user.enrolledCourses.includes(payload.courseId)) {
      throw createError(400, 'You are already enrolled in this course.');
    }

    user.enrolledCourses.push(payload.courseId);
    writeDb(db);

    return delay({
      data: {
        message: 'Course enrolled successfully.',
        user: populateUser(user, db),
      },
    });
  }),
  getStudents: withAuth(async ({ db, user }) => {
    if (user.role !== 'admin') {
      throw createError(403, 'Admin access required.');
    }

    const students = sortByDateDesc(db.users.filter((entry) => entry.role === 'student')).map((entry) =>
      populateUser(entry, db)
    );

    return delay({ data: students });
  }),
  assignCourseToStudent: withAuth(async ({ db, user, payload }) => {
    if (user.role !== 'admin') {
      throw createError(403, 'Admin access required.');
    }

    const student = db.users.find((entry) => entry._id === payload.userId && entry.role === 'student');
    if (!student) {
      throw createError(404, 'Student not found.');
    }

    const course = db.courses.find((entry) => entry._id === payload.courseId);
    if (!course) {
      throw createError(404, 'Course not found.');
    }

    if (student.enrolledCourses.includes(payload.courseId)) {
      throw createError(400, 'Course already assigned to this student.');
    }

    student.enrolledCourses.push(payload.courseId);
    writeDb(db);

    return delay({
      data: {
        message: 'Course assigned successfully.',
        student: populateUser(student, db),
      },
    });
  }),
  getAdminAnalytics: withAuth(async ({ db, user }) => {
    if (user.role !== 'admin') {
      throw createError(403, 'Admin access required.');
    }

    const students = db.users.filter((entry) => entry.role === 'student');
    const recentStudents = sortByDateDesc(students)
      .slice(0, 5)
      .map((entry) => populateUser(entry, db));
    const totalEnrollments = students.reduce((sum, entry) => sum + entry.enrolledCourses.length, 0);

    return delay({
      data: {
        totalStudents: students.length,
        totalCourses: db.courses.length,
        totalEnrollments,
        recentStudents,
        featuredCourses: db.courses.slice(0, 4).map((course) => ({
          ...populateCourse(course),
          enrolledCount: students.filter((entry) => entry.enrolledCourses.includes(course._id)).length,
        })),
      },
    });
  }),
};

export default demoApi;
