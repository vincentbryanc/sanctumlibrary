import React from 'react';
 
const home = () => {
    const token = localStorage.getItem('token');
    return (
       <div>
            <h1 className='text-center'>Home</h1>
       </div>
    );
}
 
export default home;