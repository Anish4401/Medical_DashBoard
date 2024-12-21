### Assignment Summary  

This assignment focuses on building a web-based **Medicine Management System** with functionality for managing medicines, recording sales, and generating sales reports. It involves implementing APIs for CRUD operations, sales tracking, and analytical reports using **Node.js**, **Express.js**, and a **MongoDB** database.  

#### Key Features  

1. **Medicine Management**:  
   - Add new medicines to the database.  
   - Update medicine details, including GST and discount calculations.  
   - Delete medicines from the database.  
   - View all available medicines.  

2. **Sales Management**:  
   - Record sales for specific medicines with validation for expiry.  
   - Aggregate monthly sales reports with total quantity sold and revenue generated.  
   - Fetch daily sales for a given date.  

3. **API Endpoints**:  
   - Endpoints to handle CRUD operations for medicines.  
   - Endpoints for recording and analyzing sales data.  

4. **Database Queries**:  
   - Used **MongoDB** operations such as `insertOne`, `find`, `updateOne`, `aggregate`, and `deleteOne`.  
   - Aggregation pipelines for generating monthly sales summaries and integrating data from multiple collections (e.g., `sales` and `medicines`).  

5. **Error Handling**:  
   - Comprehensive error handling for invalid requests, missing records, and internal server issues.  

#### Tech Stack  

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Libraries**: Mongoose for database operations  

This assignment demonstrates proficiency in backend development, database integration, and the ability to meet real-world application requirements.

### File Directories:
-In **Controller** :
1) MedicineController
2) SalesController

-In **Model** :
1) MedicineModel
2) SalesModel

-In **Route** Folder-
1)MedicineRoute
2)SalesRoute
