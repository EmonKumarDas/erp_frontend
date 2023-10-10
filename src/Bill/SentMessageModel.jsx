import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const SentMessage = ({ modelOpen, setModelOpen, phoneNumber }) => {
    const [loading, setLoading] = useState(false)
    const MessageHandle = (e) => {
        e.preventDefault();

        // Get the recipient's phone number
        const to = phoneNumber;

        // Get the message from the comment input
        const message = e.target.comment.value;

        // Set loading state to indicate message sending is in progress
        setLoading(true);

        // Send the message using a POST request to the server
        fetch("https://admin-backend-eight-mu.vercel.app/send-sms", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, body: message }),
        })
            .then(res => res.json())
            .then(result => {
                // Reset loading state and close the message modal
                setLoading(false);
                setModelOpen(false);
                toast("Message sent successfully");
            })
            .catch(error => {
                // Reset loading state
                setLoading(false);
                // Display an error message to the user
                toast("Message could not be sent. Please try again later.");
            });
    };


    return (
        <div>
            {modelOpen ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-boxdark rounded-lg shadow-lg p-6">
                            <form onSubmit={MessageHandle}>
                                <h1>{phoneNumber}</h1>

                                <div>
                                    <label className='mb-3 block text-black dark:text-white'>
                                        Comment
                                    </label>
                                    <textarea
                                        required
                                        name='comment'
                                        placeholder='Add your comment here...'
                                        className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                    ></textarea>
                                </div>


                                <button
                                    className="bg-primary text-white px-4 py-2 my-2 rounded"
                                >

                                    {
                                        loading ? "Loading..." : "Submit"
                                    }

                                </button>
                                <button
                                    className="bg-danger ml-2 text-white px-4 py-2 my-2 rounded"
                                    onClick={() => setModelOpen(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SentMessage;
