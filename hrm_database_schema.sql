-- HRMS Database Schema

-- Departments Table
CREATE TABLE hrm_departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  manager_id UUID, -- References profiles(id)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Designations Table
CREATE TABLE hrm_designations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL UNIQUE,
  department_id UUID REFERENCES hrm_departments(id),
  grade VARCHAR(10), -- e.g., Junior, Senior, Lead
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employees Table (Extensions of basic Profile for HR purposes)
CREATE TABLE hrm_employees (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  employee_code VARCHAR(50) UNIQUE NOT NULL,
  department_id UUID REFERENCES hrm_departments(id),
  designation_id UUID REFERENCES hrm_designations(id),
  joining_date DATE NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(20),
  blood_group VARCHAR(5),
  current_address TEXT,
  permanent_address TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(50),
  bank_name VARCHAR(255),
  account_number VARCHAR(50),
  ifsc_code VARCHAR(20),
  salary_package DECIMAL(12,2),
  status VARCHAR(20) DEFAULT 'Active', -- Active, Terminated, Resigned, On Leave
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance Table
CREATE TABLE hrm_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  check_in TIMESTAMP WITH TIME ZONE,
  check_out TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'Present', -- Present, Absent, Half Day, Late
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- Leaves Table
CREATE TABLE hrm_leaves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  leave_type VARCHAR(50) NOT NULL, -- Sick, Casual, Earned, Unpaid
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'Pending', -- Pending, Approved, Rejected, Cancelled
  approved_by UUID REFERENCES profiles(id),
  approval_date TIMESTAMP WITH TIME ZONE,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payroll Table
CREATE TABLE hrm_payroll (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  basic_salary DECIMAL(12,2),
  allowances DECIMAL(12,2) DEFAULT 0,
  deductions DECIMAL(12,2) DEFAULT 0,
  net_salary DECIMAL(12,2),
  status VARCHAR(20) DEFAULT 'Draft', -- Draft, Processed, Paid
  payment_date DATE,
  payment_method VARCHAR(50),
  payslip_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, month, year)
);

-- RLS Policies
ALTER TABLE hrm_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrm_designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrm_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrm_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrm_leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrm_payroll ENABLE ROW LEVEL SECURITY;

-- Policies for hrm_employees: Employees can see their own, HR/Admin can see all
CREATE POLICY "Employees can view own record" ON hrm_employees
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "HR/Admin can view all records" ON hrm_employees
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND (profiles.role = 'Admin' OR profiles.role = 'HR')
    )
  );

-- Policies for hrm_attendance: Employees can view/insert own, HR/Admin can see/edit all
CREATE POLICY "Employees can manage own attendance" ON hrm_attendance
  FOR ALL USING (auth.uid() = employee_id);

CREATE POLICY "HR/Admin can manage all attendance" ON hrm_attendance
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND (profiles.role = 'Admin' OR profiles.role = 'HR')
    )
  );

-- Indexes for performance
CREATE INDEX idx_hrm_attendance_employee_date ON hrm_attendance(employee_id, date);
CREATE INDEX idx_hrm_leaves_employee ON hrm_leaves(employee_id);
CREATE INDEX idx_hrm_payroll_employee_month_year ON hrm_payroll(employee_id, month, year);
