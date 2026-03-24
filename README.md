# 🎓 AI-Based Student Performance Analyser

An AI-powered academic analytics platform that analyzes student academic records, predicts performance using ML models, and generates personalized improvement plans. Built with **React.js + Vite** frontend.

---

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Login Page
Glassmorphism login card with demo credential quick-fill buttons and animated background orbs.

### Student Dashboard
CGPA/SGPA trend chart, circular attendance gauge, risk badge, subject performance cards, and alert banners.

### At-Risk Student Dashboard
Early warning banner for CGPA < 6.0, danger alerts, declining CGPA trend, attendance warnings.

### Prediction Page
Projected CGPA display, risk assessment flags (CGPA threshold, attendance, weak areas), and CGPA trajectory chart.

### Teacher Dashboard
Class-wide risk distribution pie chart, pass percentage trends, subject performance overview.

### Admin Dashboard
Institution-wide statistics, department comparison charts, yearly trends, risk overview cards.

### System Monitor
Live CPU/memory/disk gauges with simulated real-time updates, system logs viewer.

</details>

---

## ✨ Features

### 🧑‍🎓 Student Portal
- **Dashboard** — CGPA trend chart, attendance gauge, risk badge, subject-wise scores
- **Prediction** — Projected CGPA, risk level indicator, early warning banner (CGPA < 6.0)
- **Improvement Plan** — Subject-wise weak topics with actionable suggestions
- **Reports** — Semester report viewer + PDF download (complete & per-semester)

### 👩‍🏫 Teacher / Faculty Portal
- **Dashboard** — Class analytics with risk distribution pie chart, pass % trends
- **Upload** — Drag-drop CSV/Excel file upload with format validation & data preview
- **Analytics** — Risk distribution bar chart, pass % graph, topic-wise performance charts
- **Students** — Sortable, searchable student list with color-coded risk badges

### 🏛️ Administrator Portal
- **Dashboard** — Institution-wide stats, department comparison graphs, yearly trends
- **Audit Reports** — Year selector → generate & export PDF audit reports
- **User Management** — CRUD table with add/edit modals

### 🖥️ System Admin Portal
- **System Monitor** — Real-time CPU, memory, disk gauges (auto-refreshing), system logs

---

## 🔐 Risk Classification Logic

| CGPA ≥ 6.0 | Attendance ≥ 75% | Assignments > 60% | Risk Level | Alert |
|:-----------:|:-----------------:|:------------------:|:----------:|:-----:|
| ✅ | ✅ | ✅ | 🟢 Low | None |
| ✅ | ❌ | ✅ | 🟡 Medium | Attendance warning |
| ❌ | ✅ | ✅ | 🟡 Medium | CGPA warning |
| ❌ | ❌ | ✅ | 🟠 High | Red alert |
| ❌ | ❌ | ❌ | 🔴 Critical | Immediate notification |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React.js 19 |
| **Build Tool** | Vite 6 |
| **Language** | JavaScript (ES6+) |
| **Routing** | React Router v6 (nested routes) |
| **Charts** | Recharts |
| **Icons** | React Icons (Feather) |
| **PDF Export** | jsPDF + jsPDF-AutoTable |
| **File Parsing** | SheetJS (xlsx) |
| **State** | React Context + useState + useEffect |
| **Styling** | Vanilla CSS (custom design system) |

---

## 📁 Project Structure

```
src/
├── components/             # Reusable UI components
│   ├── AttendanceGauge.jsx     # Circular SVG gauge (warning < 75%)
│   ├── CGPALineChart.jsx       # Multi-line area chart (Recharts)
│   ├── DataTable.jsx           # Sortable, searchable, paginated table
│   ├── EarlyWarningBanner.jsx  # Red alert for predicted CGPA < 6.0
│   ├── FileUploadZone.jsx      # Drag-drop CSV/Excel with validation
│   ├── MetricsMonitor.jsx      # Live system gauges (CPU, RAM, disk)
│   ├── ProtectedRoute.jsx      # Role-based route guard
│   ├── RiskBadge.jsx           # Color-coded risk pill (Low/Med/High/Critical)
│   └── StatCard.jsx            # Stat card with icon + trend indicator
├── context/
│   └── AuthContext.jsx         # Auth state (login/logout/localStorage)
├── data/
│   └── mockData.js             # All mock data for 4 roles
├── layouts/
│   └── DashboardLayout.jsx     # Sidebar + content area layout
├── pages/
│   ├── LoginPage.jsx           # Login with demo credentials
│   ├── student/
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentPrediction.jsx
│   │   ├── StudentImprovementPlan.jsx
│   │   └── StudentReports.jsx
│   ├── teacher/
│   │   ├── TeacherDashboard.jsx
│   │   ├── TeacherUpload.jsx
│   │   ├── TeacherAnalytics.jsx
│   │   └── TeacherStudents.jsx
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminAudit.jsx
│   │   └── AdminUsers.jsx
│   └── sysadmin/
│       └── SystemMonitor.jsx
├── App.jsx                 # React Router v6 with nested routes
├── main.jsx                # Entry point
└── index.css               # Design system (CSS variables, dark theme)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/AI-Based-Student-Performance-Analyser.git
cd AI-Based-Student-Performance-Analyser

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build
```

---

## 🔑 Demo Credentials

| Role | University ID | Password |
|------|:------------:|:--------:|
| Student (Low Risk) | `STU001` | `student123` |
| Student (High Risk) | `STU002` | `student123` |
| Student (Critical) | `STU003` | `student123` |
| Teacher | `TEA001` | `teacher123` |
| Admin | `ADM001` | `admin123` |
| System Admin | `SYS001` | `sysadmin123` |

---

## 🗺️ Route Map

| Route | Role | Description |
|-------|------|-------------|
| `/login` | Public | Login page |
| `/student/dashboard` | Student | Performance overview |
| `/student/prediction` | Student | CGPA prediction + risk flags |
| `/student/improvement-plan` | Student | Weak areas + suggestions |
| `/student/reports` | Student | Report viewer + PDF download |
| `/teacher/dashboard` | Teacher | Class analytics |
| `/teacher/upload` | Teacher | CSV/Excel upload |
| `/teacher/analytics` | Teacher | Charts & trends |
| `/teacher/students` | Teacher | Student list with risk badges |
| `/admin/dashboard` | Admin | Institution stats |
| `/admin/audit` | Admin | Audit report export |
| `/admin/users` | Admin | User management |
| `/sysadmin/monitor` | SysAdmin | System metrics & logs |

---

## 🧩 Key Components

| Component | Purpose |
|-----------|---------|
| `RiskBadge` | Color-coded pill — Green (Low), Yellow (Medium), Orange (High), Red (Critical) with pulsing dot for Critical |
| `CGPALineChart` | Multi-line area chart with gradient fills and custom tooltips |
| `AttendanceGauge` | Circular SVG gauge with warning state below 75% |
| `EarlyWarningBanner` | Dismissible red alert when predicted CGPA < 6.0 |
| `FileUploadZone` | Drag-drop with CSV/Excel parsing, validation, and data preview table |
| `DataTable` | Sortable, searchable, paginated table with custom column renderers |
| `MetricsMonitor` | Animated gauge bars with simulated live data (3s refresh) |
| `StatCard` | Reusable metric display with icon, value, label, and trend indicator |

---

## 🎨 Design System

- **Theme**: Dark mode with glassmorphism accents
- **Font**: Inter (Google Fonts)
- **Colors**: Purple primary (`#6c5ce7`), teal secondary (`#00cec9`), risk-coded badges
- **Animations**: Fade-in, slide-in, pulse, hover transforms
- **Responsive**: Mobile-first with collapsible sidebar

---

## 📊 Data Flow (State Architecture)

```
AuthContext (useContext)
  ├── user state (useState + localStorage)
  ├── login() → validate against mockData → setUser → redirect
  └── logout() → clearUser → redirect to /login

Each Page (useState + useEffect)
  ├── Reads from mockData.js (simulates API)
  ├── Local state for UI (filters, sort, pagination, modals)
  └── Components receive data via props
```

---

## 🧪 Test Cases Covered

| # | Scenario | Expected | Status |
|---|----------|----------|:------:|
| 1 | Login with valid ID | Redirect to role dashboard | ✅ |
| 2 | Login with invalid credentials | "User Not Found / Wrong Password" | ✅ |
| 3 | Empty University ID | "University ID is required" | ✅ |
| 4 | Student accessing /admin URL | Redirect to student dashboard | ✅ |
| 5 | File upload with .txt | "Invalid Data Format" error | ✅ |
| 6 | CGPA < 6.0 | Red early warning banner | ✅ |
| 7 | Attendance < 75% | Warning indicator on gauge | ✅ |

---

## 🔮 Future Enhancements

- [ ] Connect to Flask/Node.js backend with real API endpoints
- [ ] Integrate ML prediction model (scikit-learn / TensorFlow)
- [ ] Add real-time WebSocket notifications
- [ ] Implement Selenium end-to-end test suite
- [ ] Add dark/light theme toggle
- [ ] PWA support for mobile access

---

## 📄 License

This project is developed for academic purposes.

---

> Built with ❤️ using React.js + Vite
