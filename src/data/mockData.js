// ===== Users =====
export const users = [
  { id: 'STU001', password: 'student123', role: 'student', name: 'Aarav Sharma', email: 'aarav@university.edu', department: 'Computer Science', avatar: 'AS' },
  { id: 'STU002', password: 'student123', role: 'student', name: 'Priya Patel', email: 'priya@university.edu', department: 'Computer Science', avatar: 'PP' },
  { id: 'STU003', password: 'student123', role: 'student', name: 'Rahul Verma', email: 'rahul@university.edu', department: 'Electronics', avatar: 'RV' },
  { id: 'TEA001', password: 'teacher123', role: 'teacher', name: 'Dr. Meena Iyer', email: 'meena@university.edu', department: 'Computer Science', avatar: 'MI' },
  { id: 'ADM001', password: 'admin123', role: 'admin', name: 'Prof. Rajesh Kumar', email: 'rajesh@university.edu', department: 'Administration', avatar: 'RK' },
  { id: 'SYS001', password: 'sysadmin123', role: 'sysadmin', name: 'Vikram Singh', email: 'vikram@university.edu', department: 'IT Infrastructure', avatar: 'VS' },
];

// ===== Student Academic Records =====
export const studentRecords = {
  STU001: {
    rollNo: 'CS2021001',
    course: 'B.Tech Computer Science',
    currentSemester: 6,
    currentCGPA: 7.8,
    predictedCGPA: 7.5,
    riskLevel: 'Low',
    attendance: 82,
    semesters: [
      { sem: 1, sgpa: 7.2, cgpa: 7.2, attendance: 88, assignments: 78 },
      { sem: 2, sgpa: 7.5, cgpa: 7.35, attendance: 85, assignments: 82 },
      { sem: 3, sgpa: 8.0, cgpa: 7.57, attendance: 80, assignments: 75 },
      { sem: 4, sgpa: 7.9, cgpa: 7.65, attendance: 78, assignments: 80 },
      { sem: 5, sgpa: 8.2, cgpa: 7.76, attendance: 84, assignments: 85 },
      { sem: 6, sgpa: 8.0, cgpa: 7.8, attendance: 82, assignments: 88 },
    ],
    subjects: [
      { name: 'Data Structures', score: 85, grade: 'A', status: 'Strong' },
      { name: 'Operating Systems', score: 72, grade: 'B', status: 'Average' },
      { name: 'Database Systems', score: 88, grade: 'A', status: 'Strong' },
      { name: 'Computer Networks', score: 65, grade: 'C', status: 'Weak' },
      { name: 'Software Engineering', score: 78, grade: 'B+', status: 'Average' },
      { name: 'Machine Learning', score: 90, grade: 'A+', status: 'Strong' },
    ],
    weakAreas: ['Computer Networks', 'Operating Systems'],
    improvementPlan: [
      { subject: 'Computer Networks', topics: ['Subnetting', 'TCP/IP Protocol', 'Network Security'], suggestions: ['Practice subnetting problems daily', 'Watch networking lab videos', 'Complete CCNA online module'] },
      { subject: 'Operating Systems', topics: ['Process Scheduling', 'Memory Management'], suggestions: ['Solve OS numericals from Galvin textbook', 'Implement scheduling algorithms in C', 'Revise deadlock concepts'] },
    ],
    alerts: [
      { type: 'info', message: 'Semester 6 results published', date: '2026-03-20' },
      { type: 'success', message: 'Attendance improved by 4% this month', date: '2026-03-18' },
    ],
  },
  STU002: {
    rollNo: 'CS2021002',
    course: 'B.Tech Computer Science',
    currentSemester: 6,
    currentCGPA: 5.4,
    predictedCGPA: 5.1,
    riskLevel: 'High',
    attendance: 68,
    semesters: [
      { sem: 1, sgpa: 6.0, cgpa: 6.0, attendance: 75, assignments: 65 },
      { sem: 2, sgpa: 5.8, cgpa: 5.9, attendance: 72, assignments: 58 },
      { sem: 3, sgpa: 5.5, cgpa: 5.77, attendance: 70, assignments: 55 },
      { sem: 4, sgpa: 5.2, cgpa: 5.63, attendance: 65, assignments: 50 },
      { sem: 5, sgpa: 5.0, cgpa: 5.5, attendance: 62, assignments: 48 },
      { sem: 6, sgpa: 4.8, cgpa: 5.4, attendance: 68, assignments: 52 },
    ],
    subjects: [
      { name: 'Data Structures', score: 52, grade: 'D', status: 'Weak' },
      { name: 'Operating Systems', score: 48, grade: 'F', status: 'Critical' },
      { name: 'Database Systems', score: 55, grade: 'C', status: 'Weak' },
      { name: 'Computer Networks', score: 45, grade: 'F', status: 'Critical' },
      { name: 'Software Engineering', score: 60, grade: 'C', status: 'Average' },
      { name: 'Machine Learning', score: 50, grade: 'D', status: 'Weak' },
    ],
    weakAreas: ['Operating Systems', 'Computer Networks', 'Data Structures', 'Machine Learning'],
    improvementPlan: [
      { subject: 'Operating Systems', topics: ['Process Scheduling', 'Memory Management', 'File Systems'], suggestions: ['Attend all remaining lectures', 'Form a study group', 'Complete lab assignments'] },
      { subject: 'Computer Networks', topics: ['Subnetting', 'OSI Model', 'Routing'], suggestions: ['Start with basic concepts', 'Use Cisco Packet Tracer for hands-on', 'Attend remedial classes'] },
      { subject: 'Data Structures', topics: ['Trees', 'Graphs', 'Dynamic Programming'], suggestions: ['Practice on LeetCode daily', 'Implement algorithms from scratch', 'Review lecture recordings'] },
      { subject: 'Machine Learning', topics: ['Regression', 'Classification', 'Neural Networks'], suggestions: ['Complete Andrew Ng coursework', 'Practice with scikit-learn', 'Participate in Kaggle competitions'] },
    ],
    alerts: [
      { type: 'danger', message: 'CGPA below 6.0 — Academic probation warning', date: '2026-03-22' },
      { type: 'warning', message: 'Attendance below 75% — Eligibility at risk', date: '2026-03-20' },
      { type: 'danger', message: 'Predicted CGPA for next semester: 5.1', date: '2026-03-19' },
    ],
  },
  STU003: {
    rollNo: 'EC2021003',
    course: 'B.Tech Electronics',
    currentSemester: 6,
    currentCGPA: 4.2,
    predictedCGPA: 3.8,
    riskLevel: 'Critical',
    attendance: 55,
    semesters: [
      { sem: 1, sgpa: 5.5, cgpa: 5.5, attendance: 70, assignments: 55 },
      { sem: 2, sgpa: 5.0, cgpa: 5.25, attendance: 65, assignments: 50 },
      { sem: 3, sgpa: 4.5, cgpa: 5.0, attendance: 60, assignments: 45 },
      { sem: 4, sgpa: 4.0, cgpa: 4.75, attendance: 55, assignments: 40 },
      { sem: 5, sgpa: 3.5, cgpa: 4.5, attendance: 50, assignments: 35 },
      { sem: 6, sgpa: 3.0, cgpa: 4.2, attendance: 55, assignments: 38 },
    ],
    subjects: [
      { name: 'Digital Electronics', score: 38, grade: 'F', status: 'Critical' },
      { name: 'Signal Processing', score: 42, grade: 'F', status: 'Critical' },
      { name: 'Embedded Systems', score: 35, grade: 'F', status: 'Critical' },
      { name: 'VLSI Design', score: 40, grade: 'F', status: 'Critical' },
      { name: 'Communication Systems', score: 48, grade: 'D', status: 'Weak' },
      { name: 'Control Systems', score: 45, grade: 'F', status: 'Critical' },
    ],
    weakAreas: ['Digital Electronics', 'Signal Processing', 'Embedded Systems', 'VLSI Design', 'Control Systems'],
    improvementPlan: [
      { subject: 'Digital Electronics', topics: ['Boolean Algebra', 'Sequential Circuits', 'Logic Design'], suggestions: ['Start from fundamentals', 'Use simulation tools', 'Attend extra tutorials'] },
      { subject: 'Signal Processing', topics: ['Fourier Transform', 'Z-Transform', 'Filters'], suggestions: ['Practice mathematical concepts daily', 'Use MATLAB for visualization', 'Seek faculty help'] },
    ],
    alerts: [
      { type: 'danger', message: 'CRITICAL: Immediate academic intervention required', date: '2026-03-22' },
      { type: 'danger', message: 'Attendance critically low at 55%', date: '2026-03-21' },
      { type: 'danger', message: 'Multiple subject failures — meeting with advisor required', date: '2026-03-20' },
    ],
  },
};

// ===== Class Analytics (for Teacher) =====
export const classAnalytics = {
  className: 'CS-2021 (Batch A)',
  totalStudents: 60,
  averageCGPA: 6.8,
  averageAttendance: 76,
  passPercentage: 78,
  riskDistribution: {
    Low: 25,
    Medium: 18,
    High: 12,
    Critical: 5,
  },
  subjectPerformance: [
    { subject: 'Data Structures', avgScore: 72, passRate: 88, topicTrends: [{ topic: 'Trees', avg: 75 }, { topic: 'Graphs', avg: 68 }, { topic: 'DP', avg: 62 }] },
    { subject: 'Operating Systems', avgScore: 65, passRate: 75, topicTrends: [{ topic: 'Scheduling', avg: 70 }, { topic: 'Memory', avg: 60 }, { topic: 'Files', avg: 65 }] },
    { subject: 'Database Systems', avgScore: 74, passRate: 90, topicTrends: [{ topic: 'SQL', avg: 80 }, { topic: 'Normalization', avg: 72 }, { topic: 'Transactions', avg: 70 }] },
    { subject: 'Computer Networks', avgScore: 60, passRate: 70, topicTrends: [{ topic: 'TCP/IP', avg: 65 }, { topic: 'Routing', avg: 55 }, { topic: 'Security', avg: 58 }] },
    { subject: 'Software Engineering', avgScore: 70, passRate: 85, topicTrends: [{ topic: 'Agile', avg: 78 }, { topic: 'Testing', avg: 68 }, { topic: 'Design', avg: 65 }] },
    { subject: 'Machine Learning', avgScore: 68, passRate: 80, topicTrends: [{ topic: 'Regression', avg: 72 }, { topic: 'Classification', avg: 65 }, { topic: 'Neural Nets', avg: 60 }] },
  ],
  semesterPassPercent: [
    { sem: 'Sem 1', rate: 92 },
    { sem: 'Sem 2', rate: 88 },
    { sem: 'Sem 3', rate: 82 },
    { sem: 'Sem 4', rate: 78 },
    { sem: 'Sem 5', rate: 75 },
    { sem: 'Sem 6', rate: 78 },
  ],
};

// Build student list for teacher view from studentRecords
export const allStudents = Object.entries(studentRecords).map(([id, rec]) => ({
  id,
  name: users.find(u => u.id === id)?.name || 'Unknown',
  rollNo: rec.rollNo,
  course: rec.course,
  cgpa: rec.currentCGPA,
  attendance: rec.attendance,
  riskLevel: rec.riskLevel,
  predictedCGPA: rec.predictedCGPA,
  semester: rec.currentSemester,
}));

// ===== Institution Stats (for Admin) =====
export const institutionStats = {
  totalStudents: 2450,
  totalTeachers: 185,
  totalDepartments: 8,
  averageCGPA: 6.9,
  overallPassRate: 82,
  departments: [
    { name: 'Computer Science', students: 420, avgCGPA: 7.2, passRate: 88, teachers: 32 },
    { name: 'Electronics', students: 380, avgCGPA: 6.5, passRate: 78, teachers: 28 },
    { name: 'Mechanical', students: 350, avgCGPA: 6.8, passRate: 80, teachers: 25 },
    { name: 'Civil', students: 300, avgCGPA: 6.6, passRate: 76, teachers: 22 },
    { name: 'Electrical', students: 280, avgCGPA: 7.0, passRate: 84, teachers: 20 },
    { name: 'Chemical', students: 250, avgCGPA: 6.4, passRate: 74, teachers: 18 },
    { name: 'Information Technology', students: 270, avgCGPA: 7.1, passRate: 86, teachers: 22 },
    { name: 'Biotechnology', students: 200, avgCGPA: 6.7, passRate: 79, teachers: 18 },
  ],
  yearlyTrends: [
    { year: '2022', avgCGPA: 6.5, passRate: 78, enrolled: 2200 },
    { year: '2023', avgCGPA: 6.7, passRate: 80, enrolled: 2300 },
    { year: '2024', avgCGPA: 6.8, passRate: 81, enrolled: 2380 },
    { year: '2025', avgCGPA: 6.9, passRate: 82, enrolled: 2450 },
  ],
  riskOverview: { Low: 1400, Medium: 580, High: 320, Critical: 150 },
};

export const allUsersForAdmin = [
  ...users.map(u => ({ ...u, status: 'Active', lastLogin: '2026-03-24' })),
  { id: 'STU004', role: 'student', name: 'Kavya Nair', email: 'kavya@university.edu', department: 'Mechanical', status: 'Active', lastLogin: '2026-03-23', avatar: 'KN' },
  { id: 'STU005', role: 'student', name: 'Arjun Reddy', email: 'arjun@university.edu', department: 'Electrical', status: 'Inactive', lastLogin: '2026-02-15', avatar: 'AR' },
  { id: 'TEA002', role: 'teacher', name: 'Dr. Sanjay Gupta', email: 'sanjay@university.edu', department: 'Electronics', status: 'Active', lastLogin: '2026-03-24', avatar: 'SG' },
  { id: 'TEA003', role: 'teacher', name: 'Prof. Anita Desai', email: 'anita@university.edu', department: 'Mechanical', status: 'Active', lastLogin: '2026-03-22', avatar: 'AD' },
];

// ===== System Metrics (for SysAdmin) =====
export const systemMetrics = {
  uptime: '99.7%',
  uptimeHours: 718,
  cpuUsage: 42,
  memoryUsage: 61,
  diskUsage: 55,
  activeUsers: 127,
  totalSessions: 1850,
  avgResponseTime: 245,
  requestsPerMinute: 89,
  errorRate: 0.3,
  lastBackup: '2026-03-24 04:00 AM',
  serverVersion: 'v2.4.1',
  databaseSize: '2.8 GB',
  logs: [
    { time: '22:30:15', level: 'INFO', message: 'User STU001 logged in successfully' },
    { time: '22:28:42', level: 'INFO', message: 'Prediction batch job completed (60 students)' },
    { time: '22:25:10', level: 'WARNING', message: 'Memory usage exceeded 60% threshold' },
    { time: '22:20:33', level: 'INFO', message: 'CSV upload processed: 45 records imported' },
    { time: '22:15:08', level: 'ERROR', message: 'Database connection pool timeout (resolved)' },
    { time: '22:10:22', level: 'INFO', message: 'System backup initiated' },
    { time: '22:05:45', level: 'INFO', message: 'Cache cleared: 128 entries removed' },
    { time: '22:00:00', level: 'INFO', message: 'Scheduled health check — all services healthy' },
  ],
};

// ===== Audit Reports (for Admin) =====
export const auditReports = [
  { year: 2025, generated: '2026-01-15', totalStudents: 2380, passRate: 81, avgCGPA: 6.8, atRiskCount: 480, interventions: 120 },
  { year: 2024, generated: '2025-01-12', totalStudents: 2300, passRate: 80, avgCGPA: 6.7, atRiskCount: 460, interventions: 105 },
  { year: 2023, generated: '2024-01-10', totalStudents: 2200, passRate: 78, avgCGPA: 6.5, atRiskCount: 490, interventions: 95 },
  { year: 2022, generated: '2023-01-08', totalStudents: 2100, passRate: 76, avgCGPA: 6.3, atRiskCount: 520, interventions: 80 },
];
