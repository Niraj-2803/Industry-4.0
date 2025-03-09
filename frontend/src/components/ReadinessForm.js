import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const ReadinessForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [employees, setEmployees] = useState('');
    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/readiness-score', {
            state: {
                companyName: companyName,
                employees: employees,
                locationName: location,
                industryType: industry,
            },
        });
        window.scrollTo(0, 0);
    };
    

    return (
        <div id="readinessform" className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Left image */}
            <div className="md:w-1/2 w-full flex justify-center md:justify-start mt-6 mb-6 md:mt-14 md:mb-14 md:ml-16">
                <img 
                    src="/form-image.png" 
                    alt="description" 
                    className="w-3/4 md:w-full h-auto rounded-md"
                />
            </div>

            {/* Right form */}
            <div className="md:w-1/2 w-full flex justify-center items-center mt-6 mb-6 md:mt-14 md:mb-14 px-4">
                <form 
                    onSubmit={handleSubmit}
                    className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg w-full md:w-3/4 max-w-lg space-y-3"
                >
                    {/* Form content */}
                    <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800">
                        Enter Company Details
                    </h2>
                    <div>
                        <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border rounded-md"
                            placeholder="Enter your company name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="employees" className="block text-gray-700">Total Number of Employees</label>
                        <input
                            type="number"
                            id="employees"
                            value={employees}
                            onChange={(e) => setEmployees(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border rounded-md"
                            placeholder="Enter total number of employees"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-gray-700">Location of Company</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border rounded-md"
                            placeholder="Enter company location"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="industry" className="block text-gray-700">Industry Type</label>
                        <select
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="mt-2 w-full px-4 py-2 border rounded-md"
                            required
                        >
                            <option value="">Select Industry Type</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition"
                        >
                            Take Readiness Assessment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReadinessForm;
