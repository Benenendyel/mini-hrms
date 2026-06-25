CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE,
    date DATE,
    time_in TIME,
    time_out TIME,
    status VARCHAR(20)
);
