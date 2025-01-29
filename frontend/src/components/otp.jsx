import  { useState, useRef } from 'react';

const OTP = () => {
    const [otp, setOTP] = useState(new Array(4).fill(''));
    const inputsRef = useRef([]);

    const handleChange = (element, index) => {
        const value = element.value;
        if (/[^0-9]/.test(value)) return;
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);
        if (value !== '' && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            const newOTP = [...otp];
            newOTP[index - 1] = '';
            setOTP(newOTP);
            inputsRef.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join('');
        // Handle OTP submission
        console.log('Entered OTP:', enteredOTP);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl mb-4 text-center">Enter OTP</h2>
                <div className="flex space-x-4 mb-6">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            name="otp"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                            className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Verify OTP
                </button>
            </form>
        </div>
    );
};

export default OTP;