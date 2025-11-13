const mysql = require("mysql2");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "wazi_db",
});

// Connect to database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Seed data
const seedData = async () => {
  try {
    // Create tables
    await connection.promise().execute(`
      CREATE TABLE IF NOT EXISTS fiscal_savings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        county VARCHAR(50),
        year INT,
        savings_amount DECIMAL(15,2),
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.promise().execute(`
      CREATE TABLE IF NOT EXISTS ghost_workers_eliminated (
        id INT AUTO_INCREMENT PRIMARY KEY,
        county VARCHAR(50),
        year INT,
        workers_eliminated INT,
        savings_amount DECIMAL(15,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.promise().execute(`
      CREATE TABLE IF NOT EXISTS procurement_fraud_detected (
        id INT AUTO_INCREMENT PRIMARY KEY,
        county VARCHAR(50),
        year INT,
        contracts_flagged INT,
        estimated_savings DECIMAL(15,2),
        status ENUM('pending', 'investigated', 'resolved') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.promise().execute(`
      CREATE TABLE IF NOT EXISTS user_engagement (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        organization VARCHAR(100),
        category ENUM('citizen', 'government', 'partner', 'media', 'other'),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.promise().execute(`
      CREATE TABLE IF NOT EXISTS fiscal_metrics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        metric_name VARCHAR(100),
        value DECIMAL(15,2),
        unit VARCHAR(20),
        description TEXT,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log("Tables created successfully");

    // Insert fiscal savings data
    await connection.promise().execute(`
      INSERT INTO fiscal_savings (county, year, savings_amount, category) VALUES
      ('Nairobi', 2023, 250000000.00, 'Ghost Workers'),
      ('Nairobi', 2023, 180000000.00, 'Procurement Fraud'),
      ('Nairobi', 2023, 95000000.00, 'Revenue Leakage'),
      ('Kiambu', 2023, 85000000.00, 'Ghost Workers'),
      ('Kiambu', 2023, 62000000.00, 'Procurement Fraud'),
      ('Nakuru', 2023, 120000000.00, 'Ghost Workers'),
      ('Nakuru', 2023, 78000000.00, 'Revenue Leakage'),
      ('Mombasa', 2023, 95000000.00, 'Procurement Fraud'),
      ('Kisumu', 2023, 68000000.00, 'Ghost Workers')
    `);

    // Insert ghost workers data
    await connection.promise().execute(`
      INSERT INTO ghost_workers_eliminated (county, year, workers_eliminated, savings_amount) VALUES
      ('Nairobi', 2023, 1250, 250000000.00),
      ('Kiambu', 2023, 425, 85000000.00),
      ('Nakuru', 2023, 600, 120000000.00),
      ('Kisumu', 2023, 340, 68000000.00),
      ('Uasin Gishu', 2023, 280, 56000000.00),
      ('Machakos', 2023, 195, 39000000.00),
      ('Nyeri', 2023, 165, 33000000.00)
    `);

    // Insert procurement fraud data
    await connection.promise().execute(`
      INSERT INTO procurement_fraud_detected (county, year, contracts_flagged, estimated_savings, status) VALUES
      ('Nairobi', 2023, 45, 180000000.00, 'investigated'),
      ('Mombasa', 2023, 28, 95000000.00, 'resolved'),
      ('Kiambu', 2023, 18, 62000000.00, 'pending'),
      ('Nakuru', 2023, 32, 110000000.00, 'investigated'),
      ('Kisumu', 2023, 15, 45000000.00, 'pending'),
      ('Eldoret', 2023, 22, 78000000.00, 'resolved')
    `);

    // Insert user engagement data
    await connection.promise().execute(`
      INSERT INTO user_engagement (name, email, organization, category, message) VALUES
      ('Dr. Sarah Kimani', 'sarah.kimani@kiprep.or.ke', 'Kenya Institute for Public Policy Research', 'government', 'Interested in implementing AI oversight in our county procurement processes.'),
      ('James Odhiambo', 'james.odhiambo@transparency.or.ke', 'Transparency International Kenya', 'partner', 'We would like to collaborate on anti-corruption initiatives using your AI platform.'),
      ('Grace Mwangi', 'grace.mwangi@techkenya.org', 'Tech Kenya Initiative', 'partner', 'Excited about the potential for AI in public financial management. Let\'s discuss partnership opportunities.'),
      ('Michael Kiprop', 'michael.kiprop@gmail.com', 'Concerned Citizen', 'citizen', 'As a taxpayer, I\'m very interested in how this technology can help reduce waste in government spending.'),
      ('Dr. David Njoroge', 'david.njoroge@nairobi.go.ke', 'Nairobi County Government', 'government', 'We\'re looking to pilot your AI integrity system in our payroll and procurement departments.')
    `);

    // Insert fiscal metrics
    await connection.promise().execute(`
      INSERT INTO fiscal_metrics (metric_name, value, unit, description) VALUES
      ('Total Savings Pilot Phase', 10000000.00, 'KES', 'Savings achieved during pilot implementation across 3 counties'),
      ('Ghost Worker Detection Accuracy', 95.00, '%', 'Accuracy rate in identifying phantom employees'),
      ('Audit Process Speed Improvement', 40.00, '%', 'Reduction in time required for comprehensive audits'),
      ('National Projected Annual Savings', 150000000000.00, 'KES', 'Estimated savings if scaled across all 47 counties'),
      ('Counties Ready for Deployment', 47.00, 'counties', 'Number of counties prepared for AI implementation'),
      ('Transparency Accountability Score', 100.00, '%', 'Level of transparency and accountability achieved')
    `);

    // Create indexes
    await connection
      .promise()
      .execute(
        `CREATE INDEX idx_fiscal_savings_county_year ON fiscal_savings(county, year)`
      );
    await connection
      .promise()
      .execute(
        `CREATE INDEX idx_ghost_workers_county_year ON ghost_workers_eliminated(county, year)`
      );
    await connection
      .promise()
      .execute(
        `CREATE INDEX idx_procurement_county_year ON procurement_fraud_detected(county, year)`
      );
    await connection
      .promise()
      .execute(
        `CREATE INDEX idx_user_engagement_category ON user_engagement(category)`
      );
    await connection
      .promise()
      .execute(
        `CREATE INDEX idx_fiscal_metrics_name ON fiscal_metrics(metric_name)`
      );

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    connection.end();
  }
};

seedData();
