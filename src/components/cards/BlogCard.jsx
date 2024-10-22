import React from 'react';
import { ViewSvg } from '../../assets/svg';
import './blogcard.css';
import blogimg from '../../assets/images/backgroundImgs/blog1.jpg';
import { api_urls } from '../../utils/api-urls';
import moment from 'moment';

const BlogCard = ({ data, onClick }) => {

    return (
        <section
            className="relative flex flex-col bg-white rounded-2xl w-full h-[350px] duration-300"
            onClick={onClick}
        >
            <div className="max-w-sm h-full bg-white rounded-lg overflow-hidden shadow-lg mx-auto my-6">
                {/* Image Section */}
                <div className="relative h-2/5"> {/* Adjust height here as needed */}
                    <img
                        src={api_urls + 'uploads/' + data?.image} // Replace with your image path
                        alt="Blog"
                        className="w-full h-full object-cover" // Make sure the image covers the full height of the container
                    />
                    {/* Date Badge */}
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                        {moment(data?.createdAt).format('DD MMM YYYY')}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 h-3/5 overflow-hidden"> {/* Adjust height here as needed */}
                    {/* Author and Comments */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                            <span className="mr-1">👤</span>
                            By - {data?.created_by}
                        </div>
                        {/* <div className="flex items-center">
                            <span className="mr-1">💬</span>
                            0 comments
                        </div> */}
                    </div>

                    {/* Title */}
                    <h3 className=" line-clamp-2 text-lg font-semibold mb-2 text-center text-orange-600">
                        {data?.title}
                    </h3>

                    {/* Description */}
                    <p dangerouslySetInnerHTML={{__html:data?.description}} className="text-gray-700 text-sm text-center line-clamp-2"></p>
                </div>
            </div>
        </section>


    );
}

export default BlogCard;