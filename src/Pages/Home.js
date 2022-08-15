import React from 'react';

function Home() {
  return (
    <div className='hero min-h-screen bg-base-200 px-12 md:px-24'>
      <div className='hero-content flex-col lg:flex-row'>
        <div className='ml-6'>
          <h1 className='text-5xl font-bold'>This is Home Page!</h1>
          <p className='py-6'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className='btn btn-primary'>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
