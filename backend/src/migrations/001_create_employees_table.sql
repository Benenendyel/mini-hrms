CREATE TABLE employees (
    employee_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact_number VARCHAR(20),
    position VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    date_hired DATE NOT NULL DEFAULT CURRENT_DATE,
    employment_status VARCHAR(50) NOT NULL DEFAULT 'Active'
);
