CREATE TABLE salaries (
    id SERIAL PRIMARY KEY,
    employee_id INT UNIQUE REFERENCES employees(employee_id) ON DELETE CASCADE,
    basic_salary NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    allowance NUMERIC(10, 2) DEFAULT 0.00,
    deductions NUMERIC(10, 2) DEFAULT 0.00,
    net_salary NUMERIC(10, 2) DEFAULT 0.00
);
