// Loading.js
import React from 'react';
import '../../assets/css/loader.css';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[500px] max-md:min-h-[300px] bg-gray-100">
            <div className="relative flex space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full animate-snake"></div>
                <div className="w-8 h-8 bg-primary rounded-full animate-snake animation-delay-200"></div>
                <div className="w-8 h-8 bg-primary rounded-full animate-snake animation-delay-400"></div>
            </div>
        </div>
    );
}

export default Loading;